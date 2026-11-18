# Model Training & Validation

## Why this lesson exists

Training is not finished when a model fits examples. A fit can memorize noise, leak through a bad split, or beat nothing meaningful. Production teams promote models that **beat a baseline on realistic data**, survive error-slice review, and meet an explicit promotion rule.

Stage 04 teaches a **validation plan** — dataset split, baseline metric, validation metric, error slice, and promotion rule — before you treat a training run as ready for users.

You will practice locally in Python. You are not required to train a heavy model on your laptop. You are learning the MLOps habit: **define how you would know the model is better before you celebrate the fit**.

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

You will create `validation_plan.py` in that folder.

## Fit is not proof

| Result | What it might mean |
| --- | --- |
| High training accuracy | The model may have memorized the training set |
| High validation accuracy alone | The split may be leaky or unrepresentative |
| Beats a strong baseline | The model may be earning its keep |
| Looks good overall, fails on short tickets | A slice risk is hiding under the average |
| Meets a written promotion rule | The team has a decision, not a vibe |

A baseline can be a simple heuristic (“always predict the majority class”) or a previous production model. If you cannot beat something cheap and honest, complexity is not helping yet.

## Start here: baseline before promotion

At the start, do not tune hyperparameters for vanity metrics. Ask:

1. How are train, validation, and test examples separated?
2. What simple baseline must the model beat?
3. Which metric decides quality for this task?
4. Which error slice must be inspected even if the average looks fine?
5. What rule promotes or blocks the model?

You are building one **validation plan**, not a leaderboard screenshot.

### Validation questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What is the split? | Evaluation stays honest |
| What is the baseline? | Improvement is real, not decorative |
| What is the primary metric? | Teams argue about the same number |
| What error slice is reviewed? | Average metrics do not hide fragile groups |
| What is the promotion rule? | Release decisions are repeatable |

Do not start by editing training loops. First say the plan out loud: *70/15/15 split, beat 0.72 accuracy baseline, watch false positives, inspect short and high-priority tickets, promote only if both conditions hold.*

## How to use this lesson

Read in this order:

- **Learn:** connect training to evidence against a baseline
- **Inspect:** treat each plan field as a promotion gate
- **Build:** draft one validation plan before claiming readiness
- **Prove:** explain when the model should **not** be promoted

Practice after reading means you should understand the gates before editing code. A printed training plan is useful only if another engineer could apply the same rule next week.

## One clean pass through this lesson

Before the editor, walk the validation story:

1. Data is split so the model cannot quietly train on the test cases.
2. A baseline sets the minimum bar.
3. A primary metric (and any hard constraints) define success.
4. Error slices force inspection of groups that matter operationally.
5. A promotion rule turns numbers into a yes/no decision.

That chain is the difference between “we trained something” and “we earned a candidate for release.”

## Splits and realism

Random splits are not always enough. For tickets or logs, a **time-based split** often matches production better: train on earlier weeks, validate on later weeks. If user identities matter, keep the same entity out of both train and test when leakage through identity is a risk.

Your local artifact does not need a full dataset. It needs a split policy you can defend.

## The validation plan shape

```python
training_plan = {
    "dataset_split": {"train": 70, "validation": 15, "test": 15},
    "baseline_metric": {"accuracy": 0.72},
    "validation_metric": "compare accuracy and false positive rate",
    "error_slice": "inspect short messages and high-priority tickets separately",
    "promotion_rule": (
        "promote only if it beats baseline and does not increase false positives"
    ),
}
```

Each field is a decision aid:

- `dataset_split` — how training and evaluation examples are separated
- `baseline_metric` — simple reference the model must beat
- `validation_metric` — primary judgment for the model
- `error_slice` — group of cases inspected for weak behavior
- `promotion_rule` — rule for moving the model forward

## Common mistakes

**No baseline.** Beating “nothing” is not an engineering result.

**Optimizing the wrong metric.** Accuracy can look fine while false positives flood a human queue.

**Ignoring slices.** Overall metrics hide failures on short text, rare languages, or VIP accounts.

**Test set peeking.** Repeatedly tuning against the final test set turns it into a second training set.

**Promotion by demo.** A live demo is not a promotion rule.

## Your local task

### Step 1 — Create the starter

Create `validation_plan.py` with this starter:

```python
# validation_plan.py — Stage 04: Model Training & Validation
# Run unchanged first, then tighten the promotion rule or error slice.

training_plan = {
    "dataset_split": {"train": 70, "validation": 15, "test": 15},
    "baseline_metric": {"accuracy": 0.72},
    "validation_metric": "compare accuracy and false positive rate",
    "error_slice": "inspect short messages and high-priority tickets separately",
    "promotion_rule": (
        "promote only if it beats baseline and does not increase false positives"
    ),
}

def print_plan(plan):
    print("=== Validation Plan ===")
    for key, value in plan.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_plan(training_plan)
```

### Step 2 — Run unchanged

```bash
python3 validation_plan.py
```

Windows:

```bash
python validation_plan.py
```

Say which field would block a model that only looks good on average.

### Step 3 — Tighten one field

Change **one** field. Examples:

- Switch the split note to a time-based policy in a string value if you prefer that clarity
- Add a concrete false-positive ceiling to `promotion_rule`
- Make `error_slice` name a third group you care about

Save, run again, and confirm the update.

### Step 4 — Write a block decision

Write two sentences:

1. When would this plan **block** promotion even if accuracy improved?
2. Which field encodes that block?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| baseline | Simple reference result the model must beat |
| validation metric | Primary number used to judge the candidate model |
| error slice | Subset of cases inspected for weak behavior |
| promotion rule | Explicit yes/no criteria for advancing a model |
| dataset split | Separation of train, validation, and test examples |
| holdout | Data kept back so evaluation stays honest |

## Proof checklist

- [ ] `validation_plan.py` exists in your course folder
- [ ] Running it prints all five plan fields
- [ ] You can explain baseline, metric, slice, and promotion rule
- [ ] You changed one field and re-ran successfully
- [ ] You wrote a case where promotion should be blocked

When those are true, continue to **Deployment & Monitoring**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
