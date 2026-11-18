export const FULLSTACK_COURSE = {
  slug: "fullstack",
  title: "Full Stack Development",
  description:
    "Build complete web applications from browser structure through React views, APIs, databases, deployment, and portfolio proof.",
  icon: "WEB",
  difficulty: "Intermediate",
  hours: "60-70",
  topics: ["Frontend", "React", "APIs", "Databases", "Deployment", "Portfolio"],
  certBadges: ["Full Stack Developer"],
  stages: [
    {
      slug: "html-css-js",
      title: "HTML, CSS & JavaScript Foundations",
      hours: "8-10",
      sortOrder: 1,
      content: `# HTML, CSS & JavaScript Foundations

A full-stack feature is a chain. The browser starts the chain with structure, presentation, and behavior.

## Start Here: User Flow Before Code

At the start, do not jump straight into files or frameworks. Name what the user sees, what they can do, what state changes, and what proof shows the feature worked.

You are not building a whole app yet. You are learning to read a web feature as a clear user flow before the HTML, CSS, and JavaScript details get loud.

## How to Use This Room Screen

This room is about the user's path through a small browser feature. Read the screen in this order:

- Learn: understand the feature as structure, readable state, and behavior.
- Inspect: look at the browser layers and name what each layer proves.
- Build: write one small component plan, not a full app.
- Prove: explain how the user can tell the feature worked.

"Practice after the lesson" means you should understand the visible user flow before editing the starter object. If the JavaScript looks like a wall, read one property at a time and ask: what would the user see, do, or notice?

## One Clean Pass Through This Room

Before the workspace, read the feature as a user-flow chain:

1. The user sees one clear piece of content or one clear control.
2. The page shows a state the user can understand.
3. The user takes one action.
4. JavaScript changes the state after that action.
5. The final screen proves the feature worked.

That chain is the lesson. HTML, CSS, and JavaScript are not separate chores; they are three parts of one visible experience. A strong first feature is small enough to explain and clear enough that another person can test it.

Do not start by editing componentPlan. First say the feature in one sentence: the user sees a card, presses an action, the state changes, and the page makes that change readable.

## Three Browser Layers

| Layer | Job | Evidence |
| --- | --- | --- |
| HTML | Names the content and controls | a semantic heading, text, form, or button |
| CSS | Makes the state readable | spacing, contrast, layout, and responsive rules |
| JavaScript | Changes behavior after input | a click, validation branch, or state update |

Do not treat the browser as decoration. It is where the user decides whether the product makes sense.

## What the Workspace Will Ask You To Do

When the practice area opens, use it like a user-flow checklist:

1. Name the visible content or control the user sees first.
2. Name the state that changes after the user acts.
3. Name the CSS evidence that makes the state readable.
4. Name the JavaScript behavior that changes the page.
5. Explain how another person would know the feature worked.

You are not expected to build a complete website in this first room. The goal is to describe one feature clearly enough that HTML, CSS, and JavaScript each have a job.

## Your First Ten Minutes

Use this order:

1. Read the user-flow idea without the editor.
2. Point to the HTML, CSS, and JavaScript jobs in the table.
3. Open practice and run the starter unchanged.
4. Match each starter property to something a user can see or do.
5. Change only one field after the original plan makes sense.

## Before Editing the Starter Code

Run the starter unchanged and read \`componentPlan\` as a plain checklist:

- \`html\` names the content and controls.
- \`cssState\` explains how the page communicates state.
- \`behavior\` names what changes after input.
- \`states\` lists what the user might see while the feature works.

After those pieces make sense, change one field or add one visible state. Do not add framework words yet. You are ready when the work shows a clear user flow, not a large app.

## Component Plan

~~~js
const componentPlan = {
  html: "card with heading, status text, and action button",
  cssState: "success status uses clear color, spacing, and readable contrast",
  behavior: "clicking the button changes the card from idle to success",
  states: ["idle", "loading", "error", "success"],
};

console.log(componentPlan);
~~~

Read the object as a planning model. It separates what the page says, how the state looks, and what happens after a user action.

## Practice

Write a component plan for one small browser feature. Include HTML structure, CSS state, JavaScript behavior, and the states the user can see.

## Explain It Back

Explain why a button without a visible state change can leave the user unsure that anything happened.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is JavaScript responsible for in this room's feature plan?",
          options: ["Changing behavior after user input", "Replacing semantic HTML", "Hiding all states", "Storing production secrets"],
          correct: 0,
          explanation: "JavaScript handles behavior and state changes after user actions.",
        },
      ],
    },
    {
      slug: "react-frontend",
      title: "React Frontend Development",
      hours: "10-12",
      sortOrder: 2,
      content: `# React Frontend Development

React is one part of the product flow. It turns data and state into reusable interface pieces.

## Start Here: Component Contract Before Hooks

Before hooks or JSX syntax, name the component contract: data in, local state, user event, render output, and empty state.

## How to Use This Room Screen

Read this room as a component planning path:

- Learn: understand React as a way to turn props and state into visible output.
- Inspect: connect each React term to a concrete question.
- Build: write one React view plan, not a whole app.
- Prove: explain how the component behaves when data is missing, ready, or complete.

"Practice after the lesson" means you should understand the component contract before using the JavaScript object.

## One Clean Pass Through This Room

Before the workspace, read React as a component-contract-before-hooks chain:

1. The component name says what piece of the interface is being planned.
2. The props say what data enters from outside.
3. The local state says what can change inside the component.
4. The user events say what a person can do.
5. The render states and accessibility rule say what appears for empty, ready, and completed work.

That chain keeps React from becoming hook vocabulary. A useful component plan explains the visible behavior before implementation details.

Do not start with hooks. First say the React view plan in one sentence: component, props, local state, user events, render states, and accessibility rule.

## What the Workspace Will Ask You To Do

The workspace will ask for one React view plan:

1. Name the component.
2. Name the props coming from outside.
3. Name the local state.
4. Name the user events.
5. Name render states and one accessibility rule.

You are not expected to build the UI yet. The goal is to make the component reviewable before implementation.

## Your First Ten Minutes

Use this order:

1. Read props, state, events, and render output in plain language.
2. Match each term to the view plan fields.
3. Run the starter unchanged.
4. Change one field in the view plan.
5. Explain what the user would see after the event.

## Before Writing the React View Plan

Do not start with hooks. You are ready when the work shows a React view plan that names component, props, state, events, render states, and accessibility.

## Component Thinking

| Question | React term |
| --- | --- |
| What data comes in? | props |
| What can change here? | state |
| What does the user do? | event |
| What should appear? | render output |
| What happens when data is missing? | empty state |

A React component should be small enough that a learner can name its inputs, state, event, and output before writing code.

## View Plan

~~~js
const reactViewPlan = {
  component: "LessonStatusCard",
  props: ["title", "progress", "onStart"],
  state: ["expanded"],
  events: ["click start", "toggle details"],
  renderStates: ["empty", "ready", "complete"],
  accessibility: "button label names the action",
};

console.log(reactViewPlan);
~~~

The plan is not a full app. It is the shape of a component a teammate could review before implementation.

## Practice

Write a React view plan that names the component, props, state, events, render states, and one accessibility rule.

## Explain It Back

Explain how props and state are different in a component you would build for a course dashboard.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Which item usually comes from a parent component?",
          options: ["A prop", "A database migration", "A server port", "A rollback image"],
          correct: 0,
          explanation: "Props are values passed into a component from the outside.",
        },
      ],
    },
    {
      slug: "nodejs-backend",
      title: "Node.js & Express Backend",
      hours: "10-12",
      sortOrder: 3,
      content: `# Node.js & Express Backend

An API route is a contract. It tells the frontend what request is accepted and what response comes back.

## Start Here: Request Contract Before Server Code

Before Express code, name the route contract. The frontend needs to know the method, path, validation rule, success response, error response, and response shape.

## How to Use This Room Screen

Read this room as a frontend-backend agreement:

- Learn: understand an API route as a promise between caller and server.
- Inspect: connect method, path, validation, status, and response shape to visible behavior.
- Build: write one API contract before implementation.
- Prove: explain how the frontend can handle success and failure without guessing.

"Practice after the lesson" means the contract comes before route code. If the object looks technical, read one field at a time and ask what the client can rely on.

## One Clean Pass Through This Room

Before the workspace, read backend work as a request-contract-before-server-code chain:

1. The method and path say what request the frontend can make.
2. The validation rule says what input is allowed.
3. The success status says what a completed request returns.
4. The error status says how rejected input is reported.
5. The response shape says what fields the frontend can rely on.

That chain keeps route code tied to user-visible behavior. A route contract is useful when both success and failure are predictable for the client.

Do not start with server setup. First say the API contract in one sentence: method, path, validation rule, success status, error status, and response shape.

## What the Workspace Will Ask You To Do

The workspace will ask for one API contract:

1. Name the method.
2. Name the path.
3. Name the validation rule.
4. Name success and error statuses.
5. Name the response shape.

You are not wiring a production server yet. The goal is to make request and response behavior explicit.

## Your First Ten Minutes

Use this order:

1. Read method and path before the example.
2. Decide what input should be rejected.
3. Run the starter unchanged.
4. Change one contract field.
5. Explain how the frontend should react to the error status.

## Before Writing the API Contract

Do not start with server setup. You are ready when the work shows an API contract that protects input and tells the frontend what response to expect.

## Route Contract

| Part | Plain meaning |
| --- | --- |
| Method | The action, such as GET or POST |
| Path | The address, such as /api/lessons |
| Validation | The rule for acceptable input |
| Success status | The truth code for a working request |
| Error status | The truth code for a rejected request |
| Response shape | The fields the client can rely on |

Express is useful because it makes this contract explicit in server code.

## API Plan

~~~js
const apiContract = {
  method: "POST",
  path: "/api/lessons",
  inputValidation: "title is required before saving",
  successStatus: 201,
  errorStatus: 400,
  responseShape: ["id", "title", "createdAt"],
};

console.log(apiContract);
~~~

Before implementation, a route contract helps the frontend and backend agree on behavior.

## Practice

Write an API route contract for a small feature. Include method, path, validation, success status, error status, and response shape.

## Explain It Back

Explain why returning the wrong status code can make frontend error handling harder.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should input validation do?",
          options: ["Reject bad input before saving", "Hide every server error", "Replace response fields", "Skip status codes"],
          correct: 0,
          explanation: "Validation protects the route by rejecting input that does not match the contract.",
        },
      ],
    },
    {
      slug: "databases-prisma",
      title: "Databases & Prisma ORM",
      hours: "8-10",
      sortOrder: 4,
      content: `# Databases & Prisma ORM

A database model is a promise about the information your application can safely store and retrieve.

## Start Here: Query Purpose Before Schema

Before ORM syntax, name the user-facing question the database must answer. The model should support that query without making unsafe migration promises.

## How to Use This Room Screen

Read this room as a data-design path:

- Learn: connect models, fields, relations, queries, and migrations to product behavior.
- Inspect: decide what each schema field proves.
- Build: write one data plan before Prisma code.
- Prove: explain how the query answers a real user need and how the migration stays safe.

"Practice after the lesson" means you should understand the data promise before using the JavaScript object.

## One Clean Pass Through This Room

Before the workspace, read database work as a query-purpose-before-schema chain:

1. The query purpose says what user-facing question the app must answer.
2. The model name says what record type exists.
3. The required fields say what data must be present.
4. The relation says how this record connects to the rest of the app.
5. The migration safety and seed data say how to change the schema without breaking review.

That chain keeps schemas connected to product behavior. Prisma syntax helps only after the model supports a clear query and safe migration path.

Do not start with ORM syntax. First say the data plan in one sentence: query purpose, model, required fields, relation, migration safety, and seed data.

## What the Workspace Will Ask You To Do

The workspace will ask for one data plan:

1. Name the model.
2. Name required fields.
3. Name one relation.
4. Name the query purpose.
5. Name migration safety and seed data.

You are not expected to run a migration yet. The goal is to make the schema decision reviewable.

## Your First Ten Minutes

Use this order:

1. Read the user-facing question first.
2. Match fields and relations to the query purpose.
3. Run the starter unchanged.
4. Change one data-plan field.
5. Explain what could break if the migration is unsafe.

## Before Writing the Data Plan

Do not start with ORM syntax. You are ready when the work shows a data plan that connects model, fields, relation, query purpose, migration safety, and seed data.

## Data Model Questions

| Question | Why it matters |
| --- | --- |
| What entity exists? | Names the record type |
| Which fields are required? | Prevents incomplete data |
| What relates to what? | Connects users, lessons, orders, or notes |
| Which query proves value? | Shows the app can answer a real question |
| How does migration stay safe? | Reduces data-loss risk |

Prisma gives code a typed way to talk to the database, but the model still needs product judgment.

## Data Plan

~~~js
const dataPlan = {
  model: "Lesson",
  fields: ["id", "title", "status", "createdAt"],
  relation: "Lesson belongs to one Course",
  queryPurpose: "list published lessons in course order",
  migrationSafety: "add fields before requiring them",
  seedData: "include one published lesson for review",
};

console.log(dataPlan);
~~~

The point is to connect schema choices to a user-facing question the app must answer.

## Practice

Write a data plan with model name, fields, relation, query purpose, migration safety, and seed data.

## Explain It Back

Explain why adding a required database field without a migration plan can break an existing app.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why should a query purpose be named before building a model?",
          options: ["It ties the schema to a user-facing question", "It removes the need for fields", "It replaces migrations", "It hides relations"],
          correct: 0,
          explanation: "A query purpose keeps the model connected to behavior the application needs.",
        },
      ],
    },
    {
      slug: "deployment-devops",
      title: "Deployment & DevOps Basics",
      hours: "6-8",
      sortOrder: 5,
      content: `# Deployment & DevOps Basics

Deployment is a repeatable release path. A full-stack developer should know what proves a release is ready, healthy, and reversible.

## Start Here: Health Evidence Before Release

Before release commands, name the proof chain: build, configuration, health route, rollback, logs, and owner.

## How to Use This Room Screen

Read this room as a release readiness path:

- Learn: understand deployment as evidence, not a status label.
- Inspect: connect each evidence field to a question the release must answer.
- Build: write one release plan before running commands.
- Prove: explain how a user-facing route and rollback path protect the release.

"Practice after the lesson" means the release proof comes before command syntax. A successful build is only one part of the release story.

## One Clean Pass Through This Room

Before the workspace, read deployment as a health-evidence-before-release chain:

1. The build command says whether the app can compile.
2. The environment rule says how configuration is supplied safely.
3. The health route says what user-facing route proves the app answers.
4. The rollback step says how to recover if health fails.
5. The log check and owner say who inspects the release after it moves.

That chain keeps deployment from becoming a status label. A release is safer when readiness, health, recovery, and ownership are visible before commands.

Do not start by running release commands. First say the release plan in one sentence: build command, environment rule, health route, rollback step, log check, and owner.

## What the Workspace Will Ask You To Do

The workspace will ask for one release plan:

1. Name the build command.
2. Name the environment rule.
3. Name the health route.
4. Name the rollback step.
5. Name the log check and owner.

You are not expected to operate production yet. The goal is to make release readiness and recovery visible.

## Your First Ten Minutes

Use this order:

1. Read the proof chain before the example.
2. Decide what route proves a user can reach the app.
3. Run the starter unchanged.
4. Change one release-plan field.
5. Explain what should happen if health fails.

## Before Writing the Release Plan

Do not stop at "the build passed." You are ready when the work shows a release plan with build, configuration, health, rollback, logs, and ownership.

## Release Evidence

| Evidence | Question answered |
| --- | --- |
| Build command | Can the app compile? |
| Environment rule | Are configuration values supplied safely? |
| Health route | Can a user-facing route answer? |
| Rollback step | How do we recover if health fails? |
| Log check | What changed after release? |
| Owner | Who responds when the release needs action? |

You do not need to be a platform specialist to write a clear release card.

## Release Plan

~~~js
const releasePlan = {
  buildCommand: "npm run build",
  environmentRule: "required variables are set outside source code",
  healthRoute: "/health",
  rollbackStep: "restore the previous release if health fails",
  logCheck: "inspect application errors after deploy",
  owner: "full-stack developer on release duty",
};

console.log(releasePlan);
~~~

This card connects build, configuration, health, rollback, logs, and ownership.

Keep the proof chain short enough that another developer can repeat it.

## Practice

Write a release plan with build command, environment rule, health route, rollback step, log check, and owner.

## Explain It Back

Explain why a successful build is not enough evidence that a deployed app is healthy.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should a rollback step explain?",
          options: ["How to recover when health fails", "How to delete logs", "How to skip builds", "How to hide configuration"],
          correct: 0,
          explanation: "Rollback planning names the recovery path when the release does not stay healthy.",
        },
      ],
    },
    {
      slug: "projects-portfolio",
      title: "Capstone Projects & Portfolio",
      hours: "12-14",
      sortOrder: 6,
      content: `# Capstone Projects & Portfolio

A portfolio project proves a full loop: user need, frontend state, backend route, stored data, deployment evidence, and an improvement plan.

## Start Here: Behavior Evidence Before Portfolio Polish

Before screenshots or polish, name the behavior proof. A reviewer needs to see the problem, user flow, frontend state, API endpoint, data model, metric, and iteration plan.

## How to Use This Room Screen

Read this room as a project evidence path:

- Learn: understand a portfolio project as a full product loop.
- Inspect: connect each proof item to behavior a reviewer can verify.
- Build: write one portfolio proof card.
- Prove: explain how the project demonstrates working behavior, not only appearance.

"Practice after the lesson" means the proof card comes before portfolio polish. Screenshots help only after the behavior is clear.

## One Clean Pass Through This Room

Before the workspace, read a portfolio project as a behavior-evidence-before-polish chain:

1. The problem says why the project exists.
2. The user flow says what task a person can complete.
3. The frontend states say how the interface responds.
4. The API endpoint and data model say how work is performed and remembered.
5. The proof metric and iteration plan say how the project will be judged and improved.

That chain keeps the portfolio focused on working behavior. Polish matters after a reviewer can see what the project does and how you know it works.

Do not start with screenshots or visual polish. First say the portfolio proof card in one sentence: problem, user flow, frontend states, API endpoint, data model, proof metric, and iteration plan.

## What the Workspace Will Ask You To Do

The workspace will ask for one portfolio proof card:

1. Name the problem.
2. Name the user flow.
3. Name frontend states.
4. Name the API endpoint and data model.
5. Name the proof metric and iteration plan.

You are not pasting a whole repository. The goal is to show decisions and evidence a reviewer can understand quickly.

## Your First Ten Minutes

Use this order:

1. Read the problem and user flow first.
2. Match frontend, API, and data proof to the user task.
3. Run the starter unchanged.
4. Change one proof-card field.
5. Explain what behavior proves the project works.

## Before Writing the Portfolio Proof Card

Do not start with visual polish. You are ready when the work shows a proof card that connects problem, user flow, frontend state, API, data, metric, and next iteration.

## Portfolio Proof Loop

| Proof item | What it shows |
| --- | --- |
| Problem | The project has a reason to exist |
| User flow | A person can complete a task |
| Frontend state | The interface responds clearly |
| API endpoint | The app can perform work on the server |
| Data model | The app remembers useful information |
| Proof metric | You can tell whether it works |
| Iteration plan | You know what to improve next |

The goal is not to paste every file into a portfolio. The goal is to show decisions and evidence.

## Project Proof Card

~~~js
const portfolioProof = {
  problem: "learners need to save lesson notes",
  userFlow: "open lesson, write note, save, return later",
  frontendState: ["editing", "saving", "saved", "error"],
  apiEndpoint: "POST /api/notes",
  dataModel: "Note belongs to User and Course",
  proofMetric: "saved note appears after reload",
  iterationPlan: "add search after save flow is reliable",
};

console.log(portfolioProof);
~~~

This is the kind of proof a reviewer can understand quickly.

## Practice

Write a portfolio proof card that names the problem, user flow, frontend state, API endpoint, data model, proof metric, and iteration plan.

## Explain It Back

Explain why a portfolio project should show evidence of behavior instead of only screenshots.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What does a proof metric do?",
          options: ["Shows how you know the feature works", "Replaces the user flow", "Hides the API endpoint", "Deletes the data model"],
          correct: 0,
          explanation: "A proof metric makes the project evidence specific and reviewable.",
        },
      ],
    },
  ],
};
