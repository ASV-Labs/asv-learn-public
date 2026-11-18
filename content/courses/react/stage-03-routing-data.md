# Routing, Data Fetching & Forms

## Why this lesson exists

Frontend apps connect **where the user is** (routes), **what data the screen needs** (fetching), and **what the user submits** (forms). React Router and `fetch` are tools; the professional habit is mapping the **user journey** first: loading, empty, ready, error — and never losing typed work on failure.

This stage teaches you to write a **route and form plan** as a Node.js object you inspect locally. You are not wiring a production API. You are proving the journey is understandable before components exist.

## Reminder: where you work

```bash
cd ~/asv-learn-react
```

Windows (PowerShell):

```powershell
Set-Location "$HOME\asv-learn-react"
```

Create `route_form_plan.js` in that folder.

## Route-to-result journey

| Surface | Evidence to name |
| --- | --- |
| Routes | Which paths exist? |
| Loader states | loading, error, empty, ready |
| Form fields | What input does the user provide? |
| Validation | What is rejected before submit? |
| Submit action | What happens when the form is sent? |
| Error recovery | How typed input is preserved on failure |

Good frontend code tells the truth while waiting, failing, and succeeding.

## Loader states matter

Users should never stare at a blank screen wondering if anything happened.

| State | User should see |
| --- | --- |
| loading | Honest progress ("Loading lessons…") |
| error | Actionable message + retry path |
| empty | Useful next step ("No notes yet — add one") |
| ready | The actual content |

## Forms and validation

Validation protects the user **before** a request leaves the browser:

- Required fields (e.g. title cannot be empty)
- Format checks (email shape, max length)
- Disable submit while invalid or while submitting

On failed submit, **preserve typed values**. Losing notes because the network failed is a trust bug.

## Start here: journey before fetch

Say the journey in one sentence: *the user opens a lesson route, waits for data, enters a valid note, submits it, and keeps their text if the save fails.*

Do not start by copying `fetch` examples. Name routes and states first.

## Common beginner mistakes

- Fetching without loading or error UI plans
- Clearing form fields on every error
- Validation only on the server (user waits for a round trip to learn title is required)
- Routes that do not match user mental model (`/lesson-detail?id=3` vs `/lessons/3`)
- Assuming a live API exists in the lesson page (this stage uses a local mock)

## Your local task

### Step 1 — Create the starter

Create `route_form_plan.js`:

```js
// route_form_plan.js — Stage 03: Routing, Data & Forms

const routeDataPlan = {
  routes: ["/lessons", "/lessons/:id"],
  loaderStates: ["loading", "error", "empty", "ready"],
  formFields: ["title", "notes"],
  validationRule: "title is required before submit",
  submitAction: "POST /api/notes (local mock in this exercise)",
  errorState: "show retry message without losing typed notes",
};

function validateNoteForm(fields) {
  const errors = [];
  if (!fields.title || fields.title.trim() === "") {
    errors.push("title is required");
  }
  return errors;
}

function mockSubmit(fields) {
  const errors = validateNoteForm(fields);
  if (errors.length) return { ok: false, errors, fields };
  // Simulate random failure for practice
  if (fields.notes.includes("FAIL")) {
    return { ok: false, errors: ["network error"], fields };
  }
  return { ok: true, saved: fields };
}

console.log("Plan:", routeDataPlan);

const attempt = mockSubmit({ title: "", notes: "draft text" });
console.log("Invalid submit:", attempt);

const retry = mockSubmit({ title: "Module 2", notes: "variables FAIL" });
console.log("Failed save (notes preserved):", retry);
```

### Step 2 — Run unchanged

```bash
node route_form_plan.js
```

See validation catch empty title and failed save keep `fields`.

Expected shape (your text may differ):

```text
Plan: { ... }
Invalid submit: { ok: false, errors: [ 'title is required' ], fields: { ... } }
Failed save (notes preserved): { ok: false, errors: [ 'network error' ], fields: { title: 'Module 2', notes: '...' } }
```


### Step 3 — Add a loader simulator

Add a small function `describeLoader(state)` that returns user-facing copy for each loader state in the plan. Log one example per state.

### Step 4 — One change you can explain

Adjust `validationRule` (e.g. require notes min length) and update `validateNoteForm`. Re-run and confirm behavior matches the plan.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| route | URL path that selects which view to show |
| loader state | UI while data is not ready |
| controlled input | Form field value stored in state and synced to the input |
| validation | Client-side checks before submit |
| optimistic UI | Updating UI before server confirms (use carefully) |

## Proof checklist

- [ ] `route_form_plan.js` runs and prints plan + validation examples
- [ ] Empty title is rejected with errors array
- [ ] Simulated failure returns original `fields` intact
- [ ] You added loader copy for all four states
- [ ] You can explain why preserving typed notes on error matters

When those are true, continue to **State Management & Performance**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
