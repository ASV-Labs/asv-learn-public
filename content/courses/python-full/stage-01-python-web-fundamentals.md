# Python Web Fundamentals

## Why this lesson exists

Every Python web framework — Django, FastAPI, Flask — sits on the same loop:

1. A client sends a **request** (method + path + optional body).
2. Python code **matches** a route and runs a handler.
3. The server sends a **response** (status + body) that tells the truth.

Before you install a framework, you need to trace that loop in plain Python. If you cannot explain why `/missing` returns 404, adding decorators will only hide the confusion.

In this stage you will build a tiny **request router** in one file and run sample requests in your terminal. There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-full/stage-01
cd ~/asv-learn-python-full/stage-01
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-full\stage-01"
Set-Location "$HOME\asv-learn-python-full\stage-01"
```

You will create `request_router.py` in that folder.

## Start here: method, path, branch, status, body

Slow the loop down to five words:

| Piece | Example | Meaning |
| --- | --- | --- |
| **Method** | GET | Client wants to read |
| **Path** | /health | Which route is asked for |
| **Branch** | `if method == "GET" and path == "/health"` | Handler choice |
| **Status** | 200 or 404 | Truth code for the client |
| **Body** | `{"ok": True}` | Useful data returned |

If someone asks for `/profile`, Python should match the profile branch. If someone asks for `/missing`, the honest answer is **404**, not a guess.

## How to use this lesson

Read in this order:

- **Learn:** say the request → handler → response loop out loud
- **Inspect:** trace one known route and one unknown route through the branches
- **Build:** complete the handler and add one route
- **Prove:** explain why each printed status happened

Practice after reading means you understand the story before editing code. If the file looks noisy, return to: *what request came in, which branch answered, what went back?*

## One clean pass through this lesson

Read the whole stage as one small story:

1. A request arrives with a method and path.
2. Python checks whether that pair matches a known route.
3. The matching branch returns status and body.
4. The fallback branch returns 404 for unknown routes.
5. Your terminal output proves you can explain each line.

Frameworks later carry request details into your functions and carry responses back out. The first job is simpler: **follow the request in and follow the response out.**

## Status codes you need first

| Code | Meaning | Use when |
| --- | --- | --- |
| 200 | OK | Request worked |
| 201 | Created | New record was created |
| 400 | Bad Request | Malformed or missing required data |
| 401 | Unauthorized | User is not signed in |
| 403 | Forbidden | User is signed in but not allowed |
| 404 | Not Found | Route or resource does not exist |
| 500 | Server Error | Your code or infrastructure failed |

Start with **200** and **404** in this stage. Add others as later stages need them.

## Common beginner mistakes

**One giant function with no fallback.** Unknown paths must return 404, not the last successful handler by accident.

**Wrong status for the story.** Returning 200 with `{"error": "not found"}` confuses clients that trust status codes.

**Mixing route matching and business logic.** Match the route first, then decide what data to return.

**Printing debug output instead of returning a response.** Handlers return `(status, body)` tuples; callers print or send them.

## Your local task

### Step 1 — Create the starter

Create `request_router.py`:

```python
# request_router.py — Stage 01: Python Web Fundamentals
# Run unchanged first, then add one route branch.

def handle_request(method, path):
    if method == "GET" and path == "/health":
        return 200, {"ok": True}

    if method == "GET" and path == "/profile":
        return 200, {"name": "Ada", "role": "developer"}

    # TODO: add GET /courses returning 200 and a list of two course names
    # Unknown routes must fall through to 404 below.

    return 404, {"error": "not found"}


def main():
    samples = [
        ("GET", "/health"),
        ("GET", "/profile"),
        ("GET", "/courses"),
        ("GET", "/missing"),
    ]
    print("=== Request router ===")
    for method, path in samples:
        status, body = handle_request(method, path)
        print(f"{method} {path} -> {status} {body}")


if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 request_router.py
```

Windows:

```bash
python request_router.py
```

Confirm `/health` and `/profile` return 200, `/courses` returns 404 until you add it, and `/missing` returns 404.

### Step 3 — Add the courses route

Implement `GET /courses` returning 200 and a body like `{"courses": ["Python Full Stack", "Security"]}`.

Re-run until all four sample lines match your expectations.

### Step 4 — One small change you can explain

Change **one** thing after the routes work. Examples:

- Add `POST /courses` returning 201 with a fake id
- Return 405 for `POST /health` with a clear error body
- Include a `version` field on `/health`

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Request | What the client sends (method, path, headers, body) |
| Route | Method + path pair your app recognizes |
| Handler | Python function or branch that decides the response |
| Status code | Number telling the client what happened |
| Response body | Data returned with the status (often JSON) |
| Fallback | Default branch when no route matches |

## Proof checklist

- [ ] `request_router.py` exists in `~/asv-learn-python-full/stage-01`
- [ ] Running it prints status and body for each sample request
- [ ] Known routes return 200 with sensible bodies
- [ ] Unknown routes return 404
- [ ] You added or changed one route and re-ran successfully
- [ ] You can explain method, path, branch, status, and body for one request

When those are true, continue to **Django Web Framework**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
