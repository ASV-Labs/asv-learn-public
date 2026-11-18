# Advanced Strings, Formatting, and Regular Expressions

## Why this lesson exists

Progress-tracker data arrives messy: extra spaces, mixed capitalization, IDs with digits. Before you trust a name in a report, you **clean** it. String methods handle most of that. **Regular expressions (regex)** help when you need a small pattern check — for example “does this cleaned name still contain a digit?”

In this lesson you will:

1. Clean a list of names with `strip` and `title`
2. Format a short report line
3. Use a tiny regex to find names that still contain digits
4. Print cleaned results and matches clearly

Still local: edit a `.py` file, run it, read the terminal. There is no in-lesson code runner on this platform.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `clean_names.py`.

## Clean with string methods first

Start with methods you can explain out loud:

```python
raw = " ada "
cleaned = raw.strip().title()
print("Raw:", repr(raw))
print("Cleaned:", cleaned)
```

Output:

```text
Raw: ' ada '
Cleaned: Ada
```

- `strip()` removes edge whitespace
- `title()` capitalizes each word
- `repr()` shows the quotes and spaces so you can see the mess

## Clean a whole list

Tracker imports often give you many names at once:

```python
names = [" ada ", "Grace", "user42"]
cleaned = [name.strip().title() for name in names]
print("Cleaned names:", cleaned)
```

Output:

```text
Cleaned names: ['Ada', 'Grace', 'User42']
```

`User42` is cleaner than `" user42 "`, but the digits remain. That is useful signal — maybe it is a username, not a person name.

## Format a readable report line

Formatting turns values into text people can scan:

```python
cleaned = ["Ada", "Grace", "User42"]
report = f"Imported {len(cleaned)} names: " + ", ".join(cleaned)
print(report)
```

Output:

```text
Imported 3 names: Ada, Grace, User42
```

`join` glues pieces with a separator. Prefer `f"..."` or `join` over long `+` chains once you have several values.

## A small regex for pattern checks

Import `re`, then ask whether a digit appears:

```python
import re

cleaned = ["Ada", "Grace", "User42"]
with_digits = [name for name in cleaned if re.search(r"\d", name)]
print("Names with digits:", with_digits)
```

Output:

```text
Names with digits: ['User42']
```

- `r"\d"` means “a digit”
- `re.search` looks for that pattern anywhere in the string
- Keep the pattern tiny enough that you can explain it in one sentence

Regex is powerful and easy to overuse. If `str.isdigit()` or `"0" in name` is enough, use that instead.

## Common beginner mistakes

Skipping `strip()` and wondering why equality fails:

```python
if name == "Ada":   # fails when name is " Ada "
```

Fix the data first:

```python
name = name.strip().title()
```

Jumping to a giant regex before trying methods:

```python
re.sub(r"^\s+|\s+$", "", name)  # strip() already does this
```

Using a pattern you cannot explain:

```python
re.search(r"(?<=\b)\w{2,}(?=\b)", name)
```

For this course, stick to patterns like `\d`, `^Ada`, or a simple character class until the need is clear.

## Your local task

### Step 1 — Starter that already prints

Create `clean_names.py`:

```python
# clean_names.py — Advanced Strings, Formatting, and Regex
# Run once, then make one small change you can explain.

import re

names = [" ada ", "Grace", "user42"]
cleaned = [name.strip().title() for name in names]
with_digits = [name for name in cleaned if re.search(r"\d", name)]
report = f"Imported {len(cleaned)} names: " + ", ".join(cleaned)

print("Raw names:", names)
print("Cleaned names:", cleaned)
print("Names with digits:", with_digits)
print("Report:", report)
```

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 clean_names.py
```

Windows:

```bash
python clean_names.py
```

Expected:

```text
Raw names: [' ada ', 'Grace', 'user42']
Cleaned names: ['Ada', 'Grace', 'User42']
Names with digits: ['User42']
Report: Imported 3 names: Ada, Grace, User42
```

### Step 3 — One small change

Pick one:

- Add another messy name to the list and confirm cleaning
- Change the report separator (for example `" | "`)
- Filter names **without** digits instead of with digits

Save, run again, and say out loud: “methods clean the text; regex only checks the pattern I named.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| strip | Remove extra whitespace from the edges of a string |
| split | Break text into pieces |
| join | Combine several text values with a separator |
| formatting | Turning values into readable text for output or reports |
| regex | A pattern language for finding or validating text shapes |

## Proof checklist

- [ ] `clean_names.py` runs and prints raw, cleaned, digit matches, and a report line
- [ ] You can explain what `strip().title()` does to `" ada "`
- [ ] You can explain what `r"\d"` matches in this lesson
- [ ] You made one small change and re-ran
- [ ] `clean_names.py` lives in your course folder

When those are true, you are ready for **Math, Statistics, and Data Processing** (Module 14) — same local edit → run rhythm.
