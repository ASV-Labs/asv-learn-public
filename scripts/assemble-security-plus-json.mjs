#!/usr/bin/env node
/**
 * Assemble content/courses/security-plus.json from domain-*.md + quizzes.
 * Usage: node scripts/assemble-security-plus-json.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/security-plus')
const OUT = resolve(ROOT, 'content/courses/security-plus.json')

const stages = [
  {
    slug: 'domain-01',
    title: 'Domain 1: General Security Concepts',
    hours: '5-6',
    sortOrder: 1,
    md: 'domain-01-general-security-concepts.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which field describes the weakness that makes an attack more likely to succeed?',
        options: ['Vulnerability', 'Threat actor', 'Impact', 'Asset owner'],
        correct: 0,
        explanation:
          'A vulnerability is the weakness. The actor uses a vector and the impact describes harm.',
      },
      {
        type: 'multiple_choice',
        question: 'In a phishing email with a fake login page, what is the attack vector?',
        options: [
          'The email link path to the fake page',
          'The reused password alone',
          'Account takeover impact',
          'The MFA control',
        ],
        correct: 0,
        explanation:
          'The vector is the path (email link). The reused password without MFA is the vulnerability.',
      },
      {
        type: 'multiple_choice',
        question: 'Why separate threat actor from vulnerability in a classification row?',
        options: [
          'Cause and weakness are different; mixing them leads to the wrong control',
          'Actors are never relevant to Security+',
          'Vulnerabilities only exist in malware',
          'Impact and control are the same field',
        ],
        correct: 0,
        explanation:
          'Controls should address the weakness and path; naming only the actor is incomplete analysis.',
      },
      {
        type: 'multiple_choice',
        question: 'Which CIA pillar asks whether authorized users can still use the service?',
        options: [
          'Availability',
          'Confidentiality only',
          'Integrity only',
          'Residual risk',
        ],
        correct: 0,
        explanation:
          'Availability is whether authorized use remains possible; confidentiality and integrity answer different questions.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice this ASV Learn domain?',
        options: [
          'Write local study notes on your own terminal, VM, or authorized lab host',
          'Wait for an in-lesson hosted shell with auto-grading',
          'Phish real users for homework credit',
          'Skip the control field if the actor name sounds impressive',
        ],
        correct: 0,
        explanation:
          'Lessons are read in ASV Learn; practice is authorized local lab work only.',
      },
    ],
  },
  {
    slug: 'domain-02',
    title: 'Domain 2: Threats, Vulnerabilities, and Mitigations',
    hours: '5-6',
    sortOrder: 2,
    md: 'domain-02-threats-vulnerabilities-mitigations.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which control best reduces account takeover from password reuse after phishing?',
        options: [
          'Require MFA and reset affected sessions',
          'Buy a new logo',
          'Disable all email forever',
          'Ignore the report if severity feels low',
        ],
        correct: 0,
        explanation:
          'MFA and session reset target the credential-reuse weakness and limit active harm.',
      },
      {
        type: 'multiple_choice',
        question: 'Calling a phishing email itself “the vulnerability” is usually wrong because:',
        options: [
          'The email link is typically the attack vector; the weakness is often weak auth or reuse',
          'Phishing emails are never threats',
          'Vulnerabilities only exist in hardware',
          'Impact and mitigation are identical',
        ],
        correct: 0,
        explanation:
          'Separate path (vector) from weakness (vulnerability) so the mitigation fits.',
      },
      {
        type: 'multiple_choice',
        question: 'Naming an actor type in a lab note is best treated as:',
        options: [
          'A working hypothesis kept separate from proven evidence',
          'Courtroom-grade attribution',
          'Proof that MFA is unnecessary',
          'A reason to skip the mitigation field',
        ],
        correct: 0,
        explanation:
          'Actor labels guide analysis; keep assumptions labeled.',
      },
      {
        type: 'multiple_choice',
        question: 'Unpatched software is which vulnerability category?',
        options: [
          'A known fix exists but is not applied',
          'A zero-day with no public patch by definition',
          'Only a network routing problem',
          'The same as residual risk acceptance',
        ],
        correct: 0,
        explanation:
          'Unpatched means a fix is available but not deployed.',
      },
    ],
  },
  {
    slug: 'domain-03',
    title: 'Domain 3: Security Architecture',
    hours: '5-6',
    sortOrder: 3,
    md: 'domain-03-security-architecture.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is a trust boundary?',
        options: [
          'A point where access, identity, network, or assumptions change',
          'A backup file',
          'A password length rule only',
          'A list of approved vendors',
        ],
        correct: 0,
        explanation:
          'A trust boundary marks where the design needs to re-check assumptions and controls.',
      },
      {
        type: 'multiple_choice',
        question: 'What does defense in depth mean in a design card?',
        options: [
          'Multiple layers so one failure is not total compromise',
          'Buying every security product available',
          'Encrypting only marketing pages',
          'Skipping detection because prevention is enough',
        ],
        correct: 0,
        explanation:
          'Layered controls share the job; product count alone is not the goal.',
      },
      {
        type: 'multiple_choice',
        question: 'Why include an availability control in a security design?',
        options: [
          'Security that breaks authorized use fails the mission',
          'Availability replaces confidentiality',
          'Backups make encryption unnecessary',
          'Availability is only a networking topic',
        ],
        correct: 0,
        explanation:
          'CIA includes availability; usable service is part of a sound design.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the difference between authentication and authorization?',
        options: [
          'Authentication proves identity; authorization controls allowed actions',
          'Authentication encrypts files; authorization scans malware',
          'They are the same thing',
          'Authorization happens only after an incident',
        ],
        correct: 0,
        explanation:
          'Architecture places both identity proof and action limits at the right boundaries.',
      },
      {
        type: 'multiple_choice',
        question: 'Which statement is a validation note, not a shopping list?',
        options: [
          'Controls map to credential theft and abusive login traffic',
          'Buy Brand X firewall and Brand Y EDR',
          'Use whatever is cheapest',
          'Security is enabled',
        ],
        correct: 0,
        explanation:
          'Validation ties design choices to named risks rather than vendor names.',
      },
    ],
  },
  {
    slug: 'domain-04',
    title: 'Domain 4: Security Operations',
    hours: '5-6',
    sortOrder: 4,
    md: 'domain-04-security-operations.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why separate containment from recovery?',
        options: [
          'Containment limits active harm; recovery restores safe operation',
          'Containment is only for backups',
          'Recovery should happen before evidence collection every time',
          'They are only compliance labels',
        ],
        correct: 0,
        explanation:
          'Incident response needs both immediate risk reduction and a controlled path back to normal.',
      },
      {
        type: 'multiple_choice',
        question: 'What should happen before cleanup that might destroy logs?',
        options: [
          'Preserve evidence needed for investigation',
          'Restore full access immediately',
          'Delete the alert to reduce noise',
          'Skip severity assignment',
        ],
        correct: 0,
        explanation:
          'Evidence preservation keeps facts available for analysis and lessons learned.',
      },
      {
        type: 'multiple_choice',
        question: 'Severity in an incident note is best described as:',
        options: [
          'A priority label tied to urgency and impact, not a final verdict',
          'Proof that a breach is confirmed',
          'A replacement for evidence',
          'Only a compliance checkbox',
        ],
        correct: 0,
        explanation:
          'Severity guides response speed; it does not replace analysis.',
      },
      {
        type: 'multiple_choice',
        question: 'Which lesson learned is concrete enough for Domain 4 (Security Operations)?',
        options: [
          'Review conditional access for risky travel and unexplained devices',
          'Be more careful next time',
          'Security is important',
          'Users should try harder',
        ],
        correct: 0,
        explanation:
          'Lessons learned should name a detection, policy, or process change.',
      },
    ],
  },
  {
    slug: 'domain-05',
    title: 'Domain 5: Security Program Management and Oversight',
    hours: '5-6',
    sortOrder: 5,
    md: 'domain-05-security-program-management.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does residual risk mean?',
        options: [
          'The risk that remains after controls and decisions are applied',
          'A deleted log file',
          'A type of malware',
          'A network route',
        ],
        correct: 0,
        explanation:
          'Residual risk is what remains after the organization chooses and applies controls.',
      },
      {
        type: 'multiple_choice',
        question: 'Which pair must stay separate in a risk row?',
        options: [
          'Likelihood and impact',
          'Owner and asset',
          'Policy and procedure names only',
          'Accept and avoid (they are identical)',
        ],
        correct: 0,
        explanation:
          'Probability and harm are different dimensions; mixing them distorts priority.',
      },
      {
        type: 'multiple_choice',
        question: 'Choosing MFA to lower account-takeover chance is which treatment?',
        options: [
          'Reduce (mitigate)',
          'Accept with no owner',
          'Avoid by shutting the internet',
          'Transfer to users only',
        ],
        correct: 0,
        explanation:
          'Controls that lower likelihood or impact are risk reduction.',
      },
      {
        type: 'multiple_choice',
        question: 'What makes an oversight note useful in Domain 5?',
        options: [
          'It names evidence artifacts that could prove the control later',
          'It only says “compliant”',
          'It lists every framework acronym',
          'It hides the residual decision',
        ],
        correct: 0,
        explanation:
          'Program oversight needs measurable evidence, not theater.',
      },
      {
        type: 'multiple_choice',
        question: 'Who should appear in the owner field of a risk row?',
        options: [
          'An accountable role that can act on the risk',
          'Everyone in the company',
          'No one, if a policy exists',
          'Only the vendor',
        ],
        correct: 0,
        explanation:
          'Program management requires clear accountability, not anonymous ownership.',
      },
    ],
  },
  {
    slug: 'domain-06',
    title: 'Exam Mindset & Practice Set',
    hours: '3-4',
    sortOrder: 6,
    md: 'domain-06-exam-practice.md',
    quiz: [
      {
        type: 'multiple_choice',
        question:
          'A phishing email links to a fake login. Password reuse without MFA is the weakness. Which field is the attack vector?',
        options: [
          'The email link path to the fake page',
          'Password reuse without MFA',
          'Account takeover impact',
          'MFA as the control',
        ],
        correct: 0,
        explanation:
          'The vector is the path (email link). Reuse without MFA is the vulnerability; takeover is impact.',
      },
      {
        type: 'multiple_choice',
        question:
          'A stem asks for the first incident action after confirmed malware on one authorized lab VM. Which elimination is best?',
        options: [
          'Discard answers that jump to org-wide recovery before containment and evidence',
          'Pick the longest acronym list',
          'Prefer leaked exam dump wording',
          'Ignore evidence because the VM is disposable',
        ],
        correct: 0,
        explanation:
          'Match the asked phase. Cleanup or full recovery before containment often fails Domain 4 (Security Operations) stems.',
      },
      {
        type: 'multiple_choice',
        question:
          'A user passes MFA but cannot download another student’s export. What does that show?',
        options: [
          'Authentication succeeded; authorization limited the action',
          'Authorization replaced authentication',
          'Encryption failed',
          'Residual risk was accepted with no owner',
        ],
        correct: 0,
        explanation:
          'AuthN proved identity; AuthZ correctly blocked the cross-student action (Domain 3 architecture placement).',
      },
      {
        type: 'multiple_choice',
        question:
          'For a Domain 5 risk row, likelihood is possible and impact is high. You choose reduce with stronger MFA. What else is required for program-oversight quality?',
        options: [
          'An accountable owner and evidence that could be checked later',
          'Only a product brand name',
          'A claim that compliance automatically equals security',
          'A blank residual decision',
        ],
        correct: 0,
        explanation:
          'Program management and oversight need ownership and measurable evidence, not theater.',
      },
      {
        type: 'multiple_choice',
        question:
          'Why map each practice item to SY0-701 Domains 1–5 before committing an answer?',
        options: [
          'It focuses elimination on the ask instead of “most secure sounding” options',
          'Domain labels appear on every real exam screen',
          'It replaces the need for local notes',
          'It authorizes use of pirated dumps',
        ],
        correct: 0,
        explanation:
          'Domain mapping is a study habit that improves distractor elimination.',
      },
      {
        type: 'multiple_choice',
        question:
          'Which workflow matches this ASV Labs Learn exam-practice chapter?',
        options: [
          'Timed local drills in ~/asv-learn-security-plus/exam-practice with miss triage',
          'A hosted CompTIA graded sandbox inside ASV Learn',
          'Memorizing official leaked exam strings',
          'Skipping Domains 1–5 entirely',
        ],
        correct: 0,
        explanation:
          'Practice is local study only; items are pedagogical originals, not official CompTIA content.',
      },
      {
        type: 'multiple_choice',
        question:
          'A design list names five vendors but no trust boundaries or failure modes. What is missing?',
        options: [
          'Layered placement tied to named risks and what happens if one control fails',
          'More product logos',
          'Removing authentication to simplify UX',
          'Treating availability as irrelevant',
        ],
        correct: 0,
        explanation:
          'Domain 3 (Security Architecture) quality is design reasoning at boundaries, not a shopping list.',
      },
    ],
  },
]

let existing = {}
try {
  existing = JSON.parse(readFileSync(OUT, 'utf8'))
} catch {
  /* first assemble */
}

const learnings = [
  'Apply SY0-701 general security concepts: CIA, control types, and risk-chain vocabulary',
  'Classify threats, vulnerabilities, and mitigations with evidence-tied controls',
  'Design security architecture at trust boundaries (including identity and crypto placement)',
  'Operate detection and incident response with containment before recovery',
  'Make security program management and oversight decisions in plain language',
  'Practice exam mindset with local drills that map stems to SY0-701 Domains 1–5',
]

const course = {
  slug: 'security-plus',
  title: 'CompTIA Security+',
  description:
    'Practical CompTIA Security+ (SY0-701) fundamentals across the five exam domains—general security concepts; threats, vulnerabilities, and mitigations; security architecture; security operations; and security program management and oversight—plus a local exam-mindset practice chapter.',
  difficulty: 'Beginner',
  hours: '28-34',
  topics: ['Security Foundations', 'Risk Management', 'Access Control', 'Incident Response'],
  certBadges: ['Security Foundations'],
  runtime: 'shell',
  learnings,
  ...(existing.tags ? { tags: existing.tags } : { tags: 'Cyber, cybersecurity, security' }),
  source: {
    markdown: 'content/courses/security-plus/',
    live: 'https://learn.asv-labs.com',
  },
  stages: stages.map(({ md, quiz, ...meta }) => ({
    ...meta,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
    quiz,
  })),
}

writeFileSync(OUT, JSON.stringify(course, null, 2) + '\n')
console.log(`Wrote ${OUT}`)
for (const s of course.stages) {
  const words = s.content.trim().split(/\s+/).filter(Boolean).length
  console.log(`${s.slug}: ${words} words, ${s.quiz.length} quiz items — ${s.title}`)
}
