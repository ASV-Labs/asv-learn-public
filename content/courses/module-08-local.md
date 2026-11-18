# Error Handling and Data Validation

## Why this lesson exists

In Module 03, `int("forty-five")` crashed the program. Real trackers get messy input: empty strings, words instead of digits, or numbers outside a useful range. **Validation** checks data before you trust it. **Error handling** decides what to do when conversion fails.

In this lesson you will:

1. See why bare `int(input(...))` is fragile
2. Use `try` / `except` to catch bad conversion
3. Reject values outside a simple range
4. Build `safe_int.py` that either prints a clean integer or a clear message

Still no in-lesson code box — edit locally, run, read the terminal.

Safe parsing is how a progress tracker stays calm when someone types `ten` instead of `10`.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `safe_int.py`.

## What goes wrong without protection

```python
raw = "ten"
value = int(raw)
print(value)
```

That raises `ValueError` and stops. One bad keystroke should not kill the whole tracker session if you can recover.

## try / except in plain English

- **try**: attempt the risky step
- **except**: run this backup plan if that step fails

```python
raw = "ten"

try:
    value = int(raw)
    print("Converted:", value)
except ValueError:
    print("Could not convert that text into a whole number.")
```

Output:

```text
Could not convert that text into a whole number.
```

With good text:

```python
raw = "42"

try:
    value = int(raw)
    print("Converted:", value)
except ValueError:
    print("Could not convert that text into a whole number.")
```

Output:

```text
Converted: 42
```

## Validation after conversion

Catching errors is not enough. A converted number can still be useless.

```python
raw = "150"
value = int(raw)

if value < 0 or value > 100:
    print("Out of range:", value)
else:
    print("Accepted score:", value)
```

Output:

```text
Out of range: 150
```

Pattern for this lesson:

1. Convert inside `try`
2. If conversion works, check the range
3. Print either the accepted value or a clear reason

## Sample-first, then input

Prove the logic with hard-coded strings, then optionally switch to `input()`.

```python
raw = "84"  # later: input("Enter a whole number 0-100: ")

try:
    value = int(raw)
except ValueError:
    print("Not a whole number:", raw)
else:
    if value < 0 or value > 100:
        print("Out of range:", value)
    else:
        print("Accepted:", value)
```

Output for `"84"`:

```text
Accepted: 84
```

The `else` attached to `try` runs only when **no** exception happened.

## Common beginner mistakes

Catching every error with a bare `except:` and hiding the real problem:

```python
try:
    value = int(raw)
except:
    print("Error")
```

Prefer `except ValueError:` so you only handle conversion failures.

Putting the range check inside `except` (it never runs on success):

```python
try:
    value = int(raw)
except ValueError:
    if value < 0:
        ...
```

Do range checks in the success path (`else` or after a successful `try`).

Forgetting that `input()` returns text — validation still starts with conversion.

## Your local task

### Step 1 — Starter that already prints

Create `safe_int.py`:

```python
# safe_int.py — Error Handling and Data Validation
# Start with sample text. Then try a bad value and an out-of-range value.

raw = "84"

try:
    value = int(raw)
except ValueError:
    print("Not a whole number:", raw)
else:
    if value < 0 or value > 100:
        print("Out of range:", value)
    else:
        print("Accepted:", value)
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 safe_int.py
```

Windows:

```bash
python safe_int.py
```

Expected:

```text
Accepted: 84
```

### Step 3 — One small change

Change `raw` to `"ten"` and confirm:

```text
Not a whole number: ten
```

Then try `raw = "150"` and confirm:

```text
Out of range: 150
```

Optional: replace the sample with `input("Enter a whole number 0-100: ")` and test one good and one bad entry. Keep the same try / except / range shape.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| validation | Checking that data is usable before you rely on it |
| exception | An error Python raises when a step cannot finish |
| try | Block where you attempt a risky operation |
| except | Block that runs when a matching exception occurs |
| ValueError | Common error when `int()` cannot convert the text |

## Proof checklist

- [ ] `safe_int.py` accepts `"84"` and prints `Accepted: 84`
- [ ] Bad text like `"ten"` prints a clear “not a whole number” message (no crash)
- [ ] An out-of-range value like `150` is rejected with a clear message
- [ ] You can explain why `except ValueError` is better than a bare `except`
- [ ] The file lives in your course folder

When those are true, continue to **File Handling and Persistent Data** — you will save tasks so they survive after the program exits.
