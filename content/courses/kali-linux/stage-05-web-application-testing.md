# Web Application Testing

## Why this lesson exists

Web testing starts by understanding how the application communicates. The request **method**, **path**, **parameter**, **expected response**, and **observed response** become the basis for safe test cases.

In this lesson you will write a web test note that records normal behavior before proposing a scoped follow-up test.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-kali-linux/stage-05
cd ~/asv-learn-kali-linux/stage-05
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-kali-linux\stage-05"
Set-Location "$HOME\asv-learn-kali-linux\stage-05"
```

You will write `web_test_note.txt`. Point any proxy or browser tools only at your authorized lab application URL.

## Start here: baseline before tests

Do not change input until normal behavior is clear. First name:

1. HTTP method
2. Request path
3. User-controlled parameter
4. Expected response
5. Observed response
6. Next safe test

When you know what normal looks like, unusual behavior can be compared without drifting outside the lab application.

## Request shape

| Field | Purpose | Honest limit |
| --- | --- | --- |
| HTTP method | Shows the request action | Method alone is not a bug |
| Request path | Names the endpoint | Path must be in-scope lab app |
| User parameter | Identifies controllable input | Not every parameter is sensitive |
| Expected response | Defines normal behavior | Expectation must be written first |
| Observed response | Captures what happened | Observation ≠ exploit proof |
| Next safe test | Keeps follow-up tied to evidence | Must stay inside the lab app |

First say the baseline in one sentence: *method, path, parameter, expected response, observed response, and next safe test.*

## Baseline workflow

1. Load the lab page with a normal request.
2. Note status code, redirect target, or page purpose.
3. Identify one parameter you control (query, form, header if in scope).
4. Write expected vs observed before any payload thinking.
5. Propose one safe follow-up that answers a single question.

| Safe follow-up examples | Unsafe drift |
| --- | --- |
| Confirm redirect stays on lab host | Jump to arbitrary external redirects on live sites |
| Compare response when parameter is empty vs present | Blast large payload lists with no baseline |
| Note whether error messages leak stack traces in lab | Attack third-party production apps |

Tools such as browser DevTools, an intercepting proxy, or curl help you **see** requests. Seeing is not permission to hammer. Keep the note small and reviewable.

## Open redirect style example (lab only)

Synthetic authorized scenario:

```text
Method: GET
Path: /login
Parameter: redirect
Expected: login page or safe local redirect inside the lab app
Observed: 302 to the requested local path
Next safe test: validate the redirect target stays on the lab application host
```

This stage teaches the note, not a full exploit chain. Do not escalate into persistence or data theft narratives here.

## Common beginner mistakes

- Changing inputs before writing expected behavior
- Testing the wrong host because a bookmark pointed elsewhere
- Treating every anomaly as critical
- Skipping the parameter name so nobody can reproduce
- Using public websites as “practice targets”
- Expecting ASV Learn to proxy traffic for you

## Your local task

### Step 1 — Confirm lab app target

Write the authorized URL in a one-line file `target_url.txt`:

```text
https://lab.local/login
```

If that is not a lab you control or are authorized to test, stop.

### Step 2 — Capture a normal baseline request

Against your authorized lab app only, capture one normal response (edit the URL to match `target_url.txt`):

```bash
mkdir -p evidence
curl -sI "https://lab.local/login" | tee evidence/baseline-login-headers.txt
```

Write expected behavior **before** you propose any unusual parameter values.

### Step 3 — Write the web test note

Create `web_test_note.txt`:

```text
http_method=GET
request_path=/login
user_parameter=redirect
expected_response=login page or safe local redirect inside the lab application
observed_response=302 redirect to the requested local path
next_safe_test=validate the redirect stays inside the lab application host
scope=lab.local web app only
```

Optional shell print:

```bash
http_method="GET"
request_path="/login"
user_parameter="redirect"
expected_response="login page or safe local redirect"
observed_response="302 redirect to the requested local path"
next_safe_test="validate the redirect stays inside the lab application"

printf '%s\n' \
  "method=$http_method" \
  "path=$request_path" \
  "parameter=$user_parameter" \
  "expected=$expected_response" \
  "observed=$observed_response" \
  "next_test=$next_safe_test"
```

### Step 4 — Self-review

- Is expected written clearly enough to compare?
- Does the next test stay on the lab app?
- Could another tester reproduce from the note alone?

### Step 5 — One change you can explain

Change one field (parameter or next_safe_test) and explain how the comparison still works.

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Baseline | Documented normal behavior |
| Parameter | User-controlled input in the request |
| Observed response | What the server actually returned |
| Safe test | Narrow, authorized follow-up |
| Scope | Lab application boundary |

## Proof checklist

- [ ] `target_url.txt` names an authorized lab app
- [ ] `web_test_note.txt` has method, path, parameter, expected, observed, next safe test
- [ ] Expected was written before proposing unusual input
- [ ] Next test stays inside the lab application
- [ ] No public third-party targets were used

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Practice only against intentionally vulnerable lab apps you host (for example DVWA, Juice Shop, or a course lab VM) — never against random public sites.

Web application testing without authorization is illegal. Use intentionally vulnerable labs you host or platforms that explicitly authorize your account for practice.

When those items are true, continue to **Exploitation Techniques**.
