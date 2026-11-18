export const AI_FUNDAMENTALS_COURSE = {
  slug: "ai-fundamentals",
  title: "AI Fundamentals for Builders",
  description:
    "Build practical AI application judgment through prompts, structured outputs, internal API-powered AI interaction, retrieval, workflows, guardrails, evaluation, and portfolio proof.",
  icon: "AI",
  difficulty: "Beginner-to-Builder",
  hours: "28-36",
  topics: ["AI Builders", "LLMs", "Prompt Engineering", "Internal APIs", "Structured Output", "RAG", "Evaluation", "Agents", "Guardrails"],
  certBadges: ["AI Builder Foundations"],
  stages: [
    {
      slug: "stage-01",
      title: "AI, ML, and LLM Orientation",
      hours: "2-3",
      sortOrder: 1,
      content: `# AI, ML, and LLM Orientation

AI is not one thing. Before you trust an AI claim, name what goes in, what comes out, what behavior is happening, what evidence proves it helped, and what risk appears if the claim is overstated.

## Concept

Automation follows fixed steps. Prediction estimates a label or score. Generation creates new text or structure. Guarded workflow or agent-like behavior uses AI inside a controlled sequence with boundaries and review.

## Architecture

The learner inspects a product claim as a small system: input enters, behavior runs, output appears, evidence proves usefulness, and risk shows what needs review.

## Guided Build

Complete the classification rows in the browser workspace after reading the examples.

## Debug/Test

Check whether each row has a category, input, output, evidence, and risk. A vague AI label is not enough.

## Reflection

Explain why the category fits and what evidence a reviewer would need.

## Portfolio Proof

Save the completed claim table as the first AI Builder proof artifact.

## Why it matters

Bad AI labels create bad systems. If every automatic feature is called AI, teams stop asking useful questions and learners cannot tell what should be tested.

## Inspect

Read each feature as a claim table: feature, input, output, category, evidence, and risk.

## Platform rule

External learner API keys are not required and are not allowed. Any AI interaction goes through TechNodeX internal APIs with authentication, paid-tier limits, rate limits, logging, and guardrails.

## Builder artifact

AI claim classification table + risk note.

## Practice

Complete the feature_classifications starter. Replace every TODO, include automation, prediction, and generation, then explain the trust/evidence risk.
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-02",
      title: "Models, LLMs, and AI System Parts",
      hours: "2-3",
      sortOrder: 2,
      content: `# Models, LLMs, and AI System Parts

An AI feature is a controlled product system, not just a model. The model is one engine inside a larger flow with a user interface, prompt, context, internal API boundary, validation, tier limits, logging, and fallback behavior.

## Concept

A learner types into the interface. TechNodeX checks authentication, paid-tier limits, rate limits, and safety rules through internal APIs. Approved context is added, the model performs a specific role, validation checks the result, and the product either shows the answer or a safe fallback.

## Key platform rule

Learners do not bring outside model accounts or provider keys. AI interaction for this course goes through TechNodeX internal APIs with guardrails.

## Builder artifact

AI system parts map.

## Practice

Complete the ai_system_map starter. Name the feature, user input, UI surface, internal API boundary, model role, context, validation, tier guardrail, failure mode, and fallback/human review behavior.
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-03",
      title: "Prompting as Instruction Design",
      hours: "2-3",
      sortOrder: 3,
      content: `# Prompting as Instruction Design

A prompt is an instruction package, not magic words. A useful prompt names the task, context, constraints, output format, success check, and failure mode.

## Concept

Weak prompts ask for broad help without criteria. Strong prompts tell the model what to do, what approved context to use, what rules to obey, what shape to return, and what to do when the context is not enough.

## Internal AI flow

Prompting in TechNodeX still goes through internal APIs. The platform controls course context, tier limits, safety rules, and validation around the prompt.

## Builder artifact

Prompt test workbook.

## Practice

Complete the prompt_test starter. Compare weak and improved prompts, then define task, context, constraints, output format, success check, and failure mode.
`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-04",
      title: "Prompt Debugging and Behavior Testing",
      hours: "2-3",
      sortOrder: 4,
      content: `# Prompt Debugging and Behavior Testing

Show how AI output fails: vague instructions, missing context, hallucinated facts, format drift, unsafe confidence, and overbroad requests. Learners improve prompts through before/after tests.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Prompt debugging log
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-05",
      title: "How APIs Connect AI Features",
      hours: "2-3",
      sortOrder: 5,
      content: `# How APIs Connect AI Features

Introduce APIs lightly: requests, responses, endpoints, payloads, status, and errors. The rule is explicit: learner external AI API keys are not used or allowed; TechNodeX internal APIs handle AI access behind tier guardrails.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Internal AI interaction flow diagram
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-06",
      title: "Structured Outputs and Validation",
      hours: "2-3",
      sortOrder: 6,
      content: `# Structured Outputs and Validation

Teach why AI text needs structure before software can trust it. Learners design JSON-like response contracts, required fields, validation checks, and safe fallback behavior.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Structured output contract + validator checklist
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-07",
      title: "Retrieval and Source Grounding",
      hours: "2-3",
      sortOrder: 7,
      content: `# Retrieval and Source Grounding

Explain why models need approved context instead of guessing. Learners inspect chunks, source notes, citations, freshness, and what should happen when the answer is not in the provided sources.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Retrieval source inspection sheet
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-08",
      title: "RAG Application Patterns",
      hours: "2-3",
      sortOrder: 8,
      content: `# RAG Application Patterns

Connect retrieval to a useful app pattern: user question, source selection, context package, model response, citation, validation, and user-visible uncertainty.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Course-note Q&A assistant plan
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-09",
      title: "AI Workflows and Tool Use",
      hours: "2-3",
      sortOrder: 9,
      content: `# AI Workflows and Tool Use

Teach tool use as controlled actions, not magic autonomy. Learners map when an AI workflow may read, suggest, create, or escalate, and what approval boundary protects the user.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Tool-routing simulation
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-10",
      title: "Agents as Guarded Workflows",
      hours: "2-3",
      sortOrder: 10,
      content: `# Agents as Guarded Workflows

Explain agents as loops with goals, state, tools, checks, and stop rules. Learners design a limited assistant that can only act inside defined boundaries.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Guarded agent loop sketch
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-11",
      title: "Responsible AI, Guardrails, and Tiered Access",
      hours: "2-3",
      sortOrder: 11,
      content: `# Responsible AI, Guardrails, and Tiered Access

Make responsibility operational: privacy rules, abuse prevention, usage limits, human escalation, logging, monitoring, and paid-tier controls for AI access.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Responsible AI release review
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "stage-12",
      title: "Portfolio Capstone: AI Builder Proof",
      hours: "2-3",
      sortOrder: 12,
      content: `# Portfolio Capstone: AI Builder Proof

Learners assemble a portfolio-ready proof: problem, user, input/output contract, internal AI flow, prompt tests, validation, retrieval/tool boundary, guardrails, and reflection.

## What this room teaches

This course is an AI builder course, not a general AI trivia course and not an API development course. The goal is to understand how AI-powered product features are designed, inspected, tested, and controlled.

In this room, learners move through the builder rhythm:

1. **Concept** — define the idea in plain English.
2. **Architecture** — identify the moving parts and boundaries.
3. **Inspect** — read a working example before changing it.
4. **Guided Build** — modify one controlled piece.
5. **Debug/Test** — find where the behavior can fail.
6. **Reflection** — explain the decision in human language.
7. **Portfolio Proof** — save an artifact another reviewer can understand.

## Key rule for AI interaction

TechNodeX AI courses do **not** ask learners to bring external AI provider keys. External learner API keys are not required and are not allowed in the core course path. When AI interaction is needed, it must go through TechNodeX internal APIs with authentication, paid-tier access checks, usage limits, rate limits, logging, and safety guardrails.

This room may explain what an API does, but it does not turn into a heavy API development course. Deeper API design belongs in a separate course.

## Builder artifact

By the end of this room, the learner should produce:

- **Artifact:** Portfolio-ready AI app proof
- **Proof:** a short explanation of the input, output, guardrail, failure mode, and how the result would be reviewed

## Practice

Use the workspace to create or update the artifact for this room. Keep it concrete. A good answer names what goes in, what comes out, how the AI behavior is controlled, what can fail, and what proof would make the work reviewable.

## Explain It Back

Explain how this room's artifact helps someone inspect an AI-powered feature without relying on hype, hidden assumptions, or uncontrolled model access.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the required policy for AI interaction in this course?",
          options: [
            "Use TechNodeX internal APIs with guardrails and tier controls",
            "Ask learners to connect outside model accounts",
            "Skip validation because the model is intelligent",
            "Let every tier use unlimited AI interactions",
          ],
          correct: 0,
          explanation:
            "AI interaction must stay behind TechNodeX internal APIs with guardrails, usage controls, and paid-tier access rules.",
        },
      ],
    },
    {
      slug: "certificate",
      title: "AI Fundamentals Certificate of Completion",
      hours: "Outcome",
      sortOrder: 13,
      content: `# AI Fundamentals Certificate of Completion

This is the platform outcome page for **AI Fundamentals for Builders**. It is not a coding room and it is not checked with Check Work.

## Certificate preview

**Certificate of Completion**

This certifies that **{{student_name}}** completed **TechNodeX — AI Fundamentals for Builders**.

- Course: AI Fundamentals for Builders
- Credential type: Certificate of Completion
- Issue date: {{issue_date}}
- Credential ID: TNX-AIF-{{credential_id}}
- Verification URL: https://technodex.io/verify/TNX-AIF-{{credential_id}}
- Signatory: TechNodeX Training Team

## What this credential represents

The learner completed the AI Fundamentals for Builders course path and produced portfolio-oriented proof around AI feature classification, prompt contracts, internal API boundaries, validation, retrieval/RAG reasoning, tool and agent workflow boundaries, responsible AI guardrails, and a final AI Builder proof artifact.

## Publication lock note

Once this certificate update is published, certificate issuance should be locked behind course completion. Learners should only receive the final credential record after the platform confirms the course requirements are complete.

## Conservative wording

Use **Certificate of Completion** only. Do not present this as a degree, license, accreditation, certified engineer credential, employment guarantee, or job-placement claim.
`,
      quiz: [],
    }
  ],
};
