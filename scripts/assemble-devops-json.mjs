#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/devops')

const stages = [
  {
    slug: 'linux-shell',
    title: 'Linux & Shell Scripting Foundations',
    hours: '4-5',
    sortOrder: 1,
    md: 'stage-01-linux-shell.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why inspect logs before restarting a service?',
        options: [
          'To make the command longer',
          'To avoid using health checks',
          'To skip rollback planning',
          'To preserve evidence of the failure',
        ],
        correct: 3,
        explanation: 'Logs can explain the failure. Restarting first can hide the evidence.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is user-facing health stronger than process status alone?',
        options: [
          'Process status always includes HTTP codes',
          'Health checks replace the need for logs',
          'A process can run while users still see errors',
          'Users never report symptoms',
        ],
        correct: 2,
        explanation: 'Green process state does not guarantee the user experience works.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Restart production services for practice',
          'Skip writing a plan file',
          'Skip rollback planning until senior level',
          'Write response_checklist.sh and run it in your own terminal or lab',
        ],
        correct: 3,
        explanation: 'Practice is local or authorized lab only — write the checklist and run it yourself.',
      },
    ],
  },
  {
    slug: 'docker-containers',
    title: 'Docker & Containerization',
    hours: '5-6',
    sortOrder: 2,
    md: 'stage-02-docker-containers.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which item should not be baked into a container image?',
        options: [
          'Application code',
          'Runtime dependencies',
          'Secret tokens',
          'Health-check path',
        ],
        correct: 2,
        explanation:
          'Secrets should be supplied by the runtime environment or secret manager, not baked into an image.',
      },
      {
        type: 'multiple_choice',
        question: 'Why name a rollback image tag before deploy?',
        options: [
          'Because Docker deletes old tags automatically',
          'So recovery does not become a guess under pressure',
          'To avoid health checks',
          'To skip CI pipelines',
        ],
        correct: 1,
        explanation: 'Known-good rollback tags make failed releases recoverable.',
      },
      {
        type: 'multiple_choice',
        question: 'What does the container health check prove?',
        options: [
          'The image has no vulnerabilities ever',
          'The app inside the container can answer after start',
          'Secrets are stored in the Dockerfile',
          'Kubernetes is installed on the laptop',
        ],
        correct: 1,
        explanation: 'Health checks show readiness to serve traffic, not perfect security.',
      },
    ],
  },
  {
    slug: 'kubernetes',
    title: 'Kubernetes Orchestration',
    hours: '5-7',
    sortOrder: 3,
    md: 'stage-03-kubernetes.md',
    quiz: [
      {
        type: 'true_false',
        question: 'A readiness probe helps decide whether a pod should receive traffic.',
        correct: true,
        explanation: 'Readiness probes help Kubernetes avoid sending traffic to pods that are not ready.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is a running pod not the same as a safe rollout?',
        options: [
          'Pods never restart during deploys',
          'Services stop routing during rollouts',
          'The pod may not pass readiness or the new version may be unhealthy',
          'Readiness probes are optional decoration',
        ],
        correct: 2,
        explanation: 'Rollout safety depends on readiness and verification, not pod existence alone.',
      },
      {
        type: 'multiple_choice',
        question: 'What should k8s_rollout_card.sh include before changing a cluster?',
        options: [
          'Only the newest container tag',
          'Production admin passwords',
          'A list of unrelated microservices',
          'Deployment, replicas, service, readiness, rollout check, rollback command',
        ],
        correct: 3,
        explanation: 'The card forces rollout evidence and recovery to be named first.',
      },
    ],
  },
  {
    slug: 'cicd-pipelines',
    title: 'CI/CD Pipelines & GitHub Actions',
    hours: '5-6',
    sortOrder: 4,
    md: 'stage-04-cicd-pipelines.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a pipeline do with secret values?',
        options: [
          'Commit them to the repo',
          'Echo them for debugging',
          'Put them in screenshots',
          'Use protected secrets and avoid printing them',
        ],
        correct: 3,
        explanation: 'Pipelines should use protected secret storage and avoid logging secret values.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is a green build not the same as a safe production release?',
        options: [
          'Tests never run in CI',
          'Build artifacts cannot be tracked',
          'Production has no health endpoints',
          'Release still needs deploy gates, approval, and rollback conditions',
        ],
        correct: 3,
        explanation: 'Automation provides evidence; humans or environment rules still control release.',
      },
      {
        type: 'multiple_choice',
        question: 'What belongs on the CI/CD release card before writing workflow YAML?',
        options: [
          'Only the GitHub logo',
          'Trigger, test, artifact, secret rule, deploy gate, rollback condition',
          'Every possible workflow trigger ever invented',
          'Unlimited production deploy on every push',
        ],
        correct: 1,
        explanation: 'Gates define safety; YAML implements the gates.',
      },
    ],
  },
  {
    slug: 'terraform-iac',
    title: 'Infrastructure as Code with Terraform',
    hours: '5-6',
    sortOrder: 5,
    md: 'stage-05-terraform-iac.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the safest first step before applying infrastructure changes?',
        options: [
          'Delete the state',
          'Skip variables',
          'Review the plan',
          'Apply from memory',
        ],
        correct: 2,
        explanation: 'The plan shows the intended changes before infrastructure is modified.',
      },
      {
        type: 'multiple_choice',
        question: 'Why does Terraform state need stronger protection than ordinary notes?',
        options: [
          'State files are always public by design',
          'State stores only emoji reactions',
          'It maps code to real resources and enables destructive changes if leaked',
          'State replaces the need for code review',
        ],
        correct: 2,
        explanation: 'State is operational truth; protect it with remote backends and access control.',
      },
      {
        type: 'multiple_choice',
        question: 'What is drift detection for?',
        options: [
          'Speeding up apply without plans',
          'Removing the need for variables',
          'Disabling peer review',
          'Finding changes made outside IaC so reality matches reviewed code',
        ],
        correct: 3,
        explanation: 'Scheduled plans catch unmanaged changes that code review would miss.',
      },
    ],
  },
  {
    slug: 'monitoring-observability',
    title: 'Monitoring & Observability',
    hours: '4-6',
    sortOrder: 6,
    md: 'stage-06-monitoring-observability.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes an alert actionable?',
        options: [
          'A loud label only',
          'A screenshot with no owner',
          'A clear condition and a runbook action',
          'A dashboard nobody checks',
        ],
        correct: 2,
        explanation: 'An actionable alert names the condition and the first response step.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the difference between monitoring and observability in this course?',
        options: [
          'They are identical terms with no distinction',
          'Observability means more charts with no owners',
          'Monitoring asks if the system is healthy; observability helps explain why it is not',
          'Monitoring replaces runbooks',
        ],
        correct: 2,
        explanation: 'Useful observability ties signals to investigation and response.',
      },
      {
        type: 'multiple_choice',
        question: 'What should devops_capstone_review.txt list?',
        options: [
          'Every cloud account password',
          'One honest artifact from each stage you can show a reviewer',
          'Only screenshots of Grafana with no SLO',
          'Proof of unauthorized scanning',
        ],
        correct: 1,
        explanation: 'Capstone review ties six stage cards into reviewable local evidence.',
      },
    ],
  },
]

const course = {
  slug: 'devops',
  title: 'DevOps & Infrastructure',
  description:
    'Run applications with Linux, containers, Kubernetes, CI/CD, infrastructure as code, and observability evidence. Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; practice is local or authorized-lab shell work with a proof checklist.',
  icon: 'OPS',
  difficulty: 'Intermediate',
  hours: '28-36',
  topics: ['Linux', 'Containers', 'Kubernetes', 'CI/CD', 'Infrastructure', 'Observability'],
  certBadges: ['DevOps Engineer'],
  runtime: 'shell',
  source: {
    fixture: 'content/courses/technodex-fixtures/devops.ts',
    live: 'https://technodex.io/courses/devops',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/devops.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
