export const PYTHON_SECURITY_COURSE = {
  slug: "python-security",
  title: "Python for Cybersecurity",
  description:
    "Use Python for safe security automation: parse logs, model scoped network checks, handle HTTP evidence, reason about hashing, build defensive helpers, and validate risky input.",
  icon: "PY",
  difficulty: "Intermediate",
  hours: "15-18",
  topics: ["Python", "Security Automation", "Log Analysis", "Secure Coding"],
  certBadges: ["Security Automation"],
  stages: [
    {
      slug: "stage-01",
      title: "Python Basics for Security",
      hours: "2-3",
      sortOrder: 1,
      content: `# Python Basics for Security

Security automation starts with dependable basics. Before a script can help an analyst, it must read input predictably, produce structured output, and handle bad data without hiding the problem.

## Start Here: Data Shape Before Security Tooling

At the start, do not jump to scanners, sockets, or large defensive tools. Ask what one record means, which fields are expected, what bad input looks like, and what output an analyst can trust.

You are not building a full security product yet. You are learning the habit that makes later automation safer: parse one small thing correctly before you automate many things quickly.

## How to Use This Room Screen

This room is about data shape before security tooling. Read the screen in this order:

- Learn: understand what one log record means.
- Inspect: identify the expected fields and bad-input case.
- Build: change one small parser behavior, not a scanner.
- Prove: explain how predictable parsing helps an analyst trust the output.

"Practice after the lesson" means you should understand the record before editing the starter code. If the Python looks like a wall, read one line at a time and ask: what input comes in, what fields are expected, what output comes out?

## One Clean Pass Through This Room

Before the workspace, read the parsing task as an evidence chain:

1. A raw log line arrives as text.
2. The delimiter tells Python where one field ends and the next begins.
3. The expected shape tells you how many fields should exist.
4. A valid line becomes a dictionary an analyst can compare.
5. A malformed line fails clearly instead of pretending to be evidence.

That chain is the security lesson. Automation gets dangerous when a script accepts messy input and hides the mistake. A small parser that tells the truth is more useful than a large tool that silently trusts bad data.

Treat the parser as a translator, not a magic filter. Its job is to preserve meaning while refusing input that cannot be trusted.

| Question to answer | What it protects |
| --- | --- |
| What raw string came in? | The original evidence stays visible. |
| Which fields are expected? | The script does not invent missing data. |
| What counts as malformed? | Bad input is handled deliberately. |
| What structure comes out? | Analysts can compare events consistently. |
| What should be explained? | The learner can connect code behavior to investigation value. |

Do not start by editing the parser. First say the data shape in one sentence: each valid line has time, user, source, and event; anything with the wrong shape should fail clearly.

## What the Workspace Will Ask You To Do

The workspace will ask you to work with a tiny parser:

| Workspace item | What it proves |
| --- | --- |
| Input line | You can identify the raw evidence string. |
| Field split | You can separate time, user, source, and event. |
| Bad input rule | You can fail clearly instead of hiding bad data. |
| Parsed event | You can return a structure an analyst can compare. |
| Explanation | You can say why reliable parsing matters before automation. |

## Your First Ten Minutes

Use this order:

1. Read the sample log lines without editing.
2. Match each comma-separated part to a field.
3. Run the starter unchanged.
4. Identify what should happen when a line has the wrong shape.
5. Change one parser behavior only after the output makes sense.

## Before Editing the Starter Code

Run the parser unchanged and read the returned dictionary. You are ready when the work shows predictable parsing and clear bad-input handling, not a finished security automation tool.

## Parse Before You Automate

Start with simple log lines:

| Field | Example |
| --- | --- |
| Time | 09:41 |
| User | alex |
| Source | 10.0.3.44 |
| Event | failed-login |

Your first goal is not a large tool. It is a tiny parser that turns a line into a dictionary and returns None when the line is malformed.

## Example Helper

~~~python
sample_logs = [
    "09:41,alex,10.0.3.44,failed-login",
    "09:44,alex,10.0.3.44,login-success",
]

def parse_event(line):
    parts = line.split(",")
    if len(parts) != 4:
        return None
    event_time, user, source, event = parts
    return {"time": event_time, "user": user, "source": source, "event": event}

parsed_events = [parse_event(line) for line in sample_logs if parse_event(line)]
~~~

## Practice

Write a parser that extracts fields, keeps valid events, and fails clearly on bad input. Explain why predictable parsing helps analysts compare events.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why should bad log lines return a clear fallback such as None?",
          options: [
            "So the analyst can see that input did not match the expected shape",
            "So errors are hidden from the report",
            "So every line becomes a successful alert",
            "So the parser can skip field names",
          ],
          correct: 0,
          explanation: "Bad input is normal in security data. The tool should expose it intentionally instead of pretending it parsed correctly.",
        },
      ],
    },
    {
      slug: "stage-02",
      title: "Network Programming for Safe Checks",
      hours: "2-3",
      sortOrder: 2,
      content: `# Network Programming for Safe Checks

Network code must start with scope. A professional script should know which targets are allowed, what evidence it is collecting, and what it will do when a target is outside the lab.

## Start Here: Scope Before Network Checks

At the start, do not treat network code as permission to inspect anything reachable. First name the allowed targets, the sample service records, the timeout rule, the result summary, and what the helper refuses to include.

Safe network automation begins as a bounded model. If the target is outside scope, the correct behavior is exclusion, not curiosity.

## How to Use This Room Screen

This room is about safe scope before network code. Read the screen in this order:

- Learn: understand why allowed targets come before checks.
- Inspect: identify allowed targets, service records, timeout, and result summary.
- Build: adjust a model of a service check, not a live scanner.
- Prove: explain how scope keeps the evidence reviewable.

"Practice after the lesson" means you should know what the script is allowed to inspect before changing any logic.

## One Clean Pass Through This Room

Before the workspace, read network automation as a scope-before-checks chain:

1. The allowed target list says what the script may inspect.
2. The service records are sample evidence, not live discovery.
3. The timeout rule keeps the helper from hanging or probing endlessly.
4. The result summary shows only scoped evidence a reviewer can read.
5. The exclusion rule refuses anything outside authorization.

That chain is the safety lesson. A network helper becomes risky when it treats every reachable address as fair game. A professional script proves what it checked, what it skipped, and why the skipped target stayed out.

Do not start by editing the service summary. First say the boundary in one sentence: this helper only summarizes approved sample targets, uses a timeout rule, and excludes anything outside scope.

## What the Workspace Will Ask You To Do

The workspace will ask for a scoped service summary:

| Workspace item | What it proves |
| --- | --- |
| Allowed targets | You can keep the check inside authorization. |
| Service records | You can read sample evidence before action. |
| Timeout rule | You can prevent hanging behavior. |
| Result summary | You can produce output a reviewer can understand. |
| Scope explanation | You can explain why out-of-scope targets are excluded. |

## Your First Ten Minutes

Use this order:

1. Read the allowed target list.
2. Match each service record to a target and port.
3. Run the starter unchanged.
4. Confirm the summary ignores anything outside scope.
5. Change one summary field only after the boundary is clear.

## Before Editing the Service Summary

Do not turn the exercise into scanning real systems. You are ready when the work shows a scoped, modeled check with clear output and safe exclusion behavior.

## Model The Check First

For beginner practice, model a service check with sample records instead of touching real systems.

| Field | Purpose |
| --- | --- |
| Allowed targets | Keeps practice inside authorization |
| Service records | Gives sample data to inspect |
| Timeout seconds | Prevents hanging behavior |
| Result summary | Makes the output useful to a reviewer |

## Safe Service Summary

~~~python
allowed_targets = ["lab.local", "10.0.0.5"]
service_records = [
    {"target": "lab.local", "port": 443, "state": "open", "service": "https"},
    {"target": "10.0.0.5", "port": 22, "state": "closed", "service": "ssh"},
]
timeout_seconds = 2

def summarize_services(records, allowed):
    return [
        f"{item['target']}:{item['port']} {item['service']} {item['state']}"
        for item in records
        if item["target"] in allowed
    ]

result_summary = summarize_services(service_records, allowed_targets)
~~~

## Practice

Create a scoped service summary. The evidence should name allowed targets, timeout behavior, and the summary a reviewer would read.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should a network practice script define before any check?",
          options: ["Allowed scope", "A public random target", "A hidden credential", "A destructive action"],
          correct: 0,
          explanation: "Safe security practice starts with authorized scope and bounded behavior.",
        },
      ],
    },
    {
      slug: "stage-03",
      title: "HTTP Evidence & Automation",
      hours: "2-3",
      sortOrder: 3,
      content: `# HTTP Evidence & Automation

HTTP automation is useful for checking approved pages, collecting status evidence, or validating headers. It becomes risky when it ignores scope, rate limits, or permission.

## Start Here: Policy Before Requests

At the start, do not build a request loop because the code can reach a URL. First name the approved URLs, rate limit, evidence fields, privacy refusal, and error-handling rule.

HTTP evidence should prove a narrow question without collecting secrets. The best beginner script is clear about what it records and what it refuses to touch.

## How to Use This Room Screen

This room is about request policy before automation. Read the screen in this order:

- Learn: understand what evidence is safe to collect.
- Inspect: separate allowed URLs, rate limits, evidence fields, and privacy rules.
- Build: write a small HTTP evidence plan.
- Prove: explain what the script refuses to collect.

"Practice after the lesson" means you should understand the collection boundary before editing request logic.

## One Clean Pass Through This Room

Before the workspace, read HTTP automation as a policy-before-requests chain:

1. The approved URL list says where requests may go.
2. The rate limit says how much automation is acceptable.
3. The evidence fields say what facts are useful.
4. The privacy rule blocks tokens, cookies, and personal data.
5. The error rule says how the script fails without hiding the problem.

That chain keeps a small helper from becoming a data grabber. HTTP evidence should answer a narrow review question and leave sensitive material alone.

If the script needs secrets to prove it worked, the plan is already too broad for this room.

Do not start by writing a request loop. First say the policy in one sentence: approved URLs, bounded rate, safe evidence fields, privacy refusal, and clear error handling.

## What the Workspace Will Ask You To Do

The workspace will ask for an HTTP evidence plan:

| Workspace item | What it proves |
| --- | --- |
| Allowed URLs | You can limit requests to approved targets. |
| Rate limit | You can avoid noisy or abusive automation. |
| Evidence fields | You can collect status and header facts. |
| Privacy rule | You can avoid tokens, cookies, and personal data. |
| Error handling | You can fail safely without hiding the problem. |

## Your First Ten Minutes

Use this order:

1. Read the allowed URL list.
2. Identify what evidence is collected.
3. Identify what evidence is refused.
4. Run the starter unchanged.
5. Add one safe field or refusal rule.

## Before Writing the HTTP Evidence Plan

Do not collect secrets to prove the request worked. You are ready when the work shows approved URLs, bounded request rate, safe evidence, privacy refusal, and clear errors.

## Write The Request Policy

Before making requests, describe:

1. Which hosts or paths are allowed.
2. What header or status evidence is collected.
3. How many requests are allowed.
4. What the script does with errors.
5. What should not be collected.

## Approved Request Plan

~~~python
allowed_urls = ["https://example.test/login", "https://example.test/health"]
rate_limit_per_minute = 10
evidence_fields = ["url", "status_code", "security_header"]
privacy_rule = "do not collect tokens, cookies, or personal data"

def record_response(url, status_code, security_header):
    if url not in allowed_urls:
        return None
    return {"url": url, "status_code": status_code, "security_header": security_header}

http_evidence = [record_response("https://example.test/health", 200, "present")]
~~~

## Practice

Build an HTTP evidence plan that only records approved status and header information. Explain what the script intentionally refuses to collect.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Which item should an HTTP evidence script avoid collecting?",
          options: ["Tokens and cookies", "Status code", "Allowed URL", "Header presence"],
          correct: 0,
          explanation: "Sensitive tokens and cookies are not needed for beginner evidence and should not be collected.",
        },
      ],
    },
    {
      slug: "stage-04",
      title: "Cryptography & Hashing Decisions",
      hours: "2-3",
      sortOrder: 4,
      content: `# Cryptography & Hashing Decisions

Security engineers do not use cryptography by vibes. They identify the asset, the purpose, the algorithm family, the key or salt handling rule, and the failure mode.

## Start Here: Purpose Before Algorithm

At the start, do not pick a cryptographic algorithm because the name sounds strong. First name the asset, the purpose, the salt or key rule, secret-handling behavior, and migration note.

Cryptography decisions are safest when the goal is clear. Hashing, encryption, signing, and verification solve different problems, so the purpose comes before syntax.

## How to Use This Room Screen

This room is about choosing the cryptographic purpose before naming an algorithm. Read the screen in this order:

- Learn: separate hashing, encryption, signing, and verification.
- Inspect: identify the asset, purpose, salt rule, secret handling, and migration note.
- Build: write one crypto decision card.
- Prove: explain why custom cryptography is not the goal.

"Practice after the lesson" means you should understand what the data needs before writing a decision card.

## One Clean Pass Through This Room

Before the workspace, read cryptography as a purpose-before-algorithm chain:

1. The asset names what must be protected.
2. The purpose says whether the need is hashing, encryption, signing, or verification.
3. The salt or key rule says how secret material is handled.
4. The failure rule says what must not be logged or exposed.
5. The migration note says how the decision can improve later.

That chain prevents crypto-by-vocabulary. Strong names do not make a safe design; the learner has to connect the asset to the correct purpose and operating rule.

Do not start by choosing an algorithm name. First say the decision in one sentence: asset, purpose, salt or key rule, secret handling, and migration note.

## What the Workspace Will Ask You To Do

The workspace will ask for a crypto decision card:

| Workspace item | What it proves |
| --- | --- |
| Asset | You can name what is protected. |
| Algorithm purpose | You can choose hashing, encryption, signing, or verification. |
| Salt rule | You can prevent identical password records from matching. |
| Secret handling | You can keep keys and tokens out of logs and code. |
| Migration note | You can plan safer change over time. |

## Your First Ten Minutes

Use this order:

1. Read the asset first.
2. Decide whether the need is hashing, encryption, signing, or verification.
3. Name how salts or secrets are handled.
4. Run the starter unchanged.
5. Rewrite one vague crypto claim into an operating rule.

## Before Writing the Crypto Decision Card

Do not invent an algorithm. You are ready when the work shows a clear asset, established purpose, salt or key rule, secret-handling rule, and migration note.

## Hashing Is Not Encryption

Hashing is one-way verification. Encryption is reversible with a key. Password storage usually needs a slow password-hashing function, unique salts, and a migration plan when the policy changes.

| Field | Why it matters |
| --- | --- |
| Asset | What is protected |
| Algorithm purpose | Hashing, encryption, signing, or verification |
| Salt rule | Prevents identical passwords from producing identical stored values |
| Secret handling | Keeps keys and tokens out of logs and code |
| Migration note | Explains how old records move to better protection |

## Crypto Decision Card

~~~python
crypto_decision = {
    "asset": "student password verifier",
    "algorithm_purpose": "slow password hashing for verification",
    "salt_rule": "unique salt per password record",
    "secret_handling": "do not log secrets or commit keys",
    "migration_note": "rehash on next successful login when policy changes",
}
~~~

## Practice

Write a crypto decision card. The goal is to explain the choice and its operating rules, not to invent a custom algorithm.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the safest beginner rule for cryptographic algorithms?",
          options: [
            "Use established libraries and document the purpose",
            "Invent a custom algorithm",
            "Log keys for debugging",
            "Use the same salt for every user",
          ],
          correct: 0,
          explanation: "Professional cryptography uses established primitives and clear operating rules.",
        },
      ],
    },
    {
      slug: "stage-05",
      title: "Building Defensive Security Tools",
      hours: "2-3",
      sortOrder: 5,
      content: `# Building Defensive Security Tools

A useful security tool should reduce analyst workload without creating hidden risk. Start with a defensive purpose, sample input, safe output, audit fields, and a clear refusal boundary.

## Start Here: Analyst Control Before Automation

At the start, do not design a helper that quietly changes accounts, tickets, or systems. First name the defensive purpose, approved input source, output fields, refusal boundary, audit fields, and human-review point.

A defensive tool should make review faster without taking authority away from the analyst. Read-only evidence and clear refusal behavior come before automation.

## How to Use This Room Screen

This room is about defensive tool design before code. Read the screen in this order:

- Learn: understand the analyst task the tool supports.
- Inspect: identify input source, output fields, safety boundary, audit fields, and human review.
- Build: write one tool decision card.
- Prove: explain where human review stays in control.

"Practice after the lesson" means you should know what the helper must not do before writing the tool card.

## One Clean Pass Through This Room

Before the workspace, read defensive tooling as an analyst-control-before-automation chain:

1. The tool purpose names the defensive task being supported.
2. The input source limits the data the helper may read.
3. The output fields keep results useful and narrow.
4. The safety boundary says what the helper refuses to do.
5. The human-review point keeps action authority with an analyst.

That chain keeps helper code from becoming hidden authority. A good beginner tool can summarize evidence, but it should not silently change accounts, tickets, or systems.

Do not start by automating action. First say the tool card in one sentence: purpose, approved input, safe output, refusal boundary, audit fields, and human review.

## What the Workspace Will Ask You To Do

The workspace will ask for a defensive tool decision card:

| Workspace item | What it proves |
| --- | --- |
| Tool purpose | You can name the defensive task. |
| Input source | You can restrict approved data. |
| Output fields | You can keep results useful and limited. |
| Safety boundary | You can prevent hidden risky action. |
| Human review | You can keep escalation under analyst control. |

## Your First Ten Minutes

Use this order:

1. Read the defensive purpose.
2. Match the input source to approved data.
3. Name the output fields an analyst needs.
4. Define what the tool refuses to do.
5. Add the human-review condition.

## Before Writing the Tool Decision Card

Do not build an automatic account-changing tool. You are ready when the work shows read-only evidence, audit fields, a refusal boundary, and human review before action.

## Tool Design Before Code

Use a tool decision card:

| Field | Question |
| --- | --- |
| Tool purpose | What defensive task does it support? |
| Input source | What approved data is read? |
| Output fields | What does the analyst see? |
| Safety boundary | What will the tool not do? |
| Audit fields | What proves how the tool was used? |
| Human review | When does a person decide? |

## Defensive Tool Decision Card

~~~python
tool_card = {
    "tool_purpose": "summarize failed login patterns for analyst review",
    "input_source": "approved identity log export",
    "output_fields": ["user", "source", "count", "first_seen", "last_seen"],
    "safety_boundary": "read-only analysis; no account changes",
    "audit_fields": ["reviewer", "dataset_id", "run_time"],
    "human_review": "analyst confirms before escalation",
}
~~~

## Practice

Write a defensive tool decision card. It should help an analyst reason faster while keeping account changes and escalations under human review.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What safety boundary fits a beginner defensive security helper?",
          options: [
            "Read-only analysis with human review before action",
            "Automatic account changes without review",
            "Hidden execution with no logs",
            "Access to unrelated systems",
          ],
          correct: 0,
          explanation: "Beginner tools should produce evidence and require review before sensitive action.",
        },
      ],
    },
    {
      slug: "stage-06",
      title: "Secure Coding Practices",
      hours: "2-3",
      sortOrder: 6,
      content: `# Secure Coding Practices

Secure Python code treats input as untrusted, limits behavior, and returns safe errors. It names what is allowed before processing data.

## Start Here: Allowed Shape Before Behavior

At the start, do not make unknown input work by accident. First name the required fields, allowed actions, safe error, safe log fields, and accepted and rejected cases.

Secure code starts with a narrow input shape. The handler should run only known behavior and fail closed when the request does not match that shape.

## How to Use This Room Screen

This room is about validation before behavior. Read the screen in this order:

- Learn: understand required fields, allowed actions, and safe errors.
- Inspect: identify accepted input, rejected input, and safe log fields.
- Build: edit the validation helper carefully.
- Prove: explain why unknown actions fail closed.

"Practice after the lesson" means you should understand the allowed request shape before editing code.

## One Clean Pass Through This Room

Before the workspace, read secure coding as an allowed-shape-before-behavior chain:

1. The required fields say what input must contain.
2. The allowed actions say what behavior can run.
3. The safe error rejects bad input without leaking details.
4. The log fields record useful facts without secrets.
5. The accepted and rejected cases prove both paths work.

That chain is the secure-coding habit. Unknown input should not become new behavior by accident; the helper should accept the narrow shape and fail closed everywhere else.

The rejected case is as important as the accepted case because it proves the boundary holds.

Good validation is boring on purpose.

Do not start by editing validation logic. First say the allowed shape in one sentence: required fields, allowed actions, safe error, safe logs, accepted case, and rejected case.

## What the Workspace Will Ask You To Do

The workspace will ask for a validation helper:

| Workspace item | What it proves |
| --- | --- |
| Required fields | You can name what input must contain. |
| Allowed actions | You can limit what behavior can run. |
| Safe error | You can reject bad input without leaking details. |
| Log fields | You can record useful facts without secrets. |
| Accepted and rejected cases | You can prove both paths behave correctly. |

## Your First Ten Minutes

Use this order:

1. Read the allowed actions before the function.
2. Match each required field to the payload.
3. Run the starter unchanged.
4. Compare accepted and rejected cases.
5. Change one validation rule and keep the safe error path.

## Before Editing the Validation Helper

Do not make unknown input work by accident. You are ready when the work shows required fields, allowed actions, safe errors, safe logs, and tests for accepted and rejected input.

## Validation Shape

A safe handler should define:

1. Required fields.
2. Allowed actions.
3. Type or format checks.
4. Safe error behavior.
5. Log fields that do not expose secrets.
6. A test case for accepted and rejected input.

## Request Validation Plan

~~~python
allowed_actions = {"view_profile", "reset_session"}
required_fields = ["user_id", "action"]
safe_error = {"ok": False, "error": "invalid request"}
log_fields = ["request_id", "user_id", "action", "result"]

def validate_request(payload):
    if not isinstance(payload, dict):
        return safe_error
    if not all(field in payload for field in required_fields):
        return safe_error
    if payload.get("action") not in allowed_actions:
        return safe_error
    return {"ok": True, "user_id": payload["user_id"], "action": payload["action"]}

accepted_case = validate_request({"user_id": "u-100", "action": "view_profile"})
rejected_case = validate_request({"user_id": "u-100", "action": "delete_everything"})
~~~

## Practice

Write a validation plan and helper that accepts only known actions, rejects unsafe input, and logs only safe fields.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should a safe handler do with an unknown action?",
          options: ["Return a safe error", "Run it anyway", "Log secrets", "Create a new permission"],
          correct: 0,
          explanation: "Unknown actions should fail closed with a safe response.",
        },
      ],
    },
  ],
};
