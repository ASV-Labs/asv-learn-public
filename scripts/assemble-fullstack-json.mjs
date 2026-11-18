#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/fullstack')

const stages = [
  {
    slug: 'html-css-js',
    title: 'HTML, CSS & JavaScript Foundations',
    hours: '8-10',
    sortOrder: 1,
    md: 'stage-01-html-css-js.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'In the status card exercise, which layer makes success visually readable?',
        options: [
          'The terminal only',
          'package.json',
          'A database migration',
          'CSS',
        ],
        correct: 3,
        explanation: 'CSS communicates state with color, spacing, and contrast the user can see.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Skip the browser and only edit package.json',
          'Edit index.html, styles.css, and app.js locally and test in a browser',
          'Memorize React hooks before HTML',
          'Skip JavaScript until deployment',
        ],
        correct: 1,
        explanation: 'Lessons are read in ASV Learn; practice is edit → save → run on your computer.',
      },
      {
        type: 'multiple_choice',
        question: 'Why can a button click feel broken to users?',
        options: [
          'HTML cannot contain buttons',
          'CSS removes all text from the page',
          'The page shows no visible state change after the action',
          'JavaScript always runs on the server only',
        ],
        correct: 2,
        explanation: 'Behavior needs readable evidence — updated text or styling — not only console output.',
      },
    ],
  },
  {
    slug: 'react-frontend',
    title: 'React Frontend Development',
    hours: '10-12',
    sortOrder: 2,
    md: 'stage-02-react-frontend.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which item usually comes from a parent component?',
        options: [
          'A database migration',
          'A prop',
          'A server port',
          'A rollback image',
        ],
        correct: 1,
        explanation: 'Props are values passed into a component from outside.',
      },
      {
        type: 'multiple_choice',
        question: 'What file do you run locally in Stage 02 before installing React?',
        options: [
          'A Dockerfile with no component plan',
          'A Prisma schema only',
          'An nginx config template',
          'view_plan.js with node',
        ],
        correct: 3,
        explanation: 'House style proves the component contract in plain Node.js first.',
      },
      {
        type: 'multiple_choice',
        question: 'What does an empty render state describe?',
        options: [
          'A server 500 error',
          'What the user sees when expected data is not available yet',
          'A completed migration',
          'A CSS file missing from disk',
        ],
        correct: 1,
        explanation: 'Empty states are normal UI cases — zero progress is not necessarily an error.',
      },
    ],
  },
  {
    slug: 'nodejs-backend',
    title: 'Node.js & Express Backend',
    hours: '10-12',
    sortOrder: 3,
    md: 'stage-03-nodejs-backend.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should input validation do on POST /api/lessons?',
        options: [
          'Hide every server error as 200',
          'Skip status codes entirely',
          'Reject missing or blank title before returning success',
          'Return 201 for every request',
        ],
        correct: 2,
        explanation: 'Validation protects the route by rejecting input that does not match the contract.',
      },
      {
        type: 'multiple_choice',
        question: 'Which status should a successful create usually return?',
        options: [
          '404',
          '201',
          '301',
          '418',
        ],
        correct: 1,
        explanation: '201 Created tells the client a new resource was added.',
      },
      {
        type: 'multiple_choice',
        question: 'Why write api_contract.js before installing Express?',
        options: [
          'Because Node cannot run without Express',
          'To replace HTTP entirely',
          'To avoid learning status codes',
          'So method, path, validation, and responses are explicit and testable',
        ],
        correct: 3,
        explanation: 'Plain handlers make the frontend-backend agreement reviewable in the terminal.',
      },
    ],
  },
  {
    slug: 'databases-prisma',
    title: 'Databases & Prisma ORM',
    hours: '8-10',
    sortOrder: 4,
    md: 'stage-04-databases-prisma.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why should a query purpose be named before building a model?',
        options: [
          'It removes the need for fields',
          'It ties the schema to a user-facing question',
          'It replaces migrations',
          'It hides relations',
        ],
        correct: 1,
        explanation: 'A query purpose keeps the model connected to behavior the application needs.',
      },
      {
        type: 'multiple_choice',
        question: 'What does "add fields before requiring them" protect against?',
        options: [
          'Removing all indexes automatically',
          'Disabling seed data',
          'Breaking existing rows when a new column becomes NOT NULL',
          'Preventing any future migrations',
        ],
        correct: 2,
        explanation: 'Safe migrations backfill or default data before constraints tighten.',
      },
      {
        type: 'multiple_choice',
        question: 'In data_plan.js, listPublishedLessons simulates what?',
        options: [
          'A CSS animation library',
          'Production connection pooling',
          'The product query before Prisma generates SQL',
          'Automatic schema deletion',
        ],
        correct: 2,
        explanation: 'In-memory lists practice query design honestly without pretending infra exists.',
      },
    ],
  },
  {
    slug: 'deployment-devops',
    title: 'Deployment & DevOps Basics',
    hours: '6-8',
    sortOrder: 5,
    md: 'stage-05-deployment-devops.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a rollback step explain?',
        options: [
          'How to delete all logs permanently',
          'How to skip builds forever',
          'How to hide configuration from the team',
          'How to recover when health fails',
        ],
        correct: 3,
        explanation: 'Rollback planning names the recovery path when the release does not stay healthy.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is a successful build not enough evidence of a healthy deploy?',
        options: [
          'Build commands delete source code',
          'Health routes are only for local HTML files',
          'Rollback is automatic without planning',
          'The public health route and logs still need to pass after restart',
        ],
        correct: 3,
        explanation: 'User-facing proof comes after the new process is serving traffic.',
      },
      {
        type: 'true_false',
        question: 'Environment secrets should live in source code for easier deploys.',
        correct: false,
        explanation: 'Required variables belong outside the repository so keys can rotate safely.',
      },
    ],
  },
  {
    slug: 'projects-portfolio',
    title: 'Capstone Projects & Portfolio',
    hours: '12-14',
    sortOrder: 6,
    md: 'stage-06-projects-portfolio.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does a proof metric do in a portfolio proof card?',
        options: [
          'Replaces the user flow',
          'Shows how you know the feature works',
          'Hides the API endpoint',
          'Deletes the data model',
        ],
        correct: 1,
        explanation: 'A proof metric makes project evidence specific and reviewable.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a capstone README emphasize first?',
        options: [
          'Only screenshots with no run instructions',
          'Every technology you have ever heard of',
          'Problem, local setup, demo steps, and verifiable proof',
          'Marketing adjectives instead of behavior',
        ],
        correct: 2,
        explanation: 'Reviewers need behavior they can verify, not polish alone.',
      },
      {
        type: 'multiple_choice',
        question: 'Which local file summarizes the full-stack loop in Stage 06?',
        options: [
          'A minified bundle with no README',
          'portfolio_proof.js',
          'An automatic CI badge only',
          'A minified bundle with no comments',
        ],
        correct: 1,
        explanation: 'The proof card connects problem, flow, API, data, metric, and next iteration.',
      },
    ],
  },
]

const course = {
  slug: 'fullstack',
  title: 'Full Stack Development',
  description:
    'Build complete web applications from browser structure through React views, APIs, databases, deployment, and portfolio proof. Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; practice is local Node.js with a proof checklist.',
  difficulty: 'Intermediate',
  hours: '60-70',
  topics: ['Frontend', 'React', 'APIs', 'Databases', 'Deployment', 'Portfolio'],
  certBadges: ['Full Stack Developer'],
  runtime: 'javascript',
  source: {
    fixture: 'content/courses/technodex-fixtures/fullstack.ts',
    live: 'https://technodex.io/courses/fullstack',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/fullstack.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
