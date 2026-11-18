# RAG Application Patterns

## Why this lesson exists

Retrieval alone is not a product. A useful RAG app pattern connects: user question → source selection → context package → model response → citation → validation → user-visible uncertainty.

This stage turns Stage 07 inspection into a **course-note Q&A assistant plan** you can implement later behind internal APIs. You will build the plan and a tiny local retrieve→package→answer_boundary loop in Python. No hosted vector DB homework and no learner provider keys.

## How to use this lesson

- **Learn:** map the full RAG pipeline from question to cited answer or refusal
- **Inspect:** run the starter and watch one eval question hit notes and one miss on purpose
- **Build:** replace every TODO with language a reviewer could audit
- **Prove:** add a third eval question for Module 03 and confirm the printed chunk id

Stage 06 validation habits return here: citations and answer boundaries are contracts, not prose wishes.

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `rag_assistant_plan.py` in that folder.

## End-to-end RAG pattern

```text
User question
  → choose approved collection (course notes only)
    → retrieve top chunks
      → build context package (chunks + rules)
        → model draft (via internal API in production)
          → validate citations + answer boundary
            → show answer with uncertainty OR refuse
```

| Step | Purpose |
| --- | --- |
| Source collection | Limits knowledge to approved material |
| Retrieval query | States what evidence to fetch |
| Context package | Formats chunks for the model |
| Citation rule | Makes claims traceable |
| Answer boundary | Blocks unsupported claims |
| Uncertainty note | Honest UX when evidence is thin |

## Context package design

A context package is not “paste the whole course.” It is a controlled bundle:

```python
context_package = {
    "collection": "approved_python_zero_notes",
    "chunks": [
        {"source_id": "module-02-variables", "text": "..."},
    ],
    "rules": [
        "answer only from chunks",
        "cite source_id for each factual claim",
        "if chunks lack the answer, say what is missing",
    ],
}
```

In production, this package would travel through the internal AI API with auth, tier checks, and logging. Locally, you print and reason about it.

## Answer boundaries that actually help

Good boundary language:

- “Use only retrieved course notes.”
- “Cite `source_id` for definitions.”
- “If no chunk supports the claim, say ‘not in approved notes’.”

Weak boundary language:

- “Be accurate.”
- “Try your best.”
- “Use the internet if needed.” (not for this course path)

## Evaluation for RAG (starter)

Before you celebrate fluent answers, test:

1. Question answerable from notes → cites correct source
2. Question outside notes → refuses or names gap
3. Conflicting/stale chunk present → prefers current approved note
4. Format contract still validates after retrieval

Keep these as local sample questions in a list you can re-run after prompt changes.

### Worked eval expectations

| Sample question | Expected retrieval | Expected user-visible outcome |
| --- | --- | --- |
| “What is a variable?” | `module-02-variables` chunk | Answer cites that source id |
| “What is our cloud GPU pricing?” | No approved chunk | Uncertainty note — not a confident guess |
| “How do I convert input before math?” | `module-03-input-math` | Answer cites Module 03; no invented APIs |

When you change citation rules or boundaries, re-run all three. Regressions should show up in the terminal before a mentor finds them in a demo.

## Common mistakes

**RAG as decoration.** Retrieving chunks you ignore in the prompt wastes the pattern.

**Hiding uncertainty.** Users need to see “not in approved notes.”

**One mega-collection with no trust labels.** Mixing blogs and lessons without trust fields recreates hallucination with extra steps.

**Skipping validation after generation.** Citations in prose still need a check.

## Your local task

### Step 1 — Create the starter

Create `rag_assistant_plan.py`:

```python
# rag_assistant_plan.py — Stage 08: RAG Application Patterns

notes = {
    "module-02-variables": "Variables store values. Types include string, int, float, bool.",
    "module-03-input-math": "input() returns a string; convert before arithmetic.",
}

plan = {
    "feature": "Course-note Q&A assistant",
    "source_collection": "approved_python_zero_notes",
    "retrieval_query": "TODO: write the learner question",
    "allowed_sources": ["module-02-variables", "module-03-input-math"],
    "citation_rule": "TODO",
    "answer_boundary": "TODO",
    "uncertainty_note": "TODO",
    "validation_checks": [
        "TODO: citations present when facts claimed",
        "TODO: refuse when no chunk supports the answer",
    ],
    "sample_eval_questions": [
        "What is a variable?",
        "What is our cloud GPU pricing?",  # should miss
    ],
}

def retrieve(query, notes):
    q = query.lower()
    hits = []
    for source_id, text in notes.items():
        if any(word in text.lower() or word in source_id for word in q.split() if len(word) > 3):
            hits.append({"source_id": source_id, "text": text})
    return hits

def build_package(plan, hits):
    return {
        "collection": plan["source_collection"],
        "chunks": hits,
        "citation_rule": plan["citation_rule"],
        "answer_boundary": plan["answer_boundary"],
        "uncertainty_note": plan["uncertainty_note"],
    }

def main():
    print("=== Course-note Q&A Assistant Plan ===")
    for key in (
        "feature",
        "source_collection",
        "retrieval_query",
        "allowed_sources",
        "citation_rule",
        "answer_boundary",
        "uncertainty_note",
        "validation_checks",
    ):
        print(f"{key}: {plan[key]}")

    print("\n=== Local retrieve → package demo ===")
    for question in plan["sample_eval_questions"]:
        hits = [h for h in retrieve(question, notes) if h["source_id"] in plan["allowed_sources"]]
        package = build_package(plan, hits)
        print(f"\nQ: {question}")
        if not package["chunks"]:
            print("result:", plan["uncertainty_note"])
        else:
            print("chunks:", [c["source_id"] for c in package["chunks"]])
            print("package_rules:", package["answer_boundary"])

if __name__ == "__main__":
    main()
```

### Step 2 — Fill TODOs

Write concrete citation, boundary, and uncertainty text. Set `retrieval_query` to a real learner-style question.

### Step 3 — Run

```bash
python3 rag_assistant_plan.py
```

Windows:

```bash
python rag_assistant_plan.py
```

Confirm the pricing question hits the uncertainty path.

### Step 4 — One improvement

Add a third eval question that should hit Module 03. Re-run and confirm the printed chunk id.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| RAG | Retrieval-augmented generation |
| context package | Chunks + rules sent with the question |
| answer boundary | What the model must not claim |
| uncertainty note | User-visible gap language |
| eval question | Fixed question used to catch regressions |
| Q&A assistant plan | Portfolio artifact for a grounded helper |

## Proof checklist

- [ ] `rag_assistant_plan.py` prints a complete plan
- [ ] Local demo shows a hit and a miss
- [ ] Citation rule and answer boundary are specific
- [ ] Uncertainty note appears when chunks are empty
- [ ] Sample eval questions include at least one intentional miss

When those are true, continue to **AI Workflows and Tool Use**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
