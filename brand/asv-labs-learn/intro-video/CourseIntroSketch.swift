// Templated ASV Labs Learn course intro sketcher.
// Reads scenes.json (11 beats) + timing.txt + per-beat VO, renders 1920×1080 H.264.
//
// Usage:
//   swift CourseIntroSketch.swift <workDir> [<outMp4>]
//   swift CourseIntroSketch.swift --scenes <path> --timing <path> --audio <dir>
//        --vo <dir> --out <mp4> [--slug <slug>] [--contact] [--stills]
//
// Drawing style matches SketchVideo.swift (cream paper, ink, stroke reveal).

import AppKit
import AVFoundation
import CoreText
import Foundation

// MARK: - Canvas + palette

let FPS: Double = 30
let TAIL: Double = 2.0
let W = 1920
let H = 1080

func hex(_ v: UInt32, _ a: CGFloat = 1) -> CGColor {
    CGColor(
        red: CGFloat((v >> 16) & 0xFF) / 255,
        green: CGFloat((v >> 8) & 0xFF) / 255,
        blue: CGFloat(v & 0xFF) / 255,
        alpha: a
    )
}

let PAPER = hex(0xFFFAF1)
let INK = hex(0x101827)
let ACCENT = hex(0x991B1B)
let MUTED = hex(0x101827, 0.45)
let FAINT = hex(0x101827, 0.16)

func P(_ x: CGFloat, _ y: CGFloat) -> CGPoint { CGPoint(x: x, y: CGFloat(H) - y) }
func R(_ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat) -> CGRect {
    CGRect(x: x, y: CGFloat(H) - y - h, width: w, height: h)
}

func font(_ name: String, _ size: CGFloat) -> NSFont {
    NSFont(name: name, size: size) ?? NSFont.systemFont(ofSize: size, weight: .bold)
}

let MARKER = "MarkerFelt-Wide"
let HAND = "BradleyHandITCTT-Bold"
let MONO = "Menlo-Bold"
let BRAND = "Helvetica-Bold"

// MARK: - Deterministic jitter

struct RNG {
    var state: UInt64
    init(_ seed: UInt64) { state = seed &* 6364136223846793005 &+ 1442695040888963407 }
    mutating func unit() -> CGFloat {
        state = state &* 6364136223846793005 &+ 1442695040888963407
        return CGFloat(Double((state >> 11) & 0xFFFFFFFF) / Double(0xFFFFFFFF)) * 2 - 1
    }
}

var rng = RNG(20260808)

// MARK: - Sketch primitives

func sLine(_ a: CGPoint, _ b: CGPoint, jitter: CGFloat = 1.8, steps: Int = 0) -> [CGPoint] {
    let len = hypot(b.x - a.x, b.y - a.y)
    let n = max(2, steps == 0 ? Int(len / 26) + 2 : steps)
    let nx = -(b.y - a.y) / max(len, 0.001)
    let ny = (b.x - a.x) / max(len, 0.001)
    var out: [CGPoint] = []
    let bow = rng.unit() * jitter * 1.4
    for i in 0...n {
        let t = CGFloat(i) / CGFloat(n)
        let off = sin(t * .pi) * bow + rng.unit() * jitter * 0.35
        out.append(CGPoint(x: a.x + (b.x - a.x) * t + nx * off,
                           y: a.y + (b.y - a.y) * t + ny * off))
    }
    return out
}

func sPolyline(_ pts: [CGPoint], jitter: CGFloat = 1.8) -> [CGPoint] {
    guard pts.count > 1 else { return pts }
    var out: [CGPoint] = []
    for i in 0..<(pts.count - 1) {
        let seg = sLine(pts[i], pts[i + 1], jitter: jitter)
        out.append(contentsOf: i == 0 ? seg : Array(seg.dropFirst()))
    }
    return out
}

func sRect(_ r: CGRect, jitter: CGFloat = 1.8, overshoot: CGFloat = 7) -> [CGPoint] {
    let tl = CGPoint(x: r.minX, y: r.maxY)
    let tr = CGPoint(x: r.maxX, y: r.maxY)
    let br = CGPoint(x: r.maxX, y: r.minY)
    let bl = CGPoint(x: r.minX, y: r.minY)
    return sPolyline([tl, tr, br, bl, tl, CGPoint(x: tl.x + overshoot, y: tl.y)], jitter: jitter)
}

func sCircle(center c: CGPoint, r: CGFloat, jitter: CGFloat = 2.2, turns: CGFloat = 1.07) -> [CGPoint] {
    let n = max(28, Int(r / 2))
    let wob = rng.unit() * jitter
    var out: [CGPoint] = []
    for i in 0...n {
        let t = CGFloat(i) / CGFloat(n)
        let a = -.pi / 2 + t * turns * 2 * .pi
        let rr = r + sin(t * 3.1 * .pi) * wob + rng.unit() * jitter * 0.3
        out.append(CGPoint(x: c.x + cos(a) * rr, y: c.y + sin(a) * rr))
    }
    return out
}

func sArrow(_ a: CGPoint, _ b: CGPoint, head: CGFloat = 22) -> [[CGPoint]] {
    let ang = atan2(b.y - a.y, b.x - a.x)
    let h1 = CGPoint(x: b.x - cos(ang - 0.42) * head, y: b.y - sin(ang - 0.42) * head)
    let h2 = CGPoint(x: b.x - cos(ang + 0.42) * head, y: b.y - sin(ang + 0.42) * head)
    return [sLine(a, b, jitter: 1.4), sPolyline([h1, b, h2], jitter: 1.0)]
}

func sCheck(_ r: CGRect) -> [CGPoint] {
    sPolyline([
        CGPoint(x: r.minX + r.width * 0.12, y: r.midY + r.height * 0.02),
        CGPoint(x: r.minX + r.width * 0.40, y: r.minY + r.height * 0.16),
        CGPoint(x: r.maxX - r.width * 0.02, y: r.maxY - r.height * 0.02),
    ], jitter: 1.2)
}

func sUnderline(_ from: CGPoint, _ to: CGPoint) -> [CGPoint] {
    sPolyline([from, to, CGPoint(x: to.x - 26, y: to.y + 7)], jitter: 2.4)
}

// MARK: - Timeline model

enum Art {
    case stroke(pts: [CGPoint], w: CGFloat, c: CGColor)
    case text(String, f: NSFont, c: CGColor, at: CGPoint, align: Align, track: CGFloat)
    case fillPath(CGPath, CGColor)
    case strokePath(CGPath, CGColor, CGFloat)
}

enum Align { case left, center, right }

struct Item {
    var art: Art
    var t0: CGFloat
    var t1: CGFloat
    var pen: Bool = true
}

struct Scene {
    var name: String
    var duration: Double
    var items: [Item]
}

var BEAT_COUNT = 11

// MARK: - Drawing

func polyLength(_ pts: [CGPoint]) -> [CGFloat] {
    var acc: [CGFloat] = [0]
    for i in 1..<max(pts.count, 1) {
        acc.append(acc[i - 1] + hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
    }
    return acc
}

func drawPartial(_ ctx: CGContext, _ pts: [CGPoint], _ w: CGFloat, _ c: CGColor, _ p: CGFloat) -> CGPoint? {
    guard pts.count > 1, p > 0 else { return nil }
    let acc = polyLength(pts)
    let total = acc[acc.count - 1]
    guard total > 0 else { return nil }
    let target = total * min(p, 1)

    ctx.setStrokeColor(c)
    ctx.setLineWidth(w)
    ctx.setLineCap(.round)
    ctx.setLineJoin(.round)
    ctx.beginPath()
    ctx.move(to: pts[0])
    var tip = pts[0]
    for i in 1..<pts.count {
        if acc[i] <= target {
            ctx.addLine(to: pts[i])
            tip = pts[i]
        } else {
            let seg = acc[i] - acc[i - 1]
            let f = seg > 0 ? (target - acc[i - 1]) / seg : 0
            tip = CGPoint(x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
                          y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f)
            ctx.addLine(to: tip)
            break
        }
    }
    ctx.strokePath()
    return p < 1 ? tip : nil
}

func makeLine(_ s: String, _ f: NSFont, _ c: CGColor, _ track: CGFloat) -> (CTLine, CGFloat, CGFloat, CGFloat) {
    let attrs: [NSAttributedString.Key: Any] = [
        .font: f,
        .foregroundColor: NSColor(cgColor: c) ?? .black,
        .kern: track,
    ]
    let line = CTLineCreateWithAttributedString(NSAttributedString(string: s, attributes: attrs))
    var asc: CGFloat = 0, desc: CGFloat = 0, lead: CGFloat = 0
    let w = CGFloat(CTLineGetTypographicBounds(line, &asc, &desc, &lead))
    return (line, w, asc, desc)
}

func drawText(_ ctx: CGContext, _ s: String, _ f: NSFont, _ c: CGColor,
              at anchor: CGPoint, align: Align, track: CGFloat, _ p: CGFloat) -> CGPoint? {
    guard p > 0 else { return nil }
    let (line, w, asc, desc) = makeLine(s, f, c, track)
    var ox = anchor.x
    switch align {
    case .left: break
    case .center: ox -= w / 2
    case .right: ox -= w
    }
    let reveal = w * min(p, 1)
    ctx.saveGState()
    ctx.clip(to: CGRect(x: ox - 6, y: anchor.y - desc - 14, width: reveal + 8, height: asc + desc + 28))
    ctx.textMatrix = .identity
    ctx.textPosition = CGPoint(x: ox, y: anchor.y)
    CTLineDraw(line, ctx)
    ctx.restoreGState()
    return p < 1 ? CGPoint(x: ox + reveal, y: anchor.y + asc * 0.45) : nil
}

func drawPen(_ ctx: CGContext, at tip: CGPoint) {
    let body = CGPoint(x: tip.x + 30, y: tip.y + 62)
    ctx.setLineCap(.round)
    ctx.setStrokeColor(hex(0x101827, 0.85))
    ctx.setLineWidth(15)
    ctx.beginPath()
    ctx.move(to: CGPoint(x: tip.x + 9, y: tip.y + 19))
    ctx.addLine(to: body)
    ctx.strokePath()
    ctx.setStrokeColor(hex(0x991B1B, 0.95))
    ctx.setLineWidth(9)
    ctx.beginPath()
    ctx.move(to: tip)
    ctx.addLine(to: CGPoint(x: tip.x + 11, y: tip.y + 23))
    ctx.strokePath()
}

func drawBackground(_ ctx: CGContext) {
    ctx.setFillColor(PAPER)
    ctx.fill(CGRect(x: 0, y: 0, width: CGFloat(W), height: CGFloat(H)))
    ctx.setFillColor(hex(0x101827, 0.055))
    var y: CGFloat = 40
    while y < CGFloat(H) {
        var x: CGFloat = 40
        while x < CGFloat(W) {
            ctx.fillEllipse(in: CGRect(x: x, y: y, width: 2.6, height: 2.6))
            x += 48
        }
        y += 48
    }
}

func renderScene(_ ctx: CGContext, _ scene: Scene, _ local: Double) {
    drawBackground(ctx)
    let span = max(scene.duration - TAIL, 0.1)
    let f = CGFloat(min(max(local / span, 0), 1))
    var tip: CGPoint?

    for item in scene.items {
        let d = max(item.t1 - item.t0, 0.0001)
        let p = min(max((f - item.t0) / d, 0), 1)
        if p <= 0 { continue }
        var t: CGPoint?
        switch item.art {
        case let .stroke(pts, w, c):
            t = drawPartial(ctx, pts, w, c, p)
        case let .text(s, fnt, c, at, align, track):
            t = drawText(ctx, s, fnt, c, at: at, align: align, track: track, p)
        case let .fillPath(path, c):
            ctx.saveGState()
            ctx.setAlpha(p)
            ctx.setFillColor(c)
            ctx.addPath(path)
            ctx.fillPath()
            ctx.restoreGState()
        case let .strokePath(path, c, w):
            ctx.saveGState()
            ctx.setAlpha(p)
            ctx.setStrokeColor(c)
            ctx.setLineWidth(w)
            ctx.addPath(path)
            ctx.strokePath()
            ctx.restoreGState()
        }
        if item.pen, let t { tip = t }
    }
    if let tip { drawPen(ctx, at: tip) }
}

// MARK: - Helpers

func stroke(_ pts: [CGPoint], _ w: CGFloat, _ c: CGColor, _ t0: CGFloat, _ t1: CGFloat) -> Item {
    Item(art: .stroke(pts: pts, w: w, c: c), t0: t0, t1: t1)
}

func text(_ s: String, _ f: NSFont, _ c: CGColor, _ at: CGPoint, _ align: Align,
          _ t0: CGFloat, _ t1: CGFloat, track: CGFloat = 0) -> Item {
    Item(art: .text(s, f: f, c: c, at: at, align: align, track: track), t0: t0, t1: t1)
}

func chrome(_ beat: Int) -> [Item] {
    var items: [Item] = []
    items.append(Item(art: .strokePath(CGPath(roundedRect: R(44, 44, CGFloat(W) - 88, CGFloat(H) - 88),
                                              cornerWidth: 26, cornerHeight: 26, transform: nil),
                                       FAINT, 3), t0: 0, t1: 0.06, pen: false))
    items.append(Item(art: .text("\(beat) / \(BEAT_COUNT)", f: font(BRAND, 28), c: MUTED,
                                 at: P(CGFloat(W) - 120, 100), align: .right, track: 1.5),
                      t0: 0.02, t1: 0.10, pen: false))
    return items
}

func heading(_ s: String, _ t0: CGFloat, _ t1: CGFloat, y: CGFloat = 168, size: CGFloat = 64) -> [Item] {
    let f = font(MARKER, size)
    let (_, w, _, _) = makeLine(s, f, INK, 1.5)
    return [
        text(s, f, INK, P(150, y), .left, t0, t1, track: 1.5),
        stroke(sUnderline(P(150, y + 26), P(min(150 + w + 16, CGFloat(W) - 120), y + 26)), 7, ACCENT, t1, t1 + 0.07),
    ]
}

func panel(_ r: CGRect, title: String?, titleFont: NSFont, _ t0: CGFloat, _ t1: CGFloat) -> ([Item], CGRect) {
    var items: [Item] = [stroke(sRect(r), 5, INK, t0, t1)]
    let barH: CGFloat = 54
    let barY = r.maxY - barH
    items.append(stroke(sLine(CGPoint(x: r.minX, y: barY), CGPoint(x: r.maxX, y: barY)), 3.5, MUTED, t1, t1 + 0.035))
    for i in 0..<3 {
        let c = CGPoint(x: r.minX + 30 + CGFloat(i) * 30, y: barY + barH / 2)
        items.append(stroke(sCircle(center: c, r: 8.5), 3, MUTED, t1 + 0.02, t1 + 0.05))
    }
    if let title {
        items.append(text(title, titleFont, MUTED,
                          CGPoint(x: r.minX + 132, y: barY + 18), .left, t1 + 0.02, t1 + 0.09))
    }
    return (items, CGRect(x: r.minX, y: r.minY, width: r.width, height: barY - r.minY))
}

func brandMark(at origin: CGPoint, size: CGFloat, _ t0: CGFloat, _ t1: CGFloat) -> [Item] {
    let k = size / 512
    let r = CGRect(x: origin.x, y: origin.y, width: size, height: size)
    var items: [Item] = []
    items.append(Item(art: .fillPath(CGPath(roundedRect: r, cornerWidth: 112 * k, cornerHeight: 112 * k, transform: nil),
                                     INK), t0: t0, t1: t0 + (t1 - t0) * 0.35, pen: false))
    items.append(Item(art: .strokePath(CGPath(roundedRect: r.insetBy(dx: 32 * k, dy: 32 * k),
                                              cornerWidth: 88 * k, cornerHeight: 88 * k, transform: nil),
                                       PAPER, 12 * k), t0: t0 + (t1 - t0) * 0.3, t1: t0 + (t1 - t0) * 0.6, pen: false))
    items.append(Item(art: .text("ASV", f: font(BRAND, 128 * k), c: PAPER,
                                 at: CGPoint(x: r.midX, y: r.maxY - 250 * k), align: .center, track: 8 * k),
                      t0: t0 + (t1 - t0) * 0.45, t1: t0 + (t1 - t0) * 0.75, pen: false))
    items.append(Item(art: .strokePath({
        let p = CGMutablePath()
        p.move(to: CGPoint(x: r.minX + 136 * k, y: r.maxY - 298 * k))
        p.addLine(to: CGPoint(x: r.minX + 376 * k, y: r.maxY - 298 * k))
        return p
    }(), ACCENT, 18 * k), t0: t0 + (t1 - t0) * 0.6, t1: t0 + (t1 - t0) * 0.8, pen: false))
    items.append(Item(art: .text("LEARN", f: font(BRAND, 48 * k), c: PAPER,
                                 at: CGPoint(x: r.midX + 6 * k, y: r.maxY - 364 * k), align: .center, track: 12 * k),
                      t0: t0 + (t1 - t0) * 0.72, t1: t1, pen: false))
    return items
}

func fitMarker(_ s: String, maxWidth: CGFloat, preferred: CGFloat, minSize: CGFloat = 28) -> NSFont {
    var size = preferred
    while size > minSize {
        let f = font(MARKER, size)
        let (_, w, _, _) = makeLine(s, f, INK, 1.0)
        if w <= maxWidth { return f }
        size -= 2
    }
    return font(MARKER, minSize)
}

func str(_ dict: [String: Any], _ key: String, _ fallback: String = "") -> String {
    (dict[key] as? String) ?? fallback
}

func strArr(_ dict: [String: Any], _ key: String) -> [String] {
    (dict[key] as? [String]) ?? []
}

// MARK: - Scene builders from JSON

func buildTitle(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    let line1 = str(d, "line1", "COURSE")
    let line2 = str(d, "line2")
    let brand = str(d, "brand", "ASV LEARN")
    let tag = str(d, "tag")

    let f1 = fitMarker(line1, maxWidth: 1600, preferred: 140)
    it.append(text(line1, f1, INK, P(200, 360), .left, 0.06, 0.32, track: 3))

    if !line2.isEmpty {
        // Support "A → B" arrow split in line2
        if let arrowRange = line2.range(of: "→") ?? line2.range(of: "->") {
            let left = String(line2[..<arrowRange.lowerBound]).trimmingCharacters(in: .whitespaces)
            let right = String(line2[arrowRange.upperBound...]).trimmingCharacters(in: .whitespaces)
            let f2 = fitMarker(left + " " + right, maxWidth: 1400, preferred: 96)
            it.append(text(left, f2, INK, P(204, 540), .left, 0.34, 0.50, track: 2))
            let (_, lw, _, _) = makeLine(left, f2, INK, 2)
            let ax = 204 + lw + 36
            for (i, a) in sArrow(P(ax, 510), P(ax + 110, 510), head: 26).enumerated() {
                it.append(stroke(a, 8, ACCENT, 0.52 + CGFloat(i) * 0.04, 0.58 + CGFloat(i) * 0.04))
            }
            it.append(text(right, f2, INK, P(ax + 140, 540), .left, 0.60, 0.78, track: 2))
            let (_, rw, _, _) = makeLine(right, f2, INK, 2)
            it.append(stroke(sUnderline(P(204, 575), P(ax + 140 + rw, 575)), 8, INK, 0.80, 0.88))
        } else {
            let f2 = fitMarker(line2, maxWidth: 1600, preferred: 100)
            it.append(text(line2, f2, INK, P(204, 540), .left, 0.34, 0.62, track: 2))
            let (_, w, _, _) = makeLine(line2, f2, INK, 2)
            it.append(stroke(sUnderline(P(204, 575), P(204 + w, 575)), 8, ACCENT, 0.64, 0.74))
        }
    }

    it.append(text(brand.uppercased(), font(BRAND, 32), MUTED, P(204, 780), .left, 0.86, 0.94, track: 2.2))
    if !tag.isEmpty {
        it.append(text(tag, font(HAND, 34), MUTED, P(204, 860), .left, 0.90, 0.98))
    }
    return Scene(name: String(format: "%02d-title", beat), duration: dur, items: it)
}

func buildAudience(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    let question = str(d, "question", "ready?")
    let answer = str(d, "answer", "good.")
    let qf = fitMarker(question, maxWidth: 1600, preferred: 64)
    it.append(text(question, qf, INK, P(960, 280), .center, 0.08, 0.35, track: 1.2))

    it.append(stroke(sCircle(center: P(960, 480), r: 48), 6, INK, 0.38, 0.50))
    it.append(stroke(sLine(P(960, 528), P(960, 680), jitter: 1.4), 6, INK, 0.50, 0.58))
    it.append(stroke(sLine(P(900, 580), P(1020, 580), jitter: 1.2), 5, INK, 0.58, 0.64))
    it.append(stroke(sLine(P(960, 680), P(910, 780), jitter: 1.2), 5, INK, 0.64, 0.70))
    it.append(stroke(sLine(P(960, 680), P(1010, 780), jitter: 1.2), 5, INK, 0.66, 0.72))
    it.append(stroke(sRect(R(860, 790, 200, 90), jitter: 1.4), 5, INK, 0.72, 0.82))
    it.append(text("?", font(MARKER, 96), MUTED, P(1120, 460), .center, 0.78, 0.88))

    let af = fitMarker(answer, maxWidth: 1600, preferred: 52)
    it.append(text(answer, af, ACCENT, P(960, 960), .center, 0.86, 0.98, track: 1.2))
    return Scene(name: String(format: "%02d-audience", beat), duration: dur, items: it)
}

func buildTimeline(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    it.append(contentsOf: heading(str(d, "heading", "context"), 0.05, 0.18))
    let points = (d["points"] as? [[String: Any]]) ?? []
    let n = max(points.count, 1)
    it.append(stroke(sLine(P(220, 520), P(1700, 520), jitter: 1.2), 5, MUTED, 0.20, 0.32))
    for (i, pt) in points.enumerated() {
        let t = 0.32 + CGFloat(i) * (0.55 / CGFloat(n))
        let x = 360 + CGFloat(i) * (1200 / CGFloat(max(n - 1, 1)))
        let top = str(pt, "top")
        let bottom = str(pt, "bottom")
        it.append(stroke(sCircle(center: P(x, 520), r: 18), 6, ACCENT, t, t + 0.08))
        let tf = fitMarker(top, maxWidth: 360, preferred: 48)
        it.append(text(top, tf, INK, P(x, 400), .center, t + 0.02, t + 0.14))
        if !bottom.isEmpty {
            it.append(text(bottom, font(HAND, 32), MUTED, P(x, 620), .center, t + 0.08, t + 0.20))
        }
    }
    return Scene(name: String(format: "%02d-timeline", beat), duration: dur, items: it)
}

func buildDefinition(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    it.append(contentsOf: heading(str(d, "heading", "what it is"), 0.05, 0.18))
    let items = strArr(d, "items")
    let (pnl, inner) = panel(R(150, 300, 620, 420), title: nil, titleFont: font(MONO, 22), 0.22, 0.40)
    it.append(contentsOf: pnl)
    for (i, l) in items.prefix(4).enumerated() {
        let y = inner.maxY - 80 - CGFloat(i) * 100
        let t = 0.42 + CGFloat(i) * 0.10
        let f = fitMarker(l, maxWidth: 520, preferred: 36, minSize: 24)
        it.append(text(l, f, INK, CGPoint(x: inner.minX + 40, y: y), .left, t, t + 0.09))
    }
    for (i, a) in sArrow(P(820, 520), P(980, 520), head: 28).enumerated() {
        it.append(stroke(a, 7, ACCENT, 0.72 + CGFloat(i) * 0.03, 0.78 + CGFloat(i) * 0.03))
    }
    let mon = R(1040, 340, 680, 380)
    it.append(stroke(sRect(mon), 6, INK, 0.76, 0.88))
    it.append(stroke(sLine(P(1240, 740), P(1240, 800)), 5, INK, 0.88, 0.91))
    it.append(stroke(sLine(P(1520, 740), P(1520, 800)), 5, INK, 0.89, 0.92))
    it.append(stroke(sLine(P(1160, 802), P(1600, 802)), 6, INK, 0.91, 0.95))
    let footer = str(d, "footer")
    if !footer.isEmpty {
        it.append(text(footer, font(HAND, 34), MUTED, P(1380, 880), .center, 0.92, 0.98))
    }
    return Scene(name: String(format: "%02d-definition", beat), duration: dur, items: it)
}

func buildPipeline(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    let leftTitle = str(d, "leftTitle", "in")
    let rightTitle = str(d, "rightTitle", "out")
    let leftLines = strArr(d, "leftLines")
    let rightLines = strArr(d, "rightLines")

    it.append(text(leftTitle, font(MARKER, 56), INK, P(200, 180), .left, 0.05, 0.18, track: 1.2))
    it.append(text(rightTitle, font(MARKER, 56), INK, P(1180, 180), .left, 0.05, 0.18, track: 1.2))

    let (p1, i1) = panel(R(160, 280, 700, 480), title: leftTitle, titleFont: font(MONO, 24), 0.20, 0.38)
    it.append(contentsOf: p1)
    for (i, l) in leftLines.prefix(5).enumerated() {
        let y = i1.maxY - 100 - CGFloat(i) * 80
        let t = 0.42 + CGFloat(i) * 0.08
        it.append(text(l, font(MONO, 32), INK, CGPoint(x: i1.minX + 40, y: y), .left, t, t + 0.08))
    }

    for (i, a) in sArrow(P(900, 520), P(1060, 520), head: 26).enumerated() {
        it.append(stroke(a, 6, MUTED, 0.66 + CGFloat(i) * 0.03, 0.72 + CGFloat(i) * 0.03))
    }

    let (p2, i2) = panel(R(1100, 280, 640, 480), title: rightTitle, titleFont: font(MONO, 24), 0.70, 0.84)
    it.append(contentsOf: p2)
    for (i, l) in rightLines.prefix(5).enumerated() {
        let y = i2.maxY - 100 - CGFloat(i) * 80
        let t = 0.86 + CGFloat(i) * 0.03
        it.append(text(l, font(MONO, 36), ACCENT, CGPoint(x: i2.minX + 48, y: y), .left, t, min(t + 0.08, 0.99)))
    }
    return Scene(name: String(format: "%02d-pipeline", beat), duration: dur, items: it)
}

func buildChips(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    it.append(contentsOf: heading(str(d, "heading", "why useful"), 0.04, 0.16))
    let leftLabel = str(d, "leftLabel")
    let rightLabel = str(d, "rightLabel")
    let chips = strArr(d, "chips")

    if !leftLabel.isEmpty || !rightLabel.isEmpty {
        if !leftLabel.isEmpty {
            it.append(text(leftLabel, font(MARKER, 44), INK, P(320, 280), .center, 0.16, 0.26))
            let messy = R(140, 340, 360, 240)
            it.append(stroke(sRect(messy, jitter: 3.2), 5, INK, 0.26, 0.40))
            for r in 0..<3 {
                let y = messy.maxY - 45 - CGFloat(r) * 55 + (r % 2 == 0 ? 6 : -8)
                it.append(stroke(sLine(CGPoint(x: messy.minX + 24, y: y),
                                       CGPoint(x: messy.maxX - 30, y: y), jitter: 2.6),
                                 3.5, MUTED, 0.40 + CGFloat(r) * 0.04, 0.45 + CGFloat(r) * 0.04))
            }
        }
        if !rightLabel.isEmpty {
            it.append(text(rightLabel, font(MARKER, 44), INK, P(900, 280), .center, 0.16, 0.26))
            for (i, a) in sArrow(P(540, 460), P(680, 460), head: 24).enumerated() {
                it.append(stroke(a, 6, ACCENT, 0.50 + CGFloat(i) * 0.03, 0.58 + CGFloat(i) * 0.03))
            }
            let clean = R(720, 340, 420, 240)
            it.append(stroke(sRect(clean, jitter: 1.4), 5, INK, 0.58, 0.70))
            for r in 0..<3 {
                let y = clean.maxY - 55 - CGFloat(r) * 55
                it.append(stroke(sLine(CGPoint(x: clean.minX + 36, y: y), CGPoint(x: clean.minX + 240, y: y)),
                                 r == 0 ? 5 : 3, INK, 0.70 + CGFloat(r) * 0.03, 0.74 + CGFloat(r) * 0.03))
            }
        }
    }

    let chipY: CGFloat = (!leftLabel.isEmpty || !rightLabel.isEmpty) ? 780 : 420
    let count = max(chips.count, 1)
    let span: CGFloat = 1500
    let startX: CGFloat = 210
    let step = count > 1 ? span / CGFloat(count - 1) : 0
    for (i, c) in chips.prefix(6).enumerated() {
        let x = startX + CGFloat(i) * step
        let t = 0.72 + CGFloat(i) * 0.04
        let boxW: CGFloat = min(300, step > 0 ? step - 40 : 300)
        let box = R(x - boxW / 2, chipY, boxW, 90)
        it.append(stroke(sRect(box, jitter: 1.5), 4, MUTED, t, t + 0.04))
        let f = fitMarker(c, maxWidth: boxW - 24, preferred: 32, minSize: 20)
        it.append(text(c, f, INK, P(x, chipY + 55), .center, t + 0.02, t + 0.06))
    }
    return Scene(name: String(format: "%02d-chips", beat), duration: dur, items: it)
}

func buildLadder(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    it.append(contentsOf: heading(str(d, "heading", "what you will learn"), 0.04, 0.16, size: 56))
    let steps = strArr(d, "steps")
    let n = max(steps.count, 1)
    let spacing: CGFloat = min(110, 520 / CGFloat(n))
    for (i, s) in steps.prefix(6).enumerated() {
        let y: CGFloat = 300 + CGFloat(i) * spacing
        let t = 0.18 + CGFloat(i) * (0.70 / CGFloat(n))
        let num = "\(i + 1)."
        it.append(text(num, font(MARKER, 40), ACCENT, P(180, y), .left, t, t + 0.05))
        let f = fitMarker(s, maxWidth: 1500, preferred: steps.count > 4 ? 40 : 48, minSize: 26)
        it.append(text(s, f, INK, P(280, y), .left, t + 0.03, t + 0.12, track: 0.8))
        if i < steps.count - 1 {
            it.append(stroke(sLine(P(210, y + 28), P(210, y + spacing - 10), jitter: 1.0), 4, MUTED, t + 0.10, t + 0.14))
        }
    }
    let footer = str(d, "footer")
    if !footer.isEmpty {
        it.append(text(footer, font(HAND, 36), MUTED, P(1400, 920), .center, 0.88, 0.98))
    }
    return Scene(name: String(format: "%02d-ladder", beat), duration: dur, items: it)
}

func buildTerminal(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    let headingText = str(d, "heading", "practice")
    let sub = str(d, "sub")
    let prompt = str(d, "prompt", "$")
    let result = str(d, "result")

    let hf = fitMarker(headingText, maxWidth: 1600, preferred: 64)
    it.append(text(headingText, hf, INK, P(200, 180), .left, 0.05, 0.20, track: 1.2))
    if !sub.isEmpty {
        it.append(text(sub, font(HAND, 40), MUTED, P(200, 270), .left, 0.18, 0.32))
    }

    let (pnl, inner) = panel(R(200, 340, 1520, 500), title: "Terminal", titleFont: font(MONO, 24), 0.32, 0.48)
    it.append(contentsOf: pnl)
    let pf = fitMarker(prompt, maxWidth: 1400, preferred: 40, minSize: 24)
    it.append(text(prompt, pf, INK, CGPoint(x: inner.minX + 48, y: inner.maxY - 140), .left, 0.52, 0.72))
    if !result.isEmpty {
        let rf = fitMarker(result, maxWidth: 1400, preferred: 40, minSize: 24)
        it.append(text(result, rf, ACCENT, CGPoint(x: inner.minX + 48, y: inner.maxY - 260), .left, 0.78, 0.94))
    }
    return Scene(name: String(format: "%02d-terminal", beat), duration: dur, items: it)
}

func buildCards(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    let headingText = str(d, "heading", "path")
    let hf = fitMarker(headingText, maxWidth: 1600, preferred: 56)
    it.append(text(headingText, hf, INK, P(960, 200), .center, 0.06, 0.22, track: 1.5))
    let cards = strArr(d, "cards")
    let n = max(min(cards.count, 4), 1)
    for i in 0..<n {
        let cx: CGFloat = n == 1 ? 960 : (360 + CGFloat(i) * (1200 / CGFloat(n - 1)))
        let mon = R(cx - 200, 380, 400, 280)
        let t = 0.28 + CGFloat(i) * 0.18
        it.append(stroke(sRect(mon), 6, INK, t, t + 0.10))
        it.append(stroke(sLine(P(cx - 40, 660), P(cx - 40, 720)), 5, INK, t + 0.10, t + 0.13))
        it.append(stroke(sLine(P(cx + 40, 660), P(cx + 40, 720)), 5, INK, t + 0.11, t + 0.14))
        it.append(stroke(sLine(P(cx - 100, 722), P(cx + 100, 722)), 6, INK, t + 0.13, t + 0.16))
        let label = cards[i]
        let f = fitMarker(label, maxWidth: 360, preferred: 36, minSize: 22)
        it.append(text(label, f, INK, P(cx, 800), .center, t + 0.14, t + 0.22))
        let cb = R(cx - 24, 860, 48, 48)
        it.append(stroke(sRect(cb, jitter: 1.2), 4, MUTED, t + 0.20, t + 0.24))
        it.append(stroke(sCheck(cb.insetBy(dx: -4, dy: -4)), 6, ACCENT, t + 0.24, t + 0.30))
    }
    return Scene(name: String(format: "%02d-cards", beat), duration: dur, items: it)
}

func buildPanel(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    let headingText = str(d, "heading", "you will build")
    let sub = str(d, "subheading")
    let windowTitle = str(d, "windowTitle", "project")
    let lines = strArr(d, "lines")
    let bars = (d["bars"] as? Int) ?? 0

    let hf = fitMarker(headingText, maxWidth: 1600, preferred: 56)
    it.append(text(headingText, hf, INK, P(200, 160), .left, 0.05, 0.18, track: 1.2))
    if !sub.isEmpty {
        let sf = fitMarker(sub, maxWidth: 1600, preferred: 52)
        it.append(text(sub, sf, ACCENT, P(200, 250), .left, 0.18, 0.34, track: 1.2))
    }

    let (pnl, inner) = panel(R(280, 340, 1360, 520), title: windowTitle, titleFont: font(MONO, 24), 0.36, 0.52)
    it.append(contentsOf: pnl)
    let rowCount = max(lines.count, bars > 0 ? bars : 3)
    for i in 0..<min(rowCount, 5) {
        let y = inner.maxY - 90 - CGFloat(i) * 85
        let t = 0.55 + CGFloat(i) * 0.07
        if i < lines.count {
            let f = fitMarker(lines[i], maxWidth: 900, preferred: 36, minSize: 22)
            it.append(text(lines[i], f, INK, CGPoint(x: inner.minX + 48, y: y), .left, t, t + 0.08))
        } else {
            it.append(stroke(sLine(CGPoint(x: inner.minX + 48, y: y), CGPoint(x: inner.minX + 700, y: y)),
                             4, MUTED, t, t + 0.05))
        }
        let cb = CGRect(x: inner.minX + 980, y: y - 18, width: 36, height: 36)
        it.append(stroke(sRect(cb, jitter: 1.1), 3.5, MUTED, t + 0.04, t + 0.07))
        if i < rowCount - 1 {
            it.append(stroke(sCheck(cb.insetBy(dx: -3, dy: -3)), 5, ACCENT, t + 0.07, t + 0.11))
        }
    }
    if bars > 0 {
        let hs: [CGFloat] = (0..<min(bars, 4)).map { CGFloat(80 + $0 * 40) }
        for (b, bh) in hs.enumerated() {
            let bar = CGRect(x: inner.minX + 1100 + CGFloat(b) * 70, y: inner.minY + 70, width: 50, height: bh)
            it.append(stroke(sRect(bar, jitter: 1.3), 5, b == hs.count - 1 ? ACCENT : INK,
                             0.82 + CGFloat(b) * 0.04, 0.88 + CGFloat(b) * 0.04))
        }
    }
    return Scene(name: String(format: "%02d-panel", beat), duration: dur, items: it)
}

func buildOutro(_ d: [String: Any], beat: Int, dur: Double) -> Scene {
    var it = chrome(beat)
    it.append(contentsOf: brandMark(at: CGPoint(x: 830, y: CGFloat(H) - 420), size: 200, 0.05, 0.32))

    let headline = str(d, "headline", "Start here")
    let sub = str(d, "sub")
    let industry = str(d, "industry")

    let hf = fitMarker(headline, maxWidth: 1600, preferred: 56, minSize: 28)
    it.append(text(headline, hf, INK, P(960, 560), .center, 0.36, 0.58, track: 1.2))
    let (_, hw, _, _) = makeLine(headline, hf, INK, 1.2)
    it.append(stroke(sUnderline(P(960 - hw / 2, 600), P(960 + hw / 2, 600)), 8, ACCENT, 0.58, 0.68))
    if !sub.isEmpty {
        it.append(text(sub, font(HAND, 36), MUTED, P(960, 700), .center, 0.70, 0.84))
    }
    if !industry.isEmpty {
        let indf = fitMarker(industry, maxWidth: 1600, preferred: 40, minSize: 24)
        it.append(text(industry, indf, INK, P(960, 820), .center, 0.82, 0.96))
    }
    return Scene(name: String(format: "%02d-outro", beat), duration: dur, items: it)
}

func buildScene(_ dict: [String: Any], beat: Int, dur: Double) -> Scene {
    let type = str(dict, "type", "title").lowercased()
    switch type {
    case "title": return buildTitle(dict, beat: beat, dur: dur)
    case "audience": return buildAudience(dict, beat: beat, dur: dur)
    case "timeline": return buildTimeline(dict, beat: beat, dur: dur)
    case "definition": return buildDefinition(dict, beat: beat, dur: dur)
    case "pipeline": return buildPipeline(dict, beat: beat, dur: dur)
    case "chips": return buildChips(dict, beat: beat, dur: dur)
    case "ladder": return buildLadder(dict, beat: beat, dur: dur)
    case "terminal": return buildTerminal(dict, beat: beat, dur: dur)
    case "cards": return buildCards(dict, beat: beat, dur: dur)
    case "panel": return buildPanel(dict, beat: beat, dur: dur)
    case "outro": return buildOutro(dict, beat: beat, dur: dur)
    default:
        FileHandle.standardError.write("unknown scene type '\(type)' — rendering as title\n".data(using: .utf8)!)
        return buildTitle(dict, beat: beat, dur: dur)
    }
}

// MARK: - CLI / paths

struct Args {
    var scenesPath = ""
    var timingPath = ""
    var audioDir = ""
    var voDir = ""
    var outMp4 = ""
    var slug = ""
    var workDir = ""
    var contact = false
    var stills = false
    var mid = false
}

func parseCLI() -> Args {
    var a = Args()
    let argv = Array(CommandLine.arguments.dropFirst())
    var i = 0
    var positional: [String] = []
    while i < argv.count {
        let arg = argv[i]
        func next() -> String {
            i += 1
            guard i < argv.count else { fatalError("missing value after \(arg)") }
            return argv[i]
        }
        switch arg {
        case "--scenes": a.scenesPath = next()
        case "--timing": a.timingPath = next()
        case "--audio": a.audioDir = next()
        case "--vo": a.voDir = next()
        case "--out": a.outMp4 = next()
        case "--slug": a.slug = next()
        case "--contact": a.contact = true
        case "--stills": a.stills = true
        case "--mid": a.mid = true
        case "--help", "-h":
            print("""
            CourseIntroSketch — templated ASV Learn course intro
              swift CourseIntroSketch.swift <workDir> [<outMp4>]
              swift CourseIntroSketch.swift --scenes PATH --timing PATH --audio DIR --vo DIR --out MP4 [--slug SLUG]
              Flags: --contact  --stills  --mid
            """)
            exit(0)
        default:
            if arg.hasPrefix("-") { fatalError("unknown flag: \(arg)") }
            positional.append(arg)
        }
        i += 1
    }

    if a.scenesPath.isEmpty {
        guard let work = positional.first else {
            fatalError("provide <workDir> or --scenes")
        }
        a.workDir = work
        a.scenesPath = "\(work)/scenes.json"
        a.timingPath = a.timingPath.isEmpty ? "\(work)/timing.txt" : a.timingPath
        a.audioDir = a.audioDir.isEmpty ? "\(work)/audio" : a.audioDir
        a.voDir = a.voDir.isEmpty ? "\(work)/vo" : a.voDir
        if a.outMp4.isEmpty {
            a.outMp4 = positional.count > 1 ? positional[1] : "\(work)/asv-labs-learn-intro.mp4"
        }
    } else {
        if a.timingPath.isEmpty { a.timingPath = (a.workDir.isEmpty ? "" : "\(a.workDir)/timing.txt") }
        if a.audioDir.isEmpty { a.audioDir = a.workDir.isEmpty ? "" : "\(a.workDir)/audio" }
        if a.voDir.isEmpty { a.voDir = a.workDir.isEmpty ? "" : "\(a.workDir)/vo" }
    }

    if a.slug.isEmpty, let data = try? Data(contentsOf: URL(fileURLWithPath: a.scenesPath)),
       let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
       let s = json["slug"] as? String {
        a.slug = s
    }
    if a.outMp4.isEmpty {
        let slug = a.slug.isEmpty ? "course" : a.slug
        a.outMp4 = "/tmp/asv-labs-learn-\(slug)-intro.mp4"
    }
    return a
}

let args = parseCLI()

guard let scenesData = try? Data(contentsOf: URL(fileURLWithPath: args.scenesPath)),
      let scenesJSON = try? JSONSerialization.jsonObject(with: scenesData) as? [String: Any],
      let beatDicts = scenesJSON["beats"] as? [[String: Any]], !beatDicts.isEmpty else {
    FileHandle.standardError.write("failed to read scenes.json at \(args.scenesPath)\n".data(using: .utf8)!)
    exit(1)
}

BEAT_COUNT = beatDicts.count
let slug = args.slug.isEmpty ? ((scenesJSON["slug"] as? String) ?? "course") : args.slug
FileHandle.standardError.write("slug=\(slug) beats=\(BEAT_COUNT) scenes=\(args.scenesPath)\n".data(using: .utf8)!)

// MARK: - Timing

let plannedBeats: [Double] = Array(repeating: 8.0, count: max(BEAT_COUNT, 1))

func loadTiming(_ path: String, count: Int) -> [Double] {
    guard let raw = try? String(contentsOfFile: path, encoding: .utf8) else {
        return Array(plannedBeats.prefix(count)) + Array(repeating: 8.0, count: max(0, count - plannedBeats.count))
    }
    var out = [Double](repeating: 0, count: count)
    for line in raw.split(separator: "\n") {
        let parts = line.split(separator: " ")
        if parts.count >= 2, let i = Int(parts[0]), let d = Double(parts[1]), i >= 1, i <= count {
            out[i - 1] = d
        }
    }
    return (0..<count).map { out[$0] > 0 ? out[$0] : 8.0 }
}

func assetDurationSeconds(_ path: String) -> Double {
    let asset = AVURLAsset(url: URL(fileURLWithPath: path))
    let sem = DispatchSemaphore(value: 0)
    var sec: Double = 0
    Task {
        sec = (try? await asset.load(.duration).seconds) ?? 0
        sem.signal()
    }
    sem.wait()
    return sec
}

let continuousVOPath = args.voDir.isEmpty ? "" : "\(args.voDir)/voiceover.m4a"
let useContinuousVO = !continuousVOPath.isEmpty && FileManager.default.fileExists(atPath: continuousVOPath)

let leadIn: Double
var sceneLens: [Double]
if useContinuousVO {
    let voDur = assetDurationSeconds(continuousVOPath)
    let plan = loadTiming(args.timingPath, count: BEAT_COUNT)
    let planSum = plan.reduce(0, +)
    sceneLens = plan.map { $0 / max(planSum, 1) * max(voDur, 1) }
    leadIn = 0
} else if args.contact || args.stills || !FileManager.default.fileExists(atPath: args.timingPath) {
    // Contact/stills (or missing timing): short planned lengths for fast smoke
    leadIn = args.contact || args.stills ? 0 : 1.0
    let base = loadTiming(args.timingPath, count: BEAT_COUNT)
    sceneLens = base.map { (args.contact || args.stills) ? min($0, 1.5) : $0 + leadIn }
} else {
    leadIn = 1.0
    sceneLens = loadTiming(args.timingPath, count: BEAT_COUNT).map { $0 + leadIn }
}

var scenes: [Scene] = []
for (i, dict) in beatDicts.enumerated() {
    scenes.append(buildScene(dict, beat: i + 1, dur: sceneLens[i]))
}

var starts: [Double] = []
var acc: Double = 0
for s in scenes { starts.append(acc); acc += s.duration }
let totalDuration = acc
let totalFrames = Int((totalDuration * FPS).rounded())

let cs = CGColorSpace(name: CGColorSpace.sRGB)!
let outDir = (args.outMp4 as NSString).deletingLastPathComponent
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

func writePNG(_ scene: Scene, _ local: Double, to path: String) {
    guard let ctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: 0,
                              space: cs, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue) else { return }
    renderScene(ctx, scene, local)
    guard let img = ctx.makeImage() else { return }
    let rep = NSBitmapImageRep(cgImage: img)
    guard let data = rep.representation(using: .png, properties: [:]) else { return }
    do {
        try data.write(to: URL(fileURLWithPath: path))
        FileHandle.standardError.write("wrote \(path)\n".data(using: .utf8)!)
    } catch {
        FileHandle.standardError.write("failed to write \(path): \(error)\n".data(using: .utf8)!)
    }
}

if args.contact {
    let dir = outDir.isEmpty || outDir == "." ? "\(FileManager.default.currentDirectoryPath)/contact-\(slug)" : "\(outDir)/contact-\(slug)"
    try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
    for s in scenes {
        writePNG(s, s.duration, to: "\(dir)/\(s.name).png")
        if args.mid {
            writePNG(s, s.duration * 0.55, to: "\(dir)/\(s.name)-mid.png")
        }
    }
    print("OK contact \(dir) (\(scenes.count) beats)")
    exit(0)
}

if args.stills {
    writePNG(scenes[0], scenes[0].duration, to: "\(outDir)/asv-labs-learn-\(slug)-hero.png")
    writePNG(scenes[scenes.count - 1], scenes[scenes.count - 1].duration,
             to: "\(outDir)/asv-labs-learn-\(slug)-outro.png")
    exit(0)
}

// MARK: - Encode silent video

let workScratch = args.workDir.isEmpty ? outDir : args.workDir
let silentURL = URL(fileURLWithPath: "\(workScratch)/video-silent-\(slug).mp4")
try? FileManager.default.removeItem(at: silentURL)

let writer = try AVAssetWriter(outputURL: silentURL, fileType: .mp4)
let settings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: W,
    AVVideoHeightKey: H,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 8_500_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: 60,
    ],
]
let vInput = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
vInput.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: vInput,
    sourcePixelBufferAttributes: [
        kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
        kCVPixelBufferWidthKey as String: W,
        kCVPixelBufferHeightKey as String: H,
    ]
)
writer.add(vInput)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

var pool: CVPixelBufferPool?
CVPixelBufferPoolCreate(nil, nil, [
    kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
    kCVPixelBufferWidthKey as String: W,
    kCVPixelBufferHeightKey as String: H,
    kCVPixelBufferCGImageCompatibilityKey as String: true,
] as CFDictionary, &pool)

func makeContext(_ pb: CVPixelBuffer) -> CGContext? {
    CVPixelBufferLockBaseAddress(pb, [])
    return CGContext(
        data: CVPixelBufferGetBaseAddress(pb),
        width: W, height: H, bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(pb),
        space: cs,
        bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue
    )
}

func sceneIndex(at t: Double) -> (Int, Double) {
    var i = scenes.count - 1
    for (k, s) in starts.enumerated() where t >= s { i = k }
    return (i, t - starts[i])
}

FileHandle.standardError.write("rendering \(totalFrames) frames (\(String(format: "%.1f", totalDuration))s)\n".data(using: .utf8)!)

var frame = 0
let queue = DispatchQueue(label: "render")
let done = DispatchSemaphore(value: 0)

vInput.requestMediaDataWhenReady(on: queue) {
    while vInput.isReadyForMoreMediaData {
        if frame >= totalFrames {
            vInput.markAsFinished()
            done.signal()
            return
        }
        var pb: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, pool!, &pb)
        guard let pb, let ctx = makeContext(pb) else { frame += 1; continue }

        let t = Double(frame) / FPS
        let (si, local) = sceneIndex(at: t)
        renderScene(ctx, scenes[si], local)

        CVPixelBufferUnlockBaseAddress(pb, [])
        adaptor.append(pb, withPresentationTime: CMTime(value: CMTimeValue(frame), timescale: CMTimeScale(FPS)))
        if frame % 150 == 0 {
            FileHandle.standardError.write("  frame \(frame)/\(totalFrames)\n".data(using: .utf8)!)
        }
        frame += 1
    }
}

done.wait()
let finished = DispatchSemaphore(value: 0)
writer.finishWriting { finished.signal() }
finished.wait()

if writer.status != .completed {
    FileHandle.standardError.write("video write failed: \(String(describing: writer.error))\n".data(using: .utf8)!)
    exit(1)
}

writePNG(scenes[0], scenes[0].duration, to: "\(outDir)/asv-labs-learn-\(slug)-hero.png")
writePNG(scenes[scenes.count - 1], scenes[scenes.count - 1].duration,
         to: "\(outDir)/asv-labs-learn-\(slug)-outro.png")

// MARK: - Mux voiceover

let finalURL = URL(fileURLWithPath: args.outMp4)
try? FileManager.default.removeItem(at: finalURL)

let comp = AVMutableComposition()
let videoAsset = AVURLAsset(url: silentURL)

let semaLoad = DispatchSemaphore(value: 0)
var vTrackSrc: AVAssetTrack?
var vDur: CMTime = .zero
Task {
    vTrackSrc = try? await videoAsset.loadTracks(withMediaType: .video).first
    vDur = (try? await videoAsset.load(.duration)) ?? .zero
    semaLoad.signal()
}
semaLoad.wait()

guard let vTrackSrc,
      let vComp = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else {
    FileHandle.standardError.write("no video track\n".data(using: .utf8)!)
    exit(1)
}
try vComp.insertTimeRange(CMTimeRange(start: .zero, duration: vDur), of: vTrackSrc, at: .zero)

func findBeatAudio(index: Int) -> URL? {
    let n = String(format: "%02d", index + 1)
    let exts = ["m4a", "mp3", "wav", "aiff", "caf"]
    if !args.audioDir.isEmpty {
        for ext in exts {
            let p = "\(args.audioDir)/beat-\(n).\(ext)"
            if FileManager.default.fileExists(atPath: p) { return URL(fileURLWithPath: p) }
        }
        for ext in ["m4a", "aiff"] {
            let p = "\(args.audioDir)/scene-\(index + 1).\(ext)"
            if FileManager.default.fileExists(atPath: p) { return URL(fileURLWithPath: p) }
        }
    }
    if !args.voDir.isEmpty {
        for ext in exts {
            let p = "\(args.voDir)/beat-\(n).\(ext)"
            if FileManager.default.fileExists(atPath: p) { return URL(fileURLWithPath: p) }
        }
    }
    return nil
}

if let aComp = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) {
    if useContinuousVO {
        let a = AVURLAsset(url: URL(fileURLWithPath: continuousVOPath))
        let sema = DispatchSemaphore(value: 0)
        var track: AVAssetTrack?
        var dur: CMTime = .zero
        Task {
            track = try? await a.loadTracks(withMediaType: .audio).first
            dur = (try? await a.load(.duration)) ?? .zero
            sema.signal()
        }
        sema.wait()
        if let track {
            try? aComp.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: track, at: .zero)
        }
    } else {
        var muxed = 0
        for i in 0..<scenes.count {
            guard let url = findBeatAudio(index: i) else { continue }
            let a = AVURLAsset(url: url)
            let sema = DispatchSemaphore(value: 0)
            var track: AVAssetTrack?
            var dur: CMTime = .zero
            Task {
                track = try? await a.loadTracks(withMediaType: .audio).first
                dur = (try? await a.load(.duration)) ?? .zero
                sema.signal()
            }
            sema.wait()
            guard let track else { continue }
            let at = CMTime(seconds: starts[i] + leadIn, preferredTimescale: 600)
            try? aComp.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: track, at: at)
            muxed += 1
        }
        FileHandle.standardError.write("muxed \(muxed)/\(scenes.count) beat audio clips\n".data(using: .utf8)!)
    }
}

func mux(preset: String) -> Bool {
    try? FileManager.default.removeItem(at: finalURL)
    guard let export = AVAssetExportSession(asset: comp, presetName: preset) else { return false }
    export.outputURL = finalURL
    export.outputFileType = .mp4
    export.shouldOptimizeForNetworkUse = true
    let expDone = DispatchSemaphore(value: 0)
    export.exportAsynchronously { expDone.signal() }
    expDone.wait()
    if export.status != .completed {
        FileHandle.standardError.write("\(preset) failed: \(String(describing: export.error))\n".data(using: .utf8)!)
        return false
    }
    return true
}

if !mux(preset: AVAssetExportPresetPassthrough), !mux(preset: AVAssetExportPreset1920x1080) {
    exit(1)
}

let attrs = try? FileManager.default.attributesOfItem(atPath: finalURL.path)
let mb = Double((attrs?[.size] as? Int) ?? 0) / 1_048_576
print(String(format: "OK %@ (%.1f MB, %.1fs, %dx%d @%.0ffps)",
             finalURL.path, mb, totalDuration, W, H, FPS))
for (i, s) in scenes.enumerated() {
    print(String(format: "  %@  start %.2fs  dur %.2fs", s.name, starts[i], s.duration))
}
try? FileManager.default.removeItem(at: silentURL)
