#!/usr/bin/env python3
"""Cut a course badge out of a generated image (remove dark navy backdrop).

Usage:
  python3 scripts/cutout-course-badge.py \
    --in path/to/source.png \
    --out brand/asv-labs-learn/courses/python-security/badge.png
"""
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def is_background(r: int, g: int, b: int) -> bool:
    # Dark navy / near-black circuit backdrop from Gemini renders
    brightness = (r + g + b) / 3
    if brightness < 48:
        return True
    # Deep blue field without being the cyan glow on the shield
    if b > r + 25 and b > g + 15 and brightness < 95:
        return True
    return False


def cutout(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size

    # Flood-fill from edges for connected background, plus a second pass for
    # near-edge dark speckles that flood miss.
    from collections import deque

    visited = [[False] * h for _ in range(w)]
    q: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not visited[x][y]:
            r, g, b, a = pixels[x, y]
            if is_background(r, g, b):
                visited[x][y] = True
                q.append((x, y))

    for x in range(w):
        enqueue(x, 0)
        enqueue(x, h - 1)
    for y in range(h):
        enqueue(0, y)
        enqueue(w - 1, y)

    while q:
        x, y = q.popleft()
        pixels[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            enqueue(nx, ny)

    # Soften leftover fringe near transparent pixels
    for x in range(w):
        for y in range(h):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if is_background(r, g, b) and brightness_near_edge(pixels, x, y, w, h):
                pixels[x, y] = (0, 0, 0, 0)

    # Crop to opaque content
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "PNG")
    print(f"wrote {dst} ({img.size[0]}x{img.size[1]})")


def brightness_near_edge(pixels, x, y, w, h) -> bool:
    for nx in range(max(0, x - 1), min(w, x + 2)):
        for ny in range(max(0, y - 1), min(h, y + 2)):
            if pixels[nx, ny][3] == 0:
                return True
    return False


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="src", required=True)
    ap.add_argument("--out", dest="dst", required=True)
    args = ap.parse_args()
    cutout(Path(args.src), Path(args.dst))


if __name__ == "__main__":
    main()
