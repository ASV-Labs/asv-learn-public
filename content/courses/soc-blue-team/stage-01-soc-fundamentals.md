# SOC Fundamentals and the Analyst Role

## Why this lesson exists

A SOC analyst does not guess from one alert. The job is to gather enough context to decide whether an event should **close**, be **monitored**, or **escalate**.

In this lesson you will practice the first professional move: separate facts from assumptions, write a triage note another analyst can trust, and choose a next action the evidence actually supports.

## Reminder: where you work

Create a course notes folder on your machine (or authorized lab host):

```bash
mkdir -p ~/asv-learn-soc-blue-team/stage-01
cd ~/asv-learn-soc-blue-team/stage-01
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-soc-blue-team\stage-01"
Set-Location "$HOME\asv-learn-soc-blue-team\stage-01"
```

You will write `triage_note.txt` (or a short shell script that prints the same fields) in that folder.

## Start here: alert before verdict

Do not try to prove a breach from one noisy signal. Read the alert like a work ticket:

1. Who or what is involved?
2. What evidence exists?
3. What is missing?
4. What decision should the next analyst be able to trust?

You are not building a full incident case yet. You are slowing the alert down before anyone escalates.

## What a Tier 1 note must answer

| Question to answer | What it protects |
| --- | --- |
| What did the alert actually say? | The note does not outrun the evidence. |
| Who or what is involved? | The next analyst knows where to look. |
| What is missing? | Assumptions stay visible instead of hidden. |
| How urgent is it? | Severity stays tied to evidence, not fear. |
| What should happen next? | The queue gets a clear close, monitor, or escalate decision. |

A good Tier 1 note does not sound dramatic. It helps the next analyst see what is known, what is unknown, and why the chosen action is reasonable.

## Alert anatomy

Start with the facts the queue gives you.

| Field | Why it matters | Honest limit |
| --- | --- | --- |
| Alert user / asset | Names the account or host tied to the event | Naming it is not proof of compromise |
| Source IP / location | Shows where activity appears to come from | Source can be spoofed, shared, or VPN-related |
| Severity | Sets urgency for the queue | Severity is a priority label, not a verdict |
| Evidence | Records the observed signal | Evidence can be incomplete or noisy |
| Missing context | Names what you still cannot claim | Hidden guesses become bad escalations |
| Next action | Connects the decision to work someone can do | Action must follow from evidence |

First say the alert in one plain sentence: *this signal happened to this user or asset, from this source, with this evidence; the next action is this because of that evidence.*

## Facts versus assumptions

| Type | Example | How to handle it |
| --- | --- | --- |
| Fact | “Five failed logins, then one success from `10.0.3.44`” | Put it in Evidence |
| Assumption | “Alex’s account is compromised” | Do not write as fact; escalate only if evidence supports it |
| Missing context | “No user confirmation yet; no geo/VPN history pulled” | Put it in Missing context |
| Next action | “Monitor and escalate if failures repeat or user denies the login” | Make it specific and testable |

If you feel pulled toward “compromised” or “safe” too early, return to the evidence fields first.

## Decision paths: close, monitor, escalate

| Decision | When it fits | What the note must show |
| --- | --- | --- |
| Close | Evidence matches known benign behavior and nothing remains to check | Why it is benign; what you checked |
| Monitor | Suspicious enough to watch, not yet strong enough to escalate | What would change the decision |
| Escalate | Evidence plus missing high-impact context needs Tier 2 / IR | Facts, gaps, and why urgency rose |

## Common beginner mistakes

- Writing a verdict before listing evidence
- Treating severity as certainty (“high severity = breach”)
- Hiding unknowns so the note looks confident
- Escalating with drama instead of missing context and impact
- Closing because “it looks normal” without saying what you checked
- Expecting an automatic grading inside the lesson instead of writing a local `triage_note.txt`

## Your local task

### Step 1 — Capture a sample alert

Use this authorized practice scenario (synthetic lab data):

```text
Alert: repeated authentication failures then success
User: alex
Source IP: 10.0.3.44
Time window: 10 minutes
Observed: 6 failed logins, 1 success from the same source
Missing: user confirmation, VPN/geo history, MFA status
```

### Step 2 — Write the triage note

Create `triage_note.txt`:

```text
alert_user=alex
source_ip=10.0.3.44
severity=medium
evidence=six failed logins then one success from same source in ten minutes
missing_context=no user confirmation; VPN/geo and MFA status not checked yet
next_action=monitor user activity; escalate if failures repeat or user denies login
```

Optional: print the same fields from a shell script in your lab folder:

```bash
alert_user="alex"
source_ip="10.0.3.44"
severity="medium"
evidence="six failed logins then one success from same source in ten minutes"
missing_context="no user confirmation; VPN/geo and MFA status not checked yet"
next_action="monitor user activity; escalate if failures repeat or user denies login"

printf '%s\n' \
  "user=$alert_user" \
  "source_ip=$source_ip" \
  "severity=$severity" \
  "evidence=$evidence" \
  "missing_context=$missing_context" \
  "next_action=$next_action"
```

### Step 3 — Self-review

Read the note as if you are the next analyst. Ask:

- Can I see the facts without guessing?
- Are unknowns named?
- Does the next action follow from the evidence?

### Step 4 — One change you can explain

Change **one** field (severity or next action) and rewrite one sentence so the decision still matches the evidence. Say out loud why that change is justified.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Triage | First pass that decides close, monitor, or escalate |
| Tier 1 | Queue work that gathers context before deep investigation |
| Evidence | Observed signal you can point to |
| Missing context | What you still cannot claim |
| Escalation | Hand-off with facts, gaps, and urgency |

## What good looks like

A strong Stage 1 note:

- Lists evidence before any verdict language
- Names missing context instead of hiding it
- Chooses close, monitor, or escalate with a reason another analyst can test
- Could be handed to Tier 2 without drama

## Proof checklist

- [ ] Course notes folder exists for stage-01
- [ ] `triage_note.txt` (or equivalent) lists user, source, severity, evidence, missing context, next action
- [ ] Facts and assumptions are separated
- [ ] Next action is close, monitor, or escalate with a reason
- [ ] You can explain the note to a second analyst in under one minute
- [ ] You know practice is local / authorized lab only (no automatic grading inside the lesson)

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Use only synthetic data, your own lab, or systems you are explicitly authorized to analyze. Do not probe, scan, or collect from real systems without written permission.

When those items are true, continue to **SIEM Fundamentals and Log Analysis**.
