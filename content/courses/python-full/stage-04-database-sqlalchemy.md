# Databases & SQLAlchemy

## Why this lesson exists

Most real applications need **durable data** — users, orders, lessons, permissions — that survives after the current request finishes. SQLAlchemy is a Python toolkit for talking to relational databases with models, queries, and sessions.

Before ORM syntax, answer the professional question: *what row does this query need, which fields must come back, and what should happen when nothing matches?* If you cannot state that contract, `session.query()` will only hide the confusion.

In this stage you will model a **users table** with a list of dictionaries and a lookup helper. You are not installing PostgreSQL or SQLAlchemy yet. You are practicing query thinking locally.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-full/stage-04
cd ~/asv-learn-python-full/stage-04
```

Windows:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-full/stage-04"
Set-Location "$HOME\asv-learn-python-full/stage-04"
```

You will create `user_lookup.py` in that folder.

## Start here: data contract before ORM

Name the contract before SQL:

| Contract question | Example answer |
| --- | --- |
| What are we storing? | users |
| What identifies one record? | id or email |
| Which fields do we need back? | id, email, name |
| Can the lookup fail? | yes |
| What should a miss return? | None or controlled not-found response |

## How to use this lesson

Read in this order:

- **Learn:** understand tables as collections of rows with named fields
- **Inspect:** read each row as facts the app can trust only after validation
- **Build:** implement lookup by email with honest miss behavior
- **Prove:** show a hit returns one row and a miss returns None

Practice after reading means you know expected rows and fields before ORM methods appear. Ask: *what makes one user match, and what if no row matches?*

## One clean pass through this lesson

Read database work as a chain:

1. Decide which table-like collection holds records.
2. Decide which field identifies the row you want.
3. Return only the matching row's needed fields.
4. Return `None` when nothing matches.
5. Explain the miss instead of inventing data.

Missing data is normal — wrong email, deleted account, typo. Handle it deliberately.

## Table mental model

```text
users
id | email              | name
1  | ada@example.com    | Ada
2  | grace@example.com  | Grace
```

A Python model class mirrors that shape:

```python
class User:
    def __init__(self, user_id, email, name):
        self.id = user_id
        self.email = email
        self.name = name
```

Your list-of-dicts version is the same idea without the ORM.

## Common beginner mistakes

**Returning the first row when lookup fails.** That turns a miss into wrong data — worse than an error.

**Storing unvalidated input.** Validate before insert or lookup when format matters (email shape, id type).

**Queries with no named purpose.** "Get all users" is not a product feature unless the UI needs it.

**Treating None as an crash.** Callers should branch on `None` and return 404 or a friendly message.

## Your local task

### Step 1 — Create the starter

Create `user_lookup.py`:

```python
# user_lookup.py — Stage 04: Databases & SQLAlchemy
# Models a table lookup before SQLAlchemy syntax.

users = [
    {"id": 1, "email": "ada@example.com", "name": "Ada"},
    {"id": 2, "email": "grace@example.com", "name": "Grace"},
]


def find_user_by_email(email):
    if not email or not isinstance(email, str):
        return None

    normalized = email.strip().lower()
    # TODO: return the matching user dict or None
    return None


def main():
    samples = ["ada@example.com", "missing@example.com", "", "  Grace@Example.com  "]
    for email in samples:
        result = find_user_by_email(email)
        print(f"lookup {email!r} -> {result}")


if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 user_lookup.py
```

Confirm all lookups return `None` until you implement matching.

### Step 3 — Implement lookup

Match email case-insensitively after strip and lower. Return the full user dict for hits and `None` for misses.

Expected: Ada and Grace match; missing and empty string do not.

### Step 4 — One small change you can explain

Change **one** thing. Examples:

- Return only `{id, name}` instead of the full row
- Add `find_user_by_id` with the same miss behavior
- Count how many lookups missed in `main()` for logging visibility

In a comment, write the plain-English query contract your function implements.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Table | Named collection of rows with the same fields |
| Row | One record in a table |
| Primary key | Stable identifier for a row (often id) |
| Query | Request for rows matching conditions |
| ORM | Object-relational mapper — Python classes for tables |
| Session | SQLAlchemy workspace for queries and transactions |

## Proof checklist

- [ ] `user_lookup.py` exists in `~/asv-learn-python-full/stage-04`
- [ ] Valid emails return the correct user dict
- [ ] Unknown emails return None, not invented rows
- [ ] Empty or invalid input returns None safely
- [ ] You extended lookup behavior and re-ran
- [ ] You wrote the query contract in a comment or note

When those are true, continue to **Authentication & Security**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; complete the local task and proof checklist before continuing.
