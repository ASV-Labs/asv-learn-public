# Python Basics for Security

## Why this lesson exists

Security automation starts with dependable basics. Before a script can help an analyst, it must read input predictably, produce structured output, and handle bad data without hiding the problem.

Analysts compare events across time — failed logins, new sources, repeated patterns. If your parser silently accepts malformed lines or invents missing fields, the report looks complete while the evidence is wrong. That is worse than no automation at all.

In this stage you will build a tiny **log event parser** in local Python. You are not building a SIEM, a scanner, or a production pipeline. You are learning the habit that makes later automation safer: **parse one small thing correctly before you automate many things quickly**.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.

## Reminder: where you work

Create a dedicated folder for this course:

```bash
mkdir -p ~/asv-learn-python-security/stage-01
cd ~/asv-learn-python-security/stage-01
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-security\stage-01"
Set-Location "$HOME\asv-learn-python-security\stage-01"
```

You will create `log_parser.py` in that folder.

## Start here: data shape before security tooling

At the start, do not jump to scanners, sockets, or large defensive tools. Ask what one record means:

1. What raw string came in?
2. Which fields are expected?
3. What counts as malformed?
4. What structure should come out?
5. What should an analyst be able to compare?

You are not building a full security product yet. You are practicing the first professional move: treat the parser as a **translator**, not a magic filter. Its job is to preserve meaning while refusing input that cannot be trusted.

### Parsing questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What raw string came in? | The original evidence stays visible |
| Which fields are expected? | The script does not invent missing data |
| What counts as malformed? | Bad input is handled deliberately |
| What structure comes out? | Analysts can compare events consistently |
| What should be explained? | You can connect code behavior to investigation value |

Do not start by editing the parser. First say the data shape in one sentence: *each valid line has time, user, source, and event; anything with the wrong shape should fail clearly.*

## How to use this lesson

Read in this order:

- **Learn:** understand what one log record means and why bad lines must not become fake events
- **Inspect:** identify the expected fields and the malformed-input case
- **Build:** change one small parser behavior — not a scanner
- **Prove:** explain how predictable parsing helps an analyst trust the output

Practice after reading means you should understand the record before editing code. If the Python looks like a wall, read one line at a time and ask: *what input comes in, what fields are expected, what output comes out?*

## One clean pass through this lesson

Before the editor, read the parsing task as an evidence chain:

1. A raw log line arrives as text.
2. The delimiter tells Python where one field ends and the next begins.
3. The expected shape tells you how many fields should exist.
4. A valid line becomes a dictionary an analyst can compare.
5. A malformed line fails clearly instead of pretending to be evidence.

That chain is the security lesson. Automation gets dangerous when a script accepts messy input and hides the mistake. A small parser that tells the truth is more useful than a large tool that silently trusts bad data.

## Log record anatomy

Start with simple comma-separated log lines (synthetic lab data):

| Field | Example | Analyst use |
| --- | --- | --- |
| Time | `09:41` | Order events in a window |
| User | `alex` | Tie activity to an account |
| Source | `10.0.3.44` | Compare where activity appears to come from |
| Event | `failed-login` | Name the observed signal |

Your first goal is not a large tool. It is a tiny parser that turns a line into a dictionary and returns `None` when the line is malformed.

## Reading the starter code

The starter uses three ideas you will reuse in later stages:

```python
parts = line.split(",")
```

`split` breaks the string at each comma. If the line has four fields, `parts` should have length 4.

```python
if len(parts) != 4:
    return None
```

This is **shape validation**. Wrong field count means the line cannot be trusted as a complete event.

```python
return {"time": event_time, "user": user, "source": source, "event": event}
```

A **dictionary** gives named fields an analyst can filter, count, or compare. Lists of strings are harder to reason about at scale.

## Common beginner mistakes

**Parsing twice in a list comprehension.** Writing `parse_event(line) for line in logs if parse_event(line)` calls the function twice per line. Prefer a loop or assign the result once.

**Returning partial data on bad input.** Do not return `{"user": parts[1]}` when the line has only two fields. Fail closed.

**Stripping whitespace too late.** If logs may have spaces after commas, consider `part.strip()` on each field — but only after you understand the raw shape.

**Treating `None` as success.** Filter malformed lines out of the final list, but log or count how many failed so the analyst knows data was dropped.

**Jumping to regex before split works.** For fixed delimiter logs, `split` is clearer. Regex comes later when formats vary.

## Your local task

### Step 1 — Create the starter

Create `log_parser.py`:

```python
# log_parser.py — Stage 01: Python Basics for Security
# Run unchanged first, then improve bad-input handling.

sample_logs = [
    "09:41,alex,10.0.3.44,failed-login",
    "09:44,alex,10.0.3.44,login-success",
    "09:45,alex,bad-line-missing-fields",
    "09:46,jordan,10.0.3.55,failed-login",
]

def parse_event(line):
    parts = line.split(",")
    if len(parts) != 4:
        return None
    event_time, user, source, event = parts
    return {
        "time": event_time,
        "user": user,
        "source": source,
        "event": event,
    }

def main():
    parsed_events = []
    skipped = 0
    for line in sample_logs:
        event = parse_event(line)
        if event is None:
            skipped += 1
            continue
        parsed_events.append(event)
    print("=== Parsed events ===")
    for event in parsed_events:
        print(event)
    print(f"Skipped malformed lines: {skipped}")

if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 log_parser.py
```

Windows:

```bash
python log_parser.py
```

Expected shape:

```text
=== Parsed events ===
{'time': '09:41', 'user': 'alex', 'source': '10.0.3.44', 'event': 'failed-login'}
...
Skipped malformed lines: 1
```

Confirm the bad line was skipped, not silently merged into a fake event.

### Step 3 — Improve one behavior

Change **one** thing after the output makes sense. Examples:

- Strip whitespace from each field with `.strip()`
- Print which raw line was skipped (for audit visibility)
- Count failed-login events per user in a simple loop

Save and run again. Confirm your change behaves as you expected.

### Step 4 — Explain the analyst value

In a comment at the bottom of the file (or a separate note), write two sentences:

1. Why returning `None` for bad lines is safer than guessing field values.
2. What an analyst could compare using your parsed dictionaries (user, source, event type, etc.).

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Parser | Code that turns raw text into structured data |
| Delimiter | Character that separates fields (here, comma) |
| Shape validation | Checking that input has the expected number and type of fields |
| Dictionary | A mapping of named keys to values (`{"user": "alex"}`) |
| Fail closed | Reject bad input instead of continuing with partial or invented data |
| Synthetic data | Lab-generated sample records, not live production logs |

## Proof checklist

- [ ] `log_parser.py` exists in `~/asv-learn-python-security/stage-01`
- [ ] Running it prints parsed dictionaries for valid lines
- [ ] Malformed lines are skipped and counted (not turned into fake events)
- [ ] You can name the four expected fields
- [ ] You changed one parser behavior, re-ran, and saw the difference
- [ ] You can explain why predictable parsing matters before automation

## Authorized-only reminder

Use only synthetic data, your own lab, or log exports you are explicitly authorized to analyze. Do not collect or parse production logs without permission.

When those items are true, continue to **Network Programming for Safe Checks**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
