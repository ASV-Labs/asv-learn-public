# AI Workflows and Tool Use

## Why this lesson exists

Tool use is how an AI feature takes **controlled actions** — search notes, draft a card, open a lesson link — without becoming magical autonomy. Builders must map when a workflow may read, suggest, create, or escalate, and what approval boundary protects the user.

This stage is a tool-routing simulation in local Python. You will not wire live vendor tool APIs or hide keys in a notebook.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `tool_routing.py` in that folder.

## Tools are permissions, not personality

| Action class | Example | Typical approval |
| --- | --- | --- |
| **Read** | Fetch approved lesson chunk | Usually automatic if tier allows |
| **Suggest** | Draft a summary for review | Show draft; user accepts |
| **Create** | Save a flashcard to the learner’s deck | Confirm before write |
| **Escalate** | Hand off to human mentor / support | Stop automation |

If your design collapses all four into one “do everything” tool, you cannot audit or limit blast radius.

## Tool contract shape

Every tool needs a contract:

```python
tool = {
    "name": "lesson_search_read_only",
    "action_class": "read",
    "allowed_args": ["query", "course_slug"],
    "forbidden": ["write_files", "send_email", "fetch_unapproved_urls"],
    "returns": "list of {source_id, snippet}",
    "audit_fields": ["user_id", "query", "timestamp"],
}
```

Contracts turn “the model can call tools” into something a reviewer can approve.

## Routing simulation

A workflow router chooses among tools (or none) based on the user ask:

```text
User ask
  → classify intent (read / suggest / create / escalate)
    → pick allowed tool OR refuse
      → validate args
        → (production) call through internal API
          → log audit fields
```

In this course, production calls would still go through internal APIs with tier limits. Your local file only simulates routing decisions.

## When not to add tools

Skip tools when:

- A static lesson link answers the question
- Structured validation of a draft is enough
- The action needs a human every time anyway
- You cannot name a forbidden action for the tool

Agents (next stage) amplify tool mistakes. Keep this stage narrow.

## Approval boundaries in plain language

Say the boundary out loud before you code the router:

- *This workflow may read approved lesson chunks without asking.*
- *This workflow may suggest a draft, but the learner must accept it.*
- *This workflow may create a saved card only after confirmation.*
- *This workflow must escalate if the ask leaves the course domain or requests secrets.*

If you cannot say those sentences, you do not have a tool design yet — you have a wish.

### Audit fields worth keeping

| Field | Why |
| --- | --- |
| `user_id` | Who triggered the action |
| `tool_name` | Which permission ran |
| `args_summary` | What was requested (redact secrets) |
| `decision` | allow / confirm / refuse / escalate |
| `timestamp` | When it happened |

Internal APIs should log these in production. Your local simulation prints them so the habit forms early.

## Common mistakes

**One mega-tool.** Read+write+email in a single function is an incident waiting for a prompt injection.

**No audit fields.** If you cannot say who called what, you cannot investigate abuse.

**Silent create actions.** Writing to a deck or profile without confirmation trains unsafe habits.

**Treating routing as model vibes only.** Encode allowlists in code, not only in prose prompts.

## How to use this lesson

Read in this order:

- **Learn:** separate read, suggest, create, and escalate action classes
- **Inspect:** read each tool contract for forbidden actions and confirmation needs
- **Build:** route four sample asks through the allowlist
- **Prove:** explain why the unsafe ask escalates or refuses instead of mapping to a create tool

Practice after reading means you should understand action classes before editing code. If every ask maps to a tool, your router is too permissive.

## Your local task

### Step 1 — Create the starter

Create `tool_routing.py`:

```python
# tool_routing.py — Stage 09: AI Workflows and Tool Use

tools = {
    "lesson_search_read_only": {
        "action_class": "read",
        "forbidden": ["write_files", "send_email"],
        "needs_confirmation": False,
    },
    "flashcard_draft_suggest": {
        "action_class": "suggest",
        "forbidden": ["save_without_preview"],
        "needs_confirmation": True,
    },
    "save_flashcard": {
        "action_class": "create",
        "forbidden": ["overwrite_without_confirm"],
        "needs_confirmation": True,
    },
}

requests = [
    {"ask": "Find the Module 02 section on booleans", "intent": "TODO"},  # read|suggest|create|escalate
    {"ask": "Draft a flashcard for 'variable'", "intent": "TODO"},
    {"ask": "Save that flashcard to my deck", "intent": "TODO"},
    {"ask": "Email my password reset link to a friend", "intent": "TODO"},
]

def route(ask_row, tools):
    intent = ask_row["intent"]
    if intent == "escalate" or intent not in {"read", "suggest", "create"}:
        return {
            "tool": None,
            "decision": "escalate_or_refuse",
            "reason": "TODO: why this ask should not run a tool",
        }
    for name, spec in tools.items():
        if spec["action_class"] == intent:
            return {
                "tool": name,
                "decision": "allow_with_contract",
                "needs_confirmation": spec["needs_confirmation"],
                "forbidden": spec["forbidden"],
            }
    return {"tool": None, "decision": "refuse", "reason": "no tool for intent"}

def main():
    print("=== Tool-Routing Simulation ===")
    for row in requests:
        result = route(row, tools)
        print(f"\nask: {row['ask']}")
        print(f"intent: {row['intent']}")
        for key, value in result.items():
            print(f"  {key}: {value}")

if __name__ == "__main__":
    main()
```

### Step 2 — Fill intents and reasons

Set intents for all four asks. The password-reset/email style ask should **escalate or refuse**, not map to a create tool. Replace the escalate reason TODO with a clear safety sentence.

### Step 3 — Run

```bash
python3 tool_routing.py
```

Windows:

```bash
python tool_routing.py
```

### Step 4 — Tighten one contract

Add an `audit_fields` list to one tool and print it in the routing result for that tool. Re-run.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| tool | Controlled action an AI workflow may invoke |
| action class | read / suggest / create / escalate |
| tool contract | Allowed args, forbidden actions, audit fields |
| confirmation | Human approval before a write/create |
| routing | Choosing which tool (if any) fits an ask |
| least privilege | Grant only the smallest useful permission |

## Proof checklist

- [ ] `tool_routing.py` routes all four sample asks
- [ ] At least one ask escalates or refuses for safety
- [ ] Create/suggest paths show confirmation needs
- [ ] Forbidden actions are visible in the output
- [ ] You added audit fields to at least one tool

When those are true, continue to **Agents as Guarded Workflows**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
