# Metasploit Framework in the Lab

## Why this lesson exists

A framework can help validate a lab finding, but the tester still owns scope, module choice, safety options, stop condition, and report evidence. Metasploit does not make ethical decisions for you. It amplifies whatever judgment you bring to the keyboard.

In this lesson you will draft a **framework-use plan** that starts with check/safe verification language, limits impact, and ends with report-ready evidence for an authorized lab target.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-13
cd ~/asv-learn-ethical-hacking/stage-13
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-13"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-13"
```

Prefer a snapshotted lab VM. Framework mistakes are easier to undo when you can roll back.

## Start here: tester judgment before framework use

Before launching `msfconsole` or any equivalent, write:

1. Module or technique category you intend to use
2. Authorized lab target
3. Expected signal if the module is relevant
4. Safety option / check-first behavior
5. Stop condition
6. Report note that turns output into a finding

If you cannot fill those fields, you are browsing modules, not validating risk.

## What frameworks are good for

| Good use | Poor use |
| --- | --- |
| Confirming a lab service matches a known vulnerable build | Spraying modules at every open port |
| Producing repeatable evidence for a finding | Skipping inventory and hoping something sticks |
| Teaching exploit stages in a disposable VM | Practicing against random internet hosts |
| Checking whether a patch removed a training issue | Measuring skill by number of shells |

Password-attack and privilege-escalation concepts from feedstock belong in the same discipline: name the target, name the proof goal, and stop when the evidence is enough.

## Framework-use plan fields

| Field | Purpose |
| --- | --- |
| Module name | Lab validation module or technique category |
| Lab target | Approved target |
| Expected signal | Evidence the module should produce |
| Safety option | Setting or behavior that limits impact |
| Stop condition | When framework use ends |
| Report note | How results become a finding |

Example:

```text
module_name=lab validation module / version check
lab_target=lab.local
expected_signal=version check confirms the finding signal
safety_option=check mode before any proof action
stop_condition=stop after version evidence is recorded
report_note=record evidence, impact, remediation, and verification
```

## A disciplined lab sequence

1. Re-read Stage 01 scope and Stage 03 inventory.
2. Snapshot the lab VM if possible.
3. Choose one module path tied to one inventory row.
4. Prefer informational/check behavior before exploit behavior.
5. Capture only the output needed for the report.
6. Exit sessions; do not leave handlers running overnight without a written reason.
7. Clean temporary files and update the evidence index.

Example note-oriented commands (authorized lab only; adjust to your install):

```bash
# Conceptual workflow notes — run only in your authorized lab VM
# 1) Confirm target still matches inventory
# 2) Start framework only after framework_use_plan.txt is written
# 3) Prefer check/safe options before exploit actions
# 4) Capture evidence, then exit sessions and stop handlers
```

You do not need a shell for this stage to be complete. A well-justified decision **not** to run an exploit module is professional work.

## System-hacking concepts without trophy hunting

If your lab path includes password hashes or privilege markers:

- Identify hash types before cracking attempts
- Use lab-only wordlists and lab-only hashes
- Record whether privilege escalation was necessary for the proof goal
- Do not reuse cracked lab passwords on any non-lab system

The framework or cracker is optional. The judgment notes are required.

## Common beginner mistakes

- Opening Metasploit before writing the plan
- Assuming module rank equals authorization
- Leaving multi-handler listeners exposed on bridged adapters
- Treating a failed exploit as proof the host is safe
- Keeping sessions open as souvenirs
- Copying module output into a report without impact or remediation

## Your local task

### Step 1 — Write `framework_use_plan.txt`

```bash
module_name="lab validation module"
lab_target="lab.local"
expected_signal="version check confirms the finding signal"
safety_option="check mode before any proof action"
stop_condition="stop after version evidence is recorded"
report_note="record evidence, impact, remediation, and verification"

printf '%s\n' \
  "module=$module_name" \
  "target=$lab_target" \
  "signal=$expected_signal" \
  "safety=$safety_option" \
  "stop=$stop_condition" \
  "report=$report_note"
```

### Step 2 — Optional controlled run

Only if your lab target and snapshot discipline are ready, perform the check-first action from the plan. Save evidence as `framework_evidence.txt`. If you skip the run, write why the dry-run plan is still sufficient for this lesson.

### Step 3 — Session hygiene

Confirm no leftover sessions/handlers remain. Note cleanup in the plan file.

### Step 4 — Self-review

Ask:

- Did the framework serve the finding, or did the finding serve the framework?
- Did I stop at the stop condition?
- Can a defender understand the result without Metasploit fluency?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Module | Packaged technique inside a framework |
| Check mode | Safer verification behavior before exploitation |
| Handler | Listener that receives a callback session |
| Session hygiene | Closing access paths when evidence is complete |
| Framework-use plan | Written judgment that precedes automation |

## Proof checklist

- [ ] `framework_use_plan.txt` complete before any module run
- [ ] Target matches authorized lab label
- [ ] Safety option and stop condition are explicit
- [ ] Evidence or explicit dry-run rationale exists
- [ ] No leftover sessions/handlers without a written reason

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Use exploitation frameworks only against systems you own or are explicitly authorized to test in an isolated lab. Public internet targets are not coursework.

When those items are true, continue to **Incident Response Handoff**.
