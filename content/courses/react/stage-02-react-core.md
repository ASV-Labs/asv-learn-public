# React Core: Components & Hooks

## Why this lesson exists

A React **component** is a reusable view decision: it receives props, keeps only the state it owns, and renders output from that data. Hooks like `useState` are useful only after the component has a clear **contract** — what it receives, what it may change, and what the user should see after an action.

This stage teaches you to write a **component recipe** in Node.js before JSX. The recipe names the component, props, local state, derived view, event handler, and render rule. Another engineer should understand the behavior from the recipe alone.

There is no in-lesson code box yet. Practice locally: edit → save → run with `node`.

## Reminder: where you work

```bash
cd ~/asv-learn-react
```

Windows (PowerShell):

```powershell
Set-Location "$HOME\asv-learn-react"
```

You will create `component_recipe.js` in that folder. If Stage 01 is not done, create the folder first.

## Component contract

| Part | Question |
| --- | --- |
| **Component** | What reusable UI unit are we building? |
| **Props** | What data comes from outside? |
| **State** | What can change inside? |
| **Derived view** | What text or status is calculated from props/state? |
| **Event handler** | What user action changes state? |
| **Render rule** | What must appear on screen? |

Hooks come **after** these decisions. A hook should help the component remember or react to a value you can already name in plain language.

## Props vs state vs derived values

| Kind | Example | Rule of thumb |
| --- | --- | --- |
| Prop | `lessonTitle`, `initialComplete` | Passed in; this component does not own the source |
| State | `complete` (toggle) | Owned here; user action may update it |
| Derived | Button label "Start" vs "Complete" | Computed from state — do not store separately |

**Not everything belongs in state.** If you can compute it from props or other state, keep it derived. Duplicate state causes bugs when the two copies disagree.

## Start here: contract before hooks

Say the contract in one sentence: *this component receives lesson data, owns one completion flag, toggles it on click, and shows the lesson title plus current status.*

Before `useState`, write the recipe. Before JSX, prove the recipe describes real user-visible behavior.

## The recipe shape

```js
const componentRecipe = {
  component: "ProgressToggle",
  props: ["lessonTitle", "initialComplete"],
  state: ["complete"],
  derivedView: "button text changes from Start to Complete",
  eventHandler: "click toggles complete state",
  renderRule: "show lesson title and current completion state",
};
```

Each field is a decision React code must implement later.

## Common beginner mistakes

- Adding `useState` for values that should be props
- Storing derived text in state (e.g. separate `buttonLabel` when it follows from `complete`)
- Components that do too many jobs — split when the contract has unrelated state
- Memorizing hook rules before naming the user action
- Expecting in-lesson React rendering (this stage is recipe + Node.js proof only)

## Your local task

### Step 1 — Create the starter

Create `component_recipe.js`:

```js
// component_recipe.js — Stage 02: React Core
// Simulate state without React; run with node.

const componentRecipe = {
  component: "ProgressToggle",
  props: ["lessonTitle", "initialComplete"],
  state: ["complete"],
  derivedView: "button text changes from Start to Complete",
  eventHandler: "click toggles complete state",
  renderRule: "show lesson title and current completion state",
};

function simulateToggle(props, state) {
  const buttonLabel = state.complete ? "Complete" : "Start";
  return {
    title: props.lessonTitle,
    status: state.complete ? "done" : "in progress",
    buttonLabel,
  };
}

let state = { complete: false };
const props = { lessonTitle: "Variables and Data Types", initialComplete: false };

console.log("Recipe:", componentRecipe);
console.log("Initial view:", simulateToggle(props, state));

state = { complete: !state.complete };
console.log("After click:", simulateToggle(props, state));
```

### Step 2 — Run unchanged

```bash
node component_recipe.js
```

Confirm initial view shows "Start" and after click shows "Complete".

### Step 3 — Extend the recipe

Change **one** aspect:

- Add a prop `lessonId` and include it in the simulated output
- Start from `initialComplete: true` and verify the first view
- Add a forbidden pattern comment: why `buttonLabel` should not be its own state field

Re-run and explain the change.

### Step 4 — Second mini-recipe

Add a second recipe object in the same file for a `LessonList` component (props: `items`, state: none, render rule: list titles). Run again. Two small components beat one vague mega-component.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| component | Reusable UI unit with a named contract |
| props | External inputs (read-only from the child’s perspective) |
| state | Internal value the component may update |
| derived view | Output computed from props/state |
| hook | React function (e.g. `useState`) that adds state or side effects |
| event handler | Function run when the user acts (click, submit, etc.) |

## Proof checklist

- [ ] `component_recipe.js` runs and shows before/after toggle output
- [ ] Recipe lists all six contract fields
- [ ] You can explain why `buttonLabel` is derived, not state
- [ ] You added or adjusted one recipe field with a clear reason
- [ ] You sketched a second small component recipe

When those are true, continue to **Routing, Data Fetching & Forms**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
