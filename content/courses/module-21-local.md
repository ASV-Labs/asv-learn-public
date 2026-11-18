# Portfolio Capstone: Progress Tracker and Reporting Tool

## Why this lesson exists

This is the **portfolio capstone** for Python Zero to Useful. It is not a one-evening worksheet. Plan on about **15–25 hours** across several sittings: design, build, test, document, and gather proof you can show.

You will build a real command-line tool — `progress_tracker.py` — that tracks work items, stores them in JSON, reports summaries, and exports CSV. The point is evidence you can explain: data handling, automation judgment, clear CLI design, and basic testing.

Still local: your course folder, a text editor, and a terminal.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

Recommended layout for this project (you may start with one file and grow into folders):

```text
asv-learn-python-zero/
├── progress_tracker.py          # main CLI (required)
├── progress.json                # created/updated by the tool
├── exports/                     # CSV exports (optional folder)
├── tests/
│   └── test_progress_tracker.py
└── README.md                    # portfolio-facing documentation
```

## Problem statement

People doing entry-level data, ops, support, QA, or technical assistant work juggle many small follow-ups: clean a CSV, re-run a script, verify a fix, write a note for handoff. Spreadsheets help, but a tiny CLI that you built yourself proves you can:

- Model structured records
- Persist state to disk
- Accept commands from the terminal
- Summarize and export results
- Test the risky edges

**Build a Progress Tracker and Reporting Tool** that lets a user add tagged work items, list open items, mark items complete, print a summary, and export a CSV report — with data saved between runs in JSON.

This is a learning portfolio project. It is not a commercial product and does not need accounts, a web UI, or a database server.

## Portfolio lanes (pick a primary story)

Your README should name **one primary lane** and optionally one secondary. Same tool, different framing:

| Lane | How you talk about the tool |
| --- | --- |
| Data Assistant / Reporting Assistant | Track cleanup tasks; export CSV for stakeholders |
| Operations Automation Assistant | Track automation follow-ups; summarize open vs done |
| IT Support / Helpdesk Automation Trainee | Track recurring support checks; keep a handoff list |
| QA / Testing Assistant | Track test cases or bug-verification steps |
| Technical Assistant | Track assigned scripts and documentation chores |
| Python Internship Candidate | Show end-to-end CLI + files + tests + docs |

Example primary sentence for a README:

> I built a command-line progress tracker that stores tasks in JSON, summarizes completion by portfolio lane, and exports CSV for reporting — aimed at data/reporting assistant work.

## Data model

Each progress item is a dictionary with at least these fields:

| Field | Type | Rules |
| --- | --- | --- |
| `id` | integer | Unique, increasing (1, 2, 3, …) |
| `title` | string | Required, non-empty after strip |
| `lane` | string | Must be one of the allowed lanes below |
| `status` | string | `"open"` or `"done"` |
| `created_at` | string | ISO date `YYYY-MM-DD` when created |
| `completed_at` | string or null | ISO date when marked done; otherwise `null` |
| `notes` | string | Optional; default `""` |

Allowed `lane` values (exact strings):

```text
data
ops
support
qa
tech
intern
```

Map them in your README to the human lane names if you want friendlier display labels.

Example item:

```json
{
  "id": 1,
  "title": "Clean March scores CSV",
  "lane": "data",
  "status": "open",
  "created_at": "2026-08-06",
  "completed_at": null,
  "notes": "Watch blank score cells"
}
```

Storage file (default): `progress.json`

Suggested file shape:

```json
{
  "items": []
}
```

## Required commands

Implement these behaviors (flags may be combined with argparse subparsers or optional arguments — choose one clear style and document it):

| Command | Behavior |
| --- | --- |
| `--help` | Show usage (argparse provides this) |
| `--add TITLE --lane LANE` | Add an open item; optional `--notes TEXT` |
| `--list` | Print open items (include `--all` to show done too) |
| `--complete ID` | Mark that id done; set `completed_at` to today |
| `--summary` | Print counts: total, open, done, and counts by lane |
| `--export PATH` | Write CSV of all items to `PATH` |

Minimum happy-path demo you should be able to run after building:

```bash
python3 progress_tracker.py --add "Clean March scores CSV" --lane data --notes "Blank cells"
python3 progress_tracker.py --add "Write dry-run file plan" --lane ops
python3 progress_tracker.py --list
python3 progress_tracker.py --complete 1
python3 progress_tracker.py --summary
python3 progress_tracker.py --export exports/progress_report.csv
python3 progress_tracker.py --help
```

Windows: use `python` instead of `python3` if that is your command.

### Expected UX notes

- If `--add` is missing `--lane`, print a clear error and do not write the file.
- If `--complete` targets an unknown id, print a clear error and leave storage unchanged.
- If the JSON file is missing on first run, create it with `{"items": []}`.
- Do not crash on empty lists: `--list` and `--summary` should still print readable output.

## Storage and export rules

**JSON (source of truth)**  
Read and write the full `items` list on each changing command (`--add`, `--complete`). Use `json` with `indent=2` so humans can open the file.

**CSV (report snapshot)**  
Export columns at least:

```text
id,title,lane,status,created_at,completed_at,notes
```

Use the `csv` module. Creating parent folders for the export path is a nice touch (`Path(path).parent.mkdir(parents=True, exist_ok=True)`).

## Milestone plan (Week-style phases)

Treat this as a multi-week style build even if you compress calendar time. **Total target: 15–25 hours.**

### Phase A — Spec lock (1–2 hours)

- Write your problem statement and primary portfolio lane in `README.md`
- Copy the data model and command list into the README
- Decide file paths: `progress.json`, export folder
- Run the starter scaffolding below and keep the printed plan

**Exit criteria:** README has purpose + lane + commands; starter script runs.

### Phase B — In-memory core (3–5 hours)

- Functions: `make_item(...)`, `validate_lane(...)`, `validate_status(...)`
- Functions: `add_item(items, ...)`, `complete_item(items, id)`, `summarize(items)`
- No argparse required yet — call functions from a small `if __name__ == "__main__"` demo that prints results

**Exit criteria:** You can add/complete/summarize in one process without files, with clear prints.

### Phase C — JSON persistence (2–4 hours)

- `load_items(path)` / `save_items(path, items)`
- Wire add/complete to load → modify → save
- Create file if missing

**Exit criteria:** Quit the terminal, run again, and `--list` still shows prior items.

### Phase D — CLI with argparse (3–5 hours)

- Implement `--help`, `--add`, `--list`, `--complete`, `--summary`, `--export`
- Validate errors with readable messages (non-zero exit optional but nice)
- Manual demo script of the happy path above

**Exit criteria:** Full command set works from the terminal without editing source between runs.

### Phase E — CSV export + polish (2–3 hours)

- `--export` writes valid CSV
- Optional: `--all` on list, friendlier table formatting
- Handle empty dataset and unknown ids cleanly

**Exit criteria:** Open the CSV in a spreadsheet or text editor and confirm rows match JSON.

### Phase F — Tests (2–4 hours)

Write automated tests (pytest if you installed it in Module 17 style, or simple `assert` scripts you run with `python3`). Minimum tests listed below.

**Exit criteria:** Tests fail when you break lane validation on purpose, and pass when fixed.

### Phase G — Portfolio packaging (2–3 hours)

- Finish README: install/run, examples, lane story, limitations
- Add a short “What I would improve next” section
- Collect proof: terminal transcripts or screenshots of `--help`, `--summary`, and export

**Exit criteria:** A stranger could clone/copy the folder, run `--help`, and understand the tool in five minutes.

## Acceptance criteria (definition of done)

Your capstone is done when **all** of the following are true:

1. `progress_tracker.py --help` shows the supported options
2. You can add at least three items across at least two lanes
3. `--list` shows open items; completed items are not treated as open
4. `--complete ID` updates status and `completed_at`
5. Data survives a new terminal session via `progress.json`
6. `--summary` reports total / open / done and per-lane counts
7. `--export` creates a CSV with the required columns
8. Invalid lane or unknown id produces a clear message (no silent corruption)
9. At least four automated tests exist and pass (see below)
10. `README.md` explains purpose, lane, commands, and how to run
11. You can demo and narrate the tool in under five minutes

## Starter scaffolding (plan + minimal CLI skeleton)

Create `progress_tracker.py` with this starter. It must **run as-is**, print the build plan, and already accept `--help` / a dry `--plan` path toward argparse. Grow this file (or split modules later) until acceptance criteria pass.

```python
# progress_tracker.py — Portfolio Capstone: Progress Tracker
# Starter: prints the build plan and a minimal argparse skeleton.
# Replace the plan-only path with real storage and commands over Phases B–G.

from __future__ import annotations

import argparse
from datetime import date


ALLOWED_LANES = ("data", "ops", "support", "qa", "tech", "intern")

CAPSTONE_PLAN = {
    "project": "Portfolio Progress Tracker and Reporting Tool",
    "hours": "15-25",
    "purpose": (
        "Track tasks, data cleanup, support notes, QA checks, "
        "and automation follow-ups from the terminal."
    ),
    "portfolio_lanes": [
        "Data Assistant/Reporting Assistant",
        "Operations Automation Assistant",
        "IT Support/Helpdesk Automation Trainee",
        "QA/Testing Assistant",
        "Technical Assistant",
        "Python Internship Candidate",
    ],
    "storage": "JSON progress file plus CSV report export",
    "commands": [
        "--help",
        "--add",
        "--list",
        "--complete",
        "--summary",
        "--export",
    ],
    "phases": [
        "A Spec lock",
        "B In-memory core",
        "C JSON persistence",
        "D argparse CLI",
        "E CSV export + polish",
        "F Tests",
        "G Portfolio packaging",
    ],
}


def print_plan() -> None:
    print("Capstone plan")
    print("=" * 50)
    print("Project:", CAPSTONE_PLAN["project"])
    print("Hours:", CAPSTONE_PLAN["hours"])
    print("Purpose:", CAPSTONE_PLAN["purpose"])
    print("Storage:", CAPSTONE_PLAN["storage"])
    print()
    print("Portfolio lanes:")
    for lane in CAPSTONE_PLAN["portfolio_lanes"]:
        print(" -", lane)
    print()
    print("Required commands:")
    for command in CAPSTONE_PLAN["commands"]:
        print(" -", command)
    print()
    print("Milestone phases:")
    for phase in CAPSTONE_PLAN["phases"]:
        print(" -", phase)
    print()
    print("Allowed lane codes:", ", ".join(ALLOWED_LANES))
    print("Today (for timestamps):", date.today().isoformat())
    print("=" * 50)
    print("Next: implement add/list/complete with JSON storage.")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Progress Tracker and Reporting Tool — "
            "track open work, summarize, and export CSV."
        )
    )
    parser.add_argument(
        "--plan",
        action="store_true",
        help="print the capstone build plan (starter mode)",
    )
    parser.add_argument("--add", metavar="TITLE", help="add a new open item")
    parser.add_argument(
        "--lane",
        choices=ALLOWED_LANES,
        help="lane for --add",
    )
    parser.add_argument("--notes", default="", help="optional notes for --add")
    parser.add_argument("--list", action="store_true", help="list open items")
    parser.add_argument(
        "--complete",
        metavar="ID",
        type=int,
        help="mark an item done by id",
    )
    parser.add_argument("--summary", action="store_true", help="print summary")
    parser.add_argument(
        "--export",
        metavar="PATH",
        help="export all items to CSV at PATH",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    # Starter behavior: show the plan when --plan or when no action flags given.
    action_requested = any(
        [
            args.add is not None,
            args.list,
            args.complete is not None,
            args.summary,
            args.export is not None,
        ]
    )

    if args.plan or not action_requested:
        print_plan()
        if not action_requested:
            print()
            print("No action flags yet. Try: python3 progress_tracker.py --plan")
            print("After you implement storage, use --add / --list / --summary.")
        return

    # Minimal stubs so argparse wiring is visible; replace with real logic.
    if args.add is not None:
        if args.lane is None:
            print("Error: --add requires --lane")
            return
        print(f"[stub] would add title={args.add!r} lane={args.lane} notes={args.notes!r}")
        print("Implement JSON save in Phase C.")
        return

    if args.list:
        print("[stub] would list open items from progress.json")
        return

    if args.complete is not None:
        print(f"[stub] would complete id={args.complete}")
        return

    if args.summary:
        print("[stub] would print summary counts")
        return

    if args.export is not None:
        print(f"[stub] would export CSV to {args.export}")
        return


if __name__ == "__main__":
    main()
```

### First runs

```bash
python3 progress_tracker.py
python3 progress_tracker.py --plan
python3 progress_tracker.py --help
python3 progress_tracker.py --add "Sample task" --lane data
```

You should see the plan, help text, and a stub message for `--add`. Then replace stubs phase by phase until acceptance criteria pass. **Do not leave stub messages in the finished portfolio version.**

## Tests to write

Minimum four tests (names can vary):

1. **Lane validation** — rejecting `"marketing"` (or any non-allowed lane); accepting `"data"`
2. **Status validation** — only `"open"` / `"done"` allowed when setting status
3. **Item creation** — `make_item` / `add_item` assigns an id, default status `"open"`, and today’s `created_at`
4. **Summary report** — with a mixed list of open/done items across lanes, `summarize` returns correct totals and per-lane counts

Strong extras if you have hours left:

5. Completing an unknown id returns an error result without changing the list  
6. Export CSV header row matches the required columns  
7. Load + save round-trip preserves items  

Run tests every time you finish a phase.

## README / portfolio proof checklist

Your `README.md` should include:

- [ ] Project title and one-sentence purpose
- [ ] Primary portfolio lane (and secondary if any)
- [ ] Hours spent (honest estimate inside 15–25)
- [ ] Setup: Python version, how to run
- [ ] Command examples (copy/paste)
- [ ] Data model summary
- [ ] Where JSON/CSV live
- [ ] How to run tests
- [ ] Limitations (no multi-user login, no web UI, local files only)
- [ ] What you would improve next

Proof to keep with the project (folder or screenshots):

- [ ] Terminal output of `--help`
- [ ] Terminal output of `--list` and `--summary` after several adds/completes
- [ ] A sample `progress.json` (can be anonymized)
- [ ] A sample exported CSV
- [ ] Test run output showing passes

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| capstone | Final portfolio project that combines several course skills into one explainable tool |
| command-line application | A program run from the terminal with commands or options |
| persistence | Saving data so it still exists after the program exits |
| export | Writing a report snapshot (here, CSV) from live storage |
| acceptance criteria | The checklist that defines “done” for the project |

## Common failure modes (avoid these)

Shipping only the plan printer and calling it finished — the stubs must become real behavior.

Hard-coding three items in the source with no JSON — that is not persistence.

Skipping tests because “the demo worked once” — portfolio reviewers ask what you verified.

Writing a novel README with no command examples — prefer short and runnable.

Pretending this is a degree or job guarantee — present it as skill evidence from a learning project.

## Proof checklist (module exit)

- [ ] You scheduled real time (about 15–25 hours), not a single rushed session
- [ ] Starter ran and printed the plan; stubs were replaced for all required commands
- [ ] JSON storage + CSV export work across sessions
- [ ] Four+ tests pass
- [ ] README and proof artifacts are ready to show
- [ ] You can narrate the demo in under five minutes

When those are true, continue to **Graduation Certificate** (Module 22) — completion proof and how to present your portfolio, not a fake degree.
