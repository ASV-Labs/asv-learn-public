#!/usr/bin/env node
/**
 * Upload a course hero image (catalog card) without disturbing its intro video.
 *
 * Usage:
 *   node scripts/set-course-hero-image.mjs --slug security-plus --image brand/asv-labs-learn/courses/security-plus/hero.png
 *   node scripts/set-course-hero-image.mjs --all   # uploads brand/.../courses/<slug>/hero.png for each id
 */
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loginCookie, api, BASE } from './lib/lh-client.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const IDS = resolve(ROOT, 'content/courses/learnhouse-course-ids.json')

async function uploadHero(auth, courseUuid, imagePath) {
  if (!existsSync(imagePath)) throw new Error(`missing ${imagePath}`)
  const fd = new FormData()
  fd.append('thumbnail_type', 'image')
  const buf = readFileSync(imagePath)
  const name = imagePath.split('/').pop() || 'hero.png'
  fd.append('thumbnail', new Blob([buf], { type: 'image/png' }), name)
  const res = await fetch(`${BASE}/api/v1/courses/${courseUuid}/thumbnail`, {
    method: 'PUT',
    headers: { Cookie: auth.cookie, Authorization: `Bearer ${auth.token}` },
    body: fd,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`upload failed ${res.status}: ${text.slice(0, 300)}`)
  const mb = (statSync(imagePath).size / 1_048_576).toFixed(2)
  console.log(`✓ ${courseUuid} ← ${name} (${mb} MB)`)
}

async function main() {
  const args = process.argv.slice(2)
  const auth = await loginCookie()
  const ids = JSON.parse(readFileSync(IDS, 'utf8'))
  const bySlug = new Map(ids.courses.map((c) => [c.slug, c]))

  if (args.includes('--all')) {
    for (const c of ids.courses) {
      const p = resolve(ROOT, `brand/asv-labs-learn/courses/${c.slug}/hero.png`)
      if (!existsSync(p)) {
        console.warn(`skip ${c.slug}: no hero.png`)
        continue
      }
      await uploadHero(auth, c.course_uuid, p)
    }
    return
  }

  const slugIdx = args.indexOf('--slug')
  const imgIdx = args.indexOf('--image')
  if (slugIdx < 0) {
    console.error('Usage: --slug <slug> --image <path> | --all')
    process.exit(1)
  }
  const slug = args[slugIdx + 1]
  const image =
    imgIdx >= 0
      ? resolve(ROOT, args[imgIdx + 1])
      : resolve(ROOT, `brand/asv-labs-learn/courses/${slug}/hero.png`)
  const meta = bySlug.get(slug)
  if (!meta) throw new Error(`unknown slug ${slug}`)
  await uploadHero(auth, meta.course_uuid, image)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
