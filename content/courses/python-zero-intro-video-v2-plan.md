# Python Zero to Useful — Intro Video v2 (Plan + Script)

**Status:** recording. Charles is reading the v2 VO; visuals are drafted (9-beat contact sheet).
**Course:** ASV Labs Learn — Python Zero to Useful (`course_ea63f73a-a1c3-4581-a488-ef2043f1351f`)
**Replaces:** `brand/asv-labs-learn/asv-labs-learn-python-zero-intro.mp4` (v1, 76.4 s, TTS)
**Live hero now:** still image only until v2 VO + mux lands.

---

## 0. What went wrong in v1 (measured, not guessed)

Charles's review: *voice sounds like 1990s Siri, animation too fast, colors and speed are
ADHD-overwhelming, the whole thing feels rushed.* He stopped watching at about **43 seconds**.

Reading the v1 sources confirms every point, with numbers:

| Complaint | What the build actually does | Where |
| --- | --- | --- |
| "1990s Siri" | macOS `say -v Samantha -r 166` synthesized speech | `intro-video/build-voiceover.sh` |
| "Rushed" | Scene length **equals** the voiceover clip length. Narration never stops. | `SketchVideo.swift` reads `timing.txt` |
| "Too fast" | `TAIL = 0.6` — each scene holds still for 0.6 s, then cuts. `leadIn = 0.35`. | `SketchVideo.swift:18` |
| "Overwhelming" | 8 scenes / 76.4 s = a new scene every **9.5 s**, each drawing 5–15 elements | `python-zero-intro-video.md` storyboard |
| Quit at ~43 s | 43 s lands inside scene 6 (41.0–52.6 s): a 5-step staircase that introduces **10 new terms in 11.6 s** — printing, variables, decisions, loops, lists, dictionaries, functions, files, errors, debugging | storyboard row 6 |

Total silence in the entire 76-second video: roughly **4.8 seconds**, all of it in 0.6 s slivers.
A beginner never gets a moment to catch up. That is the core defect, and it is a
pacing/parameter problem more than an art problem.

**The good news:** the foundation Charles said was OK really is reusable. See §8.

---

## 1. Creative brief — slow and simple

### Target duration

| Piece | v1 | v2 target |
| --- | --- | --- |
| Course hero | 76 s | **2:30** (150 s), 9 beats |
| Install videos | did not exist | 1:45 – 2:30 each, one per OS |

Longer, but carrying **less than half** the information. v1 crammed ~24 distinct concepts
into 76 s. v2 carries **9** — one per beat — in 150 s. That is the whole idea: the video gets
longer so it can feel slower.

### The beat

Everything is built from one repeating unit, called a **beat**:

```
[ 1.0s  silent lead-in, blank or previous frame held ]
[ 4-8s  drawing appears, narration speaks over it     ]
[ 2.0s  finished frame, held, total silence           ]
```

One beat = one idea = 14–22 seconds. Nine beats. Nothing else.

### Hard pacing rules (these become render constants)

| Rule | Value | Why |
| --- | --- | --- |
| Held silence at end of every beat | **≥ 2.0 s** (v1: 0.6 s) | The single biggest fix. Silence is where comprehension happens. |
| Silent lead-in before narration | **1.0 s** (v1: 0.35 s) | The viewer sees the picture before they hear about it. |
| Speaking rate | **125–135 wpm** (v1: 166) | Conversational, not presentational. |
| New ideas per beat | **exactly 1** | v1 averaged ~3. |
| Drawn elements per beat | **≤ 3** | v1 hit 15 in one scene. |
| Minimum time per stroke | **0.8 s** | Kills the "sketch spam" flicker. |
| Ink time as share of beat | **≤ 55 %** | The rest is a still, finished frame. |
| Words on screen at once | **≤ 6 per line, ≤ 2 lines** | v1 wrote full sentences in handwriting. |
| Minimum cap height | **64 px at 1080p** (~6 % of frame height) | Readable on a phone. |
| Transitions | **1 per beat max**, 0.5 s cross-dissolve, never a hard cut | Hard cuts read as "too fast." |

### ADHD-friendly constraints

- **Two colors and one accent. Total.** Paper `#fffaf1`, ink `#101827`, accent `#991b1b`.
  The accent may appear **once per beat** and must cover **under 10 %** of the drawn ink.
  v1 used the accent as a general highlighter; v2 uses it only to mark the single thing
  that matters in that beat.
- **Fixed layout anchors.** Beat title always top-left. Main sketch always dead center.
  Nothing ever appears in a corner the eye has not already learned to check. No panning,
  no zooming, no camera moves.
- **Visible progress.** A small `3 / 9` counter, bottom-right, on every frame. Knowing
  how much is left is an anxiety reducer, and it is the cheapest one available.
- **Nothing disappears while it is being discussed.** Elements clear only on beat
  boundaries, during the silence.
- **No background music under narration.** Optional soft bed on the title and outro
  cards only, at −28 dB, no rhythm. Music under speech is a documented comprehension
  cost for exactly the audience this course is for.
- **Burned-in open captions**, matching the script word for word, bottom-center, in a
  clean sans (not the handwritten face). Lets people read along, and it is the difference
  between "muted autoplay is useless" and "muted autoplay still works." LearnHouse
  autoplays the hero muted, so this matters more here than on YouTube.
- **No sudden loudness changes.** Normalize the whole read to −16 LUFS.

---

## 2. Structure — recommendation

### Chosen: one calm hero + three separate per-OS install videos

**Not** one long chaptered video with "if you're on Mac… if you're on Windows…".

| | Recommended |
| --- | --- |
| `python-zero-intro-v2.mp4` | 2:30 — course hero slot, 16:9 |
| `install-python-mac.mp4` | ~2:00 — embedded in Module 00, macOS section |
| `install-python-windows.mp4` | ~2:30 — embedded in Module 00, Windows section |
| `install-python-linux.mp4` | ~1:45 — embedded in Module 00, Linux section |
| `first-python-file.mp4` | ~2:30 — shared, all three OSes, end of Module 00 |

### Why separate, for this audience specifically

1. **A beginner should never watch instructions for a computer they do not own.** In a
   chaptered video, two out of every three viewers sit through steps that do not apply to
   them, while trying to work out whether the part they need has already passed. That is
   precisely the overload Charles described.
2. **These two video types get watched completely differently.** A hero is watched once,
   leaning back. An install video is paused, rewound, and replayed with a terminal open
   next to it. Fusing them means the hero is too long to watch and the install steps are
   too buried to scrub to.
3. **Placement.** Module 00 already has separate macOS / Windows / Linux sections
   (`content/courses/module-00-local-python.md`, Step 3). Each video drops in next to
   its matching text. Chapters cannot do that — a chaptered file can only sit in one place.
4. **Maintenance.** The python.org download page and the Windows installer UI change.
   Re-recording a 2:30 Windows video is a small job. Re-cutting a 6-minute combined video
   because one checkbox moved is not.
5. **Length discipline.** Splitting is what keeps the hero at 2:30. A single combined
   video covering all three OSes lands at 5–6 minutes, which contradicts the entire brief.

**The hero still has to reassure all three.** Beat 7 exists only for that: the viewer needs
to hear "your computer is covered, and you only have to watch your own video" before they
click away to Module 00.

---

## 3. Voiceover script — hero video (read this aloud)

**Read at 125–135 wpm.** Roughly two words per second. Slower than feels natural.

`[PAUSE 2]` = stop talking and count two full seconds. Do not rush these. **The pauses are
the feature.** If a pause feels awkwardly long while you are recording, it is probably
about right.

Record **one take per beat** into separate files (`vo/beat-01.m4a` … `beat-09.m4a`). Do not
record it as one continuous take. Per-beat files mean a fluffed line costs one retake
instead of the whole video, and the existing renderer already times the animation from
individual clip lengths — so the picture re-fits itself automatically.

Read the pauses **into** the recording (leave the silence in the file). Do not edit them out.

---

> ### BEAT 1 — Title
>
> This is Python Zero to Useful, from ASV Labs Learn.
> `[PAUSE 2]`
> It is a course for people who have never written code.
> `[PAUSE 2.5]`

> ### BEAT 2 — You are in the right place
>
> Maybe you are not even sure how to spell Python.
> `[PAUSE 2]`
> That is fine. That is exactly who this is for.
> `[PAUSE 2.5]`

> ### BEAT 3 — What Python is
>
> So. What is Python?
> `[PAUSE 2]`
> Python is a way to give a computer instructions.
> `[PAUSE 2]`
> You write the instructions down. The computer follows them.
> `[PAUSE 2]`
> That is all it is.
> `[PAUSE 2.5]`

> ### BEAT 4 — How it actually works
>
> You type your instructions into a file.
> `[PAUSE 2]`
> Python reads that file, from the top down.
> `[PAUSE 2]`
> Then it shows you the answer, on your screen.
> `[PAUSE 3]`

> ### BEAT 5 — What it is good for
>
> People use Python for real work.
> `[PAUSE 2]`
> Take a messy spreadsheet. Turn it into a clean report.
> `[PAUSE 2]`
> Without doing it by hand, every single week.
> `[PAUSE 2.5]`

> ### BEAT 6 — The first thing you will do
>
> Before you can write anything, Python has to be on your computer.
> `[PAUSE 2]`
> That is Module Zero.
> `[PAUSE 2]`
> You will open a terminal, type one short command, and find out if Python is already there.
> `[PAUSE 2.5]`

> ### BEAT 7 — Mac, Windows, Linux
>
> Mac. Windows. Linux.
> `[PAUSE 2]`
> Each one gets its own short video, with the exact steps for that computer.
> `[PAUSE 2]`
> You only watch yours.
> `[PAUSE 2.5]`

> ### BEAT 8 — Where this goes
>
> By the end of this course, you will have built a real tool.
> `[PAUSE 2]`
> Something you can actually show someone.
> `[PAUSE 2.5]`

> ### BEAT 9 — Outro
>
> You do not need a fancy computer. You do not need to be good at math.
> `[PAUSE 2]`
> Start with Module Zero.
> `[PAUSE 2]`
> Take your time.
> `[PAUSE 3]`

---

**Word count:** ~215 spoken words. **Speech:** ~100 s. **Silence:** ~50 s. **Total:** ~2:30.

Note what is *not* in this script, compared to v1: no "interpreter," no list of ten course
topics, no "capstone," no "portfolio," no staircase of module names, no three-panel montage
of use cases. Every one of those is a real thing the course covers — they belong in Module 00
and on the course description page, where a reader can go at their own speed. The hero's only
job is to make an absolute beginner feel safe enough to click into Module 00.

### Reading notes for Charles

- Sit closer to the mic than feels necessary, roughly a hand-span, slightly off-axis so
  plosives miss the capsule.
- Read it like you are explaining it to one person across a kitchen table, not presenting
  to a room. Slightly under-energized beats slightly over-energized here.
- Let sentences fall at the end. Rising intonation reads as nervous.
- Fluffed a line? Stop, take a breath, say the whole line again from the start. Trim later.
- Record all nine beats in one sitting, same position, same gain, so the tone matches.
- Bad room? Face into a corner with clothes hanging nearby, or throw a duvet over a chair
  in front of you. It genuinely works better than any plugin.

---

## 4. Scene-by-scene storyboard

Palette: paper `#fffaf1`, ink `#101827`, accent `#991b1b`. Fonts as v1 (Marker Felt Wide
headings, Bradley Hand notes, Menlo Bold code). 1920×1080, 30 fps.

Every beat: **1.0 s silent lead-in → draw → hold ≥ 2.0 s in silence.** The "Ink" column is
how long the pen is actually moving; the remainder of the beat is a still frame.

| # | Start | Len | Ink | On-screen text (all of it) | Visual — max 3 elements | Accent used on |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0:00 | 14 s | 6 s | `PYTHON`<br>`Zero → Useful` | Title drawn in large marker caps, center. One underline swipe. ASV Labs Learn mark fades in, bottom-left. Nothing else. | the arrow only |
| 2 | 0:14 | 14 s | 6 s | `never written code?`<br>`good.` | A single simple stick figure at a laptop, shrugging. One question mark above. That is the whole frame. | the word `good.` |
| 3 | 0:28 | 20 s | 9 s | `instructions` | Three short handwritten lines inside a sketched box (like a note), then one arrow right, then a simple monitor outline. Drawn slowly, one at a time. | the arrow |
| 4 | 0:48 | 22 s | 10 s | `hello.py` → `output` | Sketched file window with two visible code lines in Menlo. Arrow down. Sketched output window printing `Hello`. Cursor blinks twice, then stops. | `Hello` in the output |
| 5 | 1:10 | 18 s | 8 s | `messy → clean` | Left: a scribbly lopsided table. Arrow. Right: the same table, tidy, with one bar. Only two objects. | the tidy version |
| 6 | 1:28 | 20 s | 9 s | `Module 00`<br>`is Python here?` | One large sketched terminal window. It types out `$ python3 --version` character by character, unhurried, then the reply `Python 3.12` appears. Nothing else on screen. | `Python 3.12` |
| 7 | 1:48 | 18 s | 8 s | `Mac  Windows  Linux` | Three simple outlined computer shapes, drawn left to right, evenly spaced, each labelled. A small tick appears under each. No detail, no OS logos. | the three ticks |
| 8 | 2:06 | 12 s | 5 s | `you will build`<br>`something real` | One sketched app window with three rows and a small bar chart. Drawn as a single unit. | the bar |
| 9 | 2:18 | 16 s | 7 s | `Start with Module 00`<br>`take your time` | ASV Labs Learn mark assembles at center, the two text lines write in beneath it, one accent underline swipe. Hold the finished frame for a full 3 s before fade. | the underline |

**Total: 2:34.** Ink time 68 s of 154 s = **44 %**. The other 56 % is a still, finished
picture on screen. v1 was drawing more or less constantly.

Reusable from v1: the terminal-window sketch (scene 5), the file→output pipeline (scene 3),
and the outro mark build (scene 8) are all already written in `SketchVideo.swift` — they need
to be slowed down and stripped back, not redrawn.

---

## 5. Install videos — outline

Same visual rules, same pacing, same voice. Each one is **one terminal window on screen,
the whole time.** No cutting between scenes. The window is the set.

Every install video follows the same four-beat shape, so the second one a viewer watches
feels familiar:

```
1. What to open          2. What to type
3. What success looks like  4. If it did not work
```

The command is always shown **and** typed out on screen, slowly, character by character.
Never a jump-cut to a finished command.

### 5a — macOS (~2:00)

| Beat | On screen | Narration (short version) |
| --- | --- | --- |
| Open | `Command + Space` → type `Terminal` → Return | "Hold Command and press Space. Type the word Terminal. Press Return. `[PAUSE]` A window opens with a blinking cursor. That is normal. Nothing is broken." |
| Type | `python3 --version` | "Type this exactly: python three, space, dash dash version. `[PAUSE]` Then press Return." |
| Success | `Python 3.12.4` | "If you see the word Python and a number starting with three, you already have it. You are done. `[PAUSE]` Any three-point-ten or higher is fine." |
| If it fails | `command not found` → python.org/downloads | "If it says command not found, Python is not installed yet. Go to python dot org slash downloads. Download the Mac installer. Run it. Keep every default." |
| **Recovery tip** | `⚠️ quit and reopen Terminal` | **"Then quit Terminal completely and open it again. This is the one step people miss. The old window does not know Python exists yet."** |

### 5b — Windows (~2:30)

| Beat | On screen | Narration (short version) |
| --- | --- | --- |
| Open | Windows key → type `PowerShell` → Enter | "Press the Windows key. Type PowerShell. Press Enter. `[PAUSE]` A blue window opens. That is the right one." |
| Type | `python --version` | "Type: python, space, dash dash version. `[PAUSE]` On Windows it is just python. No three." |
| Success | `Python 3.12.4` | "The word Python and a number starting with three means you are done." |
| If it fails | Microsoft Store opens, **or** `not recognized` | "Two things can happen. Nothing found — or the Microsoft Store pops open. Both mean the same thing: it is not properly installed. Close the Store. Go to python dot org slash downloads." |
| **Recovery tip** | `☑ Add python.exe to PATH` — held on screen, accent box | **"On the very first installer screen there is a small checkbox at the bottom: Add python dot exe to PATH. Tick it. `[PAUSE 3]` If you skip that box, nothing else will work. Then Install Now, and close and reopen PowerShell."** |

Windows gets the extra 30 seconds because that checkbox causes more beginner failures than
everything else in Module 00 combined. Hold it on screen, in accent, and say it twice.

### 5c — Linux (~1:45)

| Beat | On screen | Narration (short version) |
| --- | --- | --- |
| Open | `Ctrl + Alt + T` | "Hold Control and Alt, and press T. Your terminal opens. If that shortcut does nothing, find Terminal in your applications list." |
| Type | `python3 --version` | "Type: python three, space, dash dash version. Press Enter." |
| Success | `Python 3.12.4` | "A number starting with three means you already have it. Most Linux systems do." |
| If it fails | `sudo apt update`<br>`sudo apt install python3` | "If not, install it. On Ubuntu or Debian, these two lines. It will ask for your password — the letters will not appear as you type, and that is normal." |
| **Recovery tip** | `dnf` / `pacman` alternatives | **"If apt is not your package manager, swap it out: dnf on Fedora, pacman on Arch. Not sure which you have? Search for 'install python3 on' plus the name of your Linux."** |

### 5d — Your first Python file (~2:30, shared)

Made once, embedded at the end of Module 00 for everyone. Only one card differs by OS.

| Beat | On screen | Point |
| --- | --- | --- |
| Folder | `mkdir asv-learn-python-zero`<br>`cd asv-learn-python-zero` | "One folder. Everything you write lives here." |
| Write | `hello.py` with two `print` lines | Show it in an editor, typed slowly. |
| Run | `python3 hello.py` — with a small side card: `Windows: python hello.py` | Both commands visible at once, so nobody has to remember which they are. |
| Output | `Hello from ASV Labs Learn` | "Those lines are called output. Your computer just did what you told it to. That is programming." |
| If it fails | `can't open file` | **"That error almost always means you are in the wrong folder. Type `ls` — or `dir` on Windows — until you can see hello dot py in the list."** |

All of the above already exists in prose in `content/courses/module-00-local-python.md`
(Steps 1–7). The videos are a narration of that page, not new content — so the text and the
video can never drift apart, and the page stays the source of truth.

---

## 6. What NOT to do (from the v1 critique)

| Do not | Instead |
| --- | --- |
| **Use text-to-speech.** Not Samantha, not any of them. | Charles reads it. `build-voiceover.sh` gets retired for this project. |
| **Let narration run continuously.** | ≥ 2 s of true silence at the end of every beat. |
| **Draw fast, or draw many things.** | ≤ 3 elements per beat, ≥ 0.8 s per stroke, ≤ 55 % ink time. |
| **Stack more than one idea in a beat.** | One idea. If a beat needs "and", it is two beats. |
| **List ten topics in twelve seconds.** (v1 scene 6 — where he quit) | Cut it entirely. It is on the course page, in text, where it belongs. |
| **Spread the accent color around.** | Accent once per beat, under 10 % of ink. |
| **Write full sentences in handwriting on screen.** | ≤ 6 words per line, ≤ 2 lines, 64 px minimum. |
| **Hard-cut between scenes.** | 0.5 s cross-dissolve, and only during silence. |
| **Move the camera, pan, or zoom.** | Locked frame. Always. |
| **Use jargon before explaining it.** ("interpreter", "PATH", "execute") | Plain words first. "PATH" appears only in the Windows video, only as a checkbox to tick. |
| **Put music under speech.** | Title and outro cards only, or none at all. |
| **Assume audio is on.** | Burned-in captions. LearnHouse autoplays the hero muted. |

---

## 7. Reference: v1 assets found in the repo

Checked before planning. What exists today:

| Path | Verdict |
| --- | --- |
| `brand/asv-labs-learn/asv-labs-learn-python-zero-intro.mp4` | v1, 76 s, 5.8 MB — **currently live** as the course `thumbnail_video` |
| `brand/asv-labs-learn/asv-labs-learn-python-zero-hero.png` | Live as `thumbnail_image`. Still good — it is the finished title frame, and the v2 beat 1 is a slower version of the same drawing. **Keep.** |
| `brand/asv-labs-learn/asv-labs-learn-python-zero-outro.png` | Reusable as-is for social/email. **Keep.** |
| `brand/asv-labs-learn/asv-labs-learn.svg`, `*-badge.svg`, `*-email-badge.svg` | Brand marks. **Keep, unchanged.** |
| `brand/asv-labs-learn/intro-video/SketchVideo.swift` | 37 KB Swift renderer. **This is the foundation Charles said was OK.** Reusable — see §8. |
| `brand/asv-labs-learn/intro-video/build-voiceover.sh` | TTS generator. **Retire** — replaced by Charles's own recordings. |
| `brand/asv-labs-learn/intro-video/audio/scene-*.m4a` | 8 Samantha TTS clips. **Delete once v2 records.** |
| `brand/asv-labs-learn/intro-video/script.txt`, `timing.txt` | v1 script and measured clip lengths. Superseded by this file. |
| `brand/asv-labs-learn/intro-video/GrabFrames.swift` | Pulls stills out of a finished MP4 for QA. **Keep.** |
| `scripts/set-course-intro-video.mjs` | Uploads video + poster to the live course. **Keep, reuse for v2.** |
| `content/courses/module-00-local-python.md` | The install videos narrate this. Already covers Mac/Windows/Linux. **Source of truth.** |

**Worth deciding now:** v1 is live on the course page right now. Options are to leave it up
until v2 lands, or swap `thumbnail_type` to image-only so the hero PNG shows alone in the
meantime. The PNG is good and carries no pacing problem. Charles's call.

---

## 8. What "approve" turns into (not started)

The renderer is genuinely reusable. Three changes convert it from the v1 feel to the v2 feel:

1. **Split scene duration from clip duration.** Today, `SketchVideo.swift` sets scene length
   equal to the voiceover clip length from `timing.txt`, which is exactly why there is no
   air. v2 gives each beat an explicit length, and the voice sits inside it after a 1.0 s
   lead-in, with the remainder held silent.
2. **`TAIL: 0.6` → `2.0`, `leadIn: 0.35` → `1.0`.** Two constants, `SketchVideo.swift:18`
   and `:662`. Most of the "rushed" feeling is in these two numbers.
3. **Cap ink time per beat and strip each scene to ≤ 3 elements.** The drawing routines stay;
   they draw less, and slower.

Then: Charles records nine beat files → drop them into `intro-video/vo/` → rebuild → QA the
contact sheet → `node scripts/set-course-intro-video.mjs`. The Canva route from the v1 notes
stays available if an editable version is wanted instead, and the per-beat audio files work
in either pipeline unchanged.

---

**Approve this plan and script, and I will build the calm Canva version for your voiceover.**

Tell me if you want any of these changed first:

- Hero length — 2:30 as written, or trim toward 2:00 by cutting beats 5 and 8
- Whether beat 8 ("you will build something real") earns its place, or is a promise too early
- Split install videos as recommended, or one chaptered file after all
- Any line in §3 that does not sound like you saying it — that one matters most, since you
  are the one reading it
