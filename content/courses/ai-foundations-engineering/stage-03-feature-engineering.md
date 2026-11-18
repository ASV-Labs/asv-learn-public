# Feature Engineering

## Why this lesson exists

Feature engineering converts raw observations into useful model inputs. Done well, it makes patterns learnable. Done carelessly, it creates **leakage**: the model sees information that would not exist at prediction time, so offline metrics look excellent and production performance collapses.

Stage 03 teaches a **feature plan** — raw inputs available now, generated features, a leakage guard, an owner, and an expected signal — before you add columns “because they raise accuracy.”

You will practice locally in Python. You are not training a production model. You are learning the production habit: **only use information the live system will actually have when it must predict**.

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

You will create `feature_plan.py` in that folder.

## Features are delayed decisions

Every feature is a claim about the world at prediction time.

| Claim | Safe example | Risky example |
| --- | --- | --- |
| Text available now | `message_text` length | Final resolution notes written after triage |
| Account state now | `sender_age_days` | “Was eventually refunded” after the case closed |
| Observable structure | `link_count` in the message | Label assigned by a human hours later |

If a feature uses the answer, or any field only filled after the decision, the model is cheating on the homework it will face in production.

## Start here: available inputs before features

At the start, do not invent columns from a training CSV just because they correlate with the label. Ask:

1. What raw inputs exist **before** prediction?
2. Which generated features are derived only from those inputs?
3. What leakage guard blocks future or post-resolution fields?
4. Who owns feature meaning when definitions drift?
5. Why should each signal help prediction?

You are building one **feature plan**, not a kitchen-sink feature store dump.

### Feature questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What is available at predict time? | Features match the live request path |
| What is generated from raw inputs? | Derived signals stay explainable |
| What is the leakage guard? | Future answers stay out of training |
| Who owns the feature? | Meaning does not silently change |
| What signal is expected? | Features are intentional, not accidental |

Do not start by editing feature code. First say the plan out loud: *from message text, sender age, and link count we derive length, has_link, and reputation bucket; we never use post-resolution fields when predicting priority.*

## How to use this lesson

Read in this order:

- **Learn:** connect feature work to prediction-time availability
- **Inspect:** challenge each feature as a possible leak
- **Build:** draft one feature plan with an explicit leakage guard
- **Prove:** explain why a teammate should reject a suspicious column

Practice after reading means you should understand availability before editing code. If a column only appears in historical exports after the label was written, treat it as guilty until proven available at serve time.

## One clean pass through this lesson

Before the editor, walk the feature story:

1. A live request arrives with a limited set of fields.
2. Only those fields (plus approved lookups available now) may feed features.
3. Generated features are transforms of allowed inputs.
4. The leakage guard names what must never enter training for this task.
5. An owner can explain each feature’s meaning months later.

That chain is the engineering lesson. Clever features that use tomorrow’s knowledge are not clever in production — they are fragile.

## Leakage patterns to watch

**Label leakage.** Using the target, or a rewrite of the target, as an input.

**Temporal leakage.** Using fields filled after the prediction timestamp.

**Pipeline leakage.** Fitting scalers or encoders on the full dataset, including the holdout, before splitting.

**Join leakage.** Enriching training rows with aggregates that include the row’s own future outcomes.

Your feature plan will not solve every case, but an explicit `leakage_guard` forces the question into the open.

## The feature plan shape

```python
feature_plan = {
    "raw_inputs": ["message_text", "sender_age_days", "link_count"],
    "generated_features": [
        "message_length",
        "has_link",
        "sender_reputation_bucket",
    ],
    "leakage_guard": "do not use post-resolution fields when predicting ticket priority",
    "owner": "ML feature owner",
    "expected_signal": "message length and links may correlate with triage category",
}
```

Each field is a reviewable claim:

- `raw_inputs` — data available before prediction
- `generated_features` — model-ready signals created from raw data
- `leakage_guard` — rule preventing future-answer data from entering training
- `owner` — who maintains feature meaning
- `expected_signal` — why the feature should help prediction

## Common mistakes

**“It improved validation accuracy.”** Leakage often improves offline metrics. Accuracy is not proof of honesty.

**No owner.** Feature definitions drift when nobody maintains them.

**Unexplained signals.** If you cannot say why a feature should help, you cannot tell when it stops helping.

**Training-only fields.** Columns that exist in batch exports but not in the live API request path.

**Skipping the guard.** Without a written leakage rule, reviews become opinion contests.

## Your local task

### Step 1 — Create the starter

Create `feature_plan.py` with this starter:

```python
# feature_plan.py — Stage 03: Feature Engineering
# Run unchanged first, then strengthen the leakage guard or raw inputs.

feature_plan = {
    "raw_inputs": ["message_text", "sender_age_days", "link_count"],
    "generated_features": [
        "message_length",
        "has_link",
        "sender_reputation_bucket",
    ],
    "leakage_guard": "do not use post-resolution fields when predicting ticket priority",
    "owner": "ML feature owner",
    "expected_signal": "message length and links may correlate with triage category",
}

def print_plan(plan):
    print("=== Feature Plan ===")
    for key, value in plan.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_plan(feature_plan)
```

### Step 2 — Run unchanged

```bash
python3 feature_plan.py
```

Windows:

```bash
python feature_plan.py
```

For each generated feature, point back to the raw input that makes it legal.

### Step 3 — Tighten one field

Change **one** field. Examples:

- Add a raw input that is clearly available at request time
- Strengthen `leakage_guard` to name a concrete forbidden column such as `final_resolution_code`
- Make `expected_signal` more specific and falsifiable

Save, run again, and confirm the update.

### Step 4 — Reject a leaky idea

Write two sentences:

1. Why would `hours_until_resolved` be illegal for predicting priority at ticket creation?
2. Which feature-plan field would you cite to reject it?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| feature | An input signal used by a model |
| feature plan | Named list of allowed inputs, derived features, and guards |
| leakage | Using information unavailable at true prediction time |
| prediction time | The moment the live system must produce an answer |
| expected signal | Why a feature should help, in plain language |
| feature owner | Person accountable for feature meaning and changes |

## Proof checklist

- [ ] `feature_plan.py` exists in your course folder
- [ ] Running it prints all five plan fields
- [ ] You can map each generated feature to a raw input
- [ ] You changed one field and re-ran successfully
- [ ] You explained why a post-resolution field would be leakage

When those are true, continue to **Model Training & Validation**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
