export const SECURITY_PLUS_COURSE = {
  slug: "security-plus",
  title: "CompTIA Security+",
  description:
    "Build practical SY0-701 fundamentals: general security concepts, threats and mitigations, security architecture, security operations, and program oversight—plus exam-mindset practice.",
  icon: "S+",
  difficulty: "Beginner",
  hours: "25-30",
  topics: ["Security Foundations", "Risk Management", "Access Control", "Incident Response"],
  certBadges: ["Security Foundations"],
  stages: [
    {
      slug: "domain-01",
      title: "Domain 1: General Security Concepts",
      hours: "5-6",
      sortOrder: 1,
      content: `# General Security Concepts

Security+ starts with shared vocabulary: CIA thinking, control types, and a risk chain that keeps answers coherent. A useful analysis names the actor, the path they used, the weakness they depended on, the impact, and the control that reduces the risk.

## Start Here: Concepts Before Tools

At the start, do not try to memorize every attack name. Read a security situation as a chain: who can cause harm, how they reach the asset, what weakness helps them, what damage could happen, and what control reduces the risk.

You are not choosing products yet. You are learning the habit that keeps Security+ answers practical: connect every security word to a cause, a path, a weakness, an impact, or a response.

## How to Use This Room Screen

This room is about reading a security situation before choosing a tool. Read the screen in this order:

- Learn: understand the risk chain terms in plain language.
- Inspect: match each term to one part of the scenario.
- Build: write one classification row, not a product recommendation.
- Prove: explain why the control connects to the weakness.

"Practice after the lesson" means you should understand the risk chain before writing the row. If the terms feel similar, ask which word names the actor, which word names the path, which word names the weakness, and which word names the response.

## One Clean Pass Through This Room

Before the workspace, read the scenario as a risk-classification chain:

1. The threat actor names who or what can cause harm.
2. The attack vector names the path into the target.
3. The vulnerability names the weakness that makes success easier.
4. The impact names what could go wrong.
5. The control names the response that reduces likelihood or damage.

That chain is the Security+ skill. A good answer does not pile up vocabulary; it connects each word to a specific part of the situation so the response makes sense.

If a scenario feels abstract, slow it down and fill one link at a time. Missing links are the clue that the answer is still guessing.

Do not start by naming tools or products. First say the chain in one sentence: actor, path, weakness, impact, and control.

## What the Workspace Will Ask You To Do

The workspace will give you a small security scenario and ask for a structured classification:

| Workspace item | What it proves |
| --- | --- |
| Threat actor | You can name who or what can cause harm. |
| Attack vector | You can identify how the attempt reaches the target. |
| Vulnerability | You can separate the weakness from the attack. |
| Impact | You can name what harm could happen. |
| Control | You can choose a response tied to the weakness. |

## Your First Ten Minutes

Use this order:

1. Read the scenario without naming a tool.
2. Circle the actor, path, weakness, impact, and response.
3. Fill the table in plain English.
4. Check whether the control actually reduces the weakness.
5. Rewrite any generic security word into a specific evidence sentence.

## Before Writing the Classification Row

Do not answer with a list of products or acronyms. You are ready when the work shows a clear risk chain: cause, path, weakness, impact, and response.

## The Security Chain

Use this chain before choosing a control:

| Field | Question | Example |
| --- | --- | --- |
| Threat actor | Who or what can cause harm? | Phishing sender |
| Attack vector | How does the attempt reach the target? | Email link |
| Vulnerability | What weakness makes success possible? | Reused password without MFA |
| Impact | What could happen if it succeeds? | Account takeover |
| Control | What reduces likelihood or impact? | MFA and reporting workflow |

The point is not to memorize terms. The point is to avoid mixing up cause, path, weakness, and response.

## Scenario Reading

A user reports an email that links to a fake login page. The account uses a reused password and no second factor. The first useful response is not a tool. It is a clear classification of the risk chain.

~~~shell
threat_actor="phishing sender"
attack_vector="email link"
vulnerability="user password reused without MFA"
impact="account takeover risk"
control="MFA plus user reporting workflow"
~~~

## Practice

Write one incident classification row. Keep the control connected to the weakness, not just to a generic security word.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Which field describes the weakness that makes an attack more likely to succeed?",
          options: ["Vulnerability", "Threat actor", "Impact", "Asset owner"],
          correct: 0,
          explanation: "A vulnerability is the weakness. The actor uses a vector and the impact describes harm.",
        },
      ],
    },
    {
      slug: "domain-02",
      title: "Domain 2: Threats, Vulnerabilities, and Mitigations",
      hours: "5-6",
      sortOrder: 2,
      content: `# Threats, Vulnerabilities, and Mitigations

Domain 1 gave you the risk-chain vocabulary. Here you practice classifying actor types, attack paths, weakness categories, and the mitigations that actually reduce those weaknesses—still without shopping for vendors by brand.

## Start Here: Classify Before You Mitigate

Keep the Domain 1 chain, then emphasize mitigation fit. Name the actor and path, separate the vulnerability from the impact, and choose a control that hits the named weakness—not a generic “more security” product.

You are connecting threat language to a mitigation that fits. A strong answer shows why that control reduces this weakness.

## How to Use This Room Screen

This room is about threat classification before mitigation choice. Read the screen in this order:

- Learn: reuse risk-chain terms with a mitigation focus.
- Inspect: match actor, vector, vulnerability, impact, and mitigation.
- Build: write one classification row tied to a specific weakness.
- Prove: explain why the mitigation reduces that weakness.

"Practice after the lesson" means you should classify the threat path before naming a fix.

## One Clean Pass Through This Room

Before the workspace, read the scenario as a threat-to-mitigation chain:

1. The threat actor names who or what can cause harm.
2. The attack vector names the path into the target.
3. The vulnerability names the weakness that makes success easier.
4. The impact names what could go wrong.
5. The mitigation names the control that reduces likelihood or damage.

That chain keeps Domain 2 practical. A good answer does not pile up attack names; it connects each word to a specific part of the situation so the mitigation makes sense.

Do not start by naming tools or products. First say the chain in one sentence: actor, path, weakness, impact, and mitigation.

## What the Workspace Will Ask You To Do

The workspace will give you a small security scenario and ask for a structured classification:

| Workspace item | What it proves |
| --- | --- |
| Threat actor | You can name who or what can cause harm. |
| Attack vector | You can identify how the attempt reaches the target. |
| Vulnerability | You can separate the weakness from the attack. |
| Impact | You can name what harm could happen. |
| Mitigation | You can choose a response tied to the weakness. |

## Your First Ten Minutes

Use this order:

1. Read the scenario without naming a tool.
2. Circle the actor, path, weakness, impact, and mitigation.
3. Fill the table in plain English.
4. Check whether the mitigation actually reduces the weakness.
5. Rewrite any generic security word into a specific evidence sentence.

## Before Writing the Classification Row

Do not answer with a list of products or acronyms. You are ready when the work shows a clear threat-to-mitigation chain: cause, path, weakness, impact, and response.

## Threat-to-Mitigation Chain

Use this chain before choosing a mitigation:

| Field | Question | Example |
| --- | --- | --- |
| Threat actor | Who or what can cause harm? | Phishing sender |
| Attack vector | How does the attempt reach the target? | Email link |
| Vulnerability | What weakness makes success possible? | Reused password without MFA |
| Impact | What could happen if it succeeds? | Account takeover |
| Mitigation | What reduces likelihood or impact? | MFA and reporting workflow |

The point is not to memorize attack catalogs. The point is to keep actor, path, weakness, and mitigation separate.

## Scenario Reading

A user reports an email that links to a fake login page. The account uses a reused password and no second factor. The first useful response is not a tool. It is a clear classification of the threat path and a mitigation that fits the weakness.

~~~shell
threat_actor="phishing sender"
attack_vector="email link"
vulnerability="user password reused without MFA"
impact="account takeover risk"
mitigation="MFA plus user reporting workflow"
~~~

## Practice

Write one threat-classification row. Keep the mitigation connected to the weakness, not just to a generic security word.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Which field describes the weakness that makes an attack more likely to succeed?",
          options: ["Vulnerability", "Threat actor", "Impact", "Asset owner"],
          correct: 0,
          explanation: "A vulnerability is the weakness. The actor uses a vector and the impact describes harm.",
        },
      ],
    },
    {
      slug: "domain-03",
      title: "Domain 3: Security Architecture",
      hours: "5-6",
      sortOrder: 3,
      content: `# Security Architecture

Security architecture is the habit of placing controls where failure would matter. A design is stronger when it names assets, trust boundaries, layers, data protection, and availability needs before choosing products—including identity, authorization, and crypto as placement decisions, not a shopping list.

## Start Here: Boundaries Before Products

At the start, do not jump to a firewall, cloud service, or vendor name. First name the asset, where trust changes, what kind of control belongs there, what data needs protection, and what must stay available.

A good Security+ design answer is not a shopping list. It is a map that explains why each control belongs at a specific boundary and how the design would still protect the service if one layer failed.

## How to Use This Room Screen

This room is about design reasoning before product choice. Read the screen in this order:

- Learn: understand what each boundary and control layer protects.
- Inspect: match the asset, trust boundary, encryption rule, and availability need.
- Build: write one design card, not a shopping list of tools.
- Prove: explain how each control reduces a specific risk.

"Practice after the lesson" means you should understand where the security decision belongs before writing the design card.

## One Clean Pass Through This Room

Before the workspace, read architecture as a boundary-before-products chain:

1. The asset zone says what must keep working and stay protected.
2. The trust boundary says where identity, network, or assumptions change.
3. The control layers say how prevention, detection, and correction share the job.
4. The encryption rule says what data needs protection.
5. The availability control says how the service stays usable when something fails.

That chain keeps design work practical. A strong answer does not start with a product name; it explains where risk changes and why a control belongs there.

Do not start by naming vendors or tools. First say the design in one sentence: asset, boundary, control layers, encryption rule, availability control, and validation note.

## What the Workspace Will Ask You To Do

The workspace will ask for a small architecture card:

| Workspace item | What it proves |
| --- | --- |
| Asset zone | You can name what is being protected. |
| Trust boundary | You can identify where assumptions change. |
| Control layers | You can separate preventive, detective, and corrective safeguards. |
| Encryption rule | You can explain which data needs protection. |
| Availability control | You can keep security tied to usable service. |

## Your First Ten Minutes

Use this order:

1. Read the protected asset before picking controls.
2. Name where trust changes.
3. Match each control to one risk.
4. Write the design card in plain language.
5. Check whether the validation note proves the design fits the risk.

## Before Writing the Design Card

Do not answer with vendor names. You are ready when the work shows a clear asset, boundary, layered controls, data-protection rule, availability control, and validation note.

## Start With Boundaries

Every useful design card answers these questions:

| Field | What to decide |
| --- | --- |
| Asset zone | What system, data, or workflow is being protected |
| Trust boundary | Where access or assumptions change |
| Control layers | Preventive, detective, and corrective safeguards |
| Encryption rule | What data needs protection at rest or in transit |
| Availability control | What keeps the service usable when something fails |
| Validation note | How you know the design matches the risk |

Layered security does not mean buying every tool. It means a single failure should not become a full compromise.

## Example Design Card

~~~shell
asset_zone="student account portal"
trust_boundary="public internet to authenticated application"
control_layers="WAF, rate limit, MFA, audit logging"
encryption_rule="TLS in transit and encrypted session secrets"
availability_control="health checks with rollback path"
validation_note="controls map to credential theft and web abuse risk"
~~~

## Practice

Write a design card for a small web app or internal service. The goal is to explain why each control is placed where it is.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is a trust boundary?",
          options: [
            "A point where access, identity, network, or assumptions change",
            "A backup file",
            "A password length rule only",
            "A list of approved vendors",
          ],
          correct: 0,
          explanation: "A trust boundary marks where the design needs to re-check assumptions and controls.",
        },
      ],
    },
    {
      slug: "domain-04",
      title: "Domain 4: Security Operations",
      hours: "5-6",
      sortOrder: 4,
      content: `# Security Operations

Security operations is the work of noticing, deciding, containing, recovering, and learning—plus day-to-day health of logging, backups, patch cadence, and alert ownership. An incident response note should be specific enough that another analyst can follow the evidence and understand the decision.

## Start Here: Response Order Before Action

At the start, do not rush from alert to cleanup. First name the signal, severity, containment step, evidence to preserve, recovery step, communication owner, and lesson learned.

Incident response is useful when another analyst can follow the order. The goal is calm, defensible action, not a pile of disconnected notes.

## How to Use This Room Screen

This room is about response order before action. Read the screen in this order:

- Learn: separate noticing, containing, collecting evidence, recovering, and learning.
- Inspect: identify the alert source, severity, containment, evidence, recovery, and communication owner.
- Build: write one response note a second analyst could follow.
- Prove: explain why containment and recovery are separate steps.

"Practice after the lesson" means you should understand the incident sequence before writing the note.

## One Clean Pass Through This Room

Before the workspace, read response as an order-before-action chain:

1. The alert source says where the signal came from.
2. The severity says how urgent the response should be.
3. The containment step reduces current harm.
4. The evidence step preserves facts before they disappear.
5. The recovery, communication, and lesson learned steps restore service and improve the next response.

That chain keeps incident work calm and reviewable. Cleanup without evidence can erase what the team needed to learn, and recovery before containment can let harm continue.

Do not start by cleaning up the alert. First say the response order in one sentence: signal, severity, containment, evidence, recovery, communication owner, and lesson learned.

## What the Workspace Will Ask You To Do

The workspace will ask for a suspicious-login response note:

| Workspace item | What it proves |
| --- | --- |
| Alert source | You can name where the signal came from. |
| Severity | You can set urgency without panic wording. |
| Containment step | You can reduce current harm. |
| Evidence to collect | You can preserve facts for investigation. |
| Recovery step | You can restore safe operation deliberately. |

## Your First Ten Minutes

Use this order:

1. Read the alert source and severity.
2. Name containment before recovery.
3. List the evidence to preserve.
4. Write the response note.
5. Add one lesson learned that improves future handling.

## Before Writing the Response Note

Do not merge containment, recovery, and communication into one vague action. You are ready when the work shows a disciplined response sequence another analyst can follow.

## Response Note Shape

Use this shape for a first response:

| Field | Why it matters |
| --- | --- |
| Alert source | Shows where the signal came from |
| Severity | Sets urgency and escalation |
| Containment step | Reduces current harm |
| Evidence to collect | Preserves facts for investigation |
| Recovery step | Restores service or access safely |
| Communication owner | Keeps people informed |
| Lesson learned | Turns the event into improvement |

Good incident work is disciplined. It avoids panic actions and keeps the evidence trail intact.

## Example Response Note

~~~shell
alert_source="identity provider impossible travel alert"
severity="medium"
containment_step="reset session and require MFA recheck"
evidence_to_collect="login time, source IP, device, user confirmation"
recovery_step="restore access after password reset and MFA verification"
communication_owner="security analyst on duty"
lesson_learned="review conditional access policy for risky travel"
~~~

## Practice

Write a response note for a suspicious login. Keep containment, evidence, recovery, and communication separate.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why separate containment from recovery?",
          options: [
            "Containment limits active harm; recovery restores safe operation",
            "Containment is only for backups",
            "Recovery should happen before evidence collection every time",
            "They are only compliance labels",
          ],
          correct: 0,
          explanation: "Incident response needs both immediate risk reduction and a controlled path back to normal.",
        },
      ],
    },
    {
      slug: "domain-05",
      title: "Domain 5: Security Program Management and Oversight",
      hours: "5-6",
      sortOrder: 5,
      content: `# Security Program Management and Oversight

Security program management and oversight make security decisions accountable: risk treatment, policy ownership, and evidence leadership can review later. Governance language still appears, but the framing is running a security program—not compliance theater.

## Start Here: Decision Before Checkboxes

At the start, do not treat compliance as a checkbox. First name the asset, the risk, the likely business impact, the owner, the evidence needed, and the decision about the risk that remains.

Oversight is where security becomes accountable. A clear risk row should let someone understand what the organization chose, who owns it, and what evidence would prove the choice later.

## How to Use This Room Screen

This room is about explaining security program decisions clearly. Read the screen in this order:

- Learn: connect asset, risk, likelihood, impact, owner, control, and residual decision.
- Inspect: decide which fields prove accountability.
- Build: write one risk row with an explicit decision.
- Prove: explain what evidence the organization would need later.

"Practice after the lesson" means you should understand the business decision before writing compliance language.

## One Clean Pass Through This Room

Before the workspace, read program oversight as a decision-before-checkboxes chain:

1. The asset says what the organization cares about.
2. The risk statement says what could happen and why it matters.
3. Likelihood and impact separate probability from harm.
4. The owner and policy control say who is accountable and which rule applies.
5. The compliance evidence and residual decision say what will be proved later and what risk remains.

That chain keeps oversight from becoming checkbox language. A useful risk row shows the actual decision: accept, reduce, transfer, or avoid.

Do not start by writing compliance words. First say the risk row in one sentence: asset, risk, likelihood, impact, owner, control, evidence, and residual decision.

## What the Workspace Will Ask You To Do

The workspace will ask for one risk-register row:

| Workspace item | What it proves |
| --- | --- |
| Asset | You can name what matters. |
| Risk statement | You can describe what could happen and why it matters. |
| Likelihood and impact | You can separate probability from harm. |
| Owner | You can assign responsibility. |
| Residual risk decision | You can choose accept, reduce, transfer, or avoid. |

## Your First Ten Minutes

Use this order:

1. Read the asset and risk statement first.
2. Separate likelihood from impact.
3. Name the owner and policy control.
4. Choose a residual risk decision.
5. Check that the compliance note names evidence, not a checkbox.

## Before Writing the Risk Row

Do not hide behind compliance words. You are ready when the work shows an accountable risk decision with asset, impact, owner, control, evidence, and residual risk.

## Risk Register Row

A clear risk row includes:

| Field | What it proves |
| --- | --- |
| Asset | What the organization cares about |
| Risk statement | What could happen and why it matters |
| Likelihood | How probable it is |
| Impact | What harm would result |
| Owner | Who is responsible for action |
| Policy control | Which rule or standard applies |
| Compliance note | What evidence is needed |
| Residual risk decision | Accept, reduce, transfer, or avoid |

Compliance is not the same as security, but it can make expectations measurable. The learner goal is to explain the decision, not to hide behind a checkbox.

## Example Risk Row

~~~shell
asset="student identity data"
risk_statement="weak account recovery could expose personal data"
likelihood="medium"
impact="high"
owner="platform security owner"
policy_control="account recovery requires identity verification"
compliance_note="retain access review and recovery logs"
residual_risk_decision="reduce with MFA and support review workflow"
~~~

## Practice

Write one risk row for a learning platform or small business system. The decision should name whether the team accepts, reduces, transfers, or avoids the risk.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What does residual risk mean?",
          options: [
            "The risk that remains after controls and decisions are applied",
            "A deleted log file",
            "A type of malware",
            "A network route",
          ],
          correct: 0,
          explanation: "Residual risk is what remains after the organization chooses and applies controls.",
        },
      ],
    },
    {
      slug: "domain-06",
      title: "Exam Mindset & Practice Set",
      hours: "3-4",
      sortOrder: 6,
      content: `# Exam Mindset & Practice Set

Domains 1–5 trained you to reason in SY0-701 security language: general security concepts, threats/vulnerabilities/mitigations, security architecture, security operations, and program management/oversight. Exam-style questions hide the domain label and add distractors.

This chapter is a local study practice set—not a CompTIA exam dump and not official CompTIA content. Run timed drills from original scenarios, map each item to Domains 1–5, and keep honest notes. The goal is exam mindset: eliminate wrong answers with domain logic, not memorized dump strings.

## Start Here: Eliminate Before You Commit

1. Underline the ask — best control, first action, residual decision, evidence?
2. Name the domain — concepts, threats/vulns/mitigations, architecture, operations, or program oversight?
3. Eliminate distractors — wrong phase, wrong CIA pillar, tool name without behavior, compliance theater.
4. Pick what matches the ask, not what sounds most “secure” in general.
5. Log one sentence of proof — why the losers fail this stem.

## How to Use This Room Screen

This room is about exam reasoning, not content dumps. Read the screen in this order:

- Learn: map stems to Domains 1–5.
- Inspect: spot distractor patterns.
- Build: write one drill log row per item.
- Prove: explain why the surviving option matches the ask.

## Map the Question to Domains 1–5

| If the stem mainly asks… | Domain |
| --- | --- |
| CIA, control types, risk-chain vocabulary as concepts | 1 General Security Concepts |
| Actor, vector, vulnerability, impact, mitigation | 2 Threats, Vulnerabilities, and Mitigations |
| Trust boundaries, layered design, placement of controls | 3 Security Architecture |
| Alert order, containment vs recovery, evidence | 4 Security Operations |
| Residual risk, ownership, evidence for oversight | 5 Security Program Management and Oversight |

## Practice

Time a short drill set. For each item, log the domain, the ask, the eliminated distractors, and one proof sentence.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why map each practice item to SY0-701 Domains 1–5 before committing an answer?",
          options: [
            "So you match the ask to domain logic instead of picking the most “secure-sounding” option",
            "Because CompTIA grades by domain label on the answer sheet",
            "So you can skip Domains 4 and 5",
            "Because vendor names always map to Domain 3",
          ],
          correct: 0,
          explanation: "Domain mapping keeps elimination grounded in what the stem asks, not generic security theater.",
        },
      ],
    },
  ],
};
