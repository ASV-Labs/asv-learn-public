# React Frontend Development

## Why this lesson exists

React is one way to turn **data** and **state** into reusable interface pieces. Teams use it because large pages become easier to reason about when each screen area has a clear contract: what data comes in, what can change locally, what the user can do, and what should appear in each situation.

In this stage you will not install a full React toolchain yet unless you already have one. You **will** write a **React view plan** in local JavaScript and a tiny state machine that simulates how a component behaves. That honest step matches how senior developers review UI work before JSX fills the screen.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a local `.js` file → run with Node → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-fullstack/stage-02
cd ~/asv-learn-fullstack/stage-02
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-fullstack\stage-02"
Set-Location "$HOME\asv-learn-fullstack\stage-02"
```

You will create `view_plan.js` in that folder.

## Start here: component contract before hooks

Before hooks or JSX syntax, name the **component contract**:

| Question | React term |
| --- | --- |
| What data comes in from outside? | **props** |
| What can change inside this piece? | **state** |
| What does the user do? | **event** |
| What should appear on screen? | **render output** |
| What happens when data is missing? | **empty state** |

A useful component is small enough that you can answer those five questions out loud before writing code.

## How to use this lesson

Read in this order:

- **Learn:** understand React as props + state + events → visible output
- **Inspect:** match each view-plan field to a user-visible behavior
- **Build:** complete the view plan and the render simulation
- **Prove:** explain what the user sees for empty, ready, and complete states

Practice after reading means you should understand the contract before editing the JavaScript object. If the object looks technical, read one property at a time and ask: *what would the user see after this event?*

## One clean pass through this lesson

Read React work as a component chain:

1. The component name says which piece of the interface you are planning.
2. Props describe data passed in from a parent (title, progress, callbacks).
3. Local state describes what can change inside the component (expanded, saving).
4. Events describe user actions (click start, toggle details).
5. Render states describe what appears for empty, ready, and complete work.

Do not start with hooks vocabulary. First say the plan in one sentence: *LessonStatusCard receives title and progress, toggles expanded locally, and shows different copy for empty vs ready vs complete.*

## Component thinking with a concrete example

Imagine a course dashboard card:

```js
const reactViewPlan = {
  component: "LessonStatusCard",
  props: ["title", "progress", "onStart"],
  state: ["expanded"],
  events: ["click start", "toggle details"],
  renderStates: ["empty", "ready", "complete"],
  accessibility: "button label names the action, not just 'click here'",
};
```

Props are inputs you do not own. State is memory this component owns. Events connect user actions to state updates. Render states are what a tester should be able to see.

## Simulating render output without JSX

You can practice the contract with plain functions:

```js
function renderLessonStatusCard(props, state) {
  if (props.progress === 0) {
    return { view: "empty", message: `No progress on ${props.title}` };
  }
  if (props.progress >= 100) {
    return { view: "complete", message: `${props.title} complete` };
  }
  const details = state.expanded ? " (details open)" : "";
  return { view: "ready", message: `${props.title}: ${props.progress}%${details}` };
}
```

This is not React. It is the **behavior** React would later encode in JSX. If you cannot explain this function, adding `useState` will not help yet.

## Common beginner mistakes

**Putting everything in one giant component.** If the plan needs twelve props and eight events, split the UI mentally before coding.

**Using state for data that should be a prop.** If the parent already knows the lesson title, the child should receive it — not fetch or duplicate it silently.

**Empty states that look like errors.** Zero progress is normal. Say "No progress yet" instead of red error styling unless something failed.

**Accessibility as an afterthought.** If the only control is a icon with no label, keyboard and screen-reader users cannot tell what it does.

## Your local task

### Step 1 — Create the starter

Create `view_plan.js`:

```js
// view_plan.js — Stage 02: React Frontend Development
// Run unchanged first, then extend one render state.

const reactViewPlan = {
  component: "LessonStatusCard",
  props: ["title", "progress", "onStart"],
  state: ["expanded"],
  events: ["click start", "toggle details"],
  renderStates: ["empty", "ready", "complete"],
  accessibility: "button label names the action",
};

function renderLessonStatusCard(props, state) {
  if (props.progress === 0) {
    return { view: "empty", message: `No progress on ${props.title}` };
  }
  if (props.progress >= 100) {
    return { view: "complete", message: `${props.title} complete` };
  }
  const details = state.expanded ? " (details open)" : "";
  return {
    view: "ready",
    message: `${props.title}: ${props.progress}%${details}`,
  };
}

function demo() {
  console.log("=== View plan ===");
  console.log(reactViewPlan);
  console.log("\n=== Render samples ===");
  console.log(renderLessonStatusCard({ title: "HTML basics", progress: 0 }, { expanded: false }));
  console.log(renderLessonStatusCard({ title: "HTML basics", progress: 40 }, { expanded: false }));
  console.log(renderLessonStatusCard({ title: "HTML basics", progress: 40 }, { expanded: true }));
  console.log(renderLessonStatusCard({ title: "HTML basics", progress: 100 }, { expanded: false }));
}

if (require.main === module) {
  demo();
}

module.exports = { reactViewPlan, renderLessonStatusCard };
```

### Step 2 — Run unchanged

```bash
node view_plan.js
```

Match each printed render sample to `empty`, `ready`, or `complete`.

### Step 3 — Extend one render state

Change **one** thing after the output makes sense. Examples:

- Add a `"saving"` render state when progress is between 99 and 100
- Improve the accessibility string to mention progress
- Add a `error` render state when `progress` is negative (validation)

Save and run again.

### Step 4 — Explain props vs state

In a comment at the bottom of the file, answer:

1. Which values in your demo are **props**?
2. Which value is **state** inside the component?
3. What event would flip `expanded` in a real React component?

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Component | Reusable UI piece with its own contract |
| Props | Inputs passed into a component from outside |
| State | Values a component manages internally |
| Event | User action that may update state |
| Render | What appears on screen for the current props and state |
| Empty state | What the user sees when there is no data yet |

## Proof checklist

- [ ] `view_plan.js` exists in `~/asv-learn-fullstack/stage-02`
- [ ] Running it prints the view plan and at least three render samples
- [ ] You can point to props, state, events, and render states
- [ ] You extended one render behavior and re-ran successfully
- [ ] You explained props vs state in a comment or note

When those are true, continue to **Node.js & Express Backend**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
