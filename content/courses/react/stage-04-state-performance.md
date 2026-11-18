# State Management & Performance

## Why this lesson exists

State should live **where it is needed** — not everywhere, not nowhere. Performance work should start with a **named risk** and **measurement**, not memoization by default. Premature optimization makes components harder to read and does not always help users.

This stage teaches you to write a **state and performance plan** locally. You will simulate filtering a lesson list in plain JavaScript and count how many "cards" would re-render — the same judgment React developers use before `useMemo` or context.

## Reminder: where you work

```bash
cd ~/asv-learn-react
```

Windows (PowerShell):

```powershell
Set-Location "$HOME\asv-learn-react"
```

Create `state_performance_plan.js`.

## State placement

| Decision | When |
| --- | --- |
| **Local state** | One component owns the value (filter text in a search box) |
| **Shared state** | Multiple components need the same value (selected lesson id for list + detail) |
| **Derived data** | Computed from source + filter (filtered list — do not store separately if cheap) |
| **Server state** | Fetched data with its own cache/refetch rules (later libraries help) |

Lift state up when siblings must stay in sync. Do not lift everything to the root "just in case."

## Performance without guesswork

| Step | Action |
| --- | --- |
| 1 | Name what changes (typing in search) |
| 2 | Name what might re-render (every lesson card) |
| 3 | Name repeated work (filtering the full list each keystroke) |
| 4 | Decide if cost is real (10 items vs 10,000) |
| 5 | Measure or count before adding memoization |

Optimization is a follow-up to behavior, not a first move.

## Start here: ownership before memo

Say the plan in one sentence: *selected lesson id is shared; filter text stays local; filtering may repeat on each keystroke; measure render count before memoizing.*

## When to reach for context or a store

Start with local state and prop drilling for shallow trees. Consider **context** when many distant components need the same value (theme, authenticated user id, selected lesson). Consider a dedicated store (Zustand, Redux Toolkit) when update rules, middleware, or time-travel debugging justify the complexity — not on day one because a tutorial used it.

For this course card, the planning exercise matters more than picking a library. If you cannot draw where state lives on paper, a library will not fix the design.

## Common beginner mistakes

- Putting all state in context on day one
- Memoizing every callback and value (noise, not engineering)
- Storing filtered results in state when filter + source derive them
- Optimizing without a user-visible problem
- Confusing this planning exercise with needing Redux immediately

## Your local task

### Step 1 — Create the starter

Create `state_performance_plan.js`:

```js
// state_performance_plan.js — Stage 04: State & Performance

const statePerformancePlan = {
  sharedState: "selectedLessonId used by list and detail panel",
  localState: "filterText stays inside the search box component",
  memoizedWork: "filtered lessons list (only if list is large)",
  renderRisk: "typing in search rerenders every lesson card",
  updateStrategy: "derive filtered list from sourceLessons + filterText",
  measurement: "count card renders before and after splitting memo",
};

const sourceLessons = [
  { id: 1, title: "Variables" },
  { id: 2, title: "Input and Math" },
  { id: 3, title: "Loops" },
  { id: 4, title: "Functions" },
];

function filterLessons(lessons, filterText) {
  const q = filterText.toLowerCase();
  return lessons.filter((l) => l.title.toLowerCase().includes(q));
}

function simulateRender(filterText, selectedId) {
  const filtered = filterLessons(sourceLessons, filterText);
  let cardRenders = filtered.length; // naive: every card on every keystroke
  return { filtered, cardRenders, selectedId };
}

console.log("Plan:", statePerformancePlan);
console.log("Empty filter:", simulateRender("", 1));
console.log("Filter 'io':", simulateRender("io", 1));
```

### Step 2 — Run and interpret

```bash
node state_performance_plan.js
```

Note how `cardRenders` tracks filtered length — a stand-in for "how much UI work repeats."

### Step 3 — Add a cheap guard

Add a comment block describing when memoization **would** be worth it (e.g. 500+ items, expensive sort). For four lessons, deriving each time is fine — write that honestly.

### Step 4 — Change shared selection

Log two simulations with the same filter but different `selectedId`. Explain why selection is shared state but filter text is local.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| lift state | Move state to a common parent so siblings can read it |
| derive | Compute from existing state instead of storing duplicate |
| re-render | Component function runs again because inputs changed |
| memoization | Cache expensive work or stable references when measured benefit exists |
| context | React mechanism to pass shared state without prop drilling |

## Proof checklist

- [ ] Plan object includes all six fields
- [ ] Filter simulation runs and `cardRenders` makes sense
- [ ] You documented when memoization is *not* needed yet
- [ ] You explained shared vs local state with this example
- [ ] You can name one render risk and one measurement idea

When those are true, continue to **Testing & Accessibility**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
