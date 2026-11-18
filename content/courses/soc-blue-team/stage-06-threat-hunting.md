# Threat Hunting and Advanced Detection

## Why this lesson exists

Threat hunting starts with a **hypothesis**. The analyst assumes automated alerts may miss quiet attacker behavior, then searches approved data for evidence.

In this lesson you will write a hunt plan: hypothesis, data source, lookback window, query pattern, anomaly signal, finding decision, and detection update.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-soc-blue-team/stage-06
cd ~/asv-learn-soc-blue-team/stage-06
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-soc-blue-team\stage-06"
Set-Location "$HOME\asv-learn-soc-blue-team\stage-06"
```

You will create `hunt_plan.txt` in that folder.

## Start here: hypothesis before hunting

Do not browse logs until something looks suspicious. First write:

1. Hunt hypothesis
2. Data source
3. Lookback window
4. Expected / query pattern
5. Anomaly signal
6. Validation step and finding decision
7. Detection update

A hunt is not random searching. It is a testable question that can find evidence, rule out the behavior for now, or improve a future detection.

## Hunt versus triage

| | Alert triage | Threat hunting |
| --- | --- | --- |
| Starts from | An alert in the queue | A hypothesis |
| Goal | Close, monitor, or escalate that alert | Find quiet behavior alerts may miss |
| Success | Defensible queue decision | Evidence, rule-out, or better detection |
| Failure mode | Drama without context | Log tourism without a question |

Hunting still needs authorization, scope, and notes another analyst can repeat.

## Hunt structure

| Field | Purpose | Example |
| --- | --- | --- |
| Hunt hypothesis | States what behavior might exist | Compromised account logs in from a rare source after failures |
| Data source | Where approved evidence can be found | Auth logs + VPN logs |
| Lookback window | Time boundary for the search | Last 7 days |
| Query pattern | Makes the search repeatable | Group by user, source_ip, hour; sort rare successes |
| Anomaly signal | Defines suspicious difference | Success after failure burst from never-seen source |
| Finding decision | Close, monitor, or escalate | Monitor; escalate if user denies login |
| Detection update | Turns learning into coverage | SIEM rule for rare-source success after failures |

Say the plan in one sentence: hypothesis, source, pattern, anomaly, decision, and detection update.

## Possible honest outcomes

| Outcome | What you write | What you do not claim |
| --- | --- | --- |
| Finding | Evidence matched the hypothesis | Instant attribution |
| No finding (for now) | Pattern not seen in the window/sources used | “Environment is clean forever” |
| Detection improvement | New or tuned rule/query with FP notes | That the rule catches all attackers |
| Scope gap | Needed logs were missing | Invented events to fill the gap |

## A clean pass through a hunt

1. The hypothesis says what behavior might exist.
2. The data source says where approved evidence can be found.
3. The query pattern makes the search repeatable.
4. The anomaly signal says what would matter.
5. The finding decision and detection update turn the result into SOC action.

Do not call the idea a finding before evidence supports it.

## Common beginner mistakes

- Hunting without a written hypothesis
- Searching all logs “for evil”
- Treating rarity alone as malice
- Skipping a validation step with the user or a second source
- Leaving no detection update after a useful hunt

## Your local task

### Step 1 — Practice hypothesis

Authorized continuation of the course scenario:

```text
Hypothesis: a compromised account is logging in from a rare source after failures
Sources allowed: authentication logs and VPN logs (lab/export)
Window: last 7 days (practice)
Need: repeatable hunt plan + detection update idea
```

### Step 2 — Write the hunt plan

Create `hunt_plan.txt`:

```text
hunt_hypothesis=compromised account is logging in from a rare source after failures
data_source=authentication logs and VPN logs
lookback_window=7 days
query_pattern=group by user source_ip and hour then sort rare successful logins
anomaly_signal=success after repeated failures from a source not seen before for that user
validation_step=confirm with user and check VPN ownership of the source
finding_decision=monitor and escalate if the user confirms no login
detection_update=add SIEM rule for rare source success after failure burst with VPN FP check
```

Optional shell print:

```bash
hunt_hypothesis="compromised account is logging in from a rare source after failures"
data_source="authentication logs and VPN logs"
query_pattern="group by user source_ip and hour then sort rare successful logins"
anomaly_signal="success after repeated failures from a source not seen before"
finding_decision="monitor and escalate if the user confirms no login"
detection_update="add SIEM rule for rare source success after failure burst"

printf '%s\n' \
  "$hunt_hypothesis" \
  "$data_source" \
  "$query_pattern" \
  "$anomaly_signal" \
  "$finding_decision" \
  "$detection_update"
```

### Step 3 — Write a negative result note

Add a short block for the “no finding” case so you practice honest closure:

```text
negative_result_note=no rare-source success-after-failure pattern in the 7-day lab export; keep rule idea in detection backlog with FP checks
```

### Step 4 — Self-review

Could another analyst repeat the hunt from your file alone? If they would need to ask you what “weird” meant, tighten the anomaly signal.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Hypothesis | Testable statement about possible attacker or misuse behavior |
| Lookback window | Time range included in the hunt |
| Anomaly | Difference from expected baseline that deserves review |
| Detection engineering | Turning hunt lessons into durable alerts/queries |
| Rule-out | Documented conclusion that the pattern was not found (for now) |

## What good looks like

A strong Stage 6 plan:

- Starts from a testable hypothesis, not log tourism
- Names approved sources, window, pattern, and anomaly signal
- Includes a validation step and an honest negative-result option
- Ends with a detection update that could become durable coverage

## Proof checklist

- [ ] `hunt_plan.txt` has hypothesis, source, window, pattern, anomaly, decision, detection update
- [ ] Hypothesis is testable in one sentence
- [ ] Validation step is included
- [ ] Negative-result note exists
- [ ] You did not claim a finding without evidence

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not browse production logs without written approval.

Hunt only in data stores and time ranges you are authorized to use. Document scope. Do not expand into systems outside the written approval “because the hypothesis is interesting.”

## Course wrap for this path

Across six stages you practiced: triage notes, SIEM search plans, intel cards, containment plans, forensic handling notes, and hunt plans. Keep the folder `~/asv-learn-soc-blue-team/` as your portfolio of calm, evidence-first blue-team work.
