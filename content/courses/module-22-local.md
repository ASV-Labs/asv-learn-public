# Graduation Certificate

## Why this lesson exists

You finished the Python Zero learning path and (ideally) a portfolio capstone. This module is about **what completion means**, how to **present evidence**, and how **verification** works conceptually on this prototype platform.

It is **not** mainly a “print a fake diploma in Python” exercise. A certificate here is **completion proof for a learning product**, not a college degree, professional license, or employment guarantee.

Optional: a tiny `certificate_card.py` that formats **your** name, course title, and date as a personal record you keep in your scripts folder.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

Keep your scripts, capstone README, and any personal record card in this folder (or a clearly named subfolder you can zip later).

## What the certificate means

| It means | It does not mean |
| --- | --- |
| You completed the stated course path on this learning product | You earned a university degree |
| You can show learning artifacts (scripts, capstone, README) | You are licensed or certified by a government body |
| A completion record may be listed with a date and identifier | Guaranteed job placement or internship |
| Someone can conceptually verify that a completion record exists | That every line of your code was proctored in person |

Be honest in resumes and profiles:

> Completed ASV Labs Learn — Python Zero to Useful (learning certificate / completion record). Portfolio: progress tracker CLI with JSON storage and CSV export.

Avoid:

> Certified Python Engineer, accredited degree equivalent.

## How to present portfolio evidence

Your strongest proof is not a badge image alone. It is a **folder you can explain**.

Suggested evidence pack:

```text
asv-learn-python-zero/
├── hello.py / about_me.py / ...     # earlier module scripts
├── clean_rows.py
├── progress_tracker.py              # capstone
├── progress.json                    # sample data (optional, scrubbed)
├── exports/progress_report.csv
├── tests/
├── README.md                        # capstone story + commands
└── certificate_card.py              # optional personal record
```

When you share:

1. Lead with the **capstone README** (problem, lane, commands, limitations)
2. Show **three terminal proofs**: `--help`, `--summary`, `--export`
3. Point to **one earlier script** that shows growth (for example `clean_rows.py`)
4. Mention hours honestly for the capstone (15–25 target)
5. Only then mention the completion certificate as supporting context

## How verification works (conceptual)

On a finished learning product, verification usually looks like this:

1. Completing the path creates a **completion record** (name, course, issue date, credential id)
2. A **verification URL** or lookup page lets another person confirm that record
3. The page shows limited public fields — not your password or private notes
4. Downloadable PDF / badge assets are **presentations** of that record

This ASV Learn build is still a **prototype**. Certificate display, PDF download, email badges, and public verify URLs may be partial, stubbed, or not fully wired yet. If a button or link is missing, your **local portfolio folder** remains the reliable proof you control.

If a credential id and verify link are issued to you later, store them in your notes and in `certificate_card.py` — but do not invent official-looking verification URLs you were not given.

## Optional local task — personal record card

### Step 1 — Create `certificate_card.py`

Use **your** name and today’s date. This is a personal record formatter, not an official issuer.

```python
# certificate_card.py — personal completion record (not an official degree)
# Replace the name and date with your own. Keep claims honest.

from datetime import date

record = {
    "learner_name": "Your Name Here",
    "course_name": "Python Zero to Useful",
    "provider": "ASV Labs Learn",
    "record_type": "Learning completion record (not a degree or license)",
    "completion_date": date.today().isoformat(),
    "portfolio_focus": "Progress Tracker CLI — JSON storage + CSV export",
    "credential_id": "(add only if the platform issued you one)",
    "verify_url": "(add only if the platform issued you one)",
}

print("ASV Labs Learn — personal completion card")
print("=" * 50)
print("Learner:", record["learner_name"])
print("Course:", record["course_name"])
print("Provider:", record["provider"])
print("Record type:", record["record_type"])
print("Completion date:", record["completion_date"])
print("Portfolio focus:", record["portfolio_focus"])
print("Credential id:", record["credential_id"])
print("Verify URL:", record["verify_url"])
print("=" * 50)
print("Keep this with your scripts folder as a personal note.")
print("Your capstone README and demo are the main portfolio proof.")
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 certificate_card.py
```

Windows:

```bash
python certificate_card.py
```

### Step 3 — Make it yours

Replace `"Your Name Here"` with your name. Set `portfolio_focus` to your primary lane story. Only fill credential fields if you actually received them.

## Graduation checklist

Use this as your exit checklist for the whole course:

### Skills and artifacts

- [ ] Local Python edit → run rhythm is comfortable
- [ ] Module scripts exist in `asv-learn-python-zero` (or your chosen folder)
- [ ] Capstone meets Module 21 acceptance criteria
- [ ] Capstone README is written for a portfolio reader
- [ ] Tests for the capstone pass
- [ ] You can demo the tracker in under five minutes

### Honest presentation

- [ ] You describe the certificate as completion / learning proof, not a degree
- [ ] You do not invent accreditation or job guarantees
- [ ] You lead with portfolio evidence, not badge images alone
- [ ] You understand verification is a lookup of a completion record (when available)
- [ ] You know this platform may still be a prototype for certificate delivery

### Optional extras

- [ ] `certificate_card.py` prints your personal record
- [ ] Sample JSON/CSV export saved for demos
- [ ] Short “what I’d improve next” note in the capstone README

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| certificate | Completion document/record for a learning product — not automatically a degree or license |
| credential id | Unique code identifying one issued completion record (when the platform provides one) |
| verification | Looking up a completion record to confirm it exists, usually via a public page or URL |
| portfolio | Collection of evidence: code, README, tests, and demos you can explain |
| prototype | Early product stage — some certificate features may be incomplete |

## Common mistakes

Treating Module 22 as the whole graduation — without a capstone demo, the certificate is thin.

Copying a verify URL from a lesson example and presenting it as real issuance.

Overclaiming outcomes on LinkedIn (“accredited certification”) when you hold a learning completion record.

Hiding the code and only posting a badge — reviewers and hiring managers ask what you built.

## Proof checklist

- [ ] You can explain what the certificate means in one honest sentence
- [ ] Portfolio evidence pack is organized and demoable
- [ ] Capstone README + commands are ready to show
- [ ] Optional `certificate_card.py` uses your name and an honest record type line
- [ ] You know verification is conceptual/record lookup — and that this build may still be prototyping delivery

You finished **Python Zero to Useful** on the local path. Keep the scripts folder. Lead with the progress tracker. Treat the certificate as supporting completion proof — not the entire story.
