# Prompting as Instruction Design

## Why this lesson exists

A prompt is an **instruction package**, not magic words. The same model can produce useful or useless output depending on whether you named the task, context, constraints, output format, success check, and failure mode.

This stage turns prompting into instruction design: you write a contract another reviewer can inspect. You will compare a weak prompt with an improved one in local Python.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `prompt_test.py` in that folder.

## Weak versus strong prompts

| Style | Example shape | What goes wrong |
| --- | --- | --- |
| **Vague** | “Help with this lesson” | Model invents goals and tone |
| **Clear** | “Summarize Module 02 variables for a beginner” | Better, but format still drifts |
| **Structured** | Task + context + constraints + format + check | Reviewable and testable |
| **Optimized** | Structured + failure mode + short example | More reliable under edge cases |

Prompt engineering here means **reducing ambiguity** between your intent and the model’s fill-in-the-blank habits. It is not about tricking the model.

## Anatomy of an instruction package

Modern chat APIs use roles. Even when you practice offline, keep the same ideas:

| Piece | Purpose |
| --- | --- |
| **System / instruction layer** | Persistent job, persona, constraints, output rules |
| **User turn** | The immediate request |
| **Context block** | Approved notes the answer may use |
| **Output contract** | Shape a validator or human can check |
| **Failure mode** | What to do when context is missing |

A useful prompt names all six of these explicitly:

1. Task
2. Context
3. Constraints
4. Output format
5. Success check
6. Failure mode / refusal rule

## Techniques worth knowing (builder level)

**Zero-shot:** describe the task with no examples. Works when the task is common and the format is simple.

**Few-shot:** include 1–3 short examples of good input→output pairs. Helps unusual formats and nuanced labels.

**Chain-of-thought (carefully):** ask for stepwise reasoning when the task is multi-step. Prefer *hidden* or short scratch reasoning in products; never dump private chain-of-thought to end users by default.

**Frameworks as checklists:** CO-STAR, RISEN, and RTF are memory aids. Your course contract (task / context / constraints / format / check / failure) is enough if you fill it honestly.

### Tiny few-shot sketch (offline)

You do not need a live model to practice the shape:

```text
Example 1
Input: Define variable using Module 02 notes
Output: A variable stores a value. Example: name = "Maya" (string). Source: module-02.

Example 2
Input: Define boolean using Module 02 notes
Output: A boolean is True or False. Example: is_beginner = True. Source: module-02.
```

Few-shot examples teach the **format and citation habit**. They are not a license to invent Module 99.

## Internal AI flow still applies

Prompting in this course still goes through internal APIs when live AI is used. The platform — not the learner’s laptop — controls course context attachment, tier limits, safety rules, and validation around the prompt. Your local file designs the instruction card that would sit behind that boundary.

## Common mistakes

**Longer ≠ better.** Over-specification can contradict itself. Prefer short, testable rules.

**Negation overload.** “Don’t do X, don’t do Y…” without a positive format often fails. Say what to do instead.

**No failure mode.** If notes are missing and the prompt still demands an answer, you invited hallucination.

**Skipping the success check.** “Be helpful” is not a check. “Names three variable types from Module 02” is.

## How to use this lesson

Read in this order:

- **Learn:** name task, context, constraints, output format, success check, and failure mode
- **Inspect:** read the weak prompt and list what is missing
- **Build:** fill the improved instruction package field by field
- **Prove:** explain which field most reduces hallucination risk

Practice after reading means you should understand all six fields before editing code. If the weak prompt still looks “fine,” compare it to the success check you wrote.

## Your local task

### Step 1 — Create the starter

Create `prompt_test.py`:

```python
# prompt_test.py — Stage 03: Prompting as Instruction Design

weak_prompt = "Help the student with Python variables."

improved = {
    "task": "TODO",
    "context": "TODO: approved Module 02 notes only",
    "constraints": ["TODO", "TODO"],
    "output_format": "TODO",
    "success_check": "TODO",
    "failure_mode": "TODO: what to do if notes are missing",
}

def print_workbook(weak, strong):
    print("=== Prompt Test Workbook ===")
    print("\nWEAK PROMPT")
    print(weak)
    print("\nIMPROVED INSTRUCTION PACKAGE")
    for key, value in strong.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_workbook(weak_prompt, improved)
```

### Step 2 — Fill the improved package

Example direction (write your own):

```python
improved = {
    "task": "Explain variables and four basic types to a beginner",
    "context": "approved Module 02 lesson text only",
    "constraints": [
        "do not invent libraries or files",
        "do not claim the learner ran code you did not see",
    ],
    "output_format": "four short bullets: string, int, float, bool + one local practice tip",
    "success_check": "each bullet names a type and a tiny example",
    "failure_mode": "if Module 02 context is missing, ask for the lesson section instead of guessing",
}
```

### Step 3 — Run and compare

```bash
python3 prompt_test.py
```

Windows:

```bash
python prompt_test.py
```

Read the weak line beside the improved fields. Say which field most reduces hallucination risk.

### Step 4 — One change you can explain

Tighten **one** field (`success_check` or `failure_mode` is ideal), re-run, and explain how a reviewer would use it.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| instruction package | Task + context + constraints + format + check + failure |
| zero-shot | Task description without examples |
| few-shot | Task description with short examples |
| success check | Reviewable requirement for a good answer |
| failure mode | What to do when required context is missing |
| prompt test workbook | Side-by-side weak vs improved prompt record |

## Proof checklist

- [ ] `prompt_test.py` prints weak and improved versions
- [ ] Improved package has all six fields filled
- [ ] Constraints and failure mode are concrete
- [ ] Success check is something a human could verify
- [ ] You changed one field after the first run

When those are true, continue to **Prompt Debugging and Behavior Testing**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
