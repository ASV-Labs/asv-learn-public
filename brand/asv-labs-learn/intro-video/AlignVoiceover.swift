#!/usr/bin/env swift
// Align READ-THIS.txt paragraphs to voiceover.m4a via on-device speech recognition,
// group into 9 beats, export vo/beat-NN.m4a + timing.txt.
import AVFoundation
import Foundation
import Speech

let workDir = CommandLine.arguments.count > 1
    ? CommandLine.arguments[1]
    : FileManager.default.currentDirectoryPath
let srcPath = "\(workDir)/vo/voiceover.m4a"
let scriptPath = "\(workDir)/vo/READ-THIS.txt"
let voDir = "\(workDir)/vo"
let beatCount = 9
let parasPerBeat = [2, 2, 4, 3, 3, 3, 3, 2, 3]

// ---- Load script paragraphs (between the markers) ----
let scriptRaw = try! String(contentsOfFile: scriptPath, encoding: .utf8)
let startMark = "----- start reading -----"
let endMark = "----- stop reading -----"
guard let sRange = scriptRaw.range(of: startMark),
      let eRange = scriptRaw.range(of: endMark) else {
    fputs("READ-THIS.txt missing markers\n", stderr); exit(1)
}
let body = scriptRaw[sRange.upperBound..<eRange.lowerBound]
let expectedParas = body
    .components(separatedBy: "\n")
    .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
    .filter { !$0.isEmpty }
fputs("script paragraphs: \(expectedParas.count)\n", stderr)
for (i, p) in expectedParas.enumerated() {
    fputs("  \(i + 1). \(p.prefix(60))\n", stderr)
}

// ---- Speech recognition with timestamps ----
let auth = DispatchSemaphore(value: 0)
var authOK = false
SFSpeechRecognizer.requestAuthorization { status in
    authOK = (status == .authorized)
    auth.signal()
}
auth.wait()
guard authOK else { fputs("Speech recognition not authorized\n", stderr); exit(1) }

guard let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US")),
      recognizer.isAvailable else {
    fputs("Speech recognizer unavailable\n", stderr); exit(1)
}

let request = SFSpeechURLRecognitionRequest(url: URL(fileURLWithPath: srcPath))
request.shouldReportPartialResults = false
if #available(macOS 13, *) {
    request.addsPunctuation = true
}

let done = DispatchSemaphore(value: 0)
var words: [(String, Double, Double)] = [] // text, start, end
var fullText = ""
var errMsg: String?

recognizer.recognitionTask(with: request) { result, error in
    if let error {
        errMsg = error.localizedDescription
        done.signal()
        return
    }
    guard let result, result.isFinal else { return }
    fullText = result.bestTranscription.formattedString
    words = result.bestTranscription.segments.map {
        ($0.substring, $0.timestamp, $0.timestamp + $0.duration)
    }
    done.signal()
}
done.wait()
if let errMsg { fputs("ASR error: \(errMsg)\n", stderr); exit(1) }
fputs("ASR words: \(words.count)\n", stderr)
fputs("ASR text: \(fullText.prefix(200))…\n", stderr)

let asset = AVURLAsset(url: URL(fileURLWithPath: srcPath))
let loadDone = DispatchSemaphore(value: 0)
var durationSec: Double = 0
var audioTrack: AVAssetTrack?
Task {
    durationSec = (try? await asset.load(.duration).seconds) ?? 0
    audioTrack = try? await asset.loadTracks(withMediaType: .audio).first
    loadDone.signal()
}
loadDone.wait()
fputs(String(format: "audio duration %.2fs\n", durationSec), stderr)

// Normalize for fuzzy matching
func norm(_ s: String) -> [String] {
    s.lowercased()
        .replacingOccurrences(of: "[^a-z0-9 ]", with: " ", options: .regularExpression)
        .split(separator: " ")
        .map(String.init)
        .filter { $0.count > 1 } // drop "a", "i"
}

let wordTokens = words.map { (norm($0.0).first ?? "", $0.1, $0.2) }.filter { !$0.0.isEmpty }

// Greedy match each paragraph's first few distinctive words to find start times
func findStart(para: String, from index: Int) -> (Int, Double)? {
    let tokens = norm(para)
    guard tokens.count >= 2 else { return nil }
    // Use first 3-5 content words as anchor
    let anchor = Array(tokens.prefix(min(5, tokens.count)))
    var i = index
    while i + anchor.count <= wordTokens.count {
        var ok = true
        for (k, a) in anchor.enumerated() {
            // allow minor ASR mismatch: prefix match
            let w = wordTokens[i + k].0
            if w != a && !w.hasPrefix(a.prefix(4)) && !a.hasPrefix(w.prefix(4)) {
                ok = false; break
            }
        }
        if ok {
            return (i, wordTokens[i].1)
        }
        i += 1
    }
    // Fallback: match first 2 words only
    let short = Array(tokens.prefix(2))
    i = index
    while i + short.count <= wordTokens.count {
        if wordTokens[i].0.hasPrefix(short[0].prefix(4)) &&
            wordTokens[i + 1].0.hasPrefix(short[1].prefix(4)) {
            return (i, wordTokens[i].1)
        }
        i += 1
    }
    return nil
}

var paraStarts: [Double] = []
var searchFrom = 0
for (pi, para) in expectedParas.enumerated() {
    if let (idx, t) = findStart(para: para, from: searchFrom) {
        paraStarts.append(t)
        searchFrom = idx + 1
        fputs(String(format: "para %d @ %.2fs — %@\n", pi + 1, t, String(para.prefix(40))), stderr)
    } else {
        // interpolate from neighbors later
        paraStarts.append(-1)
        fputs("para \(pi + 1) NOT FOUND — \(para.prefix(40))\n", stderr)
    }
}

// Fill missing starts by linear interpolation
for i in 0..<paraStarts.count {
    if paraStarts[i] >= 0 { continue }
    var prev = 0.0, prevI = -1
    var next = durationSec, nextI = paraStarts.count
    for j in stride(from: i - 1, through: 0, by: -1) where paraStarts[j] >= 0 {
        prev = paraStarts[j]; prevI = j; break
    }
    for j in (i + 1)..<paraStarts.count where paraStarts[j] >= 0 {
        next = paraStarts[j]; nextI = j; break
    }
    let span = Double(nextI - prevI)
    let frac = Double(i - prevI) / max(span, 1)
    paraStarts[i] = prev + (next - prev) * frac
    fputs(String(format: "para %d interpolated @ %.2fs\n", i + 1, paraStarts[i]), stderr)
}

// Build beat ranges from paragraph groups; include silence until next beat
var beats: [(Double, Double)] = []
var pIdx = 0
for (bi, count) in parasPerBeat.enumerated() {
    let start = pIdx < paraStarts.count ? paraStarts[pIdx] : durationSec
    pIdx += count
    let end: Double
    if bi == beatCount - 1 {
        end = durationSec
    } else if pIdx < paraStarts.count {
        end = paraStarts[pIdx]
    } else {
        end = durationSec
    }
    beats.append((max(0, start), max(start + 0.3, end)))
}
// Force contiguous cover from 0
beats[0].0 = 0
for i in 0..<(beats.count - 1) {
    beats[i].1 = beats[i + 1].0
}
beats[beats.count - 1].1 = durationSec

fputs("beats:\n", stderr)
for (i, b) in beats.enumerated() {
    fputs(String(format: "  %d: %.2f-%.2f (%.2fs)\n", i + 1, b.0, b.1, b.1 - b.0), stderr)
}

// ---- Export ----
func exportBeat(_ index: Int, _ range: (Double, Double)) -> Bool {
    let outPath = String(format: "%@/beat-%02d.m4a", voDir, index)
    try? FileManager.default.removeItem(atPath: outPath)
    let comp = AVMutableComposition()
    guard let compTrack = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid),
          let srcTrack = audioTrack else { return false }
    let start = CMTime(seconds: range.0, preferredTimescale: 600)
    let dur = CMTime(seconds: max(0.15, range.1 - range.0), preferredTimescale: 600)
    do {
        try compTrack.insertTimeRange(CMTimeRange(start: start, duration: dur), of: srcTrack, at: .zero)
    } catch {
        fputs("insert failed: \(error)\n", stderr); return false
    }
    guard let export = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetAppleM4A) else { return false }
    export.outputURL = URL(fileURLWithPath: outPath)
    export.outputFileType = .m4a
    let sem = DispatchSemaphore(value: 0)
    export.exportAsynchronously { sem.signal() }
    sem.wait()
    guard export.status == .completed else {
        fputs("export \(index) failed: \(String(describing: export.error))\n", stderr)
        return false
    }
    fputs("wrote \(outPath)\n", stderr)
    return true
}

var timing = ""
for (idx, b) in beats.enumerated() {
    if !exportBeat(idx + 1, b) { exit(1) }
    timing += String(format: "%d %.6f\n", idx + 1, b.1 - b.0)
}
try! timing.write(toFile: "\(workDir)/timing.txt", atomically: true, encoding: .utf8)
print("OK aligned \(beatCount) beats")
