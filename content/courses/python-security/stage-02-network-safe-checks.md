# Network Programming for Safe Checks

## Why this lesson exists

Network code is powerful and easy to misuse. A script that probes addresses without authorization can create legal, operational, and safety problems — even when the author “just wanted to learn.”

Professional security automation starts with **scope**: which targets are allowed, what evidence is being collected, what timeout or limit applies, and what happens when a target is outside the lab boundary.

In this stage you will model a **scoped service summary** in local Python using sample records — not live scanning. You are learning to produce reviewable output that names what was in scope, what was excluded, and why. Real socket code comes later; scope discipline comes first.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-security/stage-02
cd ~/asv-learn-python-security/stage-02
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-security\stage-02"
Set-Location "$HOME\asv-learn-python-security\stage-02"
```

You will create `service_summary.py` in that folder.

## Start here: scope before network checks

At the start, do not treat network code as permission to inspect anything reachable. First name:

1. **Allowed targets** — what the script may summarize
2. **Service records** — sample evidence, not live discovery
3. **Timeout rule** — how long a real check would wait (modeled here as a constant)
4. **Result summary** — output a reviewer can read
5. **Exclusion rule** — what stays out when a target is not authorized

Safe network automation begins as a bounded model. If the target is outside scope, the correct behavior is **exclusion**, not curiosity.

### Scope questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| Which targets are allowed? | The script stays inside authorization |
| What evidence is sample vs live? | You do not accidentally scan production |
| What timeout applies? | The helper does not hang or probe endlessly |
| What appears in the summary? | Reviewers see only scoped evidence |
| What is excluded and why? | Out-of-scope targets are visible, not hidden |

Do not start by editing the summary function. First say the boundary in one sentence: *this helper only summarizes approved sample targets, uses a timeout rule, and excludes anything outside scope.*

## How to use this lesson

Read in this order:

- **Learn:** understand why allowed targets come before any network logic
- **Inspect:** identify allowed targets, service records, timeout, and summary fields
- **Build:** adjust the scoped summary — not a live scanner
- **Prove:** explain how scope keeps the evidence reviewable

Practice after reading means you should know what the script is allowed to inspect before changing any logic.

## One clean pass through this lesson

Before the editor, read network automation as a scope-before-checks chain:

1. The allowed target list says what the script may inspect.
2. The service records are sample evidence, not live discovery.
3. The timeout rule keeps the helper from hanging or probing endlessly.
4. The result summary shows only scoped evidence a reviewer can read.
5. The exclusion rule refuses anything outside authorization.

That chain is the safety lesson. A network helper becomes risky when it treats every reachable address as fair game. A professional script proves what it checked, what it skipped, and why the skipped target stayed out.

## Service record shape

For beginner practice, each record is a dictionary:

| Field | Purpose | Example |
| --- | --- | --- |
| `target` | Host or IP being described | `lab.local` |
| `port` | Service port number | `443` |
| `state` | Modeled state (open/closed/filtered) | `open` |
| `service` | Short service label | `https` |

The summary function filters records so only targets in `allowed_targets` appear in the output.

## Reading the starter code

```python
allowed_targets = ["lab.local", "10.0.0.5"]
```

This is your **authorization list** for the exercise. In production, this would come from documented lab scope or change control — not from “whatever resolves.”

```python
if item["target"] in allowed:
```

Membership check enforces scope. Records for `evil.example` never appear in the summary.

```python
timeout_seconds = 2
```

Even in a modeled exercise, naming a timeout reminds you that real network code must not block forever. When you later use sockets or libraries, you will attach this value to connect/read timeouts.

## Common beginner mistakes

**Scanning real networks to “make it interesting.”** Use sample records only unless you have written authorization for specific targets.

**Omitting excluded targets from the report.** Reviewers should see that out-of-scope data was filtered, not silently dropped without a trace.

**Confusing open port with vulnerability.** An open port is an observation. Risk requires context, authorization, and further analysis.

**Hard-coding credentials or API keys** in network helpers. Keep secrets out of code and logs.

**Skipping timeout thinking** because sample data is instant. The constant is a design habit, not decoration.

## Your local task

### Step 1 — Create the starter

Create `service_summary.py`:

```python
# service_summary.py — Stage 02: Network Programming for Safe Checks
# Sample records only. Do not scan live networks without authorization.

allowed_targets = ["lab.local", "10.0.0.5"]
timeout_seconds = 2

service_records = [
    {"target": "lab.local", "port": 443, "state": "open", "service": "https"},
    {"target": "10.0.0.5", "port": 22, "state": "closed", "service": "ssh"},
    {"target": "unknown.lab", "port": 80, "state": "open", "service": "http"},
    {"target": "10.0.0.5", "port": 443, "state": "open", "service": "https"},
]

def summarize_services(records, allowed):
    in_scope = []
    excluded = []
    for item in records:
        if item["target"] in allowed:
            in_scope.append(item)
        else:
            excluded.append(item["target"])
    lines = [
        f"{item['target']}:{item['port']} {item['service']} {item['state']}"
        for item in in_scope
    ]
    return lines, excluded

def main():
    print(f"Scope: {allowed_targets}")
    print(f"Timeout (modeled): {timeout_seconds}s")
    summary, excluded = summarize_services(service_records, allowed_targets)
    print("=== In-scope summary ===")
    for line in summary:
        print(line)
    print("=== Excluded targets ===")
    for target in sorted(set(excluded)):
        print(target)

if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 service_summary.py
```

Confirm `unknown.lab` appears under excluded targets, not in the in-scope summary.

### Step 3 — Change one summary behavior

After the boundary is clear, change **one** thing. Examples:

- Add a count line (`In-scope records: N`)
- Sort summary lines alphabetically by target
- Add a comment in code explaining why `timeout_seconds` matters for real socket code

Save, run, and confirm the output still respects scope.

### Step 4 — Write the scope sentence

In a comment or note, complete this sentence with your own words:

*This script may summarize services for ___ targets only; it excludes ___ because ___.*

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Scope | Explicit list of targets or systems a script may touch |
| Service record | A dictionary describing target, port, state, and service name |
| Timeout | Maximum wait time before a network operation stops |
| Exclusion | Deliberately omitting out-of-scope targets from results |
| Sample evidence | Lab data standing in for live discovery |

## Proof checklist

- [ ] `service_summary.py` exists in `~/asv-learn-python-security/stage-02`
- [ ] Output lists only in-scope targets in the summary section
- [ ] Excluded targets are named separately
- [ ] `timeout_seconds` is documented in code or comments
- [ ] You changed one behavior, re-ran, and scope still holds
- [ ] You can explain why scope must be defined before network code

## Authorized-only reminder

Do not port-scan, probe, or connect to systems without explicit written authorization. This stage uses sample records only.

When those items are true, continue to **HTTP Evidence & Automation**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
