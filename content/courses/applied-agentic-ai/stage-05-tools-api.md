# Tools & API Integration

## Why this lesson exists

Tools are **permissions**. Every capability you connect to an agent — search, file read, database query, send email — is power that must be named, limited, and auditable.

Stage 04 gave you a workflow. This stage gives you a **tool contract**: a Python dictionary that says what the agent may do, what it may not do, what input is allowed, what output returns, and what gets logged.

You practice locally by writing contracts and a tiny validation function. You are not required to call live APIs in this stage. The skill is making access **enforceable** before it is **enabled**.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.

## Reminder: where you work

```bash
cd ~/asv-learn-applied-agentic-ai
```

Windows:

```powershell
cd $HOME\asv-learn-applied-agentic-ai
```

You will create `tool_contract.py` in that folder.

## Start here: permissions before API calls

At the start, do not connect an API because it is convenient. First name:

1. The **tool name**
2. The **one allowed action**
3. The **forbidden action**
4. The **input schema** — shape of data the tool accepts
5. The **output schema** — shape of data the tool returns
6. The **audit log fields** — evidence preserved for review

A tool contract turns access into something enforceable. If another engineer could not check or log the behavior, the agent should not have that tool yet.

## How to use this lesson

Read in this order:

- **Learn:** understand that a tool gives an agent controlled power
- **Inspect:** identify allowed action, forbidden action, input schema, output schema, and audit fields
- **Build:** write one tool contract before connecting anything
- **Prove:** explain how another engineer could enforce the contract

Practice after reading means tool access should feel narrow and reviewable. If the contract cannot be enforced, the agent should not have the tool yet.

## One clean pass through this lesson

Before the editor, read tool integration as a permissions-before-API-calls chain:

1. The tool name says which capability is being granted.
2. The allowed action says the one thing the agent may do.
3. The forbidden action says what must stay blocked.
4. The input and output shapes make the tool contract enforceable.
5. The audit fields preserve evidence of tool use.

That chain turns access into something the team can check. If the permission cannot be logged or enforced, the agent is not ready to use that tool.

Do not start by connecting an API. First say the tool contract in one sentence: tool name, allowed action, forbidden action, input shape, output shape, and audit log fields.

## The tool contract shape

```python
tool_contract = {
    "tool_name": "course_search",
    "allowed_action": "read published lesson and saved learner check summaries",
    "forbidden_action": "change grades, reveal secrets, or access unrelated projects",
    "input_schema": {
        "course_slug": "string",
        "stage_slug": "string",
        "question": "string",
    },
    "output_schema": {
        "sources": "list",
        "answer_context": "string",
    },
    "audit_log_fields": ["user_id", "course_slug", "stage_slug", "tool_name"],
}
```

### Why schemas matter

Input and output schemas are not bureaucracy. They are how code **rejects bad calls** before they reach production:

- Missing required keys → reject
- Unexpected action verb → reject
- Output missing audit fields → reject

## Local validation pattern

You can enforce a contract without a live API:

```python
def validate_input(contract, payload):
    required = contract["input_schema"].keys()
    missing = [k for k in required if k not in payload]
    return missing

def audit_log(contract, payload, result):
    entry = {field: payload.get(field) for field in contract["audit_log_fields"]}
    entry["tool_name"] = contract["tool_name"]
    return entry
```

This is the same discipline production systems use — just without network calls yet.

## Common mistakes

**Tools without forbidden actions.** Allowed lists alone do not block creative misuse.

**Schemas that accept anything.** `"input": "any"` is not a schema.

**No audit fields.** If tool use cannot be reviewed later, you cannot investigate incidents.

**Combining read and write in one tool.** Split permissions so read-only paths stay read-only.

**Connecting APIs before the contract exists.** The contract should come first, always.

## Your local task

### Step 1 — Create the starter

Create `tool_contract.py`:

```python
# tool_contract.py — Stage 05: Tools & API Integration
# Run unchanged, then write a contract for a coding assistant tool.

tool_contract = {
    "tool_name": "course_search",
    "allowed_action": "read published lesson and saved learner check summaries",
    "forbidden_action": "change grades, reveal secrets, or access unrelated projects",
    "input_schema": {
        "course_slug": "string",
        "stage_slug": "string",
        "question": "string",
    },
    "output_schema": {
        "sources": "list",
        "answer_context": "string",
    },
    "audit_log_fields": ["user_id", "course_slug", "stage_slug", "tool_name"],
}

def validate_input(contract, payload):
    required = list(contract["input_schema"].keys())
    missing = [key for key in required if key not in payload]
    return missing

def build_audit_entry(contract, payload):
    entry = {field: payload.get(field, "unknown") for field in contract["audit_log_fields"]}
    entry["tool_name"] = contract["tool_name"]
    return entry

if __name__ == "__main__":
    good_call = {
        "user_id": "learner-12",
        "course_slug": "applied-agentic-ai",
        "stage_slug": "stage-05",
        "question": "What fields belong in a tool contract?",
    }
    bad_call = {"course_slug": "applied-agentic-ai"}

    for label, payload in [("good", good_call), ("bad", bad_call)]:
        missing = validate_input(tool_contract, payload)
        print(f"\n=== {label} call ===")
        if missing:
            print("REJECTED missing:", missing)
        else:
            print("ACCEPTED")
            print("Audit:", build_audit_entry(tool_contract, payload))
```

### Step 2 — Run unchanged

```bash
python3 tool_contract.py
```

Windows:

```bash
python tool_contract.py
```

Confirm the good call is accepted and the bad call is rejected with clear missing fields.

### Step 3 — Write your own tool contract

Create a contract for a **local file read tool** that may only read `.py` files inside your course folder. Define:

- A narrow allowed action
- At least two forbidden actions
- Input schema with `file_path`
- Output schema with `content` and `line_count`
- Audit fields you would want in a log

Update `validate_input` if your required keys change.

### Step 4 — Test rejection

Add a call that includes a forbidden path pattern (for example `../secrets.env`). In a comment, explain how production code would block it even before reading the file.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| tool | A controlled capability the agent may invoke |
| tool contract | Permissions, schemas, and audit rules for one tool |
| input schema | Required shape of data sent to the tool |
| output schema | Required shape of data returned from the tool |
| audit log | Record of who invoked which tool with what inputs |
| least privilege | Granting the smallest access that still works |

## Proof checklist

- [ ] `tool_contract.py` exists and runs without errors
- [ ] Your tool contract has all six conceptual areas covered
- [ ] Valid input passes; invalid input is rejected with missing keys listed
- [ ] Audit entry includes the fields you defined
- [ ] You can explain how another engineer would enforce the contract

When those are true, continue to **Production Agent Systems**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
