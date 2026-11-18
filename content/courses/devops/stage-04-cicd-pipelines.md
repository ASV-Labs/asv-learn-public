# CI/CD Pipelines & GitHub Actions

## Why this lesson exists

A **pipeline** is a release checklist that runs the same way every time. Good pipelines make failure visible **before** production users see it. Automation should clarify release authority — a green build is evidence, not automatic production approval.

This stage teaches you to write a **CI/CD release card** naming trigger, tests, build artifact, secret handling, deploy gate, and rollback condition. Workflow YAML comes after the gates make sense.

Practice is local terminal / personal practice repo only. ASV Learn does not run GitHub Actions inside the lesson UI.

## Typical pipeline stages

| Stage | Purpose | Fails the pipeline when |
| --- | --- | --- |
| Lint / format | Style and static issues | Rules violated |
| Unit / integration test | Behavior regressions | Assertions fail |
| Build | Produce artifact | Compile/bundle errors |
| Scan (optional) | Known vulns in deps/image | Policy threshold exceeded |
| Deploy to staging | Verify in near-prod | Health check fails |
| Deploy to production | User-facing release | Gate not approved or health fails |

Not every repo needs every stage on day one. The release card forces you to name which gates **your** service requires before production.

## Pull request vs main

A common pattern: PR runs test + build; merge to `main` builds a versioned artifact; production deploy is manual or environment-gated. Document that split on your card so nobody assumes "merged equals live."

| Event | Typical jobs | Must not auto-do |
| --- | --- | --- |
| Pull request | lint, test, maybe build | production deploy |
| Push to main | test, build versioned artifact | silent prod push without gate |
| Manual / environment approval | production deploy | skip health verification |

## Artifact identity

Good release cards name **what** gets promoted: container digest, tarball path, git SHA in filename, or semver tag. "The build" is not an artifact. When rollback condition fires, you must know exactly which bits to redeploy.

Write artifact identity so a teammate can find it six months later: path or registry + digest/tag + git SHA.

## Failed pipeline = stop signal

If test or build fails, **nothing** should reach production automatically. Document on your card who gets notified and whether a failed deploy job blocks retry until someone acknowledges the failure cause. Silent retries without human awareness recreate the same outage.

## Reminder: where you work

```bash
cd ~/asv-learn-devops
mkdir -p stage-04
cd stage-04
```

Create `cicd_release_card.sh`. Optionally create `.github/workflows/` in a personal practice repo later — not required for this stage proof.

## Pipeline gates

| Gate | What it proves |
| --- | --- |
| Trigger | Intended branch or event starts the pipeline |
| Test | Code still behaves as expected |
| Build | Release artifact can be produced |
| Secret rule | Credentials not printed or committed |
| Deploy gate | Human or environment rule controls production |
| Rollback condition | Team knows when to revert |

## Start here: gate before YAML

Say the card: *push to main after review runs npm test, builds web artifact, uses repo secrets without echo, production needs protected environment approval, rollback if health or error budget fails.*

## Local practice commands (no cloud required)

These prove discipline on your machine — they do not replace a real Actions runner:

| Goal | Example |
| --- | --- |
| Confirm shell card runs | `bash cicd_release_card.sh` |
| Dry-run test command name | `printf '%s\n' "would run: npm test && npm run lint"` |
| Sketch workflow mapping | edit `workflow.sketch.yml` |
| Secret never-list | write `secret_notes.txt` |

If you later use a personal GitHub repo, keep secrets in encrypted repository secrets — never paste tokens into lesson notes.

## Common beginner mistakes

- Deploy on every green build with no approval
- Secrets in workflow files or log output
- Tests that never fail (assert true)
- No artifact identity (what exactly got deployed?)
- Assuming GitHub Actions runs inside ASV Learn lessons
- Retrying failed deploys without reading the failure log
- Treating "pipeline green" as user-facing health proof without a post-deploy check

## Your local task

### Step 1 — Create the release card

Create `cicd_release_card.sh`:

```bash
#!/usr/bin/env bash
# cicd_release_card.sh — Stage 04: CI/CD

pipeline_trigger="push to main after PR review"
test_command="npm test && npm run lint"
build_artifact="dist/web-build.tar.gz with git sha in filename"
secret_rule="use GitHub secrets; never echo API_TOKEN"
deploy_gate="production requires protected environment + manual approval"
rollback_condition="rollback if /health fails or 5xx rate exceeds SLO for 5m"

printf '%s\n' \
  "trigger=$pipeline_trigger" \
  "test=$test_command" \
  "artifact=$build_artifact" \
  "secrets=$secret_rule" \
  "deploy_gate=$deploy_gate" \
  "rollback=$rollback_condition"
```

### Step 2 — Run

```bash
bash cicd_release_card.sh
```

### Step 3 — Workflow sketch

Create `workflow.sketch.yml` as comments documenting how gates map to jobs (no need to push):

```yaml
# on: push to main
# jobs:
#   test: runs test_command
#   build: produces build_artifact, needs test
#   deploy: needs build + environment approval (deploy_gate)
```

### Step 4 — Secret discipline note

In `secret_notes.txt`, list two places secrets must **never** appear (logs, git history) and one correct storage pattern (GitHub encrypted secrets).

### Step 5 — Failure stop policy

Create `failure_stop.txt` with three lines: (1) which jobs block promote, (2) who is notified on failure, (3) what must be true before a retry is allowed. This is the human half of CI — automation without a stop policy still ships broken builds.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| CI | Continuous integration — automated build/test on change |
| CD | Continuous delivery/deployment — automated release path |
| artifact | Built output promoted through environments |
| deploy gate | Control point before production |
| rollback condition | Signal to revert release |
| protected environment | Hosted CI setting requiring approval |
| runner | Machine that executes pipeline jobs |

## Proof checklist

- [ ] Release card prints all six gates
- [ ] Deploy gate is separate from "tests passed"
- [ ] Secret rule forbids echo/commit
- [ ] Workflow sketch maps jobs to gates
- [ ] `secret_notes.txt` lists never/always rules
- [ ] `failure_stop.txt` names block/notify/retry rules
- [ ] You know Actions practice is your repo/lab — not an in-lesson runner

When those are true, continue to **Infrastructure as Code with Terraform**.

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
