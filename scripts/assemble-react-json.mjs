#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/react')

const stages = [
  {
    slug: 'js-prerequisites',
    title: 'JavaScript Prerequisites',
    hours: '6-8',
    sortOrder: 1,
    md: 'stage-01-js-prerequisites.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why does React rely so much on arrays?',
        options: [
          'Arrays replace all components',
          'Arrays store deployment secrets',
          'Lists of data often become lists of UI',
          'Arrays remove the need for state',
        ],
        correct: 2,
        explanation: 'React frequently maps arrays of data into arrays of rendered UI items.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Skip writing any file and only read the lesson once',
          'Memorize JSX before running any JavaScript',
          'Edit component_checklist.js locally and run node in a terminal',
          'Skip empty-state planning until React is installed',
        ],
        correct: 2,
        explanation:
          'Lessons are read in ASV Learn; practice is edit → save → run on your computer.',
      },
      {
        type: 'multiple_choice',
        question: 'What should you name before writing JSX?',
        options: [
          'Only CSS class names',
          'Production API keys',
          'Props, state-like values, and empty/ready screen behavior',
          'Database migration order',
        ],
        correct: 2,
        explanation: 'Data shape and screen states make JSX predictable instead of magical.',
      },
    ],
  },
  {
    slug: 'react-core',
    title: 'React Core: Components & Hooks',
    hours: '8-10',
    sortOrder: 2,
    md: 'stage-02-react-core.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which value belongs in local state?',
        options: [
          'Every prop',
          'A package version',
          'A database table',
          'A value the component owns and can change',
        ],
        correct: 3,
        explanation: 'Local state is for values the component owns and updates over time.',
      },
      {
        type: 'multiple_choice',
        question: 'Why should buttonLabel be derived instead of stored as separate state?',
        options: [
          'React forbids strings in state',
          'Derived values cannot appear in the UI',
          'Props cannot be read inside components',
          'It can be computed from complete state and avoids duplicate sources of truth',
        ],
        correct: 3,
        explanation: 'Duplicate state for computed text causes sync bugs when values disagree.',
      },
      {
        type: 'multiple_choice',
        question: 'What file captures the component contract in Stage 02?',
        options: [
          'A package-lock.json with no component plan',
          'package-lock.json',
          'component_recipe.js with props, state, handlers, and render rule',
          'An nginx configuration file',
        ],
        correct: 2,
        explanation: 'The recipe documents behavior before hooks and JSX implementation.',
      },
    ],
  },
  {
    slug: 'routing-data',
    title: 'Routing, Data Fetching & Forms',
    hours: '8-10',
    sortOrder: 3,
    md: 'stage-03-routing-data.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a loader state communicate?',
        options: [
          'That routing is disabled',
          'That validation is unnecessary',
          'What the app is doing while data is not ready',
          'That all errors are hidden',
        ],
        correct: 2,
        explanation: 'A loader state keeps the user informed while the app waits for data.',
      },
      {
        type: 'multiple_choice',
        question: 'Why preserve typed form values after a failed submit?',
        options: [
          'Browsers require it for all inputs',
          'It removes the need for validation',
          'Losing user input on network failure breaks trust',
          'It disables error messages',
        ],
        correct: 2,
        explanation: 'Users should not re-type work because a save request failed.',
      },
      {
        type: 'multiple_choice',
        question: 'When should title validation run in the Stage 03 plan?',
        options: [
          'Only after a successful server response',
          'Before submit, on the client, with clear errors',
          'Never — servers always validate',
          'After the user navigates away',
        ],
        correct: 1,
        explanation: 'Client validation gives immediate feedback before a request is sent.',
      },
    ],
  },
  {
    slug: 'state-performance',
    title: 'State Management & Performance',
    hours: '8-10',
    sortOrder: 4,
    md: 'stage-04-state-performance.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'When should performance work begin?',
        options: [
          'Before the feature behavior is known',
          'When there is a named render risk or measurement',
          'By memoizing every value',
          'By removing all state',
        ],
        correct: 1,
        explanation: 'Performance work is stronger when tied to a specific risk and evidence.',
      },
      {
        type: 'multiple_choice',
        question: 'Where should filterText live in the lesson list example?',
        options: [
          'In global context on day one',
          'Only in the database',
          'In every child card as duplicate state',
          'Local to the search component that owns typing',
        ],
        correct: 3,
        explanation: 'Filter text is owned by the search UI unless siblings truly need it.',
      },
      {
        type: 'multiple_choice',
        question: 'What does simulateRender cardRenders stand in for?',
        options: [
          'Exact React DevTools profiler output',
          'Number of npm packages installed',
          'How much list UI work might repeat on each change',
          'Git commit count',
        ],
        correct: 2,
        explanation: 'The exercise counts naive rerenders before deciding if memoization helps.',
      },
    ],
  },
  {
    slug: 'testing-accessibility',
    title: 'Testing & Accessibility',
    hours: '8-10',
    sortOrder: 5,
    md: 'stage-05-testing-accessibility.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why include a keyboard path?',
        options: [
          'It replaces all tests',
          'It hides form labels',
          'It removes state',
          'It proves the feature can be operated without a mouse',
        ],
        correct: 3,
        explanation: 'Keyboard operation is core accessibility evidence for interactive UI.',
      },
      {
        type: 'multiple_choice',
        question: 'Why can an accessible label help testing?',
        options: [
          'It removes the need for assertions',
          'It disables keyboard focus',
          'It gives stable, meaningful names for assistive tech and selectors',
          'It hides error messages',
        ],
        correct: 2,
        explanation: 'Good labels improve usability and give tests something specific to target.',
      },
      {
        type: 'multiple_choice',
        question: 'What bug risk does the Stage 05 plan emphasize?',
        options: [
          'Using too many CSS variables',
          'Failed save erasing learner notes',
          'Choosing the wrong Node version',
          'Missing a favicon',
        ],
        correct: 1,
        explanation: 'Error-path behavior that loses user data is a high-impact frontend bug.',
      },
    ],
  },
  {
    slug: 'react-projects',
    title: 'Capstone: Four React Projects',
    hours: '12-16',
    sortOrder: 6,
    md: 'stage-06-react-projects.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does a component tree show?',
        options: [
          'Which server owns the database',
          'How to bypass testing',
          'Why accessibility can be skipped',
          'How the UI is split into reviewable parts',
        ],
        correct: 3,
        explanation: 'A component tree shows how the interface is decomposed into meaningful parts.',
      },
      {
        type: 'multiple_choice',
        question: 'What makes a portfolio project reviewable at this course depth?',
        options: [
          'Screenshots only with no written plan',
          'Behavior proof: data flow, states, tests, and accessibility evidence',
          'Four empty repos with README templates',
          'Claiming production traffic without metrics',
        ],
        correct: 1,
        explanation: 'Reviewers need to understand behavior and decisions, not only visuals.',
      },
      {
        type: 'multiple_choice',
        question: 'What should iterationPlan contain?',
        options: [
          'A promise to finish all four apps this week',
          'One deliberate next improvement, not vague polish-everything',
          'Removal of all error states',
          'Skipping accessibility until v2',
        ],
        correct: 1,
        explanation: 'Honest iteration names the next scoped step after core behavior works.',
      },
    ],
  },
]

const course = {
  slug: 'react',
  title: 'React & Modern Frontend',
  description:
    'Build modern frontend interfaces with JavaScript foundations, components, routing, data flow, performance, testing, accessibility, and portfolio proof. Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; practice is local Node.js with a proof checklist.',
  icon: 'RX',
  difficulty: 'Beginner',
  hours: '30-40',
  topics: ['JavaScript', 'React', 'Routing', 'State', 'Testing', 'Accessibility'],
  certBadges: ['React Developer'],
  runtime: 'javascript',
  source: {
    fixture: 'content/courses/technodex-fixtures/react.ts',
    live: 'https://technodex.io/courses/react',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/react.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
