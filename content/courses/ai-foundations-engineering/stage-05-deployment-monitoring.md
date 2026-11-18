# Deployment & Monitoring

## Why this lesson exists

A model file on disk is not a deployment. Deployment is an **operating boundary**: the model runs behind an endpoint, returns responses, exposes health checks, emits metrics, and can be rolled back when something goes wrong.

Stage 05 teaches **deployment proof** — endpoint, package, health check, monitoring signals, rollback plan, and alert owner — before you call a release “live.”

You will practice locally in Python. You are not deploying to a cloud account in this lesson. You are learning the production habit: **name how the service will be observed and reversed before traffic arrives**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ai-foundations-engineering
cd ~/asv-learn-ai-foundations-engineering
```

Windows (PowerShell):

```powershell
mkdir $HOME\asv-learn-ai-foundations-engineering
cd $HOME\asv-learn-ai-foundations-engineering
```

You will create `deployment_proof.py` in that folder.

## Launch is a promise to operators

| Promise | Evidence |
| --- | --- |
| Callers know where to send requests | Named endpoint or service interface |
| The running bits are identifiable | Versioned package or image |
| Someone can ask “is it up?” | Health check that returns status and version |
| Problems become visible | Monitoring signals with thresholds |
| Mistakes are reversible | Rollback plan to a previous approved package |
| Alerts reach a human | Named alert owner or on-call role |

Without those, a launch is a hope. Hopes do not page cleanly at 2 a.m.

## Start here: operating proof before launch

At the start, do not celebrate a local prediction. Ask:

1. What endpoint will callers use?
2. What package or image is being released?
3. How does a health check prove the service answers?
4. Which metrics are watched after release?
5. How do you roll back, and who gets the alert?

You are building one **deployment proof**, not a launch announcement.

### Deployment questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What is the endpoint? | Integration is explicit |
| What package is live? | Versions are traceable |
| What is the health check? | Liveness is testable |
| What signals are monitored? | Degradation is visible |
| What is the rollback plan? | Bad releases are reversible |
| Who owns alerts? | Incidents have a human path |

Do not start by editing deploy scripts. First say the proof out loud: *`/api/classify` serves package `model-service:training-lab-v1`, `/health` reports ok plus version, we watch latency and errors, we can route back to the previous package, ML on-call owns alerts.*

## How to use this lesson

Read in this order:

- **Learn:** connect deployment to operability, not just packaging
- **Inspect:** treat each proof field as something an on-call engineer needs
- **Build:** draft one deployment proof before calling the model live
- **Prove:** explain how rollback would work in the first hour of an incident

Practice after reading means you should understand the operating boundary before editing code. A dictionary is only useful if each field maps to a real action someone can take.

## One clean pass through this lesson

Before the editor, walk the release story:

1. Traffic enters through a known endpoint.
2. A versioned package defines what is actually running.
3. A health check proves the process can answer and reports its version.
4. Monitoring watches latency, errors, and input rejection rate.
5. If signals cross thresholds, an owner rolls traffic back to the previous approved package.

That chain is MLOps in miniature. Deployment without monitoring is a blindfold. Monitoring without rollback is a siren with no door.

## Metrics that matter for model services

**Latency (for example p95).** Users and upstream systems feel slow answers.

**Error rate.** Crashes and unhandled exceptions need immediate attention.

**Input rejection rate.** A spike can mean a client bug — or a schema change you shipped badly.

**Optional quality samples.** Even a small sampled review can catch silent model drift that infrastructure metrics miss.

Keep the first monitoring set small enough that someone will actually look at it.

## The deployment proof shape

```python
deployment_plan = {
    "endpoint": "/api/classify",
    "package": "model-service:training-lab-v1",
    "health_check": "GET /health returns ok and model version",
    "monitoring_signals": [
        "latency_p95",
        "error_rate",
        "input_rejection_rate",
    ],
    "rollback_plan": "route traffic back to the previous approved model package",
    "alert_owner": "ml on-call owner",
}
```

Each field is operational evidence:

- `endpoint` — route or service interface callers use
- `package` — deployable model or service bundle
- `health_check` — simple route or command proving the service answers
- `monitoring_signals` — metrics watched after release
- `rollback_plan` — how to return to a safer version
- `alert_owner` — who responds when monitoring fails

## Common mistakes

**Shipping without a version.** If you cannot name what is live, you cannot roll back confidently.

**Health checks that only ping the process.** Prefer checks that confirm the model package loaded.

**Metrics with no owner.** An unread dashboard is decoration.

**Rollback that requires rebuilding.** Rollback should reuse a previous approved package, not a weekend project.

**Treating “it worked on my machine” as deploy proof.** Local success is necessary but not sufficient.

## Your local task

### Step 1 — Create the starter

Create `deployment_proof.py` with this starter:

```python
# deployment_proof.py — Stage 05: Deployment & Monitoring
# Run unchanged first, then tighten monitoring or rollback.

deployment_plan = {
    "endpoint": "/api/classify",
    "package": "model-service:training-lab-v1",
    "health_check": "GET /health returns ok and model version",
    "monitoring_signals": [
        "latency_p95",
        "error_rate",
        "input_rejection_rate",
    ],
    "rollback_plan": "route traffic back to the previous approved model package",
    "alert_owner": "ml on-call owner",
}

def print_plan(plan):
    print("=== Deployment Proof ===")
    for key, value in plan.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_plan(deployment_plan)
```

### Step 2 — Run unchanged

```bash
python3 deployment_proof.py
```

Windows:

```bash
python deployment_proof.py
```

Match each field to an action an on-call engineer might take.

### Step 3 — Tighten one field

Change **one** field. Examples:

- Add a fourth monitoring signal for sampled prediction review rate
- Make `rollback_plan` name the previous package id explicitly
- Change `alert_owner` to a role string your team would actually page

Save, run again, and confirm the update.

### Step 4 — Narrate an incident hour

Write two sentences:

1. Which monitoring signal would make you suspect a bad model package?
2. What does the rollback plan tell you to do first?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| endpoint | Route or interface callers use to reach the service |
| package | Versioned deployable bundle of service and model |
| health check | Lightweight proof the service answers correctly enough |
| monitoring signal | Metric watched after release |
| rollback | Returning traffic to a previous approved version |
| alert owner | Person or role responsible for responding |

## Proof checklist

- [ ] `deployment_proof.py` exists in your course folder
- [ ] Running it prints all six deployment fields
- [ ] You can explain health, monitoring, rollback, and ownership
- [ ] You changed one field and re-ran successfully
- [ ] You wrote a short incident response using the plan

When those are true, continue to **Scaling ML Systems**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
