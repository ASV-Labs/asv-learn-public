#!/usr/bin/env node
/**
 * Assemble python-zero.json from local markdown modules + concept quizzes,
 * then push TipTap content to the live local course.
 *
 * Usage: node scripts/assemble-and-push-python-zero.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { markdownToTipTap } from './lib/markdown-to-tiptap.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_PATH = resolve(ROOT, 'content/courses/python-zero.json')
const OUT_DIR = resolve(ROOT, 'content/courses')

const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
const API = `${BASE}/api/v1`
const COURSE_UUID = process.env.LH_COURSE_UUID || 'course_ea63f73a-a1c3-4581-a488-ef2043f1351f'

const MODULE_FILES = {
  'module-00': 'module-00-local-python.md',
  'module-01': 'module-01-first-programs.md',
  'module-02': 'module-02-variables.md',
  'module-03': 'module-03-input-math.md',
  'module-04': 'module-04-local.md',
  'module-05': 'module-05-local.md',
  'module-06': 'module-06-local.md',
  'module-07': 'module-07-local.md',
  'module-08': 'module-08-local.md',
  'module-09': 'module-09-local.md',
  'module-10': 'module-10-local.md',
  'module-11': 'module-11-local.md',
  'module-12': 'module-12-local.md',
  'module-13': 'module-13-local.md',
  'module-14': 'module-14-local.md',
  'module-15': 'module-15-local.md',
  'module-16': 'module-16-local.md',
  'module-17': 'module-17-local.md',
  'module-18': 'module-18-local.md',
  'module-19': 'module-19-local.md',
  'module-20': 'module-20-local.md',
  'module-21': 'module-21-local.md',
  'module-22': 'module-22-local.md',
}

const HOURS = {
  'module-00': '1-2',
  'module-01': '1-2',
  'module-02': '2-3',
  'module-03': '2-3',
  'module-04': '2-3',
  'module-05': '2-3',
  'module-06': '3-4',
  'module-07': '3-4',
  'module-08': '3-4',
  'module-09': '3-4',
  'module-10': '2-3',
  'module-11': '3-4',
  'module-12': '3-4',
  'module-13': '3-4',
  'module-14': '3-4',
  'module-15': '2-3',
  'module-16': '3-4',
  'module-17': '2-3',
  'module-18': '3-4',
  'module-19': '3-4',
  'module-20': '4-5',
  'module-21': '15-25',
  'module-22': '0.5-1',
}

const QUIZZES = {
  'module-00': [
    {
      type: 'multiple_choice',
      question: 'What do you need before Module 01 in this course?',
      options: [
        'A working local Python 3 install and one script you can run in a terminal',
        'Only a browser — code never runs on your computer',
        'A paid cloud server before writing hello.py',
        'Memorizing every Python keyword first',
      ],
      correct: 0,
      explanation:
        'Lessons are read in ASV Learn; practice runs on your computer with edit → save → run until an in-lesson runner exists.',
    },
    {
      type: 'multiple_choice',
      question: 'Which command best verifies Python 3 is available?',
      options: [
        'python3 --version (or python --version on Windows)',
        'open hello.py',
        'mkdir python',
        'echo Python',
      ],
      correct: 0,
      explanation: 'Asking the interpreter for its version proves it is installed and on your PATH.',
    },
  ],
  'module-01': [
    {
      type: 'multiple_choice',
      question: 'What does print() do in a local Python script?',
      options: [
        'Sends readable output to the terminal',
        'Saves the file automatically',
        'Installs Python packages',
        'Deletes unused variables',
      ],
      correct: 0,
      explanation: 'print() is how beginners see what the program did in the terminal.',
    },
    {
      type: 'multiple_choice',
      question: 'Why do text values usually need quotation marks in print()?',
      options: [
        'So Python treats them as strings, not variable names',
        'So the terminal runs faster',
        'So comments are ignored',
        'So integers become floats',
      ],
      correct: 0,
      explanation: 'Without quotes, Python looks for a variable with that name.',
    },
  ],
  'module-02': [
    {
      type: 'multiple_choice',
      question: 'What is a variable?',
      options: [
        'A name that stores a value so code can reuse it',
        'A comment Python prints every time',
        'A folder that holds course videos',
        'A keyboard shortcut for the terminal',
      ],
      correct: 0,
      explanation: 'Variables let programs remember and reuse values.',
    },
    {
      type: 'multiple_choice',
      question: 'Which value is a boolean in Python?',
      options: ['True', '"True"', 'true', '1.0'],
      correct: 0,
      explanation: 'Booleans use capital True / False with no quotes.',
    },
  ],
  'module-03': [
    {
      type: 'multiple_choice',
      question: 'What type does input() always return?',
      options: [
        'A string (text), even if the person typed digits',
        'An integer if the text looks like a number',
        'A float by default',
        'A boolean',
      ],
      correct: 0,
      explanation: 'You must convert with int() or float() before useful math.',
    },
    {
      type: 'multiple_choice',
      question: 'Why does "45" / 60 fail?',
      options: [
        'You cannot divide a string by a number — convert with int() first',
        'Python forbids division entirely',
        '45 is too large for beginners',
        'The slash character is only for comments',
      ],
      correct: 0,
      explanation: 'Conversion turns text into a number you can calculate with.',
    },
  ],
  'module-04': [
    {
      type: 'multiple_choice',
      question: 'When does an elif branch run?',
      options: [
        'Only if earlier if/elif conditions were false and this condition is true',
        'At the same time as the if branch',
        'Only after else runs',
        'Every time the file is saved',
      ],
      correct: 0,
      explanation: 'Python checks conditions in order and stops at the first true branch.',
    },
    {
      type: 'multiple_choice',
      question: 'What is the else branch for?',
      options: [
        'The fallback path when earlier conditions are false',
        'A second true path that always runs with if',
        'A way to loop forever',
        'A comment block',
      ],
      correct: 0,
      explanation: 'else covers every remaining case.',
    },
  ],
  'module-05': [
    {
      type: 'multiple_choice',
      question: 'What does an accumulator variable do in a loop?',
      options: [
        'Keeps a running total or collection that updates each pass',
        'Stops Python from using memory',
        'Prints only the first item',
        'Converts strings to integers automatically',
      ],
      correct: 0,
      explanation: 'Accumulators like total = total + score build a result across iterations.',
    },
    {
      type: 'multiple_choice',
      question: 'What is the main risk of a while loop?',
      options: [
        'It can run forever if the stop condition never becomes true',
        'It cannot print output',
        'It only works with dictionaries',
        'It deletes the loop variable',
      ],
      correct: 0,
      explanation: 'Always change something that moves toward the stop condition.',
    },
  ],
  'module-06': [
    {
      type: 'multiple_choice',
      question: 'Which collection stores unique values with no duplicates?',
      options: ['set', 'list', 'tuple', 'string'],
      correct: 0,
      explanation: 'Sets remove duplicates by design.',
    },
    {
      type: 'multiple_choice',
      question: 'How do you read a value from a dictionary?',
      options: [
        'Use its key inside square brackets, like task["status"]',
        'Call print on the dictionary name only',
        'Use a numeric index starting at 1',
        'Divide the key by the value',
      ],
      correct: 0,
      explanation: 'Dictionaries map keys to values.',
    },
  ],
  'module-07': [
    {
      type: 'multiple_choice',
      question: 'Why write a function?',
      options: [
        'To package reusable behavior behind a clear name',
        'To prevent the terminal from showing output',
        'To turn every variable into a string',
        'To skip saving the file',
      ],
      correct: 0,
      explanation: 'Functions reduce copy-paste and make intent readable.',
    },
    {
      type: 'multiple_choice',
      question: 'What does return do?',
      options: [
        'Sends a value back to the caller so it can be stored or printed',
        'Always prints to the terminal',
        'Deletes the function after one use',
        'Restarts the whole script',
      ],
      correct: 0,
      explanation: 'return hands a result back; print only displays.',
    },
  ],
  'module-08': [
    {
      type: 'multiple_choice',
      question: 'What does a try/except block help you do?',
      options: [
        'Catch expected failures and choose a safe response instead of crashing',
        'Make invalid data become valid automatically',
        'Speed up every loop',
        'Hide syntax errors forever',
      ],
      correct: 0,
      explanation: 'Validation and except blocks keep tools usable when input is messy.',
    },
    {
      type: 'multiple_choice',
      question: 'Before converting user text to an int, what should you often check?',
      options: [
        'That the text is not empty and looks like digits (or handle ValueError)',
        'That the filename ends in .csv',
        'That True equals False',
        'That the terminal is dark mode',
      ],
      correct: 0,
      explanation: 'Empty or non-numeric text breaks int() unless you validate or catch.',
    },
  ],
  'module-09': [
    {
      type: 'multiple_choice',
      question: 'Why write data to a file?',
      options: [
        'So information survives after the program exits',
        'So Python runs without a terminal',
        'So variables become read-only',
        'So imports are no longer needed',
      ],
      correct: 0,
      explanation: 'Files give persistence between runs.',
    },
    {
      type: 'multiple_choice',
      question: 'What is a good habit when opening files?',
      options: [
        'Use a with open(...) as f: block so the file closes cleanly',
        'Never close files',
        'Only open files in binary for text notes',
        'Write to /dev/null on every save',
      ],
      correct: 0,
      explanation: 'with handles closing even if an error occurs.',
    },
  ],
  'module-10': [
    {
      type: 'multiple_choice',
      question: 'What does import do?',
      options: [
        'Loads a module so you can use its tools in your script',
        'Deletes unused files from disk',
        'Converts every string to JSON',
        'Starts a new virtual machine',
      ],
      correct: 0,
      explanation: 'The standard library is available through import.',
    },
    {
      type: 'multiple_choice',
      question: 'Where do many built-in tools like datetime live?',
      options: [
        'In Python’s standard library modules',
        'Only inside the browser',
        'Only after you buy a license',
        'Inside every .txt file',
      ],
      correct: 0,
      explanation: 'datetime, math, json, pathlib, and more ship with Python.',
    },
  ],
  'module-11': [
    {
      type: 'multiple_choice',
      question: 'What is a class?',
      options: [
        'A blueprint for creating objects that share data and behavior',
        'A single printed line of output',
        'A folder of CSV files',
        'A terminal keyboard shortcut',
      ],
      correct: 0,
      explanation: 'Objects are instances created from a class.',
    },
    {
      type: 'multiple_choice',
      question: 'In a method, what does self usually refer to?',
      options: [
        'The current object the method is working on',
        'The previous function’s return value',
        'The operating system username',
        'The Python installer',
      ],
      correct: 0,
      explanation: 'Methods use self to read and update that object’s attributes.',
    },
  ],
  'module-12': [
    {
      type: 'multiple_choice',
      question: 'What does inheritance let you do?',
      options: [
        'Build a new class that reuses and extends another class',
        'Hide all errors from the terminal',
        'Turn lists into sets automatically',
        'Skip writing __init__ forever',
      ],
      correct: 0,
      explanation: 'Child classes share parent behavior and can specialize it.',
    },
    {
      type: 'multiple_choice',
      question: 'What are dataclasses useful for?',
      options: [
        'Concise classes that mainly hold structured data fields',
        'Downloading packages from the internet',
        'Formatting hard drives',
        'Replacing the terminal',
      ],
      correct: 0,
      explanation: 'dataclasses reduce boilerplate for data-shaped objects.',
    },
  ],
  'module-13': [
    {
      type: 'multiple_choice',
      question: 'What is a regular expression best for here?',
      options: [
        'Finding or validating text patterns',
        'Installing Python',
        'Drawing the course logo',
        'Sorting integers faster than sorted()',
      ],
      correct: 0,
      explanation: 'Regex helps clean and match structured text.',
    },
    {
      type: 'multiple_choice',
      question: 'Why prefer clear string methods before complex regex?',
      options: [
        'Simple strip/lower/replace work is easier to read and debug',
        'String methods never work on Unicode',
        'Regex is illegal in beginner courses',
        'print() rejects regex results',
      ],
      correct: 0,
      explanation: 'Reach for regex when patterns are truly pattern-shaped.',
    },
  ],
  'module-14': [
    {
      type: 'multiple_choice',
      question: 'What does a summary report usually need before averaging scores?',
      options: [
        'A validated collection of numeric values',
        'A random boolean',
        'A CSS stylesheet',
        'An empty dictionary only',
      ],
      correct: 0,
      explanation: 'Bad or missing numbers must be handled before averages.',
    },
    {
      type: 'multiple_choice',
      question: 'Why separate cleaned records from rejected ones?',
      options: [
        'So you can report both useful results and data-quality problems',
        'So Python runs in silent mode',
        'So files cannot be saved',
        'So lists become tuples',
      ],
      correct: 0,
      explanation: 'Honest reporting includes what was skipped.',
    },
  ],
  'module-15': [
    {
      type: 'multiple_choice',
      question: 'What does datetime help you calculate?',
      options: [
        'Dates, times, and differences like days remaining',
        'Only RGB colors',
        'Only file permissions',
        'Only floating-point rounding',
      ],
      correct: 0,
      explanation: 'Scheduling and deadlines need date arithmetic.',
    },
    {
      type: 'multiple_choice',
      question: 'Why be careful with date formats as text?',
      options: [
        'Different regions write dates differently; parse deliberately',
        'Dates cannot be stored in variables',
        'Python forbids the datetime module on Windows',
        'Timestamps only work offline',
      ],
      correct: 0,
      explanation: 'Parse with an explicit format when you control the input.',
    },
  ],
  'module-16': [
    {
      type: 'multiple_choice',
      question: 'What is a unit test trying to prove?',
      options: [
        'That a small piece of code behaves the way you expect',
        'That the course website is online',
        'That the keyboard layout is US English',
        'That print() is faster than return',
      ],
      correct: 0,
      explanation: 'Tests lock in expected behavior as you change code.',
    },
    {
      type: 'multiple_choice',
      question: 'How does logging differ from casual print debugging?',
      options: [
        'Logging is structured, leveled, and suitable for lasting diagnostics',
        'Logging cannot show strings',
        'Logging replaces all functions',
        'Logging only works inside browsers',
      ],
      correct: 0,
      explanation: 'Use logging for durable observability; keep prints for quick checks.',
    },
  ],
  'module-17': [
    {
      type: 'multiple_choice',
      question: 'Why use a virtual environment?',
      options: [
        'To isolate project dependencies from other projects',
        'To hide the terminal window',
        'To compile Python into Java',
        'To disable file saving',
      ],
      correct: 0,
      explanation: 'venvs keep package versions project-local.',
    },
    {
      type: 'multiple_choice',
      question: 'What belongs in a clear project layout?',
      options: [
        'Code, tests, data, and docs in predictable places',
        'Every file dumped on the Desktop with random names',
        'Only screenshots of the editor',
        'A single 10,000-line notebook with no folders',
      ],
      correct: 0,
      explanation: 'Structure makes portfolio projects explainable.',
    },
  ],
  'module-18': [
    {
      type: 'multiple_choice',
      question: 'What are command-line arguments for?',
      options: [
        'Passing options into a program when you launch it',
        'Changing the computer’s wallpaper',
        'Encrypting the Python installer',
        'Renaming the operating system',
      ],
      correct: 0,
      explanation: 'CLI flags make tools scriptable without editing source each time.',
    },
    {
      type: 'multiple_choice',
      question: 'Why read configuration from environment variables sometimes?',
      options: [
        'To keep secrets and deploy settings out of source files',
        'Because Python cannot open text files',
        'Because argparse is deprecated',
        'Because dictionaries cannot hold strings',
      ],
      correct: 0,
      explanation: 'Env vars are a common config channel for tools and servers.',
    },
  ],
  'module-19': [
    {
      type: 'multiple_choice',
      question: 'Why prefer pathlib for filesystem work?',
      options: [
        'It gives object-oriented, cross-platform path operations',
        'It deletes all CSV files on import',
        'It only works on macOS',
        'It replaces the need for functions',
      ],
      correct: 0,
      explanation: 'Path objects are clearer than brittle string concatenation.',
    },
    {
      type: 'multiple_choice',
      question: 'What should automation scripts do before mass renaming or deleting?',
      options: [
        'Preview or plan changes and confirm paths carefully',
        'Run as administrator with no checks',
        'Ignore exceptions silently',
        'Write random bytes to every file',
      ],
      correct: 0,
      explanation: 'Filesystem automation needs caution and clear dry-run thinking.',
    },
  ],
  'module-20': [
    {
      type: 'multiple_choice',
      question: 'What is CSV best at?',
      options: [
        'Tabular rows of fields people and spreadsheets can share',
        'Storing executable machine code',
        'Replacing version control',
        'Drawing vector logos',
      ],
      correct: 0,
      explanation: 'CSV is a common interchange format for tables.',
    },
    {
      type: 'multiple_choice',
      question: 'When is JSON a strong fit?',
      options: [
        'Nested structured data for programs to read and write',
        'Only one integer per file',
        'Raw microphone audio',
        'PDF page layout',
      ],
      correct: 0,
      explanation: 'JSON maps well to lists and dictionaries in Python.',
    },
  ],
  'module-21': [
    {
      type: 'multiple_choice',
      question: 'What makes this capstone portfolio-worthy?',
      options: [
        'A real CLI tool with storage, reports, tests, and documentation you can explain',
        'A single print of a to-do dictionary',
        'A screenshot with no code',
        'Copying a tutorial without changes',
      ],
      correct: 0,
      explanation: 'Employers and mentors care about working evidence you understand.',
    },
    {
      type: 'multiple_choice',
      question: 'Which pair of outputs should the tracker support?',
      options: [
        'JSON for durable storage and CSV for shareable reports',
        'Only emoji status icons',
        'Only PDF certificates',
        'Only browser cookies',
      ],
      correct: 0,
      explanation: 'JSON + CSV cover app state and human/spreadsheet handoff.',
    },
  ],
  'module-22': [
    {
      type: 'multiple_choice',
      question: 'What does a course certificate prove here?',
      options: [
        'You completed the course path — not a degree, license, or job offer',
        'Guaranteed employment at any company',
        'A government programming license',
        'That Python was invented by the learner',
      ],
      correct: 0,
      explanation: 'Be honest about what credentials mean.',
    },
    {
      type: 'multiple_choice',
      question: 'What should you keep as portfolio evidence alongside any certificate?',
      options: [
        'Your scripts folder, capstone README, and work you can explain',
        'Only the certificate PNG with no code',
        'Someone else’s private repository',
        'Blank quiz answers',
      ],
      correct: 0,
      explanation: 'Proof is the work product, not the badge alone.',
    },
  ],
}

function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide admin credentials file')
  const m = readFileSync(credPath, 'utf8').match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password')
  return m[1].trim()
}

async function loginCookie() {
  const email = process.env.LH_EMAIL || 'admin@school.dev'
  const password = loadPassword()
  const loginRes = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password }),
  })
  if (!loginRes.ok) throw new Error(`login failed: ${loginRes.status}`)
  const setCookie = loginRes.headers.getSetCookie?.() || []
  const cookie = setCookie.map((c) => c.split(';')[0]).join('; ')
  const body = await loginRes.json()
  const token = body.access_token || body.tokens?.access_token
  return { cookie, token }
}

async function api(auth, method, path, { json, query } = {}) {
  const url = new URL(`${API}${path}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null) url.searchParams.set(k, String(v))
    }
  }
  const body = json !== undefined ? JSON.stringify(json) : undefined
  const headerSets =
    method === 'PUT'
      ? [{ Cookie: auth.cookie, ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}) }]
      : [
          { Authorization: `Bearer ${auth.token}`, ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}) },
          { Cookie: auth.cookie, ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}) },
        ]
  let lastErr = ''
  for (const headers of headerSets) {
    const res = await fetch(url, { method, headers, body })
    const text = await res.text()
    let data
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }
    if (res.ok) return data
    lastErr = `${method} ${path} -> ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data).slice(0, 400)}`
  }
  throw new Error(lastErr)
}

function assembleCourse(existing) {
  const stages = existing.stages.map((stage) => {
    const file = MODULE_FILES[stage.slug]
    if (!file) throw new Error(`No markdown mapping for ${stage.slug}`)
    const path = resolve(OUT_DIR, file)
    if (!existsSync(path)) throw new Error(`Missing ${path}`)
    const content = readFileSync(path, 'utf8')
    const quiz = QUIZZES[stage.slug]
    if (!quiz) throw new Error(`Missing quizzes for ${stage.slug}`)
    return {
      ...stage,
      hours: HOURS[stage.slug] || stage.hours,
      content,
      quiz,
    }
  })

  return {
    ...existing,
    description:
      'A beginner-to-intermediate Python path you run on your own computer: terminal practice, edit→save→run lessons, proof checklists, and a portfolio capstone progress tracker for entry-level data, automation, support, QA, and technical assistant work.',
    topics: existing.topics,
    certBadges: ['Python Foundations', 'Progress Tracker Portfolio'],
    hours: '70-95',
    stages,
  }
}

async function main() {
  const existing = JSON.parse(readFileSync(COURSE_PATH, 'utf8'))
  const course = assembleCourse(existing)
  writeFileSync(COURSE_PATH, JSON.stringify(course, null, 2) + '\n')
  console.log(`Wrote ${COURSE_PATH} (${course.stages.length} stages)`)

  const auth = await loginCookie()

  // Update course metadata
  await api(auth, 'PUT', `/courses/${COURSE_UUID}`, {
    json: {
      name: course.title,
      description: course.description,
      about:
        'Beginner · 70–95 hours · Local Python practice · Topics: Python, Programming Foundations, Automation, Data Handling, Portfolio Capstone',
      learnings: JSON.stringify([
        'Install and run Python locally',
        'Write useful scripts with variables, decisions, loops, and functions',
        'Work with files, CSV/JSON, and a portfolio progress tracker',
      ]),
      tags: JSON.stringify(course.topics),
      public: true,
      published: true,
      thumbnail_type: 'both',
    },
  })
  console.log('Updated course metadata')

  const meta = await api(auth, 'GET', `/courses/${COURSE_UUID}/meta`, {
    query: { with_unpublished_activities: true },
  })

  for (const stage of course.stages) {
    const n = Number((stage.slug.match(/module-(\d+)/) || [])[1])
    if (!Number.isFinite(n)) continue
    const chapter = meta.chapters?.[n]
    const actUuid = chapter?.activities?.[0]?.activity_uuid
    if (!actUuid) {
      console.warn(`SKIP ${stage.slug}: no live activity`)
      continue
    }
    const tipTap = markdownToTipTap(stage.content)
    await api(auth, 'PUT', `/activities/${actUuid}`, {
      json: {
        name: stage.title,
        content: tipTap,
        published: true,
      },
    })
    console.log(`Pushed ${stage.slug} -> ${actUuid} (${tipTap.content?.length || 0} blocks)`)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
