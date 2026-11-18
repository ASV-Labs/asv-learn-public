# Kali Linux Setup & Basics

## Why this lesson exists

Kali is a **security workstation**, not permission. Installing tools does not authorize you to touch systems. The first professional skill is setting up a repeatable lab, naming the authorized target, and recording what each tool run is meant to prove.

In this lesson you will create a lab note that names workspace, authorized target, purpose, and cleanup before any scan or exploit language enters the conversation.

This card is a focused **20–25 hour** introduction to Kali lab hygiene. A longer zero-to-job-ready path exists outside this course; do not treat this card as that full path.

## Where this course sits

This course teaches **lab workstation and tool craft** inside a controlled Kali environment: setup, safe workflows, evidence handling, and documentation under scope. It complements — it does not replace — **Ethical Hacking & Penetration Testing**, which covers full assessment methodology end-to-end. Pick Kali when you need to operate tools carefully; pair with Ethical Hacking for the engagement process from scope through reporting and defender handoff. Practice only against **authorized local lab** targets you name in writing. Kali is a workstation, not permission.

## Reminder: where you work

Create a course notes folder on your machine (or inside your Kali / lab VM):

```bash
mkdir -p ~/asv-learn-kali-linux/stage-01
cd ~/asv-learn-kali-linux/stage-01
```

Windows (PowerShell on the host, or WSL if that is your lab shell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-01"
Set-Location "$HOME\asv-learn-kali-linux\stage-01"
```

You will write `lab_note.txt` (or a short shell script that prints the same fields) in that folder. Prefer a **dedicated lab VM** with snapshots so mistakes stay contained.

## Start here: scope before shell

Do not open tools and hunt for interesting output. Write the operating boundary first:

1. Where do notes and temporary files live?
2. What authorized target label may be touched?
3. Why would a future tool run be useful?
4. How will temporary lab files be cleaned up?

You are not proving exploitation yet. You are making Kali work **reviewable** so an instructor, teammate, or future you can tell what was allowed, what was touched, and why.

## Workstation boundary

| Item | Purpose | Honest limit |
| --- | --- | --- |
| Workspace | Keeps notes and evidence together | A folder is not a target |
| Authorized target | Names the lab system that can be touched | Visibility ≠ permission |
| Tool purpose | Explains why a command would be run | Purpose is not a finding |
| Cleanup note | Prevents stale files from becoming confusing evidence | Cleanup must be real, not aspirational |

First say the boundary in one sentence: *this workstation may only create a lab note for the named target, with a stated purpose and cleanup rule.*

## Lab setup habits that matter early

| Habit | Why it matters |
| --- | --- |
| Snapshot or backup before practice | You can recover when a package or config break happens |
| Separate notes / evidence / scratch | Scratch files do not look like proof later |
| Label targets as lab hosts | Reduces accidental public-system contact |
| Record tool purpose before output | Stops “interesting output” from rewriting the plan |
| Prefer host-only or isolated lab networks | Limits blast radius |

If you run Kali in a VM, treat the guest as the workstation and the host notes folder (or a synced lab folder) as the evidence shelf. Do not practice against production, neighbors’ Wi‑Fi, or random internet hosts.

## Scope sentence patterns

Use plain language. Examples for authorized practice only:

```text
Authorized: lab.local (Metasploitable / DVWA / custom lab VM on host-only network)
Purpose: document discovery workflow for that labeled target
Out of scope: any host not named in this note
Cleanup: delete /tmp lab scratch files after notes are saved
```

Bad scope: “whatever shows up in nmap.” Good scope: one named lab label plus an explicit out-of-scope line.

## Common beginner mistakes

- Opening tools before naming the authorized target
- Treating a public hostname as “practice” because it is interesting
- Saving evidence only in `/tmp` with no durable note
- Skipping cleanup so the next session inherits junk as “evidence”
- Confusing Kali installation success with authorization
- Expecting an automatic grading inside the lesson instead of writing a local lab note

## Your local task

### Step 1 — Confirm lab context

Write three lines in a scratch file:

```text
workstation=kali-lab-vm (or your authorized lab host)
network=host-only / isolated lab (name yours)
authorized_target=lab.local
```

If you cannot name those honestly, stop and fix the lab setup before any tool practice.

### Step 2 — Write the lab note

Create `lab_note.txt`:

```text
workspace=/home/kali/asv-learn-kali-linux/stage-01
authorized_target=lab.local
tool_purpose=document safe discovery workflow for an authorized lab target
cleanup_note=remove temporary lab notes from /tmp after practice; keep this lab_note.txt
out_of_scope=any host not labeled lab.local
```

Optional: print the same fields from a shell script in your lab folder:

```bash
workspace="$HOME/asv-learn-kali-linux/stage-01"
authorized_target="lab.local"
tool_purpose="document safe discovery workflow for an authorized lab target"
cleanup_note="remove temporary lab notes from /tmp after practice; keep lab_note.txt"
out_of_scope="any host not labeled lab.local"

mkdir -p "$workspace"
printf '%s\n' \
  "workspace=$workspace" \
  "target=$authorized_target" \
  "purpose=$tool_purpose" \
  "cleanup=$cleanup_note" \
  "out_of_scope=$out_of_scope"
```

### Step 3 — Self-review

Read the note as if you are the next reviewer. Ask:

- Can I see what is allowed without guessing?
- Is the target a lab label, not a random public system?
- Would cleanup leave durable notes and remove scratch?

### Step 4 — One change you can explain

Change **one** field (purpose or cleanup) and say out loud why the new wording makes the next session safer or clearer.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Workstation | Where you run tools (often a Kali VM) |
| Authorized target | The only system you may actively test |
| Scope | Written boundary of what is in / out |
| Lab note | Pre-run record of workspace, target, purpose, cleanup |
| Evidence | Saved output tied to a stated purpose |

## Proof checklist

- [ ] Course notes folder exists for stage-01
- [ ] `lab_note.txt` lists workspace, authorized target, purpose, cleanup, out of scope
- [ ] Target is a lab label, not a random public host
- [ ] You can explain the note in under one minute
- [ ] You know practice is local / authorized lab only (no automatic grading inside the lesson)

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Use only systems you own, systems in your isolated lab, or systems you are explicitly authorized to test. Do not scan, probe, or collect from real third-party systems without written permission.

When those items are true, continue to **Information Gathering Tools**.
