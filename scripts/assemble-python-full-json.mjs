#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/python-full')

const stages = [
  {
    slug: 'python-web-fundamentals',
    title: 'Python Web Fundamentals',
    hours: '6-8',
    sortOrder: 1,
    md: 'stage-01-python-web-fundamentals.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the main job of a Python web handler?',
        options: [
          'Write unrelated setup steps',
          'Replace the browser',
          'Store every secret in source code',
          'Receive a request and return a response',
        ],
        correct: 3,
        explanation: 'A handler receives request information, decides what should happen, and returns a response.',
      },
      {
        type: 'multiple_choice',
        question: 'What does a 404 response mean?',
        options: [
          'The requested resource was not found',
          'The user is signed in',
          'The server found the resource',
          'The request created a new record',
        ],
        correct: 0,
        explanation: '404 means the requested resource or route does not exist at that location.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 locally?',
        options: [
          'Install Django before tracing a single route',
          'Edit request_router.py and run python3 in a terminal',
          'Install Django before tracing routes',
          'Skip status codes until deployment',
        ],
        correct: 1,
        explanation: 'House style is honest local Python: edit → save → run on your machine.',
      },
    ],
  },
  {
    slug: 'django-framework',
    title: 'Django Web Framework',
    hours: '10-12',
    sortOrder: 2,
    md: 'stage-02-django-framework.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'In Django, what usually chooses which view handles a request?',
        options: [
          'A random README heading',
          'A button color',
          'urls.py',
          'A browser bookmark',
        ],
        correct: 2,
        explanation: 'Django URL patterns map request paths to views.',
      },
      {
        type: 'multiple_choice',
        question: 'What does django_routes.py simulate before Django is installed?',
        options: [
          'Production PostgreSQL replication',
          'Automatic admin CSS theming',
          'Skip writing a plan file',
          'A route table mapping paths to view responsibilities',
        ],
        correct: 3,
        explanation: 'Plain Python proves you understand urls.py shape without pretending infra exists.',
      },
      {
        type: 'multiple_choice',
        question: 'Where should business logic live in a well-organized Django app?',
        options: [
          'Only inside urlpatterns lists',
          'Only in browser localStorage',
          'In views and supporting modules, not inside the route table',
          'In anonymous git commits',
        ],
        correct: 2,
        explanation: 'urls.py chooses the view; the view performs application work.',
      },
    ],
  },
  {
    slug: 'fastapi-async',
    title: 'FastAPI & Async Python',
    hours: '8-10',
    sortOrder: 3,
    md: 'stage-03-fastapi-async.md',
    quiz: [
      {
        type: 'true_false',
        question: 'FastAPI can use Python type hints to validate request data.',
        correct: true,
        explanation: 'FastAPI uses type hints and Pydantic validation to check input.',
      },
      {
        type: 'multiple_choice',
        question: 'Why reject /users/not-a-number before handler logic runs?',
        options: [
          'Strings are never allowed in URLs',
          '404 is always correct for bad input',
          'Invalid path values must not enter trusted code paths',
          'Validation removes the need for handlers',
        ],
        correct: 2,
        explanation: 'Validation keeps functions from treating bad input as safe input.',
      },
      {
        type: 'multiple_choice',
        question: 'When is async def most appropriate?',
        options: [
          'For every function regardless of libraries used',
          'When the handler waits on async-aware I/O such as async HTTP or DB clients',
          'Only when deleting databases',
          'When avoiding type hints',
        ],
        correct: 1,
        explanation: 'Async helps when work waits on non-blocking I/O; it is not a badge for every route.',
      },
    ],
  },
  {
    slug: 'database-sqlalchemy',
    title: 'Databases & SQLAlchemy',
    hours: '8-10',
    sortOrder: 4,
    md: 'stage-04-database-sqlalchemy.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What question should you ask before writing a database query?',
        options: [
          'How do I skip validation?',
          'Which rows and fields do I need?',
          'How do I hide every error?',
          'How do I store secrets in the table name?',
        ],
        correct: 1,
        explanation: 'Good query design starts with the rows, fields, and failure cases you actually need.',
      },
      {
        type: 'multiple_choice',
        question: 'What should find_user_by_email return when no row matches?',
        options: [
          'The first user in the list',
          'A random user',
          'None',
          'An empty string only',
        ],
        correct: 2,
        explanation: 'Missing data is normal; callers should handle None instead of inventing rows.',
      },
      {
        type: 'multiple_choice',
        question: 'What does user_lookup.py practice before SQLAlchemy syntax?',
        options: [
          'Production shard management',
          'Query contract thinking with plain Python data',
          'Skip writing a plan file',
          'Automatic password hashing in tables',
        ],
        correct: 1,
        explanation: 'Lists of dictionaries model tables honestly on your computer first.',
      },
    ],
  },
  {
    slug: 'auth-security',
    title: 'Authentication & Security',
    hours: '8-10',
    sortOrder: 5,
    md: 'stage-05-auth-security.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is authorization?',
        options: [
          'Choosing a button color',
          'Checking what an authenticated user is allowed to do',
          'Turning HTML into CSS',
          'Renaming a browser tab',
        ],
        correct: 1,
        explanation: 'Authorization checks permissions after identity is known.',
      },
      {
        type: 'multiple_choice',
        question: 'Which status should an anonymous profile request return first?',
        options: [
          '200',
          '201',
          '302',
          '401',
        ],
        correct: 3,
        explanation: '401 means the caller is not identified yet; permission checks come after identity.',
      },
      {
        type: 'multiple_choice',
        question: 'Why must 401 and 403 stay distinct?',
        options: [
          'Browsers treat them as identical for caching',
          'They signal different failures: missing identity vs known-but-not-allowed',
          '403 always means the server crashed',
          '401 means the user is an admin',
        ],
        correct: 1,
        explanation: 'Different statuses help clients, users, and auditors respond correctly.',
      },
    ],
  },
  {
    slug: 'deployment-python',
    title: 'Deployment & Production Python',
    hours: '8-10',
    sortOrder: 6,
    md: 'stage-06-deployment-python.md',
    quiz: [
      {
        type: 'true_false',
        question: 'A deploy is proven only because the process says it restarted.',
        correct: false,
        explanation: 'A restart is not enough. You still need route checks and log review after the app is serving traffic.',
      },
      {
        type: 'multiple_choice',
        question: 'Why should migrations run before code expects new schema fields?',
        options: [
          'To skip tests entirely',
          'So running code matches the database shape users hit',
          'Because health routes replace migrations',
          'To store secrets in migration files',
        ],
        correct: 1,
        explanation: 'Schema and code must move together intentionally during deploy.',
      },
      {
        type: 'multiple_choice',
        question: 'What does deploy_checklist.py model?',
        options: [
          'A Kubernetes cluster installer',
          'Evidence required before calling a release done',
          'Skip writing a plan file',
          'Automatic blue-green traffic splitting',
        ],
        correct: 1,
        explanation: 'Plain Python data makes the proof chain reviewable before tooling hides it.',
      },
    ],
  },
]

const course = {
  slug: 'python-full',
  title: 'Python Full Stack',
  description:
    'Build Python web applications from request handling through APIs, databases, authentication, testing, and deployment. Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; practice is local Python with a proof checklist.',
  difficulty: 'Intermediate',
  hours: '50-60',
  topics: ['Python', 'HTTP', 'Django', 'FastAPI', 'Databases', 'Deployment'],
  certBadges: ['Python Developer'],
  runtime: 'python',
  source: {
    fixture: 'content/courses/technodex-fixtures/python-full-stack.ts',
    live: 'https://technodex.io/courses/python-full',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/python-full.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
