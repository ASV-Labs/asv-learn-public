# RAG & Knowledge Integration

## Why this lesson exists

Retrieval-augmented generation (RAG) gives a model **relevant source material** before it answers. The model still generates text, but the answer should stay **grounded in retrieved evidence** — not in whatever sounds plausible.

Many agent failures are not model failures. They are **source boundary failures**: the system answered from vibes instead of from approved material, or it cited nothing when evidence was thin.

This stage teaches you to write a **RAG plan** — a Python dictionary that names the approved collection, the retrieval query, citation rules, answer boundaries, and what to say when evidence is missing. You practice locally with plain Python structures; no vector database required yet.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.py` file → run in terminal → one small change you can explain → checklist**.

## Reminder: where you work

```bash
cd ~/asv-learn-applied-agentic-ai
```

Windows:

```powershell
cd $HOME\asv-learn-applied-agentic-ai
```

You will create `rag_plan.py` in that folder.

## Start here: sources before answers

At the start, do not ask the model to answer from memory alone. First name:

1. The **approved source collection**
2. The **retrieval query** — what evidence should be fetched
3. The **allowed source types** the answer may rely on
4. The **citation rule** — how the answer points back to evidence
5. The **answer boundary** — what the model must not claim
6. The **uncertainty note** — what to say when evidence is incomplete

RAG is useful only when source boundaries are visible. The goal is to make the answer easier to verify, not to make unsupported advice sound confident.

## How to use this lesson

Read in this order:

- **Learn:** understand how retrieval supplies evidence without making the model automatically correct
- **Inspect:** identify source collection, query, allowed sources, citation rule, answer boundary, and uncertainty note
- **Build:** write one RAG plan before asking for advice
- **Prove:** explain what the answer may and may not claim from retrieved material

Practice after reading means the model should stay inside approved course material. If evidence is incomplete, the right move is to name what is missing.

## One clean pass through this lesson

Before the editor, read RAG as a sources-before-answer chain:

1. The source collection says which knowledge base is approved.
2. The retrieval query says what evidence should be fetched.
3. The allowed sources say what the answer may rely on.
4. The citation rule makes the answer traceable.
5. The answer boundary and uncertainty note say what to do when evidence is missing.

That chain keeps retrieval from becoming decoration. RAG is useful when it makes the answer easier to verify, not when it makes unsupported advice sound confident.

Do not start by asking the model for advice. First say the RAG plan in one sentence: source collection, retrieval query, allowed sources, citation rule, answer boundary, and uncertainty note.

## The RAG plan shape

| Part | Purpose |
| --- | --- |
| Source collection | The approved knowledge base |
| Retrieval query | The question used to fetch context |
| Allowed sources | Which source types the answer may rely on |
| Citation rule | How the answer points back to evidence |
| Answer boundary | What the model must not claim |
| Uncertainty note | What to say when evidence is incomplete |

```python
rag_plan = {
    "source_collection": "approved course notes",
    "retrieval_query": "how to explain Python route handlers",
    "allowed_sources": ["course lesson", "saved lab check"],
    "citation_rule": "name the lesson or check result used",
    "answer_boundary": "do not claim facts outside retrieved course material",
    "uncertainty_note": "say what evidence is missing before giving advice",
}
```

## Simple local retrieval simulation

Real RAG systems use embeddings and vector stores. For learning, you can simulate retrieval with a list of documents and a keyword match:

```python
documents = [
    {"id": "lesson-03", "text": "Route handlers map URLs to functions."},
    {"id": "lab-check-2", "text": "Saved check: learner completed variables module."},
]

def retrieve(plan, docs):
    query = plan["retrieval_query"].lower()
    return [d for d in docs if any(word in d["text"].lower() for word in query.split())]
```

The point is not production search quality. The point is to **see** which sources would be attached before the model answers.

## Common mistakes

**Retrieval as decoration.** Fetching sources but not requiring citations does not ground answers.

**No answer boundary.** Without one, the model blends retrieved facts with general knowledge silently.

**Skipping the uncertainty note.** When evidence is weak, the system should say so — not guess confidently.

**Over-broad source collections.** "The entire internet" is not an approved collection.

**Citation rules that cannot be checked.** "Cite something" is weak. "Name the lesson or check result used" is reviewable.

## Your local task

### Step 1 — Create the starter

Create `rag_plan.py`:

```python
# rag_plan.py — Stage 03: RAG & Knowledge Integration
# Run unchanged, then add your own plan and a tiny retrieve() function.

rag_plan = {
    "source_collection": "approved course notes",
    "retrieval_query": "how to explain Python route handlers",
    "allowed_sources": ["course lesson", "saved lab check"],
    "citation_rule": "name the lesson or check result used",
    "answer_boundary": "do not claim facts outside retrieved course material",
    "uncertainty_note": "say what evidence is missing before giving advice",
}

documents = [
    {"id": "lesson-03", "text": "Route handlers map URLs to functions in a web app."},
    {"id": "lab-check-2", "text": "Saved check: learner completed variables module."},
    {"id": "lesson-99", "text": "Unrelated: how to merge CSV files with pandas."},
]

def retrieve(plan, docs):
    query_words = plan["retrieval_query"].lower().split()
    hits = []
    for doc in docs:
        text = doc["text"].lower()
        if any(word in text for word in query_words if len(word) > 3):
            hits.append(doc)
    return hits

def print_plan(plan):
    print("=== RAG Plan ===")
    for key, value in plan.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    print_plan(rag_plan)
    results = retrieve(rag_plan, documents)
    print("\n=== Retrieved ===")
    if results:
        for doc in results:
            print(f"- {doc['id']}: {doc['text']}")
    else:
        print(rag_plan["uncertainty_note"])
```

### Step 2 — Run unchanged

```bash
python3 rag_plan.py
```

Windows:

```bash
python rag_plan.py
```

Inspect which documents matched. Ask: would these sources be enough to answer the retrieval query?

### Step 3 — Write your own RAG plan

Replace the example with a plan for a **learning assistant** that may only use your course folder notes and saved proof checklists. Keep all six fields.

### Step 4 — Add one document and re-run

Add a relevant document to `documents`. Run again and confirm retrieval changes. If nothing matches, the script should print your uncertainty note.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| RAG | Retrieval-augmented generation — fetch sources, then generate |
| source collection | Approved knowledge base for answers |
| retrieval query | Question or keywords used to fetch evidence |
| citation rule | How answers link back to sources |
| answer boundary | Claims the model must not make without evidence |
| grounding | Keeping answers tied to retrieved material |

## Proof checklist

- [ ] `rag_plan.py` exists and runs without errors
- [ ] Your RAG plan has all six fields
- [ ] `retrieve()` returns matching documents for your query
- [ ] You added a document and saw retrieval change
- [ ] You can explain what happens when no documents match

When those are true, continue to **Agent Architectures**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
