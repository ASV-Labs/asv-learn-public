# Information Gathering Tools

## Why this lesson exists

Information gathering is not a tool list. It is a plan for collecting evidence while separating **passive observation** from **active target contact**.

In this lesson you will write a recon log entry that names source, authorized target, evidence, confidence, and the next action that stays inside scope.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-kali-linux/stage-02
cd ~/asv-learn-kali-linux/stage-02
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-02"
Set-Location "$HOME\asv-learn-kali-linux\stage-02"
```

You will write `recon_log.txt` in that folder. Keep any active checks limited to the authorized lab target named in Stage 01.

## Start here: evidence before contact

Do not treat a discovered clue as permission to touch a system. First answer:

1. Where did the clue come from (passive source)?
2. What authorized target may be checked actively?
3. What does the evidence actually prove?
4. How confident should you be?
5. What next action stays inside scope?

Good reconnaissance keeps the line visible between what was observed and what may be contacted.

## Passive versus active

| Mode | What it means | Example (lab only) | Scope note |
| --- | --- | --- | --- |
| Passive | No direct contact with the target | Reading public docs you already control, lab DNS notes, prior engagement records | Still respect privacy and legality |
| Active | Sends traffic or queries to the target | Authorized `nmap` against `lab.local` | Requires explicit authorization |

A useful clue is not automatically permission to scan, browse, or test. The next action must be tied to the approved lab target and the evidence already collected.

## Recon evidence model

| Field | Why it matters | Honest limit |
| --- | --- | --- |
| Passive source | Shows where the clue came from | Source quality varies |
| Active target | Keeps follow-up inside authorization | Must match the written scope |
| Evidence note | Records what the source actually proves | Do not exaggerate |
| Confidence | Prevents weak clues from becoming claims | Medium is often honest |
| Next action | Connects evidence to an allowed step | Action must stay in scope |

First say the recon boundary in one sentence: *this clue came from a named source, applies to a named authorized target, and only supports the next scoped action.*

## Tool mindset (not a shopping list)

Common Kali recon families include DNS helpers, web discovery utilities, and OSINT-style collectors. Names change; the professional habit does not:

1. Name the question before the tool.
2. Prefer passive notes when they answer the question.
3. Escalate to active checks only against the authorized target.
4. Log confidence and next action before chasing more noise.

If a tool returns dozens of hostnames, your job is not to chase all of them. Your job is to keep the log tied to `lab.local` (or your written label) and discard out-of-scope noise.

## Confidence language

| Level | When to use it | What to avoid |
| --- | --- | --- |
| Low | Single weak clue, unverified | “Confirmed host” |
| Medium | Two consistent clues, still unverified | Claiming vulnerability |
| High | Verified against the authorized target with repeatable evidence | Skipping the verification step |

## Common beginner mistakes

- Treating discovery as permission
- Running active checks against anything “interesting”
- Logging tool names instead of what was proven
- Setting confidence to high because the output looked cool
- Skipping the next-action field so the log becomes a dead pile of text
- Assuming ASV Learn will auto-grade your recon log

## Your local task

### Step 1 — Capture a sample clue

Use this authorized practice scenario (synthetic lab data):

```text
Passive source: lab DNS notes and internal engagement brief
Clue: lab.local is the approved training target for web service discovery
Active target allowed: lab.local only
Not allowed: neighbor hosts, public internet targets, unrelated SSIDs
```

### Step 2 — Write the recon log

Create `recon_log.txt`:

```text
passive_source=lab DNS notes and engagement brief
active_target=lab.local
evidence_note=records name lab.local as the approved training target for discovery
confidence=medium
next_authorized_action=run active checks only against lab.local on the isolated lab network
out_of_scope=any host not labeled lab.local
```

Optional shell print:

```bash
passive_source="lab DNS notes and engagement brief"
active_target="lab.local"
evidence_note="records name lab.local as the approved training target for discovery"
confidence="medium"
next_authorized_action="run active checks only against lab.local on the isolated lab network"

printf '%s\n' \
  "passive_source=$passive_source" \
  "active_target=$active_target" \
  "evidence=$evidence_note" \
  "confidence=$confidence" \
  "next_action=$next_authorized_action"
```

### Step 3 — Self-review

- Does the next action contact only the authorized target?
- Is confidence honest about what the source proves?
- Would a second person know what is out of scope?

### Step 4 — One change you can explain

Lower or raise confidence by one step and rewrite one sentence so the next action still matches the evidence.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Passive recon | Observation without contacting the target |
| Active recon | Checks that contact the target |
| Evidence note | What the source actually shows |
| Confidence | How strongly you trust the clue |
| Next action | The allowed follow-up inside scope |

## Proof checklist

- [ ] `recon_log.txt` lists source, target, evidence, confidence, next action, out of scope
- [ ] Passive and active are separated in your wording
- [ ] Next action stays on the authorized lab target
- [ ] Confidence is not inflated
- [ ] Practice stays on local / authorized lab only

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not gather information against real organizations, people, or networks without written authorization. Lab practice uses synthetic data and systems you control or are approved to test.

When those items are true, continue to **Scanning & Enumeration Tools**.
