#!/usr/bin/env node
/**
 * Batch-rewrite Python Zero modules 04–22 to the local-terminal house style.
 * Writes content/courses/module-XX-*.md, updates python-zero.json, pushes live.
 *
 * Usage: node scripts/batch-rewrite-local-modules.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
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

const FILE_HINTS = {
  'module-04': 'grade_check.py',
  'module-05': 'score_total.py',
  'module-06': 'open_tasks.py',
  'module-07': 'percent_label.py',
  'module-08': 'safe_int.py',
  'module-09': 'task_file.py',
  'module-10': 'today_import.py',
  'module-11': 'student_class.py',
  'module-12': 'course_task.py',
  'module-13': 'clean_names.py',
  'module-14': 'score_summary.py',
  'module-15': 'days_left.py',
  'module-16': 'add_points_test.py',
  'module-17': 'project_tree.py',
  'module-18': 'run_config.py',
  'module-19': 'file_plan.py',
  'module-20': 'clean_rows.py',
  'module-21': 'progress_tracker.py',
  'module-22': 'certificate_card.py',
}

function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide admin credentials file')
  const text = readFileSync(credPath, 'utf8')
  const m = text.match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password')
  return m[1].trim()
}

function stripPracticeNote(code) {
  // Remove practice_note = { ... } and print(practice_note[...])
  let out = code
  const start = out.indexOf('practice_note')
  if (start !== -1) {
    // find opening brace after =
    const eq = out.indexOf('{', start)
    if (eq !== -1) {
      let depth = 0
      let end = eq
      for (let i = eq; i < out.length; i++) {
        if (out[i] === '{') depth++
        else if (out[i] === '}') {
          depth--
          if (depth === 0) {
            end = i + 1
            break
          }
        }
      }
      out = out.slice(0, start) + out.slice(end)
    }
  }
  out = out.replace(/\n*print\(\s*practice_note\[[\s\S]*?\]\s*\)\n*/g, '\n')
  out = out.replace(/\n{3,}/g, '\n\n').trim()
  // Clean Check Work comments
  out = out
    .split('\n')
    .map((line) =>
      line
        .replace(/For Check Work,?\s*/gi, '')
        .replace(/Check Work/gi, 'your proof run')
        .replace(/browser practice/gi, 'local practice')
        .replace(/this room/gi, 'this lesson')
    )
    .join('\n')
  return out.trim()
}

function extractStarter(content) {
  const blocks = [...content.matchAll(/~~~python\n([\s\S]*?)~~~/g)].map((m) => m[1].trim())
  if (!blocks.length) {
    const ticks = [...content.matchAll(/```python\n([\s\S]*?)```/g)].map((m) => m[1].trim())
    return stripPracticeNote(ticks[ticks.length - 1] || '# TODO: write starter')
  }
  // Prefer the Inspect starter (usually last / longest with assignments)
  const ranked = [...blocks].sort((a, b) => b.length - a.length)
  return stripPracticeNote(ranked[0])
}

function extractModule(stage) {
  const t = stage.content
  const focus =
    (t.match(/This room focuses on how to ([^.]+)\./i) || [])[1] ||
    (t.match(/focuses on ([^.]+)\./i) || [])[1] ||
    'practice one useful Python idea locally'

  const clean = t.match(
    /## One Clean Pass[\s\S]*?(?=## What the Workspace|## Your First|## Before Running|## Learn)/
  )
  const steps = [...(clean?.[0] || '').matchAll(/^\d+\. (.+)$/gm)].map((m) =>
    m[1]
      .replace(/the next room/gi, 'a later lesson')
      .replace(/this room/gi, 'this lesson')
      .replace(/practice note/gi, 'proof note')
      .replace(/Check Work/gi, 'your terminal run')
  )

  const vocabSection = t.match(/### Key Vocabulary[\s\S]*?(?=## Inspect)/)?.[0] || ''
  const vocab = [...vocabSection.matchAll(/\| ([^|\n]+) \| ([^|\n]+) \|/g)]
    .map((m) => ({ term: m[1].trim(), def: m[2].trim() }))
    .filter((v) => v.term !== 'Term' && !/^-+$/.test(v.term) && v.term !== 'Workspace item')

  const buildMatch = t.match(/## Build and prove[\s\S]*?\n\| ([^|\n]+) \| ([^|\n]+) \|/)
  let build = (buildMatch?.[1] || '').trim()
  if (build === '---' || build === 'Build') build = ''
  build = build
    .replace(/Keep the change small enough that you can explain it without guessing\./gi, '')
    .replace(/Check Work/gi, 'your terminal run')
    .trim()

  const proveBlob = buildMatch?.[2] || ''
  const checks = [
    ...(proveBlob.match(/make sure these are true: ([^.]+)/i)?.[1] || '')
      .split(';')
      .map((x) => x.trim().replace(/\.$/, ''))
      .filter(Boolean),
  ].map((c) => c.replace(/Check Work/gi, 'terminal output'))

  // Fallback checks from numbered "I can" fragments in prove cell
  if (!checks.length) {
    const more = [...proveBlob.matchAll(/I can [^.;]+/g)].map((m) => m[0].trim())
    checks.push(...more)
  }

  return {
    slug: stage.slug,
    title: stage.title,
    focus,
    steps,
    vocab,
    starter: extractStarter(t),
    build,
    checks,
    filename: FILE_HINTS[stage.slug] || `${stage.slug.replace('module-', 'm')}.py`,
  }
}

function renderMarkdown(m) {
  const nextHint =
    m.slug === 'module-22'
      ? 'You finished Python Zero to Useful on the local path. Keep your scripts folder as portfolio evidence.'
      : 'When the checklist is true, continue to the next chapter — same edit → run → prove rhythm.'

  const stepsBlock =
    m.steps.length > 0
      ? m.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')
      : '1. Read the concept.\n2. Create the starter file.\n3. Run it once unchanged.\n4. Make one small change you can explain.\n5. Confirm the terminal output.'

  const vocabRows =
    m.vocab.length > 0
      ? m.vocab.map((v) => `| ${v.term} | ${v.def} |`).join('\n')
      : '| concept | The main idea this lesson practices. |'

  const checks =
    m.checks.length > 0
      ? m.checks.map((c) => `- [ ] ${c}`).join('\n')
      : `- [ ] \`${m.filename}\` runs without error\n- [ ] I can explain the output in one sentence\n- [ ] I made one small change and re-ran`

  const task =
    m.build ||
    `Run the starter once, then make one small change that proves you understand how to ${m.focus}.`

  // Ensure starter prints something observable if it only defines things
  let starter = m.starter
  if (!/\bprint\s*\(/.test(starter) && m.slug !== 'module-22') {
    starter = `${starter}\n\n# Proof: show something readable in the terminal\nprint("TODO: add a clear print() of your result")`
  }
  if (m.slug === 'module-22' && !/\bprint\s*\(/.test(starter)) {
    starter = `${starter}\n\nprint("Course:", certificate_data["course_name"])\nprint("Credential:", certificate_data["credential_id"])\nprint("Verify:", certificate_data["verify_url"])`
  }

  return `# ${m.title}

## Why this lesson exists

This lesson teaches you how to **${m.focus}**.

There is still **no** in-lesson code box on this platform. You will work in your local course folder with a text editor and terminal — the same rhythm as Modules 00–03.

## Reminder: where you work

\`\`\`bash
cd ~/asv-learn-python-zero
\`\`\`

Windows (PowerShell):

\`\`\`powershell
cd $HOME\\asv-learn-python-zero
\`\`\`

Create or edit: \`${m.filename}\`

## Concept in plain English

Goal: ${m.focus}.

One clean pass before you change much:

${stepsBlock}

## Key vocabulary

| Term | Meaning here |
| --- | --- |
${vocabRows}

## Your local task

### Step 1 — Starter file

Create \`${m.filename}\` with this starter (clean it up if a comment still sounds old — remove any leftover “room” wording):

\`\`\`python
${starter}
\`\`\`

### Step 2 — Run it

macOS / Linux:

\`\`\`bash
python3 ${m.filename}
\`\`\`

Windows:

\`\`\`bash
python ${m.filename}
\`\`\`

Read the terminal output. If nothing useful printed, add one clear \`print(...)\` that shows the result.

### Step 3 — One small change

${task}

Save, run again, and confirm the new output. Keep the change small enough that you can explain it without guessing.

## Proof checklist

${checks}
- [ ] \`${m.filename}\` exists in \`asv-learn-python-zero\`
- [ ] I ran it with \`python3\` / \`python\` and read the terminal
- [ ] I can explain what changed in my own words

${nextHint}
`
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

  // This install: cookie auth for PUTs; bearer for GETs. Mixing both can 403.
  const headerSets =
    method === 'PUT'
      ? [
          {
            Cookie: auth.cookie,
            ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
          },
        ]
      : [
          { Authorization: `Bearer ${auth.token}` },
          { Cookie: auth.cookie },
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
  throw new Error(lastErr || `${method} ${path} failed`)
}

async function main() {
  const course = JSON.parse(readFileSync(COURSE_PATH, 'utf8'))
  const targets = course.stages.filter((s) => {
    const n = Number((s.slug.match(/module-(\d+)/) || [])[1])
    return Number.isFinite(n) && n >= 4 && n <= 22
  })
  if (!targets.length) throw new Error('No modules 04–22 found')

  mkdirSync(OUT_DIR, { recursive: true })
  const auth = await loginCookie()

  const meta = await api(auth, 'GET', `/courses/${COURSE_UUID}/meta`, {
    query: { with_unpublished_activities: true },
  })

  let leftoverHits = 0
  for (const stage of targets) {
    const extracted = extractModule(stage)
    const md = renderMarkdown(extracted)
    const mdName = `${stage.slug}-local.md`
    const mdPath = resolve(OUT_DIR, mdName)
    writeFileSync(mdPath, md)

    stage.content = md
    stage.title = extracted.title

    const chapterIndex = Number(stage.slug.replace('module-', ''))
    // chapters: 0=module-00 ... so chapterIndex matches
    const chapter = meta.chapters?.[chapterIndex]
    if (!chapter?.activities?.[0]?.activity_uuid) {
      console.warn(`SKIP live ${stage.slug}: no chapter/activity at index ${chapterIndex}`)
      continue
    }

    const tipTap = markdownToTipTap(md)
    await api(auth, 'PUT', `/chapters/${chapter.id}`, {
      json: {
        name: extracted.title,
        description: `Local practice: ${extracted.filename}`,
      },
    })
    await api(auth, 'PUT', `/activities/${chapter.activities[0].activity_uuid}`, {
      json: {
        name: extracted.title,
        content: tipTap,
        published: true,
      },
    })

    const bad = /(Check Work|browser practice|How to Use This Room|Room meaning)/i.test(md)
    if (bad) leftoverHits += 1
    console.log(
      `OK ${stage.slug} → ${mdName} (${md.length} chars) live act=${chapter.activities[0].activity_uuid}${bad ? ' WARN leftovers' : ''}`
    )
  }

  writeFileSync(COURSE_PATH, JSON.stringify(course, null, 2) + '\n')
  console.log(`Wrote ${COURSE_PATH}`)
  console.log(`leftoverWarnings=${leftoverHits}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
