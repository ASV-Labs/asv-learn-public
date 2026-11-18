# ASV Labs Learn — locked platform decisions

**Product name:** ASV Labs Learn  
**Canonical URL:** https://learn.asv-labs.com  
**LMS:** LearnHouse fork in this repo (`asv-learn`)  
**Updated:** 2026-08-08

## Architecture

| Decision | Choice |
| --- | --- |
| Primary product surface | **learn.asv-labs.com only** |
| TechNodeX / technodex.io | Source / reference until expiry (~Oct 2026). Not the product we ship. |
| Practice model | **Local lab only** (edit → save → run / authorized VM). No hosted sandboxes for v1. |
| Auth | Account signup/signin as needed for progress. |
| Billing / payments | **Free forever.** No Stripe/Lemon checkout in the product story. |
| Domain | learn.asv-labs.com |
| Brand | ASV Labs Learn. No TechNodeX in learner UI. No personal names in public branding. |
| Organization display name | **ASV Labs** (never a personal name on the public site) |
| Course catalog | **All 13 courses public.** No phased “first/last” launch set. |
| Course names | Keep current titles. Improve depth; don’t kill or rename. |
| Course card + intro | Every course gets a **hero card image** and an **intro video**, same pattern as Python Zero. |

## Hours policy (clarified)

- **Card hours** = focused-student estimate for the published ASV Learn path (what a serious learner should budget).
- **GitHub feedstock** (Kali, SEC+, EthicalHacking_1, etc.) is raw curriculum material — often longer/deeper than the card.
- If GitHub teaching is better than the live class, **raise the class quality** to that standard (house-style lessons, quizzes, practice).
- Do **not** silently inflate the card to 300h+ just because a repo claims that. Expand structure only if we intentionally grow the published path; otherwise keep the focused estimate and make every hour count.

## Delivery model

| Layer | Where |
| --- | --- |
| Build / iterate | Local until catalog UX + cards + intros + content review look good |
| Production website | **learn.asv-labs.com** on Hetzner (when ready — not before) |
| Deploy logistics | External agents using `docs/DEPLOY-HETZNER.md` |

**Git:** No commits until course material has a real review pass and looks good. Improve in place; don’t dump junk.

## Platform work priority (after content)

1. Catalog UX (all 13 visible, clear, free)
2. Org / learner UX polish
3. Progress / notes / proof that fit local practice
4. Brand consistency (ASV Labs Learn everywhere learners look)
5. Production readiness (env, email/Resend, backups)
6. **No payments work**

## Git policy

- Prefer **update commits** that improve without discarding course content or tooling.
- Do not force-overwrite history or drop `content/courses/` work.
- Commit only when Charles asks; keep messages about *why*.

## Current local catalog

See `content/courses/learnhouse-course-ids.json` and `content/courses/catalog-13.json`.  
All 13 courses are imported and house-style deepened on the local org `charles-learning-lab`.
