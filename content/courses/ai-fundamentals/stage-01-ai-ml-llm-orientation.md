# AI, ML, and LLM Orientation

## Why this lesson exists

AI is not one thing. Product pages, demos, and job posts often use the same word for fixed automation, score prediction, text generation, and guarded workflows. If you cannot name the behavior, you cannot test it.

This stage teaches a builder habit: before you trust an “AI” claim, classify what goes in, what comes out, what category of behavior is happening, what evidence would prove it helped, and what risk appears if the claim is overstated.

You will practice locally with Python 3: edit a file, save, run it in a terminal, and read the table you print.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ai-fundamentals
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
mkdir $HOME\asv-learn-ai-fundamentals
cd $HOME\asv-learn-ai-fundamentals
```

You will create `feature_classifications.py` in that folder.

## Four behavior categories builders must separate

| Category | What it does | Typical evidence | Common overclaim |
| --- | --- | --- | --- |
| **Automation** | Follows fixed steps you wrote | Same input → same path | “The system understands intent” |
| **Prediction** | Estimates a label or score | Measured accuracy / error rate | “It knows the user” |
| **Generation** | Creates new text or structure | Reviewable draft quality | “It verified the facts” |
| **Guarded workflow** | Uses AI inside a controlled sequence | Boundaries, checks, escalation | “It acts autonomously safely” |

Large language models (LLMs) sit mostly under **generation**, and sometimes inside **guarded workflows**. An LLM predicts likely next tokens from context. It is not a search engine, not a reliable database, and not a proof that the answer is true.

## Why vague “AI” labels break products

Bad labels create bad systems:

1. Teams stop asking “what should be tested?”
2. Reviewers cannot tell automation from generation.
3. Learners copy demos that hide failure modes.
4. Risk notes never get written because “the model is smart.”

A useful first artifact is a **claim table**: feature, input, output, category, evidence, risk.

## Start here: claim before confidence

Do not begin by picking a model brand. First say the claim in one sentence:

*This feature takes this input, produces this output, behaves like this category, and would be trusted only if this evidence exists.*

If you cannot fill those blanks, the feature is not ready to inspect — and definitely not ready to ship.

### Claim questions and what they protect

| Claim question | What it protects |
| --- | --- |
| What goes in? | Scope stays concrete |
| What comes out? | Success is reviewable |
| Which category? | The right tests get chosen |
| What evidence? | Fluency does not replace proof |
| What risk if overstated? | Harm becomes visible early |

## How to use this lesson

Read in this order:

- **Learn:** separate automation, prediction, generation, and guarded workflows
- **Inspect:** read each claim row as evidence a reviewer could check
- **Build:** fill the claim table before debating model brands
- **Prove:** explain what would test each category and what risk appears if overstated

Practice after reading means you should understand all six columns before editing code. If a row still says TODO, read one column at a time and ask: *what would prove this feature works?*

## One clean pass through this lesson

Before the editor, walk one feature claim in plain language:

1. Something goes in (input).
2. Something comes out (output).
3. The behavior fits one category — not vague “AI.”
4. Named evidence would prove it helped.
5. Named risk appears if the claim is overstated.

That chain is the builder habit. Model names come later.

## LLM orientation without the math

You need a working mental model, not a research paper:

- Text is split into **tokens** (word pieces / symbols), not always whole words.
- The model predicts the next token from prior tokens and context.
- Confidence in wording is not the same as verified truth.
- **Hallucinations** happen when fluent text is unsupported by evidence.
- **Knowledge cutoffs** mean private or recent facts may be missing unless you supply them.

Training phases (pre-training, fine-tuning, preference tuning) shape behavior, but builders still must validate outputs in the product path. Benchmarks are useful signals; they do not replace your feature’s own evidence.

## Platform rule for this course

External learner API keys are **not required and not allowed** on the core path. When AI interaction is needed later, it goes through **ASV Learn internal APIs** with authentication, paid-tier limits, rate limits, logging, and guardrails. This stage stays offline: you classify claims in local Python.

## Common mistakes

**Calling every automatic feature “AI.”** Password reset email is automation. Treat it as automation.

**Treating generation as verified knowledge.** Fluent text can still invent citations, dates, or policies.

**Skipping the risk column.** If misuse would confuse a learner or leak private data, write that risk now.

## Your local task

### Step 1 — Create the starter

Create `feature_classifications.py`:

```python
# feature_classifications.py — Stage 01: AI / ML / LLM Orientation
# Classify product claims. Replace TODOs. Include automation, prediction, generation.

claims = [
    {
        "feature": "Nightly grade export to CSV",
        "input": "course roster and scores",
        "output": "downloadable CSV file",
        "category": "TODO",  # automation | prediction | generation | guarded_workflow
        "evidence": "TODO",
        "risk": "TODO",
    },
    {
        "feature": "Quiz pass/fail risk score",
        "input": "practice attempt history",
        "output": "0-100 risk score",
        "category": "TODO",
        "evidence": "TODO",
        "risk": "TODO",
    },
    {
        "feature": "Lesson summary draft",
        "input": "approved lesson notes",
        "output": "short study summary",
        "category": "TODO",
        "evidence": "TODO",
        "risk": "TODO",
    },
]

def print_table(rows):
    print("=== AI Claim Classification Table ===")
    for i, row in enumerate(rows, start=1):
        print(f"\n[{i}] {row['feature']}")
        for key in ("input", "output", "category", "evidence", "risk"):
            print(f"  {key}: {row[key]}")

if __name__ == "__main__":
    print_table(claims)
```

### Step 2 — Fill the TODOs

Replace every `TODO` with concrete text. Your three rows should cover at least **automation**, **prediction**, and **generation**. Example directions (use your own wording):

- Nightly CSV export → automation; evidence = same schedule/script path every night
- Risk score → prediction; evidence = measured precision/recall on held-out attempts
- Lesson summary → generation; evidence = human review against source notes; risk = invented facts

### Step 3 — Run it

```bash
python3 feature_classifications.py
```

Windows:

```bash
python feature_classifications.py
```

### Step 4 — One small change you can explain

Change **one** category or risk note, save, run again, and say out loud why the new label is more accurate.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| automation | Fixed steps with no generative model required |
| prediction | Model estimates a label or score |
| generation | Model creates new text or structure |
| LLM | Large language model that predicts tokens from context |
| hallucination | Fluent output that is not grounded in evidence |
| claim table | Feature / input / output / category / evidence / risk |

## Proof checklist

- [ ] `feature_classifications.py` exists in `~/asv-learn-ai-fundamentals`
- [ ] Running it prints three completed claim rows
- [ ] Categories include automation, prediction, and generation
- [ ] Each row has evidence and risk (not vague “AI”)
- [ ] You changed one field, re-ran, and can explain the change

When those are true, continue to **Models, LLMs, and AI System Parts**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
