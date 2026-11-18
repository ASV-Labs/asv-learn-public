export const DEVOPS_COURSE = {
  slug: "devops",
  title: "DevOps & Infrastructure",
  description:
    "Run applications with Linux, containers, Kubernetes, CI/CD, infrastructure as code, and observability evidence.",
  icon: "OPS",
  difficulty: "Intermediate",
  hours: "28-36",
  topics: ["Linux", "Containers", "Kubernetes", "CI/CD", "Infrastructure", "Observability"],
  certBadges: ["DevOps Engineer"],
  stages: [
    {
      slug: "linux-shell",
      title: "Linux & Shell Scripting Foundations",
      hours: "4-5",
      sortOrder: 1,
      content: `# Linux & Shell Scripting Foundations

DevOps starts with careful inspection. A shell command should answer a question before it changes a system.

## Start Here: Observe Before Restart

At the start, do not fix first. Ask what is running, what changed, what the user can reach, and what rollback path exists before touching the service.

You are not becoming the person who restarts things and hopes. You are learning the release habit that protects evidence, users, and recovery options.

## How to Use This Room Screen

This room is about operating order before command habit. Read the screen in this order:

- Learn: understand why inspection comes before change.
- Inspect: identify status, logs, public health, action, and rollback evidence.
- Build: write a tiny response checklist, not a clever one-liner.
- Prove: explain why user-facing health is stronger than process status alone.

"Practice after the lesson" means you should know what each command is proving before running or changing it. If the shell text looks dense, read the variable names as a checklist.

## One Clean Pass Through This Room

Before the workspace, read the service problem as an evidence chain:

1. A symptom appears: a user cannot reach something, a job failed, or a monitor changed.
2. Status tells you whether the process appears alive.
3. Logs tell you what happened before you arrived.
4. Public health tells you whether users can actually reach the service.
5. The safe action names what you will do next and why.
6. The rollback plan names how you recover if the action does not help.

That order keeps a small outage from becoming a blind change. A process can be running while users still see failure. A restart can erase the clue you needed. A rollback plan keeps the team from inventing a recovery path under pressure.

| Question to answer | What it protects |
| --- | --- |
| What changed or failed? | The response starts from evidence, not habit. |
| What do logs show? | The cause is not erased before review. |
| Can users reach it? | The check measures the experience that matters. |
| What action is safest? | Restart, rollback, or escalation is chosen deliberately. |
| What happens if it fails? | Recovery is named before touching the service. |

Do not start by running a restart command. First say the response path in one sentence: inspect status, preserve logs, check public health, choose the safest action, and keep rollback ready.

## What the Workspace Will Ask You To Do

The workspace will ask for a small response checklist:

| Workspace item | What it proves |
| --- | --- |
| Status check | You can see whether a process appears to be running. |
| Log review | You can preserve evidence before changing state. |
| Public health | You can verify what a user can reach. |
| Safe action | You can choose restart, rollback, or escalation deliberately. |
| Rollback plan | You can name the recovery path before touching the service. |

## Your First Ten Minutes

Use this order:

1. Read the operating loop before the shell block.
2. Match each variable to one proof question.
3. Run the starter unchanged.
4. Add or adjust one evidence field.
5. Explain why restart-first would be weaker professional work.

## Before Running the Checklist Command

Do not treat \`printf\` as magic. It prints the checklist fields so you can inspect the order. You are ready when the work shows status, logs, public health, action, and rollback in the right sequence.

## The Operating Loop

| Step | Question | Evidence |
| --- | --- | --- |
| Status | Is the process running? | service or process state |
| Logs | What changed recently? | timestamped error or event lines |
| Health | Can a user-facing route answer? | HTTP or command health result |
| Action | What is the safest next move? | restart, rollback, or escalation note |

Do not restart first. A restart can hide the failure and destroy the evidence that explains it.

## Small Response Checklist

~~~sh
inspect_steps="status logs public-health"
action_order="inspect then change then verify"
rollback_plan="restart the previous known-good release if health does not recover"

printf '%s\\n' "inspect_steps=$inspect_steps" "action_order=$action_order" "rollback_plan=$rollback_plan"
~~~

Read the variables as a response checklist. The first variable names what to inspect. The second protects the order. The third defines what to do if the change does not recover the service.

## Practice

Write a shell response checklist that inspects status, logs, and public health before action. Add a rollback plan before you touch the service.

## Explain It Back

Explain why "process is running" is weaker evidence than a user-facing health check.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Why inspect logs before restarting a service?",
          options: ["To preserve evidence of the failure", "To make the command longer", "To avoid using health checks", "To skip rollback planning"],
          correct: 0,
          explanation: "Logs can explain the failure. Restarting first can hide the evidence.",
        },
      ],
    },
    {
      slug: "docker-containers",
      title: "Docker & Containerization",
      hours: "5-6",
      sortOrder: 2,
      content: `# Docker & Containerization

Containers package an app with the runtime it needs. The goal is repeatability: the same image should run the same way in development, staging, and production.

## Start Here: Boundary Before Image

At the start, do not call something release-ready because it runs in a container. First name the image tag, Dockerfile checks, runtime port, health check, rollback image, and secret-handling rule.

A container is useful when its boundary is clear. The learner should know what is inside the image, what comes from runtime configuration, and how to recover if the new image fails.

## How to Use This Room Screen

This room is about the container boundary before Docker syntax. Read the screen in this order:

- Learn: understand what an image is expected to carry.
- Inspect: identify the image tag, build checks, runtime port, health check, rollback image, and secret rule.
- Build: write one container release card before changing a Dockerfile.
- Prove: explain why repeatability and rollback matter before deploy.

"Practice after the lesson" means you should understand the release card before treating the shell block as a command to copy. The card is the checklist; the command only prints the checklist fields.

## One Clean Pass Through This Room

Before the workspace, read containers as a boundary-before-image chain:

1. The image name and tag say exactly what release candidate is being discussed.
2. The Dockerfile checks say what belongs inside the image.
3. The runtime port says how traffic reaches the running container.
4. The health check says how the team knows the container answered after start.
5. The rollback image and secret rule say how to recover safely without exposing credentials.

That chain keeps "it runs in Docker" from becoming a release claim. A container is useful when the build boundary, runtime boundary, and recovery path are all visible.

Do not start by editing the Dockerfile. First say the container release card in one sentence: image tag, build checks, runtime port, health check, rollback image, and secret-handling rule.

## What the Workspace Will Ask You To Do

The workspace will ask for a container release card:

| Workspace item | What it proves |
| --- | --- |
| Image name and tag | You can name the exact release candidate. |
| Dockerfile checks | You can inspect how the image is built. |
| Runtime port | You can explain how traffic reaches the app. |
| Health check | You can prove the container answers after start. |
| Rollback image | You can name the previous known-good release. |
| Secret rule | You can keep tokens and environment values out of the image. |

## Your First Ten Minutes

Use this order:

1. Read the release-card fields before the shell block.
2. Name the image and tag as if another teammate will deploy it.
3. Check the build boundary and runtime port.
4. Add health and rollback evidence.
5. Confirm secrets are supplied by the runtime, not baked into the image.

## Before Writing the Container Release Card

Do not treat "containerized" as proof that an app is safe to release. You are ready when the work shows a card with image identity, build checks, traffic path, health check, rollback image, and secret-handling rule.

## What To Prove

| Artifact | Why it matters |
| --- | --- |
| Image name and tag | Identifies exactly what should run |
| Dockerfile checks | Shows how the image is built |
| Runtime port | Explains how traffic reaches the app |
| Health check | Proves the container can answer after start |
| Rollback image | Names the previous known-good release |

Containers do not remove operational responsibility. They make the boundary clearer.

## Starter Plan

~~~sh
image_name="learner-api:staging"
dockerfile_checks="base image, dependency install, non-root user"
runtime_port="3000"
container_healthcheck="curl -f http://localhost:3000/health"
rollback_image="learner-api:previous"
no_secret_rule="do not bake tokens or .env values into the image"

printf '%s\\n' "$image_name" "$dockerfile_checks" "$runtime_port" "$container_healthcheck" "$rollback_image" "$no_secret_rule"
~~~

## Practice

Write a container release card. It should identify the image, build checks, exposed port, health check, rollback image, and secret-handling rule.

## Explain It Back

Explain why a container image tag needs a rollback partner before deployment.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "Which item should not be baked into a container image?",
          options: ["Secret tokens", "Application code", "Runtime dependencies", "Health-check path"],
          correct: 0,
          explanation: "Secrets should be supplied by the runtime environment or secret manager, not baked into an image.",
        },
      ],
    },
    {
      slug: "kubernetes",
      title: "Kubernetes Orchestration",
      hours: "5-7",
      sortOrder: 3,
      content: `# Kubernetes Orchestration

Kubernetes runs containers as managed workloads. The useful beginner model is simple: desired state, rollout evidence, service routing, health probes, and rollback.

## Start Here: Readiness Before Rollout

At the start, do not treat a running pod as a safe release. First name the deployment, replica count, service, readiness probe, rollout check, and rollback command.

Kubernetes is safest when the desired state and user-facing readiness are visible. The rollout should move only as fast as the readiness evidence allows.

## How to Use This Room Screen

This room is about rollout safety before Kubernetes object names. Read the screen in this order:

- Learn: understand desired state, pods, services, probes, rollout, and rollback.
- Inspect: identify the deployment, replicas, service, readiness probe, rollout check, and rollback command.
- Build: write one rollout card before treating a cluster as changed.
- Prove: explain how readiness protects users during a rollout.

"Practice after the lesson" means you should know what Kubernetes is checking before memorizing object vocabulary. The beginner win is controlled movement from old version to new version.

## One Clean Pass Through This Room

Before the workspace, read Kubernetes as a readiness-before-rollout chain:

1. The deployment name says which workload is changing.
2. The replica count says how many copies should be available.
3. The service name says how traffic reaches the pods.
4. The readiness probe says when a pod is allowed to receive traffic.
5. The rollout check and rollback command say how to verify movement and recover.

That chain keeps a running pod from being mistaken for a safe release. Kubernetes is useful when desired state and readiness evidence protect users during change.

Do not start by changing cluster objects. First say the Kubernetes rollout card in one sentence: deployment, replicas, service, readiness probe, rollout check, and rollback command.

## What the Workspace Will Ask You To Do

The workspace will ask for a Kubernetes rollout card:

| Workspace item | What it proves |
| --- | --- |
| Deployment name | You can name the workload being changed. |
| Replicas | You can state how many copies should run. |
| Service name | You can describe the stable route to the pods. |
| Readiness probe | You can define when a pod can receive traffic. |
| Rollout check | You can verify the update is moving safely. |
| Rollback command | You can return to the last safer version. |

## Your First Ten Minutes

Use this order:

1. Read the desired-state idea before the object table.
2. Match deployment, pod, service, probe, and rollout to plain meanings.
3. Name the readiness check in user-facing terms.
4. Write the rollout card fields.
5. Check that rollback is named before deployment is considered safe.

## Before Writing the Kubernetes Rollout Card

Do not treat a running pod as the same thing as a safe rollout. You are ready when the work shows deployment, replicas, service, readiness probe, rollout check, and rollback path.

## Core Objects

| Object | Plain meaning |
| --- | --- |
| Deployment | The desired app version and replica count |
| Pod | One running copy of the workload |
| Service | Stable network access to pods |
| Probe | Health evidence Kubernetes can act on |
| Rollout | The controlled movement from old version to new version |

## Safe Rollout Card

~~~sh
deployment_name="learner-api"
replicas="2"
service_name="learner-api-service"
readiness_probe="/health"
rollout_check="kubectl rollout status deployment/learner-api"
rollback_command="kubectl rollout undo deployment/learner-api"

printf '%s\\n' "$deployment_name" "$replicas" "$service_name" "$readiness_probe" "$rollout_check" "$rollback_command"
~~~

## Practice

Write a Kubernetes rollout card with deployment, replicas, service, readiness probe, rollout check, and rollback command.

## Explain It Back

Explain why readiness probes protect users during a rollout.`,
      quiz: [
        {
          type: "true_false",
          question: "A readiness probe helps decide whether a pod should receive traffic.",
          correct: true,
          explanation: "Readiness probes help Kubernetes avoid sending traffic to pods that are not ready.",
        },
      ],
    },
    {
      slug: "cicd-pipelines",
      title: "CI/CD Pipelines & GitHub Actions",
      hours: "5-6",
      sortOrder: 4,
      content: `# CI/CD Pipelines & GitHub Actions

A pipeline is a release checklist that runs the same way every time. Good pipelines make failure visible before production users see it.

## Start Here: Gate Before Automation

At the start, do not call a pipeline safe because it runs automatically. First name the trigger, test command, build output, secret rule, deploy gate, and rollback condition.

Automation should make release authority clearer, not blur it. A green build is evidence, but production release still needs a visible gate and a recovery rule.

## How to Use This Room Screen

This room is about release gates before automation files. Read the screen in this order:

- Learn: understand why repeatable checks protect users.
- Inspect: identify the trigger, test, build, secret rule, deploy gate, and rollback condition.
- Build: write one CI/CD release card before describing workflow YAML.
- Prove: explain why a green build is not the same thing as release approval.

"Practice after the lesson" means you should know the safety gates before the tool syntax. A pipeline is only useful when failure and release authority are visible.

## One Clean Pass Through This Room

Before the workspace, read CI/CD as a release-gate-before-automation chain:

1. The trigger says what event is allowed to start the pipeline.
2. The test command says what behavior is checked before release.
3. The build artifact says what would be promoted.
4. The secret rule says how credentials stay out of logs and commits.
5. The deploy gate and rollback condition say who controls production and when to revert.

That chain keeps automation from hiding release authority. A green build is useful evidence, but it is not the same thing as approved, recoverable production change.

Do not start by writing workflow YAML. First say the CI/CD release card in one sentence: trigger, test command, build artifact, secret rule, deploy gate, and rollback condition.

## What the Workspace Will Ask You To Do

The workspace will ask for a CI/CD release card:

| Workspace item | What it proves |
| --- | --- |
| Trigger | You can name what starts the pipeline. |
| Test command | You can define the behavior check. |
| Build artifact | You can name what gets released. |
| Secret rule | You can keep credentials out of logs and commits. |
| Deploy gate | You can show who or what controls production release. |
| Rollback condition | You can name when the team should revert. |

## Your First Ten Minutes

Use this order:

1. Read the gates before the starter card.
2. Name the intended trigger.
3. Add the test and build evidence.
4. Write the secret and deploy gate rules.
5. Finish with a rollback condition that a team can act on.

## Before Writing the CI/CD Release Card

Do not call a workflow safe just because it runs automatically. You are ready when the work shows trigger, test, build artifact, secret rule, deploy gate, and rollback condition.

## Pipeline Gates

| Gate | What it proves |
| --- | --- |
| Trigger | The pipeline starts from an intended branch or event |
| Test | The code still behaves as expected |
| Build | A release artifact can be produced |
| Secret rule | Credentials are not printed or committed |
| Deploy gate | A human or environment rule controls release |
| Rollback condition | The team knows when to revert |

## Release Card

~~~sh
pipeline_trigger="push to main after review"
test_command="npm test"
build_artifact="web build artifact"
secret_rule="use repository secrets and never echo token values"
deploy_gate="production deploy requires protected environment approval"
rollback_condition="rollback if health check or error budget fails"

printf '%s\\n' "$pipeline_trigger" "$test_command" "$build_artifact" "$secret_rule" "$deploy_gate" "$rollback_condition"
~~~

## Practice

Define a CI/CD release card for a web service. Include trigger, test command, build artifact, secret rule, deploy gate, and rollback condition.

## Explain It Back

Explain why a green build without a deploy gate is not the same thing as a safe release.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What should a pipeline do with secret values?",
          options: ["Use protected secrets and avoid printing them", "Commit them to the repo", "Echo them for debugging", "Put them in screenshots"],
          correct: 0,
          explanation: "Pipelines should use protected secret storage and avoid logging secret values.",
        },
      ],
    },
    {
      slug: "terraform-iac",
      title: "Infrastructure as Code with Terraform",
      hours: "5-6",
      sortOrder: 5,
      content: `# Infrastructure as Code with Terraform

Infrastructure as code turns infrastructure changes into reviewable files. The main habit is not "apply quickly"; it is "plan, review, apply, and check drift."

## Start Here: Plan Before Apply

At the start, do not make infrastructure changes from memory. First name the resource scope, state backend, plan review, variable rule, apply gate, and drift check.

Infrastructure code is safest when reality can be compared to the plan. The state and review steps are evidence, not paperwork.

## How to Use This Room Screen

This room is about change discipline before Terraform commands. Read the screen in this order:

- Learn: understand why plan, review, apply, and drift checks belong together.
- Inspect: identify scope, state backend, plan review, variable rule, apply gate, and drift check.
- Build: write one infrastructure change card before any apply action.
- Prove: explain why state deserves stronger protection than ordinary notes.

"Practice after the lesson" means you should be able to review the change shape before touching infrastructure. The card is the safety frame for the plan.

## One Clean Pass Through This Room

Before the workspace, read infrastructure as a plan-before-apply chain:

1. The resource scope says what infrastructure is affected.
2. The state backend says where the managed-resource record is protected.
3. The plan review says what will change before anything changes.
4. The variable rule keeps environment data explicit.
5. The apply gate and drift check say who may change reality and how reality is compared later.

That chain keeps infrastructure code reviewable. Terraform is safest when the plan, state, approval, and drift evidence are treated as part of the change.

Do not start by running apply. First say the infrastructure change card in one sentence: scope, state backend, reviewed plan, variable rule, apply gate, and drift check.

## What the Workspace Will Ask You To Do

The workspace will ask for an infrastructure change card:

| Workspace item | What it proves |
| --- | --- |
| Resource scope | You can name what infrastructure is affected. |
| State backend | You can protect the record of managed resources. |
| Plan review | You can see changes before they happen. |
| Variable rule | You can keep environment data explicit. |
| Apply gate | You can control who can make changes. |
| Drift check | You can detect changes made outside code. |

## Your First Ten Minutes

Use this order:

1. Read the change-discipline sentence before the table.
2. Name the resource scope and state backend.
3. Treat plan review as evidence, not ceremony.
4. Add variable and apply-gate rules.
5. Finish with a drift check so reality can be compared to code.

## Before Writing the Infrastructure Change Card

Do not start with apply. You are ready when the work shows scope, protected state, reviewed plan, explicit variables, apply gate, and drift check.

## Change Discipline

| Item | Purpose |
| --- | --- |
| Resource scope | Names what infrastructure is affected |
| State backend | Protects the record of managed resources |
| Plan review | Shows what will change before apply |
| Variable rule | Keeps environment data explicit |
| Apply gate | Controls who can make changes |
| Drift check | Finds changes made outside code |

## Infrastructure Change Card

~~~sh
resource_scope="web service instance and load balancer"
state_backend="remote locked backend"
plan_review="terraform plan reviewed before apply"
variable_rule="environment variables are declared and secrets stay out of state when possible"
apply_gate="apply requires peer review and maintenance window"
drift_check="run scheduled plan to detect unmanaged changes"

printf '%s\\n' "$resource_scope" "$state_backend" "$plan_review" "$variable_rule" "$apply_gate" "$drift_check"
~~~

## Practice

Write an infrastructure change card with scope, state backend, plan review, variable rule, apply gate, and drift check.

## Explain It Back

Explain why Terraform state needs stronger protection than ordinary notes.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What is the safest first step before applying infrastructure changes?",
          options: ["Review the plan", "Delete the state", "Skip variables", "Apply from memory"],
          correct: 0,
          explanation: "The plan shows the intended changes before infrastructure is modified.",
        },
      ],
    },
    {
      slug: "monitoring-observability",
      title: "Monitoring & Observability",
      hours: "4-6",
      sortOrder: 6,
      content: `# Monitoring & Observability

Monitoring asks whether the system is healthy. Observability gives enough evidence to understand why it is unhealthy.

## Start Here: Signal Before Dashboard

At the start, do not collect every chart because a tool can display it. First name the SLO, metric signal, log signal, alert condition, runbook action, and owner.

Useful observability turns a health change into a response path. A dashboard without an action and owner becomes noise instead of operations evidence.

## How to Use This Room Screen

This room is about useful signals before dashboard noise. Read the screen in this order:

- Learn: understand the difference between health status and evidence for why health changed.
- Inspect: identify the SLO, metric, log, alert, runbook, and owner.
- Build: write one observability card before claiming the system is monitored.
- Prove: explain why an alert needs an action and an owner.

"Practice after the lesson" means you should not collect every metric you can imagine. Pick the signals that help someone respond.

## One Clean Pass Through This Room

Before the workspace, read observability as a signal-before-dashboard chain:

1. The SLO says what user-facing health target matters.
2. The metric signal says what measurable clue changes.
3. The log signal preserves context for investigation.
4. The alert condition says when action is needed.
5. The response action and owner say who acts first and what they do.

That chain keeps dashboards from becoming noise. Monitoring is useful when a signal leads to an accountable response, not when it only adds another chart.

Do not start by adding charts. First say the observability card in one sentence: SLO, metric signal, log signal, alert condition, response action, and owner.

## What the Workspace Will Ask You To Do

The workspace will ask for an observability card:

| Workspace item | What it proves |
| --- | --- |
| SLO | You can define the user-facing target. |
| Metric signal | You can name a measurable health clue. |
| Log signal | You can preserve context for investigation. |
| Alert condition | You can define when action is needed. |
| Runbook action | You can name the first response step. |
| Dashboard owner | You can assign follow-up responsibility. |

## Your First Ten Minutes

Use this order:

1. Read the health-versus-evidence idea first.
2. Name the SLO in user-facing terms.
3. Pick one metric and one log signal.
4. Write the alert condition and first action.
5. Add an owner so the alert does not become noise.

## Before Writing the Observability Card

Do not confuse a dashboard with response. You are ready when the work shows SLO, metric signal, log signal, alert condition, runbook action, and accountable owner.

## Signals That Matter

| Signal | Example |
| --- | --- |
| SLO | Page loads succeed within the target |
| Metric | Error rate, latency, saturation, queue depth |
| Log | Request and error context |
| Alert | A condition that needs action |
| Runbook | The first response step |
| Owner | The role accountable for follow-up |

## Incident Evidence Card

~~~sh
service_slo="99 percent successful learning route responses"
metric_signal="5xx error rate above baseline"
log_signal="recent deploy errors in application logs"
alert_condition="error rate above threshold for five minutes"
runbook_action="compare deploy time, check logs, and rollback if health fails"
dashboard_owner="on-call DevOps engineer"

printf '%s\\n' "$service_slo" "$metric_signal" "$log_signal" "$alert_condition" "$runbook_action" "$dashboard_owner"
~~~

## Practice

Write an observability card with SLO, metric signal, log signal, alert condition, runbook action, and dashboard owner.

## Explain It Back

Explain why an alert without a runbook creates noise instead of response.`,
      quiz: [
        {
          type: "multiple_choice",
          question: "What makes an alert actionable?",
          options: ["A clear condition and a runbook action", "A loud label only", "A screenshot with no owner", "A dashboard nobody checks"],
          correct: 0,
          explanation: "An actionable alert names the condition and the first response step.",
        },
      ],
    },
  ],
};

