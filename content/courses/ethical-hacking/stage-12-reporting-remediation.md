# Reporting & Remediation

## Why this lesson exists

A professional report is useful because it gives evidence, impact, remediation, verification, and ownership without drama. Fancy formatting cannot rescue a finding that a defender cannot reproduce or fix.

In this lesson you will write a **finding row** and a short executive-style summary paragraph from your earlier lab notes. The audience is a defender or lab owner who needs to act.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-12
cd ~/asv-learn-ethical-hacking/stage-12
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-12"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-12"
```

Pull evidence from earlier stage folders. If a prior artifact is missing, mark the gap instead of inventing proof.

## Start here: defender action before report polish

A finding is ready to write when you can answer:

1. What is the issue in one plain title?
2. What evidence proves it?
3. Why does it matter (impact)?
4. What should change (remediation)?
5. How will someone verify the fix?
6. Who owns the fix?

If evidence is weak, say so. Uncertainty belongs in the report, not in marketing language.

## Report structure that scales

Even a one-finding lab report benefits from structure:

| Section | Job |
| --- | --- |
| Scope summary | What was authorized and tested |
| Executive summary | Business-readable risk story |
| Findings | Technical detail with evidence |
| Remediation roadmap | Immediate / short-term / longer-term |
| Appendix | Raw evidence index |

Executives need clarity and priority. Engineers need reproduction steps. Your finding row must serve both without becoming either a novel or a tool dump.

## Finding row fields

| Field | Purpose |
| --- | --- |
| Finding title | Concise issue name |
| Evidence summary | Proof a reviewer can inspect |
| Impact summary | Why the issue matters |
| Remediation step | What should be changed |
| Verification step | How the fix will be checked |

Example:

```text
finding_title=Open admin panel on lab host
evidence_summary=authenticated lab scan showed admin route reachable without admin role
impact_summary=could expose privileged functions if access controls fail
remediation_step=restrict route and require admin authorization
verification_step=retest route access after control change
```

## Severity without theater

| Severity | Use when | Avoid when |
| --- | --- | --- |
| Critical | Direct, reliable, high-impact abuse path evidenced | You are excited |
| High | Serious impact with credible path | Impact is speculative |
| Medium | Real issue with constraints | You need filler findings |
| Low / Informational | Hardening debt, missing headers, minor hygiene | You want the report to look bigger |

CVSS can help communicate, but a wrong vector string is worse than a plain-language severity with honest uncertainty.

## Remediation quality bar

Good recommendations are:

- Specific to the evidenced issue
- Actionable by a named role
- Ordered by urgency when multiple fixes exist
- Paired with verification steps
- Free of vague advice like “be more secure”

Example roadmap language:

```text
Immediate (0-7 days): restrict admin route; rotate any exposed lab credentials
Short-term (7-30 days): add regression test for access control
Longer-term (30-90 days): centralize authz checks and monitoring alerts
```

## Common beginner mistakes

- Leading with tool names instead of issues
- Dramatic titles with weak evidence
- Remediation that says “patch” with no owner or verification
- Mixing scope problems into vulnerability severity
- Hiding uncertainty
- Delivering raw scanner exports as the report

## Your local task

### Step 1 — Choose one evidenced issue

Prefer something from your web, scan, crypto, cloud, or validation notes. If needed, write a clearly labeled sample finding for the lab story.

### Step 2 — Write `finding_row.txt`

Create the file with these fields (edit for your lab evidence):

```text
finding_title=Open admin panel on lab host
evidence_summary=authenticated lab scan showed admin route reachable without admin role
impact_summary=could expose privileged functions if access controls fail
remediation_step=restrict route and require admin authorization
verification_step=retest route access after control change
owner=lab owner / course reviewer
severity=medium
```

Optional shell print of the same fields:

```bash
finding_title="Open admin panel on lab host"
evidence_summary="authenticated lab scan showed admin route reachable"
impact_summary="could expose privileged functions if access controls fail"
remediation_step="restrict route and require admin authorization"
verification_step="retest route access after control change"

printf '%s\n' \
  "title=$finding_title" \
  "evidence=$evidence_summary" \
  "impact=$impact_summary" \
  "remediation=$remediation_step" \
  "verification=$verification_step"
```

### Step 3 — Write a five-sentence executive summary

Create `executive_summary.txt` covering:

1. What was authorized and tested
2. Overall risk in plain language
3. The key finding
4. The top remediation
5. How verification will confirm the fix

### Step 4 — Self-review

Ask:

- Can an engineer reproduce this tomorrow?
- Can a non-engineer understand why it matters?
- Is ownership explicit (name or role)?
- Does severity match evidence strength?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Finding | Evidenced issue with impact and fix path |
| Executive summary | Short plain-language risk narrative |
| Remediation | Concrete change that reduces risk |
| Verification | Retest method that proves the fix worked |
| Evidence index | Pointers to supporting artifacts |

## Proof checklist

- [ ] `finding_row.txt` includes title, evidence, impact, remediation, verification
- [ ] `executive_summary.txt` is five sentences or fewer and readable
- [ ] Severity language matches evidence strength
- [ ] Owner or owning role is named somewhere in the notes
- [ ] No invented proof for work you did not do

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Report only on systems you were authorized to test. Do not publish lab findings as if they were disclosures about unrelated real organizations.

When those items are true, continue to **Metasploit Framework in the Lab**.
