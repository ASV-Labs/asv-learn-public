# Prompt Debugging and Behavior Testing

## Why this lesson exists

Prompts fail in patterns: vague instructions, missing context, hallucinated facts, format drift, unsafe confidence, and overbroad requests. Builders do not “try different vibes” forever — they keep a **before/after debugging log** with a hypothesized cause and a test.

This stage teaches prompt debugging as behavior testing. You will record failures, propose a fix, and restate the success check in local Python.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `prompt_debug_log.py` in that folder.

## Failure patterns to recognize

| Failure | What you observe | First fix to try |
| --- | --- | --- |
| **Vague instruction** | Generic advice, wrong audience | Name task + audience |
| **Missing context** | Invented lesson facts | Require approved notes; refuse if absent |
| **Hallucinated facts** | Confident wrong details | Citation / evidence rule |
| **Format drift** | Free prose when you needed fields | Output contract + example |
| **Unsafe confidence** | Sounds sure with no sources | Uncertainty + escalation language |
| **Overbroad request** | Tries to do five jobs | Narrow the task |

Debugging is not blaming the model for being “dumb.” It is making the contract enforceable enough that failures become visible.

## Builder rhythm for this lesson

1. **Concept** — name the failure pattern in plain English.
2. **Architecture** — mark which instruction field was weak.
3. **Inspect** — read a before example before editing.
4. **Guided build** — change one controlled piece.
5. **Debug/Test** — define how you would re-test.
6. **Reflection** — explain the decision without hype.
7. **Portfolio proof** — keep the log as a reviewable artifact.

## How to write a useful debug row

Each row should answer:

- What was the **input**?
- What **bad output** appeared (or would appear)?
- Which **failure pattern** fits?
- What **prompt change** did you make?
- What is the **retest check**?
- What **guardrail** still matters (tier, privacy, refusal)?

If a row only says “made it better,” it is not proof.

## Evaluation mindset (lightweight)

Product teams eventually use rubrics, golden questions, and regression sets. You start smaller:

- One failing case
- One hypothesized cause
- One changed field
- One pass/fail check a human can apply

Vibe checks are allowed as a sniff test. They are not enough for a portfolio.

### A mini rubric you can reuse

| Score | Meaning |
| --- | --- |
| **Pass** | Meets the retest check with no new failure pattern |
| **Partial** | Better tone or length, but the original failure remains |
| **Fail** | Same failure, or a new one you introduced |

Write the rubric **before** you admire the new wording. Otherwise every rewrite looks like a win.

### Before/after example (study helper)

**Before:** “Help with lists.”  
**Symptom:** Invents a lesson the learner never opened.  
**Pattern:** missing context.  
**After change:** Require `module_id` in context; failure mode asks for the lesson section if absent.  
**Retest:** Given no `module_id`, output asks for the section and does not invent list syntax examples from “memory.”

## Common mistakes

**Changing five things at once.** You will not know which fix worked.

**Fixing tone instead of evidence.** Polite hallucination is still hallucination.

**No retest check.** Without a check, you cannot claim improvement.

**Assuming live model access is required to learn.** Logging the contract and failure pattern is the skill; model calls come later through internal APIs.

## Your local task

### Step 1 — Create the starter

Create `prompt_debug_log.py`:

```python
# prompt_debug_log.py — Stage 04: Prompt Debugging and Behavior Testing

cases = [
    {
        "case_id": "PD-01",
        "input": "Explain lists from yesterday's lesson",
        "bad_output_symptom": "Invents a lesson that was never provided",
        "failure_pattern": "TODO",  # vague | missing_context | hallucination | format_drift | unsafe_confidence | overbroad
        "before_prompt_snippet": "Help with lists.",
        "after_prompt_change": "TODO: name the exact field you tightened",
        "retest_check": "TODO: what must be true to call the fix a pass",
        "guardrail_note": "TODO: privacy / refusal / tier note",
    },
    {
        "case_id": "PD-02",
        "input": "Give me JSON fields for a flashcard",
        "bad_output_symptom": "Returns a paragraph instead of JSON",
        "failure_pattern": "TODO",
        "before_prompt_snippet": "Make flashcards.",
        "after_prompt_change": "TODO",
        "retest_check": "TODO",
        "guardrail_note": "TODO",
    },
]

def print_log(rows):
    print("=== Prompt Debugging Log ===")
    for row in rows:
        print(f"\n{row['case_id']}")
        for key, value in row.items():
            if key == "case_id":
                continue
            print(f"  {key}: {value}")

if __name__ == "__main__":
    print_log(cases)
```

### Step 2 — Complete both cases

Fill every TODO. Use two different failure patterns. For `after_prompt_change`, name a specific contract field (for example: “added failure_mode requiring Module id” or “required JSON keys term and definition”).

### Step 3 — Run

```bash
python3 prompt_debug_log.py
```

Windows:

```bash
python prompt_debug_log.py
```

### Step 4 — Retest definition

Add a third case **or** tighten one retest_check so a teammate could mark pass/fail without watching you work.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| failure pattern | Named way an AI output goes wrong |
| before/after | Prompt snippet change tied to one hypothesis |
| retest check | Pass/fail criterion for the fix |
| format drift | Output shape changes despite instructions |
| unsafe confidence | Certain tone without evidence |
| debugging log | Portfolio artifact of tested prompt changes |

## Proof checklist

- [ ] `prompt_debug_log.py` prints at least two completed cases
- [ ] Failure patterns are named, not vague
- [ ] Each case has before snippet, after change, and retest check
- [ ] Guardrail notes mention refusal, privacy, or tier where relevant
- [ ] You can explain one fix without saying “the model got smarter”

When those are true, continue to **How APIs Connect AI Features**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
