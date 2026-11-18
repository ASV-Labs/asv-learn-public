# Agent Architectures

## Why this lesson exists

An agent is not magic autonomy. It is **control flow**: a loop with a goal, ordered steps, state, stop conditions, escalation rules, and success checks.

Stage 01 gave you a boundary. Stage 02 gave you a prompt contract. Stage 03 gave you source rules. Now you design the **workflow** — the sequence another engineer can read and audit.

You will write an **agent workflow** dictionary and a tiny Python loop that walks through steps locally. No live model calls. You are learning to keep loops small, inspectable, and stoppable.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.

## Reminder: where you work

```bash
cd ~/asv-learn-applied-agentic-ai
```

Windows:

```powershell
cd $HOME\asv-learn-applied-agentic-ai
```

You will create `agent_workflow.py` in that folder.

## Start here: control flow before autonomy

At the start, do not picture an agent as a self-running worker. First name:

1. The **goal** — one job the agent may help with
2. The **ordered steps** — explicit sequence, not open-ended trying
3. The **state fields** — context the loop must track
4. The **stop condition** — when enough help exists
5. The **escalation condition** — when a human must take over
6. The **success check** — what a good response must reference

An agent workflow should be small enough for a reviewer to follow. If the loop cannot stop or escalate clearly, it is not ready for more tool access.

## How to use this lesson

Read in this order:

- **Learn:** understand why an agent loop needs state, allowed steps, stops, escalation, and success checks
- **Inspect:** identify the goal, step order, state fields, stop condition, escalation condition, and success check
- **Build:** write one small agent workflow before imagining a production worker
- **Prove:** explain how the workflow prevents wandering into unrelated work

Practice after reading means the loop should be small enough to inspect. A bounded assistant is more useful than an agent that keeps trying actions without a clear stop.

## One clean pass through this lesson

Before the editor, read agent architecture as a control-flow-before-autonomy chain:

1. The goal says the one job the agent is allowed to help with.
2. The ordered steps make the loop readable.
3. The state fields say what context must stay attached.
4. The stop condition says when enough help exists.
5. The escalation condition and success check say when to hand off and how to judge the result.

That chain keeps agent design from becoming an open-ended worker. A useful workflow is small enough for a reviewer to follow and bounded enough to stop.

Do not start by designing an open-ended loop. First say the agent workflow in one sentence: goal, ordered steps, state fields, stop condition, escalation condition, and success check.

## A safe agent loop pattern

Start with a small loop:

1. Read the user request.
2. Inspect available context.
3. Choose one allowed action.
4. Check the result.
5. Stop, escalate, or continue.

```python
agent_workflow = {
    "goal": "help a learner debug their latest local practice run",
    "steps": [
        "read request",
        "inspect saved check output",
        "suggest one next step",
        "ask for confirmation",
    ],
    "state_fields": ["course", "stage", "latest_check_status"],
    "stop_condition": "learner has a clear next step or evidence is missing",
    "escalation_condition": "unsafe request or missing course context",
    "success_check": "response references the current stage and latest check result",
}
```

Note: this course uses **local Python practice** — edit, save, run in a terminal. The workflow references saved check output from your proof checklists, not a hosted sandbox.

## State matters

State is what the loop remembers between steps. Without it, each step acts blind.

| State field | Why track it |
| --- | --- |
| `course` | Keeps advice scoped to the right material |
| `stage` | Prevents generic answers that ignore progress |
| `latest_check_status` | Grounds suggestions in what the learner actually ran |

In code, state is often a dictionary passed into each step function.

## Common mistakes

**Open-ended loops.** "Keep trying until it works" is not a workflow.

**Missing stop conditions.** Loops without stops burn time, money, and trust.

**Steps that are too vague.** "Help the user" is not a step. "Suggest one next debugging step" is.

**No escalation path.** When context is unsafe or incomplete, the loop must hand off.

**Success checks that ignore state.** A good answer references where the learner actually is.

## Your local task

### Step 1 — Create the starter

Create `agent_workflow.py`:

```python
# agent_workflow.py — Stage 04: Agent Architectures
# Run unchanged, then customize the workflow for a learning assistant.

agent_workflow = {
    "goal": "help a learner debug their latest local practice run",
    "steps": [
        "read request",
        "inspect saved check output",
        "suggest one next step",
        "ask for confirmation",
    ],
    "state_fields": ["course", "stage", "latest_check_status"],
    "stop_condition": "learner has a clear next step or evidence is missing",
    "escalation_condition": "unsafe request or missing course context",
    "success_check": "response references the current stage and latest check result",
}

state = {
    "course": "applied-agentic-ai",
    "stage": "stage-04",
    "latest_check_status": "rag_plan.py ran; retrieve() returned 1 document",
    "user_request": "Why did my retrieve function return nothing?",
}

def run_step(step, workflow, current_state):
    print(f"Step: {step}")
    if step == "read request":
        print("  Request:", current_state.get("user_request"))
    elif step == "inspect saved check output":
        print("  Check status:", current_state.get("latest_check_status"))
    elif step == "suggest one next step":
        print("  Suggestion: print query words and document text lengths")
    elif step == "ask for confirmation":
        print("  Stop?", workflow["stop_condition"])

def should_escalate(workflow, current_state):
    if not current_state.get("course"):
        return True, workflow["escalation_condition"]
    return False, None

if __name__ == "__main__":
    escalate, reason = should_escalate(agent_workflow, state)
    if escalate:
        print("ESCALATE:", reason)
    else:
        for step in agent_workflow["steps"]:
            run_step(step, agent_workflow, state)
        print("\nSuccess check:", agent_workflow["success_check"])
```

### Step 2 — Run unchanged

```bash
python3 agent_workflow.py
```

Windows:

```bash
python agent_workflow.py
```

Follow the printed steps. Confirm the loop is readable and ends with a success check.

### Step 3 — Customize the workflow

Change the workflow for a **learning assistant** helping with your Applied Agentic AI course folder. Update at least:

- One step name to be more specific
- One state field you actually track locally
- The stop condition in plain language you would trust

### Step 4 — Trigger escalation

Clear `course` from `state` and run again. Confirm the script escalates instead of running the loop.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| control flow | The ordered path an agent follows |
| agent loop | Repeated steps until stop or escalation |
| state | Context the agent tracks between steps |
| stop condition | When the loop ends successfully |
| escalation | Handing control to a human |
| success check | Evidence a good response must include |

## Proof checklist

- [ ] `agent_workflow.py` exists and runs without errors
- [ ] Your workflow lists goal, steps, state fields, stop, escalation, and success check
- [ ] Running with valid state walks through all steps
- [ ] Clearing required state triggers escalation
- [ ] You can explain how the workflow prevents unrelated work

When those are true, continue to **Tools & API Integration**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
