# FastAPI & Async Python

## Why this lesson exists

FastAPI is built for **APIs**. It uses Python type hints and validation so route handlers receive **trusted input** and return structured JSON. The decorator is not decoration — it is the route label that says which requests may reach your function.

In this stage you will model a FastAPI **endpoint contract** in plain Python: method, path pattern, type validation, success response, and rejection before handler logic runs. You are not required to install FastAPI yet. You are proving you can read the contract FastAPI protects.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-full/stage-03
cd ~/asv-learn-python-full/stage-03
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-full/stage-03"
Set-Location "$HOME\asv-learn-python-full/stage-03"
```

You will create `api_contract.py` in that folder.

## Start here: endpoint promise before syntax

Read a FastAPI endpoint as a contract:

| Contract question | Example answer |
| --- | --- |
| What method is allowed? | GET |
| What path is allowed? | /users/{user_id} |
| What input comes from the path? | user_id |
| What type should it become? | int |
| What should the function return? | user object or error |

When the client sends `/users/not-a-number`, validation should **fail before** your handler trusts the value.

## How to use this lesson

Read in this order:

- **Learn:** name method, path, parameter, type, and response
- **Inspect:** treat validation as a gate before trusted code
- **Build:** implement the contract in plain Python
- **Prove:** show valid and invalid path values produce different outcomes

Practice after reading means you understand the promise before `@app.get` syntax. Ask: *what request is allowed, and what value must be validated?*

## One clean pass through this lesson

Read FastAPI work as a chain:

1. Method and path say which requests are allowed.
2. Path values must be extracted and validated.
3. Valid input reaches handler logic.
4. Invalid input returns an error object instead of slipping through.
5. Returned dictionaries become JSON responses in a real FastAPI app.

Async (`async def`) helps when handlers wait on slow I/O — databases, HTTP clients, queues. Use `async def` when libraries are async-aware. Do not add async everywhere because it looks modern.

## Core FastAPI shape (for later)

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}


@app.get("/users/{user_id}")
def read_user(user_id: int):
    return {"user_id": user_id}
```

Your local file simulates what FastAPI would do before `read_user` runs.

## Common beginner mistakes

**Trusting path strings without validation.** `"42"` and `42` are not the same kind of value for database lookups.

**Validation inside the handler only.** By then bad input may already have caused confusing branches.

**Using async without async libraries.** Plain `def` is fine for CPU-light synchronous work.

**Returning inconsistent error shapes.** Clients handle APIs more easily when errors share a predictable structure.

## Your local task

### Step 1 — Create the starter

Create `api_contract.py`:

```python
# api_contract.py — Stage 03: FastAPI & Async Python
# Models GET /users/{user_id} validation before handler logic.

def parse_user_id(raw_value):
    try:
        return int(raw_value)
    except (TypeError, ValueError):
        return None


def handle_get_user(path):
    # Path shape: /users/42
    prefix = "/users/"
    if not path.startswith(prefix):
        return 404, {"error": "not found"}

    raw_id = path[len(prefix):]
    user_id = parse_user_id(raw_id)
    if user_id is None:
        return 400, {"error": "user_id must be an integer"}

    # TODO: return 200 and {"user_id": user_id, "name": f"User {user_id}"}


def main():
    samples = ["/users/42", "/users/not-a-number", "/health"]
    for path in samples:
        status, body = handle_get_user(path)
        print(f"GET {path} -> {status} {body}")


if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 api_contract.py
```

Confirm invalid ids return 400 and `/health` returns 404.

### Step 3 — Complete the success response

Return 200 with `user_id` and a `name` field for valid integer ids.

### Step 4 — One small change you can explain

Change **one** thing. Examples:

- Reject negative user ids with 400
- Add `GET /health` returning 200 in the same handler module
- Document in a comment when you would choose `async def` for this route

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Endpoint | Method + path + handler function |
| Path parameter | Value embedded in the URL |
| Type hint | Annotation describing expected Python type |
| Validation | Rejecting input that cannot become the expected type |
| JSON response | Dictionary serialized as response body |
| async | Style for non-blocking I/O when libraries support it |

## Proof checklist

- [ ] `api_contract.py` exists in `~/asv-learn-python-full/stage-03`
- [ ] `GET /users/42` returns 200 with integer user_id
- [ ] `GET /users/not-a-number` returns 400 before success logic
- [ ] Unknown paths return 404
- [ ] You added one validation rule and re-ran
- [ ] You can explain validation-before-handler in one sentence

When those are true, continue to **Databases & SQLAlchemy**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
