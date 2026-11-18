# File Handling and Persistent Data

## Why this lesson exists

So far every run starts from values typed in the script. Close the terminal and the data is gone. **Files** let a program remember: write today, read tomorrow. That is the difference between a demo and a tiny tracker.

In this lesson you will:

1. Write text lines to a file with `open` and `"w"`
2. Read them back with `"r"`
3. Append a new line with `"a"` without wiping what was there
4. Build `task_file.py` that saves and reloads open tasks

Still no in-lesson code box — edit locally, run, inspect both the terminal and the file on disk.

This is the persistence layer your progress-tracker portfolio will need.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `task_file.py` (and it will create `tasks.txt` beside it).

## Why files matter

| Without a file | With a file |
| --- | --- |
| Tasks live only in memory | Tasks live on disk |
| Restart = empty | Restart = reload |
| Hard to share or back up | Easy to open in any editor |

## Writing a file

```python
with open("tasks.txt", "w", encoding="utf-8") as file:
    file.write("Review Module 08\n")
    file.write("Practice safe_int\n")

print("Wrote tasks.txt")
```

Output:

```text
Wrote tasks.txt
```

- `"w"` means write (creates the file; **overwrites** if it already exists)
- `with` closes the file cleanly when the block ends
- `\n` ends each line

## Reading a file

```python
with open("tasks.txt", "r", encoding="utf-8") as file:
    contents = file.read()

print("File contents:")
print(contents)
```

Example output:

```text
File contents:
Review Module 08
Practice safe_int
```

Or line by line:

```python
with open("tasks.txt", "r", encoding="utf-8") as file:
    for line in file:
        print("Task:", line.strip())
```

`strip()` removes the trailing newline so prints stay tidy.

## Appending without wiping

```python
with open("tasks.txt", "a", encoding="utf-8") as file:
    file.write("Draft tracker notes\n")
```

`"a"` adds to the end. `"w"` would replace the whole file.

## Modes at a glance

| Mode | Use |
| --- | --- |
| `"w"` | Write new content (overwrite) |
| `"r"` | Read existing content |
| `"a"` | Append to the end |

## Common beginner mistakes

Opening for read when the file does not exist yet:

```python
with open("tasks.txt", "r", encoding="utf-8") as file:
    ...
```

Write the file first, or handle the missing-file case later. For this lesson, write before you read.

Using `"w"` when you meant `"a"` and accidentally erasing earlier tasks.

Forgetting `\n` so everything lands on one long line:

```python
file.write("Task A")
file.write("Task B")
```

Prefer one task per line with `\n`.

## Your local task

### Step 1 — Starter that already prints

Create `task_file.py`:

```python
# task_file.py — File Handling and Persistent Data
# Write two tasks, read them back, then append one more in Step 3.

tasks = [
    "Review Module 08",
    "Practice safe_int",
]

with open("tasks.txt", "w", encoding="utf-8") as file:
    for task in tasks:
        file.write(task + "\n")

print("Wrote", len(tasks), "tasks to tasks.txt")

print("Reading tasks.txt:")
with open("tasks.txt", "r", encoding="utf-8") as file:
    for line in file:
        print("-", line.strip())
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 task_file.py
```

Windows:

```bash
python task_file.py
```

Expected shape:

```text
Wrote 2 tasks to tasks.txt
Reading tasks.txt:
- Review Module 08
- Practice safe_int
```

Also open `tasks.txt` in your editor and confirm the same two lines.

### Step 3 — One small change

After the read block, append a third task with mode `"a"`, then read the file again (or print a confirmation). Expected idea:

```text
Wrote 2 tasks to tasks.txt
Reading tasks.txt:
- Review Module 08
- Practice safe_int
Appended: Draft tracker notes
Reading tasks.txt again:
- Review Module 08
- Practice safe_int
- Draft tracker notes
```

Say out loud: write creates the file, append grows it, read proves it persisted.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| persistent data | Information that remains after the program exits |
| open | Built-in that connects your program to a file |
| write mode (`"w"`) | Create/overwrite file contents |
| read mode (`"r"`) | Load existing file contents |
| append mode (`"a"`) | Add to the end without wiping earlier lines |
| encoding | How text bytes are interpreted (`utf-8` is a safe default) |

## Proof checklist

- [ ] `task_file.py` creates `tasks.txt` in your course folder
- [ ] Running the script prints the tasks it wrote
- [ ] You appended a third line and confirmed it on disk
- [ ] You can explain `"w"` vs `"a"`
- [ ] You opened `tasks.txt` in an editor at least once

When those are true, continue to **Modules, Imports, and the Standard Library** — you will pull in ready-made tools like today’s date instead of inventing them from scratch.
