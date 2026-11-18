# Capstone Projects & Portfolio

## Why this lesson exists

A portfolio project should prove a **full loop**: user need, frontend state, backend route, stored data, deployment evidence, and a plan for what you will improve next. Screenshots help only after a reviewer can see **behavior** — what the app does and how you know it works.

In this final stage you will write a **portfolio proof card** in JavaScript and a short README outline you could attach to a GitHub repo. You are not submitting a production app to ASV Learn. You are practicing the evidence story hiring managers and teammates actually read.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit local files → run with Node → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-fullstack/stage-06
cd ~/asv-learn-fullstack/stage-06
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-fullstack\stage-06"
Set-Location "$HOME\asv-learn-fullstack\stage-06"
```

You will create `portfolio_proof.js` and optionally `README-outline.md`.

## Start here: behavior evidence before polish

Before screenshots or visual design, name the proof:

| Proof item | What it shows |
| --- | --- |
| **Problem** | Why the project exists |
| **User flow** | Task a person can complete |
| **Frontend state** | How the interface responds |
| **API endpoint** | Server work the app performs |
| **Data model** | What the app remembers |
| **Proof metric** | How you know it works |
| **Iteration plan** | What you improve next |

Polish matters after behavior is clear. A reviewer should understand the project in two minutes without opening every file.

## How to use this lesson

Read in this order:

- **Learn:** understand the portfolio as a product loop, not a repo dump
- **Inspect:** connect each proof field to something a reviewer could verify
- **Build:** complete the proof card for a project you could realistically build
- **Prove:** explain the metric that shows the core feature works

Practice after reading means the proof card comes before portfolio polish. Ask: *what would I demo live if someone gave me five minutes?*

## One clean pass through this lesson

Read a capstone as a chain:

1. The problem says why the project exists.
2. The user flow says what task completes successfully.
3. Frontend states show how the UI responds while the task runs.
4. The API endpoint and data model show how work is performed and remembered.
5. The proof metric and iteration plan show judgment and next steps.

Do not start with logo design. First say the card in one sentence: *learners need saved lesson notes; they write, save, reload, and see the note; POST /api/notes persists Note linked to User and Course; proof is saved note after reload; next is search.*

## Portfolio proof card example

```js
const portfolioProof = {
  problem: "learners need to save lesson notes",
  userFlow: "open lesson, write note, save, return later",
  frontendState: ["editing", "saving", "saved", "error"],
  apiEndpoint: "POST /api/notes",
  dataModel: "Note belongs to User and Course",
  proofMetric: "saved note appears after reload",
  iterationPlan: "add search after save flow is reliable",
};
```

## Turning the card into a README outline

A strong repo README for a capstone often includes:

1. One-paragraph problem statement
2. Demo steps a reviewer can follow locally
3. Stack list (HTML/CSS/JS, React, Node, database — honest about what you built)
4. Proof metric and how you tested it
5. Known limits and next iteration

You are not writing marketing copy. You are writing **verifiable claims**.

## Common beginner mistakes

**Screenshot with no test steps.** Pretty UI without "how to run" and "how to verify" leaves reviewers guessing.

**Listing every technology you ever touched.** Name the stack you actually used in this project.

**No error state in the story.** Real apps fail; showing `error` state proves you thought about users.

**Proof metric that cannot be checked.** "It works well" is not a metric. "Saved note appears after reload" is.

## Your local task

### Step 1 — Create the starter

Create `portfolio_proof.js`:

```js
// portfolio_proof.js — Stage 06: Capstone Projects & Portfolio
// Run unchanged first, then customize for your project idea.

const portfolioProof = {
  problem: "learners need to save lesson notes",
  userFlow: "open lesson, write note, save, return later",
  frontendState: ["editing", "saving", "saved", "error"],
  apiEndpoint: "POST /api/notes",
  dataModel: "Note belongs to User and Course",
  proofMetric: "saved note appears after reload",
  iterationPlan: "add search after save flow is reliable",
};

function validateProofCard(card) {
  const required = [
    "problem",
    "userFlow",
    "frontendState",
    "apiEndpoint",
    "dataModel",
    "proofMetric",
    "iterationPlan",
  ];
  const missing = required.filter((key) => !card[key] || (Array.isArray(card[key]) && card[key].length === 0));
  return { ok: missing.length === 0, missing };
}

function printReviewerSummary(card) {
  console.log("=== Portfolio proof card ===");
  console.log(card);
  console.log("\n=== Two-minute reviewer story ===");
  console.log(`Problem: ${card.problem}`);
  console.log(`Flow: ${card.userFlow}`);
  console.log(`Proof: ${card.proofMetric}`);
  console.log(`Next: ${card.iterationPlan}`);
}

function demo() {
  printReviewerSummary(portfolioProof);
  console.log("\n=== Validation ===");
  console.log(validateProofCard(portfolioProof));
}

if (require.main === module) {
  demo();
}

module.exports = { portfolioProof, validateProofCard, printReviewerSummary };
```

### Step 2 — Run unchanged

```bash
node portfolio_proof.js
```

Read the two-minute reviewer story. Could a stranger follow it?

### Step 3 — Customize for your idea

Replace the sample content with a project you could build using skills from stages 1–5. Keep all seven fields. Run again and confirm validation passes.

### Step 4 — Write README outline

Create `README-outline.md` with five sections:

1. Problem
2. Local setup (honest — what folder, what commands)
3. Demo steps that prove the proof metric
4. Stack used
5. Next iteration from your proof card

### Step 5 — One small change you can explain

Add **one** field to strengthen reviewability. Examples:

- `demoCredentials: "local test user only"`
- `deploymentEvidence: "health route returns 200 on staging"`
- `accessibilityNote: "save button has visible label and focus state"`

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Capstone | Project that combines multiple course skills |
| User flow | Steps a person takes to complete the core task |
| Proof metric | Observable check that the feature works |
| Iteration plan | Next improvement after the core loop is reliable |
| Portfolio | Curated evidence of what you can build and explain |
| Demo | Live or recorded walkthrough a reviewer can follow |

## Proof checklist

- [ ] `portfolio_proof.js` exists in `~/asv-learn-fullstack/stage-06`
- [ ] All seven proof fields are filled for your project idea
- [ ] Running the script prints a coherent two-minute story
- [ ] `README-outline.md` lists setup, demo, stack, and next steps
- [ ] You added one extra reviewability field
- [ ] You can explain why behavior evidence beats screenshots alone

When those are true, you have completed the **Full Stack Development** course path. Ship a real capstone when you are ready — this stage is the blueprint.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
