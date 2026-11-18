# Variables and Data Types

## Why this lesson exists

In Module 01 you printed fixed text. Real programs need to **remember** values and reuse them. A **variable** is a name that stores a value so you can use it again.

You will build a tiny **profile card** in a local file: name, interest, lessons completed, and whether you are a beginner. Then you will print a short summary in the terminal.

Still no in-lesson code box — same local rhythm as Module 00 and 01.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `profile_card.py` in that folder.

## What is a variable?

A variable is a labeled box that holds a value.

```python
name = "Maya"
```

- `name` is the **variable name**
- `=` means “store this value”
- `"Maya"` is the **value** (a string)

Later you can print it:

```python
print("Learner:", name)
```

Output:

```text
Learner: Maya
```

## Basic data types you need now

| Type | What it is | Example |
| --- | --- | --- |
| **string** | Text in quotes | `"Python"`, `'hello'` |
| **integer** | Whole number | `3`, `0`, `42` |
| **float** | Number with a decimal | `3.14`, `2.5` |
| **boolean** | True or False (capital T/F) | `True`, `False` |

Examples:

```python
interest = "automation"      # string
lessons_completed = 2          # integer
hours_practiced = 1.5          # float
is_beginner = True             # boolean
```

Names should describe the data. Prefer `lessons_completed` over `x` or `data1`.

## Printing variables

You can mix a label (string) with a variable:

```python
name = "Maya"
interest = "automation"
print("Learner:", name)
print("Interest:", interest)
```

Output:

```text
Learner: Maya
Interest: automation
```

## Checking a type (optional peek)

When you want to confirm what kind of value you stored:

```python
print(type(name))
print(type(lessons_completed))
print(type(is_beginner))
```

You do not need `type()` for every line. Use it when you are unsure.

## Common beginner mistakes

Using a name before you create it:

```python
print(interest)
interest = "automation"
```

Fix: create the variable **before** you print it.

Forgetting quotes on text:

```python
interest = automation
```

Python looks for a variable named `automation`. For text, use quotes:

```python
interest = "automation"
```

Writing `true` / `false` in lowercase:

```python
is_beginner = true
```

In Python it must be:

```python
is_beginner = True
```

Putting numbers in quotes when you mean a real number:

```python
lessons_completed = "2"
```

That is a **string**, not an integer. For a whole number:

```python
lessons_completed = 2
```

## Your local task

### Step 1 — Create the starter

Create `profile_card.py` with this starter:

```python
# profile_card.py — Variables and Data Types
# Keep the name variable, then add interest, lessons_completed, and is_beginner.
# Print a readable four-line profile summary.

name = "Your Name Here"

# TODO: create an interest variable with text in quotes.
# TODO: create a lessons_completed variable with a whole number.
# TODO: create an is_beginner variable with True or False.

print("Learner:", name)
# TODO: print Interest, Lessons completed, and Beginner lines.
```

### Step 2 — Fill in the TODOs

Replace the TODOs with real assignments and print lines. Example of a finished version (use **your** values):

```python
# profile_card.py — Variables and Data Types

name = "Maya"
interest = "automation"
lessons_completed = 2
is_beginner = True

print("Learner:", name)
print("Interest:", interest)
print("Lessons completed:", lessons_completed)
print("Beginner:", is_beginner)
```

### Step 3 — Run it

```bash
python3 profile_card.py
```

Windows:

```bash
python profile_card.py
```

Expected shape (your values will differ):

```text
Learner: Maya
Interest: automation
Lessons completed: 2
Beginner: True
```

### Step 4 — One small change you can explain

Change **one** value (for example `lessons_completed` or `interest`), save, run again, and confirm the new output. Say out loud what type that value is.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| variable | A name that stores a value so code can reuse it |
| string | Text data stored between quotes |
| integer | A whole number without decimals |
| float | A number that can include decimals |
| boolean | A true or false value (`True` / `False`) |

## Proof checklist

- [ ] `profile_card.py` exists in your course folder
- [ ] You have four variables: name, interest, lessons_completed, is_beginner
- [ ] Running the file prints four readable profile lines
- [ ] You can name the type of each variable
- [ ] You changed one value, re-ran, and saw the new output

When those are true, continue to **Input, Conversion, and Basic Math**.
