# ASV Labs Learn — Hetzner production prep

For external agents shipping **https://learn.asv-labs.com** from this repo.  
Local build is the source of truth; this doc is the handoff checklist.

## Product constraints (do not violate)

- Brand: **ASV Labs Learn** (not TechNodeX, not LearnHouse marketing)
- Domain: **learn.asv-labs.com**
- Access: **free forever** — do not enable paid checkout / Stripe customer flows for learners
- Practice: local lab instructions in courses; no requirement to stand up TechNodeX sandboxes for launch
- All **13 courses** public

## What to deploy

- Docker image built from this repo (`asv-labs-learn` / compose stack mirroring `~/.learnhouse/local-community` patterns)
- Postgres + app + any required SSR/proxy already used locally
- Org: production org slug TBD (likely `asv-labs` or keep existing) — confirm with Charles before cutover
- Course content: export from local or re-run `scripts/import-catalog-course.mjs` / `repush-catalog-course.mjs` against prod API with prod admin credentials

## Secrets / env (provision on VPS — do not commit)

| Variable / secret | Purpose |
| --- | --- |
| `DATABASE_URL` / Postgres creds | Primary DB |
| NextAuth / session secrets | Auth |
| `RESEND_API_KEY` + from-address | Transactional email |
| Admin bootstrap credentials | First org admin |
| TLS certs | learn.asv-labs.com |
| Optional OAuth (Google etc.) | Only if Charles enables social login |

Email from should be ASV Labs Learn / asaltyvet domain — not TechNodeX.

## DNS / TLS

- Point `learn.asv-labs.com` A/AAAA to Hetzner VPS
- Full TLS (Let’s Encrypt or Cloudflare Full)
- Optional: keep `technodex.io` up until Oct as read-only reference; do not treat it as prod for ASV Learn

## Content migration

1. Build image from this repo with ASV branding
2. Bring up stack on Hetzner
3. Create/configure org (name **ASV Labs**, color `#991b1b`, logo from `brand/asv-labs-learn/`)
4. Import all courses from `content/courses/*.json` (skip thin re-import if already present — use repush)
5. Verify public catalog lists all 13
6. Smoke-test signup → open course → complete a lesson (local practice copy still honest)

## Scripts in this repo

| Script | Use |
| --- | --- |
| `scripts/fixture-to-course-json.mjs` | Fixture → JSON (rare after deepen) |
| `scripts/import-catalog-course.mjs` | Create courses on a LearnHouse API |
| `scripts/repush-catalog-course.mjs` | Update activity TipTap from JSON |
| `scripts/assemble-*-json.mjs` | Rebuild JSON from stage markdown |
| `content/courses/learnhouse-course-ids.json` | Local UUID registry (prod will differ) |

Set `LH_BASE_URL`, `LH_EMAIL`, `LH_PASSWORD`, `LH_ORG_SLUG` for the target environment.

## Backups

- Nightly Postgres dump before content pushes
- Keep media volume backups (thumbnails, uploads)

## Out of scope for launch

- Hosted Python/JS/Shell sandboxes
- Stripe / Lemon / Founding / Pro tiers
- TechNodeX “Check Work” / room UX
- Killing or renaming courses

## Acceptance checks

- [ ] https://learn.asv-labs.com loads as ASV Labs Learn
- [ ] No TechNodeX branding in learner chrome
- [ ] All 13 courses visible without payment
- [ ] Signup/login + progress work
- [ ] Email (reset / verify) via Resend works
- [ ] No learner-facing upgrade/paywall
