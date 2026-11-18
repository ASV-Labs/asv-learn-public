#!/usr/bin/env node
/**
 * Upload course intro video + hero poster (thumbnail_type "both").
 *
 * Usage:
 *   node scripts/set-course-intro-video.mjs --slug python-zero
 *   node scripts/set-course-intro-video.mjs --all
 *   node scripts/set-course-intro-video.mjs --slug react --preview   # use intro-elevenlabs/
 *
 * Env:
 *   LH_BASE_URL   default http://localhost:8088
 *   LH_EMAIL      default admin@school.dev
 *   LH_PASSWORD   or ~/.learnhouse/local-community-admin.txt
 *   LH_ORG_SLUG   unused here; course UUIDs from learnhouse-course-ids.json
 */
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const BRAND = resolve(ROOT, 'brand/asv-labs-learn')
const COURSES = resolve(BRAND, 'courses')
const IDS = resolve(ROOT, 'content/courses/learnhouse-course-ids.json')

const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
const API = `${BASE}/api/v1`
const EMAIL = process.env.LH_EMAIL || 'admin@school.dev'

function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide admin credentials file')
  const m = readFileSync(credPath, 'utf8').match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password from credentials file')
  return m[1].trim()
}

function parseArgs(argv) {
  const out = { all: false, slug: null, preview: false, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help' || a === '-h') out.help = true
    else if (a === '--all') out.all = true
    else if (a === '--preview') out.preview = true
    else if (a.startsWith('--slug=')) {
      out.slug = a.slice('--slug='.length)
      if (!out.slug) throw new Error('--slug= requires a value')
    } else if (a === '--slug') {
      const v = argv[++i]
      if (!v || v.startsWith('--')) throw new Error('--slug requires a value')
      out.slug = v
    } else throw new Error(`Unknown flag: ${a}`)
  }
  if (!out.help && !out.all && !out.slug) {
    throw new Error('Specify --all or --slug <slug>')
  }
  if (out.all && out.slug) throw new Error('Use either --all or --slug')
  return out
}

function resolveAssets(slug, preview) {
  const courseDir = resolve(COURSES, slug)
  const previewMp4 = resolve(courseDir, 'intro-elevenlabs', `asv-labs-learn-${slug}-intro.mp4`)
  const productionMp4 = resolve(BRAND, `asv-labs-learn-${slug}-intro.mp4`)
  const courseProdMp4 = resolve(courseDir, `asv-labs-learn-${slug}-intro.mp4`)

  let video = null
  if (preview && existsSync(previewMp4)) video = previewMp4
  else if (existsSync(productionMp4)) video = productionMp4
  else if (existsSync(courseProdMp4)) video = courseProdMp4
  else if (existsSync(previewMp4)) video = previewMp4

  const posterCandidates = [
    resolve(courseDir, 'intro-elevenlabs', `asv-labs-learn-${slug}-hero.png`),
    resolve(courseDir, `asv-labs-learn-${slug}-hero.png`),
    resolve(BRAND, `asv-labs-learn-${slug}-hero.png`),
    resolve(courseDir, 'hero.png'),
    resolve(courseDir, 'badge.png'),
  ]
  const poster = posterCandidates.find((p) => existsSync(p)) || null
  return { video, poster }
}

async function login(password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: EMAIL, password }),
  })
  if (!res.ok) throw new Error(`login failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  const token = data.access_token || data.tokens?.access_token || data.token
  if (!token) throw new Error('login response missing token')
  return token
}

async function uploadThumbnail(token, courseUuid, filePath, kind, mime, name) {
  if (!existsSync(filePath)) throw new Error(`missing asset: ${filePath}`)
  const mb = (statSync(filePath).size / 1_048_576).toFixed(2)
  const fd = new FormData()
  fd.append('thumbnail_type', kind)
  fd.append('thumbnail', new Blob([readFileSync(filePath)], { type: mime }), name)

  const res = await fetch(`${API}/courses/${courseUuid}/thumbnail`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${kind} upload failed: ${res.status} ${text.slice(0, 400)}`)
  console.log(`  ↑ ${kind} (${mb} MB) ${name}`)
  return JSON.parse(text)
}

async function setIntro(token, course, preview) {
  const { slug, course_uuid, title } = course
  console.log(`\n=== ${title} (${slug}) ===`)
  const { video, poster } = resolveAssets(slug, preview)
  if (!video) throw new Error(`No intro mp4 for ${slug}`)
  if (!poster) throw new Error(`No hero/poster png for ${slug}`)
  console.log(`  video  ${video}`)
  console.log(`  poster ${poster}`)

  await uploadThumbnail(token, course_uuid, video, 'video', 'video/mp4', `${slug}-intro.mp4`)
  const courseOut = await uploadThumbnail(
    token,
    course_uuid,
    poster,
    'image',
    'image/png',
    `${slug}-hero.png`
  )
  console.log(`  thumbnail_type ${courseOut.thumbnail_type}`)
  return courseOut
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(`Usage: node scripts/set-course-intro-video.mjs --all|--slug <slug> [--preview]`)
    return
  }

  const ids = JSON.parse(readFileSync(IDS, 'utf8'))
  const courses = ids.courses || []
  const selected = args.all ? courses : courses.filter((c) => c.slug === args.slug)
  if (!selected.length) throw new Error(`No course match for ${args.slug}`)

  console.log(`Base: ${BASE}`)
  console.log(`Mode: ${args.preview ? 'preview mp4 preferred' : 'production mp4 preferred'}`)
  console.log(`Courses: ${selected.map((c) => c.slug).join(', ')}`)

  const token = await login(loadPassword())
  console.log('Authenticated')

  const failures = []
  for (const course of selected) {
    try {
      await setIntro(token, course, args.preview)
    } catch (err) {
      console.error(`  FAILED: ${err.message}`)
      failures.push(course.slug)
    }
  }
  if (failures.length) {
    console.error(`\nFailed: ${failures.join(', ')}`)
    process.exit(1)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(`\nFailed: ${err.message}`)
  process.exit(1)
})
