# Models, LLMs, and AI System Parts

## Why this lesson exists

An AI feature is a **controlled product system**, not a naked model. The model is one engine inside a larger flow: user interface, prompt, approved context, internal API boundary, validation, tier limits, logging, and fallback behavior.

Stage 01 taught you to classify claims. Stage 02 teaches you to map the moving parts so you can see where trust is earned — and where it fails.

You will print an **AI system parts map** for one feature in local Python.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows:

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `ai_system_map.py` in that folder.

## Model versus product system

| Part | Job |
| --- | --- |
| **UI surface** | Where the learner types or clicks |
| **User input** | The request that starts the flow |
| **Internal API boundary** | Auth, tier checks, rate limits, logging |
| **Prompt / instruction** | Task, constraints, output shape |
| **Context** | Approved notes or retrieved sources |
| **Model role** | What the model is trusted to do (summarize, draft, classify) |
| **Validation** | Checks required fields, citations, safety rules |
| **Fallback / human review** | What happens when checks fail |

If a diagram only shows “model → answer,” it is incomplete. Real products decide who may call the model, what context is allowed, and what happens on bad output.

## Tokens, context, and why builders care

You do not need to implement a transformer. You do need these consequences:

- **Tokens** consume context window budget. Long chats and large pasted notes can push out earlier instructions.
- **Context windows** are finite. “I pasted everything” is not a strategy.
- **Embeddings** place meaning in geometry; similar text can cluster — useful later for retrieval.
- **Temperature / sampling** change variability. Demos that “always look good” may hide unstable behavior.

Failure modes to keep on your map: hallucination, knowledge cutoff, instruction drift late in long context, and sycophancy (agreeing with a wrong user).

## Internal API boundary (course rule)

Learners do **not** bring outside model accounts or provider keys on this path. AI interaction goes through ASV Learn internal APIs with:

- authentication
- paid-tier access checks
- rate limits and usage logging
- safety guardrails
- structured error responses when blocked

Your local practice **simulates** that boundary as fields in a dictionary. You are learning the product shape, not shipping a private OpenAI wrapper.

## Start here: name the system before the model brand

Say this out loud:

*A learner enters input on this UI. The internal API checks auth and tier. Approved context is attached. The model plays this role. Validation checks this. On failure, the product shows this fallback.*

If any sentence is missing, the feature is still a demo, not a system.

## How to use this lesson

Read in this order:

- **Learn:** name UI, internal API boundary, context, model role, validation, and fallback
- **Inspect:** challenge any diagram that shows only “model → answer”
- **Build:** fill the system map before picking a model family
- **Prove:** explain what must never cross the internal API boundary

Practice after reading means you should understand each map field before editing code. If the starter looks like config noise, read one key at a time and ask: *what failure does this field prevent?*

## Common mistakes

**Drawing only the model.** Missing validation and fallback is how demos become incidents.

**Assuming the UI is the API.** The UI is a surface. The boundary is where policy is enforced.

**Skipping tier guardrails.** Unlimited generation for every account is a product decision — usually the wrong one.

**Confusing model family marketing with architecture.** GPT / Claude / Gemini / Llama differ, but your map still needs the same product parts.

## Your local task

### Step 1 — Create the starter

Create `ai_system_map.py`:

```python
# ai_system_map.py — Stage 02: Models, LLMs, and AI System Parts
# Fill every field for one AI-powered study-helper feature.

system_map = {
    "feature": "Course note clarifying assistant",
    "user_input": "TODO: what the learner types",
    "ui_surface": "TODO: where they type it",
    "internal_api_boundary": "TODO: auth + tier + rate limit checks",
    "model_role": "TODO: what the model is trusted to do",
    "context": "TODO: approved notes only — name the source set",
    "validation": "TODO: what must be true before showing the answer",
    "tier_guardrail": "TODO: who can call this and how often",
    "failure_mode": "TODO: how this feature can go wrong",
    "fallback_or_human_review": "TODO: safe behavior when validation fails",
}

def print_map(m):
    print("=== AI System Parts Map ===")
    for key, value in m.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_map(system_map)
```

### Step 2 — Replace every TODO

Write concrete product language. Example direction (use your own words):

- `user_input`: “Explain this paragraph from Module 02”
- `context`: “approved Module 02 lesson text only”
- `validation`: “answer must cite the module section; refuse if notes missing”
- `fallback_or_human_review`: “show ‘not enough approved context’ and link to the lesson”

### Step 3 — Run unchanged, then tighten

```bash
python3 ai_system_map.py
```

Windows:

```bash
python ai_system_map.py
```

Then improve **one** field (often `validation` or `fallback_or_human_review`), save, and run again.

### Step 4 — Explain the boundary

In a short comment at the bottom of the file, answer:

1. Where does the internal API boundary sit relative to the model?
2. What must never reach the model (secrets, unpaid-tier abuse, unapproved sources)?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| model role | The narrow job the model is trusted to perform |
| context window | How much prompt + history + sources fit at once |
| internal API boundary | Auth, tier, rate limit, logging, and safety gate |
| validation | Checks that must pass before the user sees output |
| fallback | Safe product behavior when checks fail |
| system map | Named parts of an AI feature, not only the model |

## Proof checklist

- [ ] `ai_system_map.py` prints all ten fields without TODO left behind
- [ ] The map names UI, internal API boundary, model role, context, validation, and fallback
- [ ] You can explain why the model is not the whole system
- [ ] One field was tightened after the first run
- [ ] You stated what must not cross the internal API boundary

When those are true, continue to **Prompting as Instruction Design**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
