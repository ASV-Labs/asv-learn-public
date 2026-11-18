# Building Defensive Security Tools

## Why this lesson exists

A useful security tool reduces analyst workload without creating hidden risk. Scripts that silently change accounts, close tickets, block users, or push firewall rules without review can cause more damage than the alert they were meant to help with.

Defensive tooling starts with a **tool decision card**: purpose, approved input, safe output fields, refusal boundary, audit fields, and where **human review** stays in control.

In this stage you will design a read-only helper that summarizes failed-login patterns for analyst review — then implement a tiny summarizer over parsed events in local Python. Action stays with the human.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-security/stage-05
cd ~/asv-learn-python-security/stage-05
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-security\stage-05"
Set-Location "$HOME\asv-learn-python-security\stage-05"
```

You will create `defensive_tool.py` in that folder.

## Start here: analyst control before automation

At the start, do not design a helper that quietly changes accounts, tickets, or systems. First name:

1. **Tool purpose** — what defensive task it supports
2. **Input source** — approved data only
3. **Output fields** — what the analyst sees
4. **Safety boundary** — what the tool refuses to do
5. **Audit fields** — who ran it, on what dataset, when
6. **Human review** — when a person decides before action

A defensive tool should make review faster without taking authority away from the analyst.

### Tool design questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What task does the tool support? | Scope stays narrow |
| What input is approved? | Data comes from authorized exports |
| What appears in output? | Results are useful but limited |
| What is forbidden? | No hidden account or network changes |
| What is audited? | Usage is reviewable later |
| When does a human decide? | Escalation stays under analyst control |

Do not start by automating action. First say the tool card in one sentence: *purpose, approved input, safe output, refusal boundary, audit fields, and human review.*

## How to use this lesson

Read in this order:

- **Learn:** understand why defensive tools stay read-only until a human reviews
- **Inspect:** identify purpose, input source, output fields, safety boundary, audit fields, and human review on the tool card
- **Build:** add one defensive improvement — not auto-blocking or hidden changes
- **Prove:** explain where human review stays in control before any action

Practice after reading means the summarizer should produce evidence for a person, not take authority away from them.

## One clean pass through this lesson

Before the editor, read defensive tooling as an analyst-control-before-automation chain:

1. The tool purpose names the defensive task the script supports.
2. The input source limits data to approved exports.
3. The output fields show what the analyst sees.
4. The safety boundary refuses account, ticket, or network changes.
5. Audit fields and human review keep escalation under analyst control.

That chain keeps a helper useful without making it dangerous. A script that auto-blocks users or hides uncertainty creates more risk than the alert it was meant to help with.

## Tool decision card shape

| Field | Example value |
| --- | --- |
| `tool_purpose` | Summarize failed login patterns for analyst review |
| `input_source` | Approved identity log export |
| `output_fields` | user, source, count, first_seen, last_seen |
| `safety_boundary` | Read-only analysis; no account changes |
| `audit_fields` | reviewer, dataset_id, run_time |
| `human_review` | Analyst confirms before escalation |

The card is the contract. Code should refuse behavior outside it.

## Reading the starter code

The summarizer groups synthetic events by `(user, source)`:

```python
if event["event"] != "failed-login":
    continue
```

Only failed logins belong in this defensive summary — not every event type.

```python
key = (event["user"], event["source"])
```

Grouping key choice is a design decision. Document why you group this way in comments.

Audit metadata is printed separately so a reviewer knows **provenance**:

```python
audit = {"reviewer": "lab-analyst", "dataset_id": "synthetic-001", ...}
```

## Common beginner mistakes

**Auto-blocking users** from a script without ticket workflow and approval.

**No audit trail** — future you cannot explain what the tool saw or did.

**Mixing read and write tools** in one script “for convenience.”

**Summarizing data the tool is not authorized to read.**

**Hiding uncertainty** — if input is incomplete, say so in output.

## Your local task

### Step 1 — Create the starter

Create `defensive_tool.py`:

```python
# defensive_tool.py — Stage 05: Building Defensive Security Tools
# Read-only summary. No account or network changes.

tool_card = {
    "tool_purpose": "summarize failed login patterns for analyst review",
    "input_source": "approved identity log export",
    "output_fields": ["user", "source", "count", "first_seen", "last_seen"],
    "safety_boundary": "read-only analysis; no account changes",
    "audit_fields": ["reviewer", "dataset_id", "run_time"],
    "human_review": "analyst confirms before escalation",
}

sample_events = [
    {"time": "09:41", "user": "alex", "source": "10.0.3.44", "event": "failed-login"},
    {"time": "09:42", "user": "alex", "source": "10.0.3.44", "event": "failed-login"},
    {"time": "09:44", "user": "alex", "source": "10.0.3.44", "event": "login-success"},
    {"time": "09:46", "user": "jordan", "source": "10.0.3.55", "event": "failed-login"},
]

def summarize_failed_logins(events):
    buckets = {}
    for event in events:
        if event["event"] != "failed-login":
            continue
        key = (event["user"], event["source"])
        if key not in buckets:
            buckets[key] = {
                "user": event["user"],
                "source": event["source"],
                "count": 0,
                "first_seen": event["time"],
                "last_seen": event["time"],
            }
        row = buckets[key]
        row["count"] += 1
        row["last_seen"] = event["time"]
    return list(buckets.values())

def main():
    print("=== Tool decision card ===")
    for key, value in tool_card.items():
        print(f"{key}: {value}")
    audit = {
        "reviewer": "lab-analyst",
        "dataset_id": "synthetic-001",
        "run_time": "2026-08-07T12:00:00Z",
    }
    print("=== Audit ===")
    print(audit)
    print("=== Summary (human review required) ===")
    for row in summarize_failed_logins(sample_events):
        print(row)

if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 defensive_tool.py
```

Confirm alex/`10.0.3.44` shows count 2 and jordan appears once. Success events do not inflate failed-login counts.

### Step 3 — Add one defensive improvement

Change **one** thing. Examples:

- Print `human_review` reminder before summary rows
- Flag rows where `count >= 3` for analyst attention (still no auto-action)
- Add `safety_boundary` check function that raises if code tries to call a forbidden action name

Save and run again.

### Step 4 — Describe the handoff

In a comment or note, answer:

1. What would an analyst do after reading this summary?
2. What must this tool **never** do automatically?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Tool decision card | Written contract for a defensive helper |
| Read-only analysis | Observing and summarizing without changing systems |
| Audit fields | Metadata proving who ran the tool and on what data |
| Human review | Required person-in-the-loop before sensitive action |
| Safety boundary | Explicit list of forbidden automated behaviors |

## Proof checklist

- [ ] `defensive_tool.py` exists in `~/asv-learn-python-security/stage-05`
- [ ] Tool card and audit block print before summary
- [ ] Summary counts only failed-login events
- [ ] No code path changes accounts, firewall rules, or tickets
- [ ] You added one defensive improvement and re-ran
- [ ] You can explain where human review stays in control

## Authorized-only reminder

Use only synthetic events or log exports you are explicitly authorized to analyze. This tool summarizes patterns for review — it does not take action on accounts or systems.

When those items are true, continue to **Secure Coding Practices**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
