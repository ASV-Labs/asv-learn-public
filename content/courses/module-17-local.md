# Packages, Virtual Environments, and Project Structure

## Why this lesson exists

So far most of your scripts lived alone in one folder. Real projects need **structure**: a place for application code, a place for tests, a short README, and a record of which packages the project needs.

You will also learn why a **virtual environment** matters. Without one, packages you install for one project can collide with packages for another project — or with the Python your system expects.

In this lesson you will:

1. Read a recommended project tree as a map of responsibilities
2. Explain what belongs in `src/`, `tests/`, `README.md`, and `requirements.txt`
3. Understand that a virtual environment keeps project packages isolated
4. Print a clear project plan from a runnable script (`project_tree.py`)

Still local: edit a `.py` file, run it, read the terminal.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `project_tree.py`.

## What a package is

A **package** is reusable Python code someone else (or you) published so projects can depend on it. Examples you may meet later: `requests` for HTTP, `pytest` for testing.

Python’s standard library is already available. Extra packages usually come through **pip**, Python’s package installer.

```text
Your script
   ↓ uses
A package (library)
   ↓ installed into
An environment (system Python or a project .venv)
```

Installing everything into one global Python works until two projects need different versions of the same package. Then things break in confusing ways.

## What a virtual environment is

A **virtual environment** (often named `.venv`) is a project-local Python space. Packages you install while that environment is active stay inside the project instead of mixing into every other Python on the machine.

Typical flow (you do not need to install anything for this lesson’s script — learn the words and the layout first):

```bash
# create (once per project)
python3 -m venv .venv

# activate (macOS / Linux)
source .venv/bin/activate

# activate (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# install into the active environment
pip install some-package

# record what the project needs
pip freeze > requirements.txt
```

`requirements.txt` is a **package record**: a list another developer (or future you) can use to recreate the environment.

## A recommended beginner project tree

You do not need every folder on day one. Learn the map so your capstone has a home:

```text
my_project/
├── .venv/                 # virtual environment (usually not committed)
├── README.md              # how to run the project
├── requirements.txt       # package record
├── src/                   # application code
│   └── app.py
└── tests/                 # checks for behavior
    └── test_app.py
```

| Path | Responsibility |
| --- | --- |
| `src/` | Code that does the real work |
| `tests/` | Small checks that prove behavior |
| `README.md` | How to install, run, and use the tool |
| `requirements.txt` | Packages this project needs |
| `.venv/` | Isolated install space for those packages |

For tiny course scripts, a single file in your course folder is still fine. For the capstone, a tree like this makes the portfolio easier to explain.

## Teaching with a printable plan

Before you create folders by hand, print the plan from Python. That turns “I think I understand structure” into visible output you can read.

```python
project_tree = {
    "src/": "application code",
    "tests/": "checks for behavior",
    "README.md": "how to run the project",
    "requirements.txt": "package record for this project",
    ".venv/": "project-local package space",
}

for path, role in project_tree.items():
    print(f"{path:20} → {role}")
```

Example output:

```text
src/                 → application code
tests/               → checks for behavior
README.md            → how to run the project
requirements.txt     → package record for this project
.venv/               → project-local package space
```

## Common beginner mistakes

Installing packages without activating the virtual environment — they land in the wrong Python.

Skipping `requirements.txt` — later you cannot recreate the environment.

Putting every file in one flat folder with no README — other people (and future you) cannot tell how to run it.

Treating `.venv` as source code — you usually recreate it from `requirements.txt` instead of copying the whole environment between machines.

Confusing “package” with “project folder” — a package is reusable library code; your project *uses* packages.

## Your local task

### Step 1 — Starter that already prints

Create `project_tree.py`:

```python
# project_tree.py — Packages, Virtual Environments, and Project Structure
# Prints a recommended layout and short notes about virtual environments.

project_tree = {
    "src/": "application code",
    "tests/": "checks for behavior",
    "README.md": "how to run the project",
    "requirements.txt": "package record for this project",
    ".venv/": "project-local package space",
}

venv_notes = [
    "Create with: python3 -m venv .venv",
    "Activate before installing packages with pip",
    "Record packages in requirements.txt",
    "Keep application code in src/, checks in tests/",
]

print("Recommended project tree")
print("-" * 40)
for path, role in project_tree.items():
    print(f"{path:20} → {role}")

print()
print("Virtual environment notes")
print("-" * 40)
for note in venv_notes:
    print("-", note)
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 project_tree.py
```

Windows:

```bash
python project_tree.py
```

Confirm you see the tree lines and the four notes.

### Step 3 — One small change you can explain

Add one more path to `project_tree` — for example `"data/": "sample inputs and exports"` — or add one more note about why isolation matters. Save, run again, and read the new line.

Optional (outside the script): create empty `src/` and `tests/` folders in your course folder if you want the layout on disk. The script itself must still run and print clearly.

### Step 4 — Say it out loud

“A virtual environment keeps this project’s packages separate. `requirements.txt` records them. `src/` holds the app, `tests/` holds checks, and README explains how to run it.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| package | Reusable Python library code a project can depend on |
| virtual environment | A project-local Python space that keeps dependencies isolated |
| pip | Python’s package installer for the active environment |
| requirements | A package record (often `requirements.txt`) listing what a project needs |
| project tree | The folder and file layout that shows how a project is organized |

## Proof checklist

- [ ] `project_tree.py` runs and prints a readable tree plus venv notes
- [ ] You can explain why `.venv` isolates packages
- [ ] You can name what belongs in `src/`, `tests/`, and `README.md`
- [ ] You made one small change and re-ran
- [ ] `project_tree.py` lives in your course folder

When those are true, you are ready for **CLI Args, Env Vars, and Configuration** (Module 18) — same local edit → run rhythm.
