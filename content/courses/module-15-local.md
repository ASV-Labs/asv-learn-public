# Dates, Times, Scheduling, and Timestamps

## Why this lesson exists

Progress trackers need due dates: “how many days until this task is due?” Date math is easy to get wrong if you subtract strings or mix formats. This lesson uses Python’s `datetime` tools with a **fixed sample “today”** so your output is stable while you learn, then you can switch to a real today later.

In this lesson you will:

1. Build `date` values from ISO text and from year/month/day
2. Subtract dates to get a day count
3. Format dates for readable reports
4. Keep sample dates fixed until the math is clear

Still local: edit a `.py` file, run it, read the terminal. There is no in-lesson code runner on this platform.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `days_left.py`.

## Create dates on purpose

```python
from datetime import date

due = date.fromisoformat("2026-06-15")
today = date(2026, 5, 29)

print("Due:", due)
print("Today:", today)
```

Output:

```text
Due: 2026-06-15
Today: 2026-05-29
```

- `fromisoformat` reads `"YYYY-MM-DD"` text
- `date(year, month, day)` builds a date from numbers
- Using a fixed `today` makes practice runs repeatable

## Subtract to get days left

```python
from datetime import date

due = date.fromisoformat("2026-06-15")
today = date(2026, 5, 29)
delta = due - today
days_left = delta.days

print("Days left:", days_left)
```

Output:

```text
Days left: 17
```

`due - today` returns a `timedelta`. `.days` is the whole-day count. Negative means the due date is already past.

## Format dates for people

ISO is great for computers. Reports often want a friendlier string:

```python
from datetime import date

due = date.fromisoformat("2026-06-15")
print("ISO:", due.isoformat())
print("Report:", due.strftime("%b %d, %Y"))
```

Output:

```text
ISO: 2026-06-15
Report: Jun 15, 2026
```

- `strftime` formats a date as text
- `strptime` (learn the name now) parses text into a datetime when the format is not simple ISO

## When to use datetime instead of date

Use `date` when you only care about calendar days. Use `datetime` when time of day matters (timestamps, schedules with hours). For “days until due,” `date` is the right tool.

```python
from datetime import datetime

stamp = datetime(2026, 5, 29, 9, 30)
print("Timestamp:", stamp.strftime("%Y-%m-%d %H:%M"))
```

Output:

```text
Timestamp: 2026-05-29 09:30
```

## Common beginner mistakes

Subtracting strings:

```python
"2026-06-15" - "2026-05-29"  # fails
```

Parse or build `date` objects first.

Assuming month/day order in every string:

```python
# ambiguous: is this May 6 or June 5?
```

Prefer ISO `"2026-06-15"` in files and APIs.

Calling `date.today()` before the math is solid:

```python
today = date.today()  # output changes every day — hard to check by eye
```

While learning, keep a fixed sample date. Swap in `date.today()` only after the subtraction prints correctly.

## Your local task

### Step 1 — Starter that already prints

Create `days_left.py`:

```python
# days_left.py — Dates, Times, Scheduling, and Timestamps
# Run once, then make one small change you can explain.

from datetime import date

due = date.fromisoformat("2026-06-15")
today = date(2026, 5, 29)
days_left = (due - today).days

print("Today:", today.isoformat())
print("Due:", due.isoformat())
print("Due (report):", due.strftime("%b %d, %Y"))
print("Days left:", days_left)
```

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 days_left.py
```

Windows:

```bash
python days_left.py
```

Expected:

```text
Today: 2026-05-29
Due: 2026-06-15
Due (report): Jun 15, 2026
Days left: 17
```

### Step 3 — One small change

Pick one:

- Move the due date and confirm `Days left` changes
- Change the report format string (for example `"%Y/%m/%d"`)
- Set `today` after the due date and observe a negative day count

Save, run again, and say out loud: “I convert to date objects first, then subtract, then read `.days`.”

Optional later: replace the fixed `today` with `date.today()` once you trust the math.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| date | A calendar day without a time of day |
| datetime | A date plus time value for timestamps and schedules |
| timestamp | A recorded date and time for when something happened |
| strftime | Format a date/time as text |
| strptime | Parse text into a date/time using a format pattern |

## Proof checklist

- [ ] `days_left.py` runs and prints today, due, report form, and days left
- [ ] You can explain why string subtraction is the wrong tool
- [ ] You know why a fixed sample `today` helps while learning
- [ ] You made one small change and re-ran
- [ ] `days_left.py` lives in your course folder

When those are true, you are ready for **Debugging, Testing, and Logging** (Module 16) — same local edit → run rhythm.
