# Math, Statistics, and Data Processing Foundations

## Why this lesson exists

A progress tracker is not useful if it only lists raw scores. You need a **summary**: how many values, total, average, lowest, highest. This lesson builds that summary carefully — including what to do when the list is empty — so later portfolio reports do not lie with a crash or a nonsense average.

In this lesson you will:

1. Compute count, total, average, minimum, and maximum
2. Round an average for readable reports
3. Guard against empty data before dividing
4. Print one clear summary block

Still local: edit a `.py` file, run it, read the terminal. There is no in-lesson code runner on this platform.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `score_summary.py`.

## The five numbers you almost always want

```python
scores = [88, 92, 75, 100]

count = len(scores)
total = sum(scores)
average = total / count
minimum = min(scores)
maximum = max(scores)

print("Count:", count)
print("Total:", total)
print("Average:", average)
print("Minimum:", minimum)
print("Maximum:", maximum)
```

Output:

```text
Count: 4
Total: 355
Average: 88.75
Minimum: 75
Maximum: 100
```

Name each result. Avoid a single mystery variable like `x`.

## Round for humans, keep precision when needed

Reports often want fewer decimals:

```python
average = 88.75
print("Average (raw):", average)
print("Average (1 decimal):", round(average, 1))
```

Output:

```text
Average (raw): 88.75
Average (1 decimal): 88.8
```

`round` is for display and simple summaries. If you need bank-grade money math later, you will learn more careful tools — for tracker scores, `round` is enough.

## Empty lists break careless averages

```python
scores = []
average = sum(scores) / len(scores)  # ZeroDivisionError
```

Plan the empty case before you trust the formula:

```python
scores = []

if not scores:
    print("No scores yet — summary skipped.")
else:
    average = sum(scores) / len(scores)
    print("Average:", average)
```

Output:

```text
No scores yet — summary skipped.
```

Portfolio code that survives empty data looks more professional than code that only works on happy paths.

## Pack a summary dictionary

Dictionaries make later JSON or print loops easier:

```python
scores = [88, 92, 75, 100]
summary = {
    "count": len(scores),
    "total": sum(scores),
    "average": round(sum(scores) / len(scores), 1),
    "minimum": min(scores),
    "maximum": max(scores),
}

print("Summary:", summary)
print("Average only:", summary["average"])
```

Output:

```text
Summary: {'count': 4, 'total': 355, 'average': 88.8, 'minimum': 75, 'maximum': 100}
Average only: 88.8
```

## Common beginner mistakes

Dividing before checking length:

```python
average = sum(scores) / len(scores)
```

when `scores` might be empty. Guard first.

Using `sum` on a list that still has strings:

```python
scores = ["88", "92"]
sum(scores)  # fails
```

Convert with `int` or `float` during import/cleaning (Module 13 skills help here).

Printing only the average and losing the count:

```python
print(sum(scores) / len(scores))
```

Include count so a reader knows how much evidence the average rests on.

## Your local task

### Step 1 — Starter that already prints

Create `score_summary.py`:

```python
# score_summary.py — Math, Statistics, and Data Processing
# Run once, then make one small change you can explain.

scores = [88, 92, 75, 100]

if not scores:
    print("No scores yet — summary skipped.")
else:
    summary = {
        "count": len(scores),
        "total": sum(scores),
        "average": round(sum(scores) / len(scores), 1),
        "minimum": min(scores),
        "maximum": max(scores),
    }
    print("Scores:", scores)
    print("Count:", summary["count"])
    print("Total:", summary["total"])
    print("Average:", summary["average"])
    print("Minimum:", summary["minimum"])
    print("Maximum:", summary["maximum"])
```

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 score_summary.py
```

Windows:

```bash
python score_summary.py
```

Expected:

```text
Scores: [88, 92, 75, 100]
Count: 4
Total: 355
Average: 88.8
Minimum: 75
Maximum: 100
```

### Step 3 — One small change

Pick one:

- Add or remove a score and confirm the summary updates
- Change rounding to 2 decimal places
- Temporarily set `scores = []` and confirm the empty-path message

Save, run again, and say out loud: “count and total explain the average; empty lists must not divide.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| sum | The total produced by adding numbers together |
| average | A total divided by count so a group can be summarized |
| minimum | The smallest value in a group |
| maximum | The largest value in a group |
| rounding | Adjusting a number to a simpler precision for display |

## Proof checklist

- [ ] `score_summary.py` runs and prints count, total, average, minimum, maximum
- [ ] You can explain why an empty list must be handled before dividing
- [ ] You know what `round(average, 1)` changes in the report
- [ ] You made one small change and re-ran
- [ ] `score_summary.py` lives in your course folder

When those are true, you are ready for **Dates, Times, Scheduling, and Timestamps** (Module 15) — same local edit → run rhythm.
