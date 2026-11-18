export const REACT_COURSE = {
  slug: "react",
  title: "React & Modern Frontend",
  description:
    "Build modern frontend interfaces with JavaScript foundations, components, routing, data flow, performance, testing, accessibility, and portfolio proof.",
  icon: "RX",
  difficulty: "Beginner",
  hours: "30-40",
  topics: ["JavaScript", "React", "Routing", "State", "Testing", "Accessibility"],
  certBadges: ["React Developer"],
  stages: [
    {
      slug: "js-prerequisites",
      title: "JavaScript Prerequisites",
      hours: "6-8",
      sortOrder: 1,
      content: `# JavaScript Prerequisites

React is easier when plain JavaScript data flow already makes sense. Before JSX or hooks, practice reading arrays, objects, functions, and state-like values.

## Start Here: Data Shape Before JSX

At the start, do not worry about components, hooks, or build tools. Ask what data exists, what one item looks like, what the user selects, and what the screen should show for empty, ready, and changed states.

You are not writing a polished React app yet. You are learning the JavaScript thinking React expects before JSX turns the idea into interface code.

## How to Use This Room Screen

This room is about reading JavaScript data before JSX. Read the screen in this order:

- Learn: understand the data shape, selected value, and screen state.
- Inspect: look at arrays, objects, functions, conditions, and state-like values.
- Build: write one readiness checklist, not a React app.
- Prove: explain what the component would render for empty, ready, and changed states.

"Practice after the lesson" means you should understand the data before editing the starter object. If the JavaScript looks like a wall, read one line at a time and ask: what data exists, what changed, and what should the user see?

## One Clean Pass Through This Room

Before the workspace, read the JavaScript as a data-to-screen chain:

1. A list or object gives the component information.
2. One selected value tells the screen what to focus on.
3. An empty state protects the user when nothing is ready.
4. A ready state shows useful data clearly.
5. A changed state proves the interface responds to the user.

That chain is the React lesson before React syntax appears. JSX is easier when you already know what data exists, what can change, and what each state should show.

Do not start by writing JSX. First say the data shape in one sentence: the component receives items, tracks one selected item, handles empty data, and renders a clear ready state.

## What React Expects

| JavaScript idea | How React uses it |
| --- | --- |
| Array | Render a list of items |
| Object | Pass structured data as props |
| Function | Transform data or handle events |
| Conditional | Choose empty, loading, error, or ready output |
| State-like value | Track what the user selected or changed |

React does not hide JavaScript. It gives JavaScript a component model.

## What the Workspace Will Ask You To Do

When the practice area opens, use it like a data-shape checklist:

1. Name the list or object the component receives.
2. Name the selected value or state-like value.
3. Name the empty state the user should see.
4. Name the ready state the user should see.
5. Explain how the data shape supports a later React component.

You are not expected to build a polished React screen in this first room. The goal is to read data clearly enough that JSX has a job later.

## Your First Ten Minutes

Use this order:

1. Read the data-shape idea without the editor.
2. Point to the array, object, and selected value in the table.
3. Open practice and run the starter unchanged.
4. Match each starter property to a screen state.
5. Change only one field after the original checklist makes sense.

## Before Editing the Starter Code

Run the starter unchanged and read \`componentChecklist\` as a plain checklist:

- \`props\` names data the component receives.
- \`state\` names data the component may change.
- \`emptyState\` says what appears when the list has nothing useful.
- \`rendersList\` proves the data can become visible UI.

After those pieces make sense, change one field or add one visible state. Do not add hook or JSX syntax yet. You are ready when the work shows clear data flow, not a finished React app.

## Readiness Checklist

~~~js
const items = [
  { id: 1, title: "Read props" },
  { id: 2, title: "Render selected item" },
];
const selectedId = 1;
const componentChecklist = {
  props: ["items", "selectedId"],
  state: ["selectedId"],
  emptyState: "Show a useful empty message when no items exist.",
  rendersList: true,
};

console.log({ items, selectedId, componentChecklist });
~~~

This plan proves you can name the data a component receives, the selected state it depends on, and the empty state it should show.

## Practice

Write a prerequisite checklist for a component that renders a list and handles a selected item.

## Explain It Back

Explain why arrays and objects matter before a learner starts writing JSX.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why does React rely so much on arrays?",
          options: ["Lists of data often become lists of UI", "Arrays replace all components", "Arrays store deployment secrets", "Arrays remove the need for state"],
          correct: 0,
          explanation: "React frequently maps arrays of data into arrays of rendered UI items.",
        },
      ],
    },
    {
      slug: "react-core",
      title: "React Core: Components & Hooks",
      hours: "8-10",
      sortOrder: 2,
      content: `# React Core: Components & Hooks

A component is a reusable view decision. It receives props, keeps only the state it owns, and renders output from that data.

## Start Here: Component Contract Before Hooks

React gets confusing when hooks show up before the component has a job. Start by naming the small piece of interface you are building, the data it receives, the one thing it may change, and what the user should see after that change.

This room is not asking you to memorize every hook rule first. It is asking you to describe a component clearly enough that the hook has a purpose.

## How to Use This Room Screen

Read this room in this order:

- Learn: understand the component as a reusable view decision.
- Inspect: separate props, local state, derived view, event handler, and render rule.
- Build: write a component recipe before writing JSX.
- Prove: explain which value belongs in state and which value should stay as a prop or derived value.

"Practice after the lesson" means write the recipe first. If the code terms feel crowded, ignore syntax for a moment and ask: what does this component receive, what can the user change, and what should the screen show?

## One Clean Pass Through This Room

Before the workspace, read the component as a small behavior contract:

1. The component name tells you the reusable piece of UI.
2. Props name information handed in from outside.
3. Local state names the one value this component owns.
4. An event handler names the user action.
5. The render rule names the visible result after the action.

Hooks come after those decisions. A hook should help the component remember or react to a value the learner can already name in plain language.

Do not start by writing hooks. First say the contract in one sentence: this component receives lesson data, owns one completion value, changes that value on a user action, and renders the current status clearly.

## What the Workspace Will Ask You To Do

When the practice area opens, write one component recipe:

1. Name the component.
2. Name the props it receives from outside.
3. Name the local state it owns.
4. Name the user action that changes that state.
5. Name the visible result the user should see.

You are not expected to build the full React component in this room. The goal is to prove the component contract is clear before hooks or JSX make it feel larger.

## Your First Ten Minutes

Use this order:

1. Read the contract table without the editor.
2. Point to the value that comes from outside the component.
3. Point to the value the component owns.
4. Run the starter unchanged.
5. Change one recipe field only after the original recipe makes sense.

## Before Writing the Component Recipe

A component recipe is a short behavior card:

- \`component\` names the reusable UI unit.
- \`props\` names data that comes from a parent.
- \`state\` names data the component may update.
- \`derivedView\` names what the user sees because of that data.
- \`eventHandler\` names the action that changes state.
- \`renderRule\` says what must appear on screen.

You are ready when the work shows a clear component contract, not a finished hook implementation.

## Component Contract

| Part | Question |
| --- | --- |
| Component | What reusable UI unit are we building? |
| Props | What data comes from outside? |
| State | What can change inside? |
| Derived view | What text or status is calculated? |
| Event handler | What user action changes state? |
| Render rule | What should the user see? |

Hooks are useful after this contract is clear.

## Component Recipe

~~~js
const componentRecipe = {
  component: "ProgressToggle",
  props: ["lessonTitle", "initialComplete"],
  state: ["complete"],
  derivedView: "button text changes from Start to Complete",
  eventHandler: "click toggles complete state",
  renderRule: "show the lesson title and current completion state",
};

console.log(componentRecipe);
~~~

The recipe is small, but it names the decisions React code must implement.

## Practice

Write a component recipe with component name, props, local state, derived view, event handler, and render rule.

## Explain It Back

Explain why not every value in a component should become state.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Which value belongs in local state?",
          options: ["A value the component owns and can change", "Every prop", "A package version", "A database table"],
          correct: 0,
          explanation: "Local state is for values the component owns and updates over time.",
        },
      ],
    },
    {
      slug: "routing-data",
      title: "Routing, Data Fetching & Forms",
      hours: "8-10",
      sortOrder: 3,
      content: `# Routing, Data Fetching & Forms

Frontend routing connects the user's location to the view they should see. Data fetching and forms connect that view to real work.

## Start Here: User Journey Before Data Fetching

Routes, requests, and forms are easier when the user journey is visible first. Start by naming where the user can go, what the screen shows while data loads, what information the form accepts, and what happens if the request fails.

This room is not asking you to build a production router. It is asking you to protect the learner's typed work and describe how the interface behaves while the app waits, succeeds, or fails.

## How to Use This Room Screen

Read this room in this order:

- Learn: connect a route to the screen and task it supports.
- Inspect: find loader states, form fields, validation, submit action, and error state.
- Build: write a route and form plan before writing components.
- Prove: explain how the UI preserves user input when something goes wrong.

"Practice after the lesson" means map the journey first. If the table feels abstract, read it as a user story: the learner opens a page, waits for data, fills a form, submits it, and receives a useful result or recovery message.

## One Clean Pass Through This Room

Before the workspace, read the feature as a route-to-result journey:

1. A route tells the user where they are.
2. A loading state tells the truth while data is not ready.
3. A form collects only the information the task needs.
4. Validation protects the user before the request leaves the browser.
5. Error and success states decide what happens after submit.

The route, request, and form should serve the same user task. If the journey is unclear, the code will feel like disconnected pieces.

Do not start by wiring fetch calls. First say the journey in one sentence: the user opens a route, waits for data, enters valid information, submits it, and keeps a recovery path if the request fails.

## What the Workspace Will Ask You To Do

When the practice area opens, write one route and form plan:

1. Name the routes the learner can visit.
2. Name the loading, error, empty, and ready states.
3. Name the form fields.
4. Name the validation rule.
5. Name the submit action and the error message behavior.

You are not expected to wire a real API in this room. The goal is to prove the route, form, and recovery behavior are understandable before implementation.

## Your First Ten Minutes

Use this order:

1. Read the route names as destinations, not code.
2. Match each loader state to what the user sees.
3. Run the starter unchanged.
4. Check that the validation rule protects the form.
5. Change one field or state after the original plan makes sense.

## Before Writing the Route And Form Plan

A route and form plan should answer:

- Where can the user go?
- What appears before data is ready?
- What input is required?
- What happens on submit?
- What does the user see if the request fails?
- How does the UI avoid losing typed work?

You are ready when the work shows a clear route-and-form plan, not a production data layer.

## Route And Form Plan

| Surface | Evidence to name |
| --- | --- |
| Routes | Which paths exist? |
| Loader states | What appears while data loads or fails? |
| Form fields | What input does the user provide? |
| Validation | What input is rejected before submit? |
| Submit action | What happens when the form is sent? |
| Error state | What the user sees when the request fails |

Good frontend code tells the truth while waiting, failing, and succeeding.

## Interaction Plan

~~~js
const routeDataPlan = {
  routes: ["/lessons", "/lessons/:id"],
  loaderStates: ["loading", "error", "empty", "ready"],
  formFields: ["title", "notes"],
  validationRule: "title is required before submit",
  submitAction: "POST /api/notes",
  errorState: "show retry message without losing typed notes",
};

console.log(routeDataPlan);
~~~

This plan helps a learner see the user journey before building components.

## Practice

Write a route and form plan with routes, loader states, fields, validation, submit action, and error state.

## Explain It Back

Explain why a form should preserve typed input after a failed submit.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should a loader state communicate?",
          options: ["What the app is doing while data is not ready", "That routing is disabled", "That validation is unnecessary", "That all errors are hidden"],
          correct: 0,
          explanation: "A loader state keeps the user informed while the app waits for data.",
        },
      ],
    },
    {
      slug: "state-performance",
      title: "State Management & Performance",
      hours: "8-10",
      sortOrder: 4,
      content: `# State Management & Performance

State should live where it is needed, and rendering should stay understandable before it becomes optimized.

## Start Here: Named State Before Optimization

Performance work should begin with a named change, a named rerender risk, and a way to measure improvement. If those pieces are missing, optimization becomes guesswork.

This room is not asking you to make every value faster. It is asking you to decide where state belongs, what work might repeat, and what evidence would prove the change helped.

## How to Use This Room Screen

Read this room in this order:

- Learn: separate shared state from local state.
- Inspect: name memoized work, render risk, update strategy, and measurement.
- Build: write a state performance plan before changing component structure.
- Prove: explain why the optimization target is specific.

"Practice after the lesson" means describe the state decision before reaching for memoization. If the vocabulary feels heavy, translate it into ordinary questions: who needs this value, what changes, what rerenders, and how would I know it improved?

## One Clean Pass Through This Room

Before the workspace, read performance as a state ownership question:

1. Shared state belongs where every dependent component can reach it.
2. Local state stays close to the one component that owns it.
3. Repeated work is only a problem when it has a visible cost.
4. Render risk names what might update too often.
5. Measurement proves whether the change helped.

Optimization is a follow-up to a named behavior, not a first move. The learner should be able to explain what changes and what rerenders before adding performance tools.

Do not start by adding memoization. First say the state decision in one sentence: this value is shared, this value is local, this work may repeat, and this measurement would prove whether optimization helped.

## What the Workspace Will Ask You To Do

When the practice area opens, write one state and performance plan:

1. Name the shared state.
2. Name the local state.
3. Name the repeated work that might be memoized.
4. Name the render risk.
5. Name the update strategy and measurement.

You are not expected to optimize a real app in this room. The goal is to show judgment about state placement and performance evidence.

## Your First Ten Minutes

Use this order:

1. Read the state decisions before the starter object.
2. Point to the value more than one component needs.
3. Point to the value only one component owns.
4. Run the starter unchanged.
5. Change one risk or measurement after the original plan makes sense.

## Before Writing the State Performance Plan

A state performance plan is a small diagnosis:

- \`sharedState\` names data multiple components need.
- \`localState\` names data one component owns.
- \`memoizedWork\` names repeated work worth protecting.
- \`renderRisk\` names what could rerender too much.
- \`updateStrategy\` names the rule for changing state.
- \`measurement\` names the evidence you would collect.

You are ready when the work shows a measurable state decision, not a pile of optimization tricks.

## State Decisions

| Decision | Reason |
| --- | --- |
| Shared state | Multiple components need the same value |
| Local state | One component owns the value |
| Memoized work | An expensive calculation repeats |
| Render risk | A change could rerender too much |
| Update strategy | The rule for changing state |
| Measurement | Evidence that performance improved |

Performance work should start with a specific risk, not a guess.

## Performance Plan

~~~js
const statePerformancePlan = {
  sharedState: "selected lesson id is used by list and detail panel",
  localState: "filter text stays inside the search box",
  memoizedWork: "filtered lessons list",
  renderRisk: "typing in search rerenders every lesson card",
  updateStrategy: "derive filtered list from source lessons and filter text",
  measurement: "compare render count before and after memoization",
};

console.log(statePerformancePlan);
~~~

The goal is not to memorize optimization words. The goal is to name what changes, what rerenders, and how you would measure it.

## Practice

Write a state and performance plan with shared state, local state, memoized work, render risk, update strategy, and measurement.

## Explain It Back

Explain why premature optimization can make a React component harder to understand.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "When should performance work begin?",
          options: ["When there is a named render risk or measurement", "Before the feature behavior is known", "By memoizing every value", "By removing all state"],
          correct: 0,
          explanation: "Performance work is stronger when tied to a specific risk and evidence.",
        },
      ],
    },
    {
      slug: "testing-accessibility",
      title: "Testing & Accessibility",
      hours: "8-10",
      sortOrder: 5,
      content: `# Testing & Accessibility

A frontend feature is not done when it looks correct on one screen. It needs evidence that a user can operate it and that key behavior is protected.

## Start Here: User Operation Before Visual Signoff

A screen can look finished and still fail the learner. Before tests or accessibility tools, name the task the user needs to complete, how they operate it with a keyboard, what result should appear, and what bug would hurt the experience.

This room is not asking you to write a full test suite first. It is asking you to identify the behavior and accessibility evidence that make the feature trustworthy.

## How to Use This Room Screen

Read this room in this order:

- Learn: connect quality to a real user journey.
- Inspect: separate tests, accessibility checks, keyboard path, assertions, and bug risk.
- Build: write a quality plan before writing test code.
- Prove: explain why one accessibility label also helps testing and usability.

"Practice after the lesson" means make the feature operable on paper first. If the table feels like QA jargon, read it as a checklist for whether a person can finish the task without losing work.

## One Clean Pass Through This Room

Before the workspace, read quality as proof that a person can finish the task:

1. The user journey names the task being protected.
2. Behavior tests name the visible results that must keep working.
3. Accessibility checks prove more people can operate the feature.
4. The keyboard path shows the task without assuming a mouse.
5. Assertions and bug risk connect the test to a real failure.

A test should not be a random sentence about code. It should protect a user outcome that matters.

Do not start by writing assertions. First say the quality contract in one sentence: this user can complete this task, the keyboard path works, the expected result appears, and the likely failure is covered.

## What the Workspace Will Ask You To Do

When the practice area opens, write one quality plan:

1. Name the user journey.
2. Name the behavior tests.
3. Name the accessibility checks.
4. Name the keyboard path.
5. Name the assertions and the bug risk.

You are not expected to cover every edge case in this room. The goal is to prove the most important behavior can be operated and checked.

## Your First Ten Minutes

Use this order:

1. Read the user journey before the test list.
2. Follow the keyboard path in plain language.
3. Run the starter unchanged.
4. Match each assertion to visible behavior.
5. Change one test or risk after the original plan makes sense.

## Before Writing the Quality Plan

A quality plan should connect evidence to user trust:

- \`userJourney\` names the task.
- \`tests\` names protected behavior.
- \`accessibilityChecks\` names usability requirements.
- \`keyboardPath\` proves mouse-free operation.
- \`assertions\` names exact expected results.
- \`bugRisk\` names what could break the learner's work.

You are ready when the work shows a useful quality plan, not a complete test harness.

## Quality Evidence

| Evidence | What it proves |
| --- | --- |
| User journey | The feature supports a real task |
| Tests | Important behavior is checked repeatedly |
| Accessibility checks | More users can operate the interface |
| Keyboard path | The feature does not require a mouse |
| Assertions | The expected result is specific |
| Bug risk | The test targets a likely failure |

Accessibility is not decoration. It is part of whether the UI works.

## Quality Plan

~~~js
const qualityPlan = {
  userJourney: "learner opens lesson and saves a note",
  tests: ["renders lesson title", "saves note after submit", "shows error on failed save"],
  accessibilityChecks: ["button has label", "form field has label", "status message is announced"],
  keyboardPath: "tab to textarea, type note, tab to save, press Enter",
  assertions: ["saved message appears", "typed note remains on error"],
  bugRisk: "failed save could erase learner notes",
};

console.log(qualityPlan);
~~~

This plan names behavior, accessibility, and risk before test code is written.

## Practice

Write a quality plan with user journey, tests, accessibility checks, keyboard path, assertions, and bug risk.

## Explain It Back

Explain why an accessible label can be both a usability feature and a test target.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why include a keyboard path?",
          options: ["It proves the feature can be operated without a mouse", "It replaces all tests", "It hides form labels", "It removes state"],
          correct: 0,
          explanation: "Keyboard operation is core accessibility evidence for interactive UI.",
        },
      ],
    },
    {
      slug: "react-projects",
      title: "Capstone: Four React Projects",
      hours: "12-16",
      sortOrder: 6,
      content: `# Capstone: React Project Proof

A React capstone should show more than a polished screenshot. It should prove a user problem, component tree, data flow, states, route, tests, accessibility, and iteration plan.

## Start Here: Behavior Evidence Before Portfolio Polish

A portfolio project should prove that you can think like a frontend engineer, not only style a screenshot. Start by naming the user problem, the component tree, the data flow, the states, the route, and the evidence that the feature works.

This room is not asking you to invent a huge app. It is asking you to package one React project so a reviewer can understand the behavior, decisions, and next improvement.

## How to Use This Room Screen

Read this room in this order:

- Learn: understand the capstone as behavior proof.
- Inspect: connect problem, component tree, data flow, feature states, route, tests, accessibility, and iteration plan.
- Build: write a React portfolio card before polishing visuals.
- Prove: explain how the project shows frontend judgment.

"Practice after the lesson" means document the project evidence first. If the project feels too big, narrow it to one user task and prove that task from route to component to state to test.

## One Clean Pass Through This Room

Before the workspace, read the capstone as a reviewer proof card:

1. The problem explains why the project exists.
2. The component tree shows how the interface is organized.
3. Data flow shows how information moves across the screen.
4. Feature states prove the project handles waiting, success, empty, and error moments.
5. Tests, accessibility evidence, and an iteration plan show the project can improve deliberately.

Portfolio polish matters, but it cannot replace behavior evidence. A reviewer should be able to understand what the project does before judging how it looks.

Do not start by polishing the portfolio. First say the proof in one sentence: this project solves one user problem, has a clear component tree and data flow, handles key states, and includes test and accessibility evidence.

## What the Workspace Will Ask You To Do

When the practice area opens, write one React portfolio project card:

1. Name the user problem.
2. Name the component tree.
3. Name the data flow and feature states.
4. Name the route.
5. Name the test evidence, accessibility evidence, and iteration plan.

You are not expected to finish four polished apps in this room. The goal is to make one project reviewable and credible.

## Your First Ten Minutes

Use this order:

1. Read the proof table before the starter object.
2. Pick one user problem.
3. Trace the route, component tree, and data flow.
4. Run the starter unchanged.
5. Change one proof field after the original card makes sense.

## Before Writing the React Portfolio Card

A portfolio card should show:

- The reason the project exists.
- The parts of the interface.
- How data moves.
- The visible states a user may see.
- The route where the work happens.
- The behavior and accessibility evidence.
- The next deliberate improvement.

You are ready when the work shows reviewable behavior proof, not only visual polish.

## Project Proof

| Proof item | What it shows |
| --- | --- |
| Problem | The project has a reason to exist |
| Component tree | The UI is decomposed into reviewable parts |
| Data flow | Data movement is understandable |
| Feature states | The UI handles waiting, success, and failure |
| Route | The project has a navigable surface |
| Test evidence | Important behavior is protected |
| Accessibility evidence | The interface can be operated by more users |
| Iteration plan | The next improvement is deliberate |

Reviewers need behavior evidence, not only a gallery.

## Capstone Card

~~~js
const reactPortfolioProject = {
  problem: "learners need a searchable course progress view",
  componentTree: ["ProgressPage", "CourseFilter", "CourseList", "ProgressCard"],
  dataFlow: "course progress data flows from page to list to card",
  featureStates: ["loading", "empty", "ready", "error"],
  route: "/dashboard/progress",
  testEvidence: ["filters courses by search", "shows empty state", "keeps error message visible"],
  accessibilityEvidence: ["filter input has label", "progress cards use headings", "status text is readable"],
  iterationPlan: "add saved career goal filtering after search works",
};

console.log(reactPortfolioProject);
~~~

This capstone card is the bridge between learning React and presenting proof of frontend engineering judgment.

## Practice

Write a React portfolio project card with problem, component tree, data flow, feature states, route, test evidence, accessibility evidence, and iteration plan.

## Explain It Back

Explain why a portfolio project should describe data flow and test evidence, not only visual polish.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What does a component tree show?",
          options: ["How the UI is split into reviewable parts", "Which server owns the database", "How to bypass testing", "Why accessibility can be skipped"],
          correct: 0,
          explanation: "A component tree shows how the interface is decomposed into meaningful parts.",
        },
      ],
    },
  ],
};
