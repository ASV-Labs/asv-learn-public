# Exam Mindset & Practice Set

## Why this lesson exists

Domains 1–5 trained you to **reason in SY0-701 security language**: apply general security concepts, classify threats/vulnerabilities/mitigations, place controls in security architecture, run security operations (including IR order), and record a program-management / oversight decision. Exam-style questions still use that language — they hide the domain label and add distractors.

This chapter is a **local study practice set**, not a CompTIA exam dump and not official CompTIA content. ASV Labs Learn does not host a graded exam sandbox. You run timed drills from original scenarios, map each item to Domains 1–5, and keep honest notes. The goal is exam **mindset**: eliminate wrong answers with domain logic, not memorized dump strings.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-security-plus/exam-practice
cd ~/asv-learn-security-plus/exam-practice
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-security-plus\exam-practice"
Set-Location "$HOME\asv-learn-security-plus\exam-practice"
```

Write `drill_log.txt` and optional `missed_topics.txt` here. Synthetic scenarios only — no unauthorized systems, no pirated exam materials.

## Exam mindset: eliminate before you commit

1. **Underline the ask** — best control, first action, residual decision, evidence?
2. **Name the domain** — concepts, threats/vulns/mitigations, architecture, operations, or program oversight?
3. **Eliminate distractors** — wrong phase, wrong CIA pillar, tool name without behavior, compliance theater.
4. **Pick what matches the ask**, not what sounds most “secure” in general.
5. **Log one sentence of proof** — why the losers fail *this* stem.

Say it once: *this question is about X; option A fails because Y; option B survives because Z.*

| Distractor pattern | How to kill it |
| --- | --- |
| Wrong phase (“restore” when ask is contain) | Match the step to the verb in the stem |
| Wrong layer (buy SIEM for password reuse) | Prefer the control that hits the named weakness |
| Vendor / absolute theater | Prefer scoped, testable behavior over brands and “always” |

## Map the question to Domains 1–5 (SY0-701)

| If the stem mainly asks… | Domain | Prior artifact |
| --- | --- | --- |
| CIA, control types, risk-chain vocabulary as concepts | 1 General Security Concepts | `risk_chain.txt` |
| Actor, vector, vulnerability, impact, mitigation | 2 Threats, Vulnerabilities, and Mitigations | `risk_chain.txt` |
| Trust boundary, defense in depth, AuthN/AuthZ placement, crypto at boundaries | 3 Security Architecture | `design_card.txt` (+ optional `control_map.txt`) |
| Detect → contain → evidence → recover → learn; ops health | 4 Security Operations | `response_note.txt` |
| Likelihood vs impact, owner, residual, oversight evidence | 5 Security Program Management and Oversight | `risk_row.txt` |

Mixed stems are normal. Pick the **primary** domain for the ask; note overlap as `D4+D2` if needed.

## Practice set workflow (local only)

### Step 1 — Timer and scope

```text
set_date=
set_size=8
time_budget_minutes=20
focus_domains=1,3,4
```

### Step 2 — Log every item

Append to `drill_log.txt`:

```text
item_id=
domain_guess=
answer_choice=
why_others_fail=
```

Do not skip `why_others_fail` — that field is where exam skill grows.

### Step 3 — Score and triage

Mark correct/incorrect without rewriting history. For each miss, one line in `missed_topics.txt` (concept + domain + confusion), then rebuild one field from the matching domain artifact.

### Step 4 — Honest limits

No leaked dumps. No claim that ASV Labs Learn items are official CompTIA questions. No practice against systems you lack written authorization to use.

## Sample scenario drills (Domains 1–5)

Answer first, then read the teaching point.

**Drill A (D1).** A stem asks which CIA pillar MFA primarily supports for account takeover risk. What is the cleanest answer?  
→ Confidentiality (and often integrity of sessions) — name the pillar before inventing tools.

**Drill B (D2).** Email link to a lookalike grade portal; password reused; no MFA. What is the **vulnerability**?  
→ Credential reuse without MFA (link = vector; takeover = impact).

**Drill C (D3).** Public form posts to an internal API that “trusts the campus network.” Where is the key **trust boundary**?  
→ Where internet meets the API — authenticate/authorize there, plus monitoring; not “a firewall somewhere.”

**Drill D (D4).** Failed admin logins from a new country, then one success. What comes **before** wipe/restore?  
→ Contain and preserve evidence (session kill, reset, hold logs).

**Drill E (D5).** Keep SMS MFA? SIM-swap likelihood medium; grade-integrity impact high. Treatment language?  
→ Reduce (stronger MFA); owner + evidence + residual — not “compliant” alone.

## Original practice-style questions (study set)

Pedagogical originals for ASV Labs Learn — **not** CompTIA exam content.

**Q1.** Phishing email → fake login. Reuse without MFA is the weakness. Which field is the **attack vector**?  
A. Email link path · B. Password reuse without MFA · C. Account takeover · D. MFA enrollment

**Q2.** Why place encryption and access checks at a **trust boundary** between a public form and an internal grade API?  
A. Who can call the API changes there · B. Encryption only for marketing pages · C. Boundaries replace backups · D. Public forms never need AuthZ

**Q3.** User proves identity with MFA, then is denied an admin export. What succeeded / what limited the action?  
A. AuthN succeeded; AuthZ limited · B. AuthZ succeeded; AuthN failed · C. Encryption failed · D. Recovery replaced AuthN/AuthZ

**Q4.** Suspected account takeover — best **containment** before full recovery?  
A. Revoke sessions + password reset · B. Delete all logs · C. Restore from backup with no evidence hold · D. Accept residual risk with no owner

**Q5.** Likelihood “possible,” impact “high,” residual “reduce with stronger MFA.” What else for program-oversight quality?  
A. Accountable owner + checkable evidence · B. Product brand only · C. “Compliance = security” · D. Blank residual

**Q6.** Stem asks for the *first* IR step after malware on one authorized lab VM. Best first elimination?  
A. Discard org-wide recovery before containment · B. Longest acronym list · C. Prefer dump wording · D. Skip evidence because VM is disposable

**Q7.** Design card lists five vendors but no trust boundaries or failure modes. Missing?  
A. Layered placement tied to named risks and one-control failure · B. More logos · C. Availability irrelevant · D. Remove authentication

**Q8.** Which habit matches this chapter’s local workflow?  
A. Timed drills in `~/asv-learn-security-plus/exam-practice` with domain map + miss triage · B. Hosted CompTIA sandbox in ASV Learn · C. Memorize leaked exam strings · D. Skip Domains 1–5

**Keys (after you attempt):** Q1 A · Q2 A · Q3 A · Q4 A · Q5 A · Q6 A · Q7 A · Q8 A

## Common traps

| Trap | Better habit |
| --- | --- |
| Memorizing dump wording | Map stems to domain artifacts |
| “Most secure sounding” | Underline the verb: first, best, residual |
| Skipping miss logs | Write `missed_topics.txt` the same day |
| Mixing likelihood and impact | Keep Domain 5 fields separate |
| Tools as answers | Name safer behavior + proof |

## Your local task

1. Confirm `~/asv-learn-security-plus/exam-practice` exists.  
2. Run the eight-item set (~20 minutes); fill `drill_log.txt`.  
3. Triage misses into `missed_topics.txt` and rebuild one Domain 1–5 field.  
4. Write a five-line mixed scenario touching Domains 2, 3, and 4; map each line before inventing any multi-choice rewrite.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Distractor | Plausible wrong option that fails the ask |
| Domain map | Linking a stem to Domains 1–5 (SY0-701) |
| Elimination | Removing options that violate phase, CIA, or scope |
| Drill log | Local record of answer + why losers fail |
| Miss triage | Converting misses into targeted domain review |

## What good looks like

Timer + fixed set size; primary domain before commit; wrong options explained; misses reworked into Domains 1–5 artifacts; local, synthetic, dump-free.

## Proof checklist

- [ ] Folder `~/asv-learn-security-plus/exam-practice` exists
- [ ] `drill_log.txt` has domain guess, answer, and why others fail for a full set
- [ ] `missed_topics.txt` exists (or notes “0 misses” with date)
- [ ] At least one miss/weak guess reworked with a Domain 1–5 artifact
- [ ] You can say plainly: ASV Labs Learn study practice, not official CompTIA exam content

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Questions and drills here are original teaching material for ASV Labs Learn — not affiliated with, endorsed by, or copied from CompTIA exam forms. No pirated dumps. No attacks outside written authorization.

When the proof checklist is true, you have closed the Security+ (SY0-701) path with an exam-mindset loop on top of Domains 1–5.

