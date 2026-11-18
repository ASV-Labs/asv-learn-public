export const PYTHON_FULL_STACK_COURSE = {
  slug: "python-full",
  title: "Python Full Stack",
  description:
    "Build Python web applications from request handling through APIs, databases, authentication, testing, and deployment.",
  icon: "PY",
  difficulty: "Intermediate",
  hours: "50-60",
  topics: ["Python", "HTTP", "Django", "FastAPI", "Databases", "Deployment"],
  certBadges: ["Python Developer"],
  stages: [
    {
      slug: "python-web-fundamentals",
      title: "Python Web Fundamentals",
      hours: "6-8",
      sortOrder: 1,
      content: `# Python Web Fundamentals

Before you build a Django site or a FastAPI API, learn the basic web loop:

1. A browser or app sends a request.
2. A server receives it.
3. Python code decides what to do.
4. The server sends a response back.

That loop is the foundation. Frameworks make it easier, but they do not replace it.

This room is not asking you to assemble a full project yet. The first skill is simpler: look at a request, identify the route, and predict the response.

## Start Here: No Code Yet

Before the workspace opens, understand the story in normal language:

- The **route** is the address the client asks for, such as \`/health\`.
- The **handler** is the Python decision point for that route.
- The **response** is the answer Python sends back.

If someone asks for \`/profile\`, the app should not guess. It should look for the profile route, choose the matching handler, and return the right answer. If someone asks for \`/missing\`, the honest answer is \`404\`.

That is web development at the beginning: receive a request, make a decision, return a response that tells the truth.

## How to Use This Room Screen

The room is split into learning pieces so you do not have to decode everything at once.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | Understand the request story before the editor adds syntax. | Say the request -> handler -> response loop out loud. |
| Inspect | Treat each branch as a route decision you can explain. | Point to the method, path, branch, status, and body for one request. |
| Build | Make one deliberate route change after the original behavior is clear. | Change one route or add one branch, not the whole app. |
| Prove | Confirm your explanation matches the code output. | Run Check Work and explain why each status happened. |

"Practice after the lesson" means exactly that: the editor is there for practice after the request story makes sense. If the code looks noisy, come back to this table and ask: what request came in, which branch answered it, and what response went back?

## One Clean Pass Through This Room

Read the whole room as one small story before you touch the editor:

1. A request arrives with a method and path.
2. Python checks whether that request matches a known route.
3. The matching branch returns a status and response body.
4. The fallback branch returns 404 when the app does not know that route.
5. Check Work proves you can explain why each response happened.

If you feel lost, return to five words: method, path, branch, status, body. Those are the moving parts in this first room.

## The Mental Model

Think of a web app as a function that receives a question and returns an answer.

For the first route in this room, read that as a sentence:

- The client asks to read \`/health\`.
- Python chooses the health handler.
- The handler answers with a small success response.

The request includes a method, a path, headers, and sometimes a body. The response includes a status code, headers, and sometimes a body.

## Read This Before the Code

When you see web code for the first time, it can look like a wall of strange names. Slow it down. A web handler is usually answering four plain questions:

1. What did the client ask for?
2. Do we recognize that route?
3. What data should we send back?
4. Which status code tells the truth about what happened?

For this lesson, a request has two pieces:

| Piece | Example | What it tells Python |
| --- | --- | --- |
| Method | GET | The client wants to read something. |
| Path | /health | The client is asking for the health route. |

The response also has two pieces:

| Piece | Example | What it tells the client |
| --- | --- | --- |
| Status | 200 | The request worked. |
| Body | {"ok": True} | The useful data being returned. |

## Walk the Request

Trace one request before looking at all the code:

| Step | What you ask | Answer |
| --- | --- | --- |
| Request | What came in? | \`GET /profile\` |
| Route check | Do we have a branch for that method and path? | Yes |
| Handler result | What should Python return? | \`200\` plus a profile dictionary |

Now trace a missing route:

| Step | What you ask | Answer |
| --- | --- | --- |
| Request | What came in? | \`GET /missing\` |
| Route check | Do we have a branch for that method and path? | No |
| Handler result | What should Python return? | \`404\` plus an error dictionary |

That is the whole lesson. The code below is just Python syntax for that decision process.

Before you run anything, check yourself:

- Can you point to the method?
- Can you point to the path?
- Can you say which branch should answer?
- Can you explain why an unknown route returns 404?

## What the Workspace Will Ask You To Do

When you open practice, do not read the editor like a mystery file. Read it like a checklist:

1. Find the function named \`handle_request\`.
2. Find the branch for \`GET\` and \`/health\`.
3. Find the branch for \`GET\` and \`/profile\`.
4. Find the fallback response for anything unknown.

You are not expected to build a web framework. You are learning how one small request moves through one small decision point.

## Your First Ten Minutes

Use this order:

1. Read the request story once without the editor.
2. Match the words method, path, branch, status, and body to the tables above.
3. Open practice and run the starter unchanged.
4. Match each printed output to the request that caused it.
5. Change only one branch after you can explain the original output.

That is enough for the first pass. Installing Django, creating a project, choosing an app server, and packaging dependencies come later.

## Before Editing the Starter Code

Run the starter once unchanged. Match each printed line to the request table above:

- \`GET /health\` should prove the app can answer a known route.
- \`GET /profile\` should prove a different route can return different data.
- \`GET /missing\` should prove the fallback branch tells the truth with \`404\`.

After those three outputs make sense, change one route or add one branch. The goal is not speed. The goal is to explain why each response happened.

## A Tiny Python Version

This is not Django or FastAPI yet. It is a small model of the idea.

~~~python
# The client sends two pieces into this tiny handler:
# method tells us the action, and path tells us the route.
def handle_request(method, path):
    if method == "GET" and path == "/health":
        return 200, {"ok": True}

    if method == "GET" and path == "/profile":
        return 200, {"name": "Ada", "role": "developer"}

    # Anything that did not match a known route gets an honest not-found response.
    return 404, {"error": "not found"}


for method, path in [("GET", "/health"), ("GET", "/profile"), ("GET", "/missing")]:
    status, body = handle_request(method, path)
    print(status, body)
~~~

The important part is not the exact syntax. The important part is the shape:

- Match the request.
- Choose the handler.
- Return a response.
- Use the status code to explain what happened.

## Read the Code One Branch at a Time

Start with the first branch:

~~~python
if method == "GET" and path == "/health":
    return 200, {"ok": True}
~~~

This says: if the client is reading the health route, answer with success and a tiny health object.

Now the second branch:

~~~python
if method == "GET" and path == "/profile":
    return 200, {"name": "Ada", "role": "developer"}
~~~

This says: if the client is reading the profile route, answer with profile data.

Everything else falls through to the final return:

~~~python
return 404, {"error": "not found"}
~~~

This is not a failure of Python. It is the handler telling the truth: this route was not found.

## Status Codes You Actually Need First

Start with these:

| Code | Meaning | Use it when |
| --- | --- | --- |
| 200 | OK | The request worked. |
| 201 | Created | A new record was created. |
| 400 | Bad Request | The request was malformed or missing required data. |
| 401 | Unauthorized | The user is not signed in. |
| 403 | Forbidden | The user is signed in but not allowed. |
| 404 | Not Found | The resource does not exist. |
| 500 | Server Error | Your code or infrastructure failed. |

## Where Frameworks Fit

Django and FastAPI are not magic. In this first room, treat a framework as a bridge between the outside request and your Python decision.

For now, remember this:

- The client sends a method and path.
- The framework carries those details into Python.
- Your handler makes the decision.
- The framework carries the status and body back out.

Later rooms can name the deeper connector standards. The first job is simpler: follow the request into Python and follow the response back out.

## What Comes Later

Project packaging, app servers, reverse proxies, and production config matter later. They are not the first thing to memorize. First, be able to trace this sentence:

"The browser asked for a route, Python matched that route, Python returned a response, and the browser displayed the result."

## Practice

Use the workspace to run the tiny handler example.

1. Run the starter code once.
2. Confirm that /health and /profile return 200.
3. Confirm that /missing returns 404.
4. Change or add one route.
5. Run the checks.
6. Explain why one request returns 200 while another returns 404.

## Explain It Back

In your own words, explain the request -> Python handler -> response loop to a beginner.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the main job of a Python web handler?",
          options: [
            "Receive a request and return a response",
            "Write unrelated setup steps",
            "Replace the browser",
            "Store every secret in source code",
          ],
          correct: 0,
          explanation:
            "A handler receives request information, decides what should happen, and returns a response.",
        },
        {
          type: "multiple_choice",
          question: "What does a 404 response mean?",
          options: [
            "The user is signed in",
            "The server found the resource",
            "The requested resource was not found",
            "The request created a new record",
          ],
          correct: 2,
          explanation:
            "404 means the requested resource or route does not exist at that location.",
        },
      ],
    },
    {
      slug: "django-framework",
      title: "Django Web Framework",
      hours: "10-12",
      sortOrder: 2,
      content: `# Django Web Framework

Django is a Python framework for building complete web applications. It is useful when you need users, admin screens, forms, database models, permissions, and server-rendered pages without assembling every piece yourself.

Before you touch framework syntax, keep the first lesson's loop in your head. Django does not change the loop. It gives each part a named home so a real team can find it later.

## Start Here: No Code Yet

Start with the loop before you look at files:

Read that loop as a sentence:

- A browser asks for a path.
- Django chooses the route.
- A view runs the Python work.
- Django sends a response back.

Imagine a small site with two pages:

- \`/health/\` should answer whether the app is alive.
- \`/dashboard/\` should show a signed-in user's work.

In a hand-written toy app, you might write one long function with many \`if\` statements. Django pushes you toward a cleaner split:

| Question | Django place | Plain meaning |
| --- | --- | --- |
| Which path did the browser ask for? | \`urls.py\` | The route table. |
| What should happen for that path? | view | The Python function or class that handles the request. |
| What data do we store? | model | The database-backed shape of the app's data. |
| What page should the browser see? | template | HTML built from data. |
| Who can do this action? | auth and permissions | The access rules. |

Read Django as organization first, code second. The framework is valuable because it keeps routing, data, permissions, pages, and admin tools in predictable places.

## How to Use This Room Screen

This room is not asking you to install Django yet. It is asking you to understand why Django splits work into named places.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | See Django as structure around the same request -> response loop. | Name the path, route table, view, and response. |
| Inspect | Read each framework word as a responsibility. | Ask: does this choose a route, run code, store data, or render output? |
| Build | Model Django's route table in plain Python. | Map \`/health/\` and \`/dashboard/\` to view names before adding anything else. |
| Prove | Show that known paths resolve and missing paths do not. | Run Check Work, then explain why \`/missing/\` stays unresolved. |

When you see terms like \`urls.py\`, view, model, template, and admin, do not treat them as random labels. They are shelves. Django is giving each part of the web app a shelf so a team can find it later.

## One Clean Pass Through This Room

Read the room as one organized request path:

1. A browser asks for a path.
2. \`urls.py\` decides which view owns that path.
3. The view does the Python work for that request.
4. Django returns a response to the browser.
5. A missing path stays missing instead of pretending to work.

That is the whole first pass. The workspace is only asking you to model that route table clearly before a full Django project adds more files.

## What the Workspace Will Ask You To Do

The practice workspace uses plain Python on purpose. You are not proving that Django is installed. You are proving that you understand the shape Django uses.

Read the starter like this:

1. The \`routes\` dictionary acts like a tiny \`urls.py\`.
2. Each key is a path a browser or API client could ask for.
3. Each value is the view responsibility that should answer.
4. \`routes.get(path)\` either finds the matching view or returns \`None\`.
5. A missing path should stay missing instead of pretending to work.

## Your First Ten Minutes

Use this order:

1. Say the first-room loop again: request -> route choice -> view code -> response.
2. Point to which Django piece owns each part of that loop.
3. Run the starter unchanged.
4. Match \`/health/\`, \`/dashboard/\`, and \`/missing/\` to the route table.
5. Change only the route map after the original output makes sense.

That is the first pass. Full Django project setup, migrations, templates, and deployment can wait until the routing idea is clear.

## Before Editing the Route Map

Run the starter once unchanged. Match each printed path to the route table:

- \`/health/\` should prove a known route can resolve.
- \`/dashboard/\` should prove a second known route can resolve.
- \`/missing/\` should prove an unknown route stays unresolved.

After those three cases make sense, edit one route entry. The goal is not to install Django yet. The goal is to explain how a path finds the view that should answer it.

## What Django Gives You

Django is often called "batteries included" because it ships with a complete application structure:

- URL routing
- views
- templates
- forms
- ORM models
- migrations
- authentication
- admin screens
- security defaults

That does not mean Django is magic. It means Django has strong opinions about where each piece belongs.

## Request Flow in Django, Step By Step

~~~text
Browser request
    -> urls.py picks a route
    -> view function or class runs
    -> model/query/form/template work happens
    -> response returns HTML, JSON, redirect, or error
~~~

The important move is responsibility:

1. The browser asks for a path.
2. \`urls.py\` chooses the matching view.
3. The view does the application work.
4. Django sends back a response.

\`urls.py\` should not become the whole application. It should choose the right view and stay readable.

## A Minimal View

The view below answers a health check. Read it as a sentence before reading it as code:

"When Django routes a request to \`health\`, return JSON saying the app is OK."

~~~python
from django.http import JsonResponse


def health(request):
    return JsonResponse({"ok": True})
~~~

Now connect that view to a URL pattern:

~~~python
# urls.py
from django.urls import path
from .views import health

urlpatterns = [
    path("health/", health),
]
~~~

If the browser requests \`/health/\`, Django matches the route and runs \`health(request)\`.

## What Each Line Is Doing

| Code | Meaning |
| --- | --- |
| \`from django.http import JsonResponse\` | Bring in a response helper that sends JSON. |
| \`def health(request):\` | Define the view. Django passes the request into it. |
| \`return JsonResponse({"ok": True})\` | Send a JSON response back to the browser or API client. |
| \`path("health/", health)\` | Route \`/health/\` to the \`health\` view. |

If that table makes sense, the code is no longer a wall. It is a map from one path to one response.

## When Django Is The Right Tool

Use Django when the project needs a durable product backend:

- user accounts
- admin workflows
- relational data
- forms and validation
- permissions
- content management
- server-rendered pages

Use a smaller framework or plain functions when you only need a tiny script or one simple API. Use Django when the product needs structure that will still make sense after it grows.

## Practice

Use the workspace to model Django's routing idea without installing Django.

1. Create a tiny route table with \`/health/\` and \`/dashboard/\`.
2. Make each route point to a plain Python function name.
3. Return \`None\` or a not-found result when a path is missing.
4. Explain which part acts like \`urls.py\` and which part acts like a view.

## Explain It Back

Explain how \`urls.py\` and a view work together. A strong answer sounds like: "\`urls.py\` chooses the view for the requested path, and the view returns the response."`,
      quiz: [
        {
          type: "multiple_choice",
          question: "In Django, what usually chooses which view handles a request?",
          options: ["urls.py", "A random README heading", "A button color", "A browser bookmark"],
          correct: 0,
          explanation: "Django URL patterns map request paths to views.",
        },
      ],
    },
    {
      slug: "fastapi-async",
      title: "FastAPI & Async Python",
      hours: "8-10",
      sortOrder: 3,
      content: `# FastAPI & Async Python

FastAPI is built for APIs. It uses Python type hints to validate input, generate documentation, and make route handlers easier to understand.

FastAPI is not the first idea. The first idea is still the same loop. FastAPI makes that loop explicit: write a Python function, label it with the HTTP method and path, and let the framework handle the boring request parsing around it.

## Start Here: No Code Yet

Start with the request story:

Read that request story as a sentence:

- A client asks for a method and path.
- FastAPI matches that request to a route label.
- The matched Python function receives trusted inputs.
- The function returns data that becomes the response.

Read a FastAPI endpoint as a contract:

| Contract question | Example answer |
| --- | --- |
| What method is allowed? | GET |
| What path is allowed? | /users/{user_id} |
| What input comes from the path? | user_id |
| What type should that input become? | int |
| What should the function return? | a user object or an error |

That is the mental model. The decorator is not decoration. It is the route label that tells FastAPI which requests should reach the function.

## How to Use This Room Screen

This room is not asking you to launch a FastAPI server yet. It is asking you to read an API endpoint as a promise: this method and path will accept this shape of input and return this shape of output.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | Understand the endpoint contract before chasing framework syntax. | Name the method, path, parameter, type, and response. |
| Inspect | Treat decorators and type hints as labels that FastAPI reads. | Ask: what request is allowed, and what value must be validated? |
| Build | Model the route contract in plain Python first. | Handle \`GET /users/42\` and an invalid path value deliberately. |
| Prove | Show that valid input reaches handler logic and invalid input does not. | Explain why \`/users/not-a-number\` should fail before trusted code runs. |

When you see \`@app.get\`, \`{user_id}\`, \`user_id: int\`, and \`async def\`, do not treat them as random code decorations. They are API responsibilities: route label, path value, validation rule, and waiting behavior.

## One Clean Pass Through This Room

Read the room as one endpoint promise:

1. The method and path say which requests are allowed.
2. The path value has to be read before the handler trusts it.
3. The type rule decides whether the value can become an integer.
4. Valid input reaches the handler result.
5. Invalid input returns an error instead of slipping into trusted code.

That is enough for this room. FastAPI syntax matters later; first prove you can read the contract it is trying to protect.

## What the Workspace Will Ask You To Do

The workspace uses plain Python to model FastAPI's contract. You are not proving FastAPI is installed. You are proving you understand what FastAPI would do before your handler trusts request input.

Your starter has one route function. Read it as a small version of:

1. Check that the request method is allowed.
2. Match a path shaped like \`/users/{user_id}\`.
3. Convert the path value into an integer.
4. Return structured data only after the value is valid.
5. Return an error object when the path value is not valid.

## Your First Ten Minutes

1. Run the starter once unchanged.
2. Match the successful output to \`GET /users/42\`.
3. Match the failed output to \`GET /users/not-a-number\`.
4. Find the line where text becomes an integer.
5. Change only one input path after the original behavior makes sense.

## Before Editing the API Contract

Run the starter once unchanged. Match each output to the endpoint contract:

- \`GET /users/42\` should prove a valid path value can become an integer.
- \`GET /users/not-a-number\` should prove invalid input is rejected before trusted handler work.
- The returned object should only appear after the method, path, and value shape are valid.

After those cases make sense, edit one allowed path or value. The goal is to read the contract before treating the decorator or type hint as magic syntax.

## What FastAPI Adds

Compared with the tiny handler from room 1, FastAPI adds useful structure:

- decorators connect methods and paths to functions
- type hints describe expected input
- validation rejects values that cannot become the expected type
- returned dictionaries become JSON responses
- generated docs describe the API from the same route definitions

You do not need to memorize the whole framework first. Learn how the route label, function input, validation, and response fit together.

## The Core Shape

~~~python
from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health():
    return {"ok": True}
~~~

The decorator says which route and method the function handles. The function returns data. FastAPI turns that data into a JSON response.

## Read the Endpoint One Line at a Time

| Line | Plain meaning |
| --- | --- |
| \`app = FastAPI()\` | Create the API application. |
| \`@app.get("/health")\` | Let GET requests for \`/health\` reach the next function. |
| \`def health():\` | Define the Python handler. |
| \`return {"ok": True}\` | Send data back as a JSON response. |

If you can explain those four lines, you understand the core shape.

## Path Parameters

~~~python
@app.get("/users/{user_id}")
def read_user(user_id: int):
    return {"user_id": user_id}
~~~

Because \`user_id\` is typed as \`int\`, FastAPI validates it before your function runs. If the client sends \`/users/not-a-number\`, FastAPI rejects it.

## Validation Before Your Code Runs

This is one of FastAPI's most useful habits:

| Request | What FastAPI sees | What should happen |
| --- | --- | --- |
| GET /users/42 | \`user_id\` can become an integer | Run the function. |
| GET /users/not-a-number | \`user_id\` cannot become an integer | Reject the request before the handler logic. |

Validation is not busywork. It keeps your function from pretending bad input is safe input.

## Async, Plain English

Async helps when your app waits on slow I/O, such as databases, external APIs, queues, or file storage.

Use \`async def\` when the libraries you call are async-aware. Use normal \`def\` when they are not. Do not add async everywhere just because it looks modern.

## Async Decision Rule

Ask what the handler spends time doing:

| Handler work | Usually choose |
| --- | --- |
| Simple CPU work or normal synchronous libraries | \`def\` |
| Waiting on async database, async HTTP client, queue, or file service | \`async def\` |

Async is useful when the app can do other work while one request waits. It is not a badge you add to every function.

## Practice

Use the workspace to model FastAPI's route contract in plain Python data.

1. Create a route entry for \`GET /users/{user_id}\`.
2. Treat \`42\` as a valid integer path value.
3. Treat \`not-a-number\` as invalid input.
4. Return a structured user object for valid input and an error object for invalid input.
5. Explain why validation should happen before the handler trusts the value.

## Explain It Back

Explain how a FastAPI decorator connects a URL path to Python code. A strong answer sounds like: "The decorator labels which method and path belong to the function, and type hints tell FastAPI how to validate values before the function runs."`,
      quiz: [
        {
          type: "true_false",
          question: "FastAPI can use Python type hints to validate request data.",
          correct: true,
          explanation: "FastAPI uses type hints and Pydantic validation to check input.",
        },
      ],
    },
    {
      slug: "database-sqlalchemy",
      title: "Databases & SQLAlchemy",
      hours: "8-10",
      sortOrder: 4,
      content: `# Databases & SQLAlchemy

Most real applications need durable data. A database lets your app remember users, orders, lessons, posts, payments, permissions, and audit history.

SQLAlchemy is a Python toolkit for working with relational databases.

Before SQLAlchemy syntax matters, know what the database is for: it keeps structured facts after Python finishes handling the current request.

## Start Here: No ORM Yet

Start with the professional question. Read that database question as a checklist:

- What data should live past this request?
- Where should that data live?
- What should happen when it is missing?

Start by naming the data contract:

| Contract question | Example answer |
| --- | --- |
| What are we storing? | users |
| What identifies one record? | id or email |
| Which fields do we need back? | id, email, name |
| Can the lookup fail? | yes |
| What should a miss return? | None or a controlled not-found response |

That contract comes before SQL, SQLAlchemy, or model syntax. If you cannot state the expected rows, fields, and missing-data behavior, the ORM call will only hide the confusion.

## How to Use This Room Screen

This room is not asking you to build a production database yet. It is asking you to think like a database-backed app before ORM syntax appears.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | Understand the data contract before reading model code. | Name the table, identifying field, returned fields, and miss behavior. |
| Inspect | Read rows and fields as facts the app can trust only after validation. | Ask: what makes one user match, and what if no row matches? |
| Build | Model a database lookup with plain Python dictionaries first. | Find Ada and Grace by email, then handle a missing email honestly. |
| Prove | Show that a miss returns \`None\` instead of guessing or crashing. | Explain why missing data is a normal result, not an excuse to invent data. |

When you see \`users\`, \`id\`, \`email\`, \`name\`, and \`find_user_by_email\`, treat them as database responsibilities: collection, identifier, lookup field, returned facts, and miss behavior.

## One Clean Pass Through This Room

Read the room as one data question:

1. Decide what table-like collection holds the records.
2. Decide which field identifies the row you want.
3. Return only the row that matches the lookup.
4. Return \`None\` when nothing matches.
5. Explain the miss instead of inventing a record.

That is the professional habit before ORM syntax: know what correct, missing, and unsafe answers look like.

## What the Workspace Will Ask You To Do

The workspace uses a small list of dictionaries to model a table. You are not proving SQLAlchemy is installed. You are proving you know the query contract before an ORM hides it behind method calls.

Your starter has one lookup function. Read it as a small version of:

1. Check that the lookup value is usable.
2. Search the user records by email.
3. Return only the matching row.
4. Return \`None\` when no row matches.
5. Explain which fields the caller actually needed.

## Your First Ten Minutes

1. Run the starter once unchanged.
2. Match Ada's output to the row in the user list.
3. Match the missing-email output to \`None\`.
4. Find the line that decides whether a row matches.
5. Change only one email after the original lookup behavior makes sense.

## Before Editing the Lookup Helper

Run the starter once unchanged. Match each output to the data contract:

- Ada's email should return Ada's row.
- A missing email should return \`None\`.
- The helper should not invent a user, return the first row, or hide the miss.

After those cases make sense, edit one lookup value. The goal is to prove the row, fields, and missing-data behavior before ORM syntax enters the room.

## Tables, Rows, and Models

Start with the database idea:

~~~text
users table
id | email              | name
1  | ada@example.com    | Ada
2  | grace@example.com  | Grace
~~~

A model is Python's structured representation of that table.

Read the table before reading the class:

- \`users\` is the collection.
- each row is one user.
- \`id\`, \`email\`, and \`name\` are fields.
- a lookup by email should return one matching user or no user.

~~~python
class User:
    def __init__(self, user_id, email, name):
        self.id = user_id
        self.email = email
        self.name = name
~~~

The professional skill is knowing what belongs in the database, what belongs in application logic, and what should be validated before it reaches either one.

## What SQLAlchemy Adds

SQLAlchemy helps Python code talk to relational tables without scattering raw SQL strings everywhere. In a real app it can help with:

- mapping tables to Python classes
- building queries
- opening and closing sessions
- creating or updating rows
- handling transactions

Those tools are useful only after you know the data shape and the result behavior you want.

## Query Thinking

Before writing ORM syntax, ask the plain question:

- Which table do I need?
- Which rows should match?
- Which fields do I need back?
- Can this query return zero, one, or many rows?
- What should happen if nothing matches?

## Query Contract Example

Plain requirement:

~~~text
Find the user whose email is ada@example.com.
Return id, email, and name.
If no user matches, return None.
~~~

That is already most of the design. SQLAlchemy is the later tool that turns the design into a database operation.

## Missing Data Is Normal

A missing user is not always a server crash. It can mean:

- the email was typed wrong
- the account has not been created
- the user was deleted
- the caller is asking for something outside its allowed scope

Handle that case deliberately. Do not guess, return the first row, or hide the problem.

## Practice

Use the workspace to filter a list of user dictionaries by email or id. That is the same reasoning you will later apply with real SQL queries.

1. Name which field the lookup uses.
2. Return the matching user when the field matches.
3. Return \`None\` when no user matches.
4. Explain which fields the caller actually needs.
5. Explain why validation should happen before storing or trusting input.

## Explain It Back

Explain why an app should validate data before storing it. A strong answer sounds like: "The database should keep clean, intentional facts, so the app validates input and handles missing records before pretending the data is trustworthy."`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What question should you ask before writing a database query?",
          options: [
            "Which rows and fields do I need?",
            "How do I skip validation?",
            "How do I hide every error?",
            "How do I store secrets in the table name?",
          ],
          correct: 0,
          explanation:
            "Good query design starts with the rows, fields, and failure cases you actually need.",
        },
      ],
    },
    {
      slug: "auth-security",
      title: "Authentication & Security",
      hours: "8-10",
      sortOrder: 5,
      content: `# Authentication & Security

Authentication answers "who is this user?" Authorization answers "what is this user allowed to do?"

Do not blur those together.

## Start Here: Two Separate Questions

Before sessions, tokens, OAuth, password hashing, or framework middleware, read every protected request as two plain questions:

| Question | Meaning | Failure result |
| --- | --- | --- |
| Who is making this request? | Authentication | 401 sign in required |
| Is this user allowed to do this action? | Authorization | 403 not allowed |

A signed-in user is known. That does not automatically mean they are allowed.

## How to Use This Room Screen

This room is not asking you to wire OAuth, JWTs, password storage, or account recovery yet. It is asking you to read protected routes as two separate gates: identity first, permission second.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | Separate authentication from authorization before touching handler code. | Name who the user is and what action they want. |
| Inspect | Read every branch as an access decision. | Ask: is the user missing, known-but-not-allowed, owner, or admin? |
| Build | Model the profile guard in plain Python first. | Return 401, 403, or 200 only after the correct gate. |
| Prove | Show that protected data appears only after identity and permission pass. | Match each output to the permission table before changing code. |

When you see \`current_user\`, \`requested_user_id\`, \`is_owner\`, \`is_admin\`, \`401\`, and \`403\`, treat them as security responsibilities: identity, target record, allowed reason, support role, sign-in failure, and permission failure.

## One Clean Pass Through This Room

Read the room as two gates in order:

1. If there is no signed-in user, stop with 401.
2. If there is a signed-in user, check what profile they requested.
3. Allow the request only when the user is the owner or an admin.
4. Stop known-but-not-allowed users with 403.
5. Return protected data only after both gates pass.

That order is the lesson. Framework tools can help later, but they cannot replace the rule: identify first, authorize second.

## What the Workspace Will Ask You To Do

The workspace uses plain Python to model a protected profile route. You are not proving an auth library is installed. You are proving the guard order is safe before a framework hides it behind middleware.

Your starter has one profile handler. Read it as a small version of:

1. Stop anonymous requests with 401 before preparing private data.
2. Calculate whether the signed-in user is the owner.
3. Calculate whether the signed-in user is an admin.
4. Stop known-but-not-allowed users with 403.
5. Return protected data only after an allowed reason is true.

## Your First Ten Minutes

1. Run the starter once unchanged.
2. Match the anonymous output to 401.
3. Match the wrong-user output to 403.
4. Match owner and admin outputs to 200.
5. Change only one caller case after the original table makes sense.

## Before Editing the Profile Guard

Run the starter once unchanged. Match each output to the permission table:

- Anonymous requests should stop with 401.
- A signed-in user reading someone else's profile should stop with 403.
- The owner and the admin should reach 200.
- Protected data should appear only after one allowed reason is true.

After those cases make sense, edit one caller case. The goal is to prove identity and permission order before adding framework auth tools.

## Request Flow

Read that protected-route flow as a sentence:

- A request asks for \`/profile/10\`.
- The server reads the session or token.
- No user means 401.
- A known user moves to the permission rule.
- Owner or admin means return the profile.
- Everyone else gets 403.

The order matters because private data should not be prepared, returned, or logged before the access decision is made.

## 401 vs 403

Use this mental model:

- 401: "I cannot identify you yet."
- 403: "I know who you are, and this action is not allowed."

Those are different bugs, different user messages, and different audit signals.

## Permission Cases Before Code

For a profile page, name the expected behavior before writing the handler:

| Caller | Requested profile | Expected result |
| --- | --- | --- |
| anonymous | user 10 | 401 |
| user 2 | user 10 | 403 |
| user 10 | user 10 | 200 |
| admin 1 | user 10 | 200 |

That table is the security contract. The code is only the implementation of the table.

## Read the Handler One Branch at a Time

~~~python
def can_read_profile(current_user, requested_user_id):
    if current_user is None:
        return False

    is_owner = current_user["id"] == requested_user_id
    is_admin = current_user["role"] == "admin"
    return is_owner or is_admin


def get_profile(current_user, requested_user_id):
    if current_user is None:
        return 401, {"error": "sign in required"}

    if not can_read_profile(current_user, requested_user_id):
        return 403, {"error": "not allowed"}

    return 200, {"user_id": requested_user_id, "visible_to": current_user["id"]}
~~~

Read it in order:

1. No identity means stop before permission checks.
2. Known identity means calculate allowed reasons.
3. No allowed reason means forbidden.
4. Only then return protected data.

## Common Mistakes

- Treating "logged in" as permission to do everything.
- Trusting user-controlled input.
- Returning private data before checking ownership.
- Storing secrets in the repository.
- Hiding security errors instead of logging them safely.

## What You Are Not Building Yet

- Password storage.
- OAuth provider setup.
- JWT signing.
- Full account recovery.
- Production secret rotation.

Those matter later. First, prove you can separate identity from permission.

## Practice

Use the workspace to complete the profile guard. Make sure the behavior matches the permission table:

1. Anonymous users get 401.
2. A signed-in user cannot read someone else's profile.
3. The profile owner can read their own profile.
4. An admin can read the requested profile.
5. The handler returns protected data only after the checks pass.

## Explain It Back

Explain why "the user is signed in" is not the same as "the user may access this record."`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is authorization?",
          options: [
            "Checking what an authenticated user is allowed to do",
            "Choosing a button color",
            "Turning HTML into CSS",
            "Renaming a browser tab",
          ],
          correct: 0,
          explanation:
            "Authorization checks permissions after identity is known.",
        },
      ],
    },
    {
      slug: "deployment-python",
      title: "Deployment & Production Python",
      hours: "8-10",
      sortOrder: 6,
      content: `# Deployment & Production Python

Deployment means making the app run reliably for real users. Production work is not only "put it on a server." It includes configuration, logging, process management, database migrations, rollback, monitoring, and security.

## Start Here: A Deploy Is A Proof Chain

A deployment is not proven by a restart message. It is proven by a chain of checks before, during, and after the change.

Read the chain like this:

1. Before deploy: prove the change is safe enough to ship with passing tests and required configuration.
2. During deploy: prove the app updated cleanly with installed dependencies, database migrations, and a restarted process.
3. After deploy: prove users can still use it with a public health route, a protected-route check, a database-backed route, and log review.

If one link is missing, the deploy is not finished.

## How to Use This Room Screen

This room is not asking you to build Kubernetes, CI/CD, blue-green deploys, or incident automation yet. It is asking you to read deployment as evidence that real users can still reach the app after a change.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | Understand the proof chain before thinking about tools. | Name the pre-deploy, deploy, and post-deploy checks. |
| Inspect | Separate internal status from user-facing proof. | Ask: does this signal prove the app serves users, or only that a process changed? |
| Build | Model the deploy checks as plain Python data first. | Keep tests, migrations, restart, public health, logs, and rollback in order. |
| Prove | Show that public route evidence comes after restart. | Explain why "online" is weaker than a real 200 from the public app. |

When you see \`tests passed\`, \`database migrations applied\`, \`app restarted\`, \`public health route returned 200\`, \`logs checked\`, and \`rollback path known\`, treat them as deploy responsibilities: safety, schema, runtime, user-facing proof, crash review, and recovery.

## One Clean Pass Through This Room

Read the room as one release proof chain:

1. Tests show the change is safe enough to try.
2. Migrations show the database shape changed intentionally.
3. Restart shows the new process is running.
4. A public route check shows users can actually reach the app.
5. Logs and rollback notes show the team can respond if the release misbehaves.

The key idea is order. A restart message is not the finish line; user-facing proof comes after the app is running.

## What the Workspace Will Ask You To Do

The workspace uses plain Python data to model a deploy proof report. You are not proving a cloud platform is installed. You are proving the deploy checklist has the right evidence in the right order before a script hides it behind logs.

Your starter has one deploy check list and one evidence summary. Read it as a small version of:

1. Confirm tests passed before deployment is trusted.
2. Confirm migrations ran before the app serves schema-backed routes.
3. Confirm the app restarted.
4. Confirm a public route returned 200 after restart.
5. Confirm logs and rollback notes exist before calling the deploy done.

## Your First Ten Minutes

1. Run the starter once unchanged.
2. Match each printed line to one link in the proof chain.
3. Find the public health check and explain why it comes after restart.
4. Find the rollback line and explain why it is decided before an incident.
5. Add only one extra check after the original proof chain makes sense.

## Before Editing the Deploy Checklist

Run the starter once unchanged. Match each line to the deploy proof chain:

- Tests should pass before the deploy is trusted.
- Migrations should run before schema-backed routes are trusted.
- Restart should come before public route proof.
- Logs and rollback notes should exist before the deploy is called done.

After those cases make sense, add one extra check. The goal is to prove user-facing availability, not just record that a process changed.

## The Production Path

Read the deployment path as a proof chain:

- Code is committed.
- Tests run.
- Dependencies install.
- Database migrations apply.
- The app process restarts.
- A health route is checked.
- Logs are monitored.

Read this as a proof path, not as a pile of commands. Each step answers a question about whether the app can still serve users.

## Health Checks

Every deployable app should have a basic health route.

~~~python
def health():
    return {"ok": True, "service": "python-api"}
~~~

That route does not prove the whole product works, but it proves the server can answer a basic request.

## User-Facing Proof Beats Process Status

A process manager can say an app is online while the public route still fails. Production verification separates internal status from user-facing proof:

Read each signal with its limit:

- Process restarted: proves the runtime attempted to start. It does not prove the public site works.
- Health route returned 200: proves the app can answer a basic request. It does not prove every feature works.
- Protected route still requires login: proves access control still exists. It does not prove paid access is correct.
- Logs checked after restart: proves there is no obvious crash loop. It does not prove there are no hidden product bugs.
- Rollback path known: proves recovery is possible. It does not prove rollback will be painless.

## What To Verify After Deploy

- The app starts.
- The public route returns 200.
- A protected route still requires login.
- A database-backed route can read data.
- Logs do not show new crashes.
- The rollback path is known before you need it.

## What You Are Not Building Yet

- A full cloud platform.
- Kubernetes.
- Blue-green deployment.
- A complete CI/CD pipeline.
- Production incident automation.

Those are later skills. First, learn to prove a small deploy did not break the user-facing app.

## Practice

Use the workspace to write a deploy checklist as Python data. Include:

1. tests passed
2. database migrations applied
3. app restarted
4. public health route returned 200
5. logs checked after restart
6. rollback path known

Then add one extra check you would want before shipping an app to paying users.

## Explain It Back

Explain why "the process restarted" is weaker evidence than "the public route returned 200 after restart."`,
      quiz: [
        {
          type: "true_false",
          question: "A deploy is proven only because the process says it restarted.",
          correct: false,
          explanation:
            "A restart is not enough. You still need route checks and log review after the app is serving traffic.",
        },
      ],
    },
  ],
};
