# Ethical Hacking Fundamentals

## Why this lesson exists

Ethical hacking is authorized security testing. Tools, scan speed, and clever payloads do not make the work ethical. Permission, target boundaries, timing, evidence, and stop rules do.

In this lesson you will write one **scope card** for an authorized local lab: what may be touched, what is excluded, when testing is allowed, what evidence a defender needs, and when you must stop. That card is the foundation for every later stage in this course.

This card is part of a focused **40–50 hour** ethical hacking path. Treat every hour as reviewable professional practice, not as unbounded “hacking time.”

## Where this course sits

This course teaches **assessment methodology** — the engagement process from written authorization through recon, validation, evidence, reporting, remediation, and defender handoff. It is not “install Kali and click tools.” For workstation setup and tool craft in a controlled Kali environment, take **Kali Linux & Penetration Testing Tools** alongside or after this path; that course complements methodology, it does not replace it. All practice stays in your **authorized local lab** only. Name the target, exclusions, and stop rules before any command feels persuasive.

## Reminder: where you work

Create a course notes folder on your machine (or inside your Kali / lab VM):

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-01
cd ~/asv-learn-ethical-hacking/stage-01
```

Windows (PowerShell on the host, or WSL if that is your lab shell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-01"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-01"
```

You will write `scope_card.txt` in that folder. Prefer a **dedicated lab VM** with snapshots so mistakes stay contained.

## Start here: permission before technique

Do not begin with “what tool can I run?” Begin with “what was authorized, what is excluded, when can testing happen, and what evidence would help the defender?”

You are not proving exploitation yet. You are making the assessment **reviewable** so an instructor, teammate, or future you can tell what was allowed before any command output feels persuasive.

## The permission-to-proof chain

Read every later stage through this chain:

1. **Permission** names the work that is allowed.
2. **Scope** names the system, account, range, or lab that is inside the boundary.
3. **Exclusions** name what must not be touched.
4. **Timing** names when testing may happen.
5. **Evidence** names what a defender can review afterward.
6. **Stop rules** name when the work pauses instead of pushing further.

A professional test is not “I ran a command and found something.” A professional test is “I stayed inside the approved boundary, collected evidence the defender can use, and stopped where the rules said to stop.”

| Question to answer | What it protects |
| --- | --- |
| What was authorized? | The work stays ethical and reviewable. |
| What is excluded? | Nearby systems and unrelated people stay out of scope. |
| When is testing allowed? | The test does not disrupt the wrong moment. |
| What evidence is useful? | The defender gets proof, impact, and remediation context. |
| When should testing stop? | Uncertainty, unexpected access, or safety concerns get escalated. |

First say the assessment boundary in one sentence: *testing is allowed on this target, during this window, for this purpose, with these exclusions and stop rules.*

## Authorization that actually holds up

Feedstock for this course stresses that legality is not optional. Authorization should be written, specific, and recent enough for the engagement type.

| Component | Why it matters | Honest limit |
| --- | --- | --- |
| Authorized target | Names the lab host, range, or app label | Visibility ≠ permission |
| Forbidden target | Keeps neighbors, production, and public internet out | “Interesting” is not a reason |
| Test window | Limits disruption and surprises | Open-ended windows hide risk |
| Report fields | Forces evidence, impact, remediation, owner | Screenshots alone are not a report |
| Stop rule | Names when to pause and escalate | Stop rules must be usable under pressure |

Black-box, gray-box, and white-box engagements change how much information you receive up front. They do **not** change the need for written scope. Red-team exercises and vulnerability assessments also still need rules of engagement; only the depth and stealth expectations change.

## Engagement types without the myth

| Type | What you usually know | What beginners often get wrong |
| --- | --- | --- |
| Black-box | Little internal detail | Assuming “unknown” means “no rules” |
| Gray-box | Partial credentials or architecture notes | Treating partial access as full ownership |
| White-box | Source, diagrams, or accounts | Skipping evidence because “it looks obvious” |
| External / internal | Network perspective | Scanning the wrong side of a firewall “to be thorough” |
| Web / wireless / cloud | Asset class | Using the same checklist without adapting privacy and blast radius |

For this course, your default engagement is a **local lab assessment**: Kali or similar workstation, isolated/host-only network, and labeled targets such as `lab.local`, Metasploitable, DVWA, or another VM you own and authorize.

## Scope sentence patterns

Use plain language. Examples for authorized practice only:

```text
Authorized: lab.local (Metasploitable / DVWA / custom lab VM on host-only network)
Purpose: document discovery and validation workflow for that labeled target
Window: Saturday 10:00-12:00 local (lab only)
Out of scope: any host not named in this card; public internet; neighbor Wi-Fi
Evidence: scope note, inventory rows, finding rows with remediation owner
Stop: pause if unexpected production-like data, unknown hosts, or safety concerns appear
```

Bad scope: “whatever shows up in nmap.” Good scope: one named lab label plus an explicit out-of-scope line.

## Common beginner mistakes

- Opening tools before naming the authorized target
- Treating a public hostname as “practice” because it is interesting
- Confusing bug-bounty program rules with personal lab permission
- Writing stop rules that only say “be careful”
- Saving evidence only in scratch folders with no durable note
- Expecting an automatic grading inside the lesson instead of writing a local scope card

## Your local task

### Step 1 — Confirm lab context

Write three lines in a scratch file:

```text
workstation=kali-lab-vm (or your authorized lab host)
network=host-only / isolated lab (name yours)
authorized_target=lab.local
```

If you cannot name those honestly, stop and fix the lab setup before any tool practice.

### Step 2 — Write the scope card

Create `scope_card.txt`:

```text
authorized_target=lab.local
forbidden_target=public internet; any host not labeled lab.local
test_window=Saturday 10:00-12:00 local
report_fields=scope evidence impact remediation owner
stop_rule=pause on unexpected hosts, production-like data, or unclear authorization
purpose=document authorized assessment workflow for the labeled lab target
```

Optional: print the same fields from a shell script in your lab folder:

```bash
authorized_target="lab.local"
forbidden_target="public internet; any host not labeled lab.local"
test_window="Saturday 10:00-12:00 local"
report_fields="scope evidence impact remediation owner"
stop_rule="pause on unexpected hosts, production-like data, or unclear authorization"

printf '%s\n' \
  "authorized_target=$authorized_target" \
  "forbidden_target=$forbidden_target" \
  "test_window=$test_window" \
  "report_fields=$report_fields" \
  "stop_rule=$stop_rule"
```

### Step 3 — Self-review

Read the card as if you are the next reviewer. Ask:

- Can I see what is allowed without guessing?
- Is the target a lab label, not a random public system?
- Would a defender know what evidence to expect and when you would stop?

### Step 4 — One change you can explain

Change **one** field (window, exclusion, or stop rule) and say out loud why the new wording makes the next session safer or clearer.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Authorization | Written permission that makes testing ethical and reviewable |
| Scope | Boundary of systems, accounts, and actions allowed |
| Rules of engagement | Timing, communication, impact limits, and stop conditions |
| Evidence | Saved proof a defender can inspect later |
| Stop rule | Pre-agreed reason to pause instead of pushing further |

## Proof checklist

- [ ] Course notes folder exists for stage-01
- [ ] `scope_card.txt` lists authorized target, exclusions, window, report fields, stop rule
- [ ] Target is a lab label, not a random public host
- [ ] You can explain the card in under one minute
- [ ] You know practice is local / authorized lab only (no automatic grading inside the lesson)

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Use only systems you own, systems in your isolated lab, or systems you are explicitly authorized to test. Do not scan, probe, or collect from real third-party systems without written permission.

When those items are true, continue to **Reconnaissance Planning**.
