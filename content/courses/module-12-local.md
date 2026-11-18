# Object-Oriented Design: Inheritance and Dataclasses

## Why this lesson exists

Module 11 showed a hand-written class. Many progress-tracker records are mostly **fields** — title, points, status — with little custom setup. Python’s `@dataclass` builds that kind of class for you. This lesson also introduces **inheritance** as a later tool, used only when one type truly is a specialized version of another.

In this lesson you will:

1. Build a `CourseTask` dataclass for tracker-style records
2. Print clear field values without writing `__init__` by hand
3. See a small inheritance example so you recognize the pattern
4. Prefer simple data records before deep class hierarchies

Still local: edit a `.py` file, run it, read the terminal. There is no in-lesson code runner on this platform.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `course_task.py`.

## Dataclasses: fields first

A **dataclass** is a class that mainly stores fields. The decorator writes the boring setup for you:

```python
from dataclasses import dataclass

@dataclass
class CourseTask:
    title: str
    points: int


task = CourseTask("practice", 10)
print("Title:", task.title)
print("Points:", task.points)
print("Record:", task)
```

Output:

```text
Title: practice
Points: 10
Record: CourseTask(title='practice', points=10)
```

That readable `Record:` line is why dataclasses shine for reports and portfolio demos: you see the data without writing a custom `summary()` first.

## Add a small method when behavior matters

Fields can stay on the dataclass; behavior can still be a method:

```python
from dataclasses import dataclass

@dataclass
class CourseTask:
    title: str
    points: int

    def label(self):
        return f"{self.title} ({self.points} pts)"


task = CourseTask("practice", 10)
print(task.label())
```

Output:

```text
practice (10 pts)
```

Use a method when you need a stable phrase for logs or UI text. Keep the class thin.

## Inheritance in one picture

**Inheritance** means a new class starts from an existing class and adds or overrides behavior. Use it when the relationship is clearly “is a”:

```python
from dataclasses import dataclass

@dataclass
class CourseTask:
    title: str
    points: int

    def label(self):
        return f"{self.title} ({self.points} pts)"


@dataclass
class GradedTask(CourseTask):
    score: int

    def label(self):
        return f"{self.title}: {self.score}/{self.points}"


task = GradedTask("quiz", 10, 9)
print(task.label())
```

Output:

```text
quiz: 9/10
```

`GradedTask` **is a** `CourseTask` with an extra `score`. That is a fair inheritance case.

## Prefer composition when “has a” fits better

If a tracker **has** tasks, do not force every helper to inherit from `CourseTask`. Keep a list of tasks (or a separate report object) instead. Beginners often overuse inheritance; your portfolio will look clearer if most records stay simple dataclasses.

## Common beginner mistakes

Forgetting the decorator:

```python
class CourseTask:
    title: str
    points: int

task = CourseTask("practice", 10)  # fails — no real __init__
```

Fix: put `@dataclass` above the class.

Treating inheritance as the default:

```python
class Report(CourseTask):
    ...
```

A report is not a task. Hold tasks inside a list or another object instead.

Mutating fields without printing proof:

```python
task.points = 20
# forgot to print — you cannot see the change
```

Always print after a change while learning.

## Your local task

### Step 1 — Starter that already prints

Create `course_task.py`:

```python
# course_task.py — Inheritance and Dataclasses
# Run once, then make one small change you can explain.

from dataclasses import dataclass


@dataclass
class CourseTask:
    title: str
    points: int

    def label(self):
        return f"{self.title} ({self.points} pts)"


task = CourseTask("practice", 10)

print("Title:", task.title)
print("Points:", task.points)
print("Label:", task.label())
print("Record:", task)
```

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 course_task.py
```

Windows:

```bash
python course_task.py
```

Expected:

```text
Title: practice
Points: 10
Label: practice (10 pts)
Record: CourseTask(title='practice', points=10)
```

### Step 3 — One small change

Pick one:

- Change the title or points and confirm `label()` updates
- Add a `status: str` field (for example `"open"`) and print it
- Create a second `CourseTask` and print both labels

Save, run again, and say out loud: “dataclass stores the fields; I only add methods when the report needs a phrase.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| dataclass | A helper for classes that mainly store typed fields |
| inheritance | Making a class from another so it shares fields or behavior |
| composition | Building one object from other objects instead of inheriting |
| field | A named piece of data on a dataclass or object |
| design | The plan for how data, behavior, and responsibilities fit together |

## Proof checklist

- [ ] `course_task.py` runs and prints Title, Points, Label, and Record
- [ ] You can explain why `@dataclass` removes hand-written `__init__` for simple records
- [ ] You can give one case where inheritance helps and one where a list of tasks is enough
- [ ] You made one small change and re-ran
- [ ] `course_task.py` lives in your course folder

When those are true, you are ready for **Advanced Strings, Formatting, and Regex** (Module 13) — same local edit → run rhythm.
