# Data Pipelines & Preprocessing

## Why this lesson exists

Models inherit the habits of their data path. If invalid rows, missing timestamps, or sensitive text slide through unnoticed, training and inference become quiet failures: the job “succeeds” while quality dies.

A **data pipeline** is a repeatable path from source data to validated training or inference data. Stage 02 teaches you to write a **pipeline card** — source, schema, quality checks, transform step, rejection policy, and owner — before you write clever transform code.

You will practice locally in Python. You are not building a warehouse or a streaming platform. You are learning the production habit: **make data quality visible before the model sees anything**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ai-foundations-engineering
cd ~/asv-learn-ai-foundations-engineering
```

Windows (PowerShell):

```powershell
mkdir $HOME\asv-learn-ai-foundations-engineering
cd $HOME\asv-learn-ai-foundations-engineering
```

You will create `pipeline_card.py` in that folder.

## What a production pipeline must make visible

| Concern | Why it matters |
| --- | --- |
| Source | You know where rows came from and whether they were approved |
| Schema | Columns and types are explicit, not guessed from a lucky sample |
| Quality checks | Missing, empty, or invalid values fail before training |
| Transform step | Raw data becomes model-ready in a named, repeatable way |
| Rejection policy | Bad rows are counted and handled, not silently “cleaned away” |
| Owner | Someone is accountable when the pipeline breaks overnight |

Silent acceptance is the enemy. A pipeline that drops bad rows without counts looks healthy while starving the model of hard cases or hiding a broken export.

## Start here: data contract before transformation

At the start, do not open with regex cleanup or feature code. Ask:

1. Where does the data come from?
2. Which columns and types are expected?
3. Which checks catch bad rows?
4. What transform is allowed after validation?
5. What happens to rejected rows, and who fixes the pipeline?

You are building one **pipeline card**, not proving transform cleverness. The goal is a boundary another engineer can test without guessing.

### Pipeline questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What is the source? | Training data stays tied to an approved origin |
| What is the schema? | Downstream code does not invent columns |
| What checks run? | Quality failures become visible |
| What transform is allowed? | Cleaning stays limited and reviewable |
| What is the rejection policy? | Bad rows do not poison the training set quietly |
| Who owns failures? | Broken jobs get an on-call path |

Do not start by editing transforms. First say the card out loud: *approved support tickets, these columns, these checks, this transform, reject and count failures, owned by data platform.*

## How to use this lesson

Read in this order:

- **Learn:** connect preprocessing to visible data quality
- **Inspect:** read each pipeline-card field as operational evidence
- **Build:** draft one pipeline card before writing transform helpers
- **Prove:** explain how another engineer would catch bad data without reading tribal knowledge

Practice after reading means you should understand the card before editing code. If the starter object looks like boilerplate, read one key at a time and ask: *what failure does this make visible?*

## One clean pass through this lesson

Before the editor, walk the data path as a quality story:

1. An approved source produces rows.
2. Schema rules say which columns and types are expected.
3. Quality checks reject rows that cannot be trusted.
4. A named transform prepares only the accepted rows.
5. Rejection counts are logged without storing private text, and an owner can respond.

That chain is the MLOps lesson. Preprocessing is not “make the CSV prettier.” Preprocessing is a controlled gate between messy reality and model inputs.

## Privacy and logs

Support tickets and user messages often contain emails, tokens, or personal details. Your rejection policy should prefer **counts and reason codes** over dumping raw rejected text into shared logs.

Good: `rejected_empty_text=12`, `rejected_bad_timestamp=3`  
Risky: printing full ticket bodies into a world-readable log file

Keep the transform step boring on purpose. Normalize whitespace. Drop empty training examples. Do not invent labels. Do not “repair” missing ground truth by guessing.

## The pipeline card shape

```python
pipeline_plan = {
    "source": "approved support ticket export",
    "schema": {
        "text": "string",
        "created_at": "datetime",
        "label": "optional string",
    },
    "quality_checks": [
        "text is present",
        "created_at parses",
        "no private tokens in text",
    ],
    "transform_step": "normalize whitespace and remove empty training examples",
    "rejection_policy": "reject invalid rows and log counts without storing private text",
    "owner": "data platform owner",
}
```

Each field is operational:

- `source` — approved origin of the rows
- `schema` — expected columns and types
- `quality_checks` — validation steps that catch missing or invalid data
- `transform_step` — how raw accepted data becomes model-ready
- `rejection_policy` — what happens when rows fail validation
- `owner` — who fixes pipeline failures

## Common mistakes

**Transforming before validating.** Cleaning first can hide the fact that the source is broken.

**Optional everything.** If every field is optional, the schema is not a contract.

**Accepting all rows “for coverage.”** Poisoned or empty examples can hurt more than they help.

**Logging raw sensitive text.** Rejection evidence should be countable without becoming a privacy incident.

**No owner.** A pipeline without an owner becomes everyone’s problem and nobody’s job.

## Your local task

### Step 1 — Create the starter

Create `pipeline_card.py` with this starter:

```python
# pipeline_card.py — Stage 02: Data Pipelines & Preprocessing
# Run unchanged first, then tighten one quality or rejection field.

pipeline_plan = {
    "source": "approved support ticket export",
    "schema": {
        "text": "string",
        "created_at": "datetime",
        "label": "optional string",
    },
    "quality_checks": [
        "text is present",
        "created_at parses",
        "no private tokens in text",
    ],
    "transform_step": "normalize whitespace and remove empty training examples",
    "rejection_policy": "reject invalid rows and log counts without storing private text",
    "owner": "data platform owner",
}

def print_pipeline(plan):
    print("=== Pipeline Card ===")
    for key, value in plan.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_pipeline(pipeline_plan)
```

### Step 2 — Run unchanged

```bash
python3 pipeline_card.py
```

Windows:

```bash
python pipeline_card.py
```

Match each field to a failure it would catch or a person it would page.

### Step 3 — Tighten one field

Change **one** field. Examples:

- Add a quality check for maximum text length
- Make `rejection_policy` name a reason-code counter
- Change `owner` to a real role name your team would recognize

Save, run again, and confirm the update.

### Step 4 — Explain the gate

Write two sentences:

1. Which check would catch an empty ticket body?
2. Why does the rejection policy avoid storing private text in logs?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| pipeline card | Named plan for source, schema, checks, transform, rejection, and owner |
| schema | Expected columns and types for a dataset |
| quality check | A validation rule that can fail a row or batch |
| rejection policy | What happens to invalid data and how it is reported |
| transform | Repeatable step that prepares accepted rows |
| data contract | Agreement about shape and quality before model use |

## Proof checklist

- [ ] `pipeline_card.py` exists in your course folder
- [ ] Running it prints all six pipeline fields
- [ ] You can explain source, checks, rejection, and owner
- [ ] You changed one field and re-ran successfully
- [ ] You explained why rejected text should not land in shared logs

When those are true, continue to **Feature Engineering**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
