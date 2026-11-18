type AiEngineeringStage = {
  slug: string;
  title: string;
  hours: string;
  sortOrder: number;
  concept: string;
  focus: string;
  fields: Array<[string, string]>;
  example: string;
  practice: string;
  bridge: {
    start: string;
    artifact: string;
    startText: string;
    beforeHeading: string;
    beforeText: string;
    passingStandard: string;
  };
  quizQuestion: string;
  quizOptions: string[];
};

const AI_ENGINEERING_STAGES: AiEngineeringStage[] = [
  {
    slug: "stage-01",
    title: "ML Engineering Fundamentals",
    hours: "2-3",
    sortOrder: 1,
    concept:
      "ML engineering turns a model idea into a service that can receive input, return output, fail safely, and be monitored after release.",
    focus:
      "Separate a notebook demo from a service contract with input schema, output schema, safe errors, and health signals.",
    fields: [
      ["Input schema", "The fields and types the service accepts."],
      ["Output schema", "The fields the service returns to callers."],
      ["Error behavior", "How malformed input fails without exposing internals."],
      ["Monitoring signal", "What the team watches after release."],
    ],
    example: `service_contract = {
    "input_schema": {"text": "string"},
    "output_schema": {"label": "string", "confidence": "number"},
    "error_behavior": "malformed input returns a safe error object",
    "monitoring_signal": "monitor latency, error rate, and malformed input rate",
}

for key, value in service_contract.items():
    print(f"{key}: {value}")`,
    practice:
      "Write a minimal AI service contract. The goal is a clear boundary a teammate could test before the model reaches users.",
    bridge: {
      start: "Service Boundary Before Model Syntax",
      artifact: "service contract",
      startText:
        "At the start, do not jump into model algorithms, GPU choices, or notebook tricks. Ask what request comes in, what response goes out, how bad input fails, and what signal proves the service is healthy.",
      beforeHeading: "Before Editing the Starter Code",
      beforeText:
        "Run the starter unchanged and read the contract as a plain checklist: input schema, output schema, safe error behavior, and monitoring signal.",
      passingStandard: "a clear boundary, not a fancy algorithm",
    },
    quizQuestion: "What makes a notebook demo different from an engineered AI service?",
    quizOptions: [
      "The service has contracts, validation, monitoring, and failure behavior",
      "The notebook has nicer charts",
      "The model file is larger",
      "The service never needs tests",
    ],
  },
  {
    slug: "stage-02",
    title: "Data Pipelines & Preprocessing",
    hours: "2-3",
    sortOrder: 2,
    concept:
      "A data pipeline is a repeatable path from source data to validated training or inference data. It should make quality failures visible instead of silently feeding bad rows to a model.",
    focus:
      "Design a pipeline card with source, schema, quality checks, transformation, rejection policy, and owner.",
    fields: [
      ["Source", "Where the data comes from."],
      ["Schema", "The expected columns and types."],
      ["Quality checks", "Validation steps that catch missing or invalid data."],
      ["Transform step", "How raw data becomes model-ready data."],
      ["Rejection policy", "What happens when rows fail validation."],
      ["Owner", "Who fixes pipeline failures."],
    ],
    example: `pipeline_plan = {
    "source": "approved support ticket export",
    "schema": {"text": "string", "created_at": "datetime", "label": "optional string"},
    "quality_checks": ["text is present", "created_at parses", "no private tokens in text"],
    "transform_step": "normalize whitespace and remove empty training examples",
    "rejection_policy": "reject invalid rows and log counts without storing private text",
    "owner": "data platform owner",
}

for key, value in pipeline_plan.items():
    print(f"{key}: {value}")`,
    practice:
      "Draft a pipeline plan that makes bad data visible and keeps sensitive text out of logs.",
    bridge: {
      start: "Data Contract Before Transformation",
      artifact: "pipeline card",
      startText:
        "A data pipeline should make data quality visible before the model sees anything. Source, schema, checks, rejection behavior, and owner matter before transformation code.",
      beforeHeading: "Before Writing the Pipeline Card",
      beforeText:
        "Name the source, expected schema, quality checks, transform step, rejection policy, and owner before writing or changing pipeline code.",
      passingStandard: "a pipeline card that catches bad data clearly and avoids leaking sensitive text into logs",
    },
    quizQuestion: "Why does preprocessing need a rejection policy?",
    quizOptions: [
      "So bad rows fail clearly instead of poisoning training data",
      "So validation can be skipped",
      "So every row is accepted",
      "So logs include all raw text",
    ],
  },
  {
    slug: "stage-03",
    title: "Feature Engineering",
    hours: "2-3",
    sortOrder: 3,
    concept:
      "Feature engineering converts raw observations into useful model inputs. The professional risk is leakage: accidentally giving the model information it would not have at prediction time.",
    focus:
      "Create a feature plan with approved inputs, generated features, leakage guard, owner, and expected signal.",
    fields: [
      ["Raw inputs", "The data available before prediction."],
      ["Generated features", "The model-ready signals created from raw data."],
      ["Leakage guard", "A rule preventing future-answer data from entering training."],
      ["Owner", "Who maintains feature meaning."],
      ["Expected signal", "Why the feature should help prediction."],
    ],
    example: `feature_plan = {
    "raw_inputs": ["message_text", "sender_age_days", "link_count"],
    "generated_features": ["message_length", "has_link", "sender_reputation_bucket"],
    "leakage_guard": "do not use post-resolution fields when predicting ticket priority",
    "owner": "ML feature owner",
    "expected_signal": "message length and links may correlate with triage category",
}

for key, value in feature_plan.items():
    print(f"{key}: {value}")`,
    practice:
      "Write a feature plan that explains why each signal is allowed and how leakage is avoided.",
    bridge: {
      start: "Available Inputs Before Features",
      artifact: "feature plan",
      startText:
        "Feature engineering starts by asking what information is available at prediction time. That protects the model from leakage and keeps each signal explainable.",
      beforeHeading: "Before Writing the Feature Plan",
      beforeText:
        "Name raw inputs, generated features, leakage guard, owner, and expected signal before treating a feature as safe to train on.",
      passingStandard: "a feature plan that explains why each signal is allowed and how leakage is avoided",
    },
    quizQuestion: "What is feature leakage?",
    quizOptions: [
      "Using information that would not be available at prediction time",
      "Using too few columns",
      "Renaming a feature",
      "Logging a metric",
    ],
  },
  {
    slug: "stage-04",
    title: "Model Training & Validation",
    hours: "2-3",
    sortOrder: 4,
    concept:
      "Training is not complete when a model fits data. Validation compares the model to a baseline, checks realistic data splits, inspects error slices, and defines a promotion rule.",
    focus:
      "Build a validation plan with dataset split, baseline, metric, error slice, and promotion rule.",
    fields: [
      ["Dataset split", "How training and test examples are separated."],
      ["Baseline metric", "The simple reference result the model must beat."],
      ["Validation metric", "The primary metric used to judge the model."],
      ["Error slice", "A group of cases inspected for weak behavior."],
      ["Promotion rule", "The rule for moving the model forward."],
    ],
    example: `training_plan = {
    "dataset_split": {"train": 70, "validation": 15, "test": 15},
    "baseline_metric": {"accuracy": 0.72},
    "validation_metric": "compare accuracy and false positive rate",
    "error_slice": "inspect short messages and high-priority tickets separately",
    "promotion_rule": "promote only if it beats baseline and does not increase false positives",
}

for key, value in training_plan.items():
    print(f"{key}: {value}")`,
    practice:
      "Create a training plan that defines the split, baseline, validation metric, error slice, and promotion rule.",
    bridge: {
      start: "Baseline Before Promotion",
      artifact: "validation plan",
      startText:
        "Training is not done because a model fits examples. The useful question is whether it beats a baseline on realistic data without creating unacceptable errors.",
      beforeHeading: "Before Writing the Validation Plan",
      beforeText:
        "Name the dataset split, baseline metric, validation metric, error slice, and promotion rule before approving the model.",
      passingStandard: "a validation plan that proves improvement against a baseline and names the error cases to inspect",
    },
    quizQuestion: "Why compare a model to a baseline?",
    quizOptions: [
      "To prove the model improves on a simpler reference",
      "To avoid testing",
      "To hide weak performance",
      "To remove the need for monitoring",
    ],
  },
  {
    slug: "stage-05",
    title: "Deployment & Monitoring",
    hours: "2-3",
    sortOrder: 5,
    concept:
      "Deployment is an operating boundary: the model runs behind an endpoint, produces responses, exposes health checks, emits metrics, and can be rolled back.",
    focus:
      "Define deployment proof with endpoint, image or package, health check, monitoring signals, rollback, and alert owner.",
    fields: [
      ["Endpoint", "The route or service interface callers use."],
      ["Package", "A deployable model or service bundle."],
      ["Health check", "A simple route or command proving the service answers."],
      ["Monitoring signals", "Metrics watched after release."],
      ["Rollback plan", "How to return to a safer version."],
      ["Alert owner", "Who responds when monitoring fails."],
    ],
    example: `deployment_plan = {
    "endpoint": "/api/classify",
    "package": "model-service:training-lab-v1",
    "health_check": "GET /health returns ok and model version",
    "monitoring_signals": ["latency_p95", "error_rate", "input_rejection_rate"],
    "rollback_plan": "route traffic back to the previous approved model package",
    "alert_owner": "ml on-call owner",
}

for key, value in deployment_plan.items():
    print(f"{key}: {value}")`,
    practice:
      "Write a deployment plan that proves a model service can be observed and rolled back.",
    bridge: {
      start: "Operating Proof Before Launch",
      artifact: "deployment proof",
      startText:
        "Deployment is a promise to users and support teams. Endpoint, package, health check, monitoring, rollback, and alert owner prove the model can be operated.",
      beforeHeading: "Before Writing the Deployment Proof",
      beforeText:
        "Name the endpoint, package, health check, monitoring signals, rollback plan, and alert owner before calling the service live.",
      passingStandard: "deployment proof that shows the model service can be observed, limited, and rolled back",
    },
    quizQuestion: "What evidence matters after an AI service deploy?",
    quizOptions: [
      "Health, monitoring, and rollback evidence",
      "Only the model file name",
      "Only the launch announcement",
      "Only a screenshot of a chart",
    ],
  },
  {
    slug: "stage-06",
    title: "Scaling ML Systems",
    hours: "3-4",
    sortOrder: 6,
    concept:
      "Scaling an ML system means protecting reliability, cost, and quality as traffic or data grows. More servers are not enough if queues, limits, and quality checks fail.",
    focus:
      "Create a scaling runbook with workload type, capacity signal, backpressure rule, cost control, quality guard, and rollback trigger.",
    fields: [
      ["Workload type", "Whether the system is batch, online, or streaming."],
      ["Capacity signal", "The metric showing pressure."],
      ["Backpressure rule", "How the system slows or rejects work safely."],
      ["Cost control", "How spend is bounded."],
      ["Quality guard", "How output quality is watched while scaling."],
      ["Rollback trigger", "When to reduce load or return to a simpler path."],
    ],
    example: `scaling_runbook = {
    "workload_type": "online inference with batch retraining",
    "capacity_signal": "queue depth and p95 latency",
    "backpressure_rule": "return a safe retry response when queue depth is too high",
    "cost_control": "cap GPU jobs by tier and daily budget",
    "quality_guard": "sample predictions for drift and rising rejection rate",
    "rollback_trigger": "rollback when latency or quality crosses the release threshold",
}

for key, value in scaling_runbook.items():
    print(f"{key}: {value}")`,
    practice:
      "Draft a scaling runbook that controls capacity, cost, quality, and rollback instead of only adding machines.",
    bridge: {
      start: "Limits Before More Compute",
      artifact: "scaling runbook",
      startText:
        "Scaling an ML system is not just adding machines. Capacity, backpressure, cost, quality, and rollback rules keep growth from turning into unreliable output.",
      beforeHeading: "Before Writing the Scaling Runbook",
      beforeText:
        "Name the workload type, capacity signal, backpressure rule, cost control, quality guard, and rollback trigger before increasing load.",
      passingStandard: "a scaling runbook that controls capacity, cost, quality, and rollback instead of only adding compute",
    },
    quizQuestion: "What does scaling need besides more compute?",
    quizOptions: [
      "Backpressure, cost control, quality guards, and rollback triggers",
      "A longer model name",
      "No monitoring",
      "Only a larger dataset",
    ],
  },
];

function fieldTable(fields: Array<[string, string]>) {
  return fields.map(([field, purpose]) => `| ${field} | ${purpose} |`).join("\n");
}

function workspaceProofRows(fields: Array<[string, string]>) {
  return fields.map(([field, purpose]) => `| ${field} | ${purpose} |`).join("\n");
}

function bridgeContent(stage: AiEngineeringStage) {
  return `
## Start Here: ${stage.bridge.start}

${stage.bridge.startText}

You are building one ${stage.bridge.artifact}, not proving model cleverness. The goal is to make the engineering boundary testable before the Python object appears.

## How to Use This Room Screen

Read the screen as an engineering proof path:

- Learn: connect the topic to the boundary a production AI system needs.
- Inspect: read the fields as evidence your ${stage.bridge.artifact} must contain.
- Build: draft one ${stage.bridge.artifact} before editing code.
- Prove: explain how another engineer would test or operate the boundary without guessing.

"Practice after the lesson" means you should understand the required fields before editing code. If the starter object looks like syntax first, read one key at a time and ask what it proves for a real service.

## One Clean Pass Through This Room

Before the editor, make one slow pass through the service question in plain language:

1. A caller sends something to the system.
2. The system accepts only the shape it promised to accept.
3. The system returns the shape it promised to return.
4. Bad input gets a safe, explainable response.
5. A teammate has a signal they can watch after release.

For this room, a good answer is not "the model is smart." A good answer is: "I can show what comes in, what goes out, what fails safely, and what proves the service is still healthy."

| Question to answer | What you are proving |
| --- | --- |
| What does the caller send? | The input is specific enough to validate. |
| What does the service send back? | The output is predictable enough to test. |
| What happens when input is wrong? | The system fails without leaking internals or guessing. |
| What will the team watch later? | The service can be operated after it leaves the notebook. |

Do not start by changing the Python object. First say the contract out loud. If you cannot explain a field without code, keep the editor closed for another minute and read the row again.

## What the Workspace Will Ask You To Do

The workspace will ask for one ${stage.bridge.artifact} that proves:

| Workspace item | What it proves |
| --- | --- |
${workspaceProofRows(stage.fields)}

You are not expected to train, tune, or scale a production model yet. The goal is to make the boundary specific enough that another engineer could test it.

## Your First Ten Minutes

Use this order:

1. Read the start-here boundary before the Python object.
2. Match each field to what a teammate can test or operate.
3. Run the starter unchanged.
4. Change one field in the ${stage.bridge.artifact}.
5. Explain how the system fails safely, gets monitored, or gets rolled back.

## ${stage.bridge.beforeHeading}

${stage.bridge.beforeText}

You are ready when the work shows ${stage.bridge.passingStandard}.
`;
}

function lessonContent(stage: AiEngineeringStage) {
  return `# ${stage.title}

${stage.concept}
${bridgeContent(stage)}

## What You Are Learning

${stage.focus}

| Field | Purpose |
| --- | --- |
${fieldTable(stage.fields)}

## Engineering Example

~~~python
${stage.example}
~~~

## Practice

${stage.practice}

You are not ready just because the code prints something. You are ready when the ${stage.bridge.artifact} names the operational boundary, failure behavior, owner, and proof signal a production team would need.`;
}

export const AI_FOUNDATIONS_ENGINEERING_COURSE = {
  slug: "ai-foundations-engineering",
  title: "AI Foundations Engineering",
  description:
    "Build production-grade AI systems through data contracts, pipelines, feature plans, validation, deployment monitoring, and scaling runbooks.",
  icon: "AI",
  difficulty: "Intermediate",
  hours: "15-18",
  topics: ["ML Engineering", "MLOps", "Production AI", "Model Operations"],
  certBadges: ["ML Engineer"],
  stages: AI_ENGINEERING_STAGES.map((stage) => ({
    slug: stage.slug,
    title: stage.title,
    hours: stage.hours,
    sortOrder: stage.sortOrder,
    content: lessonContent(stage),
    quiz: [
      {
        type: "multiple_choice",
        question: stage.quizQuestion,
        options: stage.quizOptions,
        correct: 0,
        explanation:
          "AI engineering proof must be operational: testable contracts, failure behavior, monitoring, ownership, and rollback.",
      },
    ],
  })),
};
