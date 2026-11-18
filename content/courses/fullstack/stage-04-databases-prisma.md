# Databases & Prisma ORM

## Why this lesson exists

A database is a promise about information your application can **safely store and retrieve** after the request finishes. Prisma is one way to express that promise in typed JavaScript. Before ORM syntax, you need the product question: *what user-facing query must this model support, and what happens when data is missing?*

In this stage you will write a **data plan** and simulate a tiny in-memory "table" in Node.js. You are not running PostgreSQL or Prisma CLI yet. You are proving you can name models, fields, relations, query purpose, and safe migration habits before tools hide the design.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit local files → run with Node → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-fullstack/stage-04
cd ~/asv-learn-fullstack/stage-04
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-fullstack\stage-04"
Set-Location "$HOME\asv-learn-fullstack\stage-04"
```

You will create `data_plan.js` in that folder.

## Start here: query purpose before schema

Before tables and migrations, name the user-facing question:

| Question | Why it matters |
| --- | --- |
| What entity exists? | Names the record type — Lesson, User, Order |
| Which fields are required? | Prevents half-empty rows |
| What relates to what? | Connects lessons to courses, notes to users |
| Which query proves value? | "List published lessons in course order" |
| How does migration stay safe? | Add fields before requiring them |

Prisma helps teams keep queries typed. The model still needs product judgment.

## How to use this lesson

Read in this order:

- **Learn:** connect models, fields, relations, and queries to behavior
- **Inspect:** decide what each field proves on screen or in an API response
- **Build:** implement the query against an in-memory list
- **Prove:** show published lessons in order and explain a safe migration rule

Practice after reading means you understand the data promise before editing code. Ask: *what row does the user need, and what if zero rows match?*

## One clean pass through this lesson

Read database work as a chain:

1. The query purpose says what the app must answer for the user.
2. The model name says what record type exists.
3. Required fields say what must be present on every row.
4. The relation says how this record connects to others.
5. Migration safety and seed data say how to change schema without breaking review.

Do not start with `npx prisma init`. First say the plan: *Lesson belongs to Course; list published lessons sorted by sortOrder; add nullable fields before making them required.*

## Data plan shape

```js
const dataPlan = {
  model: "Lesson",
  fields: ["id", "title", "status", "sortOrder", "createdAt"],
  relation: "Lesson belongs to one Course",
  queryPurpose: "list published lessons in course order",
  migrationSafety: "add fields before requiring them",
  seedData: "include one published lesson for review",
};
```

## Simulating a table without Prisma

```js
const lessons = [
  { id: "1", title: "Intro", status: "draft", sortOrder: 2, courseId: "c1" },
  { id: "2", title: "Setup", status: "published", sortOrder: 1, courseId: "c1" },
  { id: "3", title: "APIs", status: "published", sortOrder: 3, courseId: "c1" },
];

function listPublishedLessons(rows, courseId) {
  return rows
    .filter((row) => row.courseId === courseId && row.status === "published")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(({ id, title, sortOrder }) => ({ id, title, sortOrder }));
}
```

This is the query purpose in code. Prisma would generate SQL; you are practicing the **design**.

## Common beginner mistakes

**Schema with no query purpose.** Tables that "might be useful someday" become hard to migrate and hard to test.

**Required fields on day one.** Adding `NOT NULL` to existing tables without a backfill breaks production data.

**Relations that do not match product language.** If the UI says "course contains lessons," the model should say that too.

**Returning every column by default.** APIs and views should return fields the client needs, not `SELECT *` habits.

## Your local task

### Step 1 — Create the starter

Create `data_plan.js`:

```js
// data_plan.js — Stage 04: Databases & Prisma ORM
// Run unchanged first, then extend the query or seed data.

const dataPlan = {
  model: "Lesson",
  fields: ["id", "title", "status", "sortOrder", "courseId", "createdAt"],
  relation: "Lesson belongs to one Course",
  queryPurpose: "list published lessons in course order",
  migrationSafety: "add fields before requiring them",
  seedData: "include one published lesson for review",
};

const lessons = [
  { id: "1", title: "Intro", status: "draft", sortOrder: 2, courseId: "c1", createdAt: "2026-01-01" },
  { id: "2", title: "Setup", status: "published", sortOrder: 1, courseId: "c1", createdAt: "2026-01-02" },
  { id: "3", title: "APIs", status: "published", sortOrder: 3, courseId: "c1", createdAt: "2026-01-03" },
  { id: "4", title: "Other course", status: "published", sortOrder: 1, courseId: "c2", createdAt: "2026-01-04" },
];

function listPublishedLessons(rows, courseId) {
  // TODO: filter by courseId and status === "published", sort by sortOrder
  return [];
}

function demo() {
  console.log("=== Data plan ===");
  console.log(dataPlan);
  console.log("\n=== Query result for course c1 ===");
  console.log(listPublishedLessons(lessons, "c1"));
}

if (require.main === module) {
  demo();
}

module.exports = { dataPlan, listPublishedLessons };
```

### Step 2 — Run unchanged

```bash
node data_plan.js
```

Confirm the query returns an empty array until you implement it.

### Step 3 — Implement the query

Return published lessons for the requested `courseId`, sorted by `sortOrder`, projecting `id`, `title`, and `sortOrder`. Expected order for `c1`: Setup, APIs.

### Step 4 — One small change you can explain

Change **one** thing after the query works. Examples:

- Add a `limit` parameter
- Include `createdAt` in the projection and explain why
- Add a seed row and describe the migration step you would run first in Prisma

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Model | Structured type representing a table or collection |
| Field | Named attribute on a record |
| Relation | How two models link (Lesson belongs to Course) |
| Migration | Controlled change to database schema |
| Seed data | Sample rows for development and review |
| Query purpose | User-facing question the schema must answer |

## Proof checklist

- [ ] `data_plan.js` exists in `~/asv-learn-fullstack/stage-04`
- [ ] Running it prints the data plan and query results
- [ ] Published lessons for `c1` appear in sortOrder
- [ ] Draft lessons and other courses are excluded
- [ ] You extended the query or seed story and re-ran
- [ ] You can explain "add fields before requiring them"

When those are true, continue to **Deployment & DevOps Basics**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
