# Functions and Reusable Code

## Why this lesson exists

You already know how to calculate and print. When the same calculation appears in several places, copy-paste becomes fragile. A **function** packages steps under a name so you can call them whenever you need that result.

In this lesson you will:

1. Define a function with `def`
2. Pass in values with **parameters** / **arguments**
3. Return a result with `return`
4. Build `percent_done(completed, total)` and print a clear label

Still no in-lesson code box — edit the file, run it, read the terminal.

Percent labels show up everywhere in a progress tracker: lessons finished, tasks closed, practice goals. One small function keeps that math consistent.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `percent_label.py`.

## What a function is

A function is a reusable block with a name.

```python
def greet(name):
    return "Hello, " + name

message = greet("Maya")
print(message)
```

Output:

```text
Hello, Maya
```

- `def` starts the definition
- `name` is a **parameter** (a placeholder)
- `"Maya"` is an **argument** (the value you pass in)
- `return` sends a value back to the caller

## Building a percent helper

```python
def percent_done(completed, total):
    return (completed / total) * 100

value = percent_done(3, 4)
print("Percent:", value)
```

Output:

```text
Percent: 75.0
```

You can format a friendlier label:

```python
def percent_label(completed, total):
    percent = (completed / total) * 100
    return str(completed) + "/" + str(total) + " (" + str(percent) + "%)"

print(percent_label(3, 4))
```

Output:

```text
3/4 (75.0%)
```

Call the same function with different numbers — no need to rewrite the math.

## Define first, call second

Python must see the `def` before you call the name:

```python
def percent_done(completed, total):
    return (completed / total) * 100

print(percent_done(2, 5))
print(percent_done(5, 5))
```

Output:

```text
40.0
100.0
```

## Why return instead of only print?

`print` shows something. `return` gives a value you can store, compare, or print later.

```python
def percent_done(completed, total):
    return (completed / total) * 100

p = percent_done(1, 4)
print("Stored percent:", p)
print("Is halfway or more?", p >= 50)
```

Output:

```text
Stored percent: 25.0
Is halfway or more? False
```

For tracker logic, returning a number is usually better than printing inside every helper.

## Common beginner mistakes

Calling the function before it is defined:

```python
print(percent_done(3, 4))

def percent_done(completed, total):
    return (completed / total) * 100
```

Move the `def` above the call.

Forgetting `return` and expecting a number:

```python
def percent_done(completed, total):
    (completed / total) * 100

print(percent_done(3, 4))
```

That prints `None`. Add `return`.

Dividing by zero:

```python
percent_done(3, 0)
```

For this lesson, keep `total` greater than zero. Module 08 covers safer validation.

Using the parameter names outside the function as if they were global:

```python
def percent_done(completed, total):
    return (completed / total) * 100

print(completed)  # NameError — completed only exists inside the function
```

Pass arguments in, use the returned value outside.

## Your local task

### Step 1 — Starter that already prints

Create `percent_label.py`:

```python
# percent_label.py — Functions and Reusable Code
# Run the starter, then call the function with a second pair of numbers.

def percent_done(completed, total):
    return (completed / total) * 100

completed = 3
total = 4
percent = percent_done(completed, total)

print("Completed:", completed)
print("Total:", total)
print("Percent:", percent)
print("Label:", str(completed) + "/" + str(total) + " (" + str(percent) + "%)")
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 percent_label.py
```

Windows:

```bash
python percent_label.py
```

Expected:

```text
Completed: 3
Total: 4
Percent: 75.0
Label: 3/4 (75.0%)
```

### Step 3 — One small change

Call `percent_done` again with different numbers (for example `5` and `8`) and print a second label. Or wrap the label string in its own function and call that twice. Confirm both results without rewriting the division formula by hand.

Example second-call shape:

```text
Completed: 5
Total: 8
Percent: 62.5
Label: 5/8 (62.5%)
```

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| function | A named, reusable block of code |
| parameter | A placeholder name in the function definition |
| argument | The actual value you pass into a function call |
| return | Sends a value back to the caller |
| call | Running a function by writing its name with parentheses |

## Proof checklist

- [ ] `percent_label.py` defines `percent_done` with `def` and `return`
- [ ] Running it prints Completed, Total, Percent, and Label for 3/4
- [ ] You called the function with a second pair of numbers (or a label helper)
- [ ] You can explain the difference between `return` and `print`
- [ ] The file lives in your course folder

When those are true, continue to **Error Handling and Data Validation** — you will make number conversion fail safely instead of crashing.
