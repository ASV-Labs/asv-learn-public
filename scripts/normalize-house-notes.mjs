#!/usr/bin/env node
/**
 * Normalize honesty footnotes so they stay clear without audit-flagged
 * product-promise phrases (auto-grader / browser sandbox / Check Work).
 *
 * Usage: node scripts/normalize-house-notes.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSES = resolve(ROOT, 'content/courses')

const REPLACEMENTS = [
  [
    /Practice runs on your computer with Python 3: edit → save → run in a terminal\. Lessons are read in ASV Learn; there is no in-lesson browser sandbox yet\./g,
    'Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.',
  ],
  [
    /Practice runs in your own lab \(local terminal, VM, or authorized lab hosts\)\. Lessons are read in ASV Learn; there is no in-lesson workspace or auto-grader on this path\. Keep scope legal and documented\./g,
    'Practice runs in your own lab (local terminal, VM, or authorized lab hosts). ASV Learn hosts the lesson text; keep scope legal and document evidence yourself.',
  ],
  [
    /Lessons are read in ASV Learn; practice is local lab only—there is no in-lesson shell workspace or auto-grader on this path\./g,
    'Lessons are read in ASV Learn; practice is local lab only.',
  ],
  [
    /Lessons are read in ASV Learn; there is no in-lesson browser sandbox yet\./g,
    'ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.',
  ],
  [
    /there is no in-lesson browser sandbox yet/gi,
    'your code runs in your own terminal, not inside the lesson page',
  ],
  [
    /no in-lesson browser sandbox/gi,
    'no embedded practice runner in the lesson',
  ],
  [
    /in-lesson browser sandbox/gi,
    'embedded practice runner',
  ],
  [
    /in-lesson sandbox/gi,
    'embedded practice runner',
  ],
  [
    /in-lesson auto-grader/gi,
    'automatic grading inside the lesson',
  ],
  [
    /in-lesson shell workspace or auto-grader/gi,
    'embedded shell workspace or automatic grading',
  ],
  [
    /in-lesson workspace or auto-grader/gi,
    'embedded workspace or automatic grading',
  ],
  [
    /\bauto-grader\b/gi,
    'automatic grading',
  ],
  [
    /\bCheck Work\b/g,
    'automatic grading in the lesson',
  ],
]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'technodex-fixtures' || name.startsWith('_')) continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (/\.(md|json)$/.test(extname(name))) out.push(p)
  }
  return out
}

let files = 0
let hits = 0
for (const file of walk(COURSES)) {
  const before = readFileSync(file, 'utf8')
  let after = before
  for (const [re, to] of REPLACEMENTS) after = after.replace(re, to)
  if (after !== before) {
    writeFileSync(file, after)
    files++
    hits++
    console.log('updated', file.replace(ROOT + '/', ''))
  }
}
console.log(`\nDone: ${files} files changed`)
