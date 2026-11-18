#!/usr/bin/env node
/**
 * Update Module 00 (orientation) to local-Python beginner setup.
 * Updates content/courses/python-zero.json and the live activity on localhost:8088.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_PATH = resolve(ROOT, 'content/courses/python-zero.json')
const MD_PATH = resolve(ROOT, 'content/courses/module-00-local-python.md')

const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
const API = `${BASE}/api/v1`
const COURSE_UUID = process.env.LH_COURSE_UUID || 'course_ea63f73a-a1c3-4581-a488-ef2043f1351f'
const NEW_TITLE = 'Course Orientation: Meet Python on Your Computer'

function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide admin credentials file')
  const text = readFileSync(credPath, 'utf8')
  const m = text.match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password from credentials file')
  return m[1].trim()
}

function markdownToTipTap(md) {
  // Strip leading markdown H1 — TipTap will get it as heading from content
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const content = []
  let i = 0
  let para = []
  let inCode = false
  let codeLang = 'plaintext'
  let codeLines = []

  const flushPara = () => {
    if (!para.length) return
    const text = para.join(' ').trim()
    para = []
    if (!text) return
    content.push({ type: 'paragraph', content: [{ type: 'text', text }] })
  }

  const flushCode = () => {
    content.push({
      type: 'codeBlock',
      attrs: { language: codeLang || 'plaintext' },
      content: codeLines.length ? [{ type: 'text', text: codeLines.join('\n') }] : undefined,
    })
    codeLines = []
    inCode = false
    codeLang = 'plaintext'
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      flushPara()
      if (inCode) flushCode()
      else {
        inCode = true
        codeLang = line.slice(3).trim() || 'plaintext'
        codeLines = []
      }
      i += 1
      continue
    }

    if (inCode) {
      codeLines.push(line)
      i += 1
      continue
    }

    if (/^\|/.test(line)) {
      flushPara()
      const tableLines = []
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i])
        i += 1
      }
      content.push({
        type: 'codeBlock',
        attrs: { language: 'plaintext' },
        content: [{ type: 'text', text: tableLines.join('\n') }],
      })
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    if (heading) {
      flushPara()
      content.push({
        type: 'heading',
        attrs: { level: heading[1].length },
        content: [{ type: 'text', text: heading[2].trim() }],
      })
      i += 1
      continue
    }

    if (/^[-*]\s+/.test(line) || /^- \[[ xX]\]\s+/.test(line)) {
      flushPara()
      const items = []
      while (
        i < lines.length &&
        (/^[-*]\s+/.test(lines[i]) || /^- \[[ xX]\]\s+/.test(lines[i]))
      ) {
        const text = lines[i]
          .replace(/^- \[[ xX]\]\s+/, '')
          .replace(/^[-*]\s+/, '')
          .trim()
        items.push({
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
        })
        i += 1
      }
      content.push({ type: 'bulletList', content: items })
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      flushPara()
      const items = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: lines[i].replace(/^\d+\.\s+/, '').trim() }],
            },
          ],
        })
        i += 1
      }
      content.push({ type: 'orderedList', content: items })
      continue
    }

    if (!line.trim()) {
      flushPara()
      i += 1
      continue
    }

    // Strip simple markdown bold/links for TipTap text nodes
    const cleaned = line
      .trim()
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    para.push(cleaned)
    i += 1
  }

  flushPara()
  if (inCode) flushCode()
  if (!content.length) {
    content.push({ type: 'paragraph', content: [{ type: 'text', text: '(empty lesson)' }] })
  }
  return { type: 'doc', content }
}

async function api(token, method, path, { json, query } = {}) {
  const url = new URL(`${API}${path}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null) url.searchParams.set(k, String(v))
    }
  }
  const headers = { Authorization: `Bearer ${token}` }
  let body
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(json)
  }
  const res = await fetch(url, { method, headers, body })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    throw new Error(
      `${method} ${path} -> ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data).slice(0, 500)}`
    )
  }
  return data
}

async function main() {
  if (!existsSync(MD_PATH)) throw new Error(`Missing ${MD_PATH}`)
  if (!existsSync(COURSE_PATH)) throw new Error(`Missing ${COURSE_PATH}`)

  const markdown = readFileSync(MD_PATH, 'utf8')
  const tipTap = markdownToTipTap(markdown)

  // 1) Update source JSON
  const course = JSON.parse(readFileSync(COURSE_PATH, 'utf8'))
  const stage = course.stages.find((s) => s.slug === 'module-00') || course.stages[0]
  stage.title = NEW_TITLE
  stage.content = markdown
  // Refresh orientation quiz for local-Python reality
  stage.quiz = [
    {
      type: 'multiple_choice',
      question: 'What do you need before Module 01 in this prototype?',
      options: [
        'A working local Python 3 install and one script you can run in a terminal',
        'Only a browser — code never runs on your computer',
        'A paid cloud server before writing hello.py',
        'Memorizing every Python keyword first',
      ],
      correct: 0,
      explanation:
        'This prototype does not yet provide an in-lesson write-and-run workspace, so local Python plus edit → save → run is the beginner path.',
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
      explanation: 'Asking the interpreter for its version proves the program is installed and reachable from your terminal.',
    },
  ]
  writeFileSync(COURSE_PATH, JSON.stringify(course, null, 2) + '\n')
  console.log(`Updated ${COURSE_PATH} module-00 title + content (${markdown.length} chars)`)

  // 2) Live update
  const email = process.env.LH_EMAIL || 'admin@school.dev'
  const password = loadPassword()
  const loginRes = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password }),
  })
  if (!loginRes.ok) throw new Error(`login failed: ${loginRes.status}`)
  const loginBody = await loginRes.json()
  const token = loginBody.access_token || loginBody.tokens?.access_token || loginBody.token
  if (!token) throw new Error('login response missing access token')

  const meta = await api(token, 'GET', `/courses/${COURSE_UUID}/meta`, {
    query: { with_unpublished_activities: true },
  })
  const ch0 = meta.chapters?.[0]
  if (!ch0) throw new Error('No chapter 0 on live course')
  const act = ch0.activities?.[0]
  if (!act?.activity_uuid) throw new Error('No activity on chapter 0')

  // Chapter updates take numeric chapter id
  await api(token, 'PUT', `/chapters/${ch0.id}`, {
    json: {
      name: NEW_TITLE,
      description: 'Install and verify local Python 3, then run hello.py',
    },
  })

  await api(token, 'PUT', `/activities/${act.activity_uuid}`, {
    json: {
      name: NEW_TITLE,
      content: tipTap,
      published: true,
    },
  })

  console.log(`Live chapter id=${ch0.id} activity=${act.activity_uuid}`)
  console.log(`Title → ${NEW_TITLE}`)
  console.log(`TipTap blocks: ${tipTap.content.length}`)
  console.log(
    `Open: ${BASE}/orgs/charles-learning-lab/course/${COURSE_UUID.replace(/^course_/, '')}`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
