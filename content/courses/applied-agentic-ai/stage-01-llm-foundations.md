# Large Language Models Foundations

## Why this lesson exists

Applied Agentic AI is not a course about making chatbots sound confident. It is about building **bounded systems** — agents with clear goals, limited tools, reviewable outputs, and explicit stop conditions.

Before you connect any tool to a model, you need to understand the difference between a **raw model call** and an **agent**. A model predicts text from context. An agent wraps that prediction with a job description, permissions, checks, and rules for when to stop or hand work to a human.

This first stage teaches you to write an **agent spec** — a small Python dictionary that another engineer or reviewer can inspect before any API keys are involved. You will practice locally: edit a file, save, run, and read the output in your terminal.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.

## Reminder: where you work

Create a dedicated folder for this course:

```bash
mkdir -p ~/asv-learn-applied-agentic-ai
cd ~/asv-learn-applied-agentic-ai
```

Windows (PowerShell):

```powershell
mkdir $HOME\asv-learn-applied-agentic-ai
cd $HOME\asv-learn-applied-agentic-ai
```

You will create `agent_boundary.py` in that folder.

## Model versus agent

| Part | What it does |
| --- | --- |
| **Model** | Predicts text from the prompt and context |
| **Goal** | Describes the job the system is trying to complete |
| **Tool** | Gives the system a controlled action (search, file read, API call) |
| **Guardrail** | Limits unsafe, irrelevant, or low-quality behavior |
| **Success check** | Defines what a good answer must prove |
| **Escalation condition** | Tells the system when to stop and involve a human |

A useful agent is **narrow**. It does one trusted job with one allowed tool, names what it must never do, and stops when evidence is missing.

## Start here: agent boundary before tools

At the start, do not connect tools to a model just because you can. First name:

1. The **job** the agent is trusted to do
2. The **allowed information** it may use
3. The **action boundary** — one tool, read-only if possible
4. The **success check** a reviewer can inspect
5. The **condition** that sends work back to a human

You are not building an autonomous production worker yet. You are learning the boundary that keeps an agent useful, reviewable, and limited to the task it was actually trusted to do.

### Boundary questions and what they protect

| Boundary question | What it protects |
| --- | --- |
| What job is trusted? | The agent does not drift into a different task |
| What information is allowed? | The agent does not invent or pull unrelated context |
| What tool is allowed? | The agent cannot reach for every possible action |
| What action is forbidden? | The agent has a visible line it must not cross |
| When should it stop? | A human gets the work before uncertainty becomes risk |

Do not start by editing code. First say the boundary out loud in one sentence: *this agent may do this job, with this tool, under these limits, and must stop in this situation.*

## How to use this lesson

Read in this order:

- **Learn:** name the goal, allowed information, allowed tool, forbidden action, and stop condition
- **Inspect:** check what each agent-spec field prevents before reading the Python dictionary
- **Build:** add one safe, read-only tool and one explicit forbidden action
- **Prove:** explain when the agent should stop or hand work to a human

Practice after reading means you should understand the agent boundary before editing code. If the starter object looks like a block of configuration, read one field at a time and ask: *what behavior does this limit?*

## One clean pass through this lesson

Before the editor, read the agent boundary as a plain safety story:

1. A human gives the agent one job.
2. The agent may use only the information named in the boundary.
3. The agent may use only the tool listed in the boundary.
4. The agent must avoid the forbidden action even if the prompt sounds helpful.
5. The agent must stop when the success check cannot be proven.

That is the difference between a useful agent and a risky chatbot with tools. The point is not to make the model sound confident. The point is to make the job narrow enough that a teammate can review what happened.

## The agent spec shape

In Python, an agent spec is often a dictionary with string keys and list or string values:

```python
agent_spec = {
    "goal": "summarize support tickets for a human reviewer",
    "allowed_tools": ["ticket_search_read_only"],
    "forbidden_actions": ["expose secrets", "delete tickets"],
    "success_check": "summary cites ticket ids and names uncertainty",
    "escalation_condition": "missing ticket context or unsafe request",
}
```

Each field is a **contract**, not decoration:

- `goal` — what the agent is allowed to help with
- `allowed_tools` — keeps tool access narrow (list of tool names)
- `forbidden_actions` — what the agent must not do even if asked nicely
- `success_check` — makes output reviewable by a human
- `escalation_condition` — when to stop and hand off

## Common mistakes

**Connecting every tool first.** If the spec is vague, adding tools makes the system harder to review, not smarter.

**Forgetting forbidden actions.** Without explicit forbidden actions, reviewers cannot tell whether the agent crossed a line.

**Success checks that cannot be verified.** "Give a helpful answer" is not a success check. "Summary cites ticket IDs and names uncertainty" is.

**No escalation condition.** An agent that never stops guessing is not ready for real work.

**Confusing the model with the agent.** The model generates text; the agent spec defines what that text is allowed to accomplish.

## Your local task

### Step 1 — Create the starter

Create `agent_boundary.py` with this starter:

```python
# agent_boundary.py — Stage 01: LLM Foundations
# Run unchanged first, then tighten one boundary field.

agent_spec = {
    "goal": "summarize support tickets for a human reviewer",
    "allowed_tools": ["ticket_search_read_only"],
    "forbidden_actions": ["expose secrets", "delete tickets"],
    "success_check": "summary cites ticket ids and names uncertainty",
    "escalation_condition": "missing ticket context or unsafe request",
}

def print_boundary(spec):
    print("=== Agent Boundary ===")
    for key, value in spec.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_boundary(agent_spec)
```

### Step 2 — Run unchanged

```bash
python3 agent_boundary.py
```

Windows:

```bash
python agent_boundary.py
```

Read the output. Match each printed field to one behavior it limits.

### Step 3 — Tighten one field

Change **one** field to make the boundary safer or clearer. Examples:

- Add a forbidden action like `"send email without human approval"`
- Make the success check more specific
- Narrow `allowed_tools` to a single tool

Save and run again. Confirm the output shows your change.

### Step 4 — Explain the handoff

In a comment at the bottom of the file (or a separate note), write two sentences:

1. When would this agent **stop successfully**?
2. When would it **escalate to a human**?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| LLM | Large language model — predicts text from context |
| agent | Model output wrapped with goals, tools, checks, and limits |
| agent spec | A dictionary describing what an agent may and may not do |
| tool | A controlled action the agent can invoke (search, read file, API call) |
| escalation | Stopping automated work and handing control to a human |
| success check | A reviewable requirement the output must satisfy |

## Proof checklist

- [ ] `agent_boundary.py` exists in `~/asv-learn-applied-agentic-ai`
- [ ] Running it prints all five agent-spec fields
- [ ] You can explain what each field limits
- [ ] You changed one field, re-ran, and saw the update
- [ ] You wrote when the agent stops vs escalates

When those are true, continue to **Prompt Engineering Mastery**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
