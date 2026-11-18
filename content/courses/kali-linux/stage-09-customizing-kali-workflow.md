# Customizing Kali for Your Workflow

## Why this lesson exists

Customization should make lab work **repeatable**, easier to review, and easier to explain. A personal setup that hides evidence or depends on memory is not a professional workflow.

In this lesson you will write a workflow checklist: workspace layout, note template, tool profile, update habit, backup rule, and reviewer-ready summary.

A longer zero-to-job-ready Kali path exists outside this **20–25 hour** card; finish this checklist before expanding into that longer curriculum.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-kali-linux/{notes,evidence,reports,scratch}
cd ~/asv-learn-kali-linux
```

Windows (PowerShell on the host if notes live there):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\notes"
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\evidence"
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\reports"
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\scratch"
Set-Location "$HOME\asv-learn-kali-linux"
```

You will write `workflow_checklist.txt` in the course root folder.

## Start here: repeatability before shortcuts

Do not optimize for private shortcuts first. Name:

1. Workspace layout
2. Note template
3. Tool profile (defaults and boundaries)
4. Update habit
5. Backup rule
6. Reviewer-ready summary

Customization is useful when another reviewer can understand the setup. The goal is a repeatable lab workflow, not hidden convenience that only works from memory.

## Workflow checklist model

| Field | Professional reason | Failure mode if missing |
| --- | --- | --- |
| Workspace layout | Separates notes, evidence, reports, scratch | Scratch mistaken for proof |
| Note template | Makes every run reproducible | Runs cannot be explained later |
| Tool profile | Documents defaults and scope boundaries | Accidental out-of-scope targets |
| Update habit | Keeps the lab snapshot current | Broken tools mid-engagement |
| Backup rule | Protects evidence and notes | Lost work after VM crash |
| Reviewer-ready summary | Turns practice into useful proof | Nobody can hand off findings |

First say the checklist in one sentence: *layout, note template, tool profile, update habit, backup rule, and reviewer summary.*

## Suggested layout

```text
~/asv-learn-kali-linux/
  notes/       # lab notes per stage
  evidence/    # saved tool output tied to notes
  reports/     # short findings for handoff
  scratch/     # disposable files; never the only copy of proof
```

Link each evidence file back to a note that states target, purpose, and time. A pile of screenshots without notes is not a workflow.

## Note template (minimum fields)

Use this for every future tool run:

```text
date=
authorized_target=
purpose=
command_or_action=
result_summary=
evidence_path=
next_action=
cleanup=
```

Aliases and shell functions are fine **after** this template exists. An alias that hides the target or skips the note is a downgrade.

## Tool profile boundaries

| Default | Boundary |
| --- | --- |
| Lab target variable | Always set to authorized label before scans |
| Output directory | Under `evidence/` with date prefix |
| Aggressive timing profiles | Off unless the note says why |
| Update commands | Run on a snapshot-friendly schedule |
| Wireless / exploit tools | Disabled or unused until their stage cards are complete |

Write the profile in plain language first. Implement aliases second.

## Update and backup

| Habit | Practical cadence for a learning lab |
| --- | --- |
| Snapshot before major package updates | Before `apt` big changes |
| Export notes/evidence after each practice block | End of session |
| Keep one offline or host-side backup of notes | Weekly or after each stage |
| Re-read scope note after restore | Snapshots can revive old assumptions |

## Common beginner mistakes

- Building clever aliases before a note template
- Saving everything in `/tmp` or Desktop clutter
- No backup until a VM disk fills
- Tool defaults that quietly expand scope
- Reviewer summary that lists tools instead of findings
- Treating this short card as the full multi-hundred-hour career path

## Your local task

### Step 1 — Create the folders

Ensure `notes`, `evidence`, `reports`, and `scratch` exist (commands above).

### Step 2 — Write the workflow checklist

Create `workflow_checklist.txt`:

```text
workspace_layout=~/asv-learn-kali-linux/{notes,evidence,reports,scratch}
note_template=date target purpose action result evidence_path next_action cleanup
tool_profile=safe defaults for authorized lab targets only; no aggressive profiles without a note
update_habit=snapshot then update lab packages before a new practice block
backup_rule=export notes and evidence to host storage after each lab session
reviewer_summary=finding summary with evidence path, impact, and remediation
longer_path_note=optional deeper curriculum exists beyond this 20-25h ASV Learn card; do not inflate this card hours
```

Optional shell setup print:

```bash
workspace_layout="$HOME/asv-learn-kali-linux/notes-evidence-reports-scratch"
note_template="target purpose output next-action"
tool_profile="safe aliases and defaults for authorized lab targets only"
update_habit="update the lab snapshot before a new practice block"
backup_rule="export notes and evidence after each lab"
reviewer_summary="finding summary with evidence, impact, and remediation"

mkdir -p "$HOME/asv-learn-kali-linux"/{notes,evidence,reports,scratch}
printf '%s\n' \
  "workspace_layout=$workspace_layout" \
  "note_template=$note_template" \
  "tool_profile=$tool_profile" \
  "update_habit=$update_habit" \
  "backup_rule=$backup_rule" \
  "reviewer_summary=$reviewer_summary"
```

### Step 3 — Self-review

- Could another person follow this without watching you type?
- Are scratch and evidence separated?
- Does the reviewer summary talk about findings, not ego?

### Step 4 — One change you can explain

Add one concrete alias or folder naming rule, then explain how it improves reviewability rather than speed alone.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Workspace layout | Where notes, evidence, reports, and scratch live |
| Note template | Required fields for every run |
| Tool profile | Intentional defaults and boundaries |
| Reviewer-ready summary | Handoff a second person can use |
| Repeatability | Same steps produce understandable results later |

## Proof checklist

- [ ] Folders for notes, evidence, reports, scratch exist
- [ ] `workflow_checklist.txt` covers all six fields
- [ ] Note template is copy-paste ready
- [ ] Backup rule is practical
- [ ] You can explain the setup in under two minutes
- [ ] You know this card is 20–25h, with a longer path available later

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

A customized Kali workflow does not grant permission. Keep every alias, script, and default pointed at authorized lab targets only.

When those items are true, you have finished this ASV Learn Kali card. Continue into deeper authorized labs or a longer curriculum when you are ready — without claiming those hours on this course card.
