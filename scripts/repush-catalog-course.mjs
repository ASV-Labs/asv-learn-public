#!/usr/bin/env node
/**
 * Re-push deepened course JSON content to an existing LearnHouse course.
 *
 * Usage:
 *   node scripts/repush-catalog-course.mjs --slug soc-blue-team
 *   node scripts/repush-catalog-course.mjs --all
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { markdownToTipTap } from './lib/markdown-to-tiptap.mjs'
import { appendQuizToDoc } from './lib/quiz-to-tiptap.mjs'
import { loginCookie, api, ORG_SLUG } from './lib/lh-client.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const IDS_PATH = resolve(ROOT, 'content/courses/learnhouse-course-ids.json')
const COURSES_DIR = resolve(ROOT, 'content/courses')

function loadIds() {
  if (!existsSync(IDS_PATH)) throw new Error(`Missing ${IDS_PATH}`)
  return JSON.parse(readFileSync(IDS_PATH, 'utf8'))
}

async function createMissingChapters(auth, meta, stages, chapters) {
  if (stages.length <= chapters.length) return
  const orgId = meta.org_id ?? 1
  const courseId = meta.id
  if (!courseId) throw new Error('Course meta missing id; cannot create chapters')

  console.log(`  creating ${stages.length - chapters.length} missing chapter(s)…`)
  for (let i = chapters.length; i < stages.length; i++) {
    const stage = stages[i]
    const chapter = await api(auth, 'POST', '/chapters/', {
      json: {
        name: stage.title,
        description: stage.hours ? `${stage.hours} hours` : '',
        org_id: orgId,
        course_id: courseId,
      },
    })
    const activity = await api(auth, 'POST', '/activities/', {
      json: {
        name: stage.title,
        chapter_id: chapter.id,
        activity_type: 'TYPE_DYNAMIC',
        activity_sub_type: 'SUBTYPE_DYNAMIC_PAGE',
        published: true,
        content: {},
      },
      query: { coursechapter_id: chapter.id, org_id: orgId },
    })
    const tipTap = appendQuizToDoc(markdownToTipTap(stage.content || ''), stage.quiz)
    await api(auth, 'PUT', `/activities/${activity.activity_uuid}`, {
      json: { content: tipTap, published: true },
    })
    process.stdout.write(`  + ${stage.slug || stage.title}\n`)
  }
}

async function repush(auth, coursePath, courseUuid) {
  const course = JSON.parse(readFileSync(coursePath, 'utf8'))
  let meta = await api(auth, 'GET', `/courses/${courseUuid}/meta`, {
    query: { org_id: 1 },
  })
  let chapters = meta.chapters || []
  const stages = [...(course.stages || [])].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
  console.log(`\n=== ${course.title} (${stages.length} stages → ${chapters.length} chapters) ===`)

  try {
    await api(auth, 'PUT', `/courses/${courseUuid}`, {
      json: {
        description: course.description,
        about: `${course.difficulty || ''} · ${course.hours || ''} hours. Practice: local lab (${course.runtime || 'local'}).`,
        learnings: JSON.stringify(course.certBadges || []),
      },
    })
  } catch (e) {
    console.warn('meta soft-fail', e.message)
  }

  if (stages.length > chapters.length) {
    await createMissingChapters(auth, meta, stages, chapters)
    meta = await api(auth, 'GET', `/courses/${courseUuid}/meta`, {
      query: { org_id: 1 },
    })
    chapters = meta.chapters || []
    console.log(`  now ${chapters.length} chapter(s) on course`)
  }

  const n = Math.min(stages.length, chapters.length)
  for (let i = 0; i < n; i++) {
    const stage = stages[i]
    const chapter = chapters[i]
    const act = (chapter.activities || [])[0]
    if (!act?.activity_uuid) {
      console.warn(`  skip ${stage.slug}: no activity`)
      continue
    }
    const chapterDesc = stage.hours ? `${stage.hours} hours` : ''
    if (chapter.name !== stage.title || (chapter.description || '') !== chapterDesc) {
      try {
        await api(auth, 'PUT', `/chapters/${chapter.id}`, {
          json: { name: stage.title, description: chapterDesc },
        })
      } catch {
        /* ignore */
      }
    }
    const doc = appendQuizToDoc(markdownToTipTap(stage.content || ''), stage.quiz)
    await api(auth, 'PUT', `/activities/${act.activity_uuid}`, {
      json: { content: doc, published: true },
    })
    process.stdout.write(`  ✓ ${stage.slug || stage.title}\n`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const ids = loadIds()
  const byTitle = new Map(ids.courses.map((c) => [c.title, c.course_uuid]))

  const slugs = args.includes('--all')
    ? [
        'python-zero',
        'security-plus',
        'ethical-hacking',
        'kali-linux',
        'soc-blue-team',
        'python-security',
        'applied-agentic-ai',
        'ai-fundamentals',
        'ai-foundations-engineering',
        'python-full',
        'fullstack',
        'react',
        'devops',
      ]
    : args.includes('--slug')
      ? [args[args.indexOf('--slug') + 1]]
      : args.filter((a) => !a.startsWith('-'))

  if (!slugs.length) {
    console.error('Usage: node scripts/repush-catalog-course.mjs --slug <slug>|--all')
    process.exit(1)
  }

  const auth = await loginCookie()
  for (const slug of slugs) {
    const path = resolve(COURSES_DIR, `${slug}.json`)
    if (!existsSync(path)) throw new Error(`Missing ${path}`)
    const course = JSON.parse(readFileSync(path, 'utf8'))
    const uuid = byTitle.get(course.title)
    if (!uuid) throw new Error(`No LearnHouse UUID for title: ${course.title}`)
    await repush(auth, path, uuid)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
