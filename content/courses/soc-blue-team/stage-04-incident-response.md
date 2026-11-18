# Incident Response from Detection to Containment

## Why this lesson exists

Incident response turns a confirmed security event into controlled action. The early priority is to **preserve evidence** while **reducing harm**.

In this lesson you will draft a containment plan: trigger, severity, affected asset, containment step, evidence to preserve, recovery step, and communication owner.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-soc-blue-team/stage-04
cd ~/asv-learn-soc-blue-team/stage-04
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-soc-blue-team\stage-04"
Set-Location "$HOME\asv-learn-soc-blue-team\stage-04"
```

You will create `containment_plan.txt` in that folder.

## Start here: containment before recovery

Do not jump from alert to cleanup. First name:

1. Trigger and severity
2. Affected asset
3. Containment step
4. Evidence to preserve
5. Recovery step
6. Communication owner

Response work is useful when the order is defensible. Containment limits current harm; evidence preserves facts; recovery returns safer operation.

## Response frame

| Field | Reason | Honest limit |
| --- | --- | --- |
| Incident severity | Sets response speed | Severity can change as scope expands |
| Affected asset | Names what is at risk | Scope may grow beyond the first host |
| Containment step | Stops spread or misuse | Wrong containment can break business function |
| Evidence to preserve | Keeps facts available | Some evidence is volatile and time-sensitive |
| Recovery step | Restores safer operation | Recovery too early can destroy proof |
| Communication owner | Keeps handoff clear | Silence and rumor both hurt response |

Say the plan in one sentence: trigger, severity, asset, containment, evidence, recovery, and owner.

## A clean pass through response order

1. The trigger and severity say why response is needed now.
2. The affected asset says where harm could continue.
3. The containment step reduces current risk.
4. The evidence list preserves facts before recovery changes the system.
5. The recovery step and communication owner make the handoff safe.

That chain keeps response from becoming panic cleanup.

## Containment options (examples, not a shopping list)

| Option | When it may fit | What to preserve first |
| --- | --- | --- |
| Network isolate / EDR quarantine | Host shows active suspicious use | Auth logs, process list, network connections |
| Disable or reset credentials | Account misuse suspected | Login history, MFA events, session list |
| Block indicator at perimeter | Clear malicious destination (authorized) | Connection logs and who approved the block |
| Monitor-only with heightened logging | Impact of isolation is too high right now | Explicit risk acceptance and watch criteria |

Choose the least destructive option that still reduces harm—and write why.

## Severity without drama

| Severity | When it fits | What the plan must show |
| --- | --- | --- |
| Low | Limited blast radius; known benign pattern likely | What you checked before monitor/close |
| Medium | Suspicious; needs timely action; not confirmed breach | Containment + evidence plan |
| High | Confirmed or highly likely misuse of an important asset | Fast containment + escalation path |
| Critical | Broad impact, sensitive data, or active destructive activity | Immediate containment and communications path |

Severity is a priority label tied to impact and confidence. Prefer evidence-tied urgency over adjectives like “catastrophic” with no facts.

## Evidence before rebuild

Why preserve before recovery?

- Scope: which users, hosts, and data were touched?
- Cause: what allowed the event?
- Detection: what should alert sooner next time?
- Reporting: what must leadership or legal see later?

Wiping first can feel decisive and still leave the team blind.

## Common beginner mistakes

- Reimaging before capturing volatile evidence
- Containing without naming the asset and owner
- Treating “reset password” as full recovery
- Skipping communication ownership
- Writing severity from fear instead of impact + confidence

## Your local task

### Step 1 — Confirmed-suspicious practice scenario

Authorized practice event (not a real production incident):

```text
Trigger: suspicious login success after failure burst; user denies the login
Asset: workstation alex-laptop
Severity candidate: high (active account misuse risk)
Need: containment before rebuild; evidence list; recovery; owner
```

### Step 2 — Write the containment plan

Create `containment_plan.txt`:

```text
incident_severity=high
affected_asset=workstation alex-laptop
containment_step=isolate host from network using approved EDR quarantine
evidence_to_preserve=authentication logs; process list; network connections; EDR timeline
recovery_step=reset password and reimage host after evidence capture
communication_owner=SOC incident lead
lesson_learned_note=add detection for rare-source success after failure burst
```

Optional shell print:

```bash
incident_severity="high"
affected_asset="workstation alex-laptop"
containment_step="isolate host from network using EDR quarantine"
evidence_to_preserve="authentication logs process list network connections"
recovery_step="reset password and reimage host after evidence capture"
communication_owner="SOC incident lead"

printf '%s\n' \
  "$incident_severity" \
  "$affected_asset" \
  "$containment_step" \
  "$evidence_to_preserve" \
  "$recovery_step" \
  "$communication_owner"
```

### Step 3 — Order check

Number the steps in the order you would execute them. Containment and evidence collection must appear before reimage.

### Step 4 — Self-review

Would another responder know what not to destroy? If not, expand the evidence list.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Containment | Actions that limit ongoing harm or spread |
| Eradication / recovery | Removing cause and restoring safer operation |
| Evidence preservation | Keeping facts usable for scope and cause |
| Incident severity | Priority based on impact and confidence |
| Communication owner | Person who coordinates updates and handoffs |

## What good looks like

A strong Stage 4 plan:

- Keeps containment and evidence before recovery or reimage
- Names a specific authorized containment step for the practice context
- Lists evidence another responder must not destroy
- Assigns a communication owner instead of “someone will tell them”

## Proof checklist

- [ ] `containment_plan.txt` includes severity, asset, containment, evidence, recovery, owner
- [ ] Evidence is listed before recovery/rebuild
- [ ] Containment step is specific and authorized for the practice context
- [ ] Communication owner is named
- [ ] You can explain why the order reduces harm without destroying facts

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not wipe real machines without process and authorization.

Isolate, quarantine, or reimage only systems you are authorized to touch—usually a lab VM for this course. Never practice containment on someone else’s production host.

When those items are true, continue to **Digital Forensics and Malware Analysis**.
