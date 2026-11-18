# Deployment & DevOps Basics

## Why this lesson exists

Deployment is a **repeatable release path**, not a single command you run once and hope. A full-stack developer should know what proves a release is ready, healthy, and reversible — before customers discover a broken route.

In this stage you will write a **release plan** as JavaScript data and a small script that checks whether required evidence is present. You are not configuring AWS, Docker, or CI yet. You are learning the proof chain senior teams expect: build, configuration, health, rollback, logs, owner.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit local files → run with Node → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-fullstack/stage-05
cd ~/asv-learn-fullstack/stage-05
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-fullstack\stage-05"
Set-Location "$HOME\asv-learn-fullstack\stage-05"
```

You will create `release_plan.js` in that folder.

## Start here: health evidence before release

Before release commands, name the proof chain:

| Evidence | Question answered |
| --- | --- |
| **Build command** | Can the app compile? |
| **Environment rule** | Are secrets and config outside source code? |
| **Health route** | Can a user-facing route answer? |
| **Rollback step** | How do we recover if health fails? |
| **Log check** | What changed after release? |
| **Owner** | Who responds when the release needs action? |

A green build is only one link. Production is safer when readiness, health, recovery, and ownership are visible **before** the deploy button.

## How to use this lesson

Read in this order:

- **Learn:** understand deployment as evidence, not a status label
- **Inspect:** connect each release-plan field to a question the release must answer
- **Build:** model the plan and validate required keys locally
- **Prove:** explain what happens if health fails after restart

Practice after reading means the release proof comes before command syntax. Ask: *what would a user still be unable to do if we stopped checking after "build passed"?*

## One clean pass through this lesson

Read deployment as a chain:

1. Tests and build show the change is safe enough to try.
2. Environment rules show configuration is supplied correctly.
3. Restart shows the new process is running.
4. A **public** health route shows the app can answer requests.
5. Logs and rollback notes show the team can respond if something breaks.

Do not stop at "the build passed." User-facing proof comes after the app is running.

## Release plan example

```js
const releasePlan = {
  buildCommand: "npm run build",
  environmentRule: "required variables are set outside source code",
  healthRoute: "/health",
  rollbackStep: "restore the previous release if health fails",
  logCheck: "inspect application errors after deploy",
  owner: "full-stack developer on release duty",
};
```

## Checking the plan locally

```js
function validateReleasePlan(plan) {
  const required = [
    "buildCommand",
    "environmentRule",
    "healthRoute",
    "rollbackStep",
    "logCheck",
    "owner",
  ];
  const missing = required.filter((key) => !plan[key]);
  return { ok: missing.length === 0, missing };
}
```

This is not production DevOps. It is the habit of making release readiness **reviewable** before scripts hide the checklist.

## Common beginner mistakes

**Deploying without a health route.** Process managers say "online" while the public site still returns 502.

**Secrets in the repository.** Environment rules exist so keys rotate without rewriting git history.

**No rollback story.** If recovery is improvised during an incident, downtime grows.

**Skipping logs because the deploy "felt fine."** New errors often appear in logs before users file tickets.

## Your local task

### Step 1 — Create the starter

Create `release_plan.js`:

```js
// release_plan.js — Stage 05: Deployment & DevOps Basics
// Run unchanged first, then add one post-deploy check.

const releasePlan = {
  buildCommand: "npm run build",
  environmentRule: "required variables are set outside source code",
  healthRoute: "/health",
  rollbackStep: "restore the previous release if health fails",
  logCheck: "inspect application errors after deploy",
  owner: "full-stack developer on release duty",
};

function validateReleasePlan(plan) {
  const required = [
    "buildCommand",
    "environmentRule",
    "healthRoute",
    "rollbackStep",
    "logCheck",
    "owner",
  ];
  const missing = required.filter((key) => !plan[key]);
  return { ok: missing.length === 0, missing };
}

function simulatePostDeployChecks(evidence) {
  // Pretend these are results from your terminal after a deploy
  return {
    buildPassed: evidence.buildPassed,
    healthStatus: evidence.healthStatus,
    logsClean: evidence.logsClean,
  };
}

function demo() {
  console.log("=== Release plan ===");
  console.log(releasePlan);
  console.log("\n=== Plan validation ===");
  console.log(validateReleasePlan(releasePlan));

  const evidence = {
    buildPassed: true,
    healthStatus: 200,
    logsClean: true,
  };
  console.log("\n=== Post-deploy evidence ===");
  console.log(simulatePostDeployChecks(evidence));

  // TODO: return "RELEASE OK" only when build passed, health is 200, and logs are clean
  // TODO: otherwise return "ROLLBACK" and print releasePlan.rollbackStep
}

if (require.main === module) {
  demo();
}

module.exports = { releasePlan, validateReleasePlan, simulatePostDeployChecks };
```

### Step 2 — Run unchanged

```bash
node release_plan.js
```

Read the printed plan and validation output.

### Step 3 — Implement release decision logic

Complete the TODOs so the script prints `RELEASE OK` when all evidence passes, and `ROLLBACK` plus the rollback step when health is not 200 or logs are not clean.

Test with a failing case by setting `healthStatus: 503` in `evidence`.

### Step 4 — One small change you can explain

Add **one** extra check you would want before shipping to paying users. Examples:

- `protectedRouteRequiresLogin: true`
- `databaseMigrationApplied: true`
- `ownerNotified: true`

Document it in the release plan object and in your decision function.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Deploy | Moving a tested build to an environment users can reach |
| Health route | Simple endpoint that proves the app can respond |
| Rollback | Returning to the last known good release |
| Environment variable | Config value supplied outside source code |
| CI | Automated build and test pipeline |
| Owner | Person responsible for acting on release evidence |

## Proof checklist

- [ ] `release_plan.js` exists in `~/asv-learn-fullstack/stage-05`
- [ ] Running it prints the plan and validation result
- [ ] Your script chooses RELEASE OK vs ROLLBACK based on evidence
- [ ] You tested a failing health status and saw ROLLBACK
- [ ] You added one extra post-deploy check
- [ ] You can explain why build success alone is not enough

When those are true, continue to **Capstone Projects & Portfolio**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
