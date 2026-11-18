# First Programs and Basic Output

## Why this lesson exists

In Module 00 you proved Python runs on your computer. Now you will write a small script that uses `print()` on purpose — not just to say hello once, but to control what appears in the terminal, line by line.

There is still **no** in-lesson code box on this platform. You will:

1. Create a new file in your course folder
2. Type or paste the starter
3. Run it with `python3` / `python`
4. Add one useful third `print()` line about yourself
5. Confirm the terminal output matches the order of your code

## Reminder: where you work

Stay in the folder from Module 00:

```bash
cd ~/asv-learn-python-zero
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-python-zero
```

You will create a new file named `about_me.py` in that folder.

## What is print()?

`print()` shows something in the **terminal**. It is one of the first tools you learn because it lets you see what your program did.

In Python 3, `print()` is a **function**. Older lessons sometimes say “print statement,” but the correct term now is print function.

Think of `print()` as Python saying:

> Show this to the person running the program.

```python
print("Hello, world!")
```

Output:

```text
Hello, world!
```

## Why are there parentheses?

Functions use parentheses. The information you want the function to use goes inside them.

```python
print("My name is Maya.")
```

The quotation marks tell Python that the words are **text** (a string).

## Printing text

Text in Python is called a **string**. Strings usually go inside quotation marks.

```python
print("I am learning Python.")
print("Python is my first programming language.")
print("I want to get better at coding.")
```

Output:

```text
I am learning Python.
Python is my first programming language.
I want to get better at coding.
```

Each `print()` line creates a new line of output. **Order in the file = order in the terminal.**

## Printing numbers

You can also print numbers. Numbers do not need quotation marks.

```python
print(25)
print(100)
print(3.14)
```

Output:

```text
25
100
3.14
```

## Why output matters

Without `print()`, a script can calculate something and still show nothing useful in the terminal.

```python
5 + 3
```

That line alone does not print. This does:

```python
print(5 + 3)
```

Output:

```text
8
```

`print()` helps you see the result of your code.

## Comments

A **comment** is a note for humans. Python ignores comments when it runs the program. Comments start with `#`.

```python
# This line explains the code. Python ignores it.
print("This line creates output.")
```

Output:

```text
This line creates output.
```

Use comments to explain intent, not to hide broken code.

## Common beginner mistakes

Forgetting quotation marks around text:

```python
print(Hello)
```

Python thinks `Hello` is a variable name. Use quotes:

```python
print("Hello")
```

Forgetting a closing parenthesis:

```python
print("Hello"
```

Correct:

```python
print("Hello")
```

Using mismatched quotation marks:

```python
print("Hello')
```

Correct:

```python
print("Hello")
```

## Your local task

### Step 1 — Create the starter file

In `~/asv-learn-python-zero`, create `about_me.py` with exactly this starter:

```python
# about_me.py — First Programs and Basic Output
# Read this starter, run it once, then add one useful print line about yourself.

print("My name is Maya.")
print("I am learning Python.")
```

Save the file.

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 about_me.py
```

Windows:

```bash
python about_me.py
```

You should see:

```text
My name is Maya.
I am learning Python.
```

Before you edit, find three things in the file:

1. The comments that explain the goal
2. The two `print()` lines that create output
3. The order those lines appear in the terminal

### Step 3 — Add one useful third line

Add a third `print()` about yourself — a hobby, goal, favorite subject, career interest, or something you want others to know. Example:

```python
# about_me.py — First Programs and Basic Output
# Read this starter, run it once, then add one useful print line about yourself.

print("My name is Maya.")
print("I am learning Python.")
print("One of my goals is to build useful programs.")
```

Change the name and third line so they are true for **you**. Save, then run again.

### Step 4 — Read the proof

Simple way to remember it:

> `print()` means: display this information on the screen (your terminal).

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| print | A function that sends readable output to the terminal |
| comment | Text for humans that Python ignores while running code |
| syntax | The grammar rules Python code must follow |
| output | What the program prints in the terminal |
| string | Text data, usually inside quotation marks |

## Proof checklist

- [ ] `about_me.py` exists in your course folder
- [ ] Running it prints at least three lines
- [ ] The third line is something true about you
- [ ] Output order matches the order of your `print()` lines
- [ ] You can tell a comment (`# ...`) from a `print()` line
- [ ] You can explain one syntax mistake from this lesson in your own words

When those are true, continue to **Variables and Data Types**.

## House style for later modules

Same rhythm every time: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.
