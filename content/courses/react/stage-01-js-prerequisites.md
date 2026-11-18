# JavaScript Prerequisites

## Why this lesson exists

React is a JavaScript library. Before JSX, hooks, or build tools, you need to read **data shape** the way React does: lists of items, objects with fields, functions that transform values, and state-like values that change what the user sees.

This stage teaches you to write a **component readiness checklist** in plain Node.js — a small file you run with `node` that names props, state, empty states, and what the screen should show. You are not building a React app yet. You are proving you can trace data from input to visible output.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit a `.js` file → run in terminal → one small change you can explain → checklist**.

This course card is a focused **30–40 hour** path at stage depth. Treat hour ranges as aspirational; solid stage practice matters more than padding.

## Reminder: where you work

Create a dedicated folder and confirm Node.js is available:

```bash
mkdir -p ~/asv-learn-react
cd ~/asv-learn-react
node --version
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-react"
Set-Location "$HOME\asv-learn-react"
node --version
```

You need Node.js 18+ (any recent LTS is fine). You will create `component_checklist.js` in that folder.

## What React expects from JavaScript

| JavaScript idea | How React uses it |
| --- | --- |
| **Array** | Render a list of items (`.map`) |
| **Object** | Pass structured data as props |
| **Function** | Transform data or handle events |
| **Conditional** | Choose empty, loading, error, or ready output |
| **State-like value** | Track what the user selected or changed |

React does not hide JavaScript. It gives JavaScript a component model. If you cannot name the data, JSX will feel like magic instead of a predictable translation.

## Start here: data shape before JSX

Before any component syntax, answer five questions:

1. What **list or object** does the component receive?
2. What does **one item** look like?
3. What **selected value** should the screen focus on?
4. What should the user see when data is **empty**?
5. What should change when the user **picks a different item**?

Say the shape in one sentence: *the component receives items, tracks one selected item, handles empty data, and renders a clear ready state.*

### Data-to-screen chain

| Step | Question |
| --- | --- |
| Input | What data exists? |
| Selection | What is focused or active? |
| Empty | What protects the user when nothing is ready? |
| Ready | What useful output appears when data exists? |
| Changed | What proves the interface responds to the user? |

## Arrays and objects in practice

A lesson list is a common React pattern:

```js
const items = [
  { id: 1, title: "Read props" },
  { id: 2, title: "Render selected item" },
];
const selectedId = 1;
```

- `items` is an **array** of **objects**
- Each object has `id` and `title` fields
- `selectedId` is a **state-like value** — it can change and the screen should update

Finding the selected item without React:

```js
const selected = items.find((item) => item.id === selectedId);
console.log(selected?.title ?? "Nothing selected");
```

The `??` operator provides a fallback when nothing matches — the same idea as an empty state in UI.

## Common beginner mistakes

- Jumping to JSX before naming props and state
- Storing duplicate data (keeping both `selectedId` and the full selected object when one derives from the other)
- Forgetting the empty case (`items.length === 0`)
- Treating every variable as state — some values are props passed from outside
- Waiting for an in-lesson code runner instead of practicing with local Node.js

## Your local task

### Step 1 — Create the starter

Create `component_checklist.js`:

```js
// component_checklist.js — Stage 01: JavaScript Prerequisites
// Run unchanged first, then change one field and re-run.

const items = [
  { id: 1, title: "Read props" },
  { id: 2, title: "Render selected item" },
  { id: 3, title: "Handle empty list" },
];

const selectedId = 1;

const componentChecklist = {
  props: ["items", "selectedId"],
  state: ["selectedId"],
  emptyState: "Show a useful empty message when no items exist.",
  readyState: "Show list and highlight the selected item title.",
  rendersList: true,
};

function describeScreen(items, selectedId) {
  if (items.length === 0) {
    return componentChecklist.emptyState;
  }
  const selected = items.find((item) => item.id === selectedId);
  return `Ready: ${items.length} items, selected="${selected?.title ?? "none"}"`;
}

console.log("Checklist:", componentChecklist);
console.log("Screen:", describeScreen(items, selectedId));
```

### Step 2 — Run unchanged

```bash
node component_checklist.js
```

Read the output. Match each checklist field to a screen behavior.

### Step 3 — Change one field

Change **one** thing and re-run. Examples:

- Set `selectedId` to `99` (missing item — what should the screen say?)
- Set `items` to `[]` and confirm the empty state message appears
- Add a fourth item and update `selectedId`

### Step 4 — Explain it back

In a comment or separate note, answer:

1. Why do arrays matter before JSX?
2. What is the difference between a prop and state-like data in this starter?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| props | Data passed into a component from outside |
| state | Data a component owns and may update |
| empty state | What the user sees when there is nothing useful to show |
| map | Array method that transforms each item (later: into UI) |
| derived value | Computed from other data instead of stored twice |

## Proof checklist

- [ ] `~/asv-learn-react` folder exists and `node --version` works
- [ ] `component_checklist.js` runs and prints checklist + screen description
- [ ] You tested empty list and missing selection cases
- [ ] You changed one field, re-ran, and can explain the new output
- [ ] You can name props vs state-like values in the starter

When those are true, continue to **React Core: Components & Hooks**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
