// QA helper: pulls stills out of the finished MP4 to confirm the muxed file
// really contains the rendered video (not just the silent intermediate).

import AVFoundation
import AppKit
import Foundation

let url = URL(fileURLWithPath: CommandLine.arguments[1])
let outDir = CommandLine.arguments[2]
let times = CommandLine.arguments.dropFirst(3).compactMap(Double.init)

let asset = AVURLAsset(url: url)
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero

try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for t in times {
    let time = CMTime(seconds: t, preferredTimescale: 600)
    do {
        let img = try gen.copyCGImage(at: time, actualTime: nil)
        let rep = NSBitmapImageRep(cgImage: img)
        let path = "\(outDir)/verify-\(String(format: "%05.1f", t))s.png"
        if let d = rep.representation(using: .png, properties: [:]) {
            try d.write(to: URL(fileURLWithPath: path))
            print("\(path)  \(img.width)x\(img.height)")
        }
    } catch {
        print("FAILED at \(t)s: \(error)")
    }
}
