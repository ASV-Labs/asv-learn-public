// Renders the "Python Zero to Useful" whiteboard/speed-draw course intro.
//
// Every visual is generated as a hand-jittered polyline that is stroked
// progressively over time, which is what produces the sketch reveal. Scene
// lengths come from timing.txt (the measured voiceover clip durations) so the
// drawing always finishes before the narration moves on.

import AppKit
import AVFoundation
import CoreText
import Foundation

// MARK: - Canvas + palette

let BEAT_COUNT = 11
let FPS: Double = 30
let TAIL: Double = 2.0 // held finished frame (silence) at the end of every beat
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

// Layout uses top-left origin; CoreGraphics is bottom-left, so convert here.
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
    mutating func unit() -> CGFloat { // -1 ... 1
        state = state &* 6364136223846793005 &+ 1442695040888963407
        return CGFloat(Double((state >> 11) & 0xFFFFFFFF) / Double(0xFFFFFFFF)) * 2 - 1
    }
}

var rng = RNG(20260802)

// MARK: - Sketch primitives (all return polylines)

/// A straight run with perpendicular wobble so it reads as a marker stroke.
func sLine(_ a: CGPoint, _ b: CGPoint, jitter: CGFloat = 1.8, steps: Int = 0) -> [CGPoint] {
    let len = hypot(b.x - a.x, b.y - a.y)
    let n = max(2, steps == 0 ? Int(len / 26) + 2 : steps)
    let nx = -(b.y - a.y) / max(len, 0.001)
    let ny = (b.x - a.x) / max(len, 0.001)
    var out: [CGPoint] = []
    let bow = rng.unit() * jitter * 1.4
    for i in 0...n {
        let t = CGFloat(i) / CGFloat(n)
        // Sine bow keeps the wobble smooth instead of noisy.
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
    // Close past the start so the corner overlaps like a real hand-drawn box.
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

/// Marker underline: one confident swipe plus a lighter second pass.
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
    var t0: CGFloat // fraction of the scene's draw span
    var t1: CGFloat
    var pen: Bool = true // whether the marker nib rides this element
}

struct Scene {
    var name: String
    var duration: Double
    var items: [Item]
}

// MARK: - Drawing

func polyLength(_ pts: [CGPoint]) -> [CGFloat] {
    var acc: [CGFloat] = [0]
    for i in 1..<max(pts.count, 1) {
        acc.append(acc[i - 1] + hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
    }
    return acc
}

/// Strokes `pts` up to `p` of its arc length. Returns the pen tip.
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

/// Reveals text left-to-right through a growing clip, like it is being written.
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

/// The marker that trails the active stroke.
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
    // Faint dot grid for a notebook/whiteboard surface.
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

// MARK: - Scene content helpers

func stroke(_ pts: [CGPoint], _ w: CGFloat, _ c: CGColor, _ t0: CGFloat, _ t1: CGFloat) -> Item {
    Item(art: .stroke(pts: pts, w: w, c: c), t0: t0, t1: t1)
}

func text(_ s: String, _ f: NSFont, _ c: CGColor, _ at: CGPoint, _ align: Align,
          _ t0: CGFloat, _ t1: CGFloat, track: CGFloat = 0) -> Item {
    Item(art: .text(s, f: f, c: c, at: at, align: align, track: track), t0: t0, t1: t1)
}

/// Slide frame + beat progress counter (ADHD-friendly: always know how much is left).
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

func heading(_ s: String, _ t0: CGFloat, _ t1: CGFloat, y: CGFloat = 168) -> [Item] {
    let f = font(MARKER, 64)
    let (_, w, _, _) = makeLine(s, f, INK, 1.5)
    return [
        text(s, f, INK, P(150, y), .left, t0, t1, track: 1.5),
        stroke(sUnderline(P(150, y + 26), P(150 + w + 16, y + 26)), 7, ACCENT, t1, t1 + 0.07),
    ]
}

/// A sketched window/panel with a title bar; returns strokes plus the inner rect.
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

// MARK: - Beats (v3 — history, what, why, course map; sketches mirror VO)

func scene1(_ dur: Double) -> Scene {
    // Title: PYTHON / Zero → Useful + brand
    var it = chrome(1)
    let big = font(MARKER, 160)
    let mid = font(MARKER, 108)

    it.append(text("PYTHON", big, INK, P(200, 380), .left, 0.06, 0.32, track: 4))
    it.append(text("ZERO", mid, INK, P(204, 540), .left, 0.34, 0.50, track: 3))

    let (_, zw, _, _) = makeLine("ZERO", mid, INK, 3)
    let ax = 204 + zw + 40
    for (i, a) in sArrow(P(ax, 510), P(ax + 120, 510), head: 28).enumerated() {
        it.append(stroke(a, 8, ACCENT, 0.52 + CGFloat(i) * 0.04, 0.58 + CGFloat(i) * 0.04))
    }
    it.append(text("USEFUL", mid, INK, P(ax + 150, 540), .left, 0.60, 0.78, track: 3))

    let (_, uw, _, _) = makeLine("USEFUL", mid, INK, 3)
    it.append(stroke(sUnderline(P(204, 575), P(ax + 150 + uw, 575)), 8, INK, 0.80, 0.88))

    it.append(text("ASV LEARN", font(BRAND, 32), MUTED, P(204, 780), .left, 0.88, 0.96, track: 2.2))
    it.append(text("free · never written code", font(HAND, 36), MUTED, P(204, 860), .left, 0.90, 0.98))
    return Scene(name: "01-title", duration: dur, items: it)
}

func scene2(_ dur: Double) -> Scene {
    // never written code? / good. — stick figure + question mark
    var it = chrome(2)
    it.append(text("never written code?", font(MARKER, 72), INK, P(960, 280), .center, 0.08, 0.35, track: 1.5))

    it.append(stroke(sCircle(center: P(960, 480), r: 48), 6, INK, 0.38, 0.50))
    it.append(stroke(sLine(P(960, 528), P(960, 680), jitter: 1.4), 6, INK, 0.50, 0.58))
    it.append(stroke(sLine(P(900, 580), P(1020, 580), jitter: 1.2), 5, INK, 0.58, 0.64))
    it.append(stroke(sLine(P(960, 680), P(910, 780), jitter: 1.2), 5, INK, 0.64, 0.70))
    it.append(stroke(sLine(P(960, 680), P(1010, 780), jitter: 1.2), 5, INK, 0.66, 0.72))
    it.append(stroke(sRect(R(860, 790, 200, 90), jitter: 1.4), 5, INK, 0.72, 0.82))
    it.append(text("?", font(MARKER, 96), MUTED, P(1120, 460), .center, 0.78, 0.88))

    it.append(text("good. this is for you.", font(MARKER, 64), ACCENT, P(960, 960), .center, 0.88, 0.98, track: 1.5))
    return Scene(name: "02-welcome", duration: dur, items: it)
}

func scene3(_ dur: Double) -> Scene {
    // Brief history: 1991 → Guido → readable / Monty Python nod
    var it = chrome(3)
    it.append(contentsOf: heading("a short history", 0.05, 0.18))

    // Timeline rail
    it.append(stroke(sLine(P(220, 520), P(1700, 520), jitter: 1.2), 5, MUTED, 0.20, 0.32))
    it.append(stroke(sCircle(center: P(360, 520), r: 18), 6, ACCENT, 0.32, 0.40))
    it.append(text("1991", font(MARKER, 56), INK, P(360, 420), .center, 0.34, 0.48))
    it.append(text("Guido van Rossum", font(HAND, 40), INK, P(360, 620), .center, 0.42, 0.55))

    it.append(stroke(sCircle(center: P(960, 520), r: 18), 6, ACCENT, 0.52, 0.60))
    it.append(text("readable", font(MARKER, 56), INK, P(960, 400), .center, 0.55, 0.68))
    it.append(text("closer to English", font(HAND, 36), MUTED, P(960, 640), .center, 0.62, 0.74))

    it.append(stroke(sCircle(center: P(1560, 520), r: 18), 6, ACCENT, 0.70, 0.78))
    it.append(text("Monty Python", font(MARKER, 48), INK, P(1560, 400), .center, 0.74, 0.88))
    it.append(text("(not the snake)", font(HAND, 34), MUTED, P(1560, 640), .center, 0.82, 0.94))
    return Scene(name: "03-history", duration: dur, items: it)
}

func scene4(_ dur: Double) -> Scene {
    // What it is: instructions note → computer
    var it = chrome(4)
    it.append(contentsOf: heading("what Python is", 0.05, 0.18))

    let (pnl, inner) = panel(R(150, 300, 620, 420), title: nil, titleFont: font(MONO, 22), 0.22, 0.40)
    it.append(contentsOf: pnl)
    let lines = ["1. ask for a name", "2. add the numbers", "3. print the answer"]
    for (i, l) in lines.enumerated() {
        let y = inner.maxY - 80 - CGFloat(i) * 100
        let t = 0.42 + CGFloat(i) * 0.10
        it.append(text(l, font(HAND, 42), INK, CGPoint(x: inner.minX + 40, y: y), .left, t, t + 0.09))
    }

    for (i, a) in sArrow(P(820, 520), P(980, 520), head: 28).enumerated() {
        it.append(stroke(a, 7, ACCENT, 0.72 + CGFloat(i) * 0.03, 0.78 + CGFloat(i) * 0.03))
    }

    let mon = R(1040, 340, 680, 380)
    it.append(stroke(sRect(mon), 6, INK, 0.76, 0.88))
    it.append(stroke(sLine(P(1240, 740), P(1240, 800)), 5, INK, 0.88, 0.91))
    it.append(stroke(sLine(P(1520, 740), P(1520, 800)), 5, INK, 0.89, 0.92))
    it.append(stroke(sLine(P(1160, 802), P(1600, 802)), 6, INK, 0.91, 0.95))
    it.append(text("follows the steps", font(HAND, 36), MUTED, P(1380, 880), .center, 0.92, 0.98))
    return Scene(name: "04-what", duration: dur, items: it)
}

func scene5(_ dur: Double) -> Scene {
    // How it works: hello.py → output
    var it = chrome(5)
    it.append(text("hello.py", font(MARKER, 64), INK, P(200, 180), .left, 0.05, 0.18, track: 1.2))
    it.append(text("output", font(MARKER, 64), INK, P(1180, 180), .left, 0.05, 0.18, track: 1.2))

    let (p1, i1) = panel(R(160, 280, 700, 480), title: "hello.py", titleFont: font(MONO, 24), 0.20, 0.38)
    it.append(contentsOf: p1)
    let code = ["print(\"Hello\")", "print(\"world\")"]
    for (i, l) in code.enumerated() {
        let y = i1.maxY - 120 - CGFloat(i) * 110
        let t = 0.42 + CGFloat(i) * 0.12
        it.append(text(l, font(MONO, 36), INK, CGPoint(x: i1.minX + 40, y: y), .left, t, t + 0.10))
    }

    for (i, a) in sArrow(P(900, 520), P(1060, 520), head: 26).enumerated() {
        it.append(stroke(a, 6, MUTED, 0.66 + CGFloat(i) * 0.03, 0.72 + CGFloat(i) * 0.03))
    }

    let (p2, i2) = panel(R(1100, 280, 640, 480), title: "output", titleFont: font(MONO, 24), 0.70, 0.84)
    it.append(contentsOf: p2)
    it.append(text("Hello", font(MONO, 48), ACCENT, CGPoint(x: i2.minX + 48, y: i2.maxY - 140), .left, 0.86, 0.94))
    it.append(text("world", font(MONO, 48), ACCENT, CGPoint(x: i2.minX + 48, y: i2.maxY - 240), .left, 0.90, 0.98))
    return Scene(name: "05-pipeline", duration: dur, items: it)
}

func scene6(_ dur: Double) -> Scene {
    // Why useful: messy→clean + use chips
    var it = chrome(6)
    it.append(contentsOf: heading("why people use it", 0.04, 0.16))

    it.append(text("messy", font(MARKER, 48), INK, P(320, 280), .center, 0.16, 0.26))
    it.append(text("clean", font(MARKER, 48), INK, P(900, 280), .center, 0.16, 0.26))

    let messy = R(140, 340, 360, 280)
    it.append(stroke(sRect(messy, jitter: 3.2), 5, INK, 0.26, 0.40))
    for r in 0..<4 {
        let y = messy.maxY - 45 - CGFloat(r) * 55 + (r % 2 == 0 ? 6 : -8)
        it.append(stroke(sLine(CGPoint(x: messy.minX + 24, y: y),
                               CGPoint(x: messy.maxX - 30 - CGFloat(r % 3) * 10, y: y), jitter: 2.6),
                         3.5, MUTED, 0.40 + CGFloat(r) * 0.04, 0.45 + CGFloat(r) * 0.04))
    }

    for (i, a) in sArrow(P(540, 480), P(680, 480), head: 24).enumerated() {
        it.append(stroke(a, 6, ACCENT, 0.55 + CGFloat(i) * 0.03, 0.62 + CGFloat(i) * 0.03))
    }

    let clean = R(720, 340, 420, 280)
    it.append(stroke(sRect(clean, jitter: 1.4), 5, INK, 0.62, 0.74))
    for r in 0..<3 {
        let y = clean.maxY - 55 - CGFloat(r) * 60
        it.append(stroke(sLine(CGPoint(x: clean.minX + 36, y: y), CGPoint(x: clean.minX + 240, y: y)),
                         r == 0 ? 5 : 3, INK, 0.74 + CGFloat(r) * 0.03, 0.77 + CGFloat(r) * 0.03))
    }
    let bar = CGRect(x: clean.minX + 280, y: clean.minY + 40, width: 90, height: 170)
    it.append(stroke(sRect(bar, jitter: 1.3), 5, ACCENT, 0.82, 0.90))

    // Use chips
    let chips = ["automate", "data", "websites", "AI tools"]
    for (i, c) in chips.enumerated() {
        let x: CGFloat = 200 + CGFloat(i) * 400
        let t = 0.88 + CGFloat(i) * 0.025
        let box = R(x - 140, 780, 280, 90)
        it.append(stroke(sRect(box, jitter: 1.5), 4, MUTED, t, t + 0.04))
        it.append(text(c, font(HAND, 36), INK, P(x, 835), .center, t + 0.02, t + 0.06))
    }
    return Scene(name: "06-useful", duration: dur, items: it)
}

func scene7(_ dur: Double) -> Scene {
    // What you'll learn — course ladder
    var it = chrome(7)
    it.append(contentsOf: heading("what you will learn", 0.04, 0.16))

    let steps = [
        "print & variables",
        "decisions & loops",
        "lists & dictionaries",
        "functions & files",
        "fix what breaks",
    ]
    for (i, s) in steps.enumerated() {
        let y: CGFloat = 320 + CGFloat(i) * 110
        let t = 0.20 + CGFloat(i) * 0.12
        let num = "\(i + 1)."
        it.append(text(num, font(MARKER, 48), ACCENT, P(220, y), .left, t, t + 0.06))
        it.append(text(s, font(MARKER, 52), INK, P(340, y), .left, t + 0.04, t + 0.12, track: 1.0))
        if i < steps.count - 1 {
            it.append(stroke(sLine(P(250, y + 40), P(250, y + 90), jitter: 1.0), 4, MUTED, t + 0.10, t + 0.14))
        }
    }
    it.append(text("on your own computer", font(HAND, 40), MUTED, P(1400, 860), .center, 0.88, 0.98))
    return Scene(name: "07-course-map", duration: dur, items: it)
}

func scene8(_ dur: Double) -> Scene {
    // Module Zero terminal
    var it = chrome(8)
    it.append(text("Module Zero", font(MARKER, 72), INK, P(200, 180), .left, 0.05, 0.20, track: 1.5))
    it.append(text("is Python on your machine?", font(HAND, 44), MUTED, P(200, 270), .left, 0.18, 0.32))

    let (pnl, inner) = panel(R(200, 340, 1520, 500), title: "Terminal", titleFont: font(MONO, 24), 0.32, 0.48)
    it.append(contentsOf: pnl)
    it.append(text("$ python3 --version", font(MONO, 44), INK,
                   CGPoint(x: inner.minX + 48, y: inner.maxY - 140), .left, 0.52, 0.72))
    it.append(text("Python 3.12", font(MONO, 44), ACCENT,
                   CGPoint(x: inner.minX + 48, y: inner.maxY - 260), .left, 0.78, 0.94))
    return Scene(name: "08-module00", duration: dur, items: it)
}

func scene9(_ dur: Double) -> Scene {
    // Mac / Windows / Linux
    var it = chrome(9)
    it.append(text("Mac    Windows    Linux", font(MARKER, 64), INK, P(960, 200), .center, 0.06, 0.24, track: 2))
    it.append(text("follow the steps for your computer", font(HAND, 40), MUTED, P(960, 290), .center, 0.20, 0.32))

    let labels = ["Mac", "Windows", "Linux"]
    for i in 0..<3 {
        let cx: CGFloat = 360 + CGFloat(i) * 600
        let mon = R(cx - 180, 380, 360, 280)
        let t = 0.34 + CGFloat(i) * 0.16
        it.append(stroke(sRect(mon), 6, INK, t, t + 0.10))
        it.append(stroke(sLine(P(cx - 40, 660), P(cx - 40, 720)), 5, INK, t + 0.10, t + 0.13))
        it.append(stroke(sLine(P(cx + 40, 660), P(cx + 40, 720)), 5, INK, t + 0.11, t + 0.14))
        it.append(stroke(sLine(P(cx - 100, 722), P(cx + 100, 722)), 6, INK, t + 0.13, t + 0.16))
        it.append(text(labels[i], font(HAND, 44), INK, P(cx, 800), .center, t + 0.14, t + 0.20))
        let cb = R(cx - 24, 860, 48, 48)
        it.append(stroke(sRect(cb, jitter: 1.2), 4, MUTED, t + 0.20, t + 0.24))
        it.append(stroke(sCheck(cb.insetBy(dx: -4, dy: -4)), 6, ACCENT, t + 0.24, t + 0.30))
    }
    return Scene(name: "09-platforms", duration: dur, items: it)
}

func scene10(_ dur: Double) -> Scene {
    // Capstone — progress tracker
    var it = chrome(10)
    it.append(text("you will build", font(MARKER, 64), INK, P(200, 160), .left, 0.05, 0.18, track: 1.2))
    it.append(text("a progress tracker", font(MARKER, 64), ACCENT, P(200, 250), .left, 0.18, 0.34, track: 1.2))

    let (pnl, inner) = panel(R(280, 340, 1360, 520), title: "progress_tracker.py", titleFont: font(MONO, 24), 0.36, 0.52)
    it.append(contentsOf: pnl)
    for i in 0..<3 {
        let y = inner.maxY - 90 - CGFloat(i) * 85
        let t = 0.55 + CGFloat(i) * 0.07
        it.append(stroke(sLine(CGPoint(x: inner.minX + 48, y: y), CGPoint(x: inner.minX + 700, y: y)),
                         4, MUTED, t, t + 0.05))
        let cb = CGRect(x: inner.minX + 720, y: y - 18, width: 36, height: 36)
        it.append(stroke(sRect(cb, jitter: 1.1), 3.5, MUTED, t + 0.04, t + 0.07))
        if i < 2 {
            it.append(stroke(sCheck(cb.insetBy(dx: -3, dy: -3)), 5, ACCENT, t + 0.07, t + 0.11))
        }
    }
    let hs: [CGFloat] = [90, 140, 200]
    for (b, bh) in hs.enumerated() {
        let bar = CGRect(x: inner.minX + 900 + CGFloat(b) * 110, y: inner.minY + 70, width: 70, height: bh)
        it.append(stroke(sRect(bar, jitter: 1.3), 5, b == 2 ? ACCENT : INK, 0.82 + CGFloat(b) * 0.04, 0.88 + CGFloat(b) * 0.04))
    }
    it.append(text("portfolio-ready", font(HAND, 40), MUTED, P(960, 960), .center, 0.90, 0.98))
    return Scene(name: "10-capstone", duration: dur, items: it)
}

func scene11(_ dur: Double) -> Scene {
    // Outro
    var it = chrome(11)
    it.append(contentsOf: brandMark(at: CGPoint(x: 810, y: CGFloat(H) - 480), size: 260, 0.05, 0.35))

    it.append(text("Start with Module Zero", font(MARKER, 68), INK, P(960, 600), .center, 0.38, 0.58, track: 1.5))
    it.append(stroke(sUnderline(P(520, 640), P(1400, 640)), 8, ACCENT, 0.58, 0.68))
    it.append(text("text editor · terminal · patience", font(HAND, 40), MUTED, P(960, 740), .center, 0.70, 0.86))
    it.append(text("take your time", font(MARKER, 48), INK, P(960, 860), .center, 0.84, 0.96))
    return Scene(name: "11-outro", duration: dur, items: it)
}

/// ASV Labs Learn mark, proportioned from asv-labs-learn.svg (512 -> 300).
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

// MARK: - Timing

/// Planned beat lengths (seconds) used when VO files are not measured yet.
let plannedBeats: [Double] = [12, 10, 22, 16, 14, 20, 20, 14, 12, 16, 14]

func loadTiming(_ path: String) -> [Double] {
    guard let raw = try? String(contentsOfFile: path, encoding: .utf8) else {
        return plannedBeats
    }
    var out = [Double](repeating: 0, count: BEAT_COUNT)
    for line in raw.split(separator: "\n") {
        let parts = line.split(separator: " ")
        if parts.count >= 2, let i = Int(parts[0]), let d = Double(parts[1]), i >= 1, i <= BEAT_COUNT {
            out[i - 1] = d
        }
    }
    return (0..<BEAT_COUNT).map { out[$0] > 0 ? out[$0] : plannedBeats[$0] }
}

// MARK: - Encoding

let outDir = CommandLine.arguments.count > 1
    ? CommandLine.arguments[1]
    : FileManager.default.currentDirectoryPath
let workDir = CommandLine.arguments.count > 2 ? CommandLine.arguments[2] : outDir

try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

let continuousVOPath = "\(workDir)/vo/voiceover.m4a"
let useContinuousVO = FileManager.default.fileExists(atPath: continuousVOPath)

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

// Continuous one-take VO: scale the planned beat lengths to the recording.
// Per-beat files: timing.txt (+ optional lead-in).
let leadIn: Double
var sceneLens: [Double]
if useContinuousVO {
    let voDur = assetDurationSeconds(continuousVOPath)
    let planSum = plannedBeats.reduce(0, +)
    sceneLens = plannedBeats.map { $0 / planSum * max(voDur, 1) }
    leadIn = 0
    FileHandle.standardError.write(
        "continuous VO \(String(format: "%.1f", voDur))s → scaled \(BEAT_COUNT) beats\n".data(using: .utf8)!
    )
} else {
    leadIn = 1.0
    sceneLens = loadTiming("\(workDir)/timing.txt").map { $0 + leadIn }
}

var scenes: [Scene] = []
let builders: [(Double) -> Scene] = [
    scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9, scene10, scene11,
]
for (i, b) in builders.enumerated() {
    scenes.append(b(sceneLens[i]))
}

var starts: [Double] = []
var acc: Double = 0
for s in scenes { starts.append(acc); acc += s.duration }
let totalDuration = acc
let totalFrames = Int((totalDuration * FPS).rounded())

let cs = CGColorSpace(name: CGColorSpace.sRGB)!

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

// QA mode: dump a fully-drawn still per scene instead of encoding video.
if CommandLine.arguments.contains("--contact") {
    let dir = "\(workDir)/contact"
    try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
    for (i, s) in scenes.enumerated() {
        writePNG(s, s.duration, to: "\(dir)/\(s.name).png")
        if CommandLine.arguments.contains("--mid") {
            writePNG(s, s.duration * 0.55, to: "\(dir)/\(s.name)-mid.png")
        }
        _ = i
    }
    exit(0)
}

// Hero/outro stills only (no video encode).
if CommandLine.arguments.contains("--stills") {
    writePNG(scenes[0], scenes[0].duration, to: "\(outDir)/asv-labs-learn-python-zero-hero.png")
    writePNG(scenes[scenes.count - 1], scenes[scenes.count - 1].duration, to: "\(outDir)/asv-labs-learn-python-zero-outro.png")
    exit(0)
}

let silentURL = URL(fileURLWithPath: "\(workDir)/video-silent.mp4")
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
        // The narration starts after leadIn, so the drawing leads the voice slightly.
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

// MARK: - Poster frames

// Fully-drawn title frame doubles as the static course thumbnail.
writePNG(scenes[0], scenes[0].duration, to: "\(outDir)/asv-labs-learn-python-zero-hero.png")
writePNG(scenes[scenes.count - 1], scenes[scenes.count - 1].duration, to: "\(outDir)/asv-labs-learn-python-zero-outro.png")

// MARK: - Mux voiceover

let finalURL = URL(fileURLWithPath: "\(outDir)/asv-labs-learn-python-zero-intro.mp4")
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

if let aComp = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) {
    if useContinuousVO {
        // One continuous take under the whole timeline.
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
            FileHandle.standardError.write("muxed continuous voiceover\n".data(using: .utf8)!)
        }
    } else {
        let exts = ["m4a", "wav", "mp3", "aiff", "caf"]
        for i in 0..<scenes.count {
            var url: URL?
            for ext in exts {
                let candidate = URL(fileURLWithPath: "\(workDir)/vo/beat-\(String(format: "%02d", i + 1)).\(ext)")
                if FileManager.default.fileExists(atPath: candidate.path) { url = candidate; break }
            }
            if url == nil {
                for ext in ["m4a", "aiff"] {
                    let candidate = URL(fileURLWithPath: "\(workDir)/audio/scene-\(i + 1).\(ext)")
                    if FileManager.default.fileExists(atPath: candidate.path) { url = candidate; break }
                }
            }
            guard let url else { continue }
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
        }
    }
}

// Passthrough keeps the 8.5 Mbps H.264 render intact; the 1920x1080 preset is
// only a fallback because it re-encodes the video at a much lower bitrate.
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
