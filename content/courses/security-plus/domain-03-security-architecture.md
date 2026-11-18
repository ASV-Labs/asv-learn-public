# Domain 3: Security Architecture

## Why this lesson exists

CompTIA Security+ **SY0-701** Domain 3 is **security architecture**: placing controls where failure would matter. A design is stronger when it names **assets**, **trust boundaries**, **layers**, **data protection**, and **availability** before choosing products.

This domain trains design reasoning: map the system, say where trust changes, and explain why each control belongs there — including identity, authorization, and crypto placement as architectural choices (not a shopping list). A good Security+ answer is a short design card that would still make sense if one layer failed.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-security-plus/domain-03
cd ~/asv-learn-security-plus/domain-03
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-security-plus\domain-03"
Set-Location "$HOME\asv-learn-security-plus\domain-03"
```

You will write `design_card.txt` in that folder. Optionally add a short `control_map.txt` when identity/crypto proof needs more detail.

## Start here: boundaries before products

Do not jump to a firewall brand, cloud SKU, or vendor name. First answer:

1. What asset or workflow must stay protected and usable?
2. Where do identity, network, or trust assumptions change?
3. Which preventive, detective, and corrective layers share the job?
4. What data needs protection at rest or in transit?
5. What keeps the service available when something fails?

Say the design in one sentence: *this asset crosses this trust boundary; these layers reduce this risk; this encryption and availability rule keep the service safe and usable.*

## Design card fields

| Field | What to decide | Why it matters |
| --- | --- | --- |
| Asset zone | System, data, or workflow being protected | Controls without an asset are vague |
| Trust boundary | Where access or assumptions change | Re-check identity and policy at the edge |
| Control layers | Preventive, detective, corrective | One failure should not be total compromise |
| Encryption rule | Data at rest / in transit needs | Protects confidentiality and integrity |
| Availability control | How the service stays usable | Security that breaks the service fails the mission |
| Validation note | How you know the design fits the risk | Ties design to a real threat, not fashion |

Layered security does not mean buying every tool. It means a single failure should not become a full compromise.

## Trust boundaries in plain language

| Boundary example | What changes | Typical control question |
| --- | --- | --- |
| Public internet → web app | Untrusted clients reach your service | AuthN, TLS, rate limits, input validation |
| User → admin functions | Privilege level rises | Stronger auth, MFA, privileged access review |
| App → database | Data store is reached | Least-privilege DB accounts, network isolation |
| Corporate LAN → OT / lab VLAN | Network segments have different risk | Segmentation, allow-lists, monitoring |
| SaaS IdP → internal apps | Identity is federated | Conditional access, session controls, audit logs |

If you cannot name where trust changes, you are not ready to place a control.

## Identity and access as architecture (folded from implementation practice)

Architecture places **who** and **what** at the boundary — then proves the safer behavior.

| Concept | Question | Architecture note |
| --- | --- | --- |
| Authentication (AuthN) | Are you who you claim to be? | Prove identity at sensitive boundaries (password + MFA; cert; key) |
| Authorization (AuthZ) | What are you allowed to do? | Least privilege at the action, not “inside the LAN = trusted” |
| Accounting / audit | What did you do? | Log decisions so detective controls have evidence |

Exam trap: a user authenticates successfully but is still denied an admin page — that is authorization working, not “broken login.”

| Pattern | Plain meaning | Placement tip |
| --- | --- | --- |
| MFA | Second factor beyond password | Prefer phishing-resistant factors when available |
| Least privilege | Minimum rights for the job | Prefer role grants over standing admin |
| Just-in-time admin | Elevate only when needed | Time-bound elevation + logging |
| Federation / SSO | Trust identity from an IdP | Conditional access still applies at the app |

Honest limit: MFA reduces credential stuffing and many phishing outcomes; it does not erase session theft, consent phishing, or bad authorization design.

## Cryptography placement (architecture, not math theater)

| Use | What it protects | Proof to name |
| --- | --- | --- |
| TLS in transit | Credentials and session data on the wire | HTTPS required; no mixed plaintext login |
| Encryption at rest | Stored secrets / sensitive files | Disk or field encryption; keys managed |
| Hashing passwords | Stored credentials not recoverable as plaintext | Modern hash + salt (never store plaintext passwords) |
| Signing / integrity | Detect tampering | Signed updates; checksum verification |

Security+ cares that you pick the **right job** for crypto at the right boundary — confidentiality vs integrity vs authentication support.

## Zero trust as a design habit (not a product)

Zero trust, in study terms, means: **never assume** a network location equals trust. Verify identity, device posture, and authorization continuously for sensitive actions:

- Authenticate and authorize at each sensitive boundary
- Prefer least privilege over broad “inside the LAN” access
- Log decisions so detective controls have evidence

Honest claim: zero trust is a **model**. Buying a tool labeled “zero trust” does not automatically mean your boundaries are clear.

## Secure network and cloud ideas you should recognize

| Idea | Plain meaning | Design question |
| --- | --- | --- |
| Segmentation | Separate networks by risk or function | What should never talk to what? |
| DMZ / screened subnet | Public services isolated from internal core | Can a public compromise reach the database? |
| Private subnets | Sensitive services not directly internet-exposed | Who may reach the data plane? |
| Least privilege | Minimum access needed for the job | What happens if this identity is stolen? |
| Defense in depth | Multiple independent controls | Which second control catches a first failure? |

## Example design card (student account portal)

```text
asset_zone=student account portal and session secrets
trust_boundary=public internet to authenticated application
control_layers=preventive: TLS + MFA + rate limit; detective: audit login anomalies; corrective: session revoke + rollback path
encryption_rule=TLS in transit; encrypt session secrets and password hashes at rest (no plaintext passwords)
availability_control=health checks, multi-AZ or backup path, documented rollback
validation_note=maps to credential theft, credential stuffing, and abusive login traffic
```

Optional shell print:

```bash
asset_zone="student account portal and session secrets"
trust_boundary="public internet to authenticated application"
control_layers="TLS, MFA, rate limit, audit logging, session revoke"
encryption_rule="TLS in transit; encrypted session secrets; hashed passwords"
availability_control="health checks with rollback path"
validation_note="controls map to credential theft and web abuse risk"

printf '%s\n' \
  "asset_zone=$asset_zone" \
  "trust_boundary=$trust_boundary" \
  "control_layers=$control_layers" \
  "encryption_rule=$encryption_rule" \
  "availability_control=$availability_control" \
  "validation_note=$validation_note"
```

Optional identity proof snippet (`control_map.txt`):

```text
identity_subject=student user
auth_factor=password plus MFA
authorization_rule=student can read own progress only; cannot edit other students
crypto_use=TLS protects credentials in transit; passwords stored hashed; session secrets encrypted
proof_note=reviewer can verify MFA enrollment, role permissions, TLS required, and no plaintext password storage
```

## Common beginner mistakes

- Starting with vendor names instead of assets and boundaries
- Stacking five preventive tools and ignoring detection/recovery
- Encrypting in transit but leaving secrets in plaintext logs
- Confusing authentication success with authorization
- Claiming “encryption” without saying at rest vs in transit and which data
- Hardening security until the service becomes unusable
- Writing “zero trust” with no boundary or verification step named

## Your local task

### Step 1 — Pick a small system

Use this authorized practice target (synthetic):

```text
System: internal course lab wiki for enrolled students
Users: students (read), instructors (edit), admins (configure)
Risks: account takeover, public exposure of draft labs, downtime during exams
```

### Step 2 — Write the design card

Create `design_card.txt` with the six fields from the table above. Keep language plain. No vendor shopping list required. If helpful, add `control_map.txt` for AuthN/AuthZ/crypto proof.

### Step 3 — Failure test

Assume **one** control fails (for example MFA bypass via stolen session, or TLS terminator misconfig). Write one sentence: which other layer still reduces harm?

### Step 4 — One change you can explain

Move one control to a different boundary (for example: admin MFA only at admin functions, not just at login). Explain why the new placement better matches the risk.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Trust boundary | Point where identity, network, or assumptions change |
| Defense in depth | Multiple layers so one failure is not total compromise |
| Segmentation | Separating systems by risk or function |
| Authentication | Proving identity |
| Authorization | Limiting allowed actions |
| Encryption at rest / in transit | Protecting stored data vs data moving on the wire |
| Availability control | Keeping authorized use possible during failure |
| Validation note | Evidence that the design matches a named risk |

## What good looks like

A strong Domain 3 card:

- Names the asset and at least one trust boundary
- Includes preventive, detective, and recovery thinking
- States an encryption and availability rule
- Separates AuthN from AuthZ when identity is in scope
- Explains why the design fits credential theft, abuse, or exposure — not “security in general”

## Proof checklist

- [ ] Course notes folder exists for domain-03
- [ ] `design_card.txt` includes asset, boundary, layers, encryption, availability, validation
- [ ] You can name what happens if one layer fails
- [ ] No required vendor names — placement reasoning is clear
- [ ] You can explain the card in under two minutes

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Design practice uses synthetic systems or systems you own/administer with permission. Do not scan or reconfigure production networks without authorization and change control.

When those items are true, continue to **Domain 4: Security Operations**.

