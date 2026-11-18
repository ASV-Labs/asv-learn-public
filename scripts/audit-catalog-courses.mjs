#!/usr/bin/env node
/**
 * Audit all catalog course JSON for review readiness.
 * Usage: node scripts/audit-catalog-courses.mjs
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSES = resolve(ROOT, 'content/courses')
const IDS = JSON.parse(readFileSync(resolve(COURSES, 'learnhouse-course-ids.json'), 'utf8'))

const BAD = [
  /TechNodeX/i,
  /technodex/i,
  /Check Work/i,
  /browser sandbox/i,
  /hosted room/i,
  /How to Use This Room/i,
  /in-lesson sandbox/i,
  /auto-grader/i,
]

const SLUGS = IDS.courses.map((c) => c.slug)

function words(s) {
  return (s || '').split(/\s+/).filter(Boolean).length
}

function auditSlug(slug) {
  const jsonPath = resolve(COURSES, `${slug}.json`)
  if (!existsSync(jsonPath)) return { slug, error: 'missing json' }
  const course = JSON.parse(readFileSync(jsonPath, 'utf8'))
  const stages = course.stages || []
  const issues = []
  const stageStats = []

  const desc = course.description || ''
  for (const re of BAD) {
    if (re.test(desc)) issues.push(`description matches ${re}`)
  }

  for (const stage of stages) {
    const w = words(stage.content)
    const q = (stage.quiz || []).length
    const hits = BAD.filter((re) => re.test(stage.content || '') || JSON.stringify(stage.quiz || []).match(re))
    const sIssues = []
    const isCertificate = /certificate/i.test(stage.slug || '') || /certificate/i.test(stage.title || '')
    if (w < 700 && !isCertificate) sIssues.push(`thin:${w}w`)
    if (q < 2 && slug !== 'python-zero' && !isCertificate) sIssues.push(`few-quizzes:${q}`)
    if (hits.length) sIssues.push(`bad-lang:${hits.map((r) => r.source).join(',')}`)
    if (
      !isCertificate &&
      !/proof|checklist|What good|Your local|Practice/i.test(stage.content || '')
    ) {
      sIssues.push('weak-practice-signals')
    }
    stageStats.push({ slug: stage.slug, title: stage.title, words: w, quizzes: q, issues: sIssues })
    for (const i of sIssues) issues.push(`${stage.slug}: ${i}`)
  }

  const mdDir = resolve(COURSES, slug)
  const mdFiles = existsSync(mdDir)
    ? readdirSync(mdDir).filter((f) => f.endsWith('.md')).length
    : slug === 'python-zero'
      ? readdirSync(COURSES).filter((f) => /^module-.*\.md$/.test(f)).length
      : 0

  const hero = resolve(ROOT, `brand/asv-labs-learn/courses/${slug}/hero.png`)
  const heroAlt = resolve(ROOT, 'brand/asv-labs-learn/asv-labs-learn-python-zero-hero.png')

  return {
    slug,
    title: course.title,
    stages: stages.length,
    avgWords: stages.length
      ? Math.round(stageStats.reduce((n, s) => n + s.words, 0) / stages.length)
      : 0,
    minWords: stages.length ? Math.min(...stageStats.map((s) => s.words)) : 0,
    totalQuizzes: stageStats.reduce((n, s) => n + s.quizzes, 0),
    mdFiles,
    hero: existsSync(hero) || (slug === 'python-zero' && existsSync(heroAlt)),
    issueCount: issues.length,
    issues: issues.slice(0, 40),
    stageStats,
  }
}

const reports = SLUGS.map(auditSlug)
const summary = {
  generatedAt: new Date().toISOString(),
  courses: reports.length,
  withIssues: reports.filter((r) => r.issueCount > 0).length,
  reports,
}

console.log(JSON.stringify(summary, null, 2))
console.log('\n=== SCOREBOARD ===')
for (const r of reports) {
  const flag = r.issueCount ? `⚠ ${r.issueCount}` : '✓'
  console.log(
    `${flag} ${r.slug}: ${r.stages} stages, avg ${r.avgWords}w, min ${r.minWords}w, quizzes ${r.totalQuizzes}, hero=${r.hero}`
  )
}
