# CSV, JSON, and Data Transformation Workflows

## Why this lesson exists

Entry-level data and operations work often looks like this: messy rows arrive, some scores are blank, names need trimming, and someone needs a **clean summary** before export.

CSV and JSON are two common shapes for that work:

- **CSV** — table-like rows for spreadsheets and simple exports
- **JSON** — nested structures Python (and many tools) can load and save easily

In this lesson you will:

1. Validate rows before converting types
2. Separate clean records from rejected rows
3. Build a summary (counts + average)
4. Print JSON-style cleaned data and a short report from `clean_rows.py`
5. Practice the same habits your capstone will need

Still local: edit a `.py` file, run it, read the terminal.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `clean_rows.py`.

## Rows become dictionaries

Think of one CSV-style row as a dictionary:

```python
row = {"name": "Ada", "score": "95", "team": "project"}
```

Before math, `"95"` is still text. Convert only after validation:

```python
if row["score"].isdigit():
    score = int(row["score"])
```

## Transformation pipeline

A clean beginner pipeline:

1. **Read** each incoming row
2. **Validate** required fields
3. **Normalize** text (strip, title-case team names)
4. **Convert** safe numeric fields
5. **Collect** cleaned records and count rejects
6. **Summarize** and print / export

```python
cleaned = []
invalid = 0

for row in rows:
    raw_score = row["score"].strip()
    if not raw_score.isdigit():
        invalid += 1
        continue
    cleaned.append({
        "name": row["name"].strip(),
        "score": int(raw_score),
        "team": row["team"].strip().title(),
    })
```

## JSON for readable proof

`json.dumps(..., indent=2)` prints structures humans can read:

```python
import json

print(json.dumps(cleaned, indent=2))
```

Later, the capstone will **write** JSON to a file for storage. This lesson focuses on transforming in memory and printing proof.

## CSV mentally (and optionally on disk)

CSV is commas and lines:

```text
name,score,team
Ada,95,project
Grace,88,school
```

You can write with the `csv` module when you are ready:

```python
import csv
from pathlib import Path

path = Path("cleaned_scores.csv")
with path.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=["name", "score", "team"])
    writer.writeheader()
    writer.writerows(cleaned)
```

The starter below prints JSON and a summary first. Adding CSV export is an excellent “one small change.”

## Teaching sample with expected output

Incoming rows include one bad score on purpose:

```python
rows = [
    {"name": "Ada", "score": "95", "team": "project"},
    {"name": "Grace", "score": "88", "team": "school"},
    {"name": "Missing", "score": "", "team": "school"},
]
```

After cleaning you should see two valid rows, one invalid, and an average of `91.5`.

## Common beginner mistakes

Converting with `int(row["score"])` before checking blanks — crashes on `""`.

Forgetting `.strip()` — `" 95"` may fail `.isdigit()` depending on content; clean text first.

Mixing cleaned and rejected rows in one list with no flag — summaries become wrong.

Printing only the average and discarding the cleaned rows — you need both for portfolio proof.

Assuming every CSV is perfect — real data is messy; validation is the skill.

## Your local task

### Step 1 — Substantial starter with working prints

Create `clean_rows.py`:

```python
# clean_rows.py — CSV, JSON, and Data Transformation
# Validate → normalize → convert → summarize. Capstone warm-up.

import json


rows = [
    {"name": "  Ada  ", "score": "95", "team": "project"},
    {"name": "Grace", "score": "88", "team": "school"},
    {"name": "Lin", "score": "100", "team": "project"},
    {"name": "Missing", "score": "", "team": "school"},
    {"name": "Bad", "score": "n/a", "team": "ops"},
]


def clean_row(row):
    """Return a cleaned dict, or None if the row is invalid."""
    name = row.get("name", "").strip()
    team = row.get("team", "").strip().title()
    raw_score = str(row.get("score", "")).strip()

    if not name:
        return None
    if not raw_score.isdigit():
        return None

    score = int(raw_score)
    if score < 0 or score > 100:
        return None

    return {"name": name, "score": score, "team": team}


cleaned_records = []
rejected = []

for row in rows:
    cleaned = clean_row(row)
    if cleaned is None:
        rejected.append(row)
    else:
        cleaned_records.append(cleaned)

scores = [record["score"] for record in cleaned_records]
summary = {
    "valid_count": len(cleaned_records),
    "invalid_count": len(rejected),
    "average_score": (sum(scores) / len(scores)) if scores else None,
    "teams": sorted({record["team"] for record in cleaned_records}),
}

print("Cleaned records (JSON)")
print(json.dumps(cleaned_records, indent=2))
print()
print("Summary report")
print("-" * 40)
print("Valid rows:", summary["valid_count"])
print("Invalid rows:", summary["invalid_count"])
if summary["average_score"] is None:
    print("Average score: n/a (no valid rows)")
else:
    print(f"Average score: {summary['average_score']:.1f}")
print("Teams:", ", ".join(summary["teams"]) if summary["teams"] else "(none)")
print()
print("Rejected raw rows:", len(rejected))
for row in rejected:
    print(" -", row)
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 clean_rows.py
```

Windows:

```bash
python clean_rows.py
```

Confirm:

- Three cleaned records (Ada, Grace, Lin)
- Two rejected rows
- Average `94.3` (95 + 88 + 100) / 3
- Teams include Project and School

### Step 3 — Capstone-facing upgrades (pick at least one)

Make the script more like a real tool:

1. Write `cleaned_scores.json` with `json.dump`
2. Write `cleaned_scores.csv` with `csv.DictWriter`
3. Add a `--strict` flag (via `argparse`) that also rejects scores below 70
4. Group average by team and print a small per-team table

Save, run again, and keep the terminal proof.

### Step 4 — Explain the pipeline

In one sentence: “I validated each row, converted only safe scores, kept rejects separate, and summarized the clean set.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| CSV | Plain-text table: each row is a line, fields separated by commas |
| JSON | Structured text for lists, dictionaries, and saved app data |
| row | One record in a table-like dataset |
| validation | Checking that a value is safe to use before converting or storing |
| transformation | Changing data from one useful shape into another |

## Proof checklist

- [ ] `clean_rows.py` runs and prints cleaned JSON plus a summary
- [ ] Invalid rows are counted separately from valid rows
- [ ] You can explain why blank/`n/a` scores must not call `int()` blindly
- [ ] You completed at least one upgrade (JSON file, CSV export, flag, or team averages)
- [ ] `clean_rows.py` lives in your course folder

When those are true, you are ready for the **Portfolio Capstone: Progress Tracker** (Module 21) — budget serious time.
