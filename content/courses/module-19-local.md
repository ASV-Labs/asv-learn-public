# Advanced File Handling and Filesystem Automation

## Why this lesson exists

Earlier lessons opened one file at a time. Automation work often means **looking at a folder**, deciding what each file needs, and only then moving, renaming, or cleaning up.

The professional habit is: **inventory → plan (dry run) → act**. Beginners who skip the plan delete or overwrite the wrong files.

In this lesson you will:

1. Use `pathlib` to work with paths as objects
2. Build a dry-run plan from file names and extensions
3. Print a readable plan before any real move/rename
4. Keep `file_plan.py` safe: preview only unless you deliberately extend it

Still local: edit a `.py` file, run it, read the terminal.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `file_plan.py`.

## Why pathlib

`pathlib.Path` treats a path as an object with useful methods, not only as a string:

```python
from pathlib import Path

path = Path("scores.csv")
print(path.name)       # scores.csv
print(path.suffix)     # .csv
print(path.stem)       # scores
```

You can join paths safely:

```python
folder = Path("inbox")
target = folder / "scores.csv"
print(target)
```

## Dry run first

A **dry run** reports what would happen without changing the filesystem.

Example policy for a tiny inbox:

| Extension | Planned action |
| --- | --- |
| `.txt`, `.md` | move to `docs/` |
| `.csv`, `.json` | move to `data/` |
| `.png`, `.jpg` | move to `images/` |
| anything else | review (do not auto-move) |

```python
from pathlib import Path

files = [Path("notes.txt"), Path("scores.csv"), Path("photo.png"), Path("weird.bin")]

def planned_action(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in {".txt", ".md"}:
        return "move → docs/"
    if suffix in {".csv", ".json"}:
        return "move → data/"
    if suffix in {".png", ".jpg", ".jpeg"}:
        return "move → images/"
    return "review (no auto-move)"

print("Dry-run plan")
for path in files:
    print(f"{path.name:15} {planned_action(path)}")
```

Example output:

```text
Dry-run plan
notes.txt       move → docs/
scores.csv      move → data/
photo.png       move → images/
weird.bin       review (no auto-move)
```

## Inspecting a real folder (optional later)

Once the plan logic is clear, you can list a folder:

```python
from pathlib import Path

inbox = Path("inbox")
if inbox.exists():
    for path in sorted(inbox.iterdir()):
        if path.is_file():
            print(path.name)
else:
    print("No inbox folder yet — using sample names instead.")
```

For this lesson’s starter, sample names are enough. Do **not** delete files until you can explain the plan out loud.

## Common beginner mistakes

Calling `unlink()` or `rename()` before printing a plan — hard to undo.

Matching only exact filenames instead of extensions — fragile when names change.

Using string concatenate with mixed `/` and `\` — prefer `Path` / operator.

Assuming every path is a file — folders exist too; check `is_file()`.

Automating delete for “cleanup” on day one — prefer move-to-review for unknowns.

## Your local task

### Step 1 — Starter with working prints

Create `file_plan.py`:

```python
# file_plan.py — Advanced File Handling / Filesystem Automation
# Dry-run only: print a plan. Do not move or delete files yet.

from pathlib import Path


sample_files = [
    Path("notes.txt"),
    Path("readme.md"),
    Path("scores.csv"),
    Path("export.json"),
    Path("photo.png"),
    Path("weird.bin"),
]


def planned_action(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in {".txt", ".md"}:
        return "move → docs/"
    if suffix in {".csv", ".json"}:
        return "move → data/"
    if suffix in {".png", ".jpg", ".jpeg", ".webp"}:
        return "move → images/"
    return "review (no auto-move)"


print("Filesystem dry-run plan")
print("-" * 40)
for path in sample_files:
    action = planned_action(path)
    print(f"{path.name:15} {action}")

review_count = sum(1 for path in sample_files if planned_action(path).startswith("review"))
print("-" * 40)
print("Files in plan:", len(sample_files))
print("Needs review:", review_count)
print("No files were moved or deleted (dry run only).")
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 file_plan.py
```

Windows:

```bash
python file_plan.py
```

Confirm every sample file has a planned action and the summary counts look right.

### Step 3 — One small change you can explain

Pick one:

- Add another sample file (for example `slides.pdf`) and a rule for `.pdf` → `docs/`
- Change unknown files to `move → review/` instead of only printing “review”
- If a folder named `inbox/` exists beside the script, build the plan from real files there; otherwise keep samples

Save, run again, and confirm the new plan lines.

### Step 4 — Safety sentence

Say out loud: “This script only prints a plan. I would add a separate confirmed step before any rename or move.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| pathlib | Standard-library tool for working with file paths as objects |
| dry run | A safe preview of what would happen without changing files |
| rename | Change an item’s name |
| move | Change where an item lives |
| extension | The suffix after the final dot (`.csv`, `.png`) used for sorting rules |

## Proof checklist

- [ ] `file_plan.py` runs and prints a dry-run plan with counts
- [ ] You can explain why dry run comes before automation
- [ ] You can name at least two `Path` ideas (`suffix`, `/` join, or `iterdir`)
- [ ] You made one small change and re-ran
- [ ] No accidental deletes were part of this lesson
- [ ] `file_plan.py` lives in your course folder

When those are true, you are ready for **CSV, JSON, and Data Transformation** (Module 20) — preparation for the capstone.
