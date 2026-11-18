# Domain 4: Security Operations

## Why this lesson exists

CompTIA Security+ **SY0-701** Domain 4 is **security operations**: noticing, deciding, containing, recovering, and learning — plus the day-to-day health of logging, backups, patch cadence, and alert ownership. An incident response note should be specific enough that another analyst can follow the evidence and understand the decision.

This domain trains **response order before action**. Cleanup without evidence can erase what the team needed to learn. Recovery before containment can let harm continue. Your practice artifact is a response note a second analyst can trust.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-security-plus/domain-04
cd ~/asv-learn-security-plus/domain-04
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-security-plus\domain-04"
Set-Location "$HOME\asv-learn-security-plus\domain-04"
```

You will write `response_note.txt` in that folder.

## Start here: response order before action

Do not rush from alert to cleanup. First name:

1. Where the signal came from (**alert source**)
2. How urgent the response should be (**severity**)
3. How you reduce current harm (**containment**)
4. What facts to preserve (**evidence**)
5. How you restore safe operation (**recovery**)
6. Who keeps people informed (**communication owner**)
7. What improves the next response (**lesson learned**)

Say the order in one sentence: *this signal at this severity needs this containment first, this evidence preserved, then this recovery and this owner, with this lesson learned.*

## Incident response lifecycle (study map)

| Phase | Job | Example action |
| --- | --- | --- |
| Preparation | People, runbooks, access, logging ready before incidents | On-call roster; logging retained |
| Detection / analysis | Notice and understand the signal | Impossible-travel alert triage |
| Containment | Limit active harm | Revoke session; isolate host (authorized) |
| Eradication | Remove the cause when known | Disable malicious rule; remove malware (lab/prod with authority) |
| Recovery | Restore safe operation deliberately | Password reset + MFA verify; restore service |
| Lessons learned | Improve detection, process, or design | Tighten conditional access; update runbook |

Security+ cares that you keep phases distinct. Containment is not recovery. Recovery is not “delete the evidence.”

## Response note shape

| Field | Why it matters |
| --- | --- |
| Alert source | Shows where the signal came from |
| Severity | Sets urgency and escalation without panic wording |
| Containment step | Reduces current harm |
| Evidence to collect | Preserves facts for investigation |
| Recovery step | Restores service or access safely |
| Communication owner | Keeps stakeholders informed |
| Lesson learned | Turns the event into improvement |

Good incident work is disciplined. It avoids panic actions and keeps the evidence trail intact.

## Severity without drama

| Severity | When it fits | What the note must show |
| --- | --- | --- |
| Low | Limited blast radius; known benign pattern likely | What you checked |
| Medium | Suspicious; needs timely action; not confirmed breach | Containment + evidence plan |
| High | Confirmed or highly likely compromise of important asset | Fast containment + escalation path |
| Critical | Broad impact, sensitive data, or active destructive activity | Immediate containment, exec/comms path |

Severity is a **priority label**, not a courtroom verdict. Prefer evidence-tied urgency over adjectives like “catastrophic” with no facts.

## Evidence to preserve (authorized environments)

| Evidence type | Why keep it | Honest limit |
| --- | --- | --- |
| Auth logs (time, IP, device) | Reconstruct login path | Source IP can be VPN/shared |
| Session / token revoke timestamps | Prove containment timing | Timing alone is not root cause |
| User confirmation | Separates user action from attacker | Users can be unsure |
| Host / EDR alerts | Local activity context | Alerts can be noisy |
| Change tickets | Shows authorized recovery steps | Missing tickets hurt later review |

Do not collect personal data beyond what the investigation needs. Follow your organization’s retention and legal rules.

## Example response note (suspicious login)

```text
alert_source=identity provider impossible-travel alert
severity=medium
containment_step=reset active sessions and require MFA recheck before new login
evidence_to_collect=login time, source IP, device, MFA status, user confirmation
recovery_step=restore access after password reset and successful MFA verification
communication_owner=security analyst on duty
lesson_learned=review conditional access for risky travel and unexplained new devices
```

Optional shell print:

```bash
alert_source="identity provider impossible travel alert"
severity="medium"
containment_step="reset session and require MFA recheck"
evidence_to_collect="login time, source IP, device, user confirmation"
recovery_step="restore access after password reset and MFA verification"
communication_owner="security analyst on duty"
lesson_learned="review conditional access policy for risky travel"

printf '%s\n' \
  "alert_source=$alert_source" \
  "severity=$severity" \
  "containment_step=$containment_step" \
  "evidence_to_collect=$evidence_to_collect" \
  "recovery_step=$recovery_step" \
  "communication_owner=$communication_owner" \
  "lesson_learned=$lesson_learned"
```

## Detection, monitoring, and ops health

Operations is not only “break-glass IR.” It is also the boring health of logging, backups, patch cadence, and alert ownership.

| Signal | What it may indicate | First calm check |
| --- | --- | --- |
| Impossible travel | Account used from distant locations quickly | VPN? shared admin? confirm with user |
| Burst failed logins then success | Credential stuffing / password spray | Lockout policy; MFA; source reputation |
| New admin role assignment | Privilege escalation or provisioning error | Ticket match? unexpected grantor? |
| Unexpected outbound traffic | Malware beacon or misconfig | Host isolation only if authorized and warranted |
| Backup job failed repeatedly | Availability / ransomware prep risk | Restore test readiness; storage health |

Ops checklist (lab-safe, systems you administer):

| Area | Example control | Testable behavior |
| --- | --- | --- |
| Updates | Automatic OS/app patches | Version is current; patch window documented |
| Host firewall | Restrict inbound services | Unexpected ports are closed |
| EDR / AV | Malware detection agent | Agent healthy; alerts reach an owner |
| Logging retention | Investigations have history | Retention setting + sample query |
| Backup / restore | Recovery path exists | Restore test documented |

## Common beginner mistakes

- Cleaning up before preserving evidence
- Merging containment, recovery, and communication into one vague action
- Treating severity as certainty of breach
- Skipping the communication owner (“someone will tell them”)
- Writing lessons learned as slogans (“be more careful”) instead of a concrete control or process change
- Ignoring ops health (failed backups, orphan alerts) until an incident

## Your local task

### Step 1 — Use a synthetic alert

```text
Alert: repeated authentication failures then success
User: alex
Source IP: 10.0.3.44
Window: 10 minutes
Observed: 6 failed logins, 1 success from same source
Missing: user confirmation, VPN/geo history, MFA status
```

### Step 2 — Write the response note

Create `response_note.txt` with all seven fields. Keep containment before recovery. Name evidence explicitly.

### Step 3 — Second-analyst review

Ask:

- Can another person follow the order without guessing?
- Is evidence preserved before recovery steps that might destroy logs?
- Is the lesson learned a concrete change?

### Step 4 — One change you can explain

Raise or lower severity based on one new fact (for example: MFA was off, or user confirms travel VPN). Rewrite containment/recovery so they still match.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Containment | Limiting active harm now |
| Recovery | Restoring safe operation deliberately |
| Evidence preservation | Keeping facts before they disappear |
| Severity | Priority label tied to impact and urgency |
| Lessons learned | Concrete improvement after the event |
| Runbook | Prepared steps for a known alert type |

## What good looks like

A strong Domain 4 note:

- Separates containment, evidence, recovery, and communication
- Sets severity without panic language
- Lists evidence that still exists after containment
- Ends with a lesson learned that names a policy, detection, or process change

## Proof checklist

- [ ] Course notes folder exists for domain-04
- [ ] `response_note.txt` includes source, severity, containment, evidence, recovery, owner, lesson
- [ ] Containment appears before recovery
- [ ] Evidence fields are specific
- [ ] You can walk a second analyst through the note in under two minutes

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Practice on synthetic alerts or systems you are authorized to investigate. Do not isolate hosts, reset production passwords, or collect logs from environments without permission and change control.

When those items are true, continue to **Domain 5: Security Program Management and Oversight**.

