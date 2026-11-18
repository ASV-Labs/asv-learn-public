#!/usr/bin/env node
/**
 * Import a catalog course JSON into local LearnHouse (create course + chapters + activities).
 *
 * Usage:
 *   node scripts/import-catalog-course.mjs content/courses/soc-blue-team.json
 *   node scripts/import-catalog-course.mjs --all
 *   node scripts/import-catalog-course.mjs --slug kali-linux
 *
 * Skips python-zero by default (already live). Use --include-python-zero to force.
 * Idempotent by title: if a course with the same name exists, skip create (use --force to recreate).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { markdownToTipTap } from './lib/markdown-to-tiptap.mjs'
import { appendQuizToDoc } from './lib/quiz-to-tiptap.mjs'
import { loginCookie, api, getOrg, listOrgCourses, BASE, ORG_SLUG } from './lib/lh-client.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSES_DIR = resolve(ROOT, 'content/courses')

async function importCourse(auth, org, course, { force = false } = {}) {
  const existing = await listOrgCourses(auth, org.slug)
  const list = Array.isArray(existing) ? existing : []
  const hit = list.find((c) => (c.name || '').trim() === course.title.trim())

  if (hit && !force) {
    console.log(`skip existing: ${course.title} (${hit.course_uuid})`)
    return { skipped: true, course_uuid: hit.course_uuid }
  }

  if (hit && force) {
    console.warn(`--force set but delete not implemented; skipping recreate for ${course.title}`)
    return { skipped: true, course_uuid: hit.course_uuid }
  }

  const fd = new FormData()
  fd.append('name', course.title)
  fd.append('description', course.description)
  fd.append(
    'about',
    `${course.difficulty || ''} · ${course.hours || ''}h · Runtime: ${course.runtime || 'local'} · Topics: ${(course.topics || []).join(', ')}`
  )
  fd.append('public', 'true')
  fd.append('learnings', JSON.stringify(course.certBadges || course.topics || []))
  fd.append('tags', JSON.stringify(course.topics || []))

  const created = await api(auth, 'POST', '/courses/', {
    formData: fd,
    query: { org_id: org.id },
  })
  console.log(`created ${course.title} uuid=${created.course_uuid}`)

  try {
    await api(auth, 'PUT', `/courses/${created.course_uuid}`, {
      json: {
        published: true,
        description: course.description,
        about: `${course.difficulty || ''} · ${course.hours || ''} hours. Practice: local lab (${course.runtime || 'local'}).`,
        learnings: JSON.stringify(course.certBadges || []),
      },
    })
  } catch (e) {
    console.warn('course metadata update soft-fail:', e.message)
  }

  let chapterCount = 0
  let activityCount = 0
  const stages = [...(course.stages || [])].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

  for (const stage of stages) {
    const chapter = await api(auth, 'POST', '/chapters/', {
      json: {
        name: stage.title,
        description: stage.hours ? `${stage.hours} hours` : '',
        org_id: org.id,
        course_id: created.id,
      },
    })
    chapterCount += 1

    const activity = await api(auth, 'POST', '/activities/', {
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

    const tipTap = appendQuizToDoc(markdownToTipTap(stage.content || ''), stage.quiz)
    await api(auth, 'PUT', `/activities/${activity.activity_uuid}`, {
      json: { content: tipTap, published: true },
    })
    activityCount += 1
    process.stdout.write(`  ✓ ${stage.slug || stage.title}\n`)
  }

  const bare = String(created.course_uuid).replace(/^course_/, '')
  console.log(`done ${course.title}: ${chapterCount} chapters, ${activityCount} activities`)
  console.log(`open: ${BASE}/orgs/${ORG_SLUG}/course/${bare}`)
  return { skipped: false, course_uuid: created.course_uuid, chapterCount, activityCount }
}

function resolveTargets(args) {
  const includePz = args.includes('--include-python-zero')
  if (args.includes('--all')) {
    return readdirSync(COURSES_DIR)
      .filter((f) => f.endsWith('.json') && !f.startsWith('catalog') && !f.startsWith('_'))
      .filter((f) => includePz || f !== 'python-zero.json')
      .map((f) => resolve(COURSES_DIR, f))
  }
  const slugIdx = args.indexOf('--slug')
  if (slugIdx >= 0) {
    const slug = args[slugIdx + 1]
    return [resolve(COURSES_DIR, `${slug}.json`)]
  }
  return args.filter((a) => !a.startsWith('-')).map((p) => resolve(ROOT, p))
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const targets = resolveTargets(args)
  if (!targets.length) {
    console.error('Usage: node scripts/import-catalog-course.mjs <file.json>|--slug <slug>|--all')
    process.exit(1)
  }

  const auth = await loginCookie()
  const org = await getOrg(auth)
  console.log(`org ${org.name} id=${org.id}`)

  const results = []
  for (const path of targets) {
    if (!existsSync(path)) throw new Error(`Missing ${path}`)
    const course = JSON.parse(readFileSync(path, 'utf8'))
    console.log(`\n=== ${basename(path)} → ${course.title} ===`)
    results.push(await importCourse(auth, org, course, { force }))
  }

  const created = results.filter((r) => !r.skipped).length
  const skipped = results.filter((r) => r.skipped).length
  console.log(`\nSummary: created ${created}, skipped ${skipped}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
