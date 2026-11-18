# Structured Outputs and Validation

## Why this lesson exists

Free-form AI text is hard for software to trust. Products need **structure**: required fields, types, allowed values, and a safe fallback when the model drifts.

This stage teaches you to design a JSON-like response contract and a small validator you can run locally. You are not calling a live model. You are practicing the discipline that makes AI output machine-checkable before a UI shows it.

## How to use this lesson

Read in this order:

- **Learn:** why products need contracts, validators, and fallbacks — not just “return JSON”
- **Inspect:** compare the three sample cards and predict which rules should fail
- **Build:** fill the fallback TODO and add one validation rule you can defend
- **Prove:** run the script and explain which failure mode your fallback prevents

If a sample passes when you expected fail, read the validator line by line before changing samples.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `output_contract.py` in that folder.

## Why structure beats vibes

| Output style | Easy for humans? | Easy for software? | Risk |
| --- | --- | --- | --- |
| Free paragraph | Sometimes | No | Format drift, hard to test |
| Markdown bullets | Often | Fragile | Heading/order changes |
| JSON object with required keys | Less chatty | Yes | Model may still emit invalid JSON |
| JSON + validator + fallback | Best for products | Yes | Needs honest failure UX |

Structured output is how flashcards, quiz drafts, routing decisions, and tool calls become reviewable.

## Contract fields builders should name

1. **Required keys** — what must exist
2. **Types** — string, number, boolean, list
3. **Enums / allowed values** — when the set is closed
4. **Citation / evidence fields** — when grounding matters
5. **Uncertainty field** — when the model must admit gaps
6. **Fallback behavior** — what the product does on invalid output

Example contract for a study flashcard draft:

```python
contract = {
    "required_keys": ["term", "definition", "source_ref", "confidence"],
    "types": {
        "term": "str",
        "definition": "str",
        "source_ref": "str",
        "confidence": "str",  # high | medium | low
    },
    "allowed_confidence": ["high", "medium", "low"],
    "rules": [
        "definition must not invent libraries not in source_ref",
        "confidence low if source_ref is empty",
    ],
    "fallback": "do not show card; ask learner to open the lesson section",
}
```

## Validation is a product feature

Validation is not pedantry. It is the gate between model text and user trust:

- Missing keys → reject
- Wrong types → reject
- Disallowed enum → reject
- Empty citation when required → reject or downgrade confidence
- On reject → fallback UI, not a pretty lie

Later stages reuse this idea for tool calls and agent stop rules.

## From model text to product UI

In production the path looks like this:

```text
model emits text
  → parse to object (or reject)
    → validate against contract
      → pass → render UI
      → fail → fallback (never show invalid card)
```

Parsing is its own gate. If the model wraps JSON in markdown fences or adds commentary, your parser should reject or strip safely — not silently guess. **Repair** (auto-filling missing fields) is different from **rejection**. Repair can hide hallucinated citations; rejection keeps trust visible.

| Strategy | When it fits | Risk |
| --- | --- | --- |
| Strict reject | Factual claims, citations, tool args | More fallbacks; honest UX |
| Safe repair | Cosmetic formatting only | Can invent values if overused |
| Human review queue | High-stakes drafts | Slower; still needs a contract |

Stage 06 practice stays strict: invalid samples should fail loudly in your terminal output.

## Common mistakes

**Asking for JSON in the prompt but never validating.** Prompt hopes are not gates.

**Huge nested schemas on day one.** Start with four clear fields.

**Silent repair that invents values.** Auto-filling missing citations teaches the wrong lesson.

**Treating validation as optional for “creative” features.** Creative UIs still need boundaries when claims sound factual.

## Your local task

### Step 1 — Create the starter

Create `output_contract.py`:

```python
# output_contract.py — Stage 06: Structured Outputs and Validation

contract = {
    "name": "flashcard_draft",
    "required_keys": ["term", "definition", "source_ref", "confidence"],
    "allowed_confidence": ["high", "medium", "low"],
    "fallback": "TODO: what UI should do when validation fails",
}

# Simulated model outputs (no live API)
samples = [
    {
        "term": "variable",
        "definition": "A name that stores a value",
        "source_ref": "module-02",
        "confidence": "high",
    },
    {
        "term": "variable",
        "definition": "A name that stores a value",
        # missing source_ref
        "confidence": "high",
    },
    {
        "term": "variable",
        "definition": "A name that stores a value",
        "source_ref": "module-02",
        "confidence": "pretty sure",  # invalid enum
    },
]

def validate(card, contract):
    missing = [k for k in contract["required_keys"] if k not in card]
    if missing:
        return False, f"missing keys: {missing}"
    if card.get("confidence") not in contract["allowed_confidence"]:
        return False, "confidence not in allowed set"
    if not str(card.get("source_ref", "")).strip():
        return False, "empty source_ref"
    return True, "ok"

def main():
    print("=== Structured Output Contract ===")
    print("fallback:", contract["fallback"])
    print("\n=== Validator Checklist Results ===")
    for i, sample in enumerate(samples, start=1):
        ok, reason = validate(sample, contract)
        print(f"[{i}] valid={ok} reason={reason} sample={sample}")

if __name__ == "__main__":
    main()
```

### Step 2 — Fill the fallback TODO

Write a concrete product message/action. Then run:

```bash
python3 output_contract.py
```

Windows:

```bash
python output_contract.py
```

You should see one pass and two fails.

### Step 3 — Extend the checklist

Add **one** more rule in `validate()` (for example: `definition` must be at least 8 characters, or `term` must be non-empty). Re-run and confirm the new rule fires on a sample you add.

### Step 4 — Portfolio note

In a comment, answer: which failure mode does your fallback prevent — format drift, hallucinated source, or unsafe confidence?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| response contract | Named fields and rules for AI output |
| validator | Code or checklist that accepts/rejects output |
| enum | Closed set of allowed values |
| fallback | Safe product behavior on invalid output |
| structured output | Machine-checkable shape (often JSON-like) |
| format drift | Output shape changes across runs |

## Proof checklist

- [ ] `output_contract.py` runs and prints pass/fail for samples
- [ ] Required keys and allowed confidence values are explicit
- [ ] Fallback TODO is replaced with concrete UI behavior
- [ ] You added one extra validation rule and tested it
- [ ] You can explain why validation sits after the model response

When those are true, continue to **Retrieval and Source Grounding**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
