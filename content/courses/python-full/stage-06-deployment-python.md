# Deployment & Production Python

## Why this lesson exists

Deployment means making your app run **reliably for real users**. Production work includes configuration, logging, process restarts, database migrations, health checks, rollback plans, and security — not only copying files to a server.

In this stage you will write a **deploy proof checklist** as Python data and a function that decides whether a release is safe to call done. You are not building Kubernetes or full CI/CD yet. You are learning the evidence chain: tests, migrations, restart, **public route proof**, logs, rollback.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-full/stage-06
cd ~/asv-learn-python-full/stage-06
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-full/stage-06"
Set-Location "$HOME\asv-learn-python-full/stage-06"
```

You will create `deploy_checklist.py` in that folder.

## Start here: deploy is a proof chain

Read the chain in order:

1. **Before deploy:** tests pass and required configuration is present.
2. **During deploy:** dependencies install, migrations apply, process restarts.
3. **After deploy:** public health route returns 200, protected routes still enforce auth, logs show no new crash loop, rollback path is known.

If one link is missing, the deploy is not finished — even if a panel says "online."

## How to use this lesson

Read in this order:

- **Learn:** name pre-deploy, deploy, and post-deploy checks
- **Inspect:** separate internal process status from user-facing proof
- **Build:** model checklist data and evaluate evidence
- **Prove:** explain why restart alone is weaker than public route 200

Practice after reading means you treat deployment as evidence, not a label. Ask: *what could still be broken for users after the process restarted?*

## One clean pass through this lesson

| Check | What it proves | What it does not prove |
| --- | --- | --- |
| Tests passed | Change is safe enough to try | Every user workflow works |
| Migrations applied | Schema matches code expectations | Data backfill is correct |
| App restarted | New process is running | Public site answers requests |
| Health route 200 | Basic request succeeds | All features work |
| Logs clean | No obvious crash loop | No hidden logic bugs |
| Rollback known | Recovery is possible | Rollback is painless |

User-facing proof comes **after** the app is running.

## Health route example

Every deployable app should expose a simple health check:

```python
def health():
    return {"ok": True, "service": "python-api"}
```

In production, that route is fetched from outside the server — the same way a user or load balancer would reach it.

## Common beginner mistakes

**Calling deploy done after restart.** Process managers lie quietly while nginx or the app still returns 502.

**Running migrations after code expects new columns.** Order matters: migrate, then deploy code that uses the schema.

**No rollback notes until incident day.** Decide recovery steps when you still have calm attention.

**Secrets in git.** Production config belongs in environment variables or a secret store, not in `settings.py` commits.

## Your local task

### Step 1 — Create the starter

Create `deploy_checklist.py`:

```python
# deploy_checklist.py — Stage 06: Deployment & Production Python
# Model deploy evidence before cloud tooling.

REQUIRED_CHECKS = [
    "tests_passed",
    "migrations_applied",
    "app_restarted",
    "public_health_status",
    "logs_checked",
    "rollback_path_known",
]


def evaluate_deploy(evidence):
    missing = [key for key in REQUIRED_CHECKS if key not in evidence]
    if missing:
        return "INCOMPLETE", missing

    if not evidence["tests_passed"]:
        return "BLOCKED", ["tests_passed"]

    if evidence["migrations_applied"] is not True:
        return "BLOCKED", ["migrations_applied"]

    if evidence["app_restarted"] is not True:
        return "BLOCKED", ["app_restarted"]

    if evidence["public_health_status"] != 200:
        return "ROLLBACK", ["public_health_status"]

    if evidence["logs_checked"] is not True:
        return "ROLLBACK", ["logs_checked"]

    if evidence["rollback_path_known"] is not True:
        return "INCOMPLETE", ["rollback_path_known"]

    return "RELEASE OK", []


def main():
    good = {
        "tests_passed": True,
        "migrations_applied": True,
        "app_restarted": True,
        "public_health_status": 200,
        "logs_checked": True,
        "rollback_path_known": True,
    }
    bad_health = {**good, "public_health_status": 503}

    for label, evidence in [("good", good), ("bad_health", bad_health)]:
        decision, details = evaluate_deploy(evidence)
        print(f"=== {label} ===")
        print(decision, details)


if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 deploy_checklist.py
```

Confirm `good` → `RELEASE OK` and `bad_health` → `ROLLBACK`.

### Step 3 — Add one production check

Extend `REQUIRED_CHECKS` and `evaluate_deploy` with **one** check you would want before shipping to paying users. Examples:

- `protected_route_requires_login`
- `database_read_smoke_test`
- `owner_notified`

Add a third evidence dict in `main()` that fails only your new check.

### Step 4 — Write the rollback sentence

In a comment or `ROLLBACK.md` snippet, write one plain-English rollback step for this course project (for example: redeploy previous git tag and restore database snapshot).

Explain in two sentences why `"process restarted"` is weaker than `"public health route returned 200 after restart."`

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Deployment | Moving tested code to an environment users reach |
| Migration | Controlled database schema change |
| Health check | Simple route proving the app responds |
| Rollback | Reverting to last known good release |
| Environment variable | Config value outside source code |
| Smoke test | Quick post-deploy check of critical paths |

## Proof checklist

- [ ] `deploy_checklist.py` exists in `~/asv-learn-python-full/stage-06`
- [ ] Good evidence returns RELEASE OK
- [ ] Failed health status triggers ROLLBACK
- [ ] You added one extra required check and tested it
- [ ] You documented a rollback step in plain language
- [ ] You can explain user-facing proof vs process status

When those are true, you have completed the **Python Full Stack** course path.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
