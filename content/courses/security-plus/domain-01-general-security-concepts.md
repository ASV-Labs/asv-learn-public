# Domain 1: General Security Concepts

## Why this lesson exists

CompTIA Security+ **SY0-701** Domain 1 is about **general security concepts**: shared vocabulary, CIA thinking, control types, and the risk chain that keeps answers coherent. Security+ starts with language that helps you **reason**, not with a list of scary product names.

When something goes wrong — a fake login page, a reused password, a phishing link — a useful analysis names the actor, the path they used, the weakness they depended on, the impact, and the control that reduces the risk. This domain trains that habit as a **concepts** foundation. Domain 2 deepens threats, vulnerabilities, and mitigations; here you first learn to keep cause, path, weakness, impact, and response separate.

You will classify synthetic lab scenarios into a clear **risk chain** so your answers stay practical on exam questions and in real handoffs. You are not choosing vendors yet.

## Reminder: where you work

Create a course notes folder on your machine (or authorized lab host):

```bash
mkdir -p ~/asv-learn-security-plus/domain-01
cd ~/asv-learn-security-plus/domain-01
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-security-plus\domain-01"
Set-Location "$HOME\asv-learn-security-plus\domain-01"
```

You will write `risk_chain.txt` (or a short shell script that prints the same fields) in that folder.

## Start here: concepts before products

Do not try to memorize every attack name on day one. Read a security situation as a chain of concepts:

1. Who or what can cause harm? (**threat actor**)
2. How does the attempt reach the target? (**attack vector**)
3. What weakness makes success easier? (**vulnerability**)
4. What could go wrong? (**impact**)
5. What reduces likelihood or damage? (**control**)

Say the chain in one sentence before naming a product: *this actor used this path against this weakness, risking this impact; this control reduces that weakness.*

## The security chain fields

| Field | Question | Example |
| --- | --- | --- |
| Threat actor | Who or what can cause harm? | Phishing sender (external criminal) |
| Attack vector | How does the attempt reach the target? | Email link to fake login page |
| Vulnerability | What weakness makes success possible? | Reused password without MFA |
| Impact | What could happen if it succeeds? | Account takeover; data exposure |
| Control | What reduces likelihood or impact? | MFA plus user reporting workflow |

The point is not to memorize labels. The point is to avoid mixing cause, path, weakness, and response.

## CIA triad (foundational concepts)

Security+ expects you to connect decisions to purpose.

| Pillar | Question | Example |
| --- | --- | --- |
| Confidentiality | Who may see the data? | Encryption, access control |
| Integrity | Who may change it, and how do we detect change? | Hashing, signed updates, audit logs |
| Availability | Can authorized users still use the service? | Redundancy, backups, health checks |

A control that “locks everything down” until nobody can work fails availability. A control that preserves uptime while leaking credentials fails confidentiality.

## Control types by function

| Function | Job | Example |
| --- | --- | --- |
| Preventive | Stops or blocks | MFA, network allow-list |
| Detective | Notices | SIEM alert, file integrity monitoring |
| Corrective / recovery | Restores or remediates | Patch, revoke session, restore from backup |
| Deterrent / directive (study awareness) | Discourage or require behavior | Warning banners; mandatory MFA policy |

A design that only prevents (and never detects) fails quietly. A design that only detects (and never recovers) fails loudly. Domain 3 places these on trust boundaries; Domain 1 only asks you to **name the job** each control is doing.

## Scenario reading (synthetic lab)

A user reports an email that links to a fake login page. The account uses a reused password and no second factor. The first useful response is not a tool. It is a clear classification of the risk chain.

```text
threat_actor=phishing sender (external)
attack_vector=email link to fake login page
vulnerability=password reused without MFA
impact=account takeover; possible mailbox and file access
control=require MFA; reset session; teach report-phish workflow
```

Optional shell print of the same fields:

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

- Listing products (“buy a firewall”) instead of naming the weakness the control addresses
- Calling the attack vector the vulnerability
- Writing dramatic impact (“everything is compromised”) without evidence
- Mixing CIA pillars (calling downtime a confidentiality failure)
- Skipping the control that actually reduces the named weakness
- Expecting an automatic grading inside the lesson instead of writing a local `risk_chain.txt`

## Your local task

### Step 1 — Capture a synthetic scenario

Use this authorized practice scenario (lab data only):

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

Read the row as if you are the next analyst. Ask:

- Can I see actor, vector, vulnerability, impact, and control without guessing?
- Does the control reduce the **named** weakness?
- Are assumptions labeled?
- Which CIA pillars does the control primarily support?

### Step 4 — One change you can explain

Change **one** field (for example: MFA was already on, or the user confirms they entered a password). Rewrite impact and control so they still match the evidence. Say out loud why that change is justified.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Threat actor | Who or what can cause harm |
| Attack vector | Path used to reach the target |
| Vulnerability | Weakness that makes success easier |
| Impact | Harm that could result |
| Control | Action that reduces likelihood or damage |
| CIA triad | Confidentiality, integrity, availability |
| Residual uncertainty | What you still cannot claim |

## What good looks like

A strong Domain 1 note:

- Names actor, vector, vulnerability, impact, and control in plain language
- Keeps the control tied to the weakness (not a generic “be secure”)
- Can say whether the control mainly protects C, I, and/or A
- Separates evidence from assumptions
- Could be handed to another learner without drama or product shopping

## Proof checklist

- [ ] Course notes folder exists for domain-01
- [ ] `risk_chain.txt` (or equivalent) includes actor, vector, vulnerability, impact, control
- [ ] Control clearly reduces the named vulnerability
- [ ] Assumptions are labeled, not hidden
- [ ] You can explain the chain in under one minute

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Use only synthetic data, your own accounts/lab, or systems you are explicitly authorized to analyze. Do not probe, phish, or collect credentials from real systems without written permission.

When those items are true, continue to **Domain 2: Threats, Vulnerabilities, and Mitigations**.

