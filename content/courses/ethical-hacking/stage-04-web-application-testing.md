# Web Application Testing Basics

## Why this lesson exists

Web testing starts with understanding normal behavior. Method, path, controllable input, expected result, and observed result give you a baseline. Changing inputs before you can describe normal is how beginners create noise and call it a finding.

In this lesson you will write **web test notes** for an authorized lab application (for example DVWA, Juice Shop, or another local training app you control). You will connect request shape to one safe risk question before any payload talk.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-ethical-hacking/stage-04
cd ~/asv-learn-ethical-hacking/stage-04
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-ethical-hacking\stage-04"
Set-Location "$HOME\asv-learn-ethical-hacking\stage-04"
```

You will write `web_test_notes.txt`. Point every note at your labeled lab app, not a live third-party site.

## Start here: normal behavior before tests

A useful web test answers a specific question. It does not spray payloads at every field.

Before changing anything, write:

1. HTTP method
2. Path
3. Input the user can control
4. Expected behavior for a normal request
5. Observed behavior
6. One risk question the next test will answer

If you cannot fill those fields, you are not ready to mutate input.

## Request and response literacy

| Piece | Why it matters in testing |
| --- | --- |
| Method | GET, POST, PUT, DELETE change server expectations |
| Path | Identifies the feature under review |
| Parameters / body | Show where attacker-controlled data enters |
| Cookies / tokens | Often carry session and authorization state |
| Status code | Distinguishes success, redirect, auth failure, server error |
| Response body / headers | Reveal reflected input, caching, security headers, errors |

A redirect that stays inside the lab app is different from a redirect that can leave the approved domain. An error that shows a stack trace is inventory evidence about information disclosure, not automatic remote code execution.

## OWASP-oriented questions without the laundry list

You do not need to memorize every Top 10 label on day one. You do need to ask durable questions:

| Risk family | Safe lab question | Evidence that would matter |
| --- | --- | --- |
| Access control | Can a low-privilege lab account reach another user’s object? | Predictable IDs, missing auth checks, direct object access |
| Injection | Does untrusted input change query or command structure? | Differing responses, error shapes, confirmed data influence |
| Auth / session | Can session tokens be guessed, reused, or fixed? | Token handling notes, logout behavior, cookie flags |
| Misconfiguration | Are debug pages, default creds, or verbose errors exposed? | Reachable admin paths, default banners, stack traces |
| XSS / client trust | Is untrusted input reflected or stored without encoding? | Exact reflection point and context (HTML, attribute, script) |

Always pair the family name with a reproduction path. “Possible XSS” without method/path/input/observed behavior is not a finding yet.

## Baseline note pattern

```text
web_method=GET
web_path=/login
input_parameter=redirect
expected_behavior=login page allows only local redirects inside the lab app
observed_behavior=redirect stayed inside the lab application
risk_question=can redirects leave the approved lab domain?
```

That note is already useful. It tells the next tester what normal looks like and what question remains.

## Intercepting proxies and lab discipline

If you use Burp, ZAP, or a similar proxy in your lab:

- Point it only at the authorized training application
- Use synthetic lab accounts
- Save requests that matter as evidence, not every click
- Disable intercept when you are only browsing to learn the UI
- Do not “helpfully” proxy your normal browser traffic to banks, work, or social media

Proxy power makes it easy to forget which host you are talking to. Keep the authorized hostname visible in every saved note.

## Common beginner mistakes

- Sending payloads before recording expected behavior
- Testing production-like personal accounts “because I own them”
- Calling every reflected string XSS without proving context
- Confusing 404/403 noise with access-control bypass
- Skipping authentication flows because anonymous pages feel easier
- Copying exploit PoCs from the internet into a lab note without understanding them

## Your local task

### Step 1 — Name the lab application

```text
app_label=dvwa-or-local-training-app
base_url=http://lab.local/  # use your real lab URL
auth_account=synthetic lab user only
out_of_scope=any non-lab hostname
```

### Step 2 — Capture one normal request

Manually use the app once for a simple feature (login form, search box, profile view). Write the normal request fields before any mutation.

### Step 3 — Write two web test notes

One baseline note and one mutation note:

```bash
web_method="GET"
web_path="/login"
input_parameter="redirect"
expected_behavior="login page allows only local redirects"
observed_behavior="redirect stayed inside the lab application"
risk_question="can redirects leave the approved lab domain"

printf '%s\n' \
  "method=$web_method" \
  "path=$web_path" \
  "parameter=$input_parameter" \
  "expected=$expected_behavior" \
  "observed=$observed_behavior" \
  "question=$risk_question"
```

For the mutation note, change only one input and record what changed. If nothing unsafe happened, that is still valid evidence.

### Step 4 — Self-review

Ask:

- Could a defender reproduce this from my notes alone?
- Did I stay on the labeled lab app?
- Is my risk question narrower than “is it hackable?”

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Baseline | Observed normal behavior before mutation |
| Controllable input | Value an attacker/user can influence |
| Reflection | Input appearing in a response |
| Access control | Rules that limit who can reach which objects |
| Safe risk question | Narrow question the next test will answer |

## Proof checklist

- [ ] `web_test_notes.txt` names lab app, base URL, synthetic account, out of scope
- [ ] At least one baseline note exists before mutation
- [ ] At least one mutation note changes a single input
- [ ] Every note includes expected and observed behavior
- [ ] No third-party production site appears in the notes

## ASV Learn house notes

Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.

Web testing practice belongs on applications you own or are explicitly authorized to test in a lab. Do not probe random websites, employer systems, or live customer apps under this course’s practice instructions.

When those items are true, continue to **Controlled Exploitation Validation**.
