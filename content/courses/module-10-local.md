# Modules, Imports, and the Standard Library

## Why this lesson exists

You do not have to invent every tool. Python ships with a **standard library**: modules other people (and the Python team) already wrote. You **import** them, then call their functions.

In this lesson you will:

1. Import a module with `import`
2. Use `datetime` to get today’s date
3. Format a date as readable text
4. Build `today_import.py` that stamps a simple progress note

Still no in-lesson code box — edit locally, run, read the terminal.

Dated notes matter for a progress tracker: “what did I finish on this day?” Module 10 connects your scripts to shared, reliable tools.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `today_import.py`.

## What import means

`import` loads a module so you can use its names.

```python
import math

print(math.sqrt(16))
```

Output:

```text
4.0
```

- `math` is the module
- `math.sqrt` is a function inside that module
- The prefix `math.` shows where the name came from

## datetime for today’s date

```python
from datetime import date

today = date.today()
print("Today:", today)
print("Year:", today.year)
print("Month:", today.month)
print("Day:", today.day)
```

Example output (your date will differ):

```text
Today: 2026-08-06
Year: 2026
Month: 8
Day: 6
```

Two common styles:

```python
import datetime
today = datetime.date.today()
```

```python
from datetime import date
today = date.today()
```

Both are fine. Be consistent inside one file.

## Formatting for humans

```python
from datetime import date

today = date.today()
label = today.strftime("%Y-%m-%d")
print("ISO date:", label)
print("Note: Practice logged on", label)
```

Example output:

```text
ISO date: 2026-08-06
Note: Practice logged on 2026-08-06
```

`strftime` builds a string from a date using a pattern (`%Y` year, `%m` month, `%d` day).

## Why the standard library helps

| DIY | Import |
| --- | --- |
| Guess today’s date | `date.today()` |
| Hand-roll day math early | Use library tools when you need them |
| Every script invents helpers | Shared, tested modules |

You will meet more modules later (`csv`, `json`, `pathlib`). The skill is the same: import, call, print proof.

## Combining with what you know

A tiny progress stamp:

```python
from datetime import date

today = date.today()
completed = 3
total = 4
percent = (completed / total) * 100

print("Date:", today.strftime("%Y-%m-%d"))
print("Progress:", str(completed) + "/" + str(total), "(" + str(percent) + "%)")
```

Example output:

```text
Date: 2026-08-06
Progress: 3/4 (75.0%)
```

That is import + prior math — the same rhythm as your growing tracker.

## Common beginner mistakes

Calling the function without importing:

```python
today = date.today()  # NameError if date was never imported
```

Fix:

```python
from datetime import date
today = date.today()
```

Mixing styles until names collide:

```python
import datetime
from datetime import date
today = datetime.date.today()
also = date.today()
```

Pick one style per file while you are learning.

Expecting `strftime` on a plain string:

```python
"2026-08-06".strftime("%Y-%m-%d")  # fails — strftime belongs on date/datetime objects
```

## Your local task

### Step 1 — Starter that already prints

Create `today_import.py`:

```python
# today_import.py — Modules, Imports, and the Standard Library
# Run once to see today's date. Then add a short progress note line.

from datetime import date

today = date.today()
stamp = today.strftime("%Y-%m-%d")

print("Module: datetime")
print("Today:", stamp)
print("Year:", today.year)
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 today_import.py
```

Windows:

```bash
python today_import.py
```

Expected shape (date varies):

```text
Module: datetime
Today: 2026-08-06
Year: 2026
```

### Step 3 — One small change

Add one more print that builds a progress note, for example:

```python
print("Note: Python Zero practice logged on", stamp)
```

Or import `math` as well and print `math.sqrt(9)` to prove a second module works in the same file. Keep the change small enough to explain: what you imported, what you called, what appeared.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| module | A file of reusable Python code you can import |
| import | Statement that loads a module into your program |
| standard library | Modules that ship with Python |
| datetime | Module for dates and times |
| strftime | Method that formats a date/time into a string |

## Proof checklist

- [ ] `today_import.py` imports from `datetime` and runs without error
- [ ] The terminal shows today’s date in `YYYY-MM-DD` form
- [ ] You added one small line (progress note or second module) and re-ran
- [ ] You can explain what `import` did for you in one sentence
- [ ] The file lives in your course folder

When those are true, continue to **Object-Oriented Programming: Classes and Objects** — you will start grouping tracker data and behavior into custom types.
