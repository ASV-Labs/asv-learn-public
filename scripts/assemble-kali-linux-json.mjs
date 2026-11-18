#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/kali-linux')

const stages = [
  {
    slug: 'stage-01',
    title: 'Kali Linux Setup & Basics',
    hours: '2-3',
    sortOrder: 1,
    md: 'stage-01-kali-setup-basics.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should be named before using Kali tools?',
        options: [
          'The authorized target and purpose',
          'A random public host',
          'A hidden credential',
          'A shortcut alias only'
        ],
        correct: 0,
        explanation:
          'Kali work starts with scope, purpose, and evidence handling before tool use.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice this ASV Learn Kali path?',
        options: [
          'Through a built-in hosted shell workspace with auto-grading',
          'Against any interesting host that appears in a scan',
          'On your own local terminal, VM, or authorized lab hosts with written scope',
          'Only by reading quizzes without writing lab notes'
        ],
        correct: 2,
        explanation:
          'Lessons are read in ASV Learn; practice is authorized local or lab work only — no in-lesson shell sandbox.',
      },
      {
        type: 'multiple_choice',
        question: 'Why include a cleanup note in the Stage 01 lab note?',
        options: [
          'So the authorized target can be expanded quietly',
          'So temporary scratch files do not become confusing evidence later',
          'So tool output can replace the written scope',
          'So snapshots are never needed'
        ],
        correct: 1,
        explanation:
          'Cleanup keeps the next session reviewable and prevents stale files from looking like proof.',
      },
    ],
  },
  {
    slug: 'stage-02',
    title: 'Information Gathering Tools',
    hours: '2-3',
    sortOrder: 2,
    md: 'stage-02-information-gathering.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What separates passive reconnaissance from active reconnaissance?',
        options: [
          'Whether the target system is contacted',
          'Whether the notes are short',
          'Whether Kali is installed',
          'Whether the result looks interesting'
        ],
        correct: 0,
        explanation:
          'Active reconnaissance sends traffic or queries to a target, so it must stay inside scope.',
      },
      {
        type: 'multiple_choice',
        question: 'A useful recon clue automatically means you may scan any related host. True or false?',
        options: [
          'True — discovery equals permission',
          'False — the next action must stay on the authorized target',
          'True — if confidence is high',
          'False — unless the tool name is famous'
        ],
        correct: 1,
        explanation:
          'Evidence supports a hypothesis; authorization and written scope decide contact.',
      },
      {
        type: 'multiple_choice',
        question: 'Why record confidence in a recon log?',
        options: [
          'To make the log longer for grading',
          'To justify scanning out-of-scope networks',
          'To keep weak clues from becoming overstated claims',
          'To replace the evidence note'
        ],
        correct: 2,
        explanation:
          'Honest confidence prevents turning thin sources into certainty.',
      },
    ],
  },
  {
    slug: 'stage-03',
    title: 'Scanning & Enumeration Tools',
    hours: '2-3',
    sortOrder: 3,
    md: 'stage-03-scanning-enumeration.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does an open port prove by itself?',
        options: [
          'The host is compromised',
          'A reachable service may exist',
          'A critical vulnerability exists',
          'The report is complete'
        ],
        correct: 1,
        explanation:
          'Open ports are inventory clues. Vulnerability claims require more evidence.',
      },
      {
        type: 'multiple_choice',
        question: 'What belongs in a professional service inventory row?',
        options: [
          'Host, port, likely service, confidence, and a safe verification step',
          'Only the tool command that produced the loudest output',
          'A list of every host on the local broadcast domain',
          'An exploit name before verification'
        ],
        correct: 0,
        explanation:
          'Inventory rows preserve what was observed and what still needs verification.',
      },
      {
        type: 'multiple_choice',
        question: 'Where may you run active scanners for this course?',
        options: [
          'Against any host that answers ping',
          'Against public websites that load slowly',
          'Only against authorized lab hosts you control or have written permission to test',
          'Against any host that answers on your local Wi‑Fi'
        ],
        correct: 2,
        explanation:
          'Unauthorized scanning can be illegal and harmful; practice stays in authorized labs.',
      },
      {
        type: 'multiple_choice',
        question: 'Why prefer a focused port list on one labeled lab host while learning?',
        options: [
          'Wide subnet sweeps always produce better findings',
          'Focused scans create clearer inventory and less accidental out-of-scope contact',
          'Focused scans remove the need for notes',
          'Tool defaults already guarantee authorization',
        ],
        correct: 1,
        explanation:
          'Beginners learn faster and safer by mapping one authorized host carefully.',
      },
    ],
  },
  {
    slug: 'stage-04',
    title: 'Vulnerability Assessment',
    hours: '2-3',
    sortOrder: 4,
    md: 'stage-04-vulnerability-assessment.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes a vulnerability finding useful?',
        options: [
          'Evidence, impact, and remediation',
          'Only the scanner title',
          'A dramatic label',
          'A list of unrelated tools'
        ],
        correct: 0,
        explanation:
          'Defenders need proof, impact, and a practical remediation path.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is pasting scanner language into a report a beginner mistake?',
        options: [
          'Scanners are never useful',
          'Reports should never mention versions',
          'Scanner titles still need human review against a specific asset and evidence',
          'Remediation should be hidden from defenders'
        ],
        correct: 2,
        explanation:
          'Assessment turns signals into defender-facing findings with asset, evidence, and fix path.',
      },
      {
        type: 'multiple_choice',
        question: 'When evidence only shows an old banner without package confirmation, what confidence fits best?',
        options: [
          'Critical certainty',
          'Medium or low until version is verified',
          'No confidence field is needed',
          'High, because banners never lie'
        ],
        correct: 1,
        explanation:
          'Unverified version matches stay medium/low so impact is not overstated.',
      },
    ],
  },
  {
    slug: 'stage-05',
    title: 'Web Application Testing',
    hours: '2-3',
    sortOrder: 5,
    md: 'stage-05-web-application-testing.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why record expected behavior before changing input?',
        options: [
          'So the request can be ignored',
          'So cookies can be collected',
          'So test results can be compared against a baseline',
          'So scope can be skipped'
        ],
        correct: 2,
        explanation:
          'Expected behavior gives the learner a baseline for safe comparison.',
      },
      {
        type: 'multiple_choice',
        question: 'Which target is appropriate for Stage 05 practice?',
        options: [
          'An intentionally vulnerable lab app you host or are authorized to test',
          'Any public login page that looks interesting',
          'A neighbor router admin panel',
          'A random SaaS tenant without permission'
        ],
        correct: 0,
        explanation:
          'Web testing without authorization is illegal; use lab apps you are allowed to test.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a web test note include before proposing a follow-up?',
        options: [
          'Only a payload list',
          'Method, path, parameter, expected response, and observed response',
          'Only the proxy brand name',
          'A persistence plan'
        ],
        correct: 1,
        explanation:
          'Request shape and baseline comparison keep web testing reviewable and scoped.',
      },
      {
        type: 'multiple_choice',
        question: 'When should you write expected behavior in a web test note?',
        options: [
          'After spraying payloads until something looks interesting',
          'Only if the proxy brand requires it',
          'Before proposing unusual input, so you have a baseline',
          'Never — observed response is enough',
        ],
        correct: 2,
        explanation:
          'Expected behavior written first makes later anomalies comparable and honest.',
      },
    ],
  },
  {
    slug: 'stage-06',
    title: 'Exploitation Techniques',
    hours: '3-4',
    sortOrder: 6,
    md: 'stage-06-exploitation-techniques.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the purpose of a controlled proof in an authorized lab?',
        options: [
          'Validate a confirmed finding with limited impact',
          'Explore unrelated systems',
          'Continue after the goal is met',
          'Collect unnecessary sensitive data'
        ],
        correct: 0,
        explanation:
          'Controlled proof validates a specific finding while limiting impact and documenting stop conditions.',
      },
      {
        type: 'multiple_choice',
        question: 'Which fields belong on a controlled proof card?',
        options: [
          'Tool logo, music playlist, and unlimited scope',
          'Finding, precondition, proof goal, impact limit, stop condition, cleanup',
          'Only the exploit module name',
          'A plan to skip authorization'
        ],
        correct: 1,
        explanation:
          'The card makes validation bounded, reviewable, and stoppable.',
      },
      {
        type: 'multiple_choice',
        question: 'What should you do when the proof goal is met?',
        options: [
          'Pivot to other hosts for practice',
          'Install persistence so the lab stays owned',
          'Delete the proof card so nobody can review it',
          'Stop, save evidence, and run cleanup or rollback as planned'
        ],
        correct: 3,
        explanation:
          'Professional validation ends at the stated goal and leaves a clean, reviewable lab.',
      },
    ],
  },
  {
    slug: 'stage-07',
    title: 'Wireless Testing Tools',
    hours: '2-3',
    sortOrder: 7,
    md: 'stage-07-wireless-testing.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes a nearby wireless network a valid target?',
        options: [
          'Explicit authorization',
          'Strong signal',
          'A familiar name',
          'Appearing in a tool list'
        ],
        correct: 0,
        explanation:
          'Wireless work requires explicit authorization for the specific network.',
      },
      {
        type: 'multiple_choice',
        question: 'If you have no authorized lab SSID, what should you do in this course?',
        options: [
          'Capture all nearby networks for homework',
          'Use café Wi‑Fi because it is convenient',
          'Complete a documentation-only card and do not capture traffic',
          'Skip the privacy rule'
        ],
        correct: 2,
        explanation:
          'No authorization means no capture; the lesson still teaches the scope card.',
      },
      {
        type: 'multiple_choice',
        question: 'Why does a wireless test card need a privacy rule?',
        options: [
          'Privacy rules make captures larger',
          'Radio output can include unrelated people and networks that must stay out of scope',
          'Tool output grants permission automatically',
          'Cleanup is optional on shared spectrum'
        ],
        correct: 1,
        explanation:
          'Shared radio space requires explicit exclusion of non-lab networks and clients.',
      },
    ],
  },
  {
    slug: 'stage-08',
    title: 'Forensics & Analysis',
    hours: '2-3',
    sortOrder: 8,
    md: 'stage-08-forensics-analysis.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why separate observation from interpretation?',
        options: [
          'So uncertainty disappears',
          'So evidence and conclusions stay defensible',
          'So the original artifact can be changed',
          'So the report can skip context'
        ],
        correct: 1,
        explanation:
          'Defensible analysis shows what was directly observed and what was inferred.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the safer place to analyze a lab log?',
        options: [
          'A working copy, while keeping any original unchanged',
          'The only original file, editing it in place',
          'A public paste site with no notes',
          'Memory only, with no written card'
        ],
        correct: 0,
        explanation:
          'Preservation protects originals; analysis belongs on copies with notes.',
      },
      {
        type: 'multiple_choice',
        question: 'Why must an evidence card include uncertainty?',
        options: [
          'So the case can close with false certainty',
          'So observations can be deleted',
          'So assumptions stay visible for the next analyst',
          'So authorization is no longer required'
        ],
        correct: 2,
        explanation:
          'Visible uncertainty keeps analysis honest and reviewable.',
      },
    ],
  },
  {
    slug: 'stage-09',
    title: 'Customizing Kali for Your Workflow',
    hours: '2-3',
    sortOrder: 9,
    md: 'stage-09-customizing-kali-workflow.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should Kali customization improve?',
        options: [
          'Repeatability and evidence quality',
          'Hidden shortcuts',
          'Unreviewed tool use',
          'Untracked files'
        ],
        correct: 0,
        explanation:
          'Professional customization supports reproducible notes, evidence, and reporting.',
      },
      {
        type: 'multiple_choice',
        question: 'What should exist before clever shell aliases?',
        options: [
          'A default that scans every discovered host',
          'A plan to skip backups',
          'A note template and clear workspace layout',
          'An automatic grade for aliases inside the lesson'
        ],
        correct: 2,
        explanation:
          'Repeatability and reviewability come before personal speed hacks.',
      },
      {
        type: 'multiple_choice',
        question: 'How should this ASV Learn Kali card treat longer external curricula?',
        options: [
          'Quietly claim 300+ hours on this same course card',
          'Note that a longer path exists without inflating this card beyond about 20–25 hours',
          'Ignore lab notes because the longer path will cover them',
          'Replace authorization rules with certification logos'
        ],
        correct: 1,
        explanation:
          'This card stays an honest 20–25h lab-hygiene path; deeper curricula are optional later.',
      },
    ],
  },
]

const course = {
  slug: 'kali-linux',
  title: 'Kali Linux & Penetration Testing Tools',
  description:
    'Use Kali Linux as a controlled security lab workstation: prepare scope, collect evidence, document tools, and prove safe workflows before advanced testing. Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; hosted shell sandboxes are not part of this LearnHouse path yet. Honest card length is about 20–25 hours; a longer zero-to-job-ready path exists outside this course.',
  icon: 'KL',
  difficulty: 'Intermediate',
  hours: '20-25',
  topics: ['Kali Linux', 'Security Tools', 'Lab Workflow', 'Evidence Handling'],
  certBadges: ['Kali Lab Practitioner'],
  runtime: 'shell',
  source: {
    fixture: 'content/courses/technodex-fixtures/kali-linux.ts',
    live: 'https://technodex.io/courses/kali-linux',
    feedstock: 'https://github.com/P0GL0L/Kali_Linux_Zero_to_Job_Ready',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/kali-linux.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
