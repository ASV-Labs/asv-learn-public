#!/usr/bin/env python3
"""Generate ASV Labs Learn course hero cards (catalog thumbnails).

- Left plate: course badge (cutout PNG)
- Paper side: expressive title typography that fills the space
- No per-card ASV Labs Learn stamp, no CY/SW/AI letter codes
"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "brand" / "asv-labs-learn" / "courses"
CATALOG = ROOT / "content" / "courses" / "catalog-13.json"

PAPER = (255, 250, 241)
PAPER_DEEP = (236, 230, 214)
FIELD = (14, 20, 32)
INK = (12, 14, 18)
ACCENT = (153, 27, 27)
MUTED = (88, 92, 84)
RULE = (196, 186, 164)

TRACK_COLOR = {
    "Python": (18, 42, 64),
    "Cyber": (16, 32, 48),
    "AI": (28, 22, 44),
    "Software": (22, 34, 40),
}

# Short lines that sit under the title — fills empty tan space with purpose.
TAGLINES = {
    "python-zero": "From first print() to tools you can keep.",
    "security-plus": "Threats, controls, and risk you can explain.",
    "ethical-hacking": "Authorized assessment, end to end.",
    "kali-linux": "A controlled lab workstation, used professionally.",
    "soc-blue-team": "Triage, evidence, and defender judgment.",
    "python-security": "Safe automation for security work.",
    "applied-agentic-ai": "Agents with goals, tools, and stop rules.",
    "ai-fundamentals": "Builder judgment for AI features.",
    "ai-foundations-engineering": "Pipelines, validation, and production habits.",
    "python-full": "APIs, data, auth, and deployable Python apps.",
    "fullstack": "Browser to backend to shipping proof.",
    "react": "Components, data flow, and accessible UI.",
    "devops": "Containers, pipelines, and observable systems.",
}

W, H = 1600, 900
LEFT_W = 540


def font(path: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype(path, size=size)
    except OSError:
        return ImageFont.load_default()


def title_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    # Display face with more character than plain Arial.
    for path in (
        "/System/Library/Fonts/Supplemental/Futura.ttc",
        "/System/Library/Fonts/Supplemental/DIN Alternate Bold.ttf",
        "/System/Library/Fonts/Supplemental/GillSans.ttc",
        "/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ):
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def tag_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/System/Library/Fonts/NewYork.ttf",
        "/System/Library/Fonts/Supplemental/Didot.ttc",
        "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    ):
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def meta_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    path = (
        "/System/Library/Fonts/Supplemental/GillSans.ttc"
        if not bold
        else "/System/Library/Fonts/Supplemental/DIN Alternate Bold.ttf"
    )
    return font(path, size)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_title(draw: ImageDraw.ImageDraw, title: str, max_w: int, max_lines: int = 3) -> tuple[list[str], object]:
    """Pick the largest title size that still fits max_lines."""
    for size in range(100, 52, -2):
        fnt = title_font(size)
        lines = wrap(draw, title, fnt, max_w)
        if len(lines) <= max_lines:
            widths = [draw.textlength(line, font=fnt) for line in lines]
            if max(widths) >= max_w * 0.62 or size <= 60:
                return lines, fnt
    fnt = title_font(56)
    return wrap(draw, title, fnt, max_w)[:max_lines], fnt


def paste_badge(base: Image.Image, badge_path: Path, *, boost: float = 1.0) -> None:
    badge = Image.open(badge_path).convert("RGBA")
    # Crop soft fringe so transparent padding does not shrink the crest.
    alpha = badge.split()[-1]
    mask = alpha.point(lambda p: 255 if p > 40 else 0)
    bbox = mask.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        pad = 6
        badge = badge.crop(
            (
                max(0, x0 - pad),
                max(0, y0 - pad),
                min(badge.width, x1 + pad),
                min(badge.height, y1 + pad),
            )
        )
    # Fill the left plate: prioritize height so crests match across courses.
    max_w = min(int((LEFT_W - 16) * boost), LEFT_W - 10)
    max_h = min(int((H - 36) * boost), H - 20)
    badge.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    x = (LEFT_W - badge.width) // 2
    y = (H - badge.height) // 2
    alpha = badge.split()[-1]
    shadow_layer = Image.new("RGBA", badge.size, (0, 0, 0, 120))
    shadow_layer.putalpha(alpha.point(lambda a: int(a * 0.5)))
    shadow_blur = shadow_layer.filter(ImageFilter.GaussianBlur(14))
    base.paste(shadow_blur, (x + 10, y + 16), shadow_blur)
    base.paste(badge, (x, y), badge)


def make_card(slug: str, title: str, track: str, hours: str, difficulty: str) -> Path:
    field = TRACK_COLOR.get(track, FIELD)
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, LEFT_W, H], fill=field)
    draw.rectangle([LEFT_W, 0, LEFT_W + 8, H], fill=ACCENT)

    # Soft paper depth band
    draw.rectangle([LEFT_W + 8, 0, W, H], fill=PAPER)
    draw.rectangle([LEFT_W + 8, H - 150, W, H], fill=PAPER_DEEP)

    badge = OUT / slug / "badge.png"
    if badge.exists():
        boost = 1.0
        paste_badge(img, badge, boost=boost)
        draw = ImageDraw.Draw(img)

    paper_left = LEFT_W + 56
    paper_max_w = W - paper_left - 64

    # Centered track eyebrow with flanking rules (searchable via course.tags)
    f_eye = meta_font(22, bold=True)
    eye = track.upper()
    eye_w = draw.textlength(eye, font=f_eye)
    center_x = paper_left + paper_max_w / 2
    text_x = center_x - eye_w / 2
    gap = 18
    rule_w = 96
    rule_y0, rule_y1 = 128, 132
    draw.rectangle(
        [text_x - gap - rule_w, rule_y0, text_x - gap, rule_y1],
        fill=ACCENT,
    )
    draw.text((text_x, 118), eye, fill=ACCENT, font=f_eye)
    draw.rectangle(
        [text_x + eye_w + gap, rule_y0, text_x + eye_w + gap + rule_w, rule_y1],
        fill=ACCENT,
    )

    title_lines, f_title = fit_title(draw, title, paper_max_w, max_lines=3)
    # Measure title block height for vertical centering in the upper paper area
    ascent, descent = f_title.getmetrics() if hasattr(f_title, "getmetrics") else (70, 18)
    line_h = ascent + descent + 8
    title_block_h = line_h * len(title_lines)

    tag = TAGLINES.get(slug, "")
    f_tag = tag_font(34)
    tag_lines = wrap(draw, tag, f_tag, paper_max_w) if tag else []
    tag_h = (44 * len(tag_lines)) if tag_lines else 0

    # Vertically place title+tag to fill the tan field (not stuck mid-empty)
    content_h = title_block_h + 28 + tag_h
    y = max(175, min(250, (H - 150 - content_h) // 2 + 20))

    for line in title_lines:
        draw.text((paper_left, y), line, fill=INK, font=f_title)
        y += line_h

    # Accent double-rule under title
    y += 14
    draw.rectangle([paper_left, y, paper_left + min(260, paper_max_w // 2), y + 4], fill=ACCENT)
    draw.rectangle([paper_left, y + 10, paper_left + min(140, paper_max_w // 3), y + 12], fill=RULE)
    y += 34

    for line in tag_lines:
        draw.text((paper_left, y), line, fill=MUTED, font=f_tag)
        y += 46

    # Footer meta chips on the deep paper band
    f_meta = meta_font(30, bold=True)
    f_small = meta_font(22)
    meta = f"{difficulty}  ·  {hours} hours"
    draw.text((paper_left, H - 98), "Free course", fill=MUTED, font=f_small)
    draw.text((paper_left, H - 64), meta, fill=INK, font=f_meta)

    out_dir = OUT / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / "hero.png"
    img.save(path, "PNG", optimize=True)
    return path


def main() -> None:
    catalog = json.loads(CATALOG.read_text())
    for c in catalog["courses"]:
        path = make_card(
            c["slug"],
            c["title"],
            c["track"],
            c["hours"],
            c["difficulty"],
        )
        print(f"wrote {path}")


if __name__ == "__main__":
    main()
