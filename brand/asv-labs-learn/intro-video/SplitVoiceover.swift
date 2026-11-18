#!/usr/bin/env swift
// Split a continuous voiceover into 9 beats by silence gaps,
// then write vo/beat-01.m4a … beat-09.m4a and timing.txt.
import AVFoundation
import Foundation

let workDir = CommandLine.arguments.count > 1
    ? CommandLine.arguments[1]
    : FileManager.default.currentDirectoryPath
let srcPath = "\(workDir)/vo/voiceover.m4a"
let voDir = "\(workDir)/vo"
let beatCount = 9

// How paragraphs map to beats in READ-THIS.txt:
// Beat 1: 2 paras, 2: 2, 3: 4, 4: 3, 5: 3, 6: 3, 7: 3, 8: 2, 9: 3  → 25 lines
let parasPerBeat = [2, 2, 4, 3, 3, 3, 3, 2, 3]
precondition(parasPerBeat.reduce(0, +) == 25)

let srcURL = URL(fileURLWithPath: srcPath)
let asset = AVURLAsset(url: srcURL)

let loadDone = DispatchSemaphore(value: 0)
var durationSec: Double = 0
var audioTrack: AVAssetTrack?
Task {
    durationSec = (try? await asset.load(.duration).seconds) ?? 0
    audioTrack = try? await asset.loadTracks(withMediaType: .audio).first
    loadDone.signal()
}
loadDone.wait()
guard durationSec > 1, audioTrack != nil else {
    fputs("failed to load \(srcPath)\n", stderr)
    exit(1)
}
fputs(String(format: "source %.2fs\n", durationSec), stderr)

// ---- RMS silence detection via AVAssetReader ----
guard let reader = try? AVAssetReader(asset: asset),
      let track = audioTrack else { exit(1) }
let settings: [String: Any] = [
    AVFormatIDKey: kAudioFormatLinearPCM,
    AVLinearPCMBitDepthKey: 16,
    AVLinearPCMIsBigEndianKey: false,
    AVLinearPCMIsFloatKey: false,
    AVLinearPCMIsNonInterleaved: false,
]
let output = AVAssetReaderTrackOutput(track: track, outputSettings: settings)
reader.add(output)
reader.startReading()

var samples: [Int16] = []
var sampleRate: Double = 48000
while reader.status == .reading {
    guard let buf = output.copyNextSampleBuffer(),
          let block = CMSampleBufferGetDataBuffer(buf) else { break }
    if let fmt = CMSampleBufferGetFormatDescription(buf),
       let asbd = CMAudioFormatDescriptionGetStreamBasicDescription(fmt) {
        sampleRate = asbd.pointee.mSampleRate
    }
    let len = CMBlockBufferGetDataLength(block)
    var data = Data(count: len)
    data.withUnsafeMutableBytes { raw in
        guard let p = raw.baseAddress else { return }
        CMBlockBufferCopyDataBytes(block, atOffset: 0, dataLength: len, destination: p)
    }
    let count = len / 2
    data.withUnsafeBytes { raw in
        let ptr = raw.bindMemory(to: Int16.self)
        samples.append(contentsOf: ptr.prefix(count))
    }
}
fputs("samples \(samples.count) @ \(Int(sampleRate)) Hz\n", stderr)

let win = Int(sampleRate * 0.02) // 20 ms
let thresh: Double = 600
let minSil: Double = 0.35

var silences: [(Double, Double)] = []
var silStart: Double? = nil
var i = 0
while i + win < samples.count {
    var sum: Double = 0
    for j in i..<(i + win) {
        let v = Double(samples[j])
        sum += v * v
    }
    let rms = sqrt(sum / Double(win))
    let t = Double(i) / sampleRate
    if rms < thresh {
        if silStart == nil { silStart = t }
    } else if let s = silStart {
        let e = t
        if e - s >= minSil { silences.append((s, e)) }
        silStart = nil
    }
    i += win
}
if let s = silStart {
    let e = Double(samples.count) / sampleRate
    if e - s >= minSil { silences.append((s, e)) }
}

fputs("silences \(silences.count)\n", stderr)
for (s, e) in silences {
    fputs(String(format: "  %.2f-%.2f (%.2fs)\n", s, e, e - s), stderr)
}

// Speech segments between silences
var paras: [(Double, Double)] = []
var cursor = 0.0
for (s, e) in silences {
    if s - cursor > 0.20 { paras.append((cursor, s)) }
    cursor = e
}
if durationSec - cursor > 0.20 { paras.append((cursor, durationSec)) }

fputs("paragraphs \(paras.count)\n", stderr)
for (idx, p) in paras.enumerated() {
    fputs(String(format: "  p%d %.2f-%.2f (%.2fs)\n", idx + 1, p.0, p.1, p.1 - p.0), stderr)
}

// Group paragraphs into 9 beats. If paragraph count != 25, fall back to
// splitting by the N-1 largest silences into 9 chunks.
func groupByPlan(_ paras: [(Double, Double)]) -> [(Double, Double)] {
    var beats: [(Double, Double)] = []
    var idx = 0
    for count in parasPerBeat {
        guard idx < paras.count else { break }
        let endIdx = min(idx + count, paras.count) - 1
        // Include trailing silence into beat up to next paragraph start
        let start = paras[idx].0
        let end = paras[endIdx].1
        beats.append((start, end))
        idx = endIdx + 1
    }
    // Stretch last beat to end of file
    if !beats.isEmpty {
        beats[beats.count - 1].1 = durationSec
        // Also include inter-paragraph silence inside each beat by extending
        // each beat end to the start of the next beat
        for i in 0..<(beats.count - 1) {
            beats[i].1 = beats[i + 1].0
        }
    }
    return beats
}

func groupByLargestGaps(_ silences: [(Double, Double)], into n: Int) -> [(Double, Double)] {
    let ranked = silences.sorted { ($0.1 - $0.0) > ($1.1 - $1.0) }
    let cuts = ranked.prefix(n - 1).map { ($0.0 + $0.1) / 2 }.sorted()
    var beats: [(Double, Double)] = []
    var start = 0.0
    for c in cuts {
        beats.append((start, c))
        start = c
    }
    beats.append((start, durationSec))
    return beats
}

var beats: [(Double, Double)]
if paras.count >= 20 && paras.count <= 30 {
    beats = groupByPlan(paras)
    // If plan overshoots because para count differs, pad/trim
    if beats.count != beatCount {
        beats = groupByLargestGaps(silences, into: beatCount)
    }
} else {
    beats = groupByLargestGaps(silences, into: beatCount)
}

// Ensure exactly 9 contiguous beats covering the file
while beats.count < beatCount {
    // split longest
    guard let li = beats.enumerated().max(by: { ($0.element.1 - $0.element.0) < ($1.element.1 - $1.element.0) })?.offset else { break }
    let (a, b) = beats[li]
    let mid = (a + b) / 2
    beats[li] = (a, mid)
    beats.insert((mid, b), at: li + 1)
}
if beats.count > beatCount {
    // merge shortest adjacent pairs until 9
    while beats.count > beatCount {
        var best = 0
        var bestLen = Double.infinity
        for i in 0..<(beats.count - 1) {
            let len = (beats[i].1 - beats[i].0) + (beats[i + 1].1 - beats[i + 1].0)
            if len < bestLen { bestLen = len; best = i }
        }
        beats[best] = (beats[best].0, beats[best + 1].1)
        beats.remove(at: best + 1)
    }
}

fputs("beats \(beats.count)\n", stderr)
for (idx, b) in beats.enumerated() {
    fputs(String(format: "  beat %d: %.2f-%.2f (%.2fs)\n", idx + 1, b.0, b.1, b.1 - b.0), stderr)
}

// ---- Export each beat as m4a ----
func exportBeat(_ index: Int, _ range: (Double, Double)) -> Bool {
    let outPath = String(format: "%@/beat-%02d.m4a", voDir, index)
    try? FileManager.default.removeItem(atPath: outPath)
    let outURL = URL(fileURLWithPath: outPath)

    let comp = AVMutableComposition()
    guard let compTrack = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid),
          let srcTrack = audioTrack else { return false }

    let start = CMTime(seconds: range.0, preferredTimescale: 600)
    let dur = CMTime(seconds: max(0.1, range.1 - range.0), preferredTimescale: 600)
    do {
        try compTrack.insertTimeRange(CMTimeRange(start: start, duration: dur), of: srcTrack, at: .zero)
    } catch {
        fputs("insert failed beat \(index): \(error)\n", stderr)
        return false
    }

    guard let export = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetAppleM4A) else { return false }
    export.outputURL = outURL
    export.outputFileType = .m4a
    let done = DispatchSemaphore(value: 0)
    export.exportAsynchronously { done.signal() }
    done.wait()
    if export.status != .completed {
        fputs("export beat \(index) failed: \(String(describing: export.error))\n", stderr)
        return false
    }
    fputs("wrote \(outPath)\n", stderr)
    return true
}

var timing = ""
for (idx, b) in beats.enumerated() {
    let i = idx + 1
    if !exportBeat(i, b) { exit(1) }
    timing += String(format: "%d %.6f\n", i, b.1 - b.0)
}
let timingPath = "\(workDir)/timing.txt"
try! timing.write(toFile: timingPath, atomically: true, encoding: .utf8)
fputs("wrote \(timingPath)\n", stderr)
print("OK \(beatCount) beats from \(String(format: "%.1f", durationSec))s voiceover")
