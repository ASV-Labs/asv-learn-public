# Python Zero to Useful — course intro video

Sketch/whiteboard course hero for `course_ea63f73a-a1c3-4581-a488-ef2043f1351f`.

| | |
| --- | --- |
| Aspect | 16:9, 1920x1080, 30 fps |
| Duration | 76.4 s |
| Style | Whiteboard speed-draw, marker nib follows every stroke |
| Palette | Paper `#fffaf1`, ink `#101827`, accent `#991b1b` (ASV Labs Learn) |
| Type | Marker Felt Wide (headings), Bradley Hand Bold (notes), Menlo Bold (code), Helvetica Bold (brand mark) |
| Voiceover | macOS `Samantha`, 166 wpm, calm/encouraging, AAC 44.1 kHz |
| Audience | Absolute beginners, no prior code |

## Deliverables

| File | Purpose |
| --- | --- |
| `brand/asv-labs-learn/asv-labs-learn-python-zero-intro.mp4` | The intro video (uploaded as course `thumbnail_video`) |
| `brand/asv-labs-learn/asv-labs-learn-python-zero-hero.png` | Fully-drawn title frame (uploaded as course `thumbnail_image`) |
| `brand/asv-labs-learn/asv-labs-learn-python-zero-outro.png` | Branded end frame, reusable for social/email |
| `brand/asv-labs-learn/intro-video/` | Sources: script, voiceover builder, renderer |
| `scripts/set-course-intro-video.mjs` | Uploads both assets to the live course |

## Storyboard

Narration is one continuous voiceover; each scene's drawing finishes before the
next line starts. Timings below are from the actual render.

| # | Start | Len | Visual (drawn in this order) | Voiceover |
| --- | --- | --- | --- | --- |
| 1 | 0.0 s | 8.1 s | `PYTHON` in huge marker caps, then `ZERO` → red arrow → `USEFUL`, underline swipe, subtitle, small terminal window showing `$ python3 hello.py` / `Hello, world` | "Python Zero to Useful, from ASV Labs Learn. If you have never written a single line of code, this is where you start." |
| 2 | 8.1 s | 6.6 s | Heading + underline; a hand-written 3-item instruction list in a sketched window; arrow right; a sketched monitor labelled "the computer / does exactly this"; red kicker line | "Python is a programming language. A way to write instructions that a computer will actually follow." |
| 3 | 14.7 s | 6.6 s | `hello.py` window with three code lines → arrow → hand-drawn circle labelled `Python / reads it` → arrow → `output` window printing `Hello,` / `Charles` | "You type plain text into a file. Python reads it, top to bottom, and does what you asked." |
| 4 | 21.3 s | 8.5 s | Three sketched icon panels drawn left to right — table, bar chart, gear — captioned "pull data together", "build the report", "automate the boring part"; closes on red "small scripts · real results" | "People use it to pull data together, build reports, and automate the boring parts of a job. Small scripts, real results." |
| 5 | 29.8 s | 11.2 s | Large sketched Terminal window filling in `$ python3 --version` / `Python 3.12.4` / `$ python3 hello.py` / `Hello, world`, while four checkboxes tick off on the right: open a terminal, check if it is there, install it if not, run your first file | "So we begin with Module Zero. Python on your computer. Open a terminal, check whether Python is already there, install it if it is missing, then run your very first file." |
| 6 | 41.0 s | 11.6 s | A five-step staircase drawn riser-by-tread, climbing left to right, labelling: printing & variables, decisions & loops, lists & dictionaries, functions & files, errors & debugging (accent) | "From there you build up, one step at a time. Printing and variables. Decisions and loops. Lists and dictionaries. Functions, files, and what to do when something breaks." |
| 7 | 52.6 s | 11.0 s | `progress_tracker.py — report` window: three module rows tick off, a small bar chart draws in; right column writes "a progress tracker + reporting tool", then "a portfolio piece" in accent | "And it ends with a capstone you can actually show someone. A progress tracker and reporting tool. That is the difference between finishing a tutorial and having something in a portfolio." |
| 8 | 63.6 s | 12.8 s | ASV Labs Learn mark builds (rounded square, inner rule, `ASV`, red rule, `LEARN`), then "Python Zero to Useful", the tools line, accent swipe, and the CTA "Start with Module 00" | "You do not need a fancy setup, and you do not need to be a math person. A text editor, a terminal, and a little patience. Start with Module Zero. We will take it from there." |

## How this build works

Canva was not reachable from the agent environment (no browser session was
available), so the sketch reveal is generated directly instead — which also keeps
the whole thing reproducible and free of any Canva Pro licensing questions.

Every visual is a jittered polyline that gets stroked progressively over its own
time window, so the drawing genuinely animates rather than fading in. A marker
nib is drawn at the tip of whichever stroke is currently active. Text is revealed
through a growing left-to-right clip so it reads as being written.

```bash
cd brand/asv-labs-learn/intro-video

./build-voiceover.sh                       # say -> AIFF + AAC, writes timing.txt
swiftc -O SketchVideo.swift -o sketchvideo

# QA: one fully-drawn still per scene (add --mid for mid-draw frames)
./sketchvideo ../ . --contact --mid

# Full render: MP4 + both poster PNGs into brand/asv-labs-learn/
./sketchvideo /Users/charlesbonetti/asv-learn/brand/asv-labs-learn .
```

Scene lengths are derived from the measured voiceover clip durations, so changing
the script or the voice (`VOICE=... RATE=... ./build-voiceover.sh`) automatically
re-times the animation. `GrabFrames.swift` pulls stills back out of the finished
MP4 to confirm the muxed file is correct.

## Publishing to the course

```bash
node scripts/set-course-intro-video.mjs
```

Uploads the MP4 as `thumbnail_video` and the title frame as `thumbnail_image`,
leaving the course at `thumbnail_type: both`. The still is what course cards and
listings use, so this is also what removes the default `/empty_thumbnail.png`
placeholder from the catalog.

## Rebuilding this in Canva instead

If you want an editable Canva version (per
`~/.codex/skills/make-canva-sketch-videos/SKILL.md`):

1. Create a **Video** design at 1920x1080.
2. Make eight pages, one per storyboard scene, and set each page's duration to
   the "Len" column above.
3. Build each page as flat line art first: paper background `#fffaf1`, strokes
   `#101827`, one accent `#991b1b`. Use the Marker Felt / Bradley Hand
   equivalents from Canva's handwritten font list.
4. For each page, open **Apps → Speed Painter** (search `Speed Painter` or
   `SpeedPaint`), feed it that page's artwork, generate the speed-drawing clip,
   and drop the clip onto the page.
5. Re-add any text that must be read exactly *on top of* the generated clip, so
   it stays crisp instead of being hand-sketched.
6. Upload the eight voiceover clips from `intro-video/audio/scene-N.m4a`, or
   record narration with **Audio → Record yourself**, and align each clip
   ~0.35 s after its page starts so the drawing leads the voice.
7. Preview end to end, then **Share → Download → MP4 Video**.

Do not buy Pro elements for this — the current build uses only generated art and
the ASV Labs Learn mark.

## Known limitations

- The narration is a high-quality system voice, not a human read. If you want a
  human take, record over the same script (`intro-video/script.txt`) and the
  scene timings will follow the new clip lengths.
- LearnHouse autoplays the hero video muted, so viewers unmute to hear the
  voiceover. That is browser autoplay policy, not a file problem.
