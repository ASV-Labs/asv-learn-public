# Course Orientation: Meet Python on Your Computer

## Why this lesson exists

**Python Zero to Useful** is a beginner course. You do not need to already know what Python is, where it lives on your computer, or how to run a program.

This ASV Learn prototype does **not** currently give you a built-in “type code here and watch it run” workspace in the lesson page. So before Module 01, you will:

1. Understand what Python is (in plain English)
2. Find out whether Python is already on your computer
3. Install it if it is missing
4. Create a tiny file
5. Run that file and see printed output

If you can do those five things, you are ready for the rest of the course.

## What Python is

Python is a **programming language**: a way to write instructions that a computer can follow.

Think of three layers:

| Piece | What it is | Everyday analogy |
| --- | --- | --- |
| **Python language** | The words and rules (`print`, `if`, lists, …) | English grammar |
| **Python interpreter** | The program that reads your file and carries out the instructions | A person who reads a recipe and cooks |
| **Your script** | A text file ending in `.py` that holds your instructions | The recipe on paper |

When people say “run Python,” they usually mean: ask the interpreter to open your `.py` file and execute it line by line.

You will often see two command names:

- `python3` — common on macOS and Linux
- `python` — common on Windows (and sometimes also on Mac/Linux)

If one fails, try the other. In this course we prefer `python3` when it exists.

## What you will use for this course

| Tool | Role |
| --- | --- |
| **Terminal** (macOS/Linux) or **Command Prompt / PowerShell** (Windows) | Where you type commands like `python3 --version` |
| **A text editor** | Where you write `.py` files (VS Code, Cursor, Notepad, TextEdit, …) |
| **A folder for this course** | A home for your scripts so you always know where they live |

You do **not** need a fancy IDE to start. A simple editor plus a terminal is enough.

## Step 1 — Open a terminal

**macOS**

1. Press `Command + Space`, type `Terminal`, press Return.
2. Or: Applications → Utilities → Terminal.

**Windows**

1. Press the Windows key, type `PowerShell` or `Command Prompt`, open it.
2. Or right-click Start → Windows Terminal / Terminal if you have it.

**Linux**

1. Open your distribution’s Terminal app (often `Ctrl + Alt + T`).

You should see a blinking cursor waiting for a command. That is normal.

## Step 2 — Check whether Python is already installed

Type this and press Enter:

```bash
python3 --version
```

If that fails, try:

```bash
python --version
```

### How to read the result

**Success looks like:**

```text
Python 3.12.2
```

Any `Python 3.x.y` is fine for this course (3.10+ preferred).

**Failure looks like** “command not found”, “not recognized”, or similar. That means the interpreter is not installed, or it is installed but not on your PATH (your computer does not know where to find it yet). Continue to Step 3.

## Step 3 — Install Python if you need it

Pick your operating system. Take your time. Installing tools is part of learning to program.

### macOS

**Option A — Official installer (clearest for beginners)**

1. Open [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Download the latest **macOS** installer.
3. Run it. On the install screens, leave defaults unless you know you need something else.
4. When finished, **quit and reopen Terminal**.
5. Run `python3 --version` again.

**Option B — Homebrew (if you already use it)**

```bash
brew install python
```

Then reopen Terminal and run `python3 --version`.

**Note:** macOS sometimes ships an older `python3` from Apple, or none that is useful. After installing from python.org or Homebrew, use the version those tools provide.

### Windows

1. Open [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
2. Download the latest **Windows installer** (64-bit for most PCs).
3. Run the installer.
4. **Important:** on the first screen, check **“Add python.exe to PATH”**.
5. Choose “Install Now”.
6. Close and reopen PowerShell / Command Prompt.
7. Run:

```bash
python --version
```

If that works, you are set. You can also try `python3 --version`; on Windows `python` is usually the main command.

If Windows opens the Microsoft Store instead of showing a version, go back to python.org, reinstall, and make sure **Add to PATH** is checked.

### Linux

Use your package manager. Examples:

**Debian / Ubuntu**

```bash
sudo apt update
sudo apt install python3
python3 --version
```

**Fedora**

```bash
sudo dnf install python3
python3 --version
```

**Arch**

```bash
sudo pacman -S python
python3 --version
```

If you are unsure which family your distro belongs to, search “install python3 on \<your distro name\>” and use the official docs for that distro.

## Step 4 — Make a course folder

Keep all course scripts in one place.

**macOS / Linux**

```bash
mkdir -p ~/asv-learn-python-zero
cd ~/asv-learn-python-zero
pwd
```

`pwd` prints the folder path. Write that path down if it helps.

**Windows (PowerShell)**

```powershell
mkdir $HOME\asv-learn-python-zero
cd $HOME\asv-learn-python-zero
pwd
```

## Step 5 — Create your first script

In that folder, create a file named `hello.py`.

**Using a code editor (recommended)**

1. Open VS Code, Cursor, or another editor.
2. Open the `asv-learn-python-zero` folder.
3. New file → name it `hello.py`.
4. Paste exactly:

```python
# hello.py — first proof that Python runs on this computer
print("Hello from ASV Labs Learn")
print("Python is running this file.")
```

5. Save the file.

**Using the terminal only (optional)**

macOS / Linux:

```bash
cat > hello.py << 'EOF'
# hello.py — first proof that Python runs on this computer
print("Hello from ASV Labs Learn")
print("Python is running this file.")
EOF
```

Windows PowerShell:

```powershell
@"
# hello.py — first proof that Python runs on this computer
print("Hello from ASV Labs Learn")
print("Python is running this file.")
"@ | Set-Content -Encoding utf8 hello.py
```

## Step 6 — Run the script and watch the output

Make sure your terminal is **inside** the course folder (`cd` there if needed). Then:

**macOS / Linux**

```bash
python3 hello.py
```

**Windows**

```bash
python hello.py
```

### What success looks like

```text
Hello from ASV Labs Learn
Python is running this file.
```

Those two lines are **output**: proof the interpreter read your file and executed `print(...)`.

### If it fails

| Symptom | What to try |
| --- | --- |
| `can't open file 'hello.py'` | You are in the wrong folder. `cd` into `asv-learn-python-zero` and run `ls` (Mac/Linux) or `dir` (Windows) until you see `hello.py`. |
| `command not found` / `not recognized` | Python is missing or not on PATH. Return to Step 2–3. Reopen the terminal after install. |
| Wrong or old version | Run `python3 --version` / `python --version` and confirm you are on Python 3. |
| File opens in Notepad instead of running | You typed the filename alone. You must type `python3 hello.py` (or `python hello.py`). |

## Step 7 — Make one small change (prove you control it)

1. Edit `hello.py`.
2. Change the first message to include your name, for example:

```python
print("Hello from Charles — ASV Labs Learn")
print("Python is running this file.")
```

3. Save.
4. Run the file again with the same command as Step 6.
5. Confirm the new text appears.

That loop — **edit → save → run → read output** — is the core practice rhythm for this course until an in-platform runner is available.

## How later modules will work here

Until we enable in-lesson code execution on this platform:

1. Read the lesson concept in ASV Learn.
2. Copy or type the starter into a `.py` file in your course folder.
3. Run it locally with `python3` / `python`.
4. Make one small change you can explain.
5. Keep a short note: what you ran, what you saw, what you changed next.

You do **not** need cloud sandboxes to finish Module 00. You need a working local Python and one successful `print`.

## Proof checklist before Module 01

Check these off:

- [ ] I can explain Python in one sentence (language + interpreter + script).
- [ ] `python3 --version` or `python --version` prints a Python 3 version.
- [ ] I have a folder named `asv-learn-python-zero` (or equivalent).
- [ ] `hello.py` exists in that folder.
- [ ] Running the file prints two lines of output.
- [ ] I changed one line, re-ran, and saw the new output.

When all boxes are true, continue to **First Programs and Basic Output**.

## Stuck? Capture these facts

If you ask for help, include:

1. Operating system (macOS / Windows / Linux + version if known)
2. Exact command you typed
3. Exact error text (copy/paste)
4. Output of `python3 --version` and `python --version` (or say both failed)
5. Whether `hello.py` shows up when you list the folder

That information turns a vague “it doesn’t work” into a fixable problem.
