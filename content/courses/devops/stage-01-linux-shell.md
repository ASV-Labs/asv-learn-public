# Linux & Shell Scripting Foundations

## Why this lesson exists

DevOps starts with **careful inspection**. A shell command should answer a question before it changes a system. The professional habit is observe → preserve evidence → verify user impact → choose the safest action → keep rollback ready.

This stage teaches you to write a **response checklist** in shell variables you print locally. You are not fixing a production outage in this lesson. You are learning the order that keeps small incidents from becoming blind restarts.

Practice in your own terminal, VM, or authorized lab hosts only. Keep scope legal and documented.

This course card targets **28–36 hours** of honest local practice across all stages — not padded lab time or hosted sandboxes.

## Reminder: where you work

Create a course notes folder:

```bash
mkdir -p ~/asv-learn-devops/stage-01
cd ~/asv-learn-devops/stage-01
```

Windows (WSL or Git Bash recommended for shell practice):

```bash
mkdir -p ~/asv-learn-devops/stage-01
cd ~/asv-learn-devops/stage-01
```

You will create `response_checklist.sh` and a small evidence log.

## Start here: observe before restart

When something breaks, resist restart-first reflexes.

| Step | Question | Evidence |
| --- | --- | --- |
| Symptom | What changed for users or jobs? | alert, ticket, failed cron |
| Status | Does the process appear running? | `systemctl`, `ps`, service state |
| Logs | What happened before you arrived? | timestamped errors |
| Public health | Can a user-facing route answer? | HTTP check, smoke test |
| Action | Safest next move? | restart, rollback, escalate |
| Rollback | Recovery if action fails? | previous release, snapshot |

A process can be **running** while users still see failure. User-facing health is stronger evidence than green process status alone.

## The operating loop

```text
inspect → decide → change → verify → document
```

Restarting can erase log clues. Document what you inspected **before** you change state. If you cannot name the rollback before the change, you are not ready to change.

## Useful inspection commands (your machine or authorized lab)

These are **read-mostly** examples — adapt to your environment:

| Goal | Example command | Notes |
| --- | --- | --- |
| OS / uptime | `uname -a`, `uptime` | Baseline context |
| Disk space | `df -h` | Full disks cause subtle failures |
| Memory pressure | `free -h` or `vm_stat` (macOS) | OOM kills look like random restarts |
| Listening ports | `ss -tlnp` or `lsof -iTCP -sTCP:LISTEN` | Is anything bound to the expected port? |
| Process snapshot | `ps aux \| head -20` | Who is running; do not kill blindly |
| Recent logs | `journalctl -u SERVICE -n 50 --no-pager` | Adjust unit name; read before restart |
| HTTP health | `curl -sv --max-time 5 https://host/health` | User-facing signal |
| Save evidence | `tee ~/asv-learn-devops/stage-01/incident.log` | Keep a copy you can attach to a ticket |

Pipe long output to a file: `journalctl ... > ~/asv-learn-devops/stage-01/incident.log`. Redact secrets before sharing.

### Capture a local baseline (safe)

On **your own machine**, save a baseline you can compare later:

```bash
{
  echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  uname -a
  uptime
  df -h | head -20
} | tee practice_log.txt
```

Do not run inspection against systems you are not authorized to touch.

## Shell script habits

- `set -euo pipefail` in real scripts catches many foot-guns (stop on error, unset vars fail, pipe failures propagate).
- Quote variables: `"$var"` not `$var`.
- Prefer explicit paths in runbooks over "run the usual command."
- Prefer `printf` over unquoted `echo` when formatting structured notes.
- Keep scripts small and reviewable; a checklist that prints truth beats a 200-line "automation" nobody trusts.

### Exit codes as evidence

| Code | Meaning in practice |
| --- | --- |
| `0` | Command succeeded for its own definition of success |
| non-zero | Something failed — capture stderr before retrying |
| `curl -f` non-zero | HTTP error status — treat as health failure |

A green shell prompt after `systemctl restart` does not mean users are healthy. Pair process actions with a health check exit code.

## Common beginner mistakes

- `systemctl restart` before reading logs
- Trusting green dashboard while users report errors
- No rollback named before deploy or restart
- Running destructive commands on systems you do not own
- Expecting an in-lesson hosted shell grader instead of local or authorized-lab practice
- Saving secrets (tokens, passwords) into `practice_log.txt` or tickets
- Treating `ps` "process exists" as proof the user path works

## Your local task

### Step 1 — Create the checklist script

Create `response_checklist.sh`:

```bash
#!/usr/bin/env bash
# response_checklist.sh — Stage 01: Linux & Shell Foundations
# Run: bash response_checklist.sh

inspect_steps="status logs public-health"
action_order="inspect then change then verify"
safe_action="escalate if health fails after one bounded restart attempt"
rollback_plan="redeploy previous known-good release if health does not recover"
symptom="example: API returns 502 for learners"
status_evidence="systemctl status app — active (running)"
log_evidence="last 50 lines show connection refused to database"
health_evidence="curl -f https://lab.example/health — FAIL (502)"

printf '%s\n' \
  "symptom=$symptom" \
  "inspect_steps=$inspect_steps" \
  "action_order=$action_order" \
  "status_evidence=$status_evidence" \
  "log_evidence=$log_evidence" \
  "health_evidence=$health_evidence" \
  "safe_action=$safe_action" \
  "rollback_plan=$rollback_plan"
```

### Step 2 — Run unchanged

```bash
bash response_checklist.sh
```

Read output as a story: symptom → evidence → action → rollback.

### Step 3 — Local inspection practice (safe)

Append real output from your baseline capture to `practice_log.txt` (Step above). Optionally add:

```bash
# Optional — only on machines you own / are authorized to inspect
# ps aux | head -5
# ss -tlnp 2>/dev/null | head -10 || lsof -iTCP -sTCP:LISTEN 2>/dev/null | head -10
```

### Step 4 — One change you can explain

Edit `safe_action` to require log capture before restart. Re-run and explain why restart-first would be weaker work.

### Step 5 — Mini tabletop (written)

Create `tabletop_01.txt` with four lines: (1) symptom, (2) first command you would run, (3) what would make you escalate instead of restart, (4) rollback if a bounded restart fails. This is paper practice — no production systems.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| shell | Command-line interpreter (bash, zsh) |
| stdout / stderr | Normal output vs error output streams |
| health check | Request that proves user-visible readiness |
| rollback | Return to last known-good state |
| evidence | Saved output tied to a decision |
| runbook | Short documented response order |
| exit code | Numeric success/failure signal from a command |

## Proof checklist

- [ ] `~/asv-learn-devops/stage-01` exists
- [ ] `response_checklist.sh` prints all evidence fields in sensible order
- [ ] You ran harmless local inspection commands and saved notes
- [ ] `tabletop_01.txt` names escalate vs restart vs rollback
- [ ] You can explain why logs before restart matter
- [ ] You know practice is local/authorized lab only — no hosted sandbox promised here

When those are true, continue to **Docker & Containerization**.

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
