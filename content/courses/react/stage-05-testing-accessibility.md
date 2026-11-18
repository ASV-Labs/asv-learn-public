# Testing & Accessibility

## Why this lesson exists

A frontend feature is not done when it **looks** correct on your laptop. It needs evidence that a user can **operate** it — including with a keyboard — and that important behavior stays protected when code changes.

This stage teaches you to write a **quality plan**: user journey, behavior checks, accessibility requirements, keyboard path, assertions, and bug risk. You will express assertions as plain JavaScript functions locally (no test runner required yet). The plan comes before test syntax.

## Reminder: where you work

```bash
cd ~/asv-learn-react
```

Windows (PowerShell):

```powershell
Set-Location "$HOME\asv-learn-react"
```

Create `quality_plan.js`.

## Quality evidence

| Evidence | What it proves |
| --- | --- |
| User journey | The feature supports a real task |
| Behavior checks | Important outcomes stay working |
| Accessibility | More users can perceive and operate the UI |
| Keyboard path | Task works without a mouse |
| Assertions | Expected results are specific |
| Bug risk | Tests target likely failures |

Accessibility is not decoration. Labels help screen readers **and** give tests stable selectors.

## Behavior-first testing mindset

Test what a **user can observe**: visible text, enabled/disabled buttons, error messages. Avoid locking tests to internal implementation (private state variable names, hook call order) that breaks during harmless refactors.

| Prefer | Avoid |
| --- | --- |
| "Save button shows Note saved" | "useState called twice" |
| "Error keeps draft text visible" | "fetch mock third argument" |
| "Title field has accessible name Notes" | "div.className includes flex" |

When you later adopt Vitest + React Testing Library or Playwright, the quality plan you write here becomes the test list you implement.

## Keyboard path example

For "save a note": Tab to textarea → type → Tab to Save → Enter or Space to activate. If that path is impossible, the feature is not finished for many users.

## Start here: operable before pretty

Say the contract: *a learner opens a lesson, saves a note, sees confirmation, and keeps typed text if save fails — all reachable by keyboard.*

Do not start with assertion syntax. Name the journey and the failure that would hurt users most.

## Common beginner mistakes

- Testing implementation details (internal state variable names) instead of visible behavior
- Skipping labels because "it looks fine"
- Assertions like "renders correctly" with no specific expected text
- No test for error path (only happy path)
- Expecting ASV Learn to run tests inside the lesson page

## Your local task

### Step 1 — Create the starter

Create `quality_plan.js`:

```js
// quality_plan.js — Stage 05: Testing & Accessibility

const qualityPlan = {
  userJourney: "learner opens lesson and saves a note",
  tests: [
    "renders lesson title",
    "saves note after submit",
    "shows error on failed save",
  ],
  accessibilityChecks: [
    "button has accessible name",
    "textarea has label",
    "status message is readable",
  ],
  keyboardPath: "tab to textarea, type note, tab to save, activate with Enter",
  assertions: ["saved message appears", "typed note remains on error"],
  bugRisk: "failed save could erase learner notes",
};

function assertContains(actual, expected, label) {
  const pass = String(actual).includes(expected);
  console.log(`${label}: ${pass ? "PASS" : "FAIL"} (expected "${expected}")`);
  return pass;
}

// Mock UI outputs for local assertion practice
const successView = { title: "Variables", message: "Note saved", note: "my draft" };
const errorView = { title: "Variables", message: "Save failed — try again", note: "my draft" };

console.log("Plan:", qualityPlan);
assertContains(successView.title, "Variables", "renders lesson title");
assertContains(successView.message, "saved", "saved message appears");
assertContains(errorView.note, "my draft", "typed note remains on error");
```

### Step 2 — Run

```bash
node quality_plan.js
```

All three assertions should PASS with the mock views.

### Step 3 — Fail on purpose

Change `errorView.note` to `""` and re-run. See the failure message. That is the bug risk your plan protects.

### Step 4 — Extend accessibility

Add one `accessibilityChecks` item to the plan (e.g. "focus visible on Save button") and a one-line comment on why it helps keyboard users.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| assertion | Check that output matches an expected condition |
| accessible name | Text or aria label exposed to assistive tech |
| keyboard path | Sequence of focusable controls to complete a task |
| regression | Behavior that used to work and broke after a change |
| bug risk | Likely failure mode worth testing first |

## Proof checklist

- [ ] `quality_plan.js` runs and prints plan + assertion results
- [ ] You triggered at least one intentional FAIL
- [ ] Keyboard path is written in plain language
- [ ] Bug risk ties to a specific assertion
- [ ] You added one accessibility check with rationale

When those are true, continue to **Capstone: Four React Projects**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
