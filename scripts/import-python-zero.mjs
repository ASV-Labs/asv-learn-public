#!/usr/bin/env node
/**
 * Import Python Zero to Useful into a running ASV Learn (LearnHouse) instance.
 *
 * Usage:
 *   node scripts/import-python-zero.mjs
 *
 * Env:
 *   LH_BASE_URL   default http://localhost:8088
 *   LH_EMAIL      default admin@school.dev
 *   LH_PASSWORD   required (or read from ~/.learnhouse/local-community-admin.txt)
 *   LH_ORG_SLUG   default charles-learning-lab (existing local install)
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_PATH = resolve(ROOT, 'content/courses/python-zero.json')
const LOGO_PATH = resolve(ROOT, 'brand/asv-labs-learn/a-salty-vet-logo-cutout.png')
const MARK_PATH = resolve(ROOT, 'brand/asv-labs-learn/asv-labs-learn.svg')

const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
const API = `${BASE}/api/v1`
const ORG_SLUG = process.env.LH_ORG_SLUG || 'charles-learning-lab'

function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide admin credentials file')
  const text = readFileSync(credPath, 'utf8')
  const m = text.match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password from credentials file')
  return m[1].trim()
}

const EMAIL = process.env.LH_EMAIL || 'admin@school.dev'
const PASSWORD = loadPassword()

function markdownToTipTap(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const content = []
  let i = 0
  let para = []
  let inCode = false
  let codeLang = 'plaintext'
  let codeLines = []
  let inTable = false

  const flushPara = () => {
    if (!para.length) return
    const text = para.join(' ').trim()
    para = []
    if (!text) return
    content.push({
      type: 'paragraph',
      content: [{ type: 'text', text }],
    })
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
      if (inCode) {
        flushCode()
      } else {
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
      inTable = true
      // Collect table as a monospaced paragraph block for readability
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
      inTable = false
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

    if (/^[-*]\s+/.test(line)) {
      flushPara()
      const items = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: lines[i].replace(/^[-*]\s+/, '').trim() }],
            },
          ],
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

    para.push(line.trim())
    i += 1
  }

  flushPara()
  if (inCode) flushCode()

  if (!content.length) {
    content.push({ type: 'paragraph', content: [{ type: 'text', text: '(empty lesson)' }] })
  }

  return { type: 'doc', content }
}

async function login() {
  const body = new URLSearchParams({
    username: EMAIL,
    password: PASSWORD,
  })
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) throw new Error(`login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  const token = data.access_token || data.tokens?.access_token || data.token
  if (!token) throw new Error(`login response missing token: ${JSON.stringify(data).slice(0, 300)}`)
  return token
}

async function api(token, method, path, { json, formData, query } = {}) {
  const url = new URL(`${API}${path}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
    }
  }
  const headers = { Authorization: `Bearer ${token}` }
  let body
  if (formData) {
    body = formData
  } else if (json !== undefined) {
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
    throw new Error(`${method} ${path} -> ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data).slice(0, 500)}`)
  }
  return data
}

async function main() {
  if (!existsSync(COURSE_PATH)) throw new Error(`Missing ${COURSE_PATH}`)
  const course = JSON.parse(readFileSync(COURSE_PATH, 'utf8'))
  console.log(`Base: ${BASE}`)
  console.log(`Course: ${course.title} (${course.stages.length} stages)`)

  const token = await login()
  console.log('Authenticated')

  const org = await api(token, 'GET', `/orgs/slug/${ORG_SLUG}`)
  console.log(`Org: ${org.name} (id=${org.id}, slug=${org.slug})`)

  // Rebrand org identity
  await api(token, 'PUT', `/orgs/${org.id}`, {
    json: {
      name: 'ASV Labs',
      description: 'ASV Labs Learn — hands-on courses for cyber, AI, and software builders.',
      about: 'Free learning from ASV Labs. First course load: Python Zero to Useful.',
    },
  })
  console.log('Updated org name → ASV Labs')

  try {
    await api(token, 'PUT', `/orgs/${org.id}/config/color`, {
      query: { color: '#991b1b' },
    })
    console.log('Updated org color → #991b1b')
  } catch (e) {
    console.warn('Color update skipped:', e.message)
  }

  const logoFile = existsSync(LOGO_PATH) ? LOGO_PATH : MARK_PATH
  if (existsSync(logoFile)) {
    const fd = new FormData()
    const buf = readFileSync(logoFile)
    const name = logoFile.endsWith('.svg') ? 'asv-labs-learn.svg' : 'asv-labs-logo.png'
    const type = logoFile.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
    fd.append('logo_file', new Blob([buf], { type }), name)
    await api(token, 'PUT', `/orgs/${org.id}/logo`, { formData: fd })
    console.log(`Uploaded org logo: ${name}`)
  }

  // Create course
  const fd = new FormData()
  fd.append('name', course.title)
  fd.append('description', course.description)
  fd.append('about', `${course.difficulty} · ${course.hours} · Topics: ${(course.topics || []).join(', ')}`)
  fd.append('public', 'true')
  fd.append('learnings', JSON.stringify(course.certBadges || []))
  fd.append('tags', JSON.stringify(course.topics || []))
  const created = await api(token, 'POST', '/courses/', {
    formData: fd,
    query: { org_id: org.id },
  })
  console.log(`Created course id=${created.id} uuid=${created.course_uuid}`)

  // Publish course if endpoint exists
  try {
    await api(token, 'PUT', `/courses/${created.course_uuid}`, {
      json: { published: true },
    })
  } catch {
    // ignore — may already be public via form field
  }

  let chapterCount = 0
  let activityCount = 0

  for (const stage of course.stages) {
    const chapter = await api(token, 'POST', '/chapters/', {
      json: {
        name: stage.title,
        description: stage.hours ? `${stage.hours}` : '',
        org_id: org.id,
        course_id: created.id,
      },
    })
    chapterCount += 1

    const activity = await api(token, 'POST', '/activities/', {
      json: {
        name: stage.title,
        chapter_id: chapter.id,
        activity_type: 'TYPE_DYNAMIC',
        activity_sub_type: 'SUBTYPE_DYNAMIC_PAGE',
        published: true,
        content: {},
      },
      query: { coursechapter_id: chapter.id, org_id: org.id },
    })

    const tipTap = markdownToTipTap(stage.content || '')
    await api(token, 'PUT', `/activities/${activity.activity_uuid}`, {
      json: { content: tipTap, published: true },
    })
    activityCount += 1
    process.stdout.write(`  ✓ ${stage.slug}\n`)
  }

  console.log('')
  console.log(`Done. ${chapterCount} chapters, ${activityCount} activities.`)
  console.log(`Open: ${BASE}/orgs/${ORG_SLUG}/course/${created.course_uuid.replace('course_', '')}`)
  console.log(`Or browse courses for org slug: ${ORG_SLUG}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
