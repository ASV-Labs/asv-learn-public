export const APPLIED_AGENTIC_AI_COURSE = {
  slug: "applied-agentic-ai",
  title: "Applied Agentic AI",
  description:
    "Build AI agents with clear goals, prompt contracts, retrieval boundaries, tool permissions, evaluation checks, and production runbooks.",
  icon: "AG",
  difficulty: "Advanced",
  hours: "18-20",
  topics: ["LLMs", "Agents", "Prompt Engineering", "RAG", "Tool Safety"],
  certBadges: ["AI Agent Developer"],
  stages: [
    {
      slug: "stage-01",
      title: "Large Language Models Foundations",
      hours: "2-3",
      sortOrder: 1,
      content: `# Large Language Models Foundations

An LLM predicts useful text from context. An agent is more than the model: it adds a goal, tools, memory, checks, and rules for when to stop.

## Start Here: Agent Boundary Before Tools

At the start, do not connect tools to a model just because you can. First name the job, the allowed information, the action boundary, the success check, and the condition that sends the work back to a human.

You are not building an autonomous production worker yet. You are learning the boundary that keeps an agent useful, reviewable, and limited to the task it was actually trusted to do.

## How to Use This Room Screen

This room is about drawing the agent boundary before adding tool access. Read the screen in this order:

- Learn: name the goal, allowed information, allowed tool, forbidden action, and stop condition.
- Inspect: check what each agent-spec field prevents before reading the Python dictionary.
- Build: add one safe, read-only tool and one explicit forbidden action.
- Prove: explain when the agent should stop or hand work to a human.

"Practice after the lesson" means you should understand the agent boundary before editing code. If the starter object looks like a block of configuration, read one field at a time and ask: what behavior does this limit?

## One Clean Pass Through This Room

Before the editor, read the agent boundary as a plain safety story:

1. A human gives the agent one job.
2. The agent may use only the information named in the boundary.
3. The agent may use only the tool listed in the boundary.
4. The agent must avoid the forbidden action even if the prompt sounds helpful.
5. The agent must stop when the success check cannot be proven.

That is the difference between a useful agent and a risky chatbot with tools. The point is not to make the model sound confident. The point is to make the job narrow enough that a teammate can review what happened and know when the system should hand work back to a human.

| Boundary question | What it protects |
| --- | --- |
| What job is trusted? | The agent does not drift into a different task. |
| What information is allowed? | The agent does not invent or pull unrelated context. |
| What tool is allowed? | The agent cannot reach for every possible action. |
| What action is forbidden? | The agent has a visible line it must not cross. |
| When should it stop? | A human gets the work before uncertainty becomes risk. |

Do not start by editing the dictionary. First say the boundary out loud in one sentence: this agent may do this job, with this tool, under these limits, and must stop in this situation.

## What the Workspace Will Ask You To Do

When the practice area opens, use it like an agent safety checklist:

1. Name the job the agent is trusted to do.
2. Name the one tool it may use.
3. Name one action it must never take.
4. Name the success check a reviewer can inspect.
5. Name the condition that sends the work back to a human.

You are not expected to build a self-running worker in this first room. The goal is to make a small agent spec that another person can review before any tool is connected.

## Your First Ten Minutes

Use this order:

1. Read the goal and boundary before the dictionary.
2. Match each spec field to a behavior it limits.
3. Run the starter unchanged.
4. Add one safer field or stop condition.
5. Explain when the agent should hand work back to a human.

## Before Editing the Starter Code

Run the starter unchanged and read \`agent_spec\` as a boundary checklist:

- \`goal\` says what the agent is allowed to help with.
- \`allowed_tools\` keeps tool access narrow.
- \`forbidden_actions\` names what the agent must not do.
- \`success_check\` makes output reviewable.
- \`escalation_condition\` tells the agent when to stop.

After those pieces make sense, change one boundary field or add one safer stop condition. You are ready when the work shows a bounded agent spec, not a tool-connected chatbot.

## Model Versus Agent

| Part | What it does |
| --- | --- |
| Model | Predicts text from the prompt and context |
| Goal | Describes the job the system is trying to complete |
| Tool | Gives the system a controlled action, such as search or code execution |
| Guardrail | Limits unsafe, irrelevant, or low-quality behavior |
| Success check | Defines what a good answer must prove |

Before you connect tools, write the smallest safe spec.

~~~python
agent_spec = {
    "goal": "summarize support tickets for a human reviewer",
    "allowed_tools": ["ticket_search_read_only"],
    "forbidden_actions": ["expose secrets", "delete tickets"],
    "success_check": "summary cites ticket ids and names uncertainty",
    "escalation_condition": "missing ticket context or unsafe request",
}
~~~

## Practice

Create an agent spec with one read-only tool, a forbidden action, a success check, and an escalation condition.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What separates an agent from a raw model call?",
          options: [
            "Goals, tools, checks, memory, and boundaries",
            "A larger logo",
            "A prompt with no success criteria",
            "Unlimited access to every tool",
          ],
          correct: 0,
          explanation:
            "An agent wraps model output with controlled goals, tools, checks, state, and limits.",
        },
      ],
    },
    {
      slug: "stage-02",
      title: "Prompt Engineering Mastery",
      hours: "2-3",
      sortOrder: 2,
      content: `# Prompt Engineering Mastery

A useful prompt is a contract. It tells the model the task, the context, the constraints, the output format, and how the answer will be checked.

## Start Here: Contract Before Clever Wording

At the start, do not try to make the prompt sound impressive. First name the task, the context the model may use, the constraints, the output format, the verification check, and when the model should refuse or ask for missing information.

A strong prompt is useful because another person can inspect whether the answer stayed inside the contract. The goal is control and reviewability, not a longer block of instructions.

## How to Use This Room Screen

This room is about prompt structure before clever wording. Read the screen in this order:

- Learn: understand why a prompt should define task, context, constraints, format, verification, and refusal.
- Inspect: identify what each instruction-card field prevents.
- Build: write one assistant instruction card before asking the model to answer.
- Prove: explain how a reviewer would judge whether the answer stayed inside the contract.

"Practice after the lesson" means you should know the contract before editing the Python object. A strong prompt is not just longer; it is easier to check.

## One Clean Pass Through This Room

Before the workspace, read prompting as a contract-before-wording chain:

1. The task says what job the assistant is being asked to do.
2. The context says what information the assistant may use.
3. The constraints say what the assistant must avoid or refuse.
4. The output format makes the answer predictable enough to review.
5. The verification check and refusal rule say how to judge the answer and when to stop.

That chain keeps prompt engineering from becoming clever phrasing. The useful prompt is the one another person can inspect, test, and tighten.

Do not start by polishing language. First say the assistant instruction card in one sentence: task, context, constraints, output format, verification check, and refusal rule.

## What the Workspace Will Ask You To Do

The workspace will ask for an assistant instruction card:

| Workspace item | What it proves |
| --- | --- |
| Task | You can state what the model should do. |
| Context | You can name what information the model may use. |
| Constraints | You can limit unsafe or unsupported behavior. |
| Output format | You can make the answer predictable to review. |
| Verification check | You can define what the answer must prove. |
| Refusal rule | You can tell the model when to stop instead of guessing. |

## Your First Ten Minutes

Use this order:

1. Read the prompt contract before the code block.
2. Match each field to one behavior it controls.
3. Name the missing-context case before writing an answer.
4. Run the starter unchanged.
5. Adjust one field so the output is easier to verify.

## Before Writing the Assistant Instruction Card

Do not start by polishing language. You are ready when the work shows a contract with task, context, constraints, output format, verification check, and refusal rule.

## Prompt Contract

Use this structure before adding clever wording:

1. Task: what the model should do.
2. Context: what information it may use.
3. Constraints: what it must avoid.
4. Output format: what shape the answer should have.
5. Verification: what the answer must prove.
6. Refusal rule: when the model should stop instead of guessing.

~~~python
assistant_instruction_card = {
    "task": "explain a failed unit test to a beginner",
    "context": "test name, error message, and the related function",
    "constraints": ["do not invent files", "do not hide uncertainty"],
    "output_format": "plain language summary plus next debugging step",
    "verification_check": "names the exact failing assertion",
    "refusal_rule": "ask for the missing traceback if no error message is provided",
}
~~~

## Practice

Write an assistant instruction card for a coding helper. The card should make the model useful without letting it invent context.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why does a prompt need a verification check?",
          options: [
            "So the answer can be judged against a specific requirement",
            "So the model can ignore context",
            "So every output is longer",
            "So the assistant can skip the stated task",
          ],
          correct: 0,
          explanation:
            "A verification check makes quality inspectable instead of relying on fluent wording.",
        },
      ],
    },
    {
      slug: "stage-03",
      title: "RAG & Knowledge Integration",
      hours: "2-3",
      sortOrder: 3,
      content: `# RAG & Knowledge Integration

Retrieval-augmented generation, or RAG, gives a model relevant source material before it answers. The model still generates text, but the answer should stay grounded in retrieved evidence.

## Start Here: Sources Before Answers

At the start, do not ask the model to answer from vibes. First name the approved source collection, the retrieval query, the allowed source types, the citation rule, the answer boundary, and what the assistant should say when evidence is missing.

RAG is useful only when source boundaries are visible. The learner goal is to make the answer easier to verify, not to make unsupported advice sound confident.

## How to Use This Room Screen

This room is about source boundaries before model answers. Read the screen in this order:

- Learn: understand how retrieval supplies evidence without making the model automatically correct.
- Inspect: identify source collection, query, allowed sources, citation rule, answer boundary, and uncertainty note.
- Build: write one RAG plan before asking for advice.
- Prove: explain what the answer may and may not claim from the retrieved material.

"Practice after the lesson" means the model should stay inside approved course material. If evidence is incomplete, the right move is to name what is missing.

## One Clean Pass Through This Room

Before the workspace, read RAG as a sources-before-answer chain:

1. The source collection says which knowledge base is approved.
2. The retrieval query says what evidence should be fetched.
3. The allowed sources say what the answer may rely on.
4. The citation rule makes the answer traceable.
5. The answer boundary and uncertainty note say what to do when evidence is missing.

That chain keeps retrieval from becoming decoration. RAG is useful when it makes the answer easier to verify, not when it makes unsupported advice sound confident.

Do not start by asking the model for advice. First say the RAG plan in one sentence: source collection, retrieval query, allowed sources, citation rule, answer boundary, and uncertainty note.

## What the Workspace Will Ask You To Do

The workspace will ask for a RAG plan:

| Workspace item | What it proves |
| --- | --- |
| Source collection | You can name the approved knowledge base. |
| Retrieval query | You can state what context should be fetched. |
| Allowed sources | You can limit what the answer may rely on. |
| Citation rule | You can point the answer back to evidence. |
| Answer boundary | You can prevent unsupported claims. |
| Uncertainty note | You can say what is missing before advising. |

## Your First Ten Minutes

Use this order:

1. Read the boundary table before the Python object.
2. Name the approved source collection.
3. Write the retrieval query in plain language.
4. Set source and citation rules.
5. Add an uncertainty note for weak or missing evidence.

## Before Writing the RAG Plan

Do not use retrieval as decoration. You are ready when the work shows source collection, retrieval query, allowed sources, citation rule, answer boundary, and uncertainty note.

## RAG Boundary

The important parts are:

| Part | Purpose |
| --- | --- |
| Source collection | The approved knowledge base |
| Retrieval query | The question used to fetch context |
| Allowed sources | Which source types the answer may rely on |
| Citation rule | How the answer points back to evidence |
| Answer boundary | What the model must not claim |
| Uncertainty note | What to say when evidence is incomplete |

~~~python
rag_plan = {
    "source_collection": "approved course notes",
    "retrieval_query": "how to explain Python route handlers",
    "allowed_sources": ["course lesson", "saved lab check"],
    "citation_rule": "name the lesson or check result used",
    "answer_boundary": "do not claim facts outside retrieved course material",
    "uncertainty_note": "say what evidence is missing before giving advice",
}
~~~

## Practice

Write a RAG plan that keeps answers inside approved course material and names what to do when evidence is missing.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the main reason to define an answer boundary in RAG?",
          options: [
            "To prevent unsupported claims outside retrieved evidence",
            "To make the prompt shorter",
            "To remove the need for retrieval",
            "To guarantee the model is always correct",
          ],
          correct: 0,
          explanation:
            "The answer boundary tells the model what not to claim when the sources do not support it.",
        },
      ],
    },
    {
      slug: "stage-04",
      title: "Agent Architectures",
      hours: "2-3",
      sortOrder: 4,
      content: `# Agent Architectures

Agent architecture is control flow. The agent needs a goal, a loop, state, stop conditions, escalation rules, and success checks.

## Start Here: Control Flow Before Autonomy

At the start, do not picture an agent as a self-running worker. First name the goal, the ordered steps, the state it must track, the stop condition, the escalation condition, and the success check.

An agent workflow should be small enough for a reviewer to follow. If the loop cannot stop or escalate clearly, it is not ready for more tool access.

## How to Use This Room Screen

This room is about control flow before autonomy. Read the screen in this order:

- Learn: understand why an agent loop needs state, allowed steps, stops, escalation, and success checks.
- Inspect: identify the goal, step order, state fields, stop condition, escalation condition, and success check.
- Build: write one small agent workflow before imagining a production worker.
- Prove: explain how the workflow prevents wandering into unrelated work.

"Practice after the lesson" means the loop should be small enough to inspect. A bounded assistant is more useful than an agent that keeps trying actions without a clear stop.

## One Clean Pass Through This Room

Before the workspace, read agent architecture as a control-flow-before-autonomy chain:

1. The goal says the one job the agent is allowed to help with.
2. The ordered steps make the loop readable.
3. The state fields say what context must stay attached.
4. The stop condition says when enough help exists.
5. The escalation condition and success check say when to hand off and how to judge the result.

That chain keeps agent design from becoming an open-ended worker. A useful workflow is small enough for a reviewer to follow and bounded enough to stop.

Do not start by designing an open-ended loop. First say the agent workflow in one sentence: goal, ordered steps, state fields, stop condition, escalation condition, and success check.

## What the Workspace Will Ask You To Do

The workspace will ask for an agent workflow:

| Workspace item | What it proves |
| --- | --- |
| Goal | You can name the job the agent should help with. |
| Steps | You can keep the loop explicit and ordered. |
| State fields | You can name what context must be tracked. |
| Stop condition | You can end the loop when enough help exists. |
| Escalation condition | You can send unsafe or under-specified work to a human. |
| Success check | You can define what a good response must reference. |

## Your First Ten Minutes

Use this order:

1. Read the loop as a workflow, not as magic.
2. Name the goal and the smallest useful steps.
3. Add the state fields the agent needs to stay grounded.
4. Write stop and escalation conditions before adding actions.
5. Finish with a success check a reviewer can inspect.

## Before Writing the Agent Workflow

Do not design an open-ended loop. You are ready when the work shows goal, steps, state fields, stop condition, escalation condition, and success check.

## A Safe Agent Loop

Start with a small loop:

1. Read the user request.
2. Inspect available context.
3. Choose one allowed action.
4. Check the result.
5. Stop, escalate, or continue.

~~~python
agent_workflow = {
    "goal": "help a learner debug the current sandbox result",
    "steps": ["read request", "inspect saved check", "suggest one next step", "ask for confirmation"],
    "state_fields": ["course", "stage", "latest_check_status"],
    "stop_condition": "learner has a clear next step or evidence is missing",
    "escalation_condition": "unsafe request or missing course context",
    "success_check": "response references the current stage and latest check result",
}
~~~

## Practice

Design a small workflow for a learning assistant. Keep the loop explicit so the agent does not wander into unrelated work.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should an agent loop include before it is trusted?",
          options: [
            "State, allowed steps, stop condition, escalation, and success check",
            "Unlimited retries",
            "No logging",
            "A hidden goal",
          ],
          correct: 0,
          explanation:
            "Explicit state and stop rules keep the agent bounded and testable.",
        },
      ],
    },
    {
      slug: "stage-05",
      title: "Tools & API Integration",
      hours: "2-3",
      sortOrder: 5,
      content: `# Tools & API Integration

Tools are permissions. Every tool connected to an agent needs a contract that says what the agent may do, what it may not do, what input is allowed, what output returns, and what gets audited.

## Start Here: Permissions Before API Calls

At the start, do not connect an API because it is convenient. First name the tool, the one allowed action, the forbidden action, the input shape, the output shape, and the audit fields.

A tool contract turns access into something enforceable. If another engineer could not check or log the behavior, the agent should not have that tool yet.

## How to Use This Room Screen

This room is about permissions before API calls. Read the screen in this order:

- Learn: understand that a tool gives an agent controlled power.
- Inspect: identify allowed action, forbidden action, input schema, output schema, and audit fields.
- Build: write one tool contract before connecting anything.
- Prove: explain how another engineer could enforce the contract.

"Practice after the lesson" means tool access should feel narrow and reviewable. If the contract cannot be enforced, the agent should not have the tool yet.

## One Clean Pass Through This Room

Before the workspace, read tool integration as a permissions-before-API-calls chain:

1. The tool name says which capability is being granted.
2. The allowed action says the one thing the agent may do.
3. The forbidden action says what must stay blocked.
4. The input and output shapes make the tool contract enforceable.
5. The audit fields preserve evidence of tool use.

That chain turns access into something the team can check. If the permission cannot be logged or enforced, the agent is not ready to use that tool.

Do not start by connecting an API. First say the tool contract in one sentence: tool name, allowed action, forbidden action, input shape, output shape, and audit log fields.

## What the Workspace Will Ask You To Do

The workspace will ask for a tool contract:

| Workspace item | What it proves |
| --- | --- |
| Tool name | You can identify the capability being granted. |
| Allowed action | You can define exactly what the agent may do. |
| Forbidden action | You can name what the agent must not do. |
| Input schema | You can limit the data the tool accepts. |
| Output schema | You can describe what the tool returns. |
| Audit log fields | You can preserve evidence of tool use. |

## Your First Ten Minutes

Use this order:

1. Read the tool as a permission, not a feature.
2. Name the allowed action in one sentence.
3. Name the forbidden action before the schema.
4. Define input and output shapes.
5. Add audit fields so tool use can be reviewed later.

## Before Writing the Tool Contract

Do not connect a tool because it is convenient. You are ready when the work shows tool name, allowed action, forbidden action, input schema, output schema, and audit log fields.

## Tool Contract

Write the contract before the tool is connected:

~~~python
tool_contract = {
    "tool_name": "course_search",
    "allowed_action": "read published lesson and saved learner check summaries",
    "forbidden_action": "change grades, reveal secrets, or access unrelated projects",
    "input_schema": {"course_slug": "string", "stage_slug": "string", "question": "string"},
    "output_schema": {"sources": "list", "answer_context": "string"},
    "audit_log_fields": ["user_id", "course_slug", "stage_slug", "tool_name"],
}
~~~

## Practice

Create a tool contract for a coding assistant. It should be specific enough that another engineer could enforce it in code.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why is a tool contract necessary?",
          options: [
            "It turns tool access into explicit permissions and audit rules",
            "It lets the model call anything",
            "It hides the tool output",
            "It replaces user authentication",
          ],
          correct: 0,
          explanation:
            "The contract defines allowed action, forbidden action, schemas, and audit evidence.",
        },
      ],
    },
    {
      slug: "stage-06",
      title: "Production Agent Systems",
      hours: "3-4",
      sortOrder: 6,
      content: `# Production Agent Systems

A production agent needs more than a useful demo. It needs monitoring, cost limits, safety review, rollback, incident escalation, and evaluation samples.

## Start Here: Operations Before Launch

At the start, do not call an agent production-ready because the demo worked once. First name the health signals, cost limit, safety review habit, rollback plan, incident escalation path, and repeatable evaluation samples.

Production readiness means the team can operate the agent when something changes. The runbook should make failures visible and give humans a safe way back.

## How to Use This Room Screen

This room is about operations before launch. Read the screen in this order:

- Learn: understand why a useful demo is not enough for production.
- Inspect: identify monitoring signals, cost limit, safety review, rollback, incident escalation, and evaluation sample.
- Build: write one production runbook before calling the agent launch-ready.
- Prove: explain how the team would detect problems and return to safe behavior.

"Practice after the lesson" means the agent should be operable after the first demo. A production runbook is the difference between a neat prototype and a system a team can safely own.

## One Clean Pass Through This Room

Before the workspace, read production agents as an operations-before-launch chain:

1. The monitoring signals say how the team sees health and risk.
2. The cost limit prevents runaway usage.
3. The safety review habit checks for unsafe or off-scope behavior.
4. The rollback plan says how to return to the previous safe behavior.
5. The incident escalation path and evaluation samples keep humans in control over time.

That chain keeps production from meaning "the demo worked once." A team-ready agent must be observable, bounded, reviewable, reversible, and repeatedly testable.

Do not start by calling the demo production-ready. First say the production runbook in one sentence: monitoring signals, cost limit, safety review, rollback plan, incident escalation, and evaluation samples.

## What the Workspace Will Ask You To Do

The workspace will ask for a production agent runbook:

| Workspace item | What it proves |
| --- | --- |
| Monitoring signals | You can observe whether the agent is healthy. |
| Cost limit | You can prevent runaway usage. |
| Safety review | You can sample for unsafe or off-scope behavior. |
| Rollback plan | You can restore previous safe behavior. |
| Incident escalation | You can tell humans when to act. |
| Evaluation sample | You can repeat checks over time. |

## Your First Ten Minutes

Use this order:

1. Read the production fields before the Python object.
2. Name the signals that show health and risk.
3. Set a cost limit and safety review habit.
4. Add rollback and incident escalation.
5. Finish with evaluation samples that can catch regressions.

## Before Writing the Production Runbook

Do not call a demo production-ready. You are ready when the work shows monitoring, cost limit, safety review, rollback, incident escalation, and evaluation samples.

## Runbook Fields

Before launch, define:

| Field | Why it matters |
| --- | --- |
| Monitoring signals | Shows whether the system is healthy |
| Cost limit | Prevents runaway usage |
| Safety review | Catches unsafe or off-scope behavior |
| Rollback plan | Restores the previous safe behavior |
| Incident escalation | Tells the team when humans must act |
| Evaluation sample | Gives repeatable examples for regression checks |

~~~python
production_agent_runbook = {
    "monitoring_signals": ["tool error rate", "unsafe request refusals", "cost per user"],
    "cost_limit": "free tier users get a daily coaching limit",
    "safety_review": "sample answers weekly for off-scope tool use",
    "rollback_plan": "disable tool calls and fall back to lesson-only guidance",
    "incident_escalation": "page the owner when unsafe tool access is attempted",
    "evaluation_sample": "ten learner questions with expected safe response traits",
}
~~~

## Practice

Write a runbook that would let a team operate an agent after launch, not just demo it once.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What proves an agent is closer to production-ready?",
          options: [
            "Monitoring, limits, safety review, rollback, escalation, and evaluation samples",
            "A longer prompt only",
            "No cost tracking",
            "Access to every internal system",
          ],
          correct: 0,
          explanation:
            "Production readiness requires observable behavior, limits, rollback, and repeatable evaluation.",
        },
      ],
    },
  ],
};
