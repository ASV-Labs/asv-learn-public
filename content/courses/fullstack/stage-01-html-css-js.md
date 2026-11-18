# HTML, CSS & JavaScript Foundations

## Why this lesson exists

Full-stack development is a chain of decisions that start in the browser. Before React, Express, or a database enter the picture, you need to read a small feature as **structure**, **presentation**, and **behavior** working together.

In this stage you will build a tiny **status card** on your computer: HTML names the content and controls, CSS makes states readable, and JavaScript changes what the user sees after a click. You are not building a production app yet. You are learning the rhythm every later layer depends on: **name the user flow → edit local files → open in a browser or run a small Node script → prove the state change is visible**.

There is no in-lesson code box on this platform yet. Same rhythm as Python Zero: **read concept → create/edit local files → run → one small change you can explain → checklist**.

## Reminder: where you work

Create a dedicated folder for this course:

```bash
mkdir -p ~/asv-learn-fullstack/stage-01
cd ~/asv-learn-fullstack/stage-01
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-fullstack\stage-01"
Set-Location "$HOME\asv-learn-fullstack\stage-01"
```

You will create `index.html`, `styles.css`, and `app.js` in that folder.

## Start here: user flow before code

At the start, do not jump into frameworks or folder scaffolding. Name what the user sees, what they can do, what state changes, and how another person would know the feature worked.

For a status card, read the flow as one sentence: *the user sees a card with a heading and button, clicks the button, the card moves from idle to success, and the page makes that change obvious with text and color.*

### Three browser layers

| Layer | Job | Evidence on the page |
| --- | --- | --- |
| **HTML** | Names content and controls | heading, status text, button |
| **CSS** | Makes state readable | spacing, contrast, success color |
| **JavaScript** | Changes behavior after input | click handler updates status |

HTML is not decoration. CSS is not paint for its own sake. JavaScript is not magic. Together they answer: *what is on the page, what changed, and can the user tell?*

## How to use this lesson

Read in this order:

- **Learn:** understand the feature as structure, readable state, and behavior
- **Inspect:** point to which HTML element, CSS class, and JS line owns each part of the flow
- **Build:** complete the starter files — not a whole website
- **Prove:** explain how a tester would know idle became success

Practice after reading means you should understand the user flow before editing files. If the code looks like a wall, read one element or one function at a time and ask: *what would the user see or do here?*

## One clean pass through this lesson

Before the editor, read the feature as a chain:

1. The user sees a card with a heading, status line, and action button.
2. The page starts in an **idle** state the user can read.
3. The user clicks the button.
4. JavaScript updates the status text and CSS class.
5. The page shows **success** clearly enough that another person could test it without guessing.

That chain is the lesson. Frameworks come later. A strong first feature is small enough to explain and clear enough to demo in thirty seconds.

## Planning before typing: component plan

Many teams sketch a plan object before writing markup. You can do the same in Node:

```js
const componentPlan = {
  html: "card with heading, status text, and action button",
  cssState: "success uses green text and clear spacing",
  behavior: "clicking the button changes idle to success",
  states: ["idle", "success"],
};
```

Run a planning-only check with Node if you want:

```bash
node -e 'console.log({ html: "status card", states: ["idle", "success"] })'
```

The plan is not the app. It is the checklist your HTML, CSS, and JS should satisfy.

## Reading the starter shape

Your HTML should expose three things: a title, a status element the script can update, and a button the script can listen to.

Your CSS should include at least two visual states — for example `.idle` and `.success` — so the change is not only in JavaScript memory.

Your JavaScript should:

1. Find the status element and button in the document
2. Listen for a click
3. Update text and class when the user acts

## Common beginner mistakes

**A button with no visible state change.** If the click runs but the page looks the same, the user cannot tell anything happened. Fix the status text or CSS class, not just the console.

**Putting all logic inline in HTML.** `onclick="..."` on every element gets hard to read fast. A small `app.js` file is easier to test and explain.

**Using IDs everywhere.** One status element and one button is fine with IDs. Larger pages need classes and consistent naming.

**Forgetting semantic structure.** A real `<button>` is keyboard-accessible. A `<div>` styled like a button is not, unless you add a lot of extra work.

## Your local task

### Step 1 — Create the HTML starter

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Status Card — Stage 01</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main class="card idle" id="card">
      <h1>Lesson progress</h1>
      <p id="status">Status: idle</p>
      <button id="action" type="button">Mark complete</button>
    </main>
    <script src="app.js"></script>
  </body>
</html>
```

### Step 2 — Create the CSS starter

Create `styles.css`:

```css
.card {
  max-width: 320px;
  margin: 2rem auto;
  padding: 1.25rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
}

.idle #status {
  color: #555;
}

.success #status {
  color: #0a7a2f;
  font-weight: 600;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}
```

### Step 3 — Create the JavaScript starter

Create `app.js`:

```js
// app.js — Stage 01: HTML, CSS & JavaScript Foundations
// TODO: on button click, change status text and card class to success.

const statusEl = document.getElementById("status");
const cardEl = document.getElementById("card");
const actionBtn = document.getElementById("action");

// TODO: add a click listener that sets status to "Status: success"
// and adds the "success" class to the card (remove "idle" if you prefer one class).
```

Fill in the TODO. A finished version might look like:

```js
actionBtn.addEventListener("click", () => {
  statusEl.textContent = "Status: success";
  cardEl.classList.remove("idle");
  cardEl.classList.add("success");
});
```

### Step 4 — Open and test

Open the file in a browser:

```bash
open index.html
```

On Linux, try `xdg-open index.html`. On Windows, double-click the file in Explorer or run `start index.html`.

Click **Mark complete**. Confirm the text and color change.

### Step 5 — One small change you can explain

Change **one** thing after the original flow works. Examples:

- Add an **error** state with a different color
- Disable the button after success
- Update the heading text when the state changes

Save, refresh the browser, and confirm the new behavior.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| HTML | Structure and meaning of page content |
| CSS | Rules that control layout, color, and readability |
| JavaScript | Code that runs in the browser and responds to events |
| State | What the user sees now (idle, success, error) |
| Event listener | Function that runs when the user clicks or types |
| DOM | The live tree of elements the browser builds from HTML |

## Proof checklist

- [ ] `index.html`, `styles.css`, and `app.js` exist in `~/asv-learn-fullstack/stage-01`
- [ ] Opening `index.html` shows a card with heading, status, and button
- [ ] Clicking the button changes visible status text
- [ ] CSS makes success visually distinct from idle
- [ ] You changed one behavior, refreshed, and saw the difference
- [ ] You can explain which layer owns structure, presentation, and behavior

When those are true, continue to **React Frontend Development**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal (or open HTML in your browser). Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
