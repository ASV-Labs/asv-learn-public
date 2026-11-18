#!/usr/bin/env node
/**
 * Build a definitive local inventory of all 13 live TechNodeX / learn.asv-labs courses
 * from prisma course fixtures + live learning-page metadata.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const FIXTURE_DIR = join(ROOT, 'content/courses/technodex-fixtures')
const OUT = join(ROOT, 'content/courses/catalog-13.json')

/** Live order + metadata from https://technodex.io/learning */
const LIVE = [
  {
    slug: 'python-zero',
    title: 'Python Zero to Useful',
    track: 'Python',
    difficulty: 'Beginner',
    hours: '70-95',
    lessonsLive: 23,
    href: 'https://technodex.io/courses/python-zero',
    fixture: 'python-zero.ts',
    sourceRepos: [],
  },
  {
    slug: 'security-plus',
    title: 'CompTIA Security+',
    track: 'Cyber',
    difficulty: 'Beginner',
    hours: '28-34',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/security-plus',
    fixture: 'security-plus.ts',
    sourceRepos: ['https://github.com/P0GL0L/SEC-Study_Guide'],
  },
  {
    slug: 'ethical-hacking',
    title: 'Ethical Hacking & Penetration Testing',
    track: 'Cyber',
    difficulty: 'Intermediate',
    hours: '40-50',
    lessonsLive: 16,
    href: 'https://technodex.io/courses/ethical-hacking',
    fixture: 'ethical-hacking.ts',
    sourceRepos: ['https://github.com/P0GL0L/EthicalHacking_1'],
  },
  {
    slug: 'kali-linux',
    title: 'Kali Linux & Penetration Testing Tools',
    track: 'Cyber',
    difficulty: 'Intermediate',
    hours: '20-25',
    lessonsLive: 9,
    href: 'https://technodex.io/courses/kali-linux',
    fixture: 'kali-linux.ts',
    sourceRepos: ['https://github.com/P0GL0L/Kali_Linux_Zero_to_Job_Ready'],
  },
  {
    slug: 'soc-blue-team',
    title: 'SOC & Blue Team',
    track: 'Cyber',
    difficulty: 'Intermediate',
    hours: '18-24',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/soc-blue-team',
    fixture: 'soc-blue-team.ts',
    sourceRepos: [],
  },
  {
    slug: 'python-security',
    title: 'Python for Cybersecurity',
    track: 'Cyber',
    difficulty: 'Intermediate',
    hours: '15-18',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/python-security',
    fixture: 'python-security.ts',
    sourceRepos: ['https://github.com/P0GL0L/python-cybersecurity-learning-path'],
  },
  {
    slug: 'applied-agentic-ai',
    title: 'Applied Agentic AI',
    track: 'AI',
    difficulty: 'Advanced',
    hours: '18-20',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/applied-agentic-ai',
    fixture: 'applied-agentic-ai.ts',
    sourceRepos: [],
  },
  {
    slug: 'ai-fundamentals',
    title: 'AI Fundamentals for Builders',
    track: 'AI',
    difficulty: 'Beginner-to-Builder',
    hours: '28-36',
    lessonsLive: 13,
    href: 'https://technodex.io/courses/ai-fundamentals',
    fixture: 'ai-fundamentals.ts',
    sourceRepos: ['https://github.com/P0GL0L/ai-training-technodex'],
  },
  {
    slug: 'ai-foundations-engineering',
    title: 'AI Foundations Engineering',
    track: 'AI',
    difficulty: 'Intermediate',
    hours: '15-18',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/ai-foundations-engineering',
    fixture: 'ai-foundations-engineering.ts',
    sourceRepos: [],
  },
  {
    slug: 'python-full',
    title: 'Python Full Stack',
    track: 'Software',
    difficulty: 'Intermediate',
    hours: '50-60',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/python-full',
    fixture: 'python-full-stack.ts',
    sourceRepos: [],
  },
  {
    slug: 'fullstack',
    title: 'Full Stack Development',
    track: 'Software',
    difficulty: 'Intermediate',
    hours: '60-70',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/fullstack',
    fixture: 'fullstack.ts',
    sourceRepos: [],
  },
  {
    slug: 'react',
    title: 'React & Modern Frontend',
    track: 'Software',
    difficulty: 'Beginner',
    hours: '30-40',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/react',
    fixture: 'react.ts',
    sourceRepos: [],
  },
  {
    slug: 'devops',
    title: 'DevOps & Infrastructure',
    track: 'Software',
    difficulty: 'Intermediate',
    hours: '40-50',
    lessonsLive: 6,
    href: 'https://technodex.io/courses/devops',
    fixture: 'devops.ts',
    sourceRepos: [],
  },
]

function parseStages(text) {
  const stages = []
  const blocks = text.split(/\{\s*\n\s*slug:\s*"/).slice(1)
  for (const block of blocks) {
    const slug = block.slice(0, block.indexOf('"'))
    const title = (block.match(/title:\s*"([^"]+)"/) || [])[1]
    const hours = (block.match(/hours:\s*"([^"]+)"/) || [])[1]
    if (!title) continue
    // Skip nested task objects that also have slug/title in some fixtures
    const sortOrder = (block.match(/sortOrder:\s*(\d+)/) || [])[1]
    if (sortOrder == null) continue
    stages.push({
      slug,
      title,
      hours: hours || null,
      sortOrder: Number(sortOrder),
    })
  }
  return stages.sort((a, b) => a.sortOrder - b.sortOrder)
}

const fixtureFiles = readdirSync(FIXTURE_DIR).filter((f) => f.endsWith('.ts'))
if (fixtureFiles.length !== 13) {
  console.error(`Expected 13 fixture files, found ${fixtureFiles.length} in ${FIXTURE_DIR}`)
  process.exit(1)
}

const courses = LIVE.map((meta) => {
  const fixturePath = join(FIXTURE_DIR, meta.fixture)
  const text = readFileSync(fixturePath, 'utf8')
  const stages = parseStages(text)
  const lessonCount = (text.match(/sortOrder:\s*\d+/g) || []).length
  return {
    ...meta,
    lessonsFixture: lessonCount,
    fixtureBytes: statSync(fixturePath).size,
    fixturePath: `content/courses/technodex-fixtures/${meta.fixture}`,
    stages,
  }
})

const totalLessonsLive = courses.reduce((n, c) => n + c.lessonsLive, 0)
const totalLessonsFixture = courses.reduce((n, c) => n + c.lessonsFixture, 0)

const catalog = {
  generatedAt: new Date().toISOString(),
  sourcePage: 'https://technodex.io/learning',
  alsoAt: 'https://learn.asv-labs.com/learning',
  platform: 'TechNodeX / Learn | ASV Labs (same deploy)',
  migrationTarget: 'asv-learn (LearnHouse)',
  totalCourses: courses.length,
  totalLessonsLive,
  totalLessonsFixture,
  sandboxRuntimes: ['python', 'javascript', 'shell'],
  courses,
}

mkdirSync(join(ROOT, 'content/courses'), { recursive: true })
writeFileSync(OUT, JSON.stringify(catalog, null, 2) + '\n')

console.log(`Wrote ${OUT}`)
console.log(`Courses: ${catalog.totalCourses}`)
console.log(`Lessons (live): ${totalLessonsLive}`)
console.log(`Lessons (fixture sortOrder sum): ${totalLessonsFixture}`)
for (const c of courses) {
  const mismatch =
    c.lessonsLive !== c.lessonsFixture ? ` ⚠ live=${c.lessonsLive} fixture=${c.lessonsFixture}` : ''
  console.log(
    `- ${c.slug}: ${c.title} · ${c.lessonsLive} lessons · ${c.hours}h · ${c.stages.length} stages${mismatch}`
  )
}
