/**
 * Parse difficulty / hours from LearnHouse course.about (or structured fields).
 * About is often: "Beginner · 25-30 hours · Local practice (shell). Free on ASV Labs Learn."
 */

export type CourseCatalogMeta = {
  difficulty?: string
  hours?: string
}

const DIFFICULTY_RE =
  /^(Beginner(?:-to-(?:Intermediate|Builder))?|Intermediate(?:-to-Advanced)?|Advanced|All Levels)\b/i
const HOURS_RE = /(\d+\s*-\s*\d+|\d+)\s*hours?/i

export function parseCourseCatalogMeta(course: {
  about?: string | null
  difficulty?: string | null
  hours?: string | null
}): CourseCatalogMeta {
  const structured: CourseCatalogMeta = {}
  if (course.difficulty && String(course.difficulty).trim()) {
    structured.difficulty = String(course.difficulty).trim()
  }
  if (course.hours && String(course.hours).trim()) {
    const h = String(course.hours).trim()
    structured.hours = /hours?/i.test(h) ? h : `${h} hours`
  }

  const about = (course.about || '').trim()
  if (!about) return structured

  const parts = about.split(/\s*[·•|]\s*/).map((p) => p.trim()).filter(Boolean)
  let difficulty = structured.difficulty
  let hours = structured.hours

  for (const part of parts) {
    if (!difficulty && DIFFICULTY_RE.test(part)) {
      const m = part.match(DIFFICULTY_RE)
      if (m) difficulty = m[1]
      continue
    }
    if (!hours) {
      const hm = part.match(HOURS_RE)
      if (hm) {
        hours = `${hm[1].replace(/\s+/g, '')} hours`
      }
    }
  }

  // Fallback: scan whole about if split missed it
  if (!difficulty) {
    const m = about.match(DIFFICULTY_RE)
    if (m) difficulty = m[1]
  }
  if (!hours) {
    const hm = about.match(HOURS_RE)
    if (hm) hours = `${hm[1].replace(/\s+/g, '')} hours`
  }

  return { difficulty, hours }
}

/** Compact label for cards / headers, e.g. "Beginner · 25-30 hours" */
export function formatCourseCatalogMeta(meta: CourseCatalogMeta): string | null {
  const bits = [meta.difficulty, meta.hours].filter(Boolean)
  return bits.length ? bits.join(' · ') : null
}
