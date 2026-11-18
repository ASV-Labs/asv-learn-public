# Django Web Framework

## Why this lesson exists

Django is a **batteries-included** Python framework for complete web applications: routing, views, templates, forms, models, migrations, auth, and admin screens. It does not replace the request loop from Stage 01. It **organizes** it so teams can find routing, data, and permissions in predictable places.

In this stage you will model Django's **route table** in plain Python before installing Django. That honest step matches how you should read `urls.py` and views in a real project: path first, responsibility second, response third.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-full/stage-02
cd ~/asv-learn-python-full/stage-02
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-full\stage-02"
Set-Location "$HOME\asv-learn-python-full/stage-02"
```

You will create `django_routes.py` in that folder.

## Start here: Django as labeled shelves

Imagine a small site with two pages:

- `/health/` — is the app alive?
- `/dashboard/` — show a signed-in user's work

Django assigns each concern a shelf:

| Question | Django place | Plain meaning |
| --- | --- | --- |
| Which path did the browser ask for? | `urls.py` | Route table |
| What should happen for that path? | **view** | Python function that handles the request |
| What data do we store? | **model** | Database-backed shape |
| What page should the user see? | **template** | HTML built from data |
| Who can do this action? | **auth** | Access rules |

Read Django as **organization first, syntax second**.

## How to use this lesson

Read in this order:

- **Learn:** name path → route table → view → response
- **Inspect:** decide whether each term chooses a route, runs code, stores data, or renders output
- **Build:** map paths to view names in plain Python
- **Prove:** show known paths resolve and missing paths do not

Practice after reading means you understand the shape before `django-admin startproject`. Ask: *which file would I open to add a new URL?*

## One clean pass through this lesson

Read Django work as a chain:

1. A browser asks for a path.
2. `urls.py` (or your route dict) picks the matching view name.
3. The view does the Python work and returns a response.
4. A missing path stays missing instead of pretending to work.

Full project setup, migrations, and templates come later. This stage is the **routing idea**.

## What a minimal Django view looks like

When you eventually install Django, a health view often looks like:

```python
from django.http import JsonResponse

def health(request):
    return JsonResponse({"ok": True})
```

Connected in `urls.py`:

```python
from django.urls import path
from .views import health

urlpatterns = [
    path("health/", health),
]
```

For now, simulate that with a dictionary and plain functions.

## Common beginner mistakes

**Putting business logic in `urls.py`.** The route table should stay readable — it chooses views, it does not become the whole app.

**Views that do everything.** Split data access, validation, and rendering when a view grows past one screen.

**Trailing slash confusion.** Django often uses `/health/` with a trailing slash. Be consistent in your route table.

**Skipping the mental model because "Django handles it."** Frameworks route requests; they do not remove the need to understand paths and responses.

## Your local task

### Step 1 — Create the starter

Create `django_routes.py`:

```python
# django_routes.py — Stage 02: Django Web Framework
# Models urls.py with a plain route dictionary.

routes = {
    "/health/": "health_view",
    "/dashboard/": "dashboard_view",
}


def health_view():
    return 200, {"ok": True}


def dashboard_view():
    return 200, {"page": "dashboard", "widgets": 3}


def resolve_path(path):
    view_name = routes.get(path)
    if view_name is None:
        return 404, {"error": "not found"}

    # TODO: call health_view or dashboard_view based on view_name
    return 500, {"error": "not implemented"}


def main():
    for path in ["/health/", "/dashboard/", "/missing/"]:
        status, body = resolve_path(path)
        print(f"{path} -> {status} {body}")


if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 django_routes.py
```

Confirm known paths hit the stub and `/missing/` returns 404.

### Step 3 — Wire view names to functions

Complete the TODO so `/health/` and `/dashboard/` return their view responses. Use a dictionary mapping view name strings to callables, or an `if/elif` chain you can explain.

### Step 4 — One small change you can explain

Add **one** route after the original three cases work. Examples:

- `/settings/` pointing to a new view returning user preferences
- A view that returns 401 for dashboard when a `user` argument is `None` (preview of Stage 05)

In a comment, name which Django file each part would live in on a real project (`urls.py`, `views.py`).

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| URL pattern | Mapping from path to view |
| View | Function or class that handles a request |
| Model | Python class representing stored data |
| Template | HTML generated with context data |
| Admin | Built-in Django UI for staff data management |
| urlpatterns | List of route definitions in `urls.py` |

## Proof checklist

- [ ] `django_routes.py` exists in `~/asv-learn-python-full/stage-02`
- [ ] `/health/` and `/dashboard/` return 200 with expected bodies
- [ ] `/missing/` returns 404
- [ ] You can say which part acts like `urls.py` vs a view
- [ ] You added one route and re-ran successfully

When those are true, continue to **FastAPI & Async Python**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
