# Reconnaissance Planning

## Why this lesson exists

Reconnaissance is evidence collection, not a treasure hunt. Passive sources observe public or already-available information. Active checks contact targets and require clear scope. Mixing those two without labeling them is how beginners accidentally leave the lab boundary.

In this lesson you will build one **recon plan** that separates source, contact level, authorized target, evidence note, and confidence before any follow-up scan feels justified.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-02
cd ~/asv-learn-ethical-hacking/stage-02
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-02"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-02"
```

You will write `recon_plan.txt` in that folder. Keep Stage 01’s scope card nearby; recon never overrides it.

## Start here: recon boundary before clues

Do not treat every clue as permission to touch a system. First name:

1. Where the clue came from
2. Whether collecting it contacted the target
3. Which authorized lab label it applies to
4. What the clue actually supports
5. How confident you are
6. What next action stays inside scope

You are building a plan another tester can audit, not a pile of interesting screenshots.

## Passive versus active

| Contact level | What it means | Example in a local lab | Risk if mishandled |
| --- | --- | --- | --- |
| Passive | Observe without contacting the in-scope target for the clue | Reading your own lab notes, local DNS hosts file, documented lab inventory | Using public internet “research” on unrelated orgs as if it were lab practice |
| Active | Send traffic or queries that touch the target | `ping`, service probe, directory listing against `lab.local` | Contacting hosts outside the authorized label |

Why start passive when you can? Passive work often clarifies names, ownership language, and asset inventory with less noise. Active work should answer a specific question that passive evidence could not answer.

## Information categories worth collecting

Use categories so notes stay comparable across stages:

| Category | Examples in lab practice | Useful because |
| --- | --- | --- |
| Organizational | Lab owner, engagement purpose, report audience | Keeps the test tied to a person who can act |
| Technical | Hostnames, IP labels, services, exposed paths | Feeds inventory without claiming vulnerability |
| Human / process | Who approves changes, who gets findings | Prevents orphan reports |
| Boundary clues | Host-only vs bridged, naming conventions | Reduces accidental out-of-scope contact |

For public OSINT techniques (WHOIS, certificate transparency, search engines), remember the house rule for this course: practice against **your authorized lab labels** and public documentation you already own. Do not turn this lesson into reconnaissance of random internet organizations.

## Recon workflow that stays professional

1. Re-read the scope card.
2. List questions the next stage needs answered.
3. Gather passive/local evidence first.
4. Record each clue with source and confidence.
5. Choose one active follow-up only if scope allows it.
6. Stop when the inventory question is answered — not when curiosity is satisfied.

| Field | Purpose | Honest limit |
| --- | --- | --- |
| Recon source | Where the clue came from | Source quality varies |
| Contact level | Passive or active | Labels prevent accidental contact creep |
| Authorized target | Approved system for follow-up | Clue relevance ≠ authorization |
| Evidence note | What the clue supports | Notes must not exaggerate |
| Confidence | Strength of support for the next step | High confidence still is not a finding |

## Confidence without theater

| Confidence | When it fits | What it does not justify |
| --- | --- | --- |
| Low | Single weak clue or stale note | Immediate exploitation language |
| Medium | Two consistent clues from trusted lab sources | Skipping verification |
| High | Repeated, recent, in-scope evidence | Skipping documentation |

A medium-confidence hostname is enough to plan an authorized inventory check. It is not enough to claim compromise.

## Common beginner mistakes

- Calling every Google result “passive recon for the engagement”
- Active probing first because tools feel productive
- Recording tool names instead of what the evidence proves
- Raising confidence because the clue looked cool
- Following a discovered IP that is not on the scope card
- Treating recon notes as findings

## Your local task

### Step 1 — Restate the boundary

Copy the authorized target and exclusions from Stage 01 into the top of `recon_plan.txt`.

### Step 2 — Write three recon rows

Use this shape (edit values for your lab):

```text
source=local lab inventory / hosts file
contact_level=passive
authorized_target=lab.local
evidence_note=lab inventory lists lab.local as the approved training host
confidence=medium
next_authorized_action=confirm reachability only if still in scope

source=authorized lab DNS note
contact_level=passive
authorized_target=lab.local
evidence_note=hostname maps to the host-only lab address in my notes
confidence=medium
next_authorized_action=active ping only against lab.local

source=active reachability check
contact_level=active
authorized_target=lab.local
evidence_note=lab.local responded to ICMP in the isolated lab
confidence=high
next_authorized_action=service inventory in Stage 03 if scope still allows
```

Optional print helper:

```bash
recon_source="public lab DNS records / local inventory"
contact_level="passive"
authorized_target="lab.local"
evidence_note="DNS or inventory records identify the lab host name"
confidence="medium"

printf '%s\n' \
  "source=$recon_source" \
  "contact=$contact_level" \
  "target=$authorized_target" \
  "evidence=$evidence_note" \
  "confidence=$confidence"
```

### Step 3 — Optional authorized active check

Only if your scope card allows it, run a single reachability check against the labeled lab host from your lab network:

```bash
ping -c 3 lab.local
```

Record the result as one active row. If the host name is different in your lab, use your labeled name — not a public host.

### Step 4 — Self-review

Ask:

- Can a reviewer tell passive from active without guessing?
- Does every next action stay on the authorized label?
- Did any clue quietly expand scope?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Passive recon | Evidence gathered without contacting the target for that clue |
| Active recon | Evidence that requires contacting the target |
| OSINT | Open-source intelligence; still needs legal and course boundaries |
| Confidence | How strongly evidence supports the next scoped step |
| Recon plan | Ordered notes that keep contact and claims under control |

## Proof checklist

- [ ] `recon_plan.txt` exists with at least three rows
- [ ] Each row names source, contact level, target, evidence, confidence
- [ ] At least one row is clearly passive and one clearly active (or planned active)
- [ ] No next action points outside the Stage 01 scope card
- [ ] You can explain why a clue is not yet a vulnerability finding

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Do not gather intelligence on third-party organizations as “practice.” Keep active contact inside your isolated lab and written authorization.

When those items are true, continue to **Scanning & Enumeration**.
