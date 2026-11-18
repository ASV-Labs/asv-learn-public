#!/usr/bin/env node
/**
 * Convert a TechNodeX course fixture (.ts) into ASV Learn house-style course JSON.
 *
 * Usage:
 *   node scripts/fixture-to-course-json.mjs soc-blue-team
 *   node scripts/fixture-to-course-json.mjs --all
 *
 * Writes: content/courses/<slug>.json
 * Skips python-zero (already maintained as house-style source of truth).
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const FIXTURE_DIR = resolve(ROOT, 'content/courses/technodex-fixtures')
const OUT_DIR = resolve(ROOT, 'content/courses')
const LOAD_FIXTURE_PY = resolve(__dirname, 'lib/load-fixture.py')

const PRACTICE = {
  python:
    'Practice runs on your computer with Python 3: edit → save → run in a terminal. Lessons are read in ASV Learn; there is no in-lesson browser sandbox yet.',
  javascript:
    'Practice runs on your computer with Node.js: edit → save → run in a terminal (or your local frontend tooling). Lessons are read in ASV Learn; hosted sandboxes are not part of this LearnHouse path yet.',
  shell:
    'Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; hosted shell sandboxes are not part of this LearnHouse path yet.',
}

const RUNTIME_BY_SLUG = {
  'python-zero': 'python',
  'python-security': 'python',
  'python-full': 'python',
  'applied-agentic-ai': 'python',
  'ai-fundamentals': 'python',
  'ai-foundations-engineering': 'python',
  react: 'javascript',
  fullstack: 'javascript',
  devops: 'shell',
  'kali-linux': 'shell',
  'ethical-hacking': 'shell',
  'security-plus': 'shell',
  'soc-blue-team': 'shell',
}

const SLUG_TO_FILE = {
  'python-zero': 'python-zero.ts',
  'security-plus': 'security-plus.ts',
  'ethical-hacking': 'ethical-hacking.ts',
  'kali-linux': 'kali-linux.ts',
  'soc-blue-team': 'soc-blue-team.ts',
  'python-security': 'python-security.ts',
  'applied-agentic-ai': 'applied-agentic-ai.ts',
  'ai-fundamentals': 'ai-fundamentals.ts',
  'ai-foundations-engineering': 'ai-foundations-engineering.ts',
  'python-full': 'python-full-stack.ts',
  fullstack: 'fullstack.ts',
  react: 'react.ts',
  devops: 'devops.ts',
}

function loadFixture(file) {
  const abs = resolve(FIXTURE_DIR, file)
  const proc = spawnSync('/usr/bin/python3', [LOAD_FIXTURE_PY, abs], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })
  if (proc.status !== 0) {
    throw new Error(`load-fixture.py failed for ${file}:\n${proc.stderr || proc.stdout}`)
  }
  const course = JSON.parse(proc.stdout)
  if (!course?.slug || !Array.isArray(course.stages)) {
    throw new Error(`Fixture ${file} did not export a course with slug+stages`)
  }
  return course
}

function rewriteClaims(md, runtime) {
  let out = md
  const replacements = [
    [/How to Use This Room Screen/gi, 'How to Use This Lesson'],
    [/this room/gi, 'this lesson'],
    [/This room/g, 'This lesson'],
    [/hosted room/gi, 'lesson'],
    [/browser sandbox/gi, 'local practice workspace'],
    [/Check Work/g, 'proof checklist'],
    [/Run Code/g, 'run your local code'],
    [/the workspace will ask/gi, 'your practice checklist asks'],
    [/What the Workspace Will Ask You To Do/gi, 'What Practice Asks You To Do'],
    [/Practice after the lesson/gi, 'Practice after reading'],
    [/in the workspace/gi, 'in your local lab'],
    [/open the workspace/gi, 'start local practice'],
  ]
  for (const [re, to] of replacements) out = out.replace(re, to)

  // Normalize fence language
  out = out.replace(/~~~(\w+)/g, '```$1').replace(/~~~/g, '```')

  const practiceNote = PRACTICE[runtime] || PRACTICE.shell
  if (!/ASV Learn house notes/i.test(out)) {
    out += `\n\n## ASV Learn house notes\n\n${practiceNote}\n`
  }
  return out.trim() + '\n'
}

function houseDescription(course, runtime) {
  const base = (course.description || '').trim()
  const practice = PRACTICE[runtime] || PRACTICE.shell
  // Strip overpromise about browser practice if present
  let cleaned = base
    .replace(/browser practice,?/gi, 'local practice,')
    .replace(/Check Work,?/gi, '')
    .replace(/debugging feedback,?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
  return `${cleaned} ${practice}`
}

function toCourseJson(fixture) {
  const runtime = RUNTIME_BY_SLUG[fixture.slug] || 'shell'
  const stages = [...fixture.stages]
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map((stage) => ({
      slug: stage.slug,
      title: stage.title,
      hours: stage.hours || null,
      sortOrder: stage.sortOrder,
      content: rewriteClaims(stage.content || `# ${stage.title}\n`, runtime),
      quiz: Array.isArray(stage.quiz) ? stage.quiz : [],
    }))

  return {
    slug: fixture.slug,
    title: fixture.title,
    description: houseDescription(fixture, runtime),
    difficulty: fixture.difficulty,
    hours: fixture.hours,
    topics: fixture.topics || [],
    certBadges: fixture.certBadges || [],
    runtime,
    source: {
      fixture: `content/courses/technodex-fixtures/${SLUG_TO_FILE[fixture.slug]}`,
      live: `https://technodex.io/courses/${fixture.slug}`,
    },
    stages,
  }
}

async function convertSlug(slug) {
  if (slug === 'python-zero') {
    console.log('skip python-zero (house-style source already in content/courses/python-zero.json)')
    return null
  }
  const file = SLUG_TO_FILE[slug]
  if (!file) throw new Error(`Unknown slug: ${slug}`)
  const fixture = await loadFixture(file)
  const json = toCourseJson(fixture)
  mkdirSync(OUT_DIR, { recursive: true })
  const outPath = resolve(OUT_DIR, `${slug}.json`)
  writeFileSync(outPath, JSON.stringify(json, null, 2) + '\n')
  console.log(`wrote ${outPath} (${json.stages.length} stages, runtime=${json.runtime})`)
  return outPath
}

async function main() {
  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const slugs = all
    ? Object.keys(SLUG_TO_FILE).filter((s) => s !== 'python-zero')
    : args.filter((a) => !a.startsWith('-'))

  if (!slugs.length) {
    console.error('Usage: node scripts/fixture-to-course-json.mjs <slug>|--all')
    process.exit(1)
  }

  for (const slug of slugs) {
    await convertSlug(slug)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
