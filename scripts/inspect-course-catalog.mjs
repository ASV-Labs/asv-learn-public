#!/usr/bin/env node
/**
 * Inventory ASV Labs / P0GL0L course sources for learn.asv-labs.com migration.
 *
 * Pulls:
 *  - Known GitHub curriculum repos (P0GL0L + ASV-Labs mirrors)
 *  - Local TechNodeX prisma course fixtures (if present)
 *
 * Usage:
 *   node scripts/inspect-course-catalog.mjs
 *   node scripts/inspect-course-catalog.mjs --json > /tmp/course-catalog.json
 *
 * Requires: `gh` authenticated. Does not clone repos.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const asJson = process.argv.includes('--json')

const GITHUB_COURSES = [
  {
    id: 'ethical-hacking-1',
    owners: ['P0GL0L/EthicalHacking_1'],
    kind: 'curriculum-repo',
    materialPath: 'course_material',
    indexFile: 'CURRICULUM_INDEX.md',
    notes: '17 stage markdown files; college-intro ethical hacking',
  },
  {
    id: 'kali-zero-to-job-ready',
    owners: ['P0GL0L/Kali_Linux_Zero_to_Job_Ready', 'ASV-Labs/Kali_Linux_Zero_to_Job_Ready'],
    kind: 'curriculum-repo',
    materialPath: 'course_material',
    indexFile: 'START_HERE.md',
    notes: '9 stages; 340–395h claim; PenTest+/CEH/eJPT/OSCP aligned',
  },
  {
    id: 'security-plus-study',
    owners: ['P0GL0L/SEC-Study_Guide'],
    kind: 'study-guide-repo',
    materialPath: 'security-plus-study',
    indexFile: 'README.md',
    notes: 'CompTIA Security+ SY0-701 domain study system',
  },
  {
    id: 'python-cybersecurity',
    owners: [
      'P0GL0L/python-cybersecurity-learning-path',
      'ASV-Labs/python-cybersecurity-learning-path',
    ],
    kind: 'curriculum-repo',
    materialPath: 'stage-starters',
    indexFile: 'README_QUICK_START.md',
    notes: '6 stages + capstone; NICE framework; overlaps Python Zero / Python Security',
  },
  {
    id: 'ai-fundamentals-technodex',
    owners: ['P0GL0L/ai-training-technodex'],
    kind: 'curriculum-repo',
    materialPath: 'stages',
    indexFile: 'CURRICULUM_INDEX.md',
    notes: '6 stages; 47–69h; LLMs → RAG → agents → capstone',
  },
  {
    id: 'army-study-guide',
    owners: ['P0GL0L/Army-StudyGuide'],
    kind: 'archived-or-empty',
    materialPath: null,
    indexFile: 'REMOVED.md',
    notes: 'Public repo appears cleared (REMOVED.md) — verify before import',
  },
]

const FIXTURE_DIRS = [
  resolve(homedir(), 'ASV-Labs/technodex/prisma/course-fixtures'),
  resolve(homedir(), 'Documents/ASV Business Venture/prisma/course-fixtures'),
  resolve(ROOT, '../ASV-Labs/technodex/prisma/course-fixtures'),
]

function ghJson(args) {
  try {
    const out = execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
    return JSON.parse(out)
  } catch (err) {
    return { __error: String(err?.stderr || err?.message || err) }
  }
}

function inspectGithubRepo(fullName) {
  const meta = ghJson(['api', `repos/${fullName}`])
  if (meta.__error || meta.message) {
    return { fullName, ok: false, error: meta.__error || meta.message }
  }
  const root = ghJson(['api', `repos/${fullName}/contents/`])
  const names = Array.isArray(root) ? root.map((x) => x.name) : []
  return {
    fullName,
    ok: true,
    private: meta.private,
    defaultBranch: meta.default_branch,
    updatedAt: meta.updated_at,
    description: meta.description,
    rootEntries: names,
  }
}

function listMaterial(fullName, materialPath) {
  if (!materialPath) return { files: [], count: 0 }
  const listing = ghJson(['api', `repos/${fullName}/contents/${materialPath}`])
  if (!Array.isArray(listing)) return { files: [], count: 0, error: listing.__error || listing.message }
  const files = listing.map((x) => ({ name: x.name, type: x.type, path: x.path }))
  return { files, count: files.length }
}

function parseFixtureFile(path) {
  const text = readFileSync(path, 'utf8')
  const title = text.match(/\btitle:\s*['"]([^'"]+)/)?.[1]
  const slug = text.match(/\bslug:\s*['"]([^'"]+)/)?.[1]
  const hours = text.match(/\bhours:\s*['"]([^'"]+)['"]/)?.[1]
  const difficulty = text.match(/\bdifficulty:\s*['"]([^'"]+)/)?.[1]
  const stageCount = (text.match(/sortOrder:\s*\d+/g) || []).length
  return {
    file: path.split('/').pop(),
    path,
    title: title || path.split('/').pop(),
    slug: slug || null,
    hours: hours || null,
    difficulty: difficulty || null,
    stageCount,
    bytes: readFileSync(path).length,
  }
}

function loadFixtures() {
  for (const dir of FIXTURE_DIRS) {
    if (!existsSync(dir)) continue
    const files = readdirSync(dir).filter((f) => f.endsWith('.ts'))
    return {
      dir,
      courses: files.map((f) => parseFixtureFile(resolve(dir, f))),
    }
  }
  return { dir: null, courses: [] }
}

function main() {
  const github = GITHUB_COURSES.map((course) => {
    const mirrors = course.owners.map(inspectGithubRepo)
    const primary = mirrors.find((m) => m.ok) || mirrors[0]
    const material = primary?.ok
      ? listMaterial(primary.fullName, course.materialPath)
      : { files: [], count: 0 }
    return {
      ...course,
      primary: primary?.fullName || course.owners[0],
      mirrors,
      material,
      migrationFit:
        course.kind === 'curriculum-repo'
          ? 'high — markdown stages map to LearnHouse chapters'
          : course.kind === 'study-guide-repo'
            ? 'medium — domain folders need redesign into lesson spine'
            : 'low — verify content still exists',
    }
  })

  const fixtures = loadFixtures()
  const live = {
    alreadyOnAsvLearn: [
      {
        id: 'python-zero',
        title: 'Python Zero to Useful',
        source: 'asv-learn/content/courses',
        status: 'live on local LearnHouse prototype',
      },
    ],
  }

  const report = {
    generatedAt: new Date().toISOString(),
    githubCourseRepos: github.length,
    fixtureCourseRepos: fixtures.courses.length,
    fixtureDir: fixtures.dir,
    github,
    fixtures: fixtures.courses,
    live,
    proposedWaves: [
      {
        wave: 0,
        goal: 'Already on LearnHouse (reference)',
        courses: ['python-zero (23 lessons)'],
      },
      {
        wave: 1,
        goal: 'Cyber cluster — live cards + GitHub feedstock',
        courses: [
          'security-plus (6)',
          'ethical-hacking (16) ← EthicalHacking_1',
          'kali-linux (9) ← Kali_Linux_Zero_to_Job_Ready',
          'soc-blue-team (6)',
          'python-security (6) ← python-cybersecurity-learning-path',
        ],
      },
      {
        wave: 2,
        goal: 'AI cluster — live cards + GitHub feedstock',
        courses: [
          'ai-fundamentals (13) ← ai-training-technodex',
          'ai-foundations-engineering (6)',
          'applied-agentic-ai (6)',
        ],
      },
      {
        wave: 3,
        goal: 'Software cluster — fixture-only today',
        courses: [
          'react (6)',
          'fullstack (6)',
          'python-full-stack (6)',
          'devops (6)',
        ],
      },
    ],
  }

  if (asJson) {
    process.stdout.write(JSON.stringify(report, null, 2) + '\n')
    return
  }

  const lessonSum = fixtures.courses.reduce((n, f) => n + (f.stageCount || 0), 0)

  console.log(`ASV Learn course inspector — ${report.generatedAt}`)
  console.log('')
  console.log('=== PRIMARY: live learn.asv-labs.com catalog (TechNodeX fixtures) ===')
  console.log(
    `Courses: ${report.fixtureCourseRepos} · Lessons (sortOrder sum): ${lessonSum} · Expected live stats: 13 / 114`
  )
  console.log(`Fixture dir: ${report.fixtureDir || 'not found'}`)
  for (const f of fixtures.courses) {
    console.log(
      `- ${f.file}: ${f.title} · lessons≈${f.stageCount} · hours=${f.hours || '?'} · ${f.difficulty || '?'}`
    )
  }
  console.log('')
  console.log('=== SECONDARY: GitHub curriculum feedstock (rewrite sources) ===')
  for (const c of github) {
    const status = c.mirrors.find((m) => m.ok)
      ? `OK ${c.primary}`
      : `MISSING ${c.mirrors.map((m) => m.error || 'err').join('; ')}`
    console.log(`- ${c.id}: ${status} · material files=${c.material.count}`)
    console.log(`  ${c.notes}`)
  }
  console.log('')
  console.log('=== Sandbox runtimes (technodex) ===')
  console.log('- python  (python:3.12-alpine)')
  console.log('- javascript (node:22-alpine)')
  console.log('- shell (alpine:3.20)')
  console.log('')
  console.log('=== Proposed waves (full 13-course port) ===')
  for (const w of report.proposedWaves) {
    console.log(`Wave ${w.wave}: ${w.goal}`)
    console.log(`  ${w.courses.join(', ')}`)
  }
}

main()
