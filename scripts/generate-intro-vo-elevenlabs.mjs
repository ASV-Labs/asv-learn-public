#!/usr/bin/env node
/**
 * Generate per-beat intro narration with ElevenLabs TTS, then optionally rebuild
 * the sketch video (SketchVideo.swift for python-zero pilot, CourseIntroSketch.swift
 * when scenes.json is present).
 *
 * Usage:
 *   node scripts/generate-intro-vo-elevenlabs.mjs
 *   node scripts/generate-intro-vo-elevenlabs.mjs --slug security-plus --render
 *   node scripts/generate-intro-vo-elevenlabs.mjs --all --render
 *   node scripts/generate-intro-vo-elevenlabs.mjs --slug security-plus --dry-run
 *   node scripts/generate-intro-vo-elevenlabs.mjs --voice-id <id> --render
 *   node scripts/generate-intro-vo-elevenlabs.mjs --slug security-plus --render --promote
 *
 * API key: ELEVENLABS_API_KEY / XI_API_KEY env, else auto-load from
 *   ~/.config/asv-labs/elevenlabs.env  or  ~/.learnhouse/elevenlabs-api-key.txt
 *
 * Preview only by default — never overwrites production intros unless --promote.
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  renameSync,
  unlinkSync,
} from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { execFileSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const BRAND = resolve(ROOT, 'brand/asv-labs-learn')
const LEGACY_INTRO = resolve(BRAND, 'intro-video')
const COURSES = resolve(BRAND, 'courses')
const SLUGS_FILE = resolve(COURSES, 'intro-slugs.json')
const SKETCH_LEGACY = resolve(LEGACY_INTRO, 'SketchVideo.swift')
const SKETCH_TEMPLATED = resolve(LEGACY_INTRO, 'CourseIntroSketch.swift')
const MEASURE = resolve(LEGACY_INTRO, 'measure-vo.sh')

const API = 'https://api.elevenlabs.io/v1'

/**
 * Load ELEVENLABS_API_KEY from env, or from secure files outside the git repo:
 *   ~/.config/asv-labs/elevenlabs.env  (KEY=value lines)
 *   ~/.learnhouse/elevenlabs-api-key.txt  (raw key or KEY=value)
 * Never commit those paths; do not print the key.
 */
function loadApiKey() {
  const fromEnv = process.env.ELEVENLABS_API_KEY || process.env.XI_API_KEY || ''
  if (fromEnv.trim()) return fromEnv.trim()

  const home = homedir()
  const candidates = [
    join(home, '.config/asv-labs/elevenlabs.env'),
    join(home, '.learnhouse/elevenlabs-api-key.txt'),
  ]
  for (const path of candidates) {
    if (!existsSync(path)) continue
    const raw = readFileSync(path, 'utf8').trim()
    if (!raw) continue
    for (const line of raw.split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const m = t.match(/^(?:ELEVENLABS_API_KEY|XI_API_KEY)\s*=\s*(.+)$/)
      if (m) return m[1].trim().replace(/^['"]|['"]$/g, '')
      if (!t.includes('=')) return t
    }
  }
  return ''
}

/** Calm instructional default — override with --voice-id */
const DEFAULT_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb' // George

function parseArgs(argv) {
  const out = {
    voiceId: DEFAULT_VOICE_ID,
    render: false,
    listVoices: false,
    model: 'eleven_multilingual_v2',
    slug: null,
    all: false,
    dryRun: false,
    promote: false,
    skipTts: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--voice-id') out.voiceId = argv[++i]
    else if (a === '--model') out.model = argv[++i]
    else if (a === '--render') out.render = true
    else if (a === '--list-voices') out.listVoices = true
    else if (a === '--slug') out.slug = argv[++i]
    else if (a === '--all') out.all = true
    else if (a === '--dry-run') out.dryRun = true
    else if (a === '--promote') out.promote = true
    else if (a === '--skip-tts') out.skipTts = true
    else if (a === '--help' || a === '-h') out.help = true
  }
  return out
}

function printHelp() {
  console.log(`ASV Learn ElevenLabs intro VO + sketch pipeline

Usage:
  node scripts/generate-intro-vo-elevenlabs.mjs [--slug <slug>] [--render] [--promote]
  node scripts/generate-intro-vo-elevenlabs.mjs --all [--render]
  node scripts/generate-intro-vo-elevenlabs.mjs --slug <slug> --dry-run
  node scripts/generate-intro-vo-elevenlabs.mjs --slug <slug> --skip-tts --render

Flags:
  --slug <slug>   Course slug (default: python-zero)
  --all           Process slugs in brand/asv-labs-learn/courses/intro-slugs.json
  --render        Rebuild sketch mp4 into courses/<slug>/intro-elevenlabs/
  --promote       After render, copy preview → production asv-labs-learn-<slug>-intro.mp4
  --skip-tts      Skip ElevenLabs; use existing vo/beat-NN.* (render/measure only)
  --dry-run       Validate paths / print plan; no API calls, no render
  --voice-id      ElevenLabs voice id (default: George)
  --model         ElevenLabs model id
  --list-voices   List voices (may 401 without voices_read)
`)
}

function loadBatchSlugs() {
  if (!existsSync(SLUGS_FILE)) {
    throw new Error(`Missing ${SLUGS_FILE}`)
  }
  const data = JSON.parse(readFileSync(SLUGS_FILE, 'utf8'))
  const slugs = Array.isArray(data) ? data : data.slugs || []
  if (!slugs.length) throw new Error(`No slugs in ${SLUGS_FILE}`)
  return slugs
}

/**
 * Resolve per-slug work paths.
 * python-zero keeps backward compat with brand/asv-labs-learn/intro-video/
 * unless courses/python-zero/intro-video/scenes.json (or beat files) exist.
 */
function resolveSlugPaths(slug) {
  const courseIntro = resolve(COURSES, slug, 'intro-video')
  const courseScenes = resolve(courseIntro, 'scenes.json')
  const courseBeat = resolve(courseIntro, 'vo', 'beat-01.txt')
  const previewDir = resolve(COURSES, slug, 'intro-elevenlabs')
  const previewMp4 = resolve(previewDir, `asv-labs-learn-${slug}-intro.mp4`)
  const productionMp4 = resolve(BRAND, `asv-labs-learn-${slug}-intro.mp4`)
  const courseProduction = resolve(COURSES, slug, `asv-labs-learn-${slug}-intro.mp4`)

  let introDir
  if (slug === 'python-zero') {
    const useCourse =
      existsSync(courseScenes) ||
      (existsSync(courseBeat) && !existsSync(resolve(LEGACY_INTRO, 'vo', 'beat-01.txt')))
    introDir = useCourse ? courseIntro : LEGACY_INTRO
  } else {
    introDir = courseIntro
  }

  const scenesPath = resolve(introDir, 'scenes.json')
  const hasScenes = existsSync(scenesPath)

  return {
    slug,
    introDir,
    voDir: resolve(introDir, 'vo'),
    outDir: resolve(introDir, 'vo', 'elevenlabs'),
    audioDir: resolve(introDir, 'audio'),
    timingPath: resolve(introDir, 'timing.txt'),
    scenesPath,
    hasScenes,
    previewDir,
    previewMp4,
    productionMp4,
    courseProduction,
    useLegacySketch: slug === 'python-zero' && !hasScenes,
  }
}

function discoverBeatCount(voDir) {
  let beatCount = 0
  for (let i = 1; i <= 32; i++) {
    const n = String(i).padStart(2, '0')
    if (existsSync(resolve(voDir, `beat-${n}.txt`))) beatCount = i
    else if (beatCount > 0) break
  }
  return beatCount
}

/** Spoken text only. Strips legacy "BEAT NN — … save as …" headers if present. */
function beatText(voDir, n) {
  const path = resolve(voDir, `beat-${String(n).padStart(2, '0')}.txt`)
  const raw = readFileSync(path, 'utf8')
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/^BEAT\s/i.test(l) && !/^→/.test(l) && !/save as/i.test(l) && !/^={3,}/.test(l))
    .map((l) => l.replace(/^\[PAUSE[^\]]*\]\s*/i, '').replace(/\s*\[PAUSE[^\]]*\]\s*/gi, ' '))
    .filter((l) => l && !/^\[PAUSE/i.test(l))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function listVoices(key) {
  const res = await fetch(`${API}/voices`, {
    headers: { 'xi-api-key': key },
  })
  if (!res.ok) throw new Error(`voices failed: ${res.status} ${await res.text()}`)
  const data = await res.json()
  for (const v of data.voices || []) {
    console.log(`${v.voice_id}\t${v.name}\t${v.labels?.accent || ''} ${v.labels?.description || ''}`.trim())
  }
}

async function tts(key, text, voiceId, model, outPath) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'xi-api-key': key,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: model,
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.75,
        style: 0.15,
        use_speaker_boost: true,
      },
    }),
  })
  if (!res.ok) throw new Error(`tts failed (${outPath}): ${res.status} ${await res.text()}`)
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(outPath, buf)
  return buf.length
}

function maybeAfconvert(mp3Path, m4aPath) {
  try {
    execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', mp3Path, m4aPath], { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

function renderSketch(paths) {
  mkdirSync(paths.previewDir, { recursive: true })
  if (paths.useLegacySketch) {
    console.log(`\nRendering SketchVideo → ${paths.previewDir}`)
    execFileSync('swift', [SKETCH_LEGACY, paths.previewDir, paths.introDir], {
      cwd: paths.introDir,
      stdio: 'inherit',
    })
  } else {
    if (!existsSync(SKETCH_TEMPLATED)) {
      throw new Error(`Missing templated sketcher: ${SKETCH_TEMPLATED}`)
    }
    if (!paths.hasScenes) {
      throw new Error(`Missing scenes.json for ${paths.slug}: ${paths.scenesPath}`)
    }
    console.log(`\nRendering CourseIntroSketch → ${paths.previewMp4}`)
    execFileSync(
      'swift',
      [
        SKETCH_TEMPLATED,
        '--scenes',
        paths.scenesPath,
        '--timing',
        paths.timingPath,
        '--audio',
        paths.audioDir,
        '--vo',
        paths.voDir,
        '--out',
        paths.previewMp4,
        '--slug',
        paths.slug,
      ],
      { cwd: LEGACY_INTRO, stdio: 'inherit' }
    )
  }
  if (existsSync(paths.previewMp4)) {
    console.log(`\nElevenLabs preview: ${paths.previewMp4}`)
    console.log(`Production left untouched: ${paths.productionMp4}`)
  } else {
    console.warn(`Expected preview missing: ${paths.previewMp4}`)
  }
}

function promotePreview(paths) {
  if (!existsSync(paths.previewMp4)) {
    throw new Error(`Cannot promote — preview missing: ${paths.previewMp4}`)
  }
  copyFileSync(paths.previewMp4, paths.productionMp4)
  console.log(`Promoted → ${paths.productionMp4}`)
  // Also mirror under course folder if a production copy already lived there
  if (existsSync(paths.courseProduction) || existsSync(dirname(paths.courseProduction))) {
    try {
      copyFileSync(paths.previewMp4, paths.courseProduction)
      console.log(`Promoted → ${paths.courseProduction}`)
    } catch {
      /* optional */
    }
  }
}

function packageReady(paths) {
  const beats = discoverBeatCount(paths.voDir)
  const missing = []
  if (beats < 1) missing.push('vo/beat-NN.txt')
  if (paths.slug !== 'python-zero' || paths.hasScenes) {
    if (!paths.hasScenes) missing.push('scenes.json')
  }
  return { beats, missing, ok: missing.length === 0 && beats >= 1 }
}

async function processSlug(slug, args, key) {
  const paths = resolveSlugPaths(slug)
  const ready = packageReady(paths)

  console.log(`\n=== ${slug} ===`)
  console.log(`introDir=${paths.introDir}`)
  console.log(`scenes=${paths.hasScenes ? paths.scenesPath : '(none — legacy SketchVideo if python-zero)'}`)
  console.log(`preview=${paths.previewMp4}`)

  if (args.dryRun) {
    console.log(`beats=${ready.beats} ready=${ready.ok}${ready.missing.length ? ` missing=${ready.missing.join(',')}` : ''}`)
    console.log(
      `plan: ${args.skipTts ? 'skip-tts' : 'tts'} → measure-vo.sh → ${args.render ? 'render' : 'no-render'}${args.promote ? ' → promote' : ''}`
    )
    return { slug, ok: ready.ok, dryRun: true }
  }

  if (!ready.ok && !paths.useLegacySketch) {
    console.error(`Package incomplete for ${slug}: missing ${ready.missing.join(', ')}`)
    return { slug, ok: false, error: 'incomplete package' }
  }
  if (ready.beats < 1) {
    console.error(`No beat-*.txt in ${paths.voDir}`)
    return { slug, ok: false, error: 'no beats' }
  }

  mkdirSync(paths.outDir, { recursive: true })
  mkdirSync(paths.audioDir, { recursive: true })

  if (!args.skipTts) {
    console.log(`voice=${args.voiceId} model=${args.model} beats=${ready.beats}`)
    for (let i = 1; i <= ready.beats; i++) {
      const n = String(i).padStart(2, '0')
      const text = beatText(paths.voDir, i)
      if (!text) throw new Error(`empty beat text for beat-${n} (${slug})`)
      const out = resolve(paths.outDir, `beat-${n}.mp3`)
      const bytes = await tts(key, text, args.voiceId, args.model, out)
      const dest = resolve(paths.voDir, `beat-${n}.mp3`)
      copyFileSync(out, dest)
      const m4a = resolve(paths.audioDir, `beat-${n}.m4a`)
      if (maybeAfconvert(dest, m4a)) {
        /* ok */
      }
      console.log(`✓ beat-${n}  ${bytes} bytes  "${text.slice(0, 56)}…"`)
    }

    // Remove stale higher-numbered beat audio from older scripts
    for (let i = ready.beats + 1; i <= 20; i++) {
      const n = String(i).padStart(2, '0')
      for (const ext of ['mp3', 'm4a']) {
        for (const p of [
          resolve(paths.voDir, `beat-${n}.${ext}`),
          resolve(paths.outDir, `beat-${n}.${ext}`),
          resolve(paths.audioDir, `beat-${n}.${ext}`),
        ]) {
          if (existsSync(p)) {
            try {
              unlinkSync(p)
            } catch {
              /* ignore */
            }
          }
        }
      }
    }
  } else {
    console.log(`skip-tts beats=${ready.beats}`)
  }

  // Prefer per-beat ElevenLabs clips over a continuous human take (legacy path).
  const continuous = resolve(paths.voDir, 'voiceover.m4a')
  const continuousBackup = resolve(paths.voDir, 'voiceover.human-backup.m4a')
  const continuousOff = resolve(paths.voDir, 'voiceover.m4a.off-for-elevenlabs')
  if (existsSync(continuous) && !existsSync(continuousBackup)) {
    copyFileSync(continuous, continuousBackup)
  }

  const restoreContinuous = () => {
    if (existsSync(continuousOff) && !existsSync(continuous)) {
      renameSync(continuousOff, continuous)
    }
  }

  try {
    if (existsSync(continuous)) {
      renameSync(continuous, continuousOff)
    }

    execFileSync('bash', [MEASURE, paths.introDir], { stdio: 'inherit' })

    if (args.render) {
      renderSketch(paths)
    } else if (!args.promote) {
      console.log('\nAudio ready. Re-run with --render to rebuild the sketch video.')
    }

    // Allow --skip-tts --promote to publish an existing preview without re-rendering.
    if (args.promote) {
      promotePreview(paths)
    }
  } finally {
    restoreContinuous()
  }

  return { slug, ok: true }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  if (args.listVoices) {
    const key = loadApiKey()
    if (!key) {
      console.error('Missing ELEVENLABS_API_KEY for --list-voices')
      process.exit(1)
    }
    await listVoices(key)
    return
  }

  const slugs = args.all
    ? loadBatchSlugs().filter((s) => {
        // Include python-zero only when course scenes exist (legacy pilot stays default --slug)
        if (s === 'python-zero') {
          return existsSync(resolve(COURSES, 'python-zero', 'intro-video', 'scenes.json'))
        }
        return true
      })
    : [args.slug || 'python-zero']

  const needKey = !args.dryRun && !args.skipTts
  const key = needKey ? loadApiKey() : ''
  if (needKey && !key) {
    console.error('Missing ELEVENLABS_API_KEY (or XI_API_KEY).')
    console.error('Store outside the repo (mode 600), e.g.:')
    console.error('  ~/.config/asv-labs/elevenlabs.env   →  ELEVENLABS_API_KEY=...')
    console.error('  ~/.learnhouse/elevenlabs-api-key.txt →  raw key or KEY=value')
    console.error('Or use --dry-run / --skip-tts --render with existing audio.')
    process.exit(1)
  }

  const results = []
  for (const slug of slugs) {
    results.push(await processSlug(slug, args, key))
  }

  const failed = results.filter((r) => !r.ok)
  if (failed.length) {
    console.error(`\nFailed: ${failed.map((r) => r.slug).join(', ')}`)
    process.exit(1)
  }
  console.log(`\nDone (${results.length} slug${results.length === 1 ? '' : 's'}).`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
