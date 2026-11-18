# Digital Forensics and Malware Analysis

## Why this lesson exists

Forensics asks **what happened**. Malware analysis asks **how suspicious code behaves**. SOC analysts need enough structure to preserve evidence and ask the right analysis question—without turning an unknown sample into a new risk.

In this lesson you will write a forensic note: evidence ID, acquisition method, chain of custody, hash, analysis question, and handling rule.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-soc-blue-team/stage-05
cd ~/asv-learn-soc-blue-team/stage-05
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-soc-blue-team\stage-05"
Set-Location "$HOME\asv-learn-soc-blue-team\stage-05"
```

You will create `forensic_note.txt` in that folder. If your lab provides a safe sample copy, keep it isolated. Success here is a complete handling note—not malware detonation.

## Start here: evidence handling before analysis

Do not analyze evidence before you can trust where it came from. First name:

1. Evidence ID
2. Acquisition method
3. Chain of custody
4. Hash value
5. Analysis question
6. Handling rule

Interesting behavior is not useful if the artifact cannot be trusted or the handling rule creates new risk.

## Evidence handling fields

| Field | Purpose | Why SOC cares |
| --- | --- | --- |
| Evidence ID | Makes the artifact traceable | Tickets and vaults stay aligned |
| Acquisition method | Explains how it was collected | Reviewers can judge reliability |
| Chain of custody | Names who handled it | Gaps weaken conclusions |
| Hash value | Supports integrity checks | Detects accidental change |
| Analysis question | Keeps work focused | Avoids endless curiosity detours |
| Handling rule | Protects evidence and people | Prevents unsafe execution |

Say the note in one sentence: evidence id, acquisition method, custody, hash, analysis question, and handling rule.

## Integrity in plain language

A hash is a fingerprint of the bytes you have. If the fingerprint changes, the file changed (or you hashed the wrong object).

| Practice | Good habit |
| --- | --- |
| Before analysis | Record hash of the working copy |
| After transfer | Re-hash and compare |
| During analysis | Work on a copy, not the vault original |
| In the ticket | Store algorithm + value (e.g. SHA-256) |

A hash does **not** prove a file is malicious. It only helps prove you still have the same bytes.

## Analysis questions that stay useful

Good questions are narrow:

- Which process made outbound connections after the suspicious login?
- Does the sample drop persistence under an authorized lab analysis path?
- What network destinations appear in the memory capture?

Weak questions are vague:

- “Is this APT?”
- “Hack everything about this file”
- “Prove the user is guilty”

## Handling rules (non-negotiable for this course)

| Rule | Why |
| --- | --- |
| Analyze a copy only | Protects the original |
| Do not execute unknown samples on a daily workstation | Avoids turning your laptop into a patient |
| Use an authorized isolated lab if dynamic analysis is needed | Keeps risk inside a controlled boundary |
| Record who touched the evidence | Custody stays honest |
| Stop if authorization is unclear | Legal and safety first |

## Common beginner mistakes

- Opening or running the sample “just to see”
- Forgetting to hash before and after transfer
- Writing conclusions without an evidence ID
- Mixing personal Downloads with evidence vault paths
- Claiming malware family from a filename alone

## Your local task

### Step 1 — Practice evidence item

Authorized practice artifact description (synthetic):

```text
Evidence: memory capture labeled for host alex-laptop after suspicious login
Acquisition: approved EDR memory capture in lab
Handlers: SOC analyst → evidence vault
Need: forensic note before any deep analysis claims
```

### Step 2 — Write the forensic note

Create `forensic_note.txt`:

```text
evidence_id=host-alex-memory-001
acquisition_method=approved EDR memory capture
chain_of_custody=collected by SOC analyst and stored in evidence vault
hash_value=sha256 recorded before analysis
analysis_question=identify suspicious process and network destination
handling_rule=analyze copy only; do not execute unknown sample on workstation
```

Optional shell print:

```bash
evidence_id="host-alex-memory-001"
acquisition_method="approved EDR memory capture"
chain_of_custody="collected by SOC analyst and stored in evidence vault"
hash_value="sha256 recorded before analysis"
analysis_question="identify suspicious process and network destination"
handling_rule="analyze copy only and do not execute unknown sample on workstation"

printf '%s\n' \
  "$evidence_id" \
  "$acquisition_method" \
  "$chain_of_custody" \
  "$hash_value" \
  "$analysis_question" \
  "$handling_rule"
```

### Step 3 — Optional hash practice (safe file)

Hash a harmless lab file you create yourself (not malware):

```bash
printf 'lab-note\n' > sample_lab_note.txt
shasum -a 256 sample_lab_note.txt
```

Record the output in `forensic_note.txt` under `practice_hash=` so you prove you can capture a digest.

### Step 4 — Self-review

If custody or hash were blank, would you trust a later “malware” claim? If not, fix the note.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Chain of custody | Documented handling history for evidence |
| Hash | Digitized fingerprint used for integrity checks |
| Acquisition | How evidence was collected |
| Static analysis | Inspecting without running code |
| Dynamic analysis | Observing behavior when run in a controlled lab |

## What good looks like

A strong Stage 5 note:

- Has an evidence ID, acquisition method, and custody trail before analysis claims
- Records a hash and understands hash ≠ malice
- Asks one specific analysis question
- States a handling rule that forbids unsafe execution on a daily workstation

## Proof checklist

- [ ] `forensic_note.txt` has ID, acquisition, custody, hash, question, handling rule
- [ ] Analysis question is specific
- [ ] Handling rule forbids unsafe execution on a daily workstation
- [ ] You understand hash ≠ malice
- [ ] Optional practice hash of a harmless file is recorded

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do **not** execute unknown samples on your daily workstation.

Do not download or run real malware for this course unless you are in a formally authorized, isolated lab with explicit permission. Documentation discipline is the win here.

When those items are true, continue to **Threat Hunting and Advanced Detection**.
