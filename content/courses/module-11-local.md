# Object-Oriented Programming: Classes and Objects

## Why this lesson exists

Lists and dictionaries store data. Functions act on data. A **class** lets you keep related data and behavior together in one blueprint — the pattern your progress tracker will use for learners, tasks, and scores.

In this lesson you will:

1. Define a `Student` class with attributes and a method
2. Create an **object** (instance) from that class
3. Call a method and print a readable summary
4. Change one field and prove the object updates

Still local: edit a `.py` file, run it, read the terminal. There is no in-lesson code runner on this platform.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `student_class.py`.

## What a class is

A **class** is a blueprint. An **object** is one concrete thing made from that blueprint.

```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def summary(self):
        return f"{self.name}: {self.score}"


student = Student("Alex", 92)
print(student.summary())
```

Output:

```text
Alex: 92
```

- `Student` is the class
- `student` is one object
- `name` and `score` are **attributes** (data on the object)
- `summary()` is a **method** (behavior on the object)
- `self` means “this object” inside the method

## Why __init__ and self matter

`__init__` runs when you create the object. It stores the starting values:

```python
student = Student("Alex", 92)
print("Name:", student.name)
print("Score:", student.score)
```

Output:

```text
Name: Alex
Score: 92
```

Inside methods, the first parameter is almost always named `self`. Python passes the object for you — you do not write `self` in the call:

```python
# you write:
student.summary()

# Python roughly means:
Student.summary(student)
```

## Multiple objects from one class

One class can make many objects. Each keeps its own data:

```python
alex = Student("Alex", 92)
jordan = Student("Jordan", 78)

print(alex.summary())
print(jordan.summary())
```

Output:

```text
Alex: 92
Jordan: 78
```

That is how a progress tracker can hold many learners without inventing a new function for each person.

## Updating attributes

Objects are not frozen. Change an attribute, then call the method again:

```python
student = Student("Alex", 92)
print("Before:", student.summary())
student.score = 95
print("After:", student.summary())
```

Output:

```text
Before: Alex: 92
After: Alex: 95
```

## Common beginner mistakes

Forgetting `self` on attributes:

```python
def __init__(self, name, score):
    name = name          # local variable — lost after __init__
    score = score
```

Fix:

```python
def __init__(self, name, score):
    self.name = name
    self.score = score
```

Calling the class without creating an object:

```python
print(Student.summary())   # missing the object
```

Correct:

```python
student = Student("Alex", 92)
print(student.summary())
```

Printing the object without a useful method:

```python
print(student)   # cryptic default representation
```

Prefer a method or clear labels:

```python
print("Summary:", student.summary())
```

## Your local task

### Step 1 — Starter that already prints

Create `student_class.py`:

```python
# student_class.py — Classes and Objects
# Run once, then make one small change you can explain.

class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def summary(self):
        return f"{self.name}: {self.score}"


student = Student("Alex", 92)

print("Learner:", student.name)
print("Score:", student.score)
print("Summary:", student.summary())
```

### Step 2 — Run it unchanged

macOS / Linux:

```bash
python3 student_class.py
```

Windows:

```bash
python student_class.py
```

Expected:

```text
Learner: Alex
Score: 92
Summary: Alex: 92
```

### Step 3 — One small change

Pick one:

- Change the name or score in `Student(...)`
- Add a second student and print both summaries
- Add a `status` method that returns `"pass"` if score >= 70 else `"retry"`

Save, run again, and confirm the new output. Say out loud: “the class is the blueprint; the object holds this learner’s data.”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| class | A blueprint for creating objects with related data and behavior |
| object | One value made from a class (also called an instance) |
| attribute | Data stored on an object, such as `name` or `score` |
| method | A function attached to an object or class |
| self | The name a method uses to refer to the current object |

## Proof checklist

- [ ] `student_class.py` runs and prints Learner, Score, and Summary
- [ ] You can explain the difference between the class and one object
- [ ] You know why methods take `self` even though you do not pass it in the call
- [ ] You made one small change and re-ran
- [ ] `student_class.py` lives in your course folder

When those are true, you are ready for **Inheritance and Dataclasses** (Module 12) — same local edit → run rhythm.
