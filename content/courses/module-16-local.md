# Debugging, Testing, and Logging Foundations

## Why this lesson exists

Portfolio code breaks. The skill is not “never err” — it is **finding the mismatch fast**: what you expected, what you got, and which small function is wrong. This lesson builds a tiny points helper, compares expected vs actual, and logs enough context to explain a failure without drowning in noise.

In this lesson you will:

1. Write a small `add_points` function
2. Compare expected and actual results in the terminal
3. Print a clear PASS / FAIL line
4. Add a simple log line that records inputs when something fails

Still local: edit a `.py` file, run it, read the terminal. There is no in-lesson code runner on this platform.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `add_points_test.py`.

## Name the behavior before you chase bugs

Write the rule in plain English first:

> `add_points(current, earned)` returns `current + earned`.

Then encode it:

```python
def add_points(current, earned):
    return current + earned


print(add_points(10, 5))
```

Output:

```text
15
```

If you cannot state the rule, you cannot tell a wrong answer from a right one.

## Expected vs actual

A **test** is a small check with a known answer:

```python
def add_points(current, earned):
    return current + earned


expected = 15
actual = add_points(10, 5)

print("Expected:", expected)
print("Actual:", actual)
print("Pass:", actual == expected)
```

Output:

```text
Expected: 15
Actual: 15
Pass: True
```

When `Pass` is `False`, do not rewrite the whole file. Fix the smallest confirmed problem first.

## Catch a logic error on purpose

A logic error runs without crashing but returns the wrong value:

```python
def add_points(current, earned):
    return current - earned  # bug: subtracts instead of adds


expected = 15
actual = add_points(10, 5)
print("Expected:", expected)
print("Actual:", actual)
print("Pass:", actual == expected)
```

Output:

```text
Expected: 15
Actual: 5
Pass: False
```

The terminal just proved the bug. Change `-` back to `+` and re-run until `Pass: True`.

## Log only useful context

**Logging** records facts that help you review behavior later. Keep it short:

```python
def add_points(current, earned):
    return current + earned


expected = 15
actual = add_points(10, 5)

if actual != expected:
    print("LOG: add_points failed", {"current": 10, "earned": 5, "actual": actual})
else:
    print("LOG: add_points ok")

print("Expected:", expected)
print("Actual:", actual)
```

Output when correct:

```text
LOG: add_points ok
Expected: 15
Actual: 15
```

Do not log every variable in the program. Log the inputs and result that explain the failure.

## Three error kinds (quick map)

| Kind | What you see | Example |
| --- | --- | --- |
| syntax error | Python refuses to start running | missing `:` or `)` |
| runtime error | Crash while running | divide by zero, bad type |
| logic error | Runs, wrong answer | subtract instead of add |

Most tracker bugs you will meet next are logic errors. Expected vs actual finds them.

## Common beginner mistakes

Changing the function and the expected value at the same time:

```python
expected = actual  # hides the bug
```

Keep `expected` fixed from the rule; only `actual` should move when you fix code.

Printing only `"error"` with no inputs:

```python
print("error")
```

Include the values that matter:

```python
print("LOG: failed", {"current": 10, "earned": 5, "actual": actual})
```

Skipping the PASS line and “eyeballing” numbers. Make the comparison print `True` / `False` or `PASS` / `FAIL`.

## Your local task

### Step 1 — Starter that already prints

Create `add_points_test.py`:

```python
# add_points_test.py — Debugging, Testing, and Logging
# Run once, then make one small change you can explain.

def add_points(current, earned):
    return current + earned


expected = 15
actual = add_points(10, 5)

if actual == expected:
    print("LOG: add_points ok")
    print("Result: PASS")
else:
    print("LOG: add_points failed", {"current": 10, "earned": 5, "actual": actual})
    print("Result: FAIL")

print("Expected:", expected)
print("Actual:", actual)
```

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 add_points_test.py
```

Windows:

```bash
python add_points_test.py
```

Expected:

```text
LOG: add_points ok
Result: PASS
Expected: 15
Actual: 15
```

### Step 3 — One small change

Pick one:

- Temporarily break the function (`current - earned`), run, confirm FAIL + log, then fix it
- Add a second check: `add_points(0, 3)` should be `3`
- Change inputs to `20` and `5` with `expected = 25` and confirm PASS

Save, run again, and say out loud: “expected comes from the rule; actual comes from the function; the log explains a miss.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| syntax error | Python raises this when code breaks language grammar |
| runtime error | An error that happens while code is running |
| logic error | Code runs but produces the wrong result |
| test | A small check that proves code matches an expected result |
| logging | Recording useful runtime facts so behavior can be reviewed |

## Proof checklist

- [ ] `add_points_test.py` runs and prints LOG, Result, Expected, and Actual
- [ ] You can explain expected vs actual in one sentence
- [ ] You know the difference between a crash and a logic error
- [ ] You made one small change (or a break-and-fix) and re-ran
- [ ] `add_points_test.py` lives in your course folder

When those are true, you are ready for **Packages, Virtual Environments, and Project Structure** (Module 17) — same local edit → run rhythm.
