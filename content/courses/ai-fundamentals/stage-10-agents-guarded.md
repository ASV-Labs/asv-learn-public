# Agents as Guarded Workflows

## Why this lesson exists

An agent is not “a chatbot with vibes.” It is a **loop** with a goal, state, tools, checks, and stop rules. Unguarded loops can retry forever, drift off goal, explode cost, or take unsafe actions.

This stage teaches agents as **guarded workflows**. You will sketch a limited assistant that can only act inside defined boundaries — locally, in Python, without live tool execution or provider keys.

## How to use this lesson

- **Learn:** separate one-shot model calls from loops with tools and stop rules
- **Inspect:** read the simulated step trace before editing success or escalation text
- **Build:** write success and escalation checks another engineer could verify without guessing
- **Prove:** break `max_steps` on purpose and name what state was left incomplete

Stage 09 tool routing and Stage 06 validation feed this loop: tools are permissions; tool args should pass the same contract discipline.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `guarded_agent.py` in that folder.

## Model call versus agent

| Idea | Meaning |
| --- | --- |
| Model call | One-shot text prediction from a prompt |
| Workflow | Fixed or lightly branched sequence |
| Agent | Loop: think → act (tool) → observe → decide → stop/escalate |

Agents are powerful when the next action depends on intermediate results. They are dangerous when stop conditions are missing.

## The guarded loop

```text
goal + state
  → propose next step (within allowlist)
    → run one allowed tool OR refuse
      → update state
        → success check met? → stop
        → escalation condition? → hand to human
        → max steps hit? → stop
        → else continue
```

Required pieces before trust:

1. **Goal** — one job
2. **State** — what is known so far
3. **Allowed steps/tools** — short allowlist
4. **Success check** — reviewable completion
5. **Escalation / stop rules** — when to quit
6. **Max steps** — cost and loop brake

## When not to use an agent

Prefer a simpler prompt or single tool call when:

- One retrieval + one answer is enough
- The path is a fixed checklist
- Every write needs a human anyway
- You cannot define success or stop conditions yet

Stage 09 tool routing often beats a vague agent.

## Worked trace (what “guarded” looks like)

For the starter goal “find an approved chunk and draft a study note for human review,” a healthy trace might read:

```text
step 1: tool:lesson_search_read_only | need approved chunk
step 2: tool:draft_study_note_suggest | need draft for review
step 3: stop_success | draft_note exists and retrieved_source_id is set
```

If `course` were missing, step 1 should escalate instead of guessing a catalog. If `max_steps` were `1`, the trace should stop with incomplete state — proof the brake works. Production agents add logging on every step; your printout is the teaching version of that audit trail.

## Failure modes to design against

| Failure | Guard |
| --- | --- |
| Infinite loop | `max_steps` + identical-state detection |
| Goal drift | Re-check goal each step |
| Hallucinated tool args | Schema validation (Stage 06 habit) |
| Cost explosion | Tier limits via internal API + step budget |
| Unsafe action | Forbidden list + escalate |

## Common mistakes

**Starting with multi-agent swarms.** One narrow agent with one read-only tool is enough to learn.

**No escalation condition.** “Keep trying” is not a product strategy.

**Success checks that cannot be verified.** “Helpful answer” fails. “Summary cites source_id and lists unknowns” works.

**Pretending local simulation is production autonomy.** Your Python sketch proves the boundary; it does not deploy an agent.

## Your local task

### Step 1 — Create the starter

Create `guarded_agent.py`:

```python
# guarded_agent.py — Stage 10: Agents as Guarded Workflows

agent = {
    "goal": "Help a learner find an approved lesson chunk and draft a study note for human review",
    "state": {
        "course": "python-zero",
        "question": "What is a boolean?",
        "retrieved_source_id": None,
        "draft_note": None,
    },
    "allowed_tools": ["lesson_search_read_only", "draft_study_note_suggest"],
    "forbidden_actions": ["send_email", "save_without_confirmation", "browse_unapproved_web"],
    "max_steps": 3,
    "success_check": "TODO: what must be true to stop successfully",
    "escalation_condition": "TODO: when to hand to a human",
}

def next_action(agent):
    state = agent["state"]
    if not state.get("course") or not state.get("question"):
        return "escalate", "missing course or question"
    if state.get("retrieved_source_id") is None:
        return "tool:lesson_search_read_only", "need approved chunk"
    if state.get("draft_note") is None:
        return "tool:draft_study_note_suggest", "need draft for review"
    return "stop_success", agent["success_check"]

def simulate(agent):
    print("=== Guarded Agent Loop Sketch ===")
    for key in ("goal", "allowed_tools", "forbidden_actions", "max_steps", "success_check", "escalation_condition"):
        print(f"{key}: {agent[key]}")
    print("\n--- simulated steps ---")
    for step in range(1, agent["max_steps"] + 1):
        action, reason = next_action(agent)
        print(f"step {step}: action={action} | reason={reason}")
        if action.startswith("escalate") or action.startswith("stop_"):
            break
        if action == "tool:lesson_search_read_only":
            agent["state"]["retrieved_source_id"] = "module-02-variables"
        elif action == "tool:draft_study_note_suggest":
            agent["state"]["draft_note"] = "Boolean is True/False (from module-02-variables)."
    print("\nfinal_state:", agent["state"])

if __name__ == "__main__":
    # Fill TODOs before running for real portfolio proof
    if "TODO" in agent["success_check"] or "TODO" in agent["escalation_condition"]:
        agent["success_check"] = "draft_note exists and retrieved_source_id is set"
        agent["escalation_condition"] = "missing course/question or tool result empty"
    simulate(agent)
```

### Step 2 — Replace the default TODO fill-ins with your wording

Edit `success_check` and `escalation_condition` to your own reviewable sentences. Optionally clear `course` to see escalation.

### Step 3 — Run

```bash
python3 guarded_agent.py
```

Windows:

```bash
python guarded_agent.py
```

Watch the step trace. Confirm the loop stops.

### Step 4 — Break it on purpose

Set `max_steps` to `1`, run again, and explain what incomplete state remains. Then restore a sensible max.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| agent loop | Repeated propose → act → observe → decide cycle |
| state | Memory of what the workflow knows so far |
| stop rule | Condition that ends the loop |
| escalation | Handing control to a human |
| allowlist | Tools/steps the agent may use |
| guarded workflow | Agent design with explicit limits and checks |

## Proof checklist

- [ ] `guarded_agent.py` prints goal, tools, forbidden actions, and a step trace
- [ ] Success check and escalation condition are concrete
- [ ] Loop stops without needing a live model
- [ ] You tested a missing-state escalation or max_steps brake
- [ ] You can explain when a simpler workflow beats an agent

When those are true, continue to **Responsible AI, Guardrails, and Tiered Access**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
