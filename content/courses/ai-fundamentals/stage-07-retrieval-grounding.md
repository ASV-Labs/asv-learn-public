# Retrieval and Source Grounding

## Why this lesson exists

Models guess when they lack approved context. Retrieval-augmented generation (RAG) exists because LLMs have knowledge cutoffs and no automatic access to your private notes.

This stage focuses on **source grounding** before full app patterns: chunks, source notes, citations, freshness, and what to do when the answer is not in the sources. You will inspect a tiny local document set with Python — not install Chroma/Pinecone or call embedding APIs.

## How to use this lesson

- **Learn:** why models invent facts without approved chunks and how retrieval changes the risk
- **Inspect:** run the keyword matcher and read which sources attach to each question
- **Build:** add trust labels and a gap message when no chunk supports the query
- **Prove:** include one question that should miss on purpose and confirm the gap path prints

## Reminder: where you work

```bash
cd ~/asv-learn-ai-fundamentals
```

Windows (PowerShell):

```powershell
cd $HOME\asv-learn-ai-fundamentals
```

Create `source_inspection.py` in that folder. Optionally keep short note files beside it later; for this stage, notes can live inside the Python file.

## The grounding problem

LLMs fail product work when they:

1. Do not know private course updates
2. Invent citations that look real
3. Answer confidently from general training data instead of your docs

Retrieval helps by:

1. Selecting approved documents
2. Pulling relevant chunks for a question
3. Forcing the answer to cite those chunks — or admit gaps

```text
Question → select approved sources → retrieve chunks →
  attach as context → model answers → cite or refuse
```

## Source inspection sheet (builder view)

Before you trust a retrieved answer, inspect each candidate chunk:

| Field | Why it matters |
| --- | --- |
| **source_id** | Stable name for citation |
| **title** | Human-readable document |
| **chunk_text** | Exact text the model may use |
| **freshness** | Is this still the current policy/lesson? |
| **trust** | Approved course note vs random web paste |
| **gap** | What the chunk does **not** cover |

If the best chunks do not cover the question, the correct product behavior is uncertainty — not improvisation.

## Chunking trade-offs (conceptual)

| Approach | Upside | Downside |
| --- | --- | --- |
| Whole document | Full context | Wastes window; noisy |
| Paragraph chunks | Simple | May split definitions |
| Overlapping windows | Fewer cutoffs | More duplicates |
| Section-aware chunks | Matches lesson structure | Needs clean headings |

For this course, prefer **section-aware** course notes with clear `source_id` values like `module-02-variables`.

## Local practice vs production RAG

Production systems use embeddings and vector databases. Your Stage 07 practice uses a **keyword stand-in** so you can see attachment and gaps without network calls or provider keys. The skill you are learning is inspection and refusal — not vector ops.

When live AI is used later, retrieval still sits behind internal APIs with tier limits and logging.

## Common mistakes

**Retrieving anything from the open web by default.** Unapproved sources create unapproved answers.

**Citing a document you did not retrieve.** That is theater, not grounding.

**No freshness note.** Yesterday’s pricing or policy chunk can be worse than no chunk.

**Treating “top chunk found” as “answer is true.”** Retrieval supplies evidence candidates; validation still matters.

## Your local task

### Step 1 — Create the starter

Create `source_inspection.py`:

```python
# source_inspection.py — Stage 07: Retrieval and Source Grounding

sources = [
    {
        "source_id": "module-02-variables",
        "title": "Variables and Data Types",
        "chunk_text": "A variable stores a value. Common types: string, int, float, bool.",
        "freshness": "current",
        "trust": "approved_course_note",
    },
    {
        "source_id": "module-03-input-math",
        "title": "Input and Math",
        "chunk_text": "input() returns a string. Convert with int() or float() before math.",
        "freshness": "current",
        "trust": "approved_course_note",
    },
    {
        "source_id": "random-blog-2019",
        "title": "Old blog rant",
        "chunk_text": "Python variables are basically magic boxes that understand you.",
        "freshness": "stale",
        "trust": "unapproved",
    },
]

question = "What basic data types should a beginner know for variables?"

def retrieve(question, sources, limit=2):
    q = question.lower()
    scored = []
    for src in sources:
        text = (src["title"] + " " + src["chunk_text"]).lower()
        score = sum(1 for word in q.split() if word in text)
        if src["trust"] != "approved_course_note":
            score -= 3  # penalize unapproved
        scored.append((score, src))
    scored.sort(key=lambda item: item[0], reverse=True)
    return [src for score, src in scored if score > 0][:limit]

def print_inspection(question, hits):
    print("=== Retrieval Source Inspection Sheet ===")
    print("question:", question)
    if not hits:
        print("gap: no approved chunks matched — refuse or ask for a lesson id")
        return
    for src in hits:
        print(f"\nsource_id: {src['source_id']}")
        print(f"title: {src['title']}")
        print(f"freshness: {src['freshness']}")
        print(f"trust: {src['trust']}")
        print(f"chunk_text: {src['chunk_text']}")
        print("citation_ready: yes" if src["trust"] == "approved_course_note" else "citation_ready: no")

if __name__ == "__main__":
    hits = retrieve(question, sources)
    print_inspection(question, hits)
```

### Step 2 — Run

```bash
python3 source_inspection.py
```

Windows:

```bash
python source_inspection.py
```

Confirm the unapproved blog is not treated as a good citation.

### Step 3 — Probe a gap

Change `question` to something outside the notes (for example, deployment pricing). Re-run. Update the printed gap behavior if needed so missing evidence is obvious.

### Step 4 — Add one freshness note

Add a field or print line for “what would make this chunk unsafe even if keywords match?” (stale policy, wrong course version, etc.).

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| retrieval | Fetching relevant approved chunks for a question |
| chunk | A slice of a source document |
| grounding | Keeping answers tied to retrieved evidence |
| citation | Pointer back to a source_id / title |
| freshness | Whether the source is still current |
| source inspection sheet | Artifact listing chunks, trust, gaps |

## Proof checklist

- [ ] `source_inspection.py` runs and prints an inspection sheet
- [ ] Unapproved sources are penalized or rejected for citation
- [ ] You tested a question with no good match and named the gap
- [ ] Freshness/trust appear in the printed output
- [ ] You can explain why retrieval is not automatic truth

When those are true, continue to **RAG Application Patterns**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
