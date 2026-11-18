type PythonZeroModule = {
  slug: string;
  title: string;
  hours: string;
  sortOrder: number;
  focus: string;
  scenario: string;
  practice: string;
  starter: string;
  vocabulary: string[];
  checks: string[];
  lessonBridge?: string;
};

type PythonZeroBridge = {
  steps: string[];
  delay: string;
};

const PYTHON_ZERO_VOCABULARY_DEFINITIONS: Record<string, string> = {
  CSV: "A plain-text table format where each row is a line and fields are separated by commas.",
  JSON: "A structured text format Python can read and write for lists, dictionaries, and saved app data.",
  Python: "The programming language you are using to turn instructions into runnable behavior.",
  ValueError: "An error Python raises when a value has the wrong shape for the operation.",
  accumulator: "A variable that collects a running result as a loop works through data.",
  append: "A list operation that adds one new item to the end.",
  argument: "A value passed into a function, command, or script.",
  attribute: "Data stored on an object, such as a name or status field.",
  average: "A total divided by count so a group of numbers can be summarized.",
  boolean: "A true or false value used for decisions.",
  capstone: "A final portfolio project that combines several skills into a progress tracker/reporting tool the learner can explain.",
  certificate: "A completion document that records what was finished without claiming a degree, license, or employment outcome.",
  class: "A blueprint for creating objects with related data and behavior.",
  "command-line application": "A program a user runs from the terminal with commands or options.",
  "credential ID": "A unique readable code used to identify and verify one issued certificate.",
  comment: "Text for humans that Python ignores while running code.",
  comparison: "A check that asks how two values relate, such as equal, greater, or smaller.",
  composition: "Building one object from other objects instead of inheriting behavior.",
  configuration: "Values that control how a script behaves without rewriting its core logic.",
  conversion: "Changing a value from one type to another, such as text to number.",
  counter: "A variable used to count how many times something happened.",
  dataclass: "A Python helper for making simple classes that mainly store fields.",
  date: "A calendar day without a time of day.",
  datetime: "A date plus time value used for timestamps and schedules.",
  delete: "A file operation that removes an item from storage.",
  design: "The plan for how data, behavior, and responsibilities fit together.",
  dictionary: "A collection that stores values by key, such as name to value.",
  "dry run": "A safe preview that reports what would happen without changing files.",
  elif: "A second condition Python checks only if the first if branch did not run.",
  else: "The fallback branch Python runs when earlier conditions are false.",
  "environment variable": "A value supplied by the operating environment instead of hard-coded source.",
  except: "The part of a try block that handles a specific error.",
  exception: "An error event Python can raise and code can handle deliberately.",
  expression: "A piece of code Python can evaluate into a value.",
  "file path": "The location of a file or folder on disk.",
  "verification URL": "A public link that lets someone confirm a certificate record without exposing extra private data.",
  float: "A number that can include decimals.",
  "for loop": "A loop that works through items in a collection one at a time.",
  formatting: "Turning values into readable text for output, files, or reports.",
  function: "A named block of reusable behavior.",
  if: "A decision branch that runs only when its condition is true.",
  import: "Loading code from another module so the current file can use it.",
  inheritance: "Creating a class from another class so it shares behavior or fields.",
  input: "Data the program receives from a user, file, or other source.",
  integer: "A whole number without decimals.",
  interpreter: "The Python program that reads and runs your code.",
  join: "A string operation that combines several text values with a separator.",
  list: "An ordered collection that can grow, shrink, and keep duplicates.",
  logging: "Recording useful runtime facts so behavior can be reviewed later.",
  "logic error": "A bug where code runs but produces the wrong result.",
  maximum: "The largest value in a group.",
  method: "A function attached to an object or class.",
  minimum: "The smallest value in a group.",
  module: "A Python file or package that can be imported.",
  move: "A file operation that changes where an item lives.",
  namespace: "The set of names available in a specific part of code.",
  object: "A value made from a class that carries data and behavior together.",
  output: "What the program prints, returns, writes, or otherwise produces.",
  package: "A reusable Python library or folder of modules a project can depend on.",
  parameter: "A named input a function expects when it is called.",
  pathlib: "Python's standard library tool for working with file paths as objects.",
  pip: "Python's package installer for adding libraries to the active environment.",
  portfolio: "A collection of learner evidence that shows what a learner built, tested, and can explain.",
  print: "A function that sends readable output to the console.",
  "project tree": "The folder and file layout that shows how a project is organized.",
  read: "A file operation that loads stored content into the program.",
  record: "A structured group of fields that describe one item or event.",
  regex: "A pattern language for finding or validating text shapes.",
  rename: "A file operation that changes an item's name.",
  requirements: "A package record, often requirements.txt, that lists what a project needs.",
  return: "Sending a value back from a function to the code that called it.",
  rounding: "Adjusting a number to a simpler precision.",
  row: "One record in a table-like dataset.",
  "runtime error": "An error that happens while code is running.",
  scope: "The area of code where a name or value is available.",
  script: "A Python file meant to be run as a program.",
  self: "The name a method uses to refer to the current object.",
  set: "An unordered collection of unique values.",
  split: "A string operation that breaks text into pieces.",
  "standard library": "Python's built-in modules that are available without installing packages.",
  strftime: "A datetime method that formats dates or times as text.",
  string: "Text data stored between quotes.",
  strip: "A string operation that removes extra whitespace from the edges.",
  strptime: "A datetime method that parses text into a date or time.",
  sum: "The total produced by adding numbers together.",
  syntax: "The grammar rules Python code must follow.",
  "syntax error": "An error Python raises when code does not follow its grammar.",
  "sys.argv": "The list of command-line arguments passed to a Python script.",
  terminal: "The command window where a learner can run programs and see output.",
  test: "A small check that proves code behaves the way you expect.",
  timestamp: "A recorded date and time for when something happened.",
  transformation: "Changing data from one useful shape into another.",
  try: "A block that runs code while preparing to handle expected errors.",
  tuple: "An ordered collection that is usually treated as fixed.",
  validation: "Checking data before trusting it.",
  variable: "A name that stores a value so code can reuse it.",
  "virtual environment": "A project-local Python package space that keeps dependencies isolated.",
  "while loop": "A loop that repeats as long as a condition remains true.",
  "with block": "A safe file-handling block that opens and closes resources for you.",
  write: "A file operation that saves content to storage.",
};

export const PYTHON_ZERO_MODULES: PythonZeroModule[] = [
  {
    slug: "module-00",
    title: "Course Orientation and Browser Workspace",
    hours: "1-2",
    sortOrder: 1,
    focus: "use the browser workspace and explain how Python turns instructions into output",
    scenario: "You are getting comfortable with the course screen before writing real programs in the browser.",
    practice: "Create a short learner profile that records the project you want Python to help you build. No download or local Python setup is required for this course room.",
    starter: `practice_note = {
    "concept": "browser Python workspace",
    "example_output": "ready to learn Python",
    "next_step": "run the first browser script",
}

print(practice_note["example_output"])`,
    vocabulary: ["Python", "script", "interpreter", "output"],
    checks: ["I can explain what Python is for.", "I can use the browser workspace.", "I can run a tiny script."],
  },
  {
    slug: "module-01",
    title: "First Programs and Basic Output",
    hours: "1-2",
    sortOrder: 2,
    focus: "use print() to show text on the screen and read simple output",
    scenario: "You are writing your first tiny browser script and checking exactly what appears in the output box.",
    practice: "Run the starter code first. Then add one useful third print() line about yourself, such as a hobby, goal, favorite subject, career interest, or something you want others to know about you.",
    starter: `# First Programs and Basic Output
# Read this starter, run it once, then add one useful print line.

print("Browser practice started")
print("I can run Python in the browser")`,
    lessonBridge: `## What is print()?

In Python, \`print()\` shows something in the output area. It is one of the first tools you learn because it lets you see what your program did.

Technically, in Python 3, \`print()\` is a function. People sometimes say "print statement" because older lessons used that phrase, but the correct term now is print function.

Think of \`print()\` as Python saying:

> Show this to the person running the program.

~~~python
print("Hello, world!")
~~~

Output:

~~~text
Hello, world!
~~~

Python reads the instruction and displays the text inside the parentheses.

## Why are there parentheses?

Functions use parentheses. The information you want the function to use goes inside them.

~~~python
print("My name is Maya.")
~~~

The quotation marks tell Python that the words are text.

## Printing text

Text in Python is called a string. Strings usually go inside quotation marks.

~~~python
print("I am learning Python.")
print("Python is my first programming language.")
print("I want to get better at coding.")
~~~

Output:

~~~text
I am learning Python.
Python is my first programming language.
I want to get better at coding.
~~~

Each \`print()\` line creates a new line of output.

## Printing numbers

You can also print numbers. Numbers do not need quotation marks.

~~~python
print(25)
print(100)
print(3.14)
~~~

Output:

~~~text
25
100
3.14
~~~

## Why output matters

Without \`print()\`, your program can run without showing you anything.

~~~python
5 + 3
~~~

A regular script can calculate that answer and still show a blank output area. This is better:

~~~python
print(5 + 3)
~~~

Output:

~~~text
8
~~~

\`print()\` helps you see the result of your code.

## Comments

A comment is a note for humans. Python ignores comments when it runs the program.

~~~python
# This line explains the code. Python ignores it.
print("This line creates output.")
~~~

Output:

~~~text
This line creates output.
~~~

## Beginner example: About Me script

~~~python
print("My name is Maya.")
print("I am learning Python.")
print("One of my goals is to build useful programs.")
~~~

Output:

~~~text
My name is Maya.
I am learning Python.
One of my goals is to build useful programs.
~~~

This is why \`print()\` is useful in beginner lessons. You write code, run it, and immediately see the result.

## Common beginner mistakes

Forgetting quotation marks around text:

~~~python
print(Hello)
~~~

Python thinks \`Hello\` is a variable name. Use quotes for text:

~~~python
print("Hello")
~~~

Forgetting a closing parenthesis:

~~~python
print("Hello"
~~~

Correct:

~~~python
print("Hello")
~~~

Using mismatched quotation marks:

~~~python
print("Hello')
~~~

Correct:

~~~python
print("Hello")
~~~

## Your task

Run the starter code once without changing it. Then add one useful third \`print()\` line about yourself.

Before editing, find three things:

1. The comment that explains the goal.
2. The two \`print()\` lines that create output.
3. The order those lines appear in the output box.

Simple way to remember it:

> print() means: display this information on the screen.
`,
    vocabulary: ["print", "comment", "syntax", "output"],
    checks: ["I can use print().", "I can tell comments from code.", "I can read a simple syntax error."],
  },
  {
    slug: "module-02",
    title: "Variables and Data Types",
    hours: "2-3",
    sortOrder: 3,
    focus: "store values in variables and identify strings, integers, floats, and booleans",
    scenario: "You are building a profile card where each field has a predictable type.",
    practice: "Keep one starter variable, then create three more profile variables and print a readable summary.",
    starter: `name = "Your Name Here"

# TODO: create an interest variable with text in quotes.
# TODO: create a lessons_completed variable with a whole number.
# TODO: create an is_beginner variable with True or False.

print("Learner:", name)
# TODO: print Interest, Lessons completed, and Beginner lines.

# After your summary prints, keep this evidence record updated.
practice_note = {
    "concept": "variables and data types",
    "example_output": "four learner profile lines printed",
    "next_step": "inspect each variable type after the summary works",
}`,
    vocabulary: ["variable", "string", "integer", "float", "boolean"],
    checks: ["I can assign a value to a name.", "I can choose the right basic type.", "I can explain why names matter."],
  },
  {
    slug: "module-03",
    title: "Input, Conversion, and Basic Math",
    hours: "2-3",
    sortOrder: 4,
    focus: "collect user input, convert text to numbers, and calculate a result",
    scenario: "You are turning a user prompt into a small calculator instead of hard-coded output.",
    practice: "Keep one raw text value, then write the conversion, calculation, and printed result.",
    starter: `raw_minutes = "45"

# TODO: convert raw_minutes into a number named minutes.
# TODO: calculate hours from minutes.

print("Raw minutes:", raw_minutes)
# TODO: print Converted minutes and Hours lines.

# After your converter prints, keep this evidence record updated.
practice_note = {
    "concept": "input conversion",
    "example_output": "converted minutes and calculated hours printed",
    "next_step": "replace the sample text with input() after the calculation works",
}`,
    vocabulary: ["input", "conversion", "integer", "float", "expression"],
    checks: ["I can explain why input starts as text.", "I can convert when math is needed.", "I can format the result."],
  },
  {
    slug: "module-04",
    title: "Decisions and Conditional Logic",
    hours: "2-3",
    sortOrder: 5,
    focus: "use if, elif, and else to make a program choose a path",
    scenario: "You are writing a grade checker that must explain which branch ran.",
    practice: "Classify a score into pass, review, or retry. Test at least two score values so you can see two different branches without using loops yet.",
    starter: `# Start with one score. For Check Work, add a second score test below
# using the same if / elif / else shape, without a loop.
score = 84

if score >= 90:
    status = "excellent"
elif score >= 70:
    status = "pass"
else:
    status = "retry"

practice_note = {
    "concept": "conditional branches",
    "example_output": f"score {score} -> {status}",
    "next_step": "add a second straight-line score test, such as 69 and 70 or 89 and 90",
}

print(practice_note["example_output"])`,
    vocabulary: ["if", "elif", "else", "comparison", "boolean"],
    checks: ["I can read a condition.", "I can explain which branch ran.", "I can test a boundary case."],
  },
  {
    slug: "module-05",
    title: "Loops and Repetition",
    hours: "2-3",
    sortOrder: 6,
    focus: "repeat work safely with for loops, while loops, counters, and accumulators",
    scenario: "You are turning repeated print statements into a small progress report.",
    practice: "Loop through a set of lesson scores and calculate a total.",
    starter: `scores = [80, 90, 75]
total = 0

for score in scores:
    total += score

practice_note = {
    "concept": "loop accumulation",
    "example_output": f"total={total}",
    "next_step": "calculate the average after the total is correct",
}

print(practice_note["example_output"])`,
    vocabulary: ["for loop", "while loop", "counter", "accumulator"],
    checks: ["I can describe what repeats.", "I can update a total safely.", "I can avoid a runaway loop."],
  },
  {
    slug: "module-06",
    title: "Collections: Lists, Tuples, Sets, and Dictionaries",
    hours: "3-4",
    sortOrder: 7,
    focus: "choose the right collection for multiple values and structured records",
    scenario: "You are organizing course tasks so the program can search and report them.",
    practice: "Store tasks in a list of dictionaries and print incomplete task titles.",
    starter: `tasks = [
    {"title": "read lesson", "done": True},
    {"title": "run practice", "done": False},
    {"title": "save reflection", "done": False},
]

open_tasks = [task["title"] for task in tasks if not task["done"]]

practice_note = {
    "concept": "collections and records",
    "example_output": ", ".join(open_tasks),
    "next_step": "add one more task and rerun the report",
}

print(practice_note["example_output"])`,
    vocabulary: ["list", "tuple", "set", "dictionary", "record"],
    checks: ["I can pick a collection by purpose.", "I can loop through records.", "I can update one field."],
  },
  {
    slug: "module-07",
    title: "Functions and Reusable Code",
    hours: "3-4",
    sortOrder: 8,
    focus: "turn repeated logic into named functions with parameters and return values",
    scenario: "You are cleaning up repeated calculations into helpers a future script can reuse.",
    practice: "Write a function that calculates a percentage and returns a formatted label.",
    starter: `def percent_label(points, possible):
    percent = (points / possible) * 100
    return f"{percent:.1f}%"

practice_note = {
    "concept": "function return values",
    "example_output": f"score={percent_label(45, 50)}",
    "next_step": "call the function with a second score",
}

print(practice_note["example_output"])`,
    vocabulary: ["function", "parameter", "argument", "return", "scope"],
    checks: ["I can define and call a function.", "I can pass data in.", "I can return a useful result."],
  },
  {
    slug: "module-08",
    title: "Error Handling and Data Validation",
    hours: "3-4",
    sortOrder: 9,
    focus: "handle expected problems without hiding bad data",
    scenario: "You are making user input safer before the program trusts it.",
    practice: "Write a helper that converts valid numbers and returns None for bad input.",
    starter: `def safe_int(value):
    try:
        return int(value)
    except ValueError:
        return None

practice_note = {
    "concept": "defensive conversion",
    "example_output": f"converted={safe_int('42')}",
    "next_step": "test the helper with bad input like 'forty'",
}

print(practice_note["example_output"])`,
    vocabulary: ["exception", "try", "except", "ValueError", "validation"],
    checks: ["I can predict common bad input.", "I can catch the specific error.", "I can keep bad data visible."],
  },
  {
    slug: "module-09",
    title: "File Handling and Persistent Data",
    hours: "3-4",
    sortOrder: 10,
    focus: "read, write, and append files so data survives after the script exits",
    scenario: "You are saving a tiny task list instead of losing it when the program closes.",
    practice: "Model file lines as data, then prepare the line that would be written.",
    starter: `tasks = ["read lesson", "run practice", "save reflection"]
file_lines = [task + "\\n" for task in tasks]

practice_note = {
    "concept": "persistent file lines",
    "example_output": "".join(file_lines).strip(),
    "next_step": "write these lines with a with open(...) block",
}

print(practice_note["example_output"])`,
    vocabulary: ["file path", "read", "write", "append", "with block"],
    checks: ["I can explain why files persist.", "I can prepare clean lines.", "I can name the file mode."],
  },
  {
    slug: "module-10",
    title: "Modules, Imports, and the Standard Library",
    hours: "2-3",
    sortOrder: 11,
    focus: "organize helpers into modules and use standard-library tools",
    scenario: "You are moving reusable code out of one long script and into named helpers.",
    practice: "Use a standard-library module and explain why import keeps code organized.",
    starter: `from datetime import date

today = date.today().isoformat()

practice_note = {
    "concept": "imports and standard library",
    "example_output": f"today={today}",
    "next_step": "move one helper function into a separate module",
}

print(practice_note["example_output"])`,
    vocabulary: ["module", "import", "standard library", "namespace"],
    checks: ["I can import a tool.", "I can explain where helper code belongs.", "I can avoid circular confusion."],
  },
  {
    slug: "module-11",
    title: "Object-Oriented Programming: Classes and Objects",
    hours: "3-4",
    sortOrder: 12,
    focus: "model related data and behavior with classes, objects, attributes, and methods",
    scenario: "You are replacing loose dictionaries with a Student object that owns its summary behavior.",
    practice: "Create a small class and call one method.",
    starter: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def summary(self):
        return f"{self.name}: {self.score}"

student = Student("Alex", 92)

practice_note = {
    "concept": "class and object",
    "example_output": student.summary(),
    "next_step": "add a method that returns pass or review",
}

print(practice_note["example_output"])`,
    vocabulary: ["class", "object", "attribute", "method", "self"],
    checks: ["I can create an object.", "I can explain self.", "I can call a method."],
  },
  {
    slug: "module-12",
    title: "Object-Oriented Design: Inheritance and Dataclasses",
    hours: "3-4",
    sortOrder: 13,
    focus: "use dataclasses and simple design choices before reaching for inheritance",
    scenario: "You are modeling records cleanly without overbuilding a class hierarchy.",
    practice: "Create a dataclass for a course task and summarize it.",
    starter: `from dataclasses import dataclass

@dataclass
class CourseTask:
    title: str
    points: int

task = CourseTask("practice", 10)

practice_note = {
    "concept": "dataclass records",
    "example_output": f"{task.title}:{task.points}",
    "next_step": "decide whether behavior belongs in a method or a separate function",
}

print(practice_note["example_output"])`,
    vocabulary: ["dataclass", "inheritance", "composition", "design"],
    checks: ["I can use a dataclass for data.", "I can avoid premature inheritance.", "I can name where behavior belongs."],
  },
  {
    slug: "module-13",
    title: "Advanced Strings, Formatting, and Regular Expressions",
    hours: "3-4",
    sortOrder: 14,
    focus: "clean text, format reports, and use regular expressions for supported pattern checks",
    scenario: "You are parsing messy text into a clean report field.",
    practice: "Normalize a small list of names and identify entries with a digit.",
    starter: `import re

names = [" ada ", "Grace", "user42"]
cleaned = [name.strip().title() for name in names]
with_digits = [name for name in cleaned if re.search(r"\\d", name)]

practice_note = {
    "concept": "string cleanup and regex",
    "example_output": ", ".join(with_digits),
    "next_step": "explain when a normal string method is enough",
}

print(practice_note["example_output"])`,
    vocabulary: ["strip", "split", "join", "formatting", "regex"],
    checks: ["I can clean whitespace.", "I can format output.", "I can keep regex scoped to a clear pattern."],
  },
  {
    slug: "module-14",
    title: "Math, Statistics, and Data Processing Foundations",
    hours: "3-4",
    sortOrder: 15,
    focus: "calculate totals, averages, and summaries without losing track of data quality",
    scenario: "You are turning a list of scores into a small evidence summary.",
    practice: "Calculate count, total, average, min, and max for sample scores.",
    starter: `scores = [88, 92, 75, 100]
summary = {
    "count": len(scores),
    "total": sum(scores),
    "average": sum(scores) / len(scores),
    "minimum": min(scores),
    "maximum": max(scores),
}

practice_note = {
    "concept": "summary statistics",
    "example_output": f"average={summary['average']:.1f}",
    "next_step": "handle an empty score list safely",
}

print(practice_note["example_output"])`,
    vocabulary: ["sum", "average", "minimum", "maximum", "rounding"],
    checks: ["I can calculate a summary.", "I can explain float output.", "I can plan for empty data."],
  },
  {
    slug: "module-15",
    title: "Dates, Times, Scheduling, and Timestamps",
    hours: "2-3",
    sortOrder: 16,
    focus: "work with dates and timestamps in practical scripts",
    scenario: "You are adding due dates to tasks so a program can sort and report them.",
    practice: "Parse a due date and calculate how many days remain.",
    starter: `from datetime import date

due = date.fromisoformat("2026-06-15")
today = date(2026, 5, 29)
days_left = (due - today).days

practice_note = {
    "concept": "date calculation",
    "example_output": f"days_left={days_left}",
    "next_step": "replace the fixed today value with date.today()",
}

print(practice_note["example_output"])`,
    vocabulary: ["date", "datetime", "timestamp", "strftime", "strptime"],
    checks: ["I can parse a date.", "I can calculate a difference.", "I can format dates for humans."],
  },
  {
    slug: "module-16",
    title: "Debugging, Testing, and Logging Foundations",
    hours: "3-4",
    sortOrder: 17,
    focus: "debug by reading errors, testing small behavior, and logging useful signals",
    scenario: "You are turning a fragile helper into something you can test and diagnose.",
    practice: "Write a small assertion-style check for one function.",
    starter: `def add_points(current, earned):
    return current + earned

expected = 15
actual = add_points(10, 5)

practice_note = {
    "concept": "debugging and tests",
    "example_output": f"expected={expected}, actual={actual}",
    "next_step": "add one failing test before changing the function",
}

print(practice_note["example_output"])`,
    vocabulary: ["syntax error", "runtime error", "logic error", "test", "logging"],
    checks: ["I can read the error location.", "I can compare expected and actual output.", "I can log useful context."],
  },
  {
    slug: "module-17",
    title: "Packages, Virtual Environments, and Project Structure",
    hours: "2-3",
    sortOrder: 18,
    focus: "structure projects and understand why virtual environments protect dependencies",
    scenario: "You are preparing a project folder that another developer could understand.",
    practice: "Represent a small project tree and explain each folder's job.",
    starter: `project_tree = {
    "src": "application code",
    "tests": "checks for behavior",
    "README.md": "how to run the project",
    "requirements.txt": "package record for this project",
}

dependency_record = {
    "environment": ".venv keeps packages inside this project",
    "installer": "pip installs packages into the active environment",
    "package_record": "requirements.txt lists the packages another developer needs",
}

practice_note = {
    "concept": "project structure and dependency safety",
    "example_output": ", ".join(project_tree.keys()),
    "next_step": "create a virtual environment, install one package, then record it in requirements.txt",
}

print(practice_note["example_output"])
print(dependency_record["environment"])`,
    vocabulary: ["package", "virtual environment", "pip", "requirements", "project tree"],
    checks: ["I can explain why environments matter.", "I can name common project files.", "I can avoid global package confusion."],
    lessonBridge: `## Package Safety Map

This room is not asking you to install packages in the browser. It is teaching the safety map before commands:

| Piece | Plain meaning | Why it matters |
| --- | --- | --- |
| Project folder | The home for one app or script collection. | A reviewer can find code, tests, notes, and run instructions. |
| Virtual environment | A local package space for this project. | Installing a package for one project does not quietly change another project. |
| pip | The installer that adds Python packages to the active environment. | You should know which environment receives the package before installing. |
| requirements.txt | A text record of package names and versions. | Another developer can rebuild the same project setup instead of guessing. |

Read the chain in order: project folder, environment, installer, package record. If you skip the environment, packages can land globally and make one project depend on hidden computer state. If you skip the package record, another learner cannot tell what the project needs.

The browser workspace models the decision with Python data. Real terminal commands come later, after you can explain what each setup piece protects.`,
  },
  {
    slug: "module-18",
    title: "Command-Line Arguments, Environment Variables, and Configuration",
    hours: "3-4",
    sortOrder: 19,
    focus: "separate configuration from code and read command-line intent safely",
    scenario: "You are making a script configurable without editing source every time.",
    practice: "Model a command configuration and validate required fields.",
    starter: `config = {
    "mode": "report",
    "output": "summary.txt",
    "debug": False,
}

practice_note = {
    "concept": "configuration",
    "example_output": f"mode={config['mode']}, output={config['output']}",
    "next_step": "decide which values belong in args, env vars, or config files",
}

print(practice_note["example_output"])`,
    vocabulary: ["argument", "environment variable", "configuration", "sys.argv"],
    checks: ["I can explain what should be configurable.", "I can validate missing values.", "I can avoid putting secrets in code."],
  },
  {
    slug: "module-19",
    title: "Advanced File Handling and Filesystem Automation",
    hours: "3-4",
    sortOrder: 20,
    focus: "inspect filesystem state before automating file moves, renames, or cleanup",
    scenario: "You are building a safe organizer that previews work before touching files.",
    practice: "Create a dry-run plan for moving files based on extension.",
    starter: `files = ["notes.txt", "scores.csv", "photo.png"]
plan = [{"file": name, "action": "review"} for name in files]

practice_note = {
    "concept": "filesystem dry run",
    "example_output": str(plan[0]),
    "next_step": "print the plan before moving or deleting anything",
}

print(practice_note["example_output"])`,
    vocabulary: ["pathlib", "dry run", "rename", "move", "delete"],
    checks: ["I can preview file actions.", "I can avoid destructive surprises.", "I can explain the target folder."],
  },
  {
    slug: "module-20",
    title: "CSV, JSON, and Data Transformation Workflows",
    hours: "4-5",
    sortOrder: 21,
    focus: "transform structured data between rows, dictionaries, CSV-style records, and JSON-style output",
    scenario: "You are turning raw rows into a clean report for a final Python project.",
    practice: "Read sample records, clean valid rows, count invalid rows, and print a small summary report for a project, school, work, or team use case.",
    starter: `import json

rows = [
    {"name": "Ada", "score": "95", "team": "project"},
    {"name": "Grace", "score": "88", "team": "school"},
    {"name": "Missing", "score": "", "team": "school"},
]

cleaned_records = []
invalid_count = 0

for row in rows:
    if row["score"].isdigit():
        cleaned_records.append({
            "name": row["name"].strip(),
            "score": int(row["score"]),
            "team": row["team"].strip().title(),
        })
    else:
        invalid_count += 1

valid_scores = [record["score"] for record in cleaned_records]
summary = {
    "valid_count": len(cleaned_records),
    "invalid_count": invalid_count,
    "average_score": sum(valid_scores) / len(valid_scores),
}

practice_note = {
    "concept": "data transformation workflow",
    "example_output": f"average={summary['average_score']:.1f}, invalid={summary['invalid_count']}",
    "next_step": "write the cleaned records as JSON after validating each row",
}

print("Cleaned rows:")
print(json.dumps(cleaned_records, indent=2))
print("Summary report:")
print(f"Valid rows: {summary['valid_count']}")
print(f"Invalid rows: {summary['invalid_count']}")
print(f"Average score: {summary['average_score']:.1f}")
print("This helps a project, school, work, or team review clean scores before exporting JSON.")`,
    vocabulary: ["CSV", "JSON", "row", "dictionary", "transformation"],
    checks: ["I can validate row data.", "I can transform strings into numbers.", "I can summarize clean records."],
  },
  {
    slug: "module-21",
    title: "Portfolio Capstone: Progress Tracker and Reporting Tool",
    hours: "15-25",
    sortOrder: 22,
    focus: "combine the course skills into one command-line Python progress tracker with files, reports, tests, documentation, and portfolio proof",
    scenario:
      "You are building a small progress tracker/reporting tool that can record learning tasks, data cleanup work, support notes, QA checks, and automation follow-ups. The goal is portfolio evidence for realistic entry-level paths, not a hiring promise.",
    practice:
      "Create a capstone implementation plan with required features, entry-level lanes, item fields, commands, validation rules, tests, and next build step.",
    starter: `capstone_plan = {
    "project": "Portfolio Progress Tracker and Reporting Tool",
    "purpose": "track tasks, data cleanup, support notes, QA checks, and automation follow-ups",
    "portfolio_lanes": [
        "Data Assistant/Reporting Assistant",
        "Operations Automation Assistant",
        "IT Support/Helpdesk Automation Trainee",
        "QA/Testing Assistant",
        "Technical Assistant",
        "Python Internship Candidate",
    ],
    "features": ["add item", "tag lane", "list open items", "complete item", "summary report", "export csv"],
    "storage": "JSON progress file plus CSV report export",
    "commands": ["--help", "--add", "--list", "--complete", "--summary", "--export"],
    "tests": ["lane validation", "status validation", "item creation", "summary report creation"],
}

practice_note = {
    "concept": "portfolio capstone planning",
    "example_output": f"{capstone_plan['project']} has {len(capstone_plan['features'])} core features",
    "next_step": "build the progress item data model before wiring command-line arguments",
}

print(practice_note["example_output"])`,
    vocabulary: ["capstone", "command-line application", "JSON", "CSV", "test"],
    checks: [
      "I can name the required progress tracker/reporting features.",
      "I can connect the project to data, automation, support, QA, and portfolio proof.",
      "I can list commands, validation, tests, and documentation needed for the final build.",
    ],
  },
  {
    slug: "module-22",
    title: "Graduation Certificate",
    hours: "0",
    sortOrder: 23,
    focus: "present the learner certificate, credential verification link, downloadable PDF, and email signature badges",
    scenario:
      "This final course page presents the learner's TechNodeX Certificate of Completion. It is not a teaching room. It is a credential display and download page the learner can share with an employer, portfolio reviewer, or professional contact.",
    practice:
      "Download the certificate PDF, copy the verification URL, and download an email signature badge if desired.",
    starter: `certificate_data = {
    "student_name": "Student Name",
    "course_name": "Python: Zero to Useful",
    "issue_date": "June 7, 2026",
    "credential_id": "TNX-PZU-2026-0001",
    "verify_url": "https://technodex.io/verify/TNX-PZU-2026-0001",
}`,
    vocabulary: ["certificate", "credential ID", "verification URL", "portfolio"],
    checks: [
      "I can download the course certificate PDF.",
      "I can find the credential ID and verification URL.",
      "I can download a badge for an email signature block.",
    ],
  },];

const PYTHON_ZERO_BRIDGES: Record<string, PythonZeroBridge> = {
  "module-00": {
    steps: [
      "Name where your Python files will live before changing anything.",
      "Separate the editor, terminal, interpreter, script, and printed output.",
      "Run the starter to prove the browser workspace can execute Python.",
      "Record the project goal you want Python to help with later.",
      "Save the next setup step in the practice note so the work has a trail.",
    ],
    delay:
      "Do not start by changing setup commands. First say where the script lives, how Python runs it, and what output proves the workspace is ready.",
  },
  "module-01": {
    steps: [
      "Name the purpose of the first script before adding more lines.",
      "Read the two starter print lines as two visible results.",
      "Add a third useful print line so Check Work can see your own output.",
      "Use comments to explain intent, not to hide broken code.",
      "Run the script and compare the output order to the code order.",
      "Change one printed value after the three-line output makes sense.",
    ],
    delay:
      "Do not start by adding a long program. First say what the two starter lines print, what useful third line you will add, and what output proves it ran correctly.",
  },
  "module-02": {
    steps: [
      "Name each value before naming the variable.",
      "Match the value to its type: text, whole number, decimal, or true/false.",
      "Use a readable variable name that explains the data.",
      "Print a summary that proves the stored values are being used.",
      "Inspect one type after the summary output is clear.",
    ],
    delay:
      "Do not start by renaming everything. First say what value is stored, what type it is, and how the printed summary proves the variable is useful.",
  },
  "module-03": {
    steps: [
      "Treat user input as text until the program proves otherwise.",
      "Name the conversion needed before doing math.",
      "Run the calculation with sample data first.",
      "Format the result so a person can read it.",
      "Replace the sample with input only after the conversion path works.",
    ],
    delay:
      "Do not start by adding input prompts. First say which text must become a number, what calculation should happen, and what output proves the conversion worked.",
  },
  "module-04": {
    steps: [
      "Name the value the decision depends on.",
      "Read the conditions from most specific to least specific.",
      "Predict which branch should run before executing the code.",
      "Test at least two score values so two different branches are visible.",
      "Use straight-line code for the second test; loops start in the next room.",
      "Record the branch result in the practice note.",
    ],
    delay:
      "Do not start by adding loops or many branches. First say what condition is being tested, which two score values should run different branches, and what output proves the logic is honest.",
  },
  "module-05": {
    steps: [
      "Name the collection or condition that controls repetition.",
      "Identify the one line that changes each pass through the loop.",
      "Track the accumulator or counter before calculating anything extra.",
      "Run the starter and check that the loop stops.",
      "Add the next calculation only after the repeated work is predictable.",
    ],
    delay:
      "Do not start by nesting loops. First say what repeats, what changes each time, how the loop stops, and what output proves the total is correct.",
  },
  "module-06": {
    steps: [
      "Choose the collection by purpose before writing syntax.",
      "Read each dictionary as a record with named fields.",
      "Find the field that decides whether a task is open.",
      "Print the filtered result before changing the data shape.",
      "Update one record after the report is understandable.",
    ],
    delay:
      "Do not start by converting every collection. First say why this data is a list of records, which field is checked, and what output proves the filter worked.",
  },
  "module-07": {
    steps: [
      "Name the repeated job the function should own.",
      "Separate inputs from the returned result.",
      "Call the function once with known values.",
      "Read the return value before adding another helper.",
      "Call it a second time only after the first call is clear.",
    ],
    delay:
      "Do not start by writing several helpers. First say what the function receives, what it returns, and what output proves the reusable behavior works.",
  },
  "module-08": {
    steps: [
      "Name the bad input you expect before handling errors.",
      "Catch the specific exception that conversion can raise.",
      "Return a visible fallback instead of hiding the problem.",
      "Test one good value and one bad value.",
      "Record what the helper did with each case.",
    ],
    delay:
      "Do not start by catching every error. First say what input can fail, which error is expected, and what output proves bad data stayed visible.",
  },
  "module-09": {
    steps: [
      "Read the in-memory data before thinking about the file.",
      "Prepare clean file lines with the newline where it belongs.",
      "Name the file mode before opening a file.",
      "Use a with block only after the line format is clear.",
      "Record what would persist after the script exits.",
    ],
    delay:
      "Do not start by writing to disk. First say what data should be saved, how each line should look, and which file mode fits the job.",
  },
  "module-10": {
    steps: [
      "Name the helper or tool before importing it.",
      "Ask whether the standard library already solves the problem.",
      "Read the imported name as part of the script's namespace.",
      "Keep reusable helper code out of one long script.",
      "Move one helper only after the single-file version is clear.",
    ],
    delay:
      "Do not start by adding package imports. First say what tool is needed, where it comes from, and how the output proves the imported helper was used.",
  },
  "module-11": {
    steps: [
      "Name the real thing the class represents.",
      "Separate attributes from behavior.",
      "Create one object with sample data.",
      "Call one method and read its output.",
      "Explain self as the object being worked on.",
    ],
    delay:
      "Do not start by building a class hierarchy. First say what object is being modeled, what data it owns, and what method proves the behavior belongs there.",
  },
  "module-12": {
    steps: [
      "Decide whether the room needs a simple data record first.",
      "Use a dataclass when the fields matter more than custom setup.",
      "Name behavior separately from stored data.",
      "Reach for composition before inheritance unless there is a clear relationship.",
      "Summarize one record before designing a bigger model.",
    ],
    delay:
      "Do not start by adding inheritance. First say what fields the record needs, what behavior belongs with it, and why a smaller design is enough.",
  },
  "module-13": {
    steps: [
      "Read the messy text exactly as it arrives.",
      "Try normal string methods before using a pattern.",
      "Name the pattern regex is supposed to prove.",
      "Keep the regex small enough to explain.",
      "Print the cleaned or matched result before expanding the rule.",
    ],
    delay:
      "Do not start by writing a complex regex. First say what text needs cleaning, which string method helps, and what small pattern is worth checking.",
  },
  "module-14": {
    steps: [
      "Check that the data list has values before calculating.",
      "Name each summary: count, total, average, minimum, and maximum.",
      "Watch where float output appears.",
      "Plan the empty-data behavior before trusting the average.",
      "Print one readable summary line.",
    ],
    delay:
      "Do not start by importing statistics tools. First say what numbers are valid, which summary is needed, and how the program should behave when data is empty.",
  },
  "module-15": {
    steps: [
      "Name the date format before parsing it.",
      "Convert text into a date object before subtracting.",
      "Use a fixed today value while learning the calculation.",
      "Calculate the difference and read the units.",
      "Replace the fixed value only after the date math is clear.",
    ],
    delay:
      "Do not start by adding scheduling features. First say what date format enters the program, what date it becomes, and what output proves the difference is correct.",
  },
  "module-16": {
    steps: [
      "Name the behavior you expect before debugging.",
      "Compare expected output to actual output.",
      "Use one small test before changing the function.",
      "Log only the context that helps explain the failure.",
      "Fix the smallest confirmed problem first.",
    ],
    delay:
      "Do not start by rewriting the function. First say what should happen, what actually happened, and which small check proves the behavior.",
  },
  "module-17": {
    steps: [
      "Read the project tree as a map of responsibilities.",
      "Name what belongs in src, tests, and README.md.",
      "Explain why dependencies should stay inside a virtual environment.",
      "List the package record before installing anything.",
      "Write the run instructions before adding folders.",
    ],
    delay:
      "Do not start by installing packages. First say what each folder is for, why the environment protects the project, and how another learner would run it.",
  },
  "module-18": {
    steps: [
      "Name what should change without editing source code.",
      "Choose whether a value belongs in args, environment variables, or a config file.",
      "Mark required values before reading them.",
      "Keep secrets out of printed output and committed code.",
      "Validate the configuration before the script does real work.",
    ],
    delay:
      "Do not start by wiring command-line parsing. First say what the user needs to configure, where each value belongs, and what validation protects the script.",
  },
  "module-19": {
    steps: [
      "Inventory the files before planning actions.",
      "Create a dry-run plan before moving, renaming, or deleting.",
      "Name the target folder or review action for each file.",
      "Print the plan so the user can catch mistakes.",
      "Only automate after the preview is safe and explainable.",
    ],
    delay:
      "Do not start by touching real files. First say what files exist, what action is planned, and what dry-run output proves the automation is safe.",
  },
  "module-20": {
    steps: [
      "Read each row as incoming structured data.",
      "Validate text fields before converting them.",
      "Convert only the values proven safe.",
      "Summarize clean records separately from rejected data.",
      "Choose CSV or JSON output after the transformation is clear.",
    ],
    delay:
      "Do not start by exporting data. First say which rows are valid, what type conversion is needed, and what summary proves the transformation worked.",
  },
  "module-21": {
    steps: [
      "Name the user problem the progress tracker/reporting tool solves.",
      "Connect the tool to realistic entry-level proof: data, automation, support, QA, and technical assistant work.",
      "Define the progress item data model before commands.",
      "List the command behaviors before storage details.",
      "Choose JSON and CSV roles before writing files.",
      "Plan tests before wiring the final command-line flow.",
    ],
    delay:
      "Do not start by building the whole app. First say what the tracker stores, which entry-level lane it supports, which commands matter, what validation protects the data, and which tests prove the core behavior.",
  },
  "module-22": {
    steps: [
      "Review the certificate display for learner name, course, issue date, credential ID, and verification URL.",
      "Download the certificate PDF for portfolio or employer sharing.",
      "Download the email signature badge version if the learner wants a smaller professional proof block.",
      "Use the verification URL when listing the credential on a profile, portfolio, or resume.",
    ],
    delay:
      "This is not a coding lesson. It is the credential presentation and download page for completed course proof.",
  },
};


function tableRows(items: string[]) {
  return items
    .map((item) => {
      const definition = PYTHON_ZERO_VOCABULARY_DEFINITIONS[item];
      if (!definition) {
        throw new Error(`Missing Python Zero vocabulary definition for ${item}`);
      }
      return `| ${item} | ${definition} |`;
    })
    .join("\n");
}

function numberedList(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function buildContent(module: PythonZeroModule) {
  const bridge = PYTHON_ZERO_BRIDGES[module.slug];
  if (!bridge) {
    throw new Error(`Missing Python Zero clean-pass map for ${module.slug}`);
  }

  const capstoneNote =
    module.slug === "module-21"
      ? "This capstone room turns the course skills into a hosted planning and proof room for a portfolio progress tracker/reporting tool. The project can grow beyond the starter later, but this room still requires runnable Python evidence before completion."
      : module.slug === "module-22"
        ? "This graduation page presents the completed course certificate, credential ID, verification URL, PDF download, and email signature badge assets."
        : "It builds toward a portfolio capstone: a progress tracker/reporting tool connected to realistic entry-level lanes such as Data Assistant/Reporting Assistant, Operations Automation Assistant, IT Support/Helpdesk Automation Trainee, QA/Testing Assistant, Technical Assistant, and Python Internship Candidate.";

  return `# ${module.title}

## Start Here: Concept Before Copying Code

${module.scenario} The goal is not to download a folder, run a finished answer, and move on. The goal is to understand the smallest useful idea, run one safe example, and save evidence that you can explain.

This room focuses on how to ${module.focus}. Treat the code as a training target: inspect it first, change one thing, then prove the output.

## How to Use This Room Screen

- Learn: read the plain-English goal before touching the editor.
- Inspect: find the comment, the print lines, and the output order in the starter code.
- Build: make one small change in the browser practice workspace.
- Prove: run Check Work and save a reflection that names what changed.

"Practice after the lesson" means the editor is there after the idea is clear. If the Python looks like a wall, come back to this screen and ask: what is the room goal, what line creates output, what changed, and how would I explain it?

## One Clean Pass Through This Room

Before the workspace, make one clean pass through the room:

${numberedList(bridge.steps)}

${bridge.delay}

That pass is your first proof of understanding. The code is still important, but it should confirm a concept you can already describe instead of becoming a wall of syntax.

## What the Workspace Will Ask You To Do

| Workspace item | What it proves |
| --- | --- |
| practice reflection | You can describe the concept, output, and next step. |
| starter code | You can run a small Python example in the browser. |
| one small edit | You can change behavior deliberately. |
| printed output | You can connect code to an observable result. |
| saved reflection | You can explain what happened in your own words. |

## Your First Ten Minutes

1. Read the room goal without editing.
2. Run the starter unchanged.
3. Identify the line that creates the output.
4. Make one small edit that matches the room goal.
5. Run Check Work only after you can explain the output.

## Before You Run It

Read the example first. Find the line that makes output appear, then run the starter once before you change it. After that, make one small edit you can explain in your own words.

## Learn

${module.title} is part of the Python Zero to Useful path. ${capstoneNote}

${module.lessonBridge ? `${module.lessonBridge}\n` : ""}

### Key Vocabulary

| Term | Room meaning |
| --- | --- |
${tableRows(module.vocabulary)}

## Inspect

Read the starter as a shape:

| Part | Question to ask |
| --- | --- |
| Input or sample data | What value does the program start with? |
| Processing step | What line changes or organizes the data? |
| Output | What line proves the behavior? |
| practice note | What will I write down as proof? |

~~~python
${module.starter}
~~~

## Build and prove

| Build | Prove |
| --- | --- |
| ${module.practice} Keep the change small enough that you can explain it without guessing. | Before marking the room complete, make sure these are true: ${module.checks.join("; ")} Then run Check Work and save a reflection with: concept practiced; output seen; change made; next thing to try. |
`;
}

function quizFor() {
  return [
    {
      type: "multiple_choice",
      question: "What is the correct way to use this room?",
      options: [
        "Read the concept, run the starter, make one small change, then explain the result",
        "Paste a full finished project and skip the explanation",
        "Skip the browser workspace and read passively",
        "Mark complete before running the practice workspace",
      ],
      correct: 0,
      explanation:
        "TechNodeX rooms are built around small observable practice and learner-owned evidence, not blind copy/paste work.",
    },
    {
      type: "multiple_choice",
      question: "What should your saved reflection prove?",
      options: [
        "That you can connect the Python concept to the output you observed",
        "That every advanced Python topic is mastered immediately",
        "That the code was copied exactly from the lesson",
        "That setup problems can be ignored",
      ],
      correct: 0,
      explanation:
        "A useful reflection names the concept, the output, the change, and the next step in your own words.",
    },
  ];
}

export const PYTHON_ZERO_COURSE = {
  slug: "python-zero",
  title: "Python Zero to Useful",
  description:
    "A beginner-to-intermediate Python path with browser practice, Check Work, debugging feedback, and a portfolio capstone: a progress tracker/reporting tool for realistic entry-level lanes like data/reporting, operations automation, support automation, QA, technical assistant work, and Python internships.",
  icon: "PY",
  difficulty: "Beginner",
  hours: "70-95",
  topics: ["Python", "Programming Foundations", "Automation", "Data Handling", "Portfolio Capstone"],
  certBadges: ["Python Foundations", "Progress Tracker Portfolio"],
  stages: PYTHON_ZERO_MODULES.map((module) => ({
    slug: module.slug,
    title: module.title,
    hours: module.hours,
    sortOrder: module.sortOrder,
    content: buildContent(module),
    quiz: quizFor(),
  })),
};
