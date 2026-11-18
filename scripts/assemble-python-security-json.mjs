#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/python-security')

const stages = [
  {
    slug: 'stage-01',
    title: 'Python Basics for Security',
    hours: '2-3',
    sortOrder: 1,
    md: 'stage-01-python-basics-security.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why should bad log lines return a clear fallback such as None?',
        options: [
          'So the analyst can see that input did not match the expected shape',
          'So errors are hidden from the report',
          'So every line becomes a successful alert',
          'So the parser can skip field names',
        ],
        correct: 0,
        explanation:
          'Bad input is normal in security data. The tool should expose it intentionally instead of pretending it parsed correctly.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Edit log_parser.py locally, save, and run python3 in a terminal',
          'Expect the lesson page to run and grade your code for you',
          'Parse live production logs without authorization',
          'Build a port scanner before learning field shape',
        ],
        correct: 0,
        explanation:
          'Lessons are read in ASV Learn; practice is edit → save → run on your computer with synthetic lab data.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the first security habit this stage teaches?',
        options: [
          'Parse one record shape correctly before automating many things',
          'Connect to every reachable host',
          'Hide malformed lines in the final report',
          'Use regex before understanding delimiters',
        ],
        correct: 0,
        explanation:
          'Dependable parsing is the foundation for trustworthy security automation.',
      },
    ],
  },
  {
    slug: 'stage-02',
    title: 'Network Programming for Safe Checks',
    hours: '2-3',
    sortOrder: 2,
    md: 'stage-02-network-safe-checks.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a network practice script define before any check?',
        options: [
          'Allowed scope',
          'A public random target',
          'A hidden credential',
          'A destructive action',
        ],
        correct: 0,
        explanation: 'Safe security practice starts with authorized scope and bounded behavior.',
      },
      {
        type: 'multiple_choice',
        question: 'In Stage 02 local practice, service_records are:',
        options: [
          'Sample evidence for modeling — not permission to scan live networks',
          'Live scan results you must run against the internet',
          'Credentials for SSH access',
          'Optional decoration with no safety meaning',
        ],
        correct: 0,
        explanation:
          'This stage models scoped summaries with lab data; real probing requires explicit authorization.',
      },
      {
        type: 'multiple_choice',
        question: 'What should happen to targets outside allowed_targets?',
        options: [
          'They are excluded and visible in the excluded list',
          'They are summarized anyway for completeness',
          'They are scanned quietly in the background',
          'They replace in-scope targets automatically',
        ],
        correct: 0,
        explanation: 'Out-of-scope targets must be excluded deliberately, not hidden or probed.',
      },
    ],
  },
  {
    slug: 'stage-03',
    title: 'HTTP Evidence & Automation',
    hours: '2-3',
    sortOrder: 3,
    md: 'stage-03-http-evidence-automation.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which item should an HTTP evidence script avoid collecting?',
        options: [
          'Tokens and cookies',
          'Status code',
          'Allowed URL',
          'Header presence (safe fields only)',
        ],
        correct: 0,
        explanation:
          'Sensitive tokens and cookies are not needed for beginner evidence and should not be collected.',
      },
      {
        type: 'multiple_choice',
        question: 'What file do you build locally in Stage 03?',
        options: [
          'http_evidence.py with allowed URLs and a record_response helper',
          'A hosted in-lesson HTTP client with no local files',
          'A script that logs full Set-Cookie headers',
          'An unlimited request loop with no rate limit constant',
        ],
        correct: 0,
        explanation: 'Stage 03 practice documents HTTP collection policy in a local Python file you run yourself.',
      },
      {
        type: 'multiple_choice',
        question: 'Why define rate_limit_per_minute even in lab code?',
        options: [
          'To model bounded automation before touching real endpoints',
          'To maximize request volume',
          'To replace authorization checks',
          'Because ASV Learn runs the requests for you',
        ],
        correct: 0,
        explanation: 'Rate limits are part of responsible HTTP automation design.',
      },
    ],
  },
  {
    slug: 'stage-04',
    title: 'Cryptography & Hashing Decisions',
    hours: '2-3',
    sortOrder: 4,
    md: 'stage-04-cryptography-hashing.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does a crypto decision card document before you pick an algorithm?',
        options: [
          'Asset, purpose, salt or key rule, secret handling, and migration',
          'Only the fastest hash name available',
          'Every password in plain text for debugging',
          'A custom cipher because libraries are untrustworthy',
        ],
        correct: 0,
        explanation:
          'Professional crypto starts with purpose and operating rules, not algorithm popularity.',
      },
      {
        type: 'multiple_choice',
        question: 'Password storage typically needs which purpose?',
        options: [
          'One-way slow hashing with unique salts — not reversible encryption',
          'Reversible encryption so admins can read passwords',
          'MD5 without salt for speed',
          'Custom XOR because it is simple',
        ],
        correct: 0,
        explanation: 'Verification uses hashing; encryption implies recovery with a key, which is wrong for password storage.',
      },
      {
        type: 'multiple_choice',
        question: 'What does secrets.compare_digest help reduce in lab verification code?',
        options: [
          'Timing side channels when comparing secret strings',
          'The need for salts entirely',
          'Network latency on HTTP calls',
          'The size of log files automatically',
        ],
        correct: 0,
        explanation: 'compare_digest compares strings in constant time — a good habit when checking digests.',
      },
    ],
  },
  {
    slug: 'stage-05',
    title: 'Building Defensive Security Tools',
    hours: '2-3',
    sortOrder: 5,
    md: 'stage-05-defensive-security-tools.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What safety boundary fits a beginner defensive security helper?',
        options: [
          'Read-only analysis with human review before action',
          'Automatic account changes without review',
          'Hidden execution with no logs',
          'Access to unrelated systems',
        ],
        correct: 0,
        explanation: 'Beginner tools should produce evidence and require review before sensitive action.',
      },
      {
        type: 'multiple_choice',
        question: 'Which fields belong on a tool decision card?',
        options: [
          'Purpose, input source, output fields, safety boundary, audit fields, human review',
          'Only the Python function name',
          'API keys and passwords for faster automation',
          'Every possible network target',
        ],
        correct: 0,
        explanation: 'The card is the contract that keeps defensive helpers reviewable and bounded.',
      },
      {
        type: 'multiple_choice',
        question: 'In defensive_tool.py, summarize_failed_logins should:',
        options: [
          'Count only failed-login events for analyst review',
          'Auto-disable accounts when count exceeds one',
          'Delete log entries after summarizing',
          'Mix all event types into one count',
        ],
        correct: 0,
        explanation: 'The summary supports human review; it does not take destructive action.',
      },
    ],
  },
  {
    slug: 'stage-06',
    title: 'Secure Coding Practices',
    hours: '2-3',
    sortOrder: 6,
    md: 'stage-06-secure-coding-practices.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a safe handler do with an unknown action?',
        options: [
          'Return a safe error',
          'Run it anyway',
          'Log secrets',
          'Create a new permission',
        ],
        correct: 0,
        explanation: 'Unknown actions should fail closed with a safe response.',
      },
      {
        type: 'multiple_choice',
        question: 'Why use one generic safe_error for all rejection paths?',
        options: [
          'So attackers cannot probe which validation failed',
          'So developers never know why input failed internally',
          'So only accepted requests are logged',
          'So unknown actions run with lower privilege',
        ],
        correct: 0,
        explanation: 'External callers get a generic message; detailed reasons stay internal if needed.',
      },
      {
        type: 'multiple_choice',
        question: 'What file do you build locally in Stage 06?',
        options: [
          'validate_request.py with accepted and rejected test cases',
          'A hosted sandbox grader inside ASV Learn',
          'A script that logs full payloads including passwords',
          'An allow-by-default action handler',
        ],
        correct: 0,
        explanation: 'Local practice proves fail-closed validation with explicit test cases you run in a terminal.',
      },
    ],
  },
]

const course = {
  slug: 'python-security',
  title: 'Python for Cybersecurity',
  description:
    'Use Python for safe security automation: parse logs, model scoped network checks, handle HTTP evidence, reason about hashing, build defensive helpers, and validate risky input. Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.',
  difficulty: 'Intermediate',
  hours: '15-18',
  topics: ['Python', 'Security Automation', 'Log Analysis', 'Secure Coding'],
  certBadges: ['Security Automation'],
  runtime: 'python',
  source: {
    fixture: 'content/courses/technodex-fixtures/python-security.ts',
    live: 'https://technodex.io/courses/python-security',
    markdown: 'content/courses/python-security/',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/python-security.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
