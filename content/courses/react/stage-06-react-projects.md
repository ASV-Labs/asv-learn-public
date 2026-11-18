# Capstone: React Project Proof

## Why this lesson exists

Portfolio work should prove **frontend judgment**, not only a polished screenshot. Reviewers want to see one user problem, a clear component tree, data flow, feature states, routing, test evidence, accessibility evidence, and a deliberate next iteration.

This capstone stage asks you to write a **React portfolio project card** locally. You are not required to finish four production apps inside this card — hour ranges are aspirational. The goal is one reviewable project documented well enough that behavior is visible before visual polish.

## Reminder: where you work

```bash
cd ~/asv-learn-react
```

Windows (PowerShell):

```powershell
Set-Location "$HOME\asv-learn-react"
```

Create `portfolio_project.js` (and optionally a `projects/` subfolder for future app code).

## Project proof items

| Proof item | What it shows |
| --- | --- |
| Problem | Why the project exists |
| Component tree | UI split into reviewable parts |
| Data flow | How information moves |
| Feature states | loading, empty, ready, error |
| Route | Navigable surface |
| Test evidence | Protected behavior |
| Accessibility evidence | Operable for more users |
| Iteration plan | Next deliberate improvement |

## Four project directions (pick one to document now)

| Project | Core skill |
| --- | --- |
| Course progress dashboard | Lists, filters, shared selection |
| Note-taking side panel | Forms, validation, error recovery |
| Markdown lesson reader | Routing, loading states, typography |
| Habit tracker | Local state, derived stats, simple charts |

Document **one** deeply in this stage. Build others over time outside the card if you want — honesty beats fake breadth.

## What reviewers look for in junior frontend portfolios

| Question | Strong answer shape |
| --- | --- |
| What problem? | One sentence user pain |
| How is UI split? | Named components with jobs |
| How does data move? | Props down, events up (or fetch at boundary) |
| What if API fails? | Named error state + preserved input |
| How would you test? | Three concrete behavior checks |
| What is next? | One scoped iteration, not "everything" |

Your `portfolio_project.js` card is the written answer. Optional Vite app code is bonus proof when you have time.

## Start here: behavior before gallery

Say the proof: *this project solves searchable course progress, with ProgressPage → Filter → List → Card, handles four states, lives at `/dashboard/progress`, and tests filter + empty + error messaging.*

## Common beginner mistakes

- Screenshot-only portfolios with no data-flow explanation
- Mega-apps that never handle empty or error states
- Claiming "full test suite" without naming three concrete checks
- No iteration plan ("it's done" with known gaps)
- Listing four repos with identical unfinished boilerplate

## Your local task

### Step 1 — Create the portfolio card

Create `portfolio_project.js`:

```js
// portfolio_project.js — Stage 06: Capstone proof card

const reactPortfolioProject = {
  problem: "learners need a searchable course progress view",
  componentTree: ["ProgressPage", "CourseFilter", "CourseList", "ProgressCard"],
  dataFlow: "progress data flows from page state to list to each card",
  featureStates: ["loading", "empty", "ready", "error"],
  route: "/dashboard/progress",
  testEvidence: [
    "filters courses by search text",
    "shows empty state when no matches",
    "keeps error banner visible on fetch failure",
  ],
  accessibilityEvidence: [
    "filter input has label",
    "progress cards use headings",
    "status text is readable",
  ],
  iterationPlan: "add saved career-goal filter after search works",
};

function reviewCard(project) {
  const required = [
    "problem",
    "componentTree",
    "dataFlow",
    "featureStates",
    "route",
    "testEvidence",
    "accessibilityEvidence",
    "iterationPlan",
  ];
  const missing = required.filter((k) => !project[k] || project[k].length === 0);
  return { complete: missing.length === 0, missing };
}

console.log(JSON.stringify(reactPortfolioProject, null, 2));
console.log("Review:", reviewCard(reactPortfolioProject));
```

### Step 2 — Run

```bash
node portfolio_project.js
```

Confirm review reports `complete: true`.

### Step 3 — Make it yours

Replace problem, tree, and route with **your** chosen project direction. Keep all eight fields populated. Re-run until review passes.

### Step 4 — Optional scaffold

If Node and a bundler (Vite) are already on your machine, init a minimal app in `~/asv-learn-react/projects/progress-dashboard` with one route and a static mock list. This is optional — the card is the required proof for this stage.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| component tree | Hierarchy of components from page to leaves |
| data flow | Direction data travels (props down, events up) |
| feature state | UI mode for loading/empty/ready/error |
| iteration plan | Next scoped improvement, not vague "v2" |
| portfolio proof | Behavior evidence a reviewer can inspect |

## Proof checklist

- [ ] Portfolio card has all eight proof fields filled with your project
- [ ] `reviewCard` reports complete
- [ ] You can explain data flow in one minute without opening code
- [ ] Test and accessibility lists have at least three concrete items each
- [ ] Iteration plan names one next feature, not "polish everything"

When those are true, you have completed the **React & Modern Frontend** course card at stage depth. Keep building locally; hour totals grow with real projects, not checklist padding.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
