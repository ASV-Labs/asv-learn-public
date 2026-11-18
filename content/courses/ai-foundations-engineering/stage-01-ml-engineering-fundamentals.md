# ML Engineering Fundamentals

## Why this lesson exists

A notebook that classifies text once is not an AI service. An engineered service can receive a request, return a predictable response, fail safely on bad input, and leave a signal the team can watch after release.

This course teaches production AI habits: contracts, data quality, features without leakage, validation before promotion, deployment proof, and scaling rules. Stage 01 starts with the **service boundary** — what comes in, what goes out, how errors look, and what you monitor.

You will draft a small **service contract** in local Python. You are not training a model yet. You are learning the habit that keeps later work honest: **name the operating boundary before you chase model accuracy**.

## Reminder: where you work

Create a dedicated folder for this course:

```bash
mkdir -p ~/asv-learn-ai-foundations-engineering
cd ~/asv-learn-ai-foundations-engineering
```

Windows (PowerShell):

```powershell
mkdir $HOME\asv-learn-ai-foundations-engineering
cd $HOME\asv-learn-ai-foundations-engineering
```

You will create `service_contract.py` in that folder.

## Notebook demo versus engineered service

| Notebook demo | Engineered service |
| --- | --- |
| Runs when a person clicks cells | Accepts requests from callers |
| Output is whatever the cell printed | Output shape is part of a contract |
| Bad input often raises a raw traceback | Bad input returns a safe, explainable error |
| Success means “it worked once” | Success includes health signals after release |
| Ownership is informal | Someone can test and operate the boundary |

Accuracy alone does not make a service. If a teammate cannot validate input, predict output shape, or know what to watch when traffic arrives, the work is still a demo.

## Start here: service boundary before model syntax

At the start, do not jump into algorithms, GPU choices, or notebook tricks. Ask:

1. What request comes in?
2. What response goes out?
3. How does bad input fail?
4. What signal proves the service is still healthy?
5. Who could test this without guessing?

You are building one **service contract**, not proving model cleverness. The goal is to make the engineering boundary testable before a model object appears.

### Boundary questions and what they protect

| Boundary question | What it protects |
| --- | --- |
| What does the caller send? | Input is specific enough to validate |
| What does the service send back? | Output is predictable enough to test |
| What happens when input is wrong? | Failures do not leak internals or invent answers |
| What will the team watch later? | The service can be operated after it leaves the notebook |
| Who owns the boundary? | Someone can fix contract drift |

Do not start by editing code. First say the contract out loud: *callers send this shape, get that shape back, see this error on bad input, and we watch these signals after release.*

## How to use this lesson

Read in this order:

- **Learn:** connect ML engineering to a testable service boundary
- **Inspect:** read each contract field as evidence a teammate could check
- **Build:** draft one service contract before thinking about model code
- **Prove:** explain how another engineer would test or operate the boundary without guessing

Practice after reading means you should understand the required fields before editing code. If the starter dictionary looks like config noise, read one key at a time and ask: *what does this prove for a real service?*

## One clean pass through this lesson

Before the editor, walk the service story in plain language:

1. A caller sends something to the system.
2. The system accepts only the shape it promised to accept.
3. The system returns the shape it promised to return.
4. Bad input gets a safe, explainable response.
5. A teammate has a signal they can watch after release.

A good answer is not “the model is smart.” A good answer is: *I can show what comes in, what goes out, what fails safely, and what proves the service is still healthy.*

## The service contract shape

In Python, a service contract is often a dictionary with nested schemas and short operating rules:

```python
service_contract = {
    "input_schema": {"text": "string"},
    "output_schema": {"label": "string", "confidence": "number"},
    "error_behavior": "malformed input returns a safe error object",
    "monitoring_signal": "monitor latency, error rate, and malformed input rate",
}
```

Each field is a **contract**, not decoration:

- `input_schema` — fields and types the service accepts
- `output_schema` — fields the service returns to callers
- `error_behavior` — how malformed input fails without exposing internals
- `monitoring_signal` — what the team watches after release

For a triage classifier example: input might be ticket text; output might be a label plus confidence; malformed empty text should return a structured error, not a stack trace; after release you watch latency, error rate, and how often input is rejected.

## Common mistakes

**Starting with the model.** Choosing an architecture before naming input and output makes later testing vague.

**Vague schemas.** `"data": "object"` is not a schema. Callers need field names and types.

**Leaking internals on errors.** Tracebacks and model paths belong in logs with access control, not in public responses.

**No monitoring signal.** If you cannot name what proves health, you cannot operate the service after launch.

**Calling a printout “done.”** Printing a dictionary is only useful if each field maps to a testable behavior.

## Your local task

### Step 1 — Create the starter

Create `service_contract.py` with this starter:

```python
# service_contract.py — Stage 01: ML Engineering Fundamentals
# Run unchanged first, then tighten one contract field.

service_contract = {
    "input_schema": {"text": "string"},
    "output_schema": {"label": "string", "confidence": "number"},
    "error_behavior": "malformed input returns a safe error object",
    "monitoring_signal": "monitor latency, error rate, and malformed input rate",
}

def print_contract(contract):
    print("=== Service Contract ===")
    for key, value in contract.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_contract(service_contract)
```

### Step 2 — Run unchanged

```bash
python3 service_contract.py
```

Windows:

```bash
python service_contract.py
```

Read the output. Match each printed field to one behavior a teammate could test.

### Step 3 — Tighten one field

Change **one** field to make the boundary clearer. Examples:

- Add `"ticket_id": "string"` to `input_schema`
- Make `error_behavior` name a specific status shape such as `{"ok": false, "error": "invalid_input"}`
- Narrow monitoring to one primary signal plus one secondary signal

Save and run again. Confirm the output shows your change.

### Step 4 — Explain the operating proof

In a comment at the bottom of the file (or a short note), write two sentences:

1. How would a teammate **test** this contract without the model?
2. What would they **watch** in the first hour after a release?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| service contract | Named input, output, error, and monitoring rules for an AI endpoint |
| input schema | Fields and types the service accepts |
| output schema | Fields the service promises to return |
| safe error | A controlled failure response that does not leak internals |
| monitoring signal | A metric that proves the service is healthy or degraded |
| ML engineering | Turning model ideas into operable services |

## Proof checklist

- [ ] `service_contract.py` exists in `~/asv-learn-ai-foundations-engineering`
- [ ] Running it prints all four contract fields
- [ ] You can explain what each field proves for callers or operators
- [ ] You changed one field, re-ran, and saw the update
- [ ] You wrote how a teammate would test and monitor the boundary

When those are true, continue to **Data Pipelines & Preprocessing**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
