#!/usr/bin/env node
/**
 * Shorten course catalog descriptions for card UI (keep lessons intact).
 * Then PUT metadata to LearnHouse.
 *
 * Usage: node scripts/polish-course-catalog-meta.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loginCookie, api } from './lib/lh-client.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const IDS = JSON.parse(readFileSync(resolve(ROOT, 'content/courses/learnhouse-course-ids.json'), 'utf8'))
const CATALOG = JSON.parse(readFileSync(resolve(ROOT, 'content/courses/catalog-13.json'), 'utf8'))

/** Short card blurbs — practice details live in lessons, not on every card. */
const SHORT = {
  'python-zero':
    'Beginner-to-intermediate Python on your computer: terminal practice, proof checklists, and a portfolio progress-tracker capstone.',
  'security-plus':
    'Practical Security+ fundamentals: threats, controls, incidents, risk decisions, plus a local exam-mindset practice chapter.',
  'ethical-hacking':
    'Assessment methodology end-to-end: scope, recon, validation, evidence, reporting, remediation, defender handoff. Use Kali course for tool workstation depth.',
  'kali-linux':
    'Controlled Kali lab tools & evidence: setup, safe workflows, documentation under scope. Pair with Ethical Hacking for full assessment methodology.',
  'soc-blue-team':
    'Defensive operations: triage alerts, read SIEM evidence, map ATT&CK, run incidents, preserve evidence, and hunt.',
  'python-security':
    'Python for safe security automation: parse logs, scoped checks, HTTP evidence, hashing decisions, and fail-closed helpers.',
  'applied-agentic-ai':
    'Next after AI Fundamentals: agents with goals, tools, RAG boundaries, evals, and runbooks—advanced; assumes builder habits.',
  'ai-fundamentals':
    'Start here: prompting, structured outputs, retrieval, workflows, guardrails, and portfolio proof—Beginner-to-Builder AI habits.',
  'ai-foundations-engineering':
    'Production ML/AI engineering: data contracts, pipelines, features, validation, deploy/monitor, and scale—engineering track beside or after Fundamentals, not agent “level 3.”',
  'python-full':
    'Python web path: fundamentals through Django, FastAPI, SQLAlchemy, auth, and deploy—pick this for Python backends, not a React-first stack.',
  fullstack:
    'JavaScript path: HTML/CSS/JS → React → Node/Express → Prisma → deploy. Pick this for browser-to-API in JS (vs Python Full Stack or frontend-only React).',
  react:
    'Frontend-only depth: JS foundations, components/hooks, routing/data, state/perf, a11y/testing, and projects—pick this when your API lives elsewhere.',
  devops:
    'Run apps with Linux, containers, Kubernetes, CI/CD, infrastructure as code, and observability evidence.',
}

/** Catalog search tags — match the red track eyebrow on cards (Cyber, AI, …). */
const TRACK_TAGS = {
  Python: 'Python, programming',
  Cyber: 'Cyber, cybersecurity, security',
  AI: 'AI, artificial intelligence, machine learning',
  Software: 'Software, web, frontend, fullstack, devops',
}

function tagsForSlug(slug) {
  const row = (CATALOG.courses || []).find((c) => c.slug === slug)
  const track = row?.track || ''
  return TRACK_TAGS[track] || track
}

async function main() {
  const auth = await loginCookie()
  for (const row of IDS.courses) {
    const path = resolve(ROOT, `content/courses/${row.slug}.json`)
    const course = JSON.parse(readFileSync(path, 'utf8'))
    const short = SHORT[row.slug]
    if (!short) {
      console.warn('no short blurb', row.slug)
      continue
    }
    const tags = tagsForSlug(row.slug)
    course.description = short
    course.tags = tags
    writeFileSync(path, JSON.stringify(course, null, 2) + '\n')

    await api(auth, 'PUT', `/courses/${row.course_uuid}`, {
      json: {
        description: short,
        about: `${course.difficulty || ''} · ${course.hours || ''} hours · Local practice (${course.runtime || 'lab'}). Free on ASV Labs Learn.`,
        // Prefer real outcome learnings; never fall back to cert badge names
        learnings: JSON.stringify(
          (Array.isArray(course.learnings) ? course.learnings : []).map((item, i) => {
            const text = typeof item === 'string' ? item : item?.text
            return {
              id: (typeof item === 'object' && item?.id) || `learning-${i + 1}`,
              text: String(text || '').trim(),
              emoji: (typeof item === 'object' && item?.emoji) || '',
            }
          }).filter((l) => l.text)
        ),
        tags,
      },
    })
    console.log(`✓ ${row.slug} tags=${tags}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
