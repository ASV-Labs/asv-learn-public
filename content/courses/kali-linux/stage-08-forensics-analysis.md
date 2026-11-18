# Forensics & Analysis

## Why this lesson exists

Forensic work depends on **preservation** and careful language. Record what you observed, how you preserved the artifact, what you think it means, and what remains uncertain.

In this lesson you will write an evidence analysis card that separates observation from interpretation.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-kali-linux/stage-08/{notes,evidence-copies}
cd ~/asv-learn-kali-linux/stage-08
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-08\notes"
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-08\evidence-copies"
Set-Location "$HOME\asv-learn-kali-linux\stage-08"
```

You will write `evidence_analysis_card.txt` under `notes/`. Work from **copies** in `evidence-copies/`, not from unique originals when originals must stay unchanged.

## Start here: preservation before interpretation

Do not explain evidence before protecting it. First name:

1. Evidence item / artifact identifier
2. Preservation step
3. Direct observation
4. Interpretation
5. Uncertainty
6. Next question

Forensic language should keep facts and conclusions separate so another reviewer can test your reasoning.

## Evidence discipline

| Field | Purpose | Honest limit |
| --- | --- | --- |
| Artifact identifier | Names the evidence item | Labels must be stable |
| Preservation step | Protects the original from accidental change | Working on the only copy is risky |
| Observation | What you can directly see | No hidden guesses |
| Interpretation | What the observation may mean | Marked as interpretation |
| Uncertainty | Assumptions kept visible | Required, not optional |
| Next question | Guides further analysis | Prevents false closure |

First say the evidence chain in one sentence: *artifact, preservation step, observation, interpretation, uncertainty, and next question.*

## Observation versus interpretation

| Type | Example | Where it goes |
| --- | --- | --- |
| Observation | “Login failure events appear at 14:02–14:06 for user alex” | Observation |
| Interpretation | “Possible unauthorized access attempt in the training scenario” | Interpretation |
| Uncertainty | “Needs corroborating timestamps from another log source” | Uncertainty |
| Next question | “Which account and source generated the event?” | Next question |

If you cannot point to the bytes, line, or screenshot that supports a sentence, it is not yet an observation.

## Preservation habits for a small lab

| Habit | Why |
| --- | --- |
| Copy before analysis | Original stays unchanged |
| Note hash or size when practical | Detect accidental modification |
| Keep analysis notes separate from evidence copies | Avoid mixing commentary into artifacts |
| Record tool + version used for viewing | Reviewers can reproduce viewing conditions |
| Do not “clean up” the only copy | Cleanup belongs to scratch, not evidence |

Kali includes many analysis utilities. The tool name matters less than whether you can defend the chain: what you touched, what you saw, what you inferred.

## Common beginner mistakes

- Explaining before preserving
- Writing interpretation as fact
- Hiding uncertainty to sound confident
- Editing the only copy of a log or image
- Skipping the next question so analysis stops early
- Expecting ASV Learn to mount disk images for you in the lesson page

## Your local task

### Step 1 — Create a synthetic artifact

Write a tiny lab log copy (this is practice data, not a real incident):

`evidence-copies/lab-auth.log`

```text
2026-08-07T14:02:11Z FAIL user=alex src=10.0.3.44
2026-08-07T14:02:40Z FAIL user=alex src=10.0.3.44
2026-08-07T14:03:05Z FAIL user=alex src=10.0.3.44
2026-08-07T14:06:12Z SUCCESS user=alex src=10.0.3.44
```

Treat this file as the working copy. Imagine an original remains read-only elsewhere.

### Step 2 — Write the evidence analysis card

Create `notes/evidence_analysis_card.txt`:

```text
artifact_id=lab-image-001 / lab-auth.log working copy
preservation_step=work from evidence-copies/lab-auth.log; keep any original unchanged
observation=four auth events for user alex from 10.0.3.44 including three failures then one success
interpretation=possible unauthorized access attempt in the training scenario
uncertainty=needs corroborating timestamps from another log source; MFA status unknown
next_question=which account recovery or MFA signals exist around the same window
```

Optional shell print:

```bash
artifact_id="lab-image-001"
preservation_step="work from a copied artifact and keep the original unchanged"
observation="suspicious login event appears in the lab log"
interpretation="possible unauthorized access attempt in the training scenario"
uncertainty="needs corroborating timestamps from another log source"
next_question="which account and source generated the event"

printf '%s\n' \
  "artifact=$artifact_id" \
  "preservation=$preservation_step" \
  "observation=$observation" \
  "interpretation=$interpretation" \
  "uncertainty=$uncertainty" \
  "next_question=$next_question"
```

### Step 3 — Self-review

- Can a second analyst see what was directly observed?
- Is uncertainty visible?
- Did you avoid modifying the only imagined original?

### Step 4 — One change you can explain

Move one overconfident phrase from interpretation into uncertainty (or the reverse if you understated) and justify the edit.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Artifact | Evidence item under analysis |
| Preservation | Protecting originals from change |
| Observation | Directly seen fact |
| Interpretation | Possible meaning of the observation |
| Chain of custody | Record of who handled evidence and how |

## Proof checklist

- [ ] Working copy exists under `evidence-copies/`
- [ ] Analysis card separates observation and interpretation
- [ ] Uncertainty and next question are present
- [ ] Preservation step is written
- [ ] Only authorized / synthetic lab artifacts were used

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Analyze only artifacts you are authorized to handle. Do not acquire or inspect other people’s private data without legal authority and a clear case need.

When those items are true, continue to **Customizing Kali for Your Workflow**.
