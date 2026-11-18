# Decisions and Conditional Logic

## Why this lesson exists

Up to now your scripts ran the same steps every time. Useful tools **choose a path**: pass or retry, excellent or keep practicing. That choice is **conditional logic**.

In this lesson you will:

1. Compare values with `>`, `>=`, `<`, `<=`, `==`, and `!=`
2. Use `if`, `elif`, and `else` so only one branch runs
3. Label a practice score as `excellent`, `pass`, or `retry`
4. Test at least two scores so you see different branches

Still no in-lesson code box — edit a local `.py` file, run it, read the terminal.

This score label is an early piece of the **progress tracker** you will build later: a clear status from a number.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `grade_check.py`.

## What a condition is

A **condition** is a yes/no question Python can answer with `True` or `False`.

```python
score = 84
print(score >= 70)
print(score >= 90)
```

Output:

```text
True
False
```

Comparisons you will use:

| Operator | Meaning | Example (`score = 84`) |
| --- | --- | --- |
| `>=` | greater than or equal | `score >= 70` → `True` |
| `>` | greater than | `score > 84` → `False` |
| `<=` | less than or equal | `score <= 100` → `True` |
| `<` | less than | `score < 70` → `False` |
| `==` | equal | `score == 84` → `True` |
| `!=` | not equal | `score != 100` → `True` |

Use `==` for equality. A single `=` stores a value; it is not a comparison.

## if, elif, and else

Python checks conditions **from top to bottom** and runs the **first** branch that matches.

```python
score = 84

if score >= 90:
    status = "excellent"
elif score >= 70:
    status = "pass"
else:
    status = "retry"

print("Score:", score)
print("Status:", status)
```

Output:

```text
Score: 84
Status: pass
```

Why `pass`? Because `84 >= 90` is false, so Python skips that branch. Then `84 >= 70` is true, so it sets `status = "pass"` and ignores `else`.

Order matters. Put the **most specific** (highest bar) first. If you checked `>= 70` before `>= 90`, a score of 95 would be labeled `pass` forever.

## Predict before you run

Before you execute, pick a score and say which branch should win:

| Score | Expected status |
| --- | --- |
| 95 | excellent |
| 84 | pass |
| 55 | retry |

Then change `score` and confirm the terminal matches your prediction.

## Common beginner mistakes

Using `=` inside a condition:

```python
if score = 84:
```

Fix — compare with `==`, or use `>=` as in the lesson:

```python
if score >= 90:
```

Forgetting indentation (the spaces before the line under `if`):

```python
if score >= 90:
status = "excellent"
```

Correct:

```python
if score >= 90:
    status = "excellent"
```

Checking the low bar before the high bar:

```python
if score >= 70:
    status = "pass"
elif score >= 90:
    status = "excellent"
```

A 95 never reaches `excellent`. Put `>= 90` first.

## Your local task

### Step 1 — Starter that already prints

Create `grade_check.py`:

```python
# grade_check.py — Decisions and Conditional Logic
# Run once with score = 84. Then change the score and watch status change.

score = 84

if score >= 90:
    status = "excellent"
elif score >= 70:
    status = "pass"
else:
    status = "retry"

print("Score:", score)
print("Status:", status)
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 grade_check.py
```

Windows:

```bash
python grade_check.py
```

Expected:

```text
Score: 84
Status: pass
```

### Step 3 — One small change

Change only the score, for example:

```python
score = 95
```

Save, run again, and confirm:

```text
Score: 95
Status: excellent
```

Then try `score = 55` and confirm `Status: retry`. Say out loud which comparison won each time.

Optional stretch: add a second score block below the first (copy the same `if` / `elif` / `else` shape with a new variable like `score_b`). No loops yet — that is Module 05.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| if | A branch that runs only when its condition is true |
| elif | A later condition checked only if earlier branches did not run |
| else | The fallback branch when every earlier condition was false |
| comparison | A check that asks how two values relate (`>=`, `==`, …) |
| boolean | A true or false value used for decisions |

## Proof checklist

- [ ] `grade_check.py` runs and prints Score and Status
- [ ] Score `84` shows `pass`
- [ ] You tested at least one other score (`95` or `55`) and saw a different status
- [ ] You can explain why order of `>= 90` before `>= 70` matters
- [ ] The file lives in your course folder

When those are true, continue to **Loops and Repetition** — you will total several scores in one run.
