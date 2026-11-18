# Responsible AI, Guardrails, and Tiered Access

## Why this lesson exists

Responsibility is not a slide at the end of a pitch deck. For AI builders it is operational: privacy rules, abuse prevention, usage limits, human escalation, logging, monitoring, and paid-tier controls for AI access.

This stage turns those ideas into a **release review** you can run locally before claiming a feature is ready.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `release_review.py` in that folder.

## Make responsibility concrete

| Control | Question it answers |
| --- | --- |
| **Privacy** | What learner data may enter prompts/logs? |
| **Abuse prevention** | How do we block prompt injection / data exfil attempts? |
| **Tiered access** | Who can call AI features, how often, at what cost? |
| **Rate limits** | What stops runaway loops and spam? |
| **Logging / monitoring** | What evidence exists after an incident? |
| **Human escalation** | When must automation stop? |
| **Evaluation** | What sample checks prove quality before release? |
| **Rollback** | How do we disable the feature quickly? |

If a control is “we’ll notice,” it is not a control.

## Tiered access as a product guardrail

Internal AI APIs should enforce tiers, for example:

| Tier | AI access idea | Why |
| --- | --- | --- |
| Free / explorer | Limited or no generative calls | Cost + abuse control |
| Builder | Metered summaries / drafts | Learning with limits |
| Team | Higher caps + shared audit | Collaboration with accountability |

Learners still do not bring external provider keys. Tiers gate the **platform** capability.

## Privacy and logging tension

You need logs to debug abuse and cost. You also must minimize sensitive content:

- Prefer IDs and metadata over raw secrets
- Redact passwords, tokens, and personal contact data
- Keep retention limited and purposeful
- Never log provider keys (learners should not have them here anyway)

## Release review narrative

Before release, a reviewer should hear:

1. What the feature does (claim table from Stage 01)
2. What data it touches
3. Which guardrails and tier limits apply
4. How validation and fallback work
5. How escalation and rollback work
6. Which eval samples were run locally

Fluent demos without that packet are not release-ready.

### Minimal eval set before “go”

Run at least these locally and record the outcomes in your review:

1. **Happy path** — in-scope question with approved notes → cited answer
2. **Missing evidence** — out-of-scope question → uncertainty / refuse
3. **Abuse probe** — ask to reveal secrets or bypass tier → block
4. **Invalid structure** — malformed model-shaped output → fallback UI

You do not need a hosted grader to write “pass/fail” next to each row. You need honesty.

## Common mistakes

**Safety theater.** A banner that says “AI can be wrong” without refusal paths or logs.

**Unlimited generative access on free tiers.** Cost and abuse arrive together.

**Logging everything forever.** Even more privacy risk.

**No rollback.** If you cannot disable a tool quickly, you do not control it.

## Your local task

### Step 1 — Create the starter

Create `release_review.py`:

```python
# release_review.py — Stage 11: Responsible AI, Guardrails, and Tiered Access

review = {
    "feature": "Course-note Q&A assistant",
    "data_touched": ["TODO: learner question text", "TODO: approved note ids"],
    "privacy_rules": [
        "TODO: do not send passwords or API keys into prompts",
        "TODO: redact emails from logs",
    ],
    "tier_gate": {
        "min_tier": "TODO",
        "rate_limit": "TODO",
        "cost_note": "TODO",
    },
    "abuse_checks": [
        "TODO: block requests asking to exfiltrate system prompts/secrets",
        "TODO: refuse unapproved web fetch tools",
    ],
    "logging": {
        "fields": ["user_id", "feature", "status", "token_usage", "timestamp"],
        "do_not_log": ["TODO", "TODO"],
    },
    "escalation": "TODO: when a human must take over",
    "eval_samples_run": [
        "TODO: in-notes question passes with citation",
        "TODO: out-of-notes question refuses",
    ],
    "rollback": "TODO: how to disable the feature quickly",
    "go_no_go": "TODO: go | no-go",
    "go_no_go_reason": "TODO",
}

def print_review(r):
    print("=== Responsible AI Release Review ===")
    for key, value in r.items():
        print(f"\n{key}:")
        print(f"  {value}")

if __name__ == "__main__":
    print_review(review)
```

### Step 2 — Fill every TODO

Make a honest **go** or **no-go**. A no-go with a clear reason is a better artifact than a fake go.

### Step 3 — Run

```bash
python3 release_review.py
```

Windows:

```bash
python release_review.py
```

### Step 4 — One hardening change

Tighten `do_not_log` or `abuse_checks`, re-run, and explain how the change reduces a real risk.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| guardrail | Product or API control that limits unsafe behavior |
| tier gate | Access rule based on plan/paid status |
| rate limit | Cap on how often a feature may be called |
| escalation | Stop automation; involve a human |
| rollback | Return to a safe known configuration quickly |
| release review | Checklist artifact before shipping an AI feature |

## Proof checklist

- [ ] `release_review.py` prints a complete review with no TODO left
- [ ] Privacy, tier, abuse, logging, escalation, eval, and rollback are present
- [ ] `go_no_go` is explicit with a reason
- [ ] You tightened one control after the first run
- [ ] You can explain why external learner keys remain forbidden

When those are true, continue to **Portfolio Capstone: AI Builder Proof**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
