#!/usr/bin/env node
/**
 * Update a Python Zero module from a local markdown draft into
 * content/courses/python-zero.json and the live activity on localhost:8088.
 *
 * Usage:
 *   node scripts/update-local-module.mjs module-01
 *   node scripts/update-local-module.mjs module-02
 *   node scripts/update-local-module.mjs module-03
 *
 * Env:
 *   LH_BASE_URL, LH_EMAIL, LH_PASSWORD, LH_COURSE_UUID
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { markdownToTipTap } from './lib/markdown-to-tiptap.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_PATH = resolve(ROOT, 'content/courses/python-zero.json')

const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
const API = `${BASE}/api/v1`
const COURSE_UUID = process.env.LH_COURSE_UUID || 'course_ea63f73a-a1c3-4581-a488-ef2043f1351f'

const MODULES = {
  'module-01': {
    md: 'content/courses/module-01-first-programs.md',
    title: 'First Programs and Basic Output',
    description: 'Use print() in a local about_me.py script and read terminal output',
    chapterIndex: 1,
  },
  'module-02': {
    md: 'content/courses/module-02-variables.md',
    title: 'Variables and Data Types',
    description: 'Build a local profile_card.py with string, int, and boolean variables',
    chapterIndex: 2,
  },
  'module-03': {
    md: 'content/courses/module-03-input-math.md',
    title: 'Input, Conversion, and Basic Math',
    description: 'Convert input text to numbers and calculate hours from minutes locally',
    chapterIndex: 3,
  },
}

function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide admin credentials file')
  const text = readFileSync(credPath, 'utf8')
  const m = text.match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password from credentials file')
  return m[1].trim()
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
  const slug = process.argv[2]
  if (!slug || !MODULES[slug]) {
    console.error(`Usage: node scripts/update-local-module.mjs <${Object.keys(MODULES).join('|')}>`)
    process.exit(1)
  }

  const cfg = MODULES[slug]
  const mdPath = resolve(ROOT, cfg.md)
  if (!existsSync(mdPath)) throw new Error(`Missing ${mdPath}`)
  if (!existsSync(COURSE_PATH)) throw new Error(`Missing ${COURSE_PATH}`)

  const markdown = readFileSync(mdPath, 'utf8')
  const tipTap = markdownToTipTap(markdown)

  const course = JSON.parse(readFileSync(COURSE_PATH, 'utf8'))
  const stage = course.stages.find((s) => s.slug === slug)
  if (!stage) throw new Error(`Stage ${slug} not found in python-zero.json`)
  stage.title = cfg.title
  stage.content = markdown
  writeFileSync(COURSE_PATH, JSON.stringify(course, null, 2) + '\n')
  console.log(`Updated ${COURSE_PATH} ${slug} (${markdown.length} chars)`)

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
  const chapter = meta.chapters?.[cfg.chapterIndex]
  if (!chapter) throw new Error(`No chapter index ${cfg.chapterIndex} on live course`)
  const act = chapter.activities?.[0]
  if (!act?.activity_uuid) throw new Error(`No activity on chapter index ${cfg.chapterIndex}`)

  await api(token, 'PUT', `/chapters/${chapter.id}`, {
    json: {
      name: cfg.title,
      description: cfg.description,
    },
  })

  await api(token, 'PUT', `/activities/${act.activity_uuid}`, {
    json: {
      name: cfg.title,
      content: tipTap,
      published: true,
    },
  })

  console.log(`Live chapter id=${chapter.id} activity=${act.activity_uuid}`)
  console.log(`Title → ${cfg.title}`)
  console.log(`TipTap blocks: ${tipTap.content.length}`)
  console.log(`Open course: ${BASE}/course/${COURSE_UUID.replace(/^course_/, '')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
