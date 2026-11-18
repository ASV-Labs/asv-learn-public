# Node.js & Express Backend

## Why this lesson exists

The frontend shows state. The backend **performs work** and **returns truth** the frontend can rely on. An API route is a contract: which method and path are allowed, what input is valid, what success looks like, and what error the client should handle.

In this stage you will write a small **API contract** in JavaScript and implement it with Node's built-in `http` module — no Express install required yet. You will send a fake request object through your handler and print status codes and JSON bodies in the terminal. That is honest local practice: prove the contract before adding framework sugar.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit local files → run with Node → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-fullstack/stage-03
cd ~/asv-learn-fullstack/stage-03
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-fullstack\stage-03"
Set-Location "$HOME\asv-learn-fullstack\stage-03"
```

You will create `api_contract.js` in that folder.

## Start here: request contract before server code

Before Express routes or middleware stacks, name the contract:

| Part | Plain meaning |
| --- | --- |
| **Method** | The action — GET reads, POST creates |
| **Path** | The address — `/api/lessons` |
| **Validation** | Rule for acceptable input |
| **Success status** | Truth code when the work succeeded — often 201 for create |
| **Error status** | Truth code when input is rejected — often 400 |
| **Response shape** | Fields the frontend can rely on |

Express is popular because it makes this contract explicit. Your job is to understand the contract first.

## How to use this lesson

Read in this order:

- **Learn:** understand a route as a promise between caller and server
- **Inspect:** trace method, path, validation, status, and body for one request
- **Build:** implement the contract in a plain handler function
- **Prove:** show success and failure responses a frontend could branch on

Practice after reading means the contract comes before route code. Read one field at a time and ask: *what should the client do when this status appears?*

## One clean pass through this lesson

Read backend work as a chain:

1. The client sends a method, path, and optional body.
2. The server checks whether the method and path match a known route.
3. Validation runs before any pretend "save" happens.
4. Good input returns success status and a predictable JSON shape.
5. Bad input returns an error status the frontend can display.

Do not start with `npm install express`. First say the contract: *POST /api/lessons requires title; success is 201 with id, title, createdAt; missing title is 400.*

## Route contract example

```js
const apiContract = {
  method: "POST",
  path: "/api/lessons",
  inputValidation: "title is required before saving",
  successStatus: 201,
  errorStatus: 400,
  responseShape: ["id", "title", "createdAt"],
};
```

The contract is what both teams review before anyone writes React forms or database code.

## Handler shape in plain Node

```js
function handleCreateLesson(request) {
  if (request.method !== "POST" || request.path !== "/api/lessons") {
    return { status: 404, body: { error: "not found" } };
  }
  const title = request.body?.title?.trim();
  if (!title) {
    return { status: 400, body: { error: "title is required" } };
  }
  return {
    status: 201,
    body: {
      id: "lesson-001",
      title,
      createdAt: new Date().toISOString(),
    },
  };
}
```

Notice the order: route match → validate → success. Returning 201 with a fake id is fine for learning. Returning 200 for a create or 500 for bad input is not fine — status codes communicate meaning.

## Common beginner mistakes

**Skipping validation.** If the handler saves empty titles, the frontend will inherit garbage data.

**Wrong status codes.** Treating every failure as 500 hides whether the client sent bad input (400) or the server broke (500).

**Leaking stack traces in JSON.** Error bodies should be helpful and safe, not raw exception dumps.

**Letting the route file become the whole app.** Routing chooses the handler. Business rules live in functions you can test.

## Your local task

### Step 1 — Create the starter

Create `api_contract.js`:

```js
// api_contract.js — Stage 03: Node.js & Express Backend
// Run unchanged first, then tighten validation or add one route.

const apiContract = {
  method: "POST",
  path: "/api/lessons",
  inputValidation: "title is required before saving",
  successStatus: 201,
  errorStatus: 400,
  responseShape: ["id", "title", "createdAt"],
};

function handleCreateLesson(request) {
  if (request.method !== "POST" || request.path !== "/api/lessons") {
    return { status: 404, body: { error: "not found" } };
  }

  const title = request.body?.title?.trim();
  // TODO: return apiContract.errorStatus when title is missing
  // TODO: return apiContract.successStatus with id, title, createdAt when valid

  return { status: 500, body: { error: "not implemented" } };
}

function demo() {
  console.log("=== API contract ===");
  console.log(apiContract);

  const samples = [
    { method: "POST", path: "/api/lessons", body: { title: "React basics" } },
    { method: "POST", path: "/api/lessons", body: { title: "   " } },
    { method: "GET", path: "/api/lessons", body: {} },
  ];

  console.log("\n=== Handler results ===");
  for (const req of samples) {
    const result = handleCreateLesson(req);
    console.log(req.method, req.path, req.body, "->", result.status, result.body);
  }
}

if (require.main === module) {
  demo();
}

module.exports = { apiContract, handleCreateLesson };
```

### Step 2 — Run unchanged

```bash
node api_contract.js
```

Confirm the stub returns `500 not implemented` for now.

### Step 3 — Implement the TODOs

Return **400** when `title` is missing or blank. Return **201** with `id`, `title`, and `createdAt` when valid. Re-run until:

- Valid POST → 201 with the three fields
- Blank title → 400
- GET on the same path → 404

### Step 4 — One small change you can explain

After the contract works, change **one** thing. Examples:

- Reject titles shorter than three characters
- Add `GET /api/lessons/:id` that returns 404 for unknown ids
- Log a one-line audit message on successful create

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| API | Interface programs use to request work from a server |
| Route | Method + path pair handled by one function |
| Request body | JSON data the client sends on POST or PUT |
| Status code | Number that tells the client what happened |
| Validation | Checking input before performing work |
| Contract | Shared agreement on methods, paths, and responses |

## Proof checklist

- [ ] `api_contract.js` exists in `~/asv-learn-fullstack/stage-03`
- [ ] Running it prints the contract and handler results
- [ ] Valid POST returns 201 with id, title, createdAt
- [ ] Missing title returns 400, wrong method/path returns 404
- [ ] You added one validation or route improvement and re-ran
- [ ] You can explain why status codes matter to frontend error handling

When those are true, continue to **Databases & Prisma ORM**.

## ASV Learn house notes

Practice runs on your computer with Node.js: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
