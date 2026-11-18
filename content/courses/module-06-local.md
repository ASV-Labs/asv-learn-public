# Collections: Lists, Tuples, Sets, and Dictionaries

## Why this lesson exists

A progress tracker needs more than one score. It needs **collections**: ordered task lists, unique tags, and labeled fields like title and status.

In this lesson you will:

1. Use a **list** for open tasks you can change
2. See how a **tuple** is like a fixed snapshot
3. Use a **set** when uniqueness matters
4. Use a **dictionary** for labeled fields (key → value)
5. Print a readable task summary in the terminal

Still no in-lesson code box — local edit → run → read output.

`open_tasks.py` is practice for the kind of data a tracker stores before you save it to a file (Module 09).

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `open_tasks.py`.

## Lists — ordered and changeable

A **list** keeps items in order. You can add, remove, and replace items.

```python
tasks = ["Review Module 04", "Practice loops", "Sketch tracker fields"]
print(tasks[0])
print(len(tasks))
tasks.append("Write open_tasks.py")
print(tasks)
```

Output:

```text
Review Module 04
3
['Review Module 04', 'Practice loops', 'Sketch tracker fields', 'Write open_tasks.py']
```

- Index `0` is the first item
- `append` adds to the end
- `len` counts items

## Tuples — ordered and fixed

A **tuple** is ordered like a list but you do not change it after creation. Good for a fixed pair or snapshot.

```python
module_info = ("module-06", "Collections")
print(module_info[0])
print(module_info[1])
```

Output:

```text
module-06
Collections
```

If you need to grow or edit the collection, use a list.

## Sets — unique items

A **set** stores unique values. Duplicates disappear.

```python
tags = {"python", "practice", "python"}
print(tags)
```

Output shape (order is not guaranteed):

```text
{'python', 'practice'}
```

Use sets when you care about “is this tag already recorded?” more than order.

## Dictionaries — labeled fields

A **dictionary** maps **keys** to **values**. Perfect for one task record:

```python
task = {
    "title": "Practice loops",
    "status": "open",
    "minutes": 25,
}

print(task["title"])
print(task["status"])
print(task["minutes"])
```

Output:

```text
Practice loops
open
25
```

Keys are labels. Values are the data. Later your tracker can hold a **list of dictionaries** — many tasks, each with the same field names.

## Choosing the right collection

| Need | Prefer |
| --- | --- |
| Ordered list you will edit | list |
| Fixed pair or snapshot | tuple |
| Unique tags only | set |
| Named fields on one item | dictionary |

## Common beginner mistakes

Using parentheses when you meant a changeable list:

```python
tasks = ("A", "B")
tasks.append("C")  # fails — tuples have no append
```

Fix:

```python
tasks = ["A", "B"]
tasks.append("C")
```

Asking for a list index that does not exist:

```python
tasks = ["A", "B"]
print(tasks[2])
```

Valid indexes here are `0` and `1`.

Looking up a dictionary key that is missing:

```python
print(task[" Tit le"])  # typo / wrong key
```

Use the exact key string, for example `task["title"]`.

## Your local task

### Step 1 — Starter that already prints

Create `open_tasks.py`:

```python
# open_tasks.py — Collections: Lists, Tuples, Sets, and Dictionaries
# Start with a list of open tasks and one task dictionary. Then extend it.

open_tasks = [
    "Review Module 04",
    "Practice loops",
    "Sketch tracker fields",
]

first_task = {
    "title": open_tasks[0],
    "status": "open",
    "minutes": 20,
}

print("Open task count:", len(open_tasks))
print("First task:", first_task["title"])
print("Status:", first_task["status"])
print("Minutes:", first_task["minutes"])
```

### Step 2 — Run it

macOS / Linux:

```bash
python3 open_tasks.py
```

Windows:

```bash
python open_tasks.py
```

Expected:

```text
Open task count: 3
First task: Review Module 04
Status: open
Minutes: 20
```

### Step 3 — One small change

Do one of these and re-run:

1. `open_tasks.append("Draft percent helper")` and print the new count (`4`)
2. Change `first_task["minutes"]` to `30` and confirm the Minutes line updates
3. Add a small `tags` set (for example `{"python", "tracker"}`) and print it

Explain which collection type you changed and why that type fit the job.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| list | Ordered, changeable collection of items |
| tuple | Ordered collection that is not meant to be changed |
| set | Collection of unique items (order not the point) |
| dictionary | Mapping of keys to values (labeled fields) |
| index | Position of an item in a list or tuple (starts at 0) |
| key | The label used to look up a value in a dictionary |

## Proof checklist

- [ ] `open_tasks.py` runs and prints count, title, status, and minutes
- [ ] You used at least a list and a dictionary
- [ ] You made one small change (append, field update, or set) and re-ran
- [ ] You can say when you would pick list vs dictionary
- [ ] The file lives in your course folder

When those are true, continue to **Functions and Reusable Code** — you will wrap a percent calculation in a named tool you can call again.
