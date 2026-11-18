# Course cards + intro videos (all 13)

Same treatment as **Python Zero to Useful** for every course:

1. **Course card / hero still** — catalog + course page image  
2. **Intro video** — sketch-style open with voiceover (Python Zero pipeline under `brand/asv-labs-learn/intro-video/`)

## Python Zero reference assets

| Asset | Path |
| --- | --- |
| Hero / poster | `brand/asv-labs-learn/asv-labs-learn-python-zero-hero.png` |
| Intro mp4 | `brand/asv-labs-learn/asv-labs-learn-python-zero-intro.mp4` |
| Script / VO / Swift pipeline | `brand/asv-labs-learn/intro-video/` |
| Upload hero | `scripts/set-course-hero-image.mjs` |
| Upload video + poster | `scripts/set-course-intro-video.mjs` |

## All 13 — asset checklist

| # | Course | Hero PNG | Badge | Intro MP4 | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Python Zero to Useful | ✓ | ✓ | ✓ (existing) | Matched catalog card system |
| 2 | CompTIA Security+ | ✓ | ✓ | □ | Hero+badge live |
| 3 | Ethical Hacking & PT | ✓ | ✓ | □ | Hero+badge live |
| 4 | Kali Linux & PT Tools | ✓ | ✓ | □ | Hero+badge live |
| 5 | SOC & Blue Team | ✓ | ✓ | □ | Hero+badge live |
| 6 | Python for Cybersecurity | ✓ | ✓ | □ | Hero+badge live |
| 7 | Applied Agentic AI | ✓ | ✓ | □ | Hero+badge live |
| 8 | AI Fundamentals for Builders | ✓ | ✓ | □ | Hero+badge live |
| 9 | AI Foundations Engineering | ✓ | ✓ | □ | Hero+badge live |
| 10 | Python Full Stack | ✓ | ✓ | □ | Hero+badge live |
| 11 | Full Stack Development | ✓ | ✓ | □ | Hero+badge live |
| 12 | React & Modern Frontend | ✓ | ✓ | □ | Hero+badge live |
| 13 | DevOps & Infrastructure | ✓ | ✓ | □ | Hero+badge live |

Hero cards: badge on left, track eyebrow + Futura title + New York tagline on paper side. No per-card “ASV Labs Learn” stamp and no CY/SW/AI letter codes.


## Naming convention

```
brand/asv-labs-learn/courses/<slug>/
  hero.png
  intro.mp4
  intro-video/          # script, VO beats, contact sheets, Swift helpers as needed
```

Upload via generalized scripts (to add): pass `--slug` + paths; UUIDs from `content/courses/learnhouse-course-ids.json`.

## Order of work

1. Catalog UX looks clean locally  
2. Content review (no commit until it looks good)  
3. Hero cards for all 13  
4. Intro scripts → VO → sketch videos → upload  
5. Then public move to learn.asv-labs.com  

Public site name is **ASV Labs** / **ASV Labs Learn**. No personal name on the website.
