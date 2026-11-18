# Monitoring & Observability

## Why this lesson exists

**Monitoring** asks whether the system is healthy. **Observability** provides enough evidence to understand **why** it is unhealthy. Useful signals connect a health change to a response path — SLO, metric, log, alert, runbook, owner.

This final stage teaches you to write an **observability card** before claiming a system is "monitored." Dashboards without owners and runbooks create noise, not operations.

Practice is local notes and tabletop response — not a hosted metrics stack inside ASV Learn.

## Reminder: where you work

```bash
cd ~/asv-learn-devops
mkdir -p stage-06
cd stage-06
```

Create `observability_card.sh`.

## Signals that matter

| Signal | Example |
| --- | --- |
| SLO | 99% successful learning route responses |
| Metric | 5xx rate, latency p95, queue depth |
| Log | Request ID + error stack on failure |
| Alert | Condition needing human action |
| Runbook | First response step |
| Owner | Role accountable for follow-up |

Do not collect every chart because the tool allows it. Pick signals that help someone **respond**.

## RED method (quick lens)

For each service, ask:

| Letter | Question | Example |
| --- | --- | --- |
| **R** Rate | How much traffic? | Requests per second |
| **E** Errors | How many fail? | 5xx rate, failed jobs |
| **D** Duration | How long? | p95 latency |

RED does not replace SLOs or logs — it helps you pick a **small** metric set before dashboard sprawl.

## Logs vs metrics vs traces (one line each)

- **Metrics** — aggregated numbers over time (good for alerts).
- **Logs** — discrete events with context (good for "why this request failed").
- **Traces** — request path across services (good for latency in distributed systems).

This course card expects at least one metric signal and one log signal on your observability card.

| Signal type | Good for | Weak when |
| --- | --- | --- |
| Metric | Threshold alerts, trends | Explaining one bad request |
| Log | Root cause of a request | High-cardinality spam without IDs |
| Trace | Cross-service latency | You only have one process |

## Error budget (intro idea)

An **error budget** is how much failure your SLO allows over a window. If SLO is 99% monthly success, you have ~1% budget for incidents and planned risk. When budget is exhausted, teams slow feature releases and focus on reliability — observability cards connect to that decision even if you do not calculate budgets formally yet.

## On-call handoff

Your `dashboard_owner` should know where the runbook lives and who covers the next shift. An alert that pages someone with no runbook and no handoff is operational debt. `tabletop.txt` in this stage practices that handoff story without a real incident.

## Local evidence habits (no hosted Grafana required)

You can practice evidence discipline without a vendor stack:

| Habit | Local practice |
| --- | --- |
| Timestamp everything | Include UTC time in tabletop lines |
| Tie to deploy | Note "last deploy version/time" in runbook |
| Correlate IDs | Invent a `request_id` in the fictional timeline |
| Redact | Never paste real secrets into notes |
| Close the loop | Tabletop ends with rollback **or** escalate |

Optional on your own machine (authorized only): `curl -sv --max-time 5 https://host/health` and save exit code + timestamp into notes. Do not probe systems you do not own.

## Start here: signal before dashboard

Say the card: *SLO on route success, alert on elevated 5xx for five minutes, logs tie errors to deploy time, runbook compares deploy and rolls back if health fails, on-call DevOps owns the dashboard.*

## Common beginner mistakes

- Alerts with no runbook ("someone will figure it out")
- SLO without error budget concept (optional advanced note)
- Logging secrets or PII
- Dashboard nobody owns after launch
- Metric spikes with no user-facing symptom link
- Alerting on CPU alone while user errors are ignored
- Expecting ASV Learn to provide a live metrics sandbox for homework

## Your local task

### Step 1 — Create the observability card

Create `observability_card.sh`:

```bash
#!/usr/bin/env bash
# observability_card.sh — Stage 06: Monitoring & Observability

service_slo="99 percent successful /learn route responses over 30 days"
metric_signal="5xx error rate above baseline for 5 minutes"
log_signal="application logs include request_id and deploy version on errors"
alert_condition="5xx rate > 2% for 5m OR p95 latency > 800ms for 10m"
runbook_action="check deploy time, tail logs, compare health, rollback if SLO breach continues"
dashboard_owner="on-call DevOps engineer"

printf '%s\n' \
  "slo=$service_slo" \
  "metric=$metric_signal" \
  "logs=$log_signal" \
  "alert=$alert_condition" \
  "runbook=$runbook_action" \
  "owner=$dashboard_owner"
```

### Step 2 — Run

```bash
bash observability_card.sh
```

### Step 3 — Incident table-top

Create `tabletop.txt` — a fictional five-line timeline: alert fires → on-call opens dashboard → runbook step 1 → decision (rollback or escalate). No real incident required.

### Step 4 — Course capstone review

In `devops_capstone_review.txt`, list one card artifact from each stage (01–06) you would show a reviewer. Honest local files count as proof at this course depth.

### Step 5 — Alert quality check

Create `alert_quality.txt` answering: (1) What user symptom does this alert protect? (2) What is the first command or dashboard panel in the runbook? (3) When is "page a human" wrong (too noisy)? Keep it short — quality over alert count.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| SLO | Service level objective — target for reliability |
| metric | Numeric time-series measurement |
| alert | Automated notification when threshold crossed |
| runbook | Documented response steps |
| on-call | Rotation responsible for alerts |
| error budget | Allowed failure within an SLO window |
| signal | Evidence used to decide a response |

## Proof checklist

- [ ] Observability card prints SLO, metric, log, alert, runbook, owner
- [ ] Alert condition is specific (not "errors bad")
- [ ] Runbook names first actions, not vague "investigate"
- [ ] `tabletop.txt` walks alert → response
- [ ] `alert_quality.txt` ties alert to user symptom
- [ ] `devops_capstone_review.txt` references all six stage artifacts
- [ ] You know practice is local/authorized lab — no hosted observability sandbox promised

When those are true, you have completed the **DevOps & Infrastructure** course card at stage depth (~**28–36 hours** honest local practice across the path). Deepen with real lab projects over time — hour totals grow with practice, not padding.

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
