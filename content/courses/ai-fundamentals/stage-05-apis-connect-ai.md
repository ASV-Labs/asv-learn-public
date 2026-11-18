# How APIs Connect AI Features

## Why this lesson exists

An API is how software asks another system to do work and receives a response. AI features use the same idea: request → boundary checks → model work → response → errors.

This course is an **AI builder** course, not a heavy API development course. You will learn just enough API vocabulary to inspect AI product flows: endpoints, payloads, status, and errors. The hard rule stays: **learner external AI API keys are not used or allowed**. ASV Learn internal APIs handle AI access behind tier guardrails.

Practice is a local Python simulation of an internal AI request envelope — no `.env` full of provider secrets.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `internal_ai_flow.py` in that folder.

## API vocabulary for AI builders

| Term | Plain meaning | AI feature example |
| --- | --- | --- |
| **Endpoint** | Named URL/path for an action | `POST /internal/ai/complete` |
| **Request** | What you send | Auth token, prompt package, course id |
| **Payload** | Body data | Task, context refs, max tokens |
| **Response** | What comes back | Text or structured fields + usage |
| **Status** | Machine-readable outcome | 200 ok, 401 auth, 429 rate limit, 403 tier |
| **Error** | Controlled failure info | Why blocked + safe user message |

You are not building a multi-provider SDK. You are learning to read the **boundary** between product code and model access.

## The internal AI interaction flow

```text
Learner UI
  → Internal AI API (auth, tier, rate limit, logging)
    → Prompt + approved context package
      → Model role (provider hidden behind platform)
        → Validation
          → User-visible answer OR safe fallback
```

What learners must never do on this path:

- Paste personal OpenAI / Anthropic / Google keys into course work
- Call provider APIs directly “to skip the platform”
- Treat 200 OK as “the answer is true”

What the platform must always do:

- Authenticate the caller
- Enforce paid-tier and rate limits
- Log usage for cost and abuse review
- Return structured errors when blocked

## Requests, responses, and honest status

Think in envelopes, not magic:

```python
request = {
    "endpoint": "/internal/ai/complete",
    "auth": "session_token",
    "tier": "builder",
    "payload": {
        "task": "summarize approved notes",
        "context_refs": ["module-02"],
        "max_tokens": 400,
    },
}

response = {
    "status": 200,
    "body": {"text": "...", "citations": ["module-02"]},
    "usage": {"input_tokens": 120, "output_tokens": 80},
}
```

Useful status meanings for builders:

| Status idea | Meaning for the product |
| --- | --- |
| Success | Validation can still reject the body |
| Auth failure | Do not retry with a learner-owned key |
| Tier blocked | Upgrade path or feature gate — not a prompt tweak |
| Rate limited | Back off; show a calm retry message |
| Validation failure | Fix contract or fall back; do not show raw junk |

## What this lesson is not

- Not “install three vendor SDKs and ship chat”
- Not streaming client homework
- Not teaching you to hide keys in frontend code

Deeper API design belongs in a separate course. Here, the artifact is an **internal AI interaction flow diagram** expressed as data you can print and explain.

## Common mistakes

**Equating API access with product readiness.** A working call can still return unsafe text.

**Putting provider keys in learner exercises.** Forbidden on this path.

**Ignoring errors.** 429 and 403 are product UX problems, not footnotes.

**Drawing arrows that skip validation.** The flow is incomplete without a check and fallback.

## How to use this lesson

Read in this order:

- **Learn:** map request → internal API → model work → validation → response or fallback
- **Inspect:** read status codes as product UX signals, not footnotes
- **Build:** fill the flow envelope before imagining SDK code
- **Prove:** explain why a 403 should not be “fixed” with a learner-owned provider key

Practice after reading means you should understand auth, tier, rate limit, and validation layers before editing code.

## Your local task

### Step 1 — Create the starter

Create `internal_ai_flow.py`:

```python
# internal_ai_flow.py — Stage 05: How APIs Connect AI Features
# Simulate an internal AI call. No external provider keys.

flow = {
    "feature": "Study summary helper",
    "endpoint": "/internal/ai/complete",
    "request": {
        "auth": "TODO: session or service auth description",
        "tier_check": "TODO: who may call this",
        "rate_limit": "TODO: calls per minute/day",
        "payload": {
            "task": "TODO",
            "context_refs": ["TODO"],
            "output_contract": "TODO",
        },
    },
    "happy_path_response": {
        "status": 200,
        "body_fields": ["TODO", "TODO"],
        "usage_logged": "TODO: what gets logged",
    },
    "blocked_cases": [
        {"status": 403, "reason": "TODO: tier blocked", "user_message": "TODO"},
        {"status": 429, "reason": "TODO: rate limit", "user_message": "TODO"},
    ],
    "validation_after_response": "TODO: what must pass before UI shows text",
    "fallback": "TODO: safe UI behavior on failure",
}

def print_flow(f):
    print("=== Internal AI Interaction Flow ===")
    import json
    print(json.dumps(f, indent=2))

if __name__ == "__main__":
    print_flow(flow)
```

### Step 2 — Fill every TODO

Be specific. Example directions:

- `tier_check`: “builder tier or above”
- `validation_after_response`: “citations non-empty; refuse if context_refs missing”
- `fallback`: “show lesson link + ‘summary unavailable’ — do not invent notes”

### Step 3 — Run

```bash
python3 internal_ai_flow.py
```

Windows:

```bash
python internal_ai_flow.py
```

### Step 4 — Explain one blocked case

In a comment, explain why a 403 should **not** be “fixed” by asking the learner for an external API key.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| internal API | Platform-owned gateway to AI capabilities |
| payload | Request body fields the gateway accepts |
| status code | Machine signal for ok / auth / tier / rate limit |
| usage log | Record of tokens/calls for cost and abuse review |
| fallback | User-safe behavior when the call or validation fails |
| provider key | External vendor secret — not allowed for learners here |

## Proof checklist

- [ ] `internal_ai_flow.py` prints a complete flow without TODO
- [ ] Request includes auth, tier, rate limit, and payload
- [ ] At least two blocked cases with user messages
- [ ] Validation and fallback are named after the response
- [ ] You can explain why external learner keys are forbidden

When those are true, continue to **Structured Outputs and Validation**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
