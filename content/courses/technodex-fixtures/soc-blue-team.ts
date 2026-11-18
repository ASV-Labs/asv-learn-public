export const SOC_BLUE_TEAM_COURSE = {
  slug: "soc-blue-team",
  title: "SOC & Blue Team",
  description:
    "Practice defensive security operations: triage alerts, read SIEM evidence, map threat intelligence, operate incidents, preserve evidence, and hunt for suspicious behavior.",
  icon: "BT",
  difficulty: "Intermediate",
  hours: "18-24",
  topics: ["SOC Operations", "Threat Hunting", "SIEM", "Incident Response"],
  certBadges: ["SOC Analyst", "Incident Handler"],
  stages: [
    {
      slug: "stage-01",
      title: "SOC Fundamentals and the Analyst Role",
      hours: "2-3",
      sortOrder: 1,
      content: `# SOC Fundamentals and the Analyst Role

A SOC analyst does not guess from one alert. The job is to gather enough context to decide whether an event should close, be monitored, or escalate.

## Start Here: Alert Before Verdict

At the start, do not try to prove a breach from one noisy signal. Read the alert like a work ticket: who or what is involved, what evidence exists, what is missing, and what decision the next analyst should be able to trust.

You are not building a full incident case yet. You are practicing the first professional move: separate facts from assumptions before anyone escalates.

## How to Use This Room Screen

This room is about slowing the alert down before deciding. Read the screen in this order:

- Learn: understand the analyst role and the difference between facts and assumptions.
- Inspect: identify the user, source, severity, evidence, and missing context.
- Build: write one triage note a second analyst could trust.
- Prove: explain why the next action follows from the evidence.

"Practice after the lesson" means you should know what the alert actually says before writing a verdict. If you feel pulled toward "compromised" or "safe" too early, return to the evidence fields first.

## One Clean Pass Through This Room

Before the workspace, slow the alert into a simple analyst chain:

1. The alert names a signal, not a conclusion.
2. The user or asset tells you who may be affected.
3. The source tells you where the activity appears to come from.
4. The evidence tells you what actually happened.
5. The missing context tells you what you still cannot claim.
6. The next action turns the evidence into calm follow-up work.

That chain keeps the note useful. A good Tier 1 note does not sound dramatic. It helps the next analyst see what is known, what is unknown, and why the chosen action is reasonable.

| Question to answer | What it protects |
| --- | --- |
| What did the alert actually say? | The note does not outrun the evidence. |
| Who or what is involved? | The next analyst knows where to look. |
| What is missing? | Assumptions stay visible instead of hidden. |
| How urgent is it? | Severity stays tied to evidence, not fear. |
| What should happen next? | The queue gets a clear close, monitor, or escalate decision. |

Do not start by writing a verdict. First say the alert in one plain sentence: this signal happened to this user or asset, from this source, with this evidence, and the next action is this because of that evidence.

## What the Workspace Will Ask You To Do

The workspace will ask for a triage note, not a full incident report:

| Workspace item | What it proves |
| --- | --- |
| Alert user | You can name the affected account or entity. |
| Source IP | You can preserve where the activity appears to come from. |
| Severity | You can set urgency without exaggerating certainty. |
| Evidence | You can state the observed signal. |
| Next action | You can choose monitor, close, or escalate with a reason. |

## Your First Ten Minutes

Use this order:

1. Read the alert as a ticket, not as a conclusion.
2. Separate observed facts from guesses.
3. Name what is missing before escalation.
4. Write the triage note in one pass.
5. Check that the next action is supported by the evidence.

## Before Writing the Triage Note

Do not write drama or certainty the evidence does not support. You are ready when the work shows a calm analyst note with facts, missing context, and a defensible next action.

## Alert Anatomy

Start with the facts the queue gives you.

| Field | Why it matters |
| --- | --- |
| Alert user | Names the account tied to the event |
| Source IP | Shows where activity appears to come from |
| Severity | Sets urgency without exaggeration |
| Evidence | Records why the event matters |
| Next action | Connects the decision to work someone can do |

## Triage Note

~~~shell
alert_user="alex"
source_ip="10.0.3.44"
severity="medium"
evidence="failed login followed by login success from the same source"
next_action="monitor user activity and escalate if failures repeat"

printf '%s\\n' "user=$alert_user" "source_ip=$source_ip" "severity=$severity" "evidence=$evidence" "next_action=$next_action"
~~~

## Practice

Create a triage note that separates signal, context, severity, and the next analyst action. The point is disciplined reasoning, not dramatic wording.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should a Tier 1 analyst do before escalating an alert?",
          options: ["Collect context and evidence", "Assume compromise", "Delete the alert", "Restart the user's computer"],
          correct: 0,
          explanation: "Escalation should be backed by user, source, evidence, severity, and missing context.",
        },
      ],
    },
    {
      slug: "stage-02",
      title: "SIEM Fundamentals and Log Analysis",
      hours: "3-4",
      sortOrder: 2,
      content: `# SIEM Fundamentals and Log Analysis

A SIEM is useful because it makes events searchable and comparable. Analysts still have to define what question the query answers.

## Start Here: Question Before Query

At the start, do not treat a SIEM search as magic. First name the log source, the fields you need, the pattern you are testing, the false-positive check, and the condition that would make the alert worth escalating.

A good search plan keeps the analyst honest: the query should answer one clear question, not produce noise that feels important because it has many results.

## How to Use This Room Screen

This room is about planning the search before touching query syntax. Read the screen in this order:

- Learn: understand what a SIEM can and cannot prove from logs.
- Inspect: name the log source, fields, pattern, and normal behavior that could explain the alert.
- Build: write one SIEM search plan before trying to write a query.
- Prove: explain when the result should close, monitor, or escalate.

"Practice after the lesson" means you should know the search question before writing command-shaped text. If the query goal is fuzzy, the output will be fuzzy too.

## One Clean Pass Through This Room

Before the workspace, read SIEM work as a question-before-query chain:

1. The log source says where the evidence comes from.
2. The query goal says what behavior is being tested.
3. The filter fields keep the search focused.
4. The suspicious pattern says what deserves review.
5. The false-positive check and escalation note say when to close, monitor, or hand off.

That chain keeps SIEM work from becoming noisy searching. A useful query starts with an analyst question and ends with a decision another analyst can review.

Do not start by writing query syntax. First say the search plan in one sentence: source, goal, fields, suspicious pattern, false-positive check, and escalation condition.

## What the Workspace Will Ask You To Do

The workspace will ask for a search plan, not a production SIEM rule:

| Workspace item | What it proves |
| --- | --- |
| Log source | You can name where the evidence comes from. |
| Query goal | You can state what behavior the search is testing. |
| Filter fields | You can keep the search focused. |
| Suspicious pattern | You can describe what would deserve review. |
| False-positive check | You can explain what normal behavior could look similar. |
| Escalation note | You can name when another analyst should pick it up. |

## Your First Ten Minutes

Use this order:

1. Read the alert question before looking at the shell block.
2. Name the log source and the behavior being tested.
3. Pick only the fields that help answer the question.
4. Add one normal explanation that could reduce urgency.
5. Write the search plan and check whether escalation follows from it.

## Before Writing the SIEM Search Plan

Do not start by inventing a clever query. You are ready when the work shows a focused plan with source, goal, fields, suspicious pattern, false-positive check, and escalation condition.

## Query Before Conclusion

Good SIEM work names the source, the field filters, the pattern, and one reason the alert might be benign.

| Field | Analyst question |
| --- | --- |
| Log source | Where did the evidence come from? |
| Query goal | What behavior is being tested? |
| Filter fields | Which fields keep the search focused? |
| Suspicious pattern | What would make this worth review? |
| False-positive check | What normal activity could explain it? |

## SIEM Search Plan

~~~shell
log_source="windows authentication logs"
query_goal="find repeated failed logins followed by a success"
filter_fields="user src_ip event_id time"
suspicious_pattern="more than five failures then one success in ten minutes"
false_positive_check="check VPN reconnects and known password reset window"
escalation_note="escalate if source_ip is unusual or user reports no login"

printf '%s\\n' "$log_source" "$query_goal" "$filter_fields" "$suspicious_pattern" "$false_positive_check" "$escalation_note"
~~~

## Practice

Write a SIEM search plan before writing a query. The plan should explain the source, fields, pattern, false-positive check, and escalation condition.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why should a SIEM query include a false-positive check?",
          options: ["To avoid treating normal behavior as an incident", "To hide weak evidence", "To reduce log retention", "To skip investigation"],
          correct: 0,
          explanation: "False-positive checks help analysts avoid unnecessary escalation while preserving evidence.",
        },
      ],
    },
    {
      slug: "stage-03",
      title: "Threat Intelligence and MITRE ATT&CK",
      hours: "3-4",
      sortOrder: 3,
      content: `# Threat Intelligence and MITRE ATT&CK

Threat intelligence helps analysts connect local evidence to known attacker behavior. MITRE ATT&CK gives that behavior a shared vocabulary.

## Start Here: Local Evidence Before Intel Labels

At the start, do not paste an ATT&CK technique onto an alert just because the name sounds familiar. First name the source, indicator, mapped technique, confidence, local evidence, and detection action.

Threat intelligence should change what the SOC does next. The point is to turn outside reporting into a local search, detection improvement, or investigation step that fits the evidence.

## How to Use This Room Screen

This room is about turning intel into a local SOC action. Read the screen in this order:

- Learn: understand how ATT&CK names attacker goals and techniques.
- Inspect: separate the intel source, tactic, technique, indicator, and confidence.
- Build: write one threat-intel card that changes a detection or hunt action.
- Prove: explain why the mapping is useful to your SOC, not just interesting.

"Practice after the lesson" means you should keep the evidence tied to the lab scenario. A famous technique name is not proof by itself.

## One Clean Pass Through This Room

Before the workspace, read threat intelligence as a local-evidence-before-label chain:

1. The intel source says where the outside claim came from.
2. The local indicator says what appears in your environment.
3. The tactic and technique give the behavior a shared name.
4. The confidence level keeps weak intel from becoming certainty.
5. The detection action turns the mapping into SOC work.

That chain keeps intelligence useful. ATT&CK labels are helpful only when they explain local evidence and improve a search, rule, or hunt.

Do not start by pasting an ATT&CK label. First say the intel card in one sentence: source, local indicator, tactic, technique, confidence, and detection action.

## What the Workspace Will Ask You To Do

The workspace will ask for a threat-intel card:

| Workspace item | What it proves |
| --- | --- |
| Intel source | You can say where the claim came from. |
| ATT&CK tactic | You can name the attacker's broad goal. |
| Technique | You can map behavior to a shared label. |
| Indicator | You can preserve the search or block value. |
| Confidence | You can avoid overstating weak intel. |
| Detection action | You can turn intel into defensive work. |

## Your First Ten Minutes

Use this order:

1. Read the local evidence before the ATT&CK label.
2. Name the source of the intelligence.
3. Map the behavior to one tactic and one technique.
4. Decide how confident the SOC should be.
5. Write the detection action that follows from the card.

## Before Writing the Threat-Intel Card

Do not paste indicators into a block list without context. You are ready when the work shows a card that connects source, technique, confidence, and one concrete SOC action.

## Intelligence Card

Do not paste indicators blindly into a block list. First explain source, tactic, technique, confidence, and the detection action.

| Field | Purpose |
| --- | --- |
| Intel source | Shows where the claim came from |
| ATT&CK tactic | Names the attacker's goal |
| Technique | Names the observed behavior |
| Indicator | Gives the search or block value |
| Confidence | Prevents weak intel from becoming certainty |
| Detection action | Turns intel into SOC work |

## ATT&CK Mapping

~~~shell
intel_source="trusted threat report"
mapped_tactic="credential access"
attack_technique="T1110 brute force"
indicator_value="10.0.3.44 repeated failed logins"
confidence="medium"
detection_action="hunt for the same source_ip across authentication logs"

printf '%s\\n' "$intel_source" "$mapped_tactic" "$attack_technique" "$indicator_value" "$confidence" "$detection_action"
~~~

## Practice

Build a short threat-intel card. Keep the evidence local and explain how the mapped technique changes the next SOC action.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What does ATT&CK help analysts standardize?",
          options: ["Adversary behavior and technique names", "Employee schedules", "Ticket colors", "Cloud billing"],
          correct: 0,
          explanation: "ATT&CK gives teams common names for attacker tactics and techniques.",
        },
      ],
    },
    {
      slug: "stage-04",
      title: "Incident Response from Detection to Containment",
      hours: "3-4",
      sortOrder: 4,
      content: `# Incident Response from Detection to Containment

Incident response turns a confirmed security event into controlled action. The early priority is to preserve evidence while reducing harm.

## Start Here: Containment Before Recovery

At the start, do not jump from alert to cleanup. First name the trigger, severity, containment step, evidence to preserve, recovery step, communication owner, and lesson learned.

Response work is useful when the order is defensible. Containment limits current harm, evidence preserves facts, and recovery returns the environment to safe operation.

## How to Use This Room Screen

This room is about controlled response, not panic. Read the screen in this order:

- Learn: understand why response starts with severity, asset impact, and evidence preservation.
- Inspect: identify what is affected, what must be contained, and what must be preserved.
- Build: write one containment plan with recovery and communication separated.
- Prove: explain why the plan reduces harm without destroying useful evidence.

"Practice after the lesson" means the event is already suspicious enough to plan containment. You are not proving the whole case in this room.

## One Clean Pass Through This Room

Before the workspace, read response as a containment-before-recovery chain:

1. The trigger and severity say why response is needed now.
2. The affected asset says where harm could continue.
3. The containment step reduces current risk.
4. The evidence list preserves facts before recovery changes the system.
5. The recovery step and communication owner make the handoff safe.

That chain keeps response from becoming panic cleanup. The team should reduce harm while preserving enough evidence to understand scope and cause.

Do not start by rebuilding the asset. First say the containment plan in one sentence: trigger, severity, affected asset, containment, evidence, recovery, and communication owner.

## What the Workspace Will Ask You To Do

The workspace will ask for a containment plan:

| Workspace item | What it proves |
| --- | --- |
| Incident severity | You can set response speed. |
| Affected asset | You can name what is at risk. |
| Containment step | You can reduce harm or spread. |
| Evidence to preserve | You can keep facts available for scope and cause. |
| Recovery step | You can restore safer operation after preservation. |
| Communication owner | You can keep the handoff clear. |

## Your First Ten Minutes

Use this order:

1. Confirm this is a response plan, not a triage note.
2. Name the affected asset and why it matters.
3. Choose the containment step before recovery.
4. List evidence that should survive the response.
5. Write the owner who coordinates communication.

## Before Writing the Containment Plan

Do not jump straight to wiping or rebuilding. You are ready when the work shows a plan that contains the risk, preserves evidence, names recovery, and keeps ownership clear.

## Response Frame

An incident note should make urgency, asset impact, containment, evidence, recovery, and communication visible.

| Field | Reason |
| --- | --- |
| Incident severity | Sets response speed |
| Affected asset | Names what is at risk |
| Containment step | Stops spread or misuse |
| Evidence to preserve | Keeps facts available |
| Recovery step | Restores safer operation |
| Communication owner | Keeps handoff clear |

## Containment Plan

~~~shell
incident_severity="high"
affected_asset="workstation alex-laptop"
containment_step="isolate host from network using EDR quarantine"
evidence_to_preserve="authentication logs process list network connections"
recovery_step="reset password and reimage host after evidence capture"
communication_owner="SOC incident lead"

printf '%s\\n' "$incident_severity" "$affected_asset" "$containment_step" "$evidence_to_preserve" "$recovery_step" "$communication_owner"
~~~

## Practice

Draft a containment plan for a confirmed suspicious login. Include what gets preserved before recovery work begins.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why preserve evidence before recovery?",
          options: ["So the team can understand scope and cause", "So the alert looks longer", "So containment is delayed forever", "So logs can be deleted"],
          correct: 0,
          explanation: "Evidence supports scope, root cause, and better future detection.",
        },
      ],
    },
    {
      slug: "stage-05",
      title: "Digital Forensics and Malware Analysis",
      hours: "3-4",
      sortOrder: 5,
      content: `# Digital Forensics and Malware Analysis

Forensics asks what happened. Malware analysis asks how suspicious code behaves. SOC analysts need enough structure to preserve evidence and ask the right analysis question.

## Start Here: Evidence Handling Before Analysis

At the start, do not analyze evidence before you can trust where it came from. First name the evidence id, acquisition method, chain of custody, hash, analysis question, and handling rule.

Forensic work depends on evidence discipline. If the evidence item cannot be traced and protected, the conclusion is weaker no matter how interesting the analysis looks.

## How to Use This Room Screen

This room is about evidence handling before analysis. Read the screen in this order:

- Learn: understand why traceability and integrity matter.
- Inspect: identify the evidence item, collection method, handler, hash, question, and handling rule.
- Build: write one forensic note that makes the artifact trustworthy.
- Prove: explain how the note protects both the evidence and the analyst.

"Practice after the lesson" means you should not execute or improvise with unknown samples. The first win is preserving a trustworthy copy and asking one clear analysis question.

## One Clean Pass Through This Room

Before the workspace, read forensics as an evidence-handling-before-analysis chain:

1. The evidence id makes the artifact traceable.
2. The acquisition method explains how it was collected.
3. The chain of custody says who handled it.
4. The hash value supports integrity checks.
5. The analysis question and handling rule keep the work focused and safe.

That chain protects both the evidence and the analyst. Interesting behavior is not useful if the artifact cannot be trusted or the handling rule creates new risk.

Do not start by opening or executing the sample. First say the forensic note in one sentence: evidence id, acquisition method, custody, hash, analysis question, and handling rule.

## What the Workspace Will Ask You To Do

The workspace will ask for a forensic note:

| Workspace item | What it proves |
| --- | --- |
| Evidence ID | You can make the artifact traceable. |
| Acquisition method | You can explain how it was collected. |
| Chain of custody | You can name who handled it. |
| Hash value | You can support integrity checks. |
| Analysis question | You can keep the work focused. |
| Handling rule | You can protect evidence and people. |

## Your First Ten Minutes

Use this order:

1. Name the evidence item before discussing what it might mean.
2. Record how it was acquired.
3. Add custody and hash information.
4. Write one analysis question.
5. Add a handling rule that prevents unsafe execution or evidence damage.

## Before Writing the Forensic Note

Do not treat the sample like ordinary code or an ordinary file. You are ready when the work shows traceable evidence, preserved integrity, one analysis question, and a safe handling rule.

## Evidence Handling

Forensic work is weaker if the artifact cannot be trusted. Track identifier, acquisition method, custody, hash, question, and handling rule.

| Field | Purpose |
| --- | --- |
| Evidence ID | Makes the artifact traceable |
| Acquisition method | Explains how it was collected |
| Chain of custody | Names who handled it |
| Hash value | Proves it did not change |
| Analysis question | Keeps the work focused |
| Handling rule | Protects evidence and people |

## Forensic Note

~~~shell
evidence_id="host-alex-memory-001"
acquisition_method="approved EDR memory capture"
chain_of_custody="collected by SOC analyst and stored in evidence vault"
hash_value="sha256 recorded before analysis"
analysis_question="identify suspicious process and network destination"
handling_rule="analyze copy only and do not execute unknown sample on workstation"

printf '%s\\n' "$evidence_id" "$acquisition_method" "$chain_of_custody" "$hash_value" "$analysis_question" "$handling_rule"
~~~

## Practice

Write a forensic note that proves the artifact is traceable, preserved, and tied to one analysis question.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What does a hash value help prove?",
          options: ["The evidence has not changed", "The file is always malicious", "The analyst owns the system", "The incident is closed"],
          correct: 0,
          explanation: "A recorded hash helps verify evidence integrity during handling and analysis.",
        },
      ],
    },
    {
      slug: "stage-06",
      title: "Threat Hunting and Advanced Detection",
      hours: "3-4",
      sortOrder: 6,
      content: `# Threat Hunting and Advanced Detection

Threat hunting starts with a hypothesis. The analyst assumes automated alerts may miss quiet attacker behavior, then searches approved data for evidence.

## Start Here: Hypothesis Before Hunting

At the start, do not browse logs until something looks suspicious. First write the hunt hypothesis, data source, lookback window, expected pattern, validation step, and detection update.

A hunt is not random searching. It is a testable question that can either find evidence, rule out the behavior for now, or improve a future detection.

## How to Use This Room Screen

This room is about testing a hunt idea. Read the screen in this order:

- Learn: understand how a hypothesis makes a hunt repeatable.
- Inspect: name the data source, query pattern, anomaly signal, and decision path.
- Build: write one hunt plan before treating the idea as a finding.
- Prove: explain whether the result should close, monitor, escalate, or improve detection.

"Practice after the lesson" means the hunt starts as a question. A hunt becomes useful when another analyst can repeat it and understand the decision.

## One Clean Pass Through This Room

Before the workspace, read hunting as a hypothesis-before-searching chain:

1. The hypothesis says what behavior might exist.
2. The data source says where approved evidence can be found.
3. The query pattern makes the search repeatable.
4. The anomaly signal says what would matter.
5. The finding decision and detection update turn the result into SOC action.

That chain keeps hunting from becoming log browsing. A hunt should be testable enough to find evidence, rule out the idea for now, or improve future coverage.

Do not start by browsing logs. First say the hunt plan in one sentence: hypothesis, source, pattern, anomaly, decision, and detection update.

## What the Workspace Will Ask You To Do

The workspace will ask for a hunt plan:

| Workspace item | What it proves |
| --- | --- |
| Hunt hypothesis | You can state the behavior you are testing. |
| Data source | You can name where evidence can be found. |
| Query pattern | You can make the search repeatable. |
| Anomaly signal | You can define what would look suspicious. |
| Finding decision | You can choose close, monitor, or escalate. |
| Detection update | You can turn learning into better coverage. |

## Your First Ten Minutes

Use this order:

1. Write the hypothesis as a testable sentence.
2. Name the approved data source.
3. Describe the query pattern in plain language.
4. Decide what anomaly would matter.
5. End with a decision or a detection improvement.

## Before Writing the Hunt Plan

Do not call the idea a finding before evidence supports it. You are ready when the work shows a repeatable hypothesis, source, pattern, anomaly signal, decision, and detection update.

## Hunt Structure

A hunt should be testable. Name the hypothesis, data source, pattern, anomaly signal, decision, and detection update.

| Field | Purpose |
| --- | --- |
| Hunt hypothesis | States what behavior might exist |
| Data source | Names where evidence can be found |
| Query pattern | Makes the search repeatable |
| Anomaly signal | Defines suspicious difference |
| Finding decision | Close, monitor, or escalate |
| Detection update | Turns learning into coverage |

## Hunt Plan

~~~shell
hunt_hypothesis="compromised account is logging in from a rare source after failures"
data_source="authentication logs and VPN logs"
query_pattern="group by user source_ip and hour then sort rare successful logins"
anomaly_signal="success after repeated failures from a source not seen before"
finding_decision="monitor and escalate if the user confirms no login"
detection_update="add SIEM rule for rare source success after failure burst"

printf '%s\\n' "$hunt_hypothesis" "$data_source" "$query_pattern" "$anomaly_signal" "$finding_decision" "$detection_update"
~~~

## Practice

Create a hunt plan that starts with a hypothesis and ends with either a decision or a detection improvement.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What makes threat hunting different from alert triage?",
          options: ["It proactively searches for behavior that may not have alerted", "It ignores evidence", "It only reads tickets", "It avoids hypotheses"],
          correct: 0,
          explanation: "Threat hunting proactively searches for suspicious behavior using a testable hypothesis.",
        },
      ],
    },
  ],
};
