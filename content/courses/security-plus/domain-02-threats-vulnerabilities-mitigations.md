# Domain 2: Threats, Vulnerabilities, and Mitigations

## Why this lesson exists

CompTIA Security+ **SY0-701** Domain 2 focuses on **threats, vulnerabilities, and mitigations**. Domain 1 gave you the risk-chain vocabulary. Here you practice classifying actor types, attack paths, weakness categories, and the controls that actually reduce those weaknesses.

You will reuse the same synthetic-lab habit: write a clear classification so your answers stay practical on exam questions and in real handoffs. You are still not choosing vendors by brand — you are connecting threat language to a mitigation that fits.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-security-plus/domain-02
cd ~/asv-learn-security-plus/domain-02
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-security-plus\domain-02"
Set-Location "$HOME\asv-learn-security-plus\domain-02"
```

You will write `risk_chain.txt` (threat → vulnerability → mitigation focus) in that folder.

## Start here: classify before you mitigate

Keep the Domain 1 chain, then emphasize mitigation fit:

1. Who or what can cause harm? (**threat actor**)
2. How does the attempt reach the target? (**attack vector**)
3. What weakness makes success easier? (**vulnerability**)
4. What could go wrong? (**impact**)
5. What reduces likelihood or damage? (**mitigation / control**)

Say it once: *this actor used this path against this weakness; this mitigation reduces that weakness.*

## Threat actors and motives (practical view)

| Actor type | Typical motive | How it changes your analysis |
| --- | --- | --- |
| External criminal | Money, credentials, ransomware | Expect commodity phishing, credential stuffing, malware |
| Insider (malicious) | Revenge, data theft | Privileged access may already exist; logging and least privilege matter |
| Insider (unintentional) | Mistake, convenience | Training, safer defaults, and clear workflows reduce risk |
| Nation-state / APT | Espionage, disruption | Longer campaigns; detection and resilience matter as much as prevention |
| Hacktivist | Visibility, protest | Targets may be public-facing brands or services |

Honest limit: naming an actor type is a **working hypothesis**, not courtroom proof. Keep evidence and assumptions separate in your notes.

## Vectors, vulnerabilities, and common mix-ups

| Concept | What it is | Common mix-up |
| --- | --- | --- |
| Attack vector | The **path** (email, USB, exposed port, supply chain) | Calling the vector the “vulnerability” |
| Vulnerability | The **weakness** (missing patch, weak auth, misconfig) | Calling the phishing email itself the vulnerability |
| Exploit | The method that uses the weakness | Treating every exploit name as a different root cause |
| Threat | Potential for harm from an actor/capability | Treating “threat” as a synonym for malware only |
| Mitigation | Control that reduces likelihood or impact | Naming a product without tying it to the weakness |

Concrete example:

- Vector: email link
- Vulnerability: no MFA + password reuse
- Impact: account takeover
- Mitigation: enforce MFA, block known bad URLs, teach reporting

If you only say “phishing,” you have named a family of attacks — not a complete analysis.

## Vulnerability categories you should recognize

| Category | Plain meaning | Example signal |
| --- | --- | --- |
| Unpatched software | Known fix exists but is not applied | CVE present; outdated agent |
| Misconfiguration | Safe option exists but is wrong | Open share; default admin left enabled |
| Weak identity | Auth is guessable, reusable, or single-factor | Credential stuffing success |
| Insecure design | Product/process lacks a needed control | Password reset with no identity check |
| Zero-day | Weakness without a public patch yet | Unusual exploit; vendor advisory pending |

Security+ cares that you can **classify and mitigate**, not that you invent exploit code. Response still means authorized environments only.

## Mitigations that match the weakness

| Weakness theme | Mitigation direction | Honest limit |
| --- | --- | --- |
| Password reuse / no MFA | Require MFA; reset sessions; block bad URLs | MFA does not erase session theft alone |
| Missing patch | Patch cadence + verification | Patching needs change control in production |
| Misconfig / open share | Harden defaults; least privilege | Config drift returns without review |
| Weak recovery process | Identity-proofed recovery | Support workflows can be social-engineered |
| No detection | Logging + alert ownership | Alerts without owners are noise |

Prefer the mitigation that hits the **named** vulnerability over a generic “buy more tools.”

## Scenario reading (synthetic lab)

```text
threat_actor=phishing sender (external)
attack_vector=email link to fake login page
vulnerability=password reused without MFA
impact=account takeover; possible mailbox and file access
control=require MFA; reset session; teach report-phish workflow
```

Optional shell print:

```bash
threat_actor="phishing sender (external)"
attack_vector="email link to fake login page"
vulnerability="password reused without MFA"
impact="account takeover; possible mailbox and file access"
control="require MFA; reset session; teach report-phish workflow"

printf '%s\n' \
  "threat_actor=$threat_actor" \
  "attack_vector=$attack_vector" \
  "vulnerability=$vulnerability" \
  "impact=$impact" \
  "control=$control"
```

## Common beginner mistakes

- Listing products instead of naming the weakness the mitigation addresses
- Calling the attack vector the vulnerability
- Treating every email as APT-level threat
- Writing dramatic impact without evidence
- Skipping the mitigation that reduces the named weakness

## Your local task

### Step 1 — Capture a synthetic scenario

```text
Alert: user clicked a link in an unexpected password-reset email
Account: student portal login
Observed: reused password; MFA not enrolled
Missing: whether credentials were entered on the fake page
```

### Step 2 — Write the classification row

Create `risk_chain.txt`:

```text
threat_actor=external phishing sender
attack_vector=email link (fake password-reset page)
vulnerability=reused password; MFA not enrolled
impact=account takeover if credentials were submitted
control=force password reset; require MFA enrollment; block/report sender; review recent sessions
evidence_note=user reported unexpected reset email; MFA status confirmed off
assumption=credential entry on fake page is unconfirmed
```

### Step 3 — Self-review

- Can I see actor, vector, vulnerability, impact, and mitigation without guessing?
- Does the mitigation reduce the **named** weakness?
- Are assumptions labeled?

### Step 4 — One change you can explain

Change **one** field (for example: MFA was already on, or the user confirms they entered a password). Rewrite impact and mitigation so they still match the evidence.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Threat actor | Who or what can cause harm |
| Attack vector | Path used to reach the target |
| Vulnerability | Weakness that makes success easier |
| Impact | Harm that could result |
| Mitigation | Control that reduces likelihood or damage |
| Residual uncertainty | What you still cannot claim |

## What good looks like

A strong Domain 2 note:

- Names actor, vector, vulnerability, impact, and mitigation in plain language
- Keeps the mitigation tied to the weakness
- Separates evidence from assumptions
- Could be handed to another learner without drama or product shopping

## Proof checklist

- [ ] Course notes folder exists for domain-02
- [ ] `risk_chain.txt` includes actor, vector, vulnerability, impact, mitigation/control
- [ ] Mitigation clearly reduces the named vulnerability
- [ ] Assumptions are labeled, not hidden
- [ ] You can explain the chain in under one minute

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Use only synthetic data, your own accounts/lab, or systems you are explicitly authorized to analyze. Do not probe, phish, or collect credentials from real systems without written permission.

When those items are true, continue to **Domain 3: Security Architecture**.

