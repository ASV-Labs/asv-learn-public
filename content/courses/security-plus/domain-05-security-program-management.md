# Domain 5: Security Program Management and Oversight

## Why this lesson exists

CompTIA Security+ **SY0-701** Domain 5 is **security program management and oversight**: accountable decisions, risk treatment, policy ownership, and evidence that leadership can review later. Governance language still appears, but the SY0-701 framing emphasizes running and overseeing a security **program** — not compliance theater.

Risk work connects an asset, a possible event, business impact, control ownership, and the decision about what remains after controls. Compliance can make expectations measurable, but a checkbox is not the same as security. Your practice artifact is one risk-register row that names the choice: accept, reduce, transfer, or avoid — with evidence someone could check later.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-security-plus/domain-05
cd ~/asv-learn-security-plus/domain-05
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-security-plus\domain-05"
Set-Location "$HOME\asv-learn-security-plus\domain-05"
```

You will write `risk_row.txt` in that folder.

## Start here: decision before paperwork

Do not start by writing framework jargon. First name:

1. What the organization cares about (**asset**)
2. What could happen and why it matters (**risk statement**)
3. How probable it is (**likelihood**)
4. What harm would result (**impact**)
5. Who is accountable (**owner**)
6. Which rule or control applies (**policy control**)
7. What evidence will be kept (**oversight / compliance note**)
8. What remains after the choice (**residual risk decision**)

Say the row in one sentence: *this asset faces this risk at this likelihood and impact; this owner applies this control; evidence is this; residual decision is accept/reduce/transfer/avoid.*

## Risk register row fields

| Field | What it proves |
| --- | --- |
| Asset | What the organization cares about |
| Risk statement | What could happen and why it matters |
| Likelihood | How probable it is (with your scale) |
| Impact | What harm would result |
| Owner | Who is responsible for action |
| Policy control | Which rule or standard applies |
| Oversight note | What evidence is needed later |
| Residual risk decision | Accept, reduce, transfer, or avoid |

A useful risk row shows the actual decision. Hiding behind “compliant” without an owner or residual choice is not program oversight — it is paperwork.

## Likelihood and impact (keep them separate)

| Dimension | Question | Example scale language |
| --- | --- | --- |
| Likelihood | How often / how probable? | Rare / possible / likely |
| Impact | How bad if it happens? | Low / medium / high / critical for the business |
| Risk level | Combined priority for attention | Medium likelihood × high impact → prioritize |

Do not let a scary impact story inflate likelihood without evidence. Do not let “it has not happened yet” erase high impact.

## Risk treatment decisions

| Decision | Meaning | When it fits |
| --- | --- | --- |
| Reduce (mitigate) | Apply controls to lower likelihood or impact | MFA for account takeover risk |
| Accept | Knowingly keep the risk with an owner | Low impact; control cost exceeds benefit |
| Transfer | Shift financial/operational impact (e.g., insurance, vendor contract) | Residual risk still needs monitoring |
| Avoid | Stop the activity that creates the risk | Do not store data you do not need |

Honest limit: transfer does not delete risk. Insurance and contracts change who pays or responds — they do not make bad auth magically safe.

## Program oversight vs management vs operations (plain map)

| Layer | Job | Example |
| --- | --- | --- |
| Oversight / governance | Sets direction, accountability, and risk appetite | Policy: MFA required for remote admin |
| Program management | Plans and resources the controls | Budget MFA rollout; assign owner; track completion |
| Operations | Runs day-to-day detection and response | Reset sessions on risky login alerts |

Security+ questions often test whether you can tell **who decides**, **who implements**, and **who operates**.

## Policies, standards, procedures, guidelines

| Document type | What it is | Example |
| --- | --- | --- |
| Policy | High-level mandatory rule | “Accounts must use MFA for remote access” |
| Standard | Specific measurable requirement | “Authenticator app or hardware key; SMS discouraged” |
| Procedure | Step-by-step how | “Support verifies identity before recovery” |
| Guideline | Recommended practice | “Prefer phishing-resistant MFA when available” |

If your oversight note only says “follow policy” with no evidence artifact, it is not yet measurable.

## Oversight evidence (not theater)

| Program idea (examples) | What study cares about | Evidence example |
| --- | --- | --- |
| Access reviews | Periodic proof of least privilege | Review export + sign-off date |
| Change control | Changes are authorized and logged | Ticket ID linked to production change |
| Logging / retention | Investigations have history | Retention setting + sample query |
| Training | People know expected behavior | Completion record for role |
| Privacy / data minimization | Collect only what you need | Data inventory note |

You do not need to memorize every control ID for every framework to practice Domain 5 well. You do need to explain **what evidence** would prove a decision later.

## Example risk row (learning platform)

```text
asset=student identity data
risk_statement=weak account recovery could expose personal data
likelihood=medium
impact=high
owner=platform security owner
policy_control=account recovery requires identity verification; MFA required for sensitive recovery actions
oversight_note=retain access review logs and recovery-request tickets for audit window
residual_risk_decision=reduce with MFA and support review workflow; accept residual social-engineering risk with monitoring
```

Optional shell print:

```bash
asset="student identity data"
risk_statement="weak account recovery could expose personal data"
likelihood="medium"
impact="high"
owner="platform security owner"
policy_control="account recovery requires identity verification"
oversight_note="retain access review and recovery logs"
residual_risk_decision="reduce with MFA and support review workflow"

printf '%s\n' \
  "asset=$asset" \
  "risk_statement=$risk_statement" \
  "likelihood=$likelihood" \
  "impact=$impact" \
  "owner=$owner" \
  "policy_control=$policy_control" \
  "oversight_note=$oversight_note" \
  "residual_risk_decision=$residual_risk_decision"
```

## Common beginner mistakes

- Treating compliance as automatic security
- Writing risk statements as tool names (“no SIEM”) instead of business harm
- Leaving owner blank (“the security team”) with no accountable role
- Accepting high impact risk silently with no residual decision recorded
- Confusing likelihood with impact

## Your local task

### Step 1 — Pick an asset you understand

Use a synthetic small-business or learning-platform asset:

```text
Asset: instructor gradebook export files
Risk theme: unauthorized download or sharing of student grades
```

### Step 2 — Write the risk row

Create `risk_row.txt` with all eight fields. The residual decision must be one of: accept, reduce, transfer, avoid (you may combine reduce + accept residual with explanation).

### Step 3 — Evidence check

Name two artifacts that would prove the control later (for example: access review CSV + MFA enrollment report). If you cannot name evidence, rewrite the oversight note.

### Step 4 — One change you can explain

Change impact from high to medium (or reverse) based on a new fact (for example: exports no longer include full identity numbers). Update residual decision so it still matches.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Residual risk | Risk that remains after controls and decisions |
| Risk appetite | How much risk leadership is willing to accept |
| Owner | Accountable person/role for the risk action |
| Policy | Mandatory high-level rule |
| Oversight evidence | Artifacts that prove a control later |
| Treatment | Accept, reduce, transfer, or avoid |
| Security program | Coordinated policies, owners, controls, and review cadence |

## What good looks like

A strong Domain 5 row:

- Names asset, risk, likelihood, and impact without mixing them
- Assigns a real owner role
- States a policy control and concrete evidence
- Records an explicit residual decision someone can challenge or approve

## Proof checklist

- [ ] Course notes folder exists for domain-05
- [ ] `risk_row.txt` includes asset, risk, likelihood, impact, owner, control, evidence, residual decision
- [ ] Likelihood and impact are separate
- [ ] Residual decision is explicit
- [ ] You can explain the row to a non-security stakeholder in plain language

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Risk and program-oversight practice uses synthetic scenarios or systems you are authorized to document. Do not exfiltrate real personal data into study notes. Minimize sensitive details in local files.

When those items are true, you have finished the five SY0-701 domain practice cards. Continue to Exam Mindset & Practice Set for timed local drills that map back to Domains 1–5.

