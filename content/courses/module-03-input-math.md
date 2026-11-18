# Input, Conversion, and Basic Math

## Why this lesson exists

So far your scripts used values you typed into the file. Useful programs often **ask the person at the keyboard** for a value, then do math with it.

In this lesson you will:

1. Understand that `input()` always gives you **text** (a string)
2. Convert that text to a number when you need math
3. Calculate hours from minutes
4. Print a clear result in the terminal

Still local: edit a `.py` file, run it, read the terminal.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `minutes_to_hours.py`.

## What input() does

`input()` pauses and waits for the person to type something, then press Enter. Whatever they type comes back as a **string**, even if they type digits.

```python
raw = input("How many minutes did you practice? ")
print("You typed:", raw)
print("Type is:", type(raw))
```

If they type `45`, `raw` is the text `"45"`, not the number 45.

That matters because you cannot do useful math on text the same way:

```python
"45" / 60   # this fails — you cannot divide a string by a number
```

## Conversion: text to number

Use `int()` for whole numbers and `float()` for decimals:

```python
raw_minutes = "45"
minutes = int(raw_minutes)
hours = minutes / 60
print("Converted minutes:", minutes)
print("Hours:", hours)
```

Output:

```text
Converted minutes: 45
Hours: 0.75
```

- `int("45")` → integer `45`
- `float("45.5")` → float `45.5`

If the text is not a valid number, conversion fails. For this beginner lesson, type plain digits like `45` or `90`.

## Basic math you need

| Symbol | Meaning | Example |
| --- | --- | --- |
| `+` | add | `10 + 2` → `12` |
| `-` | subtract | `10 - 2` → `8` |
| `*` | multiply | `10 * 2` → `20` |
| `/` | divide | `45 / 60` → `0.75` |

## Practice path (sample first, then input)

Do **not** jump straight to `input()` if conversion still confuses you. First prove the math with a hard-coded string, then swap in `input()`.

### Phase A — sample text (no typing needed)

```python
raw_minutes = "45"
minutes = int(raw_minutes)
hours = minutes / 60

print("Raw minutes:", raw_minutes)
print("Converted minutes:", minutes)
print("Hours:", hours)
```

Run that until the three lines look right.

### Phase B — ask the user

```python
raw_minutes = input("Minutes practiced: ")
minutes = int(raw_minutes)
hours = minutes / 60

print("Raw minutes:", raw_minutes)
print("Converted minutes:", minutes)
print("Hours:", hours)
```

When you run this version, the program waits. Type a number and press Enter.

## Common beginner mistakes

Doing math before converting:

```python
raw_minutes = input("Minutes: ")
hours = raw_minutes / 60
```

Fix:

```python
minutes = int(raw_minutes)
hours = minutes / 60
```

Forgetting that input includes the prompt as a separate string:

```python
input(Minutes)
```

Correct:

```python
input("Minutes: ")
```

Typing words when `int()` expects digits:

```text
Minutes practiced: forty-five
```

That will crash. Use `45`.

## Your local task

### Step 1 — Starter with sample data

Create `minutes_to_hours.py`:

```python
# minutes_to_hours.py — Input, Conversion, and Basic Math
# First make the sample conversion work. Then replace the sample with input().

raw_minutes = "45"

# TODO: convert raw_minutes into a number named minutes.
# TODO: calculate hours from minutes.

print("Raw minutes:", raw_minutes)
# TODO: print Converted minutes and Hours lines.
```

### Step 2 — Finish Phase A

Fill the TODOs so a run looks like:

```text
Raw minutes: 45
Converted minutes: 45
Hours: 0.75
```

### Step 3 — Switch to input()

Change only the first assignment:

```python
raw_minutes = input("Minutes practiced: ")
```

Keep the conversion, math, and print lines. Run the file, type `90`, press Enter, and confirm:

```text
Raw minutes: 90
Converted minutes: 90
Hours: 1.5
```

### Step 4 — One small change you can explain

Try a different number (for example `30`). Confirm hours is `0.5`. Say out loud: “input gave me text, `int()` made it a number, then I divided by 60.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| input | Data the program receives from the person at the keyboard |
| conversion | Changing a value from one type to another (for example text → number) |
| integer | A whole number without decimals |
| float | A number that can include decimals |
| expression | A piece of code Python can evaluate into a value |

## Proof checklist

- [ ] Phase A works with `raw_minutes = "45"` and prints three clear lines
- [ ] Phase B uses `input()` and waits for you to type
- [ ] You can explain why `"45" / 60` fails but `int("45") / 60` works
- [ ] You ran the program with at least two different minute values
- [ ] `minutes_to_hours.py` lives in your course folder

When those are true, you are ready for **Decisions and Conditional Logic** (Module 04) — same local edit → run rhythm.
