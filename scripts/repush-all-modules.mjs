#!/usr/bin/env node
/**
 * Re-push all Python Zero lesson activities with proper TipTap tables.
 *
 * Usage: node scripts/repush-all-modules.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { markdownToTipTap } from './lib/markdown-to-tiptap.mjs'
import { appendQuizToDoc } from './lib/quiz-to-tiptap.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_PATH = resolve(ROOT, 'content/courses/python-zero.json')

const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
const API = `${BASE}/api/v1`
const COURSE_UUID = process.env.LH_COURSE_UUID || 'course_ea63f73a-a1c3-4581-a488-ef2043f1351f'

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
  let body
  if (json !== undefined) body = JSON.stringify(json)

  const headerSets =
    method === 'PUT'
      ? [
          {
            Cookie: auth.cookie,
            ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
          },
        ]
      : [{ Authorization: `Bearer ${auth.token}` }, { Cookie: auth.cookie }]

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
    lastErr = `${method} ${path} -> ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data).slice(0, 300)}`
  }
  throw new Error(lastErr || `${method} ${path} failed`)
}

function countTables(doc) {
  return (doc.content || []).filter((n) => n.type === 'table').length
}

function countCodeishTables(doc) {
  return (doc.content || []).filter(
    (n) =>
      n.type === 'codeBlock' &&
      typeof n.content?.[0]?.text === 'string' &&
      /^\|/.test(n.content[0].text)
  ).length
}

async function main() {
  const course = JSON.parse(readFileSync(COURSE_PATH, 'utf8'))
  const auth = await loginCookie()
  const meta = await api(auth, 'GET', `/courses/${COURSE_UUID}/meta`, {
    query: { with_unpublished_activities: true },
  })

  let tables = 0
  let codeish = 0

  for (const stage of course.stages) {
    const n = Number((stage.slug.match(/module-(\d+)/) || [])[1])
    if (!Number.isFinite(n)) continue
    const chapter = meta.chapters?.[n]
    const actUuid = chapter?.activities?.[0]?.activity_uuid
    if (!actUuid) {
      console.warn(`SKIP ${stage.slug}: no live activity`)
      continue
    }

    const tipTap = appendQuizToDoc(markdownToTipTap(stage.content || ''), stage.quiz)
    const tCount = countTables(tipTap)
    const cCount = countCodeishTables(tipTap)
    tables += tCount
    codeish += cCount

    await api(auth, 'PUT', `/activities/${actUuid}`, {
      json: {
        name: stage.title,
        content: tipTap,
        published: true,
      },
    })
    console.log(`OK ${stage.slug} tables=${tCount} codeishTables=${cCount} blocks=${tipTap.content.length}`)
  }

  console.log(`\nDone. Real tables emitted: ${tables}. Leftover code-block tables: ${codeish}.`)
  if (codeish > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
