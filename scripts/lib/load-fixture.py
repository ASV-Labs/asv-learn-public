#!/usr/bin/env python3
"""Load a TechNodeX course fixture .ts file and print the COURSE object as JSON.

Handles type aliases and function param annotations used in this repo's fixtures.
"""
from __future__ import annotations

import json
import re
import sys
import tempfile
from pathlib import Path


def strip_type_aliases(src: str) -> str:
    out: list[str] = []
    i = 0
    n = len(src)
    while i < n:
        m = re.match(r"type\s+\w+\s*=\s*", src[i:])
        at_line_start = i == 0 or src[i - 1] == "\n"
        if m and at_line_start:
            j = i + m.end()
            while j < n and src[j].isspace():
                j += 1
            if j < n and src[j] == "{":
                depth = 0
                while j < n:
                    if src[j] == "{":
                        depth += 1
                    elif src[j] == "}":
                        depth -= 1
                        if depth == 0:
                            j += 1
                            if j < n and src[j] == ";":
                                j += 1
                            break
                    j += 1
                i = j
                continue
            # type X = Other;
            semi = src.find(";", j)
            if semi != -1:
                i = semi + 1
                continue
        out.append(src[i])
        i += 1
    return "".join(out)


def strip_type_token(s: str, start: int) -> int:
    """Given s[start]==':', return index after the type annotation."""
    assert s[start] == ":"
    i = start + 1
    while i < len(s) and s[i].isspace():
        i += 1
    depth_angle = depth_paren = depth_bracket = depth_brace = 0
    while i < len(s):
        ch = s[i]
        if ch == "<":
            depth_angle += 1
        elif ch == ">":
            depth_angle = max(0, depth_angle - 1)
        elif ch == "(":
            depth_paren += 1
        elif ch == ")":
            if depth_paren == 0 and depth_angle == 0 and depth_bracket == 0 and depth_brace == 0:
                break
            depth_paren = max(0, depth_paren - 1)
        elif ch == "[":
            depth_bracket += 1
        elif ch == "]":
            depth_bracket = max(0, depth_bracket - 1)
        elif ch == "{":
            depth_brace += 1
        elif ch == "}":
            depth_brace = max(0, depth_brace - 1)
        elif ch in ",=" and depth_angle == depth_paren == depth_bracket == depth_brace == 0:
            break
        i += 1
    return i


def strip_param_list_types(params: str) -> str:
    out: list[str] = []
    i = 0
    while i < len(params):
        if params[i] == ":":
            i = strip_type_token(params, i)
            continue
        out.append(params[i])
        i += 1
    return "".join(out)


def strip_function_param_types(src: str) -> str:
    def repl(m: re.Match[str]) -> str:
        return f"function {m.group(1)}({strip_param_list_types(m.group(2))})"

    return re.sub(r"function\s+(\w+)\s*\(([^)]*)\)", repl, src)


def to_cjs(src: str, course_name: str) -> str:
    t = strip_type_aliases(src)
    t = strip_function_param_types(t)
    t = re.sub(r"export\s+const\s+", "const ", t)
    t = re.sub(r"const\s+(\w+)\s*:\s*[^=\n]+=", r"const \1 =", t)
    # Remove leftover Array<...> annotations if any remain outside functions
    t = re.sub(r":\s*Array<[^;\n]+>", "", t)
    return t + f"\nmodule.exports = {course_name};\n"


def find_course_name(src: str) -> str:
    names = re.findall(r"export const (\w+)", src)
    for n in names:
        if n.endswith("COURSE"):
            return n
    for n in reversed(names):
        if "MODULE" not in n and "STAGE" not in n:
            return n
    if not names:
        raise SystemExit("No export const found")
    return names[-1]


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: load-fixture.py <fixture.ts>", file=sys.stderr)
        raise SystemExit(2)
    path = Path(sys.argv[1])
    src = path.read_text(encoding="utf-8")
    course_name = find_course_name(src)
    cjs = to_cjs(src, course_name)
    with tempfile.TemporaryDirectory(prefix="asv-fix-") as td:
        out = Path(td) / "fixture.cjs"
        out.write_text(cjs, encoding="utf-8")
        # Evaluate with node
        import subprocess

        node = None
        for cand in [
            Path.home() / ".local/share/cursor-agent/versions/2026.08.04-aaa8809/node",
            Path("/usr/local/bin/node"),
            Path("/opt/homebrew/bin/node"),
        ]:
            if cand.exists():
                node = str(cand)
                break
        if not node:
            # fallback PATH
            node = "node"
        proc = subprocess.run(
            [
                node,
                "-e",
                f"const c=require({json.dumps(str(out))}); process.stdout.write(JSON.stringify(c))",
            ],
            capture_output=True,
            text=True,
        )
        if proc.returncode != 0:
            sys.stderr.write(proc.stderr)
            # dump head of cjs for debug
            sys.stderr.write("\n--- cjs head ---\n")
            sys.stderr.write("\n".join(cjs.splitlines()[:40]) + "\n")
            raise SystemExit(proc.returncode)
        sys.stdout.write(proc.stdout)


if __name__ == "__main__":
    main()
