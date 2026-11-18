export const KALI_LINUX_COURSE = {
  slug: "kali-linux",
  title: "Kali Linux & Penetration Testing Tools",
  description:
    "Use Kali Linux as a controlled security lab workstation: prepare scope, collect evidence, document tools, and prove safe workflows before advanced testing.",
  icon: "KL",
  difficulty: "Intermediate",
  hours: "20-25",
  topics: ["Kali Linux", "Security Tools", "Lab Workflow", "Evidence Handling"],
  certBadges: ["Kali Lab Practitioner"],
  stages: [
    {
      slug: "stage-01",
      title: "Kali Linux Setup & Basics",
      hours: "2-3",
      sortOrder: 1,
      content: `# Kali Linux Setup & Basics

Kali is a security workstation, not permission. The first professional skill is setting up a repeatable lab environment, naming the authorized target, and recording what each tool run is meant to prove.

## Start Here: Scope Before Shell

At the start, do not open tools and hunt for interesting output. Write down the workspace, the authorized target, the reason for the run, and the cleanup rule before any command matters.

You are not proving exploitation yet. You are learning how to make Kali work reviewable so a future instructor or defender can tell what was allowed, what was touched, and why.

## How to Use This Room Screen

The room is split into learning pieces so Kali does not become a wall of tool names.

| Screen piece | Why it matters here | First move |
| --- | --- | --- |
| Learn | Permission and scope come before tool output. | Say what Kali is allowed to touch. |
| Inspect | The lab boundary keeps practice controlled and reviewable. | Identify the workspace, VM or lab network, and target label. |
| Build | A lab note makes the run understandable before commands matter. | Write the lab note fields before a command matters. |
| Prove | Repeatable security work needs a cleanup and handoff trail. | Explain what was allowed, what was touched, and how cleanup works. |

"Practice after the lesson" means exactly that: the workspace is there after you understand the boundary. If the interface feels like too much at once, come back to this table and ask: what is the workstation, what is the authorized target, what evidence am I creating, and what cleanup keeps the lab clean?

## One Clean Pass Through This Room

Before the workspace, read the Kali setup task as a scope-to-note chain:

1. The lab workstation is where the work happens.
2. The authorized target is the only system the room allows.
3. The purpose says why a tool run would be useful.
4. The note records what was planned before output exists.
5. The cleanup rule makes the next session reviewable.

That chain is the lesson. Kali tools can produce impressive text very quickly, but professional security work starts earlier: with permission, scope, intent, and evidence that another person can understand.

Do not start by opening Kali tools. First say the boundary in one sentence: this workstation may only create a lab note for the named target, with a stated purpose and cleanup rule.

## What the Workspace Will Ask You To Do

The practice area is not asking you to attack anything. It asks you to make a lab run visible:

1. Name the workspace where notes and temporary files live.
2. Name the authorized target as a lab label, not a random public system.
3. Write the purpose of the tool run before trusting output.
4. Add a cleanup note so the next session starts clean.

## Your First Ten Minutes

Use this order:

1. Read the room plan and say the allowed target out loud.
2. Match workspace, target, purpose, and cleanup to the table below.
3. Read the lab note command as a note template, not as a hacking step.
4. Run practice only after the fields make sense.
5. Explain how your lab note prevents accidental testing of unrelated systems.

## Workstation Boundary

Before opening a tool, write the operating boundary.

| Item | Purpose |
| --- | --- |
| Workspace | Keeps notes and evidence together |
| Authorized target | Names the lab system that can be touched |
| Tool purpose | Explains why a command is being run |
| Cleanup note | Prevents stale lab files from becoming confusing evidence |

## Before Running the Lab Note Command

The command below only creates and prints a lab note. It does not scan, exploit, or contact a target.

- \`workspace\` is where this lab session keeps notes.
- \`authorized_target\` is the approved lab label.
- \`tool_purpose\` explains why a future command would be run.
- \`cleanup_note\` says how temporary lab evidence will be handled.

Read those four fields first. The shell syntax matters less than the professional habit: name scope before action.

## Lab Note

~~~shell
workspace="/tmp/tdx-kali-lab"
authorized_target="lab.local"
tool_purpose="document safe discovery workflow for an authorized lab target"
cleanup_note="remove temporary lab notes from /tmp after practice"

mkdir -p "$workspace"
printf '%s\\n' "workspace=$workspace" "target=$authorized_target" "purpose=$tool_purpose" "cleanup=$cleanup_note"
~~~

## Practice

Create a lab note for a Kali session. It should prove the workspace, target, tool purpose, and cleanup plan before any tool output is trusted.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should be named before using Kali tools?",
          options: ["The authorized target and purpose", "A random public host", "A hidden credential", "A shortcut alias only"],
          correct: 0,
          explanation: "Kali work starts with scope, purpose, and evidence handling before tool use.",
        },
      ],
    },
    {
      slug: "stage-02",
      title: "Information Gathering Tools",
      hours: "2-3",
      sortOrder: 2,
      content: `# Information Gathering Tools

Information gathering is not a tool list. It is a plan for collecting evidence while separating passive observation from active target contact.

## Start Here: Evidence Before Contact

At the start, do not treat a discovered clue as permission to touch a system. First name the passive source, the authorized active target, the evidence note, confidence, and the next action that is allowed.

Good reconnaissance keeps the line visible between what was observed and what may be contacted. The next step only belongs in the plan if it stays inside the approved lab scope.

## How to Use This Room Screen

This room is about recon boundaries before tool names. Read the screen in this order:

- Learn: understand the difference between passive evidence and active contact.
- Inspect: identify the source, authorized target, evidence note, confidence, and next allowed action.
- Build: write one recon log entry before running follow-up checks.
- Prove: explain why the next action stays inside scope.

"Practice after the lesson" means you should know what evidence you have and what you are allowed to touch before active checks enter the conversation.

## One Clean Pass Through This Room

Before the workspace, read reconnaissance as an evidence-before-contact chain:

1. The passive source says where the clue came from.
2. The authorized target says what may be checked actively.
3. The evidence note records what was observed without exaggeration.
4. The confidence level says how strong the clue is.
5. The next action says what is allowed inside scope.

That chain keeps recon professional. A useful clue is not automatically permission to scan, browse, or test a system. The next action must be tied to the approved lab target and the evidence already collected.

Do not start by running active checks. First say the recon boundary in one sentence: this clue came from a named source, applies to a named authorized target, and only supports the next scoped action.

## What the Workspace Will Ask You To Do

The workspace will ask for a recon log entry:

| Workspace item | What it proves |
| --- | --- |
| Passive source | You can say where the clue came from. |
| Active target | You can keep follow-up inside authorization. |
| Evidence note | You can state what the source actually proves. |
| Confidence | You can avoid turning weak clues into certainty. |
| Next action | You can connect evidence to an allowed step. |

## Your First Ten Minutes

Use this order:

1. Separate passive sources from active checks.
2. Name the authorized lab target before any contact.
3. Write what the evidence proves and what it does not prove.
4. Set confidence honestly.
5. Choose the next action only if it remains in scope.

## Before Writing the Recon Log

Do not treat discovery as permission. You are ready when the work shows a recon log that names source, target, evidence, confidence, and the next authorized step.

## Recon Evidence Model

Passive sources can support a hypothesis without touching the target. Active checks contact the target and require explicit scope.

| Field | Why it matters |
| --- | --- |
| Passive source | Shows where the clue came from |
| Active target | Keeps follow-up inside authorization |
| Evidence note | Records what the source actually proves |
| Confidence | Prevents weak clues from becoming claims |
| Next action | Connects evidence to an allowed step |

## Recon Log

~~~shell
passive_source="public DNS and lab website records"
active_target="lab.local"
evidence_note="public records suggest lab.local is the approved training target"
confidence="medium"
next_authorized_action="run active checks only against the authorized lab target"

printf '%s\\n' "passive_source=$passive_source" "active_target=$active_target" "evidence=$evidence_note" "confidence=$confidence" "next_action=$next_authorized_action"
~~~

## Practice

Build a recon log entry. The goal is to explain source, evidence, confidence, and why the next action is allowed.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What separates passive reconnaissance from active reconnaissance?",
          options: ["Whether the target system is contacted", "Whether the notes are short", "Whether Kali is installed", "Whether the result looks interesting"],
          correct: 0,
          explanation: "Active reconnaissance sends traffic or queries to a target, so it must stay inside scope.",
        },
      ],
    },
    {
      slug: "stage-03",
      title: "Scanning & Enumeration Tools",
      hours: "2-3",
      sortOrder: 3,
      content: `# Scanning & Enumeration Tools

Scanning produces inventory evidence. It does not automatically prove a vulnerability. A professional service note separates host, port, likely service, confidence, and the next safe verification step.

## Start Here: Inventory Before Conclusions

At the start, do not turn scan output into a finding. First name the authorized host, port, likely service, confidence level, and one safe verification step.

A port, banner, or service guess is inventory evidence. It becomes useful when the learner can explain what it proves, what it does not prove, and what still needs verification.

## How to Use This Room Screen

This room is about inventory before conclusions. Read the screen in this order:

- Learn: understand why scan output is a clue, not a verdict.
- Inspect: identify host, port, likely service, confidence, and safe verification.
- Build: write one service inventory row before making a vulnerability claim.
- Prove: explain what still needs verification.

"Practice after the lesson" means the output is only useful if it stays attached to an authorized lab host and a safe next check.

## One Clean Pass Through This Room

Before the workspace, read scanning as an inventory-before-conclusions chain:

1. The authorized host is the only system the row describes.
2. The port is an observed entry point, not a finding.
3. The likely service is a hypothesis from available evidence.
4. The confidence level says how careful the claim should be.
5. The verification step says what safe check comes next.

That chain keeps enumeration from turning into guesswork. Scan output can be noisy, stale, or incomplete; the learner's job is to preserve what was observed and explain what still needs verification.

Do not start by calling the service vulnerable. First say the inventory row in one sentence: host, port, likely service, confidence, and one safe verification step.

## What the Workspace Will Ask You To Do

The workspace will ask for a service inventory row:

| Workspace item | What it proves |
| --- | --- |
| Host | You can name the authorized system being described. |
| Port | You can record the reachable service clue. |
| Likely service | You can describe what the port appears to provide. |
| Confidence | You can avoid overclaiming from a banner or number. |
| Next safe check | You can choose a verification step that stays in scope. |

## Your First Ten Minutes

Use this order:

1. Read the scan result as inventory, not as proof of compromise.
2. Name the authorized host.
3. Record one port and likely service.
4. Add confidence based on evidence quality.
5. Write the next safe check before claiming risk.

## Before Writing the Service Inventory Row

Do not turn an open port into a vulnerability finding. You are ready when the work shows host, port, likely service, confidence, and one authorized verification step.

## Inventory First

Read scan output as a map of visible services.

| Field | Example |
| --- | --- |
| Host | lab.local |
| Port | 443 |
| Likely service | https |
| Confidence | medium |
| Next safe check | verify the banner on the authorized lab host |

## Service Inventory Row

~~~shell
host="lab.local"
port="443"
likely_service="https"
confidence="medium"
next_safe_check="verify the service banner against the authorized lab host"

printf '%s\\n' "host=$host" "port=$port" "service=$likely_service" "confidence=$confidence" "next_check=$next_safe_check"
~~~

## Practice

Create one service inventory row. Explain why a port number or banner is only a clue until verified.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What does an open port prove by itself?",
          options: ["A reachable service may exist", "The host is compromised", "A critical vulnerability exists", "The report is complete"],
          correct: 0,
          explanation: "Open ports are inventory clues. Vulnerability claims require more evidence.",
        },
      ],
    },
    {
      slug: "stage-04",
      title: "Vulnerability Assessment",
      hours: "2-3",
      sortOrder: 4,
      content: `# Vulnerability Assessment

Vulnerability assessment turns signals into actionable findings. A useful finding connects asset, evidence, impact, confidence, and remediation.

## Start Here: Review Before Finding

At the start, do not paste scanner language into a report. First name the affected asset, signal, supporting evidence, impact, and remediation or verification path.

The useful skill is turning a signal into something a defender can check and fix. A finding should be specific enough to act on and careful enough not to overstate the evidence.

## How to Use This Room Screen

This room is about reviewing signals before calling something a finding. Read the screen in this order:

- Learn: understand why scanner output needs human review.
- Inspect: identify asset, signal, evidence, impact, and remediation.
- Build: write one vulnerability triage row a defender could verify.
- Prove: explain why the finding matters and how it can be fixed.

"Practice after the lesson" means you should help a defender act, not repeat a scanner title.

## One Clean Pass Through This Room

Before the workspace, read assessment as a signal-to-finding chain:

1. The affected asset names where the risk lives.
2. The signal names what looked suspicious.
3. The evidence explains why the signal deserves review.
4. The impact says what could happen if the issue is real.
5. The remediation or verification path tells a defender what to do next.

That chain keeps vulnerability work useful. A scanner title by itself is not a finding; the finding has to connect evidence to impact and a fixable next step.

If one link is missing, the row should stay in review instead of becoming a claim.

Do not start by copying scanner language. First say the triage row in one sentence: asset, signal, evidence, impact, and remediation or verification path.

## What the Workspace Will Ask You To Do

The workspace will ask for a vulnerability triage row:

| Workspace item | What it proves |
| --- | --- |
| Asset | You can name what system or service is affected. |
| Signal | You can say what suggested the issue. |
| Evidence | You can describe what supports the finding. |
| Impact | You can explain why a defender should care. |
| Remediation | You can offer a practical fix or verification path. |

## Your First Ten Minutes

Use this order:

1. Read the signal as something to review.
2. Name the affected lab asset.
3. Add evidence that supports the signal.
4. Explain impact without exaggeration.
5. Finish with remediation a defender can verify.

## Before Writing the Vulnerability Triage Row

Do not paste scanner output as a report. You are ready when the work shows asset, signal, evidence, impact, and remediation in defender-facing language.

## From Signal To Finding

Scanner output needs human review. Ask whether the signal is confirmed, what asset is affected, why the issue matters, and what owner action would reduce risk.

| Field | Reviewer question |
| --- | --- |
| Asset | What system or service is affected? |
| Signal | What suggested the issue? |
| Evidence | What supports the finding? |
| Impact | Why should a defender care? |
| Remediation | What practical fix is available? |

## Triage Row

~~~shell
asset="lab-web"
vulnerability_signal="outdated server banner"
evidence="scanner result and service banner both point to an old version"
impact="possible exposure if the version has a matching confirmed weakness"
remediation="update the package and verify the service after patching"

printf '%s\\n' "asset=$asset" "signal=$vulnerability_signal" "evidence=$evidence" "impact=$impact" "remediation=$remediation"
~~~

## Practice

Write a vulnerability triage row. Keep it specific enough that a defender can verify and fix it.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What makes a vulnerability finding useful?",
          options: ["Evidence, impact, and remediation", "Only the scanner title", "A dramatic label", "A list of unrelated tools"],
          correct: 0,
          explanation: "Defenders need proof, impact, and a practical remediation path.",
        },
      ],
    },
    {
      slug: "stage-05",
      title: "Web Application Testing",
      hours: "2-3",
      sortOrder: 5,
      content: `# Web Application Testing

Web testing starts by understanding how the application communicates. The request method, path, parameter, expected response, and observed response become the basis for safe test cases.

## Start Here: Baseline Before Tests

At the start, do not change input until normal behavior is clear. First name the method, request path, user-controlled parameter, expected response, observed response, and next safe test.

The baseline keeps web testing understandable. When the learner knows what normal looks like, unusual behavior can be compared without drifting outside the lab application.

## How to Use This Room Screen

This room is about request shape before payloads. Read the screen in this order:

- Learn: understand how normal web behavior becomes the baseline.
- Inspect: identify method, path, parameter, expected response, observed response, and next safe test.
- Build: write one web test note before changing inputs.
- Prove: explain how the next test stays inside the lab application.

"Practice after the lesson" means you should know normal behavior before testing unusual behavior. The baseline keeps the work safe and understandable.

## One Clean Pass Through This Room

Before the workspace, read web testing as a baseline-before-payloads chain:

1. The method says what kind of request is being made.
2. The path says which application behavior is in scope.
3. The parameter names the user-controlled input.
4. The expected response describes normal behavior.
5. The observed response gives you something to compare before a safe next test.

That chain prevents random payload guessing. If normal behavior is not clear, unusual behavior has no meaning and the test can drift outside the lesson.

Do not start by changing inputs. First say the baseline in one sentence: method, path, parameter, expected response, observed response, and next safe test.

## What the Workspace Will Ask You To Do

The workspace will ask for a web test note:

| Workspace item | What it proves |
| --- | --- |
| HTTP method | You can name the request action. |
| Request path | You can identify the lab endpoint. |
| User parameter | You can spot controllable input. |
| Expected response | You can define normal behavior. |
| Observed response | You can record what actually happened. |
| Next safe test | You can keep follow-up tied to evidence and scope. |

## Your First Ten Minutes

Use this order:

1. Read the request shape before the starter block.
2. Name the method and path.
3. Identify one parameter the user controls.
4. Compare expected and observed behavior.
5. Write a next safe test that stays inside the lab application.

## Before Writing the Web Test Note

Do not change input blindly. You are ready when the work shows method, path, parameter, expected response, observed response, and scoped next safe test.

## Request Shape

Do not change input blindly. First record what the browser sends and what the server returns.

| Field | Purpose |
| --- | --- |
| HTTP method | Shows the request action |
| Request path | Names the endpoint |
| User parameter | Identifies controllable input |
| Expected response | Defines normal behavior |
| Observed response | Captures what happened |
| Next safe test | Keeps the next action tied to evidence |

## Web Test Note

~~~shell
http_method="GET"
request_path="/login"
user_parameter="redirect"
expected_response="login page or safe local redirect"
observed_response="302 redirect to the requested local path"
next_safe_test="validate the redirect stays inside the lab application"

printf '%s\\n' "method=$http_method" "path=$request_path" "parameter=$user_parameter" "expected=$expected_response" "observed=$observed_response" "next_test=$next_safe_test"
~~~

## Practice

Create a web test note that explains normal behavior before proposing a safe follow-up test.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why record expected behavior before changing input?",
          options: ["So test results can be compared against a baseline", "So the request can be ignored", "So cookies can be collected", "So scope can be skipped"],
          correct: 0,
          explanation: "Expected behavior gives the learner a baseline for safe comparison.",
        },
      ],
    },
    {
      slug: "stage-06",
      title: "Exploitation Techniques",
      hours: "3-4",
      sortOrder: 6,
      content: `# Exploitation Techniques

In a professional lab, exploitation is controlled validation of a confirmed weakness. It is not exploration, persistence, or unnecessary impact.

## Start Here: Proof Boundary Before Validation

At the start, do not treat validation as open-ended exploration. First name the confirmed finding, precondition, proof goal, impact limit, stop condition, and cleanup note.

Controlled proof work should answer one narrow question and stop. The plan should say what will not happen just as clearly as what evidence will be captured.

## How to Use This Room Screen

This room is about proof boundaries before proof attempts. Read the screen in this order:

- Learn: understand controlled validation and impact limits.
- Inspect: identify finding, precondition, proof goal, impact limit, stop condition, and cleanup.
- Build: write one controlled proof card before any validation action.
- Prove: explain how the proof minimizes harm and ends cleanly.

"Practice after the lesson" means the weakness is already confirmed enough to plan validation. You are not exploring unrelated systems or escalating beyond the proof goal.

## One Clean Pass Through This Room

Before the workspace, read exploitation as a controlled-proof chain:

1. The confirmed finding names what is being validated.
2. The precondition says what must be true before proof work starts.
3. The proof goal says the narrow evidence you need.
4. The impact limit says what must not happen.
5. The stop condition and cleanup note say when the work ends.

That chain turns exploitation into bounded validation. Professional proof work answers one question, avoids unnecessary impact, and leaves a record that another reviewer can understand.

Do not start by attempting validation. First say the proof boundary in one sentence: finding, precondition, proof goal, impact limit, stop condition, and cleanup.

## What the Workspace Will Ask You To Do

The workspace will ask for a controlled proof card:

| Workspace item | What it proves |
| --- | --- |
| Finding | You can name the confirmed issue being validated. |
| Precondition | You can state authorization and confirmation requirements. |
| Proof goal | You can define the minimum useful evidence. |
| Impact limit | You can say what the proof will not do. |
| Stop condition | You can end activity when the goal is met. |
| Cleanup note | You can remove temporary artifacts after evidence is saved. |

## Your First Ten Minutes

Use this order:

1. Confirm this is an authorized lab validation plan.
2. Name the finding and precondition.
3. Keep the proof goal small.
4. Write impact limits and stop condition before any action.
5. Add cleanup so temporary artifacts do not linger.

## Before Writing the Controlled Proof Card

Do not treat validation as open-ended exploration. You are ready when the work shows finding, precondition, proof goal, impact limit, stop condition, and cleanup note.

## Proof Plan

Before any proof attempt, write what finding is being validated, what must be true first, what the proof should show, and when to stop.

| Field | Boundary |
| --- | --- |
| Finding | The confirmed issue being validated |
| Precondition | Authorization and confirmation requirements |
| Proof goal | The minimum evidence needed |
| Impact limit | What the proof will not do |
| Stop condition | When the activity ends |
| Cleanup note | How temporary artifacts are removed |

## Controlled Proof Card

~~~shell
finding="outdated lab service"
precondition="authorized lab target and confirmed vulnerability signal"
proof_goal="show controlled validation without persistence or data access"
impact_limit="no persistence, no sensitive data access, no lateral movement"
stop_condition="stop after proof output is captured"
cleanup_note="remove temporary proof files from the lab workspace"

printf '%s\\n' "finding=$finding" "precondition=$precondition" "proof_goal=$proof_goal" "impact_limit=$impact_limit" "stop_condition=$stop_condition" "cleanup=$cleanup_note"
~~~

## Practice

Write a controlled proof plan. The plan should show risk while minimizing impact and making the stop condition explicit.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the purpose of a controlled proof in an authorized lab?",
          options: ["Validate a confirmed finding with limited impact", "Explore unrelated systems", "Continue after the goal is met", "Collect unnecessary sensitive data"],
          correct: 0,
          explanation: "Controlled proof validates a specific finding while limiting impact and documenting stop conditions.",
        },
      ],
    },
    {
      slug: "stage-07",
      title: "Wireless Testing Tools",
      hours: "2-3",
      sortOrder: 7,
      content: `# Wireless Testing Tools

Wireless testing uses shared radio space, so scope must be explicit. Nearby networks and unrelated clients are not targets just because they appear in output.

## Start Here: Authorization Before Wireless Capture

At the start, do not treat visible networks as targets. First name the authorized SSID, channel, approved hardware, capture purpose, privacy rule, and cleanup note.

Wireless work needs extra care because unrelated people and devices may be nearby. The lab card should make non-lab networks and clients explicitly out of scope.

## How to Use This Room Screen

This room is about radio scope before wireless capture. Read the screen in this order:

- Learn: understand why nearby does not mean authorized.
- Inspect: identify SSID, channel, approved hardware, capture purpose, privacy rule, and cleanup.
- Build: write one wireless test card before recording or analyzing traffic.
- Prove: explain how the card excludes unrelated networks and clients.

"Practice after the lesson" means the target network must be explicitly authorized. Tool output does not grant permission.

## One Clean Pass Through This Room

Before the workspace, read wireless testing as an authorization-before-capture chain:

1. The authorized SSID names the only network in scope.
2. The channel and approved hardware define the lab setup.
3. The capture purpose says why traffic would be observed.
4. The privacy rule excludes unrelated clients and networks.
5. The cleanup note says how temporary capture evidence is handled.

That chain matters because radio output includes more than the lab. Nearby is not the same as authorized, and visible networks must stay out of the work unless they are explicitly approved.

Do not start by capturing traffic. First say the radio scope in one sentence: authorized SSID, channel, hardware, purpose, privacy rule, and cleanup.

## What the Workspace Will Ask You To Do

The workspace will ask for a wireless test card:

| Workspace item | What it proves |
| --- | --- |
| Authorized SSID | You can name the target network. |
| Channel | You can limit the radio context. |
| Approved hardware | You can confirm the lab adapter. |
| Capture purpose | You can explain why data is recorded. |
| Privacy rule | You can exclude unrelated networks or users. |
| Cleanup note | You can handle temporary capture artifacts. |

## Your First Ten Minutes

Use this order:

1. Read the scope statement before tool details.
2. Name the authorized SSID.
3. Record channel and approved hardware.
4. Write capture purpose and privacy rule.
5. Add cleanup for temporary capture files.

## Before Writing the Wireless Test Card

Do not treat visible networks as targets. You are ready when the work shows authorized SSID, channel, approved hardware, capture purpose, privacy rule, and cleanup note.

## Radio Scope

Document the wireless lab target before capture or analysis.

| Field | Reason |
| --- | --- |
| Authorized SSID | Names the target network |
| Channel | Limits the observed radio context |
| Approved hardware | Confirms the lab adapter |
| Capture purpose | Explains why data is recorded |
| Privacy rule | Excludes unrelated networks or users |
| Cleanup note | Handles temporary capture artifacts |

## Wireless Test Card

~~~shell
authorized_ssid="TDX-LAB"
channel="6"
approved_hardware="lab wireless adapter"
capture_purpose="document authorized lab handshake metadata"
privacy_rule="ignore non-lab networks and unrelated clients"
cleanup_note="delete temporary capture files after evidence notes are saved"

printf '%s\\n' "ssid=$authorized_ssid" "channel=$channel" "hardware=$approved_hardware" "purpose=$capture_purpose" "privacy=$privacy_rule" "cleanup=$cleanup_note"
~~~

## Practice

Create a wireless test card that proves the target network, privacy boundary, and cleanup rule are understood.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What makes a nearby wireless network a valid target?",
          options: ["Explicit authorization", "Strong signal", "A familiar name", "Appearing in a tool list"],
          correct: 0,
          explanation: "Wireless work requires explicit authorization for the specific network.",
        },
      ],
    },
    {
      slug: "stage-08",
      title: "Forensics & Analysis",
      hours: "2-3",
      sortOrder: 8,
      content: `# Forensics & Analysis

Forensic work depends on preservation and careful language. Record what you observed, how you preserved the artifact, what you think it means, and what remains uncertain.

## Start Here: Preservation Before Interpretation

At the start, do not explain evidence before protecting it. First name the evidence item, preservation step, direct observation, interpretation, uncertainty, and next question.

Forensic language should keep facts and conclusions separate. The learner should know what was directly observed before saying what it may mean.

## How to Use This Room Screen

This room is about evidence discipline before interpretation. Read the screen in this order:

- Learn: understand why preservation and careful language matter.
- Inspect: identify artifact, preservation step, observation, interpretation, uncertainty, and next question.
- Build: write one evidence analysis card before turning observations into conclusions.
- Prove: explain what is directly observed and what remains uncertain.

"Practice after the lesson" means the original artifact stays protected while your analysis stays honest about what is known.

## One Clean Pass Through This Room

Before the workspace, read forensics as a preservation-before-interpretation chain:

1. The evidence item names the artifact being handled.
2. The preservation step protects the original from accidental change.
3. The observation records what you can directly see.
4. The interpretation explains what the observation may mean.
5. The uncertainty and next question keep the analysis honest.

That chain protects both the evidence and the learner's conclusion. A careful analyst separates fact from interpretation so another person can review the reasoning.

When the uncertainty is visible, the next analyst can test it instead of inheriting a guess.

That is why the card asks for both what you saw and what you still need to prove.

Do not start by explaining the evidence. First say the evidence chain in one sentence: artifact, preservation step, observation, interpretation, uncertainty, and next question.

## What the Workspace Will Ask You To Do

The workspace will ask for an evidence analysis card:

| Workspace item | What it proves |
| --- | --- |
| Artifact identifier | You can name the evidence item. |
| Preservation step | You can protect the original. |
| Observation | You can record what was directly seen. |
| Interpretation | You can explain what the observation may mean. |
| Uncertainty | You can keep assumptions visible. |
| Next question | You can guide further analysis. |

## Your First Ten Minutes

Use this order:

1. Name the artifact before explaining it.
2. Write how the original is preserved.
3. Separate direct observation from interpretation.
4. Add one uncertainty statement.
5. Finish with the next question the evidence raises.

## Before Writing the Evidence Analysis Card

Do not pretend every observation is proof. You are ready when the work shows artifact, preservation, observation, interpretation, uncertainty, and next question.

## Evidence Discipline

Separate direct observations from interpretations.

| Field | Purpose |
| --- | --- |
| Artifact identifier | Names the evidence item |
| Preservation step | Shows how the original is protected |
| Observation | Records what was directly seen |
| Interpretation | Explains what the observation may mean |
| Uncertainty | Keeps assumptions visible |
| Next question | Guides further analysis |

## Evidence Analysis Card

~~~shell
artifact_id="lab-image-001"
preservation_step="work from a copied artifact and keep the original unchanged"
observation="suspicious login event appears in the lab log"
interpretation="possible unauthorized access attempt in the training scenario"
uncertainty="needs corroborating timestamps from another log source"
next_question="which account and source generated the event"

printf '%s\\n' "artifact=$artifact_id" "preservation=$preservation_step" "observation=$observation" "interpretation=$interpretation" "uncertainty=$uncertainty" "next_question=$next_question"
~~~

## Practice

Write an evidence analysis card. It should preserve the evidence and make uncertainty clear instead of pretending every observation is proof.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why separate observation from interpretation?",
          options: ["So evidence and conclusions stay defensible", "So uncertainty disappears", "So the original artifact can be changed", "So the report can skip context"],
          correct: 0,
          explanation: "Defensible analysis shows what was directly observed and what was inferred.",
        },
      ],
    },
    {
      slug: "stage-09",
      title: "Customizing Kali for Your Workflow",
      hours: "2-3",
      sortOrder: 9,
      content: `# Customizing Kali for Your Workflow

Customization should make lab work repeatable, easier to review, and easier to explain. A personal setup that hides evidence or depends on memory is not a professional workflow.

## Start Here: Repeatability Before Shortcuts

At the start, do not optimize for private shortcuts. First name the workspace layout, note template, tool profile, update habit, backup rule, and reviewer-ready summary.

Customization is useful when another reviewer can understand the setup. The goal is a repeatable lab workflow, not hidden convenience that only works from memory.

## How to Use This Room Screen

This room is about repeatable workflow before personal shortcuts. Read the screen in this order:

- Learn: understand why customization should improve evidence quality.
- Inspect: identify workspace layout, note template, tool profile, update habit, backup rule, and reviewer-ready summary.
- Build: write one workflow checklist before adding aliases or defaults.
- Prove: explain how another reviewer could follow the setup.

"Practice after the lesson" means customization is only useful when it makes lab work clearer, safer, and easier to review.

## One Clean Pass Through This Room

Before the workspace, read customization as a repeatability-before-shortcuts chain:

1. The workspace layout says where lab files and notes belong.
2. The note template says what every run should record.
3. The tool profile says what settings are intentional.
4. The update habit and backup rule keep the setup maintainable.
5. The reviewer-ready summary lets someone else follow the workflow.

That chain keeps customization from becoming private magic. A good setup reduces mistakes, preserves evidence, and helps the next reviewer understand what happened.

Do not start by adding aliases or defaults. First say the workflow checklist in one sentence: layout, note template, tool profile, update habit, backup rule, and reviewer summary.

## What the Workspace Will Ask You To Do

The workspace will ask for a workflow checklist:

| Workspace item | What it proves |
| --- | --- |
| Workspace layout | You can separate notes, evidence, and reports. |
| Note template | You can make each run reproducible. |
| Tool profile | You can document defaults and boundaries. |
| Update habit | You can keep the lab snapshot current. |
| Backup rule | You can protect evidence and notes. |
| Reviewer-ready summary | You can turn practice into useful proof. |

## Your First Ten Minutes

Use this order:

1. Read the workflow checklist before the setup command.
2. Name where notes, evidence, and reports live.
3. Write the note template and tool boundary.
4. Add update and backup habits.
5. Finish with the reviewer-ready summary another person should expect.

## Before Writing the Workflow Checklist

Do not optimize for hidden shortcuts. You are ready when the work shows layout, note template, tool profile, update habit, backup rule, and reviewer-ready summary.

## Workflow Checklist

Design the workstation around notes, evidence, tool purpose, updates, backups, and a reviewer-ready summary.

| Field | Professional reason |
| --- | --- |
| Workspace layout | Keeps notes, evidence, and reports separate |
| Note template | Makes every run reproducible |
| Tool profile | Documents defaults and boundaries |
| Update habit | Keeps the lab snapshot current |
| Backup rule | Protects evidence and notes |
| Reviewer-ready summary | Turns practice into useful proof |

## Repeatable Setup

~~~shell
workspace_layout="/tmp/tdx-kali-lab/notes-evidence-reports"
note_template="target purpose output next-action"
tool_profile="safe aliases and defaults for authorized lab targets only"
update_habit="update the lab snapshot before a new practice block"
backup_rule="export notes and evidence after each lab"
reviewer_summary="finding summary with evidence, impact, and remediation"

mkdir -p "$workspace_layout"
printf '%s\\n' "workspace_layout=$workspace_layout" "note_template=$note_template" "tool_profile=$tool_profile" "update_habit=$update_habit" "backup_rule=$backup_rule" "reviewer_summary=$reviewer_summary"
~~~

## Practice

Create a workflow checklist that another reviewer could follow. The checklist should reduce mistakes and make reporting easier.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should Kali customization improve?",
          options: ["Repeatability and evidence quality", "Hidden shortcuts", "Unreviewed tool use", "Untracked files"],
          correct: 0,
          explanation: "Professional customization supports reproducible notes, evidence, and reporting.",
        },
      ],
    },
  ],
};
