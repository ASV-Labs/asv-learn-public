# Command-Line Arguments, Environment Variables, and Configuration

## Why this lesson exists

Hard-coding every setting inside a script works for tiny demos. Useful tools let the person running the program choose **mode**, **output file**, or **debug** without editing source every time.

Configuration can come from:

1. **Command-line arguments** — values typed after the script name
2. **Environment variables** — values supplied by the operating environment
3. **Defaults in code** — safe fallbacks when nothing else is provided

In this lesson you will:

1. Separate configuration from core logic
2. Read arguments with `argparse` (with a clear `sys.argv` mental model)
3. Read an optional environment variable
4. Print a clear config summary from `run_config.py`

Still local: edit a `.py` file, run it, read the terminal.

## Reminder: where you work

```bash
cd ~/asv-learn-python-zero
```

Windows:

```powershell
cd $HOME\asv-learn-python-zero
```

You will create `run_config.py`.

## Command-line arguments in plain English

When you run:

```bash
python3 run_config.py --mode report --output summary.txt
```

the operating system passes those extra tokens to Python. Internally they appear in `sys.argv` as a list of strings:

```text
['run_config.py', '--mode', 'report', '--output', 'summary.txt']
```

`argparse` reads that list for you, builds helpful `--help` text, and converts flags into a simple object you can use.

## Defaults, args, and environment variables

A practical rule:

| Source | Good for |
| --- | --- |
| Defaults in code | Safe beginner values (`mode="report"`, `debug=False`) |
| CLI arguments | Things the user changes often (mode, output path) |
| Environment variables | Machine-specific or slightly sensitive settings (API keys later — never print secrets) |

For this lesson, use an environment variable only as an optional override for `mode`, and keep printing safe.

```python
import os

# Example idea (full starter below uses argparse too):
mode = os.environ.get("APP_MODE", "report")
```

If `APP_MODE` is not set, fall back to `"report"`.

## Teaching walkthrough

### Phase A — defaults only

```python
config = {
    "mode": "report",
    "output": "summary.txt",
    "debug": False,
}

print("Mode:", config["mode"])
print("Output:", config["output"])
print("Debug:", config["debug"])
```

Output:

```text
Mode: report
Output: summary.txt
Debug: False
```

### Phase B — argparse overrides

```python
import argparse

parser = argparse.ArgumentParser(description="Print a small run configuration.")
parser.add_argument("--mode", default="report", help="run mode (report or preview)")
parser.add_argument("--output", default="summary.txt", help="output filename")
parser.add_argument("--debug", action="store_true", help="enable debug printing")
args = parser.parse_args()

print("Mode:", args.mode)
print("Output:", args.output)
print("Debug:", args.debug)
```

Run with help:

```bash
python3 run_config.py --help
```

Run with overrides:

```bash
python3 run_config.py --mode preview --output preview.txt --debug
```

## Common beginner mistakes

Editing the `.py` file every time you want a different output name — that is what `--output` is for.

Printing secrets from environment variables — never print API keys or passwords in course demos or logs.

Forgetting that CLI values are strings until you convert them — `argparse` can help, but you still validate.

Assuming `sys.argv[1]` always exists — it does not. Prefer `argparse` defaults.

Using environment variables for everything — overkill for a beginner script; start with args + defaults.

## Your local task

### Step 1 — Starter with working prints

Create `run_config.py`:

```python
# run_config.py — CLI Args, Env Vars, and Configuration
# Defaults + argparse + optional APP_MODE environment override.

import argparse
import os


def build_config():
    parser = argparse.ArgumentParser(
        description="Print a small run configuration for a course script."
    )
    parser.add_argument(
        "--mode",
        default=None,
        help="run mode (report or preview); overrides default and APP_MODE",
    )
    parser.add_argument(
        "--output",
        default="summary.txt",
        help="output filename",
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="enable debug printing",
    )
    args = parser.parse_args()

    # Priority: CLI --mode, then APP_MODE env, then default "report"
    env_mode = os.environ.get("APP_MODE")
    mode = args.mode or env_mode or "report"

    return {
        "mode": mode,
        "output": args.output,
        "debug": args.debug,
        "mode_source": (
            "cli" if args.mode is not None
            else "env" if env_mode is not None
            else "default"
        ),
    }


config = build_config()

print("Run configuration")
print("-" * 40)
print("Mode:", config["mode"])
print("Mode source:", config["mode_source"])
print("Output:", config["output"])
print("Debug:", config["debug"])

if config["debug"]:
    print("Debug detail: configuration loaded successfully.")
```

### Step 2 — Run with defaults

macOS / Linux:

```bash
python3 run_config.py
```

Windows:

```bash
python run_config.py
```

Expected shape:

```text
Run configuration
----------------------------------------
Mode: report
Mode source: default
Output: summary.txt
Debug: False
```

### Step 3 — Run with arguments

```bash
python3 run_config.py --mode preview --output preview.txt --debug
```

Confirm `Mode: preview`, `Mode source: cli`, and the debug detail line.

Also try:

```bash
python3 run_config.py --help
```

### Step 4 — Optional env override

macOS / Linux:

```bash
APP_MODE=preview python3 run_config.py
```

Windows (PowerShell):

```powershell
$env:APP_MODE = "preview"
python run_config.py
```

Confirm `Mode source: env` when you do not pass `--mode`.

### Step 5 — One small change you can explain

Add a allowed-modes check: if `mode` is not `"report"` or `"preview"`, print a clear error and exit. Or add a `--title` argument with a default string. Save, run both success and failure paths.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| argument | A value passed into a function, command, or script |
| environment variable | A value supplied by the operating environment instead of hard-coded source |
| configuration | Values that control behavior without rewriting core logic |
| sys.argv | The list of command-line tokens passed to a Python script |
| argparse | Standard-library helper that parses CLI args and builds `--help` |

## Proof checklist

- [ ] `run_config.py` runs with defaults and prints a clear summary
- [ ] `--help` works
- [ ] You overrode mode/output with CLI flags at least once
- [ ] You can explain default vs CLI vs environment priority in one sentence
- [ ] You made one small change and re-ran
- [ ] `run_config.py` lives in your course folder

When those are true, you are ready for **Advanced File Handling / Filesystem Automation** (Module 19).
