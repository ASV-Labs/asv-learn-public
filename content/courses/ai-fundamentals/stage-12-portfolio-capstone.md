# Portfolio Capstone: AI Builder Proof

## Why this lesson exists

A portfolio-ready AI builder proof is not a screenshot of a chat. It is a packet another engineer or mentor can review: problem, user, input/output contract, internal AI flow, prompt tests, validation, retrieval/tool boundary, guardrails, and reflection.

This capstone assembles work from earlier stages into one local proof folder. You are **not** required to deploy a public web app, wire vendor keys, or claim platform auto-grading. Honest local artifacts beat vapor demos.

## How to use this lesson

- **Learn:** what belongs in a reviewable AI builder packet — not a chat screenshot
- **Inspect:** map each earlier stage artifact to a section in the proof table
- **Build:** fill `ai_builder_proof.py` with one narrow feature and concrete boundaries
- **Prove:** run the script and confirm your reflection names at least one thing you would not ship yet

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ai-fundamentals/capstone
cd ~/asv-learn-ai-fundamentals/capstone
```

Windows:

```powershell
mkdir $HOME\asv-learn-ai-fundamentals\capstone
cd $HOME\asv-learn-ai-fundamentals\capstone
```

Create `ai_builder_proof.py` (and optionally copy earlier files into this folder for reference).

## What “proof” means here

| Packet section | What a reviewer should learn |
| --- | --- |
| Problem & user | Who is helped and what pain is real |
| I/O contract | Inputs, outputs, success check |
| Internal AI flow | Auth, tier, logging, no learner provider keys |
| Prompt tests | Before/after cases with retest checks |
| Validation | Required fields + fallback |
| Retrieval/tool boundary | Approved sources and allowed actions |
| Guardrails | Privacy, abuse, escalation, rollback |
| Reflection | What you would not ship yet |

If any section is missing, the proof is a draft.

## Capstone scope (keep it narrow)

Pick **one** feature, ideally a course-note helper you already planned:

- Clarifying assistant for one module, or
- Flashcard draft helper with validation, or
- Guarded retrieve→draft workflow with human confirmation

Do not try to rebuild a full Study Assistant deploy from external feedstock. That material is inspiration; ASV Learn house style is local, reviewable, and honest about platform limits.

## Mapping earlier artifacts into the packet

| Earlier stage | Reuse as |
| --- | --- |
| 01 claim table | Problem framing + risk |
| 02 system map | Architecture section |
| 03–04 prompts | Prompt test appendix |
| 05–06 API + validation | Flow + contract |
| 07–08 retrieval/RAG | Source boundary |
| 09–10 tools/agents | Action boundary |
| 11 release review | Guardrails + go/no-go |

Your capstone script should **reference** these ideas even if you rewrite them cleanly in one file.

## Reflection prompts (required)

Write short answers in the proof object:

1. What is the smallest useful version of this feature?
2. What failure would embarrass you in front of a learner?
3. What would you need from internal APIs before a live pilot?
4. What will you refuse to claim (no in-lesson auto-grading, no guaranteed job outcomes, no “fully autonomous” hype)?

### Reviewer-first summary template

Use this shape for `reviewer_summary` (then replace with your words):

1. One sentence problem + user
2. One sentence I/O contract and success check
3. One sentence source/tool boundary
4. One sentence guardrail + fallback
5. One sentence what is still not shipped

If sentence three is missing, the proof still sounds like a chatbot demo.

## Common mistakes

**Shipping only a README with logos.** Reviewers need contracts and failure modes.

**Claiming production deployment you did not do.** Local proof is valid; fake URLs are not.

**Unlimited scope.** One feature, deep boundaries, beats twelve half features.

**Hiding uncertainty.** Capstone strength is knowing what is unfinished.

## Your local task

### Step 1 — Create the proof starter

Create `ai_builder_proof.py`:

```python
# ai_builder_proof.py — Stage 12: Portfolio Capstone

proof = {
    "title": "TODO: feature name",
    "problem": "TODO",
    "user": "TODO: who this helps",
    "input_output_contract": {
        "inputs": ["TODO"],
        "outputs": ["TODO"],
        "success_check": "TODO",
    },
    "internal_ai_flow": {
        "endpoint_idea": "/internal/ai/complete",
        "auth_tier_rate_limit": "TODO",
        "learner_provider_keys": "not allowed",
    },
    "prompt_tests": [
        {"case": "TODO", "failure_pattern": "TODO", "fix": "TODO", "retest": "TODO"},
    ],
    "validation": {
        "required_fields": ["TODO"],
        "fallback": "TODO",
    },
    "retrieval_or_tool_boundary": {
        "allowed_sources_or_tools": ["TODO"],
        "forbidden": ["TODO"],
    },
    "guardrails": {
        "privacy": "TODO",
        "escalation": "TODO",
        "rollback": "TODO",
    },
    "local_files_exercised": [
        "feature_classifications.py",
        "ai_system_map.py",
        "prompt_test.py",
        "prompt_debug_log.py",
        "internal_ai_flow.py",
        "output_contract.py",
        "source_inspection.py",
        "rag_assistant_plan.py",
        "tool_routing.py",
        "guarded_agent.py",
        "release_review.py",
    ],
    "reflection": {
        "smallest_useful_version": "TODO",
        "top_embarrassment_risk": "TODO",
        "needed_from_internal_apis": "TODO",
        "claims_refused": "TODO",
    },
    "reviewer_summary": "TODO: 3-5 sentences a mentor can read first",
}

def print_proof(p):
    print("=== Portfolio-Ready AI Builder Proof ===")
    for key, value in p.items():
        print(f"\n## {key}")
        print(value)

if __name__ == "__main__":
    print_proof(proof)
```

### Step 2 — Fill the packet

Replace every TODO. Keep `learner_provider_keys` as not allowed. List only local files you actually created.

### Step 3 — Run

```bash
python3 ai_builder_proof.py
```

Windows:

```bash
python ai_builder_proof.py
```

### Step 4 — Self-review

Read the printed `reviewer_summary` out loud. If it sounds like marketing without boundaries, rewrite it until a skeptical mentor would trust it.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| portfolio proof | Reviewable packet of AI feature decisions |
| I/O contract | Inputs, outputs, and success check |
| boundary | Sources/tools/actions that are allowed or forbidden |
| reflection | Honest limits and next risks |
| capstone | End-of-course synthesis artifact |
| internal AI flow | Platform-mediated model access path |

## Proof checklist

- [ ] `capstone/ai_builder_proof.py` runs and prints all sections
- [ ] Prompt tests, validation, and guardrails are concrete
- [ ] Retrieval/tool boundary names allowed and forbidden items
- [ ] Reflection refuses in-lesson grading / job / autonomy overclaims
- [ ] Reviewer summary is understandable without opening other files

When those are true, continue to the **certificate outcome** page.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
