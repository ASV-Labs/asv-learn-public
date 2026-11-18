#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/ai-foundations-engineering')

const stages = [
  {
    slug: 'stage-01',
    title: 'ML Engineering Fundamentals',
    hours: '2-3',
    sortOrder: 1,
    md: 'stage-01-ml-engineering-fundamentals.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes a notebook demo different from an engineered AI service?',
        options: [
          'The service has contracts, validation, monitoring, and failure behavior',
          'The notebook has nicer charts',
          'The model file is larger',
          'The service never needs tests',
        ],
        correct: 0,
        explanation:
          'An engineered service exposes a testable boundary: input/output schemas, safe errors, and monitoring signals.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Edit service_contract.py locally, save, and run python3 in a terminal',
          'Run code in an automatic grader inside the lesson page',
          'Train a model before naming any schemas',
          'Skip the contract and deploy straight from a notebook',
        ],
        correct: 0,
        explanation:
          'Lessons are read in ASV Learn; practice is edit → save → run in a terminal on your computer.',
      },
      {
        type: 'multiple_choice',
        question: 'Which service-contract field describes how malformed input fails without leaking internals?',
        options: [
          'error_behavior',
          'input_schema',
          'output_schema',
          'monitoring_signal',
        ],
        correct: 0,
        explanation:
          'error_behavior defines the safe failure response callers see when input is invalid.',
      },
    ],
  },
  {
    slug: 'stage-02',
    title: 'Data Pipelines & Preprocessing',
    hours: '2-3',
    sortOrder: 2,
    md: 'stage-02-data-pipelines-preprocessing.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why does preprocessing need a rejection policy?',
        options: [
          'So bad rows fail clearly instead of poisoning training data',
          'So validation can be skipped',
          'So every row is accepted',
          'So logs include all raw private text',
        ],
        correct: 0,
        explanation:
          'A rejection policy makes invalid data visible and keeps bad rows out of training without silent drops.',
      },
      {
        type: 'multiple_choice',
        question: 'What should rejection logs prefer for sensitive ticket text?',
        options: [
          'Counts and reason codes without storing private text',
          'Full raw ticket bodies in shared logs',
          'Guessed labels for missing fields',
          'Skipping the owner field',
        ],
        correct: 0,
        explanation:
          'Production pipelines should report rejection counts and reasons without turning logs into a privacy leak.',
      },
      {
        type: 'multiple_choice',
        question: 'Which pipeline-card field names who fixes overnight failures?',
        options: ['owner', 'schema', 'transform_step', 'source'],
        correct: 0,
        explanation:
          'An owner makes pipeline failures actionable instead of everyone’s vague problem.',
      },
    ],
  },
  {
    slug: 'stage-03',
    title: 'Feature Engineering',
    hours: '2-3',
    sortOrder: 3,
    md: 'stage-03-feature-engineering.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is feature leakage?',
        options: [
          'Using information that would not be available at prediction time',
          'Using too few columns',
          'Renaming a feature',
          'Logging a metric',
        ],
        correct: 0,
        explanation:
          'Leakage lets the model train on future or post-decision information it will not have in production.',
      },
      {
        type: 'multiple_choice',
        question: 'Why can a leaky feature still look good in offline metrics?',
        options: [
          'It often raises validation scores while failing in production',
          'It always lowers accuracy',
          'It removes the need for an owner',
          'It replaces the leakage guard',
        ],
        correct: 0,
        explanation:
          'Leakage commonly inflates offline results; high accuracy is not proof the feature is honest.',
      },
      {
        type: 'multiple_choice',
        question: 'Which feature-plan field blocks post-resolution columns for a triage model?',
        options: [
          'leakage_guard',
          'expected_signal',
          'owner',
          'generated_features',
        ],
        correct: 0,
        explanation:
          'The leakage guard is the explicit rule that keeps unavailable fields out of training.',
      },
    ],
  },
  {
    slug: 'stage-04',
    title: 'Model Training & Validation',
    hours: '2-3',
    sortOrder: 4,
    md: 'stage-04-model-training-validation.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why compare a model to a baseline?',
        options: [
          'To prove the model improves on a simpler reference',
          'To avoid testing',
          'To hide weak performance',
          'To remove the need for monitoring',
        ],
        correct: 0,
        explanation:
          'A baseline shows whether complexity earns its keep against a cheap, honest reference.',
      },
      {
        type: 'multiple_choice',
        question: 'What is an error slice used for?',
        options: [
          'Inspecting a group of cases that averages can hide',
          'Skipping the promotion rule',
          'Replacing the dataset split',
          'Deleting the baseline',
        ],
        correct: 0,
        explanation:
          'Slices force review of fragile groups even when overall metrics look fine.',
      },
      {
        type: 'multiple_choice',
        question: 'A model beats accuracy but raises false positives. What should a good promotion rule do?',
        options: [
          'Block promotion when the false-positive constraint fails',
          'Promote because accuracy improved',
          'Ignore the validation metric',
          'Retrain on the test set until it passes',
        ],
        correct: 0,
        explanation:
          'Promotion rules should encode hard constraints, not only a single vanity metric.',
      },
    ],
  },
  {
    slug: 'stage-05',
    title: 'Deployment & Monitoring',
    hours: '2-3',
    sortOrder: 5,
    md: 'stage-05-deployment-monitoring.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What evidence matters after an AI service deploy?',
        options: [
          'Health, monitoring, and rollback evidence',
          'Only the model file name',
          'Only the launch announcement',
          'Only a screenshot of a chart',
        ],
        correct: 0,
        explanation:
          'Deployment proof includes health checks, watched signals, and a way to reverse a bad release.',
      },
      {
        type: 'multiple_choice',
        question: 'Why should a health check report the model version?',
        options: [
          'So operators can confirm which package is answering',
          'So monitoring can be skipped',
          'So rollback becomes unnecessary',
          'So callers never need an endpoint',
        ],
        correct: 0,
        explanation:
          'Versioned health responses make live packages identifiable during incidents.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the purpose of a rollback plan?',
        options: [
          'Return traffic to a previous approved package when signals go bad',
          'Rebuild the model from scratch during every incident',
          'Disable monitoring after launch',
          'Hide the alert owner',
        ],
        correct: 0,
        explanation:
          'Rollback should reuse a known-good package quickly, not invent a new build under pressure.',
      },
    ],
  },
  {
    slug: 'stage-06',
    title: 'Scaling ML Systems',
    hours: '3-4',
    sortOrder: 6,
    md: 'stage-06-scaling-ml-systems.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does scaling need besides more compute?',
        options: [
          'Backpressure, cost control, quality guards, and rollback triggers',
          'A longer model name',
          'No monitoring',
          'Only a larger dataset',
        ],
        correct: 0,
        explanation:
          'Scaling without limits turns growth into cascading failures, spend spikes, or quiet quality loss.',
      },
      {
        type: 'multiple_choice',
        question: 'What does backpressure do under overload?',
        options: [
          'Slows or rejects work safely instead of letting queues melt the system',
          'Deletes the capacity signal',
          'Removes cost controls',
          'Disables quality sampling',
        ],
        correct: 0,
        explanation:
          'Backpressure is a controlled refusal or deferral that protects the system when pressure is too high.',
      },
      {
        type: 'multiple_choice',
        question: 'Why keep a quality guard while traffic rises?',
        options: [
          'So volume does not hide drifting or worsening predictions',
          'So cost caps can be ignored',
          'So rollback triggers are never needed',
          'So workload type no longer matters',
        ],
        correct: 0,
        explanation:
          'Infrastructure can look fine while prediction quality degrades; quality guards catch that.',
      },
      {
        type: 'multiple_choice',
        question: 'When should a scaling runbook prefer rollback over adding capacity?',
        options: [
          'When latency or quality crosses the release threshold',
          'Whenever any request is slow once',
          'Only after the budget is fully spent',
          'Never — more machines always fix model quality',
        ],
        correct: 0,
        explanation:
          'Rollback triggers define when retreat is safer than amplifying a bad path with more compute.',
      },
    ],
  },
]

const course = {
  slug: 'ai-foundations-engineering',
  title: 'AI Foundations Engineering',
  description:
    'Build production-grade AI systems through data contracts, pipelines, feature plans, validation, deployment monitoring, and scaling runbooks. Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.',
  difficulty: 'Intermediate',
  hours: '15-18',
  topics: ['ML Engineering', 'MLOps', 'Production AI', 'Model Operations'],
  certBadges: ['ML Engineer'],
  runtime: 'python',
  source: {
    fixture: 'content/courses/technodex-fixtures/ai-foundations-engineering.ts',
    live: 'https://technodex.io/courses/ai-foundations-engineering',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/ai-foundations-engineering.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
