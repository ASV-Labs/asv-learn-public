# SIEM Fundamentals and Log Analysis

## Why this lesson exists

A SIEM is useful because it makes events searchable and comparable. Analysts still have to define what **question** the query answers.

In this lesson you will write a SIEM search plan before inventing query syntax: log source, goal, fields, suspicious pattern, false-positive check, and escalation condition.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-soc-blue-team/stage-02
cd ~/asv-learn-soc-blue-team/stage-02
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-soc-blue-team\stage-02"
Set-Location "$HOME\asv-learn-soc-blue-team\stage-02"
```

You will create `siem_search_plan.txt` in that folder.

## Start here: question before query

Do not treat a SIEM search as magic. First name:

1. The log source
2. The fields you need
3. The pattern you are testing
4. The false-positive check
5. The condition that would make the alert worth escalating

A good search plan keeps you honest: the query should answer one clear question, not produce noise that feels important because it has many results.

## What a SIEM can and cannot prove

| SIEM can help with | SIEM cannot prove by itself |
| --- | --- |
| Finding events that match a pattern | That an account is definitely compromised |
| Comparing time windows and sources | Attacker intent |
| Correlating fields across sources (when ingested) | That missing logs never happened |
| Supporting close / monitor / escalate | That every relevant log was collected |

If retention, parsing, or collection is incomplete, your conclusion must say so.

## Search plan fields

| Field | Analyst question | Example |
| --- | --- | --- |
| Log source | Where did the evidence come from? | Windows authentication logs |
| Query goal | What behavior is being tested? | Failures followed by success |
| Filter fields | Which fields keep the search focused? | user, src_ip, event_id, time |
| Suspicious pattern | What would make this worth review? | >5 failures then 1 success in 10 minutes |
| False-positive check | What normal activity could explain it? | VPN reconnects; password reset window |
| Escalation note | When should another analyst pick it up? | Unusual source IP or user denies login |

Do not start by writing query syntax. First say the plan in one sentence: source, goal, fields, suspicious pattern, false-positive check, and escalation condition.

## A clean pass through SIEM work

1. The log source says where the evidence comes from.
2. The query goal says what behavior is being tested.
3. The filter fields keep the search focused.
4. The suspicious pattern says what deserves review.
5. The false-positive check and escalation note say when to close, monitor, or hand off.

That chain keeps SIEM work from becoming noisy searching.

## Reading results without overclaiming

| Result shape | Better interpretation | Weak interpretation |
| --- | --- | --- |
| Zero hits | Pattern not seen in available logs for that window | “Nothing bad happened anywhere” |
| Many similar hits | Pattern is common; check baselines / allowlists | “Mass compromise” |
| Rare hit matching pattern | Worth focused review | “Proven attacker” |
| Hits with missing fields | Parsing or collection gap | Ignore the gap |

## Common beginner mistakes

- Writing a query before naming the question
- Selecting every field “just in case”
- Treating result count as severity
- Skipping the false-positive check
- Escalating because the query “found something” without saying why it matters

## Your local task

### Step 1 — Scenario

Authorized practice alert to investigate with a search plan:

```text
Signal: possible password spray / brute force then success
User: alex
Hint: authentication logs may show failures then success from one source
Need: plan before any vendor query language
```

### Step 2 — Write the search plan

Create `siem_search_plan.txt`:

```text
log_source=windows authentication logs
query_goal=find repeated failed logins followed by a success for one user
filter_fields=user src_ip event_id time
suspicious_pattern=more than five failures then one success in ten minutes
false_positive_check=check VPN reconnects and known password reset window
escalation_note=escalate if source_ip is unusual for the user or user reports no login
```

Optional shell print in your lab:

```bash
log_source="windows authentication logs"
query_goal="find repeated failed logins followed by a success"
filter_fields="user src_ip event_id time"
suspicious_pattern="more than five failures then one success in ten minutes"
false_positive_check="check VPN reconnects and known password reset window"
escalation_note="escalate if source_ip is unusual or user reports no login"

printf '%s\n' \
  "$log_source" \
  "$query_goal" \
  "$filter_fields" \
  "$suspicious_pattern" \
  "$false_positive_check" \
  "$escalation_note"
```

### Step 3 — Add a one-line decision rule

Append to the file:

```text
decision_rule=close if VPN/reset explains it; monitor if pattern is rare but unconfirmed; escalate if user denies login or source is never-before-seen for this account
```

### Step 4 — Self-review

Could another analyst run your plan tomorrow without asking you what you meant?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| SIEM | System that centralizes and searches security-related events |
| Log source | Origin of events (auth, VPN, EDR, cloud, …) |
| False positive | Alert or hit that looks bad but has a benign explanation |
| Correlation | Linking related events across time or sources |
| Retention | How long logs remain searchable |

## What good looks like

A strong Stage 2 plan:

- Names one clear question before any vendor query syntax
- Includes a specific false-positive check another analyst can run
- Ties escalation to evidence, not result count
- Could be handed to a teammate tomorrow without a verbal walkthrough

## Proof checklist

- [ ] `siem_search_plan.txt` exists with source, goal, fields, pattern, FP check, escalation note
- [ ] The plan answers one clear question
- [ ] False-positive check is specific, not “maybe normal”
- [ ] Decision rule covers close / monitor / escalate
- [ ] You did not claim a breach from result count alone

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Query only logs you are allowed to access. Export practice samples into your lab folder when needed; do not pull production data into personal devices without approval.

When those items are true, continue to **Threat Intelligence and MITRE ATT&CK**.
