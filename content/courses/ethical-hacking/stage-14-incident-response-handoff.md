# Incident Response Handoff

## Why this lesson exists

Security testing can reveal urgent risk. A good handoff names the trigger, contact, evidence to preserve, communication path, and lesson learned. Testers who keep quiet, keep exploring, or dump raw tool noise onto defenders create a second problem.

In this lesson you will write an **incident handoff card** that would help a defender preserve evidence and act through an approved path — even if your “incident” is a lab simulation.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-14
cd ~/asv-learn-ethical-hacking/stage-14
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-14"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-14"
```

You will write `incident_handoff_card.txt` and a short timeline note.

## Start here: defender handoff before urgent action

If testing reveals urgent risk, change modes:

1. Stop expanding access
2. Preserve what already exists
3. Contact the approved owner/path
4. Communicate clearly without speculation theater
5. Capture the process lesson so the next engagement is safer

Your job is not to become the incident commander by accident. Your job is to make the first hour less chaotic.

## When a test becomes an incident signal

| Trigger example in a lab story | Why it matters |
| --- | --- |
| Unexpected production-like personal data appears | Privacy and legal exposure |
| Evidence of active misuse unrelated to your test | Possible real attacker overlap |
| Critical exposed admin control on a shared lab that others use | Immediate containment need |
| Credentials for non-lab systems discovered | Scope break and credential risk |
| Persistence you did not intend remains after cleanup failure | Unmanaged access path |

In a solo home lab, you are often both tester and owner. Still practice the handoff format so the habit exists when the roles split.

Write the first message as if the recipient is busy and skeptical. Lead with what happened, when it was noticed, what you stopped doing, and what artifact path holds the evidence. Save theories for a second paragraph, or omit them until facts catch up.

## Handoff card fields

| Field | Purpose |
| --- | --- |
| Incident trigger | What would cause immediate escalation |
| Containment contact | Who can act |
| Evidence to preserve | Logs or artifacts that should be saved |
| Communication path | How the handoff is made |
| Lesson note | What process should improve |

Example:

```text
incident_trigger=evidence of active misuse during lab review
containment_contact=security operations lead
evidence_to_preserve=timestamps, source IPs, affected account, tool output
communication_path=call on-duty lead and attach evidence package
lesson_note=update scope and monitoring before retest
```

## Preserve first, explain second

Useful preservation targets:

- Timestamps in a consistent timezone
- Host and account identifiers
- Exact commands or requests already run
- Relevant log slices (not the entire disk by default)
- Hash/list of evidence files in your index

Avoid:

- Overwriting logs by aggressive reruns
- Killing the only session before capturing context when context is the evidence
- Publishing the event to public channels
- Speculating about nation-state drama in the first message

## Malware and attack-vector awareness for handoffs

Feedstock malware lessons matter here as process, not as a invitation to detonate samples on your daily driver:

- If suspicious files appear, isolate the lab VM
- Record hashes and observed behaviors at a high level
- Do not casually move suspect binaries to shared folders
- Prefer snapshots and contained analysis environments

Your handoff should say what was observed and where the artifact lives, not narrate every PE section in the first message.

## Common beginner mistakes

- Continuing to exploit because the finding got interesting
- Calling everyone and no one
- Sending screenshots with no timestamps
- Forgetting the lesson-learned field
- Treating handoff as optional paperwork
- Deleting evidence because it looked messy

## Your local task

### Step 1 — Invent a realistic lab trigger

Base it on something you could actually encounter in your lab path (scope break, exposed admin route, unexpected data, cleanup failure).

### Step 2 — Write `incident_handoff_card.txt`

```bash
incident_trigger="evidence of active misuse during lab review"
containment_contact="security operations lead"
evidence_to_preserve="timestamps, source IPs, affected account, tool output"
communication_path="call on-duty lead and attach evidence package"
lesson_note="update scope and monitoring before retest"

printf '%s\n' \
  "trigger=$incident_trigger" \
  "contact=$containment_contact" \
  "preserve=$evidence_to_preserve" \
  "communication=$communication_path" \
  "lesson=$lesson_note"
```

### Step 3 — Write a six-line timeline

Create `handoff_timeline.txt` with chronological bullets: detection time, stop action, preservation action, contact attempt, package sent, retest rule.

### Step 4 — Self-review

Ask:

- Could an on-call person act from this card alone?
- Did I preserve before I narrated?
- Is the lesson note specific enough to change the next test?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Trigger | Condition that forces escalation |
| Containment contact | Person/role empowered to act |
| Preservation | Protecting evidence from loss or contamination |
| Handoff package | Minimum set of facts and artifacts for responders |
| Lesson learned | Process change that reduces repeat chaos |

## Proof checklist

- [ ] `incident_handoff_card.txt` complete
- [ ] `handoff_timeline.txt` has at least six lines
- [ ] Preservation list is concrete
- [ ] Communication path is named
- [ ] Lesson note would change future scope or monitoring

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Practice handoffs with lab scenarios and systems you control. Do not create real-world panic events or touch unrelated organizations to make the exercise feel dramatic.

When those items are true, continue to **Defense & Hardening**.
