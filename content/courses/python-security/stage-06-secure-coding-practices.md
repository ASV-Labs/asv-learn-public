# Secure Coding Practices

## Why this lesson exists

Secure Python code treats input as **untrusted**, limits behavior to known actions, and returns **safe errors** that do not leak internals or secrets. Validation is not bureaucracy — it is how you prevent unknown input from becoming unknown behavior.

In this stage you will build a **request validation helper** that accepts only a narrow payload shape, rejects unsafe actions, and logs only safe fields. You will test both accepted and rejected cases locally.

This is the capstone habit for the course: every earlier stage (parsing, scope, HTTP policy, crypto rules, tool boundaries) depends on **allowed shape before behavior**.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-security/stage-06
cd ~/asv-learn-python-security/stage-06
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-security\stage-06"
Set-Location "$HOME\asv-learn-python-security\stage-06"
```

You will create `validate_request.py` in that folder.

## Start here: allowed shape before behavior

At the start, do not make unknown input work by accident. First name:

1. **Required fields** — what the payload must contain
2. **Allowed actions** — finite set of behaviors
3. **Safe error** — same response for every rejection path
4. **Log fields** — useful facts without secrets
5. **Accepted and rejected test cases** — prove both paths

Secure code starts with a narrow input shape. The handler runs only known behavior and fails closed when the request does not match.

### Validation questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What fields are required? | Partial payloads cannot trigger behavior |
| Which actions are allowed? | Unknown commands do not run |
| What error do callers see? | Attackers do not get internal details |
| What goes in logs? | Secrets and stack traces stay out |
| Do rejected cases fail closed? | Boundaries are tested, not assumed |

Do not start by editing validation logic. First say the allowed shape in one sentence: *required fields, allowed actions, safe error, safe logs, accepted case, and rejected case.*

## Validation shape

A safe handler should define:

1. Required fields
2. Allowed actions (prefer a `set` for membership tests)
3. Type or format checks where needed
4. One safe error shape for all failures
5. Log fields that never include passwords or tokens
6. Explicit test cases for accept and reject paths

Good validation is boring on purpose. The rejected case is as important as the accepted case because it proves the boundary holds.

## Reading the starter code

```python
allowed_actions = {"view_profile", "reset_session"}
```

Use a set for O(1) membership checks and to show the action list is closed.

```python
if not isinstance(payload, dict):
    return safe_error
```

Type check first — strings, lists, or `None` should not reach field logic.

```python
if payload.get("action") not in allowed_actions:
    return safe_error
```

Unknown actions get the **same** error as missing fields. Do not return `"unknown action: delete_everything"` to untrusted callers.

```python
safe_error = {"ok": False, "error": "invalid request"}
```

Generic message externally; detailed reason internally if needed for developers (not printed to attackers).

## Common beginner mistakes

**Different error messages** for “missing field” vs “bad action” — helps attackers probe.

**Logging full payloads** that may contain passwords or session tokens.

**Allow-by-default** — if action is not in the list, reject.

**Validating only the happy path** — always run a rejected test case.

**Trusting internal callers** — validate at boundaries even “inside” your lab.

## Your local task

### Step 1 — Create the starter

Create `validate_request.py`:

```python
# validate_request.py — Stage 06: Secure Coding Practices
# Fail closed on unknown shape or action.

allowed_actions = {"view_profile", "reset_session"}
required_fields = ["user_id", "action"]
safe_error = {"ok": False, "error": "invalid request"}
log_fields = ["request_id", "user_id", "action", "result"]

def validate_request(payload):
    if not isinstance(payload, dict):
        return safe_error
    if not all(field in payload for field in required_fields):
        return safe_error
    if payload.get("action") not in allowed_actions:
        return safe_error
    return {
        "ok": True,
        "user_id": payload["user_id"],
        "action": payload["action"],
    }

def safe_log(request_id, payload, result):
    entry = {field: None for field in log_fields}
    entry["request_id"] = request_id
    entry["result"] = "ok" if result.get("ok") else "rejected"
    if result.get("ok"):
        entry["user_id"] = result["user_id"]
        entry["action"] = result["action"]
    print("LOG", entry)

def main():
    cases = [
        ("req-1", {"user_id": "u-100", "action": "view_profile"}),
        ("req-2", {"user_id": "u-100", "action": "delete_everything"}),
        ("req-3", {"action": "view_profile"}),
        ("req-4", "not-a-dict"),
    ]
    for request_id, payload in cases:
        result = validate_request(payload)
        safe_log(request_id, payload, result)
        print("RESULT", result)

if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 validate_request.py
```

Confirm only `req-1` returns `"ok": True`. Others share the same safe error shape.

### Step 3 — Tighten one rule

Change **one** thing. Examples:

- Reject empty string `user_id`
- Add `reset_session` rate-limit comment or placeholder counter
- Add a fifth rejected case (extra unexpected field is OK to ignore — document that choice)

Save and run all cases again.

### Step 4 — Course wrap-up note

In a comment or separate `course_notes.txt`, list one habit from each stage you will keep:

1. Parse shape before automate (Stage 01)
2. Scope before network (Stage 02)
3. Policy before HTTP (Stage 03)
4. Purpose before crypto (Stage 04)
5. Human review before action (Stage 05)
6. Validation before behavior (Stage 06)

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Untrusted input | Any data from users, files, or APIs that may be malformed or hostile |
| Fail closed | Default to deny when validation fails |
| Allow list | Explicit set of permitted actions or values |
| Safe error | Generic external message that does not leak internals |
| Boundary test | A rejected case that proves validation works |

## Proof checklist

- [ ] `validate_request.py` exists in `~/asv-learn-python-security/stage-06`
- [ ] Accepted case returns ok True with user_id and action
- [ ] Rejected cases all return the same safe error shape
- [ ] Logs include only safe fields (no passwords or tokens)
- [ ] You tightened one validation rule and re-ran all cases
- [ ] You wrote one habit from each course stage

## Course completion

You now have local practice artifacts across six defensive Python topics: parsing, scoped network modeling, HTTP evidence policy, crypto decision cards, read-only tooling, and request validation. Keep scripts in `~/asv-learn-python-security` as portfolio evidence. Extend them only in authorized lab environments.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
