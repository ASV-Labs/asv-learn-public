# Authentication & Security

## Why this lesson exists

**Authentication** answers *who is this user?* **Authorization** answers *what is this user allowed to do?* Blurring them leads to private data leaking to the wrong account — one of the most common web security failures.

In this stage you will model a **protected profile route** in plain Python with two gates: identity first, permission second. You are not wiring OAuth, JWT signing, or password storage yet. You are proving the guard order is safe before framework middleware hides it.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-full/stage-05
cd ~/asv-learn-python-full/stage-05
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-full/stage-05"
Set-Location "$HOME\asv-learn-python-full/stage-05"
```

You will create `profile_guard.py` in that folder.

## Start here: two gates in order

| Question | Meaning | Failure result |
| --- | --- | --- |
| Who is making this request? | Authentication | **401** sign in required |
| Is this user allowed to do this? | Authorization | **403** not allowed |

A signed-in user is **known**. That does not mean they may read every profile.

## How to use this lesson

Read in this order:

- **Learn:** separate identity from permission before handler code
- **Inspect:** read each branch as an access decision
- **Build:** return 401, 403, or 200 only after the correct gate
- **Prove:** match outputs to the permission table

Practice after reading means you know expected behavior for anonymous, owner, stranger, and admin callers before editing logic.

## One clean pass through this lesson

Read protected routes as a chain:

1. If there is no signed-in user, stop with **401** before preparing private data.
2. If there is a user, check whether they may read the requested profile.
3. Allow only when the caller is the **owner** or an **admin**.
4. Stop known-but-not-allowed users with **403**.
5. Return protected data only after both gates pass.

The order matters. Private data should not be returned or logged before the access decision.

## Permission table before code

| Caller | Requested profile | Expected result |
| --- | --- | --- |
| anonymous | user 10 | 401 |
| user 2 | user 10 | 403 |
| user 10 | user 10 | 200 |
| admin 1 | user 10 | 200 |

That table is the **security contract**. The code implements the table — not the other way around.

## 401 vs 403

- **401:** "I cannot identify you yet."
- **403:** "I know who you are, and this action is not allowed."

Different bugs, different user messages, different audit signals.

## Common beginner mistakes

**Treating logged in as allowed for everything.** Session presence is not permission.

**Returning private data before checks complete.** Prepare responses only after authorization passes.

**Storing secrets in source code.** API keys and signing secrets belong in environment configuration.

**Hiding 403 behind generic 404.** Sometimes privacy wants ambiguous errors, but learners should understand the distinction first.

## Your local task

### Step 1 — Create the starter

Create `profile_guard.py`:

```python
# profile_guard.py — Stage 05: Authentication & Security
# Two gates: identity (401) then permission (403).

def can_read_profile(current_user, requested_user_id):
    if current_user is None:
        return False

    is_owner = current_user["id"] == requested_user_id
    is_admin = current_user.get("role") == "admin"
    return is_owner or is_admin


def get_profile(current_user, requested_user_id):
    if current_user is None:
        return 401, {"error": "sign in required"}

    if not can_read_profile(current_user, requested_user_id):
        return 403, {"error": "not allowed"}

    return 200, {
        "user_id": requested_user_id,
        "visible_to": current_user["id"],
    }


def main():
    cases = [
        (None, 10),
        ({"id": 2, "role": "user"}, 10),
        ({"id": 10, "role": "user"}, 10),
        ({"id": 1, "role": "admin"}, 10),
    ]
    for current_user, requested in cases:
        status, body = get_profile(current_user, requested)
        label = current_user["id"] if current_user else "anonymous"
        print(f"caller {label} reads {requested} -> {status} {body}")


if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 profile_guard.py
```

Match each line to the permission table: 401, 403, 200, 200.

### Step 3 — Add one caller case

Add a test case and expected behavior after the original four work. Examples:

- Support role that may read profiles in the same organization
- User with `role: "banned"` always gets 403 even on own profile

Document the new row in a comment at the top of the file.

### Step 4 — One small change you can explain

Change **one** thing. Examples:

- Include `"reason"` in error bodies for debugging in dev only
- Add a helper that logs access decisions without printing private fields
- Write two sentences on why 401 and 403 must not be swapped

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Authentication | Proving who the user is |
| Authorization | Checking permitted actions for that user |
| Session | Server-side or signed record of signed-in identity |
| Token | Credential (often JWT) sent with requests |
| Owner | User who owns the requested resource |
| Fail closed | Deny access when checks fail or are incomplete |

## Proof checklist

- [ ] `profile_guard.py` exists in `~/asv-learn-python-full/stage-05`
- [ ] Anonymous callers receive 401
- [ ] Wrong user receives 403; owner and admin receive 200
- [ ] Protected data appears only after both gates pass
- [ ] You added one caller case and re-ran
- [ ] You can explain why sign-in is not the same as permission

When those are true, continue to **Deployment & Production Python**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
