#!/usr/bin/env node
/**
 * Set real "What you will learn" outcome bullets for all 13 catalog courses.
 * Writes `learnings` into content/courses/<slug>.json and PUTs to LearnHouse.
 *
 * Usage: node scripts/set-course-learnings.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loginCookie, api } from './lib/lh-client.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const IDS = JSON.parse(readFileSync(resolve(ROOT, 'content/courses/learnhouse-course-ids.json'), 'utf8'))

/** Outcome bullets — skills/results, not cert badge names. */
const LEARNINGS = {
  'python-zero': [
    'Install and run Python locally, and use edit → save → run as your practice loop',
    'Write programs with variables, input, math, conditionals, and loops',
    'Organize code with functions, lists, dictionaries, and file I/O',
    'Handle errors cleanly and keep small scripts you can explain',
    'Ship a progress-tracker portfolio capstone with a proof checklist',
  ],
  'security-plus': [
    'Map common threats, attacks, and vulnerabilities to practical defenses',
    'Explain layered architecture, secure design, and control placement',
    'Apply access protection, cryptography basics, and implementation choices',
    'Walk an incident from detection through response and evidence handling',
    'Make governance, risk, and compliance decisions in plain language',
    'Practice exam mindset with local drills that map stems to Domains 1–5',
  ],
  'ethical-hacking': [
    'Run authorized assessments with clear scope, rules of engagement, and consent',
    'Plan reconnaissance and enumeration without guessing beyond the engagement',
    'Validate findings with controlled checks and keep reproducible evidence',
    'Document impact, remediation, and defender handoff in a usable report',
    'Separate exploitation practice from reckless or out-of-scope activity',
  ],
  'kali-linux': [
    'Set up Kali as a controlled lab workstation with safe defaults',
    'Use recon, scanning, and enumeration tools with scoped targets',
    'Run vulnerability and web checks while preserving evidence trails',
    'Document tool output so another analyst can reproduce your steps',
    'Keep lab practice separate from production systems and live targets',
  ],
  'soc-blue-team': [
    'Work a SOC analyst workflow from alert intake through triage decisions',
    'Read SIEM evidence and turn noisy signals into actionable cases',
    'Map activity to MITRE ATT&CK and prioritize what matters first',
    'Run incident response steps from detection to containment',
    'Practice threat hunting and evidence preservation with a defender mindset',
  ],
  'python-security': [
    'Use Python for defensive automation: parse logs and normalize evidence',
    'Build scoped network and HTTP checks that fail closed on uncertainty',
    'Apply hashing and crypto decisions without inventing insecure shortcuts',
    'Write small security helpers you can review, test, and hand off',
    'Prefer safe coding patterns over clever one-offs that hide risk',
  ],
  'applied-agentic-ai': [
    'Design LLM prompts as contracts with clear inputs, outputs, and limits',
    'Ground agents with retrieval boundaries instead of unbounded memory claims',
    'Wire tools and APIs with explicit permissions and failure handling',
    'Choose agent architectures that match the job, not hype patterns',
    'Ship production agent systems with evals, guardrails, and runbooks',
  ],
  'ai-fundamentals': [
    'Explain AI, ML, and LLM system parts in builder language',
    'Write prompts as instruction design and debug model behavior systematically',
    'Connect AI features through APIs and validate structured outputs',
    'Use retrieval and RAG patterns with clear grounding boundaries',
    'Build guarded workflows and a portfolio capstone you can demonstrate',
  ],
  'ai-foundations-engineering': [
    'Frame ML engineering work around data contracts and production constraints',
    'Build preprocessing pipelines and feature workflows that stay reproducible',
    'Train, validate, and compare models with evidence—not vibes',
    'Deploy with monitoring so drift and failures are visible early',
    'Scale ML systems with operational runbooks and clear ownership',
  ],
  'python-full': [
    'Build Python web apps from HTTP requests through server-side frameworks',
    'Use Django and FastAPI patterns for real request/response flows',
    'Model data with SQLAlchemy and keep schema changes intentional',
    'Add authentication and security controls appropriate to the app',
    'Deploy and operate a Python service with tests and production basics',
  ],
  fullstack: [
    'Build frontend foundations with HTML, CSS, and JavaScript',
    'Create React UIs and connect them to Node/Express APIs',
    'Persist data with databases and Prisma-style data access',
    'Deploy full-stack apps with basic DevOps hygiene',
    'Finish portfolio-ready projects you can walk through end to end',
  ],
  react: [
    'Strengthen JavaScript prerequisites needed for modern React',
    'Build components with hooks, props, and clear UI state',
    'Add routing, data fetching, and forms without spaghetti state',
    'Improve performance, testing, and accessibility with deliberate tradeoffs',
    'Ship multiple React projects that prove frontend craft',
  ],
  devops: [
    'Use Linux and shell scripting as the base for operations work',
    'Package apps with Docker and reason about container boundaries',
    'Orchestrate workloads with Kubernetes primitives you can explain',
    'Automate delivery with CI/CD and infrastructure as code',
    'Observe systems with logs, metrics, and evidence-backed runbooks',
  ],
}

function toLearningsJson(outcomes) {
  return JSON.stringify(
    outcomes.map((text, i) => ({
      id: `learning-${i + 1}`,
      text,
      emoji: '',
    }))
  )
}

async function main() {
  const auth = await loginCookie()
  let updated = 0

  for (const row of IDS.courses) {
    const outcomes = LEARNINGS[row.slug]
    if (!outcomes?.length) {
      console.warn('missing learnings', row.slug)
      continue
    }

    const path = resolve(ROOT, `content/courses/${row.slug}.json`)
    const course = JSON.parse(readFileSync(path, 'utf8'))
    course.learnings = outcomes
    writeFileSync(path, JSON.stringify(course, null, 2) + '\n')

    const learningsPayload = toLearningsJson(outcomes)
    const about =
      course.about ||
      `${course.difficulty || ''} · ${course.hours || ''} hours · Local practice (${course.runtime || 'lab'}). Free on ASV Labs Learn.`

    await api(auth, 'PUT', `/courses/${row.course_uuid}`, {
      json: {
        // Keep existing short description + tags; refresh about/learnings only
        description: course.description,
        about,
        learnings: learningsPayload,
        tags: course.tags || undefined,
      },
    })

    console.log(`✓ ${row.slug} (${outcomes.length} outcomes)`)
    updated++
  }

  console.log(`Done. Updated ${updated} courses.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
