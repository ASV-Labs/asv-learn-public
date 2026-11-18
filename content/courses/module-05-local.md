# Loops and Repetition

## Why this lesson exists

In Module 04 you labeled **one** score. A progress tracker usually holds **many** scores. Typing the same math line again and again is slow and error-prone. A **loop** repeats a small block of work for each item.

In this lesson you will:

1. Walk through a list with a `for` loop
2. Keep a running total with an **accumulator**
3. Count how many scores you processed
4. Print a clear total (and optionally an average)

Still no in-lesson code box — edit locally, run in the terminal, read the output.

`score_total.py` is the next brick toward your portfolio tool: summarize practice scores without hard-coding every addition.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `score_total.py`.

## What a for loop does

A `for` loop visits each item in a collection, one at a time.

```python
scores = [80, 90, 75]

for score in scores:
    print("Next score:", score)
```

Output:

```text
Next score: 80
Next score: 90
Next score: 75
```

- `scores` is the list to walk through
- `score` is a temporary name for the **current** item
- The indented block under `for` runs once per item

## Accumulators: running totals

An **accumulator** starts at a known value (often `0`) and updates each pass.

```python
scores = [80, 90, 75]
total = 0

for score in scores:
    total = total + score

print("Total:", total)
```

Output:

```text
Total: 245
```

Trace it:

1. Start: `total` is `0`
2. Add `80` → `80`
3. Add `90` → `170`
4. Add `75` → `245`

`total += score` means the same as `total = total + score`.

## Counters

A **counter** tracks how many times something happened:

```python
scores = [80, 90, 75]
total = 0
count = 0

for score in scores:
    total += score
    count += 1

print("Count:", count)
print("Total:", total)
print("Average:", total / count)
```

Output:

```text
Count: 3
Total: 245
Average: 81.66666666666667
```

You can also use `len(scores)` for the count. Practice both ways so you understand the loop itself.

## A quick peek at while

A `while` loop repeats **as long as a condition stays true**. You must change something inside the loop or it can run forever.

```python
n = 1
while n <= 3:
    print("n is", n)
    n += 1
```

Output:

```text
n is 1
n is 2
n is 3
```

For totaling a known list, prefer `for`. Reach for `while` when you do not know in advance how many times you will repeat.

## Common beginner mistakes

Forgetting to initialize the accumulator:

```python
for score in scores:
    total = total + score
```

Fix — start before the loop:

```python
total = 0
for score in scores:
    total = total + score
```

Indenting the final `print` inside the loop so it prints every pass:

```python
for score in scores:
    total += score
    print("Total:", total)
```

If you only want the final total, put `print` **after** the loop (same indentation as `for`).

Creating an infinite `while` loop:

```python
n = 1
while n <= 3:
    print(n)
    # forgot n += 1
```

Always update the value the condition depends on.

## Your local task

### Step 1 — Starter that already prints

Create `score_total.py`:

```python
# score_total.py — Loops and Repetition
# Total the scores with a for loop. Then add a count or average.

scores = [80, 90, 75]
total = 0

for score in scores:
    total += score

print("Scores:", scores)
print("Total:", total)
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 score_total.py
```

Windows:

```bash
python score_total.py
```

Expected:

```text
Scores: [80, 90, 75]
Total: 245
```

### Step 3 — One small change

Add a counter (or use `len(scores)`) and print an average. Example shape:

```text
Scores: [80, 90, 75]
Total: 245
Count: 3
Average: 81.66666666666667
```

Or change the list — add a fourth score like `100` — and confirm the total becomes `345`. Explain in one sentence what the loop added each pass.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| for loop | A loop that works through items in a collection one at a time |
| while loop | A loop that repeats as long as a condition remains true |
| counter | A variable that counts how many times something happened |
| accumulator | A variable that collects a running result across loop passes |
| iteration | One pass through the loop body |

## Proof checklist

- [ ] `score_total.py` runs without error
- [ ] The loop totals `[80, 90, 75]` as `245`
- [ ] You added a count, average, or a new score and re-ran
- [ ] You can explain what `total` holds after each pass
- [ ] The file lives in your course folder

When those are true, continue to **Collections: Lists, Tuples, Sets, and Dictionaries** — you will store open tasks, not only numbers.
