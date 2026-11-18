# HTTP Evidence & Automation

## Why this lesson exists

HTTP automation helps security teams check approved pages, collect status evidence, validate headers, or monitor health endpoints. It becomes risky when it ignores scope, rate limits, privacy boundaries, or permission.

The professional habit is **policy before requests**: name where requests may go, how often, what fields are safe to record, what must never be collected, and how errors are handled without hiding failures.

In this stage you will write an **HTTP evidence plan** as local Python — modeling allowed URLs and safe response fields without requiring live network calls. You can extend the script later with `urllib` or `requests` in an authorized lab; the lesson focus is the collection boundary.

There is no in-lesson code box on this platform yet. Same rhythm: **read concept → edit a `.py` file → run in terminal → one small change → checklist**.

## Reminder: where you work

```bash
mkdir -p ~/asv-learn-python-security/stage-03
cd ~/asv-learn-python-security/stage-03
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\asv-learn-python-security\stage-03"
Set-Location "$HOME\asv-learn-python-security\stage-03"
```

You will create `http_evidence.py` in that folder.

## Start here: policy before requests

At the start, do not build a request loop because the code *can* reach a URL. First name:

1. **Approved URLs** — where automation may send requests
2. **Rate limit** — how much automation is acceptable
3. **Evidence fields** — status, headers, timing — not secrets
4. **Privacy rule** — what must never be collected
5. **Error rule** — how the script fails without hiding problems

HTTP evidence should answer a narrow review question and leave sensitive material alone. If the script needs tokens or cookies to “prove it worked,” the plan is already too broad for this lesson.

### Policy questions and what they protect

| Question to answer | What it protects |
| --- | --- |
| Which URLs are approved? | Requests stay inside authorization |
| What rate limit applies? | Automation does not hammer targets |
| Which fields are recorded? | Evidence stays useful and minimal |
| What is refused? | Tokens, cookies, and PII stay out |
| How do errors appear? | Failures are visible, not swallowed |

Do not start by writing a request loop. First say the policy in one sentence: *approved URLs, bounded rate, safe evidence fields, privacy refusal, and clear error handling.*

## How to use this lesson

Read in this order:

- **Learn:** understand what evidence is safe to collect from HTTP responses
- **Inspect:** separate allowed URLs, rate limits, evidence fields, and privacy rules
- **Build:** extend the evidence recorder with one safe field or refusal rule
- **Prove:** explain what the script intentionally refuses to collect

Practice after reading means you should understand the collection boundary before editing logic.

## One clean pass through this lesson

Before the editor, read HTTP automation as a policy-before-requests chain:

1. The approved URL list says where requests may go.
2. The rate limit says how much automation is acceptable.
3. The evidence fields say what facts are useful.
4. The privacy rule blocks tokens, cookies, and personal data.
5. The error rule says how the script fails without hiding the problem.

That chain keeps a small helper from becoming a data grabber. HTTP evidence should answer a narrow review question and leave sensitive material alone.

## Safe evidence fields

| Field | Usually safe to record | Usually unsafe |
| --- | --- | --- |
| URL (approved) | Yes — if on the allow list | Full URLs with embedded secrets |
| Status code | Yes — `200`, `404`, etc. | N/A |
| Security header presence | Yes — e.g. HSTS present/absent | Full header dumps with cookies |
| Response time (ms) | Yes — for monitoring | N/A |
| Set-Cookie / Authorization | No | Never log or store |
| Response body | Only with explicit approval | Often contains PII or session data |

## Reading the starter code

```python
allowed_urls = ["https://example.test/login", "https://example.test/health"]
```

Use fictional `.test` hosts or your own authorized lab endpoints — not arbitrary internet sites.

```python
def record_response(url, status_code, security_header):
    if url not in allowed_urls:
        return None
```

Requests to non-approved URLs produce no evidence record — same fail-closed idea as log parsing.

```python
privacy_rule = "do not collect tokens, cookies, or personal data"
```

Write the privacy rule as a string you can show auditors and future you. Code comments alone are easy to miss.

## Common beginner mistakes

**Logging full response headers** including `Set-Cookie` or `Authorization`.

**No rate limit** on loops — even lab scripts should model bounded request counts.

**Treating status 200 as “secure.”** Status codes describe HTTP result, not application security posture.

**Fetching URLs not on the allow list** “just to test.” Add them to the allow list explicitly or refuse.

**Swallowing exceptions** with bare `except:` — return a safe error shape instead.

## Your local task

### Step 1 — Create the starter

Create `http_evidence.py`:

```python
# http_evidence.py — Stage 03: HTTP Evidence & Automation
# Models evidence collection policy. Live requests require authorization.

allowed_urls = [
    "https://example.test/login",
    "https://example.test/health",
]
rate_limit_per_minute = 10
evidence_fields = ["url", "status_code", "security_header", "elapsed_ms"]
privacy_rule = "do not collect tokens, cookies, or personal data"

sample_responses = [
    {"url": "https://example.test/health", "status_code": 200, "security_header": "present", "elapsed_ms": 45},
    {"url": "https://example.test/login", "status_code": 200, "security_header": "missing", "elapsed_ms": 120},
    {"url": "https://evil.test/admin", "status_code": 403, "security_header": "n/a", "elapsed_ms": 10},
]

def record_response(url, status_code, security_header, elapsed_ms):
    if url not in allowed_urls:
        return None
    return {
        "url": url,
        "status_code": status_code,
        "security_header": security_header,
        "elapsed_ms": elapsed_ms,
    }

def main():
    print("=== HTTP evidence policy ===")
    print(f"Allowed URLs: {len(allowed_urls)}")
    print(f"Rate limit: {rate_limit_per_minute}/min")
    print(f"Privacy: {privacy_rule}")
    print("=== Recorded evidence ===")
    recorded = 0
    refused = 0
    for item in sample_responses:
        row = record_response(**item)
        if row is None:
            refused += 1
            print(f"REFUSED {item['url']}")
            continue
        recorded += 1
        print(row)
    print(f"Recorded: {recorded}, Refused: {refused}")

if __name__ == "__main__":
    main()
```

### Step 2 — Run unchanged

```bash
python3 http_evidence.py
```

Confirm the unauthorized URL is refused, not recorded.

### Step 3 — Add one policy improvement

Change **one** thing. Examples:

- Add `"refused_reason": "url not in allow list"` when returning `None` (internal logging only — not sent to untrusted parties)
- Track whether recorded count would exceed `rate_limit_per_minute` in a batch
- Add a `safe_error` dictionary for malformed sample rows

Save, run, and verify refused URLs still produce no secret fields.

### Step 4 — Name three refused items

In a comment or note, list three HTTP artifacts this script must **never** collect (e.g. session cookies, bearer tokens, full response bodies with user data).

## Key vocabulary

| Term | Meaning here |
| --- | --- |
| Allow list | Explicit set of URLs automation may request |
| Rate limit | Cap on requests per time window |
| Evidence field | A safe fact recorded from a response |
| Privacy rule | Written boundary on sensitive data |
| Fail closed | Refuse or skip when policy is violated |

## Proof checklist

- [ ] `http_evidence.py` exists in `~/asv-learn-python-security/stage-03`
- [ ] Policy constants print at the start of the run
- [ ] Only allow-listed URLs produce evidence records
- [ ] Refused URLs are visible in output
- [ ] You added one policy improvement and re-ran
- [ ] You can name three items the script must never collect

## Authorized-only reminder

Send HTTP requests only to systems you own or are explicitly authorized to test. Respect robots.txt, terms of service, and rate limits in real environments.

When those items are true, continue to **Cryptography & Hashing Decisions**.

## ASV Learn house notes

Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.
