# Scaling ML Systems

## Why this lesson exists

Scaling an ML system means protecting **reliability, cost, and quality** as traffic or data grows. More servers are not enough if queues explode, budgets melt, or output quality silently drifts while the cluster looks “healthy.”

Stage 06 teaches a **scaling runbook** — workload type, capacity signal, backpressure rule, cost control, quality guard, and rollback trigger — before you answer growth with raw compute.

You will practice locally in Python. You are not autoscaling a fleet in this lesson. You are learning the production habit: **decide how the system slows down, spends money, and retreats before you invite more load**.

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

You will create `scaling_runbook.py` in that folder.

## Growth without controls fails loudly or quietly

| Failure mode | What you see |
| --- | --- |
| No capacity signal | Latency surprises everyone at once |
| No backpressure | Queues grow until timeouts cascade |
| No cost control | GPU or API spend spikes overnight |
| No quality guard | Wrong answers scale as efficiently as right ones |
| No rollback trigger | The team debates while users absorb damage |

Scaling is not a hardware purchase. Scaling is a set of rules for when to accept work, when to shed load, when to spend, and when to retreat.

## Start here: limits before more compute

At the start, do not add replicas because a chart looked busy. Ask:

1. Is this workload batch, online, streaming, or a mix?
2. Which capacity signal shows pressure early?
3. How does backpressure slow or reject work safely?
4. How is spend capped?
5. How is quality watched while volume rises?
6. When do you roll back or fall to a simpler path?

You are building one **scaling runbook**, not a shopping list for GPUs.

### Scaling questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| What is the workload type? | Capacity plans match real traffic shape |
| What is the capacity signal? | Pressure is visible before collapse |
| What is the backpressure rule? | Overload fails safely instead of cascading |
| What is the cost control? | Growth stays inside budget |
| What is the quality guard? | Volume does not hide bad predictions |
| What is the rollback trigger? | Retreat happens by rule, not by panic |

Do not start by editing infrastructure manifests. First say the runbook out loud: *online inference with batch retraining; watch queue depth and p95; return safe retry responses when the queue is too deep; cap GPU jobs by tier and daily budget; sample for drift; roll back when latency or quality crosses the release threshold.*

## How to use this lesson

Read in this order:

- **Learn:** connect scaling to limits, not only to more machines
- **Inspect:** treat each runbook field as an overload or budget control
- **Build:** draft one scaling runbook before increasing load
- **Prove:** explain when the system should refuse work or roll back

Practice after reading means you should understand the controls before editing code. A runbook that only says “add servers” is incomplete.

## One clean pass through this lesson

Before the editor, walk the scaling story:

1. Work arrives as batch jobs, online requests, or a stream.
2. A capacity signal shows pressure early (queue depth, p95 latency, lag).
3. Backpressure returns a safe retry or deferral instead of melting workers.
4. Cost controls stop unbounded GPU or API spend.
5. Quality guards sample predictions for drift and rising rejection rates.
6. A rollback trigger returns traffic to a safer path when thresholds break.

That chain is how production teams grow without turning every spike into an incident novel.

## Online versus batch pressure

**Online inference** cares about latency and timeouts. Backpressure may return `429`-style retry guidance or degrade to a simpler model.

**Batch scoring** cares about job duration, backlog, and cost. Backpressure may pause new jobs or shrink concurrency.

**Streaming** cares about lag. Backpressure may drop noncritical events or widen windows carefully — with quality guards so “keep up” does not mean “keep wrong.”

Your runbook should name the workload so the rest of the rules make sense.

## The scaling runbook shape

```python
scaling_runbook = {
    "workload_type": "online inference with batch retraining",
    "capacity_signal": "queue depth and p95 latency",
    "backpressure_rule": "return a safe retry response when queue depth is too high",
    "cost_control": "cap GPU jobs by tier and daily budget",
    "quality_guard": "sample predictions for drift and rising rejection rate",
    "rollback_trigger": (
        "rollback when latency or quality crosses the release threshold"
    ),
}
```

Each field is a control surface:

- `workload_type` — batch, online, streaming, or mixed
- `capacity_signal` — metric showing pressure
- `backpressure_rule` — how the system slows or rejects work safely
- `cost_control` — how spend is bounded
- `quality_guard` — how output quality is watched while scaling
- `rollback_trigger` — when to reduce load or return to a simpler path

## Common mistakes

**Equating scale with hardware.** Without backpressure, more machines can amplify a bad path.

**Ignoring cost.** Unbounded inference or training jobs are a reliability and finance incident.

**Watching only infrastructure.** CPU can look fine while predictions drift.

**No rollback trigger.** If the rule is vague, people freeze under pressure.

**Copying another team’s runbook blindly.** Workload shape matters; batch rules on an online path fail.

## Your local task

### Step 1 — Create the starter

Create `scaling_runbook.py` with this starter:

```python
# scaling_runbook.py — Stage 06: Scaling ML Systems
# Run unchanged first, then tighten backpressure, cost, or rollback.

scaling_runbook = {
    "workload_type": "online inference with batch retraining",
    "capacity_signal": "queue depth and p95 latency",
    "backpressure_rule": (
        "return a safe retry response when queue depth is too high"
    ),
    "cost_control": "cap GPU jobs by tier and daily budget",
    "quality_guard": "sample predictions for drift and rising rejection rate",
    "rollback_trigger": (
        "rollback when latency or quality crosses the release threshold"
    ),
}

def print_runbook(runbook):
    print("=== Scaling Runbook ===")
    for key, value in runbook.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_runbook(scaling_runbook)
```

### Step 2 — Run unchanged

```bash
python3 scaling_runbook.py
```

Windows:

```bash
python scaling_runbook.py
```

For each field, name the failure it prevents.

### Step 3 — Tighten one field

Change **one** field. Examples:

- Make `backpressure_rule` name a concrete queue-depth threshold
- Add a daily dollar or GPU-hour cap to `cost_control`
- Make `rollback_trigger` cite both latency and a quality sample failure rate

Save, run again, and confirm the update.

### Step 4 — Explain refusal and retreat

Write two sentences:

1. When should this system **refuse or defer** new work?
2. When should it **roll back** instead of adding capacity?

## Course wrap: what you can prove now

Across six stages you practiced local Python artifacts that mirror production AI engineering:

1. Service contract
2. Pipeline card
3. Feature plan
4. Validation plan
5. Deployment proof
6. Scaling runbook

Keep the folder. When you later train or deploy for real, reuse these fields as review checklists. The point of the course is not clever notebooks — it is operable boundaries.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| capacity signal | Metric that shows the system is under pressure |
| backpressure | Safely slowing or rejecting work when overloaded |
| cost control | Budget or quota that bounds spend while scaling |
| quality guard | Check that volume has not degraded predictions |
| rollback trigger | Condition that forces retreat to a safer path |
| workload type | Batch, online, streaming, or mixed traffic shape |

## Proof checklist

- [ ] `scaling_runbook.py` exists in your course folder
- [ ] Running it prints all six runbook fields
- [ ] You can explain capacity, backpressure, cost, quality, and rollback
- [ ] You changed one field and re-ran successfully
- [ ] You wrote when to refuse work vs when to roll back
- [ ] Optional: glance back at stages 01–05 and confirm each artifact still makes sense as a chain

When those are true, you have completed **AI Foundations Engineering** at the local practice level.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
