# Prompt Engineering Mastery

## Why this lesson exists

In Stage 01 you defined what an agent may do. Now you define **how the model should behave inside that boundary** — through a prompt that acts as a **contract**, not clever wording.

A useful prompt tells the model the task, the context it may use, the constraints, the output format, and how the answer will be checked. Another person should be able to read the contract and decide whether the model stayed inside it.

You will build an **assistant instruction card** — a Python dictionary you can inspect, version, and test locally. No API calls required for this stage. You are learning structure that survives when models change.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.

## Reminder: where you work

```bash
cd ~/asv-learn-applied-agentic-ai
```

Windows:

```powershell
cd $HOME\asv-learn-applied-agentic-ai
```

You will create `prompt_contract.py` in that folder.

## Start here: contract before clever wording

At the start, do not try to make the prompt sound impressive. First name:

1. The **task** — what job the assistant is being asked to do
2. The **context fields** — which inputs the assistant may use
3. The **constraints** — what it must avoid or refuse
4. The **output format** — predictable shape for review
5. The **verification check** — what the answer must prove
6. The **refusal rule** — when to stop instead of guessing

A strong prompt is useful because another person can inspect whether the answer stayed inside the contract. The goal is control and reviewability, not a longer block of instructions.

## How to use this lesson

Read in this order:

- **Learn:** understand why a prompt should define task, context fields, constraints, format, verification, and refusal
- **Inspect:** identify what each instruction-card field prevents
- **Build:** write one assistant instruction card before asking the model to answer
- **Prove:** explain how a reviewer would judge whether the answer stayed inside the contract

Practice after reading means you should know the contract before editing the Python object. A strong prompt is not just longer; it is easier to check.

## One clean pass through this lesson

Before the editor, read prompting as a contract-before-wording chain:

1. The task says what job the assistant is being asked to do.
2. The context fields say what information the assistant may use.
3. The constraints say what the assistant must avoid or refuse.
4. The output format makes the answer predictable enough to review.
5. The verification check and refusal rule say how to judge the answer and when to stop.

That chain keeps prompt engineering from becoming clever phrasing. The useful prompt is the one another person can inspect, test, and tighten.

Do not start by polishing language. First say the instruction card in one sentence: task, context fields, constraints, output format, verification check, and refusal rule.

## The instruction card shape

```python
assistant_instruction_card = {
    "task": "explain a failed unit test to a beginner",
    "context_fields": ["test name", "error message", "related function"],
    "constraints": ["do not invent files", "do not hide uncertainty"],
    "output_format": "plain language summary plus next debugging step",
    "verification_check": "names the exact failing assertion",
    "refusal_rule": "ask for the missing traceback if no error message is provided",
}
```

### What each field controls

| Field | What it prevents |
| --- | --- |
| `task` | Vague or drifting job descriptions |
| `context_fields` | The model inventing files, logs, or data it was never given |
| `constraints` | Unsafe shortcuts and hidden uncertainty |
| `output_format` | Answers that are hard to compare or review |
| `verification_check` | "Sounds good" quality judgments with no evidence |
| `refusal_rule` | Confident guesses when required input is missing |

## Worked example: reading a contract

Imagine a learner pastes only: `test_login failed`.

A contract-following assistant should **refuse to invent** a traceback. The refusal rule says: ask for the missing error message. The verification check says: when evidence exists, name the exact failing assertion.

That is inspectable behavior. A reviewer can ask: *did the answer name an assertion, or did it guess?*

## Common mistakes

**Polishing wording before defining fields.** Pretty language on an empty contract still fails review.

**Missing context boundaries.** Without named `context_fields`, the model fills gaps with plausible fiction.

**Constraints as vague values.** `"be safe"` is not a constraint. `"do not invent files"` is.

**No refusal rule.** Without one, the model guesses when it should ask.

**Verification checks that cannot fail.** If every answer passes, the check is useless.

## Your local task

### Step 1 — Create the starter

Create `prompt_contract.py`:

```python
# prompt_contract.py — Stage 02: Prompt Engineering
# Run unchanged, then build a card for a coding helper you would trust.

assistant_instruction_card = {
    "task": "explain a failed unit test to a beginner",
    "context_fields": ["test name", "error message", "related function"],
    "constraints": ["do not invent files", "do not hide uncertainty"],
    "output_format": "plain language summary plus next debugging step",
    "verification_check": "names the exact failing assertion",
    "refusal_rule": "ask for the missing traceback if no error message is provided",
}

def print_contract(card):
    print("=== Assistant Instruction Card ===")
    for key, value in card.items():
        print(f"{key}: {value}")

def missing_context(card, provided_fields):
    """Return True if a required context field is absent or empty."""
    for field in card["context_fields"]:
        if field not in provided_fields:
            return True
        if not str(provided_fields[field]).strip():
            return True
    return False

if __name__ == "__main__":
    print_contract(assistant_instruction_card)
    sample_input = {"test name": "test_login", "error message": ""}
    if missing_context(assistant_instruction_card, sample_input):
        print("\nRefusal triggered:", assistant_instruction_card["refusal_rule"])
```

### Step 2 — Run unchanged

```bash
python3 prompt_contract.py
```

Windows:

```bash
python prompt_contract.py
```

You should see the card printed and a refusal message because the error message is empty.

### Step 3 — Write your own card

Replace the example with an instruction card for a **coding helper** you would trust — for example explaining a Python traceback, reviewing a function, or suggesting one next debugging step.

Keep all six fields. Make the verification check **testable**.

### Step 4 — Test refusal logic

Add a non-empty `"related function"` value and a real `"error message"`. Run again and confirm refusal does **not** trigger when all three context fields are present and non-empty.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| prompt contract | Structured instructions that define task, limits, and proof |
| instruction card | A dictionary holding the contract fields |
| constraint | A rule the assistant must not violate |
| verification check | Evidence the answer must include |
| refusal rule | When the assistant stops and asks instead of guessing |
| context boundary | The information the model is allowed to use |

## Proof checklist

- [ ] `prompt_contract.py` exists and runs without errors
- [ ] Your instruction card has all six fields filled in
- [ ] You can explain what each field prevents
- [ ] Refusal triggers when context is incomplete
- [ ] Refusal does not trigger when required context is present

When those are true, continue to **RAG & Knowledge Integration**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
