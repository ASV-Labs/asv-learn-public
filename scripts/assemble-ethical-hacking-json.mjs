#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/ethical-hacking')

const stages = [
  {
    slug: 'stage-01',
    title: 'Ethical Hacking Fundamentals',
    hours: '2-3',
    sortOrder: 1,
    md: 'stage-01-ethical-hacking-fundamentals.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What turns security testing into ethical hacking?',
        options: [
          'Explicit authorization and scope',
          'Using a popular tool',
          'Finding an open port',
          'Running tests quickly'
        ],
        correct: 0,
        explanation:
          'Ethical hacking requires written permission, boundaries, and reviewable evidence — not tool speed.',
      },
      {
        type: 'multiple_choice',
        question: 'Which item belongs on a beginner scope card before any scan?',
        options: [
          'A list of every CVE ever published',
          'Neighbor Wi-Fi SSIDs discovered by accident',
          'Authorized target, exclusions, test window, and stop rule',
          'A promise to skip documentation'
        ],
        correct: 2,
        explanation:
          'Scope cards make permission, exclusions, timing, and stop conditions visible before contact.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice this ASV Learn stage?',
        options: [
          'Use an in-lesson hosted shell workspace with auto-grading',
          'Write local lab notes on your own terminal, VM, or authorized lab host',
          'Scan random public websites for homework credit',
          'Skip authorization because the course mentions hacking'
        ],
        correct: 1,
        explanation:
          'Lessons are read in ASV Learn; practice is authorized local lab work only.',
      },
    ],
  },
  {
    slug: 'stage-02',
    title: 'Reconnaissance Planning',
    hours: '3-4',
    sortOrder: 2,
    md: 'stage-02-reconnaissance-planning.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the key difference between passive and active reconnaissance?',
        options: [
          'Passive recon always proves compromise',
          'Active recon contacts the target',
          'Active recon does not need scope',
          'Passive recon means no notes'
        ],
        correct: 1,
        explanation:
          'Active reconnaissance sends traffic or queries to a target, so it must stay inside authorization.',
      },
      {
        type: 'multiple_choice',
        question: 'Why record confidence on each recon clue?',
        options: [
          'To keep weak clues from becoming certainty',
          'To make the report longer',
          'To replace the scope card',
          'To justify contacting out-of-scope hosts'
        ],
        correct: 0,
        explanation:
          'Confidence labels prevent overclaiming and force honest next-step decisions.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a recon next action always reference?',
        options: [
          'Any hostname that looks interesting online',
          'The loudest tool default',
          'An authorized lab target still inside scope',
          'A finding severity before evidence exists'
        ],
        correct: 2,
        explanation:
          'Useful clues are not automatic permission; next actions must stay on labeled authorized targets.',
      },
    ],
  },
  {
    slug: 'stage-03',
    title: 'Scanning & Enumeration',
    hours: '3-4',
    sortOrder: 3,
    md: 'stage-03-scanning-enumeration.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What does an open port prove by itself?',
        options: [
          'The target is compromised',
          'A critical vulnerability exists',
          'A service may be reachable',
          'The report is complete'
        ],
        correct: 2,
        explanation:
          'An open port is inventory evidence, not proof of vulnerability or compromise.',
      },
      {
        type: 'multiple_choice',
        question: 'What belongs in a professional service inventory row?',
        options: [
          'Only the CVE title from a blog',
          'Host, port, service guess, evidence, confidence, and safe next step',
          'Every packet captured during the day',
          'A severity label with no observations'
        ],
        correct: 1,
        explanation:
          'Inventory rows separate observation from unverified risk language.',
      },
      {
        type: 'multiple_choice',
        question: 'Why prefer a narrow authorized scan over a wide subnet sweep while learning?',
        options: [
          'Narrow scans create clearer inventory and less accidental out-of-scope contact',
          'Wide sweeps never need notes',
          'Narrow scans disable the need for scope',
          'Wide sweeps always prove exploitability'
        ],
        correct: 0,
        explanation:
          'Beginners learn faster and safer by mapping one labeled host carefully.',
      },
    ],
  },
  {
    slug: 'stage-04',
    title: 'Web Application Testing Basics',
    hours: '4-5',
    sortOrder: 4,
    md: 'stage-04-web-application-testing.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why record expected behavior before a web security test?',
        options: [
          'It gives the test a baseline',
          'It replaces authorization',
          'It proves exploitation',
          'It hides uncertainty'
        ],
        correct: 0,
        explanation:
          'Without a baseline, mutated responses are hard to interpret honestly.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a safe web risk question look like?',
        options: [
          'Is the whole internet hackable?',
          'Which public site should I probe next?',
          'A narrow question tied to method, path, and one controllable input',
          'Can I skip notes if the payload works?'
        ],
        correct: 2,
        explanation:
          'Good web tests answer one scoped question instead of spraying payloads.',
      },
      {
        type: 'multiple_choice',
        question: 'Which account type belongs in beginner web lab practice?',
        options: [
          'A stranger’s production account',
          'Synthetic lab accounts on an authorized training app',
          'Your bank login for realism',
          'An untracked shared admin password from a forum'
        ],
        correct: 1,
        explanation:
          'Practice stays on authorized training apps with synthetic credentials.',
      },
    ],
  },
  {
    slug: 'stage-05',
    title: 'Controlled Exploitation Validation',
    hours: '4-5',
    sortOrder: 5,
    md: 'stage-05-controlled-exploitation-validation.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'When should controlled exploitation happen in a professional assessment?',
        options: [
          'Before permission is written',
          'After scope and evidence support a finding',
          'Whenever a tool exists',
          'After the report is finished'
        ],
        correct: 1,
        explanation:
          'Validation proves an evidenced hypothesis; it is not the first step.',
      },
      {
        type: 'multiple_choice',
        question: 'What is a good proof goal for lab validation?',
        options: [
          'Maximum damage and persistence',
          'Collecting unrelated personal data',
          'Leaving access open for later convenience',
          'The minimum evidence that shows real risk to a defender'
        ],
        correct: 3,
        explanation:
          'Least-impact proof is enough; extra harm is not professionalism.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a controlled proof card include besides the finding name?',
        options: [
          'Precondition, proof goal, impact limit, stop condition, and cleanup',
          'Only a screenshot of a tool banner',
          'A promise to skip remediation',
          'A public internet target list'
        ],
        correct: 0,
        explanation:
          'Those fields keep validation reviewable and bounded.',
      },
      {
        type: 'multiple_choice',
        question: 'If unexpected production-like data appears during validation, what is the safest move?',
        options: [
          'Copy everything for completeness',
          'Pivot to more hosts immediately',
          'Stop, document, and reassess the boundary',
          'Ignore it and finish the exploit chain'
        ],
        correct: 2,
        explanation:
          'Stop rules exist for boundary and safety surprises.',
      },
    ],
  },
  {
    slug: 'stage-06',
    title: 'Post-Exploitation Evidence Handling',
    hours: '3-4',
    sortOrder: 6,
    md: 'stage-06-post-exploitation-evidence.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the safest default after proof of access?',
        options: [
          'Stop, document, clean up, and report',
          'Maintain access',
          'Collect unrelated data',
          'Hide the finding'
        ],
        correct: 0,
        explanation:
          'After proof, expand less and package evidence for defenders.',
      },
      {
        type: 'multiple_choice',
        question: 'Why refuse persistence in most teaching-lab engagements?',
        options: [
          'Persistence always increases report quality',
          'Persistence creates unmanaged access beyond the proof need',
          'Persistence replaces remediation',
          'Persistence is required for every CVE'
        ],
        correct: 1,
        explanation:
          'Leftover access paths are risk, not trophies.',
      },
      {
        type: 'multiple_choice',
        question: 'What does an evidence index help a reviewer do?',
        options: [
          'Delete timestamps automatically',
          'Authorize new targets',
          'Map each claim to a durable artifact without guessing',
          'Skip impact and remediation fields'
        ],
        correct: 2,
        explanation:
          'Indexes make the assessment story auditable.',
      },
    ],
  },
  {
    slug: 'stage-07',
    title: 'Wireless Security Assessment',
    hours: '3-4',
    sortOrder: 7,
    md: 'stage-07-wireless-security-assessment.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why is a nearby wireless network not automatically a target?',
        options: [
          'It has a channel number',
          'It appears in a scan',
          'It may not be authorized',
          'It has a strong signal'
        ],
        correct: 2,
        explanation:
          'Signal strength and visibility are not consent.',
      },
      {
        type: 'multiple_choice',
        question: 'What must a wireless test card include before capture?',
        options: [
          'Authorized SSID, approved adapter, purpose, privacy rule, and cleanup',
          'Only the word monitor-mode',
          'Every SSID in the building',
          'A plan to deauth strangers for practice'
        ],
        correct: 0,
        explanation:
          'Radio work needs purpose-bound scope and privacy limits first.',
      },
      {
        type: 'multiple_choice',
        question: 'If you do not own a practice AP, what is the correct course mode?',
        options: [
          'Capture whatever is loudest near your laptop',
          'Planning-only with an explicit privacy boundary — no unauthorized capture',
          'Crack the cafe Wi-Fi for realism',
          'Skip the privacy rule because you are learning'
        ],
        correct: 1,
        explanation:
          'Planning is valid practice; unauthorized airspace capture is not.',
      },
    ],
  },
  {
    slug: 'stage-08',
    title: 'Social Engineering Defense Testing',
    hours: '2-3',
    sortOrder: 8,
    md: 'stage-08-social-engineering-defense.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What belongs in an approved social engineering simulation plan?',
        options: [
          'Audience, boundaries, approval, and reporting',
          'Private pressure',
          'Credential collection',
          'Unapproved impersonation'
        ],
        correct: 0,
        explanation:
          'People-safe exercises need approval, limits, and a training-focused report path.',
      },
      {
        type: 'multiple_choice',
        question: 'Why forbid credential collection in a defense-awareness simulation?',
        options: [
          'Credentials make reports prettier',
          'Password capture is required for all metrics',
          'Real passwords turn training into an incident',
          'Users learn better when secrets are stolen'
        ],
        correct: 2,
        explanation:
          'Awareness tests should measure reporting and process, not harvest secrets.',
      },
      {
        type: 'multiple_choice',
        question: 'What reporting style best protects participants?',
        options: [
          'Aggregate results with remediation and training updates',
          'Public named fail lists',
          'Silent collection with no after-action learning',
          'Crisis pretexts with no approval contact'
        ],
        correct: 0,
        explanation:
          'Aggregate, actionable reporting improves defenses without humiliation.',
      },
    ],
  },
  {
    slug: 'stage-09',
    title: 'Cryptography Weakness Review',
    hours: '3-4',
    sortOrder: 9,
    md: 'stage-09-cryptography-weakness-review.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the safest beginner position on cryptography?',
        options: [
          'Invent a custom cipher',
          'Use established primitives and document the purpose',
          'Log secrets for proof',
          'Reuse salts everywhere'
        ],
        correct: 1,
        explanation:
          'Purpose-first review with standard primitives beats homemade crypto.',
      },
      {
        type: 'multiple_choice',
        question: 'What is a safer review method for a password-hashing weakness?',
        options: [
          'Dump the live user database to personal cloud storage',
          'Inspect configuration/metadata without collecting user passwords',
          'Replace hashing with Base64',
          'Publish private keys in the finding title'
        ],
        correct: 1,
        explanation:
          'Crypto review should evidence weak decisions without spreading secrets.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is “HTTPS is present” incomplete as a crypto conclusion?',
        options: [
          'HTTPS always means custom ciphers are required',
          'HTTPS replaces password hashing',
          'Protocol version, ciphers, certificates, and key handling still need review',
          'HTTPS proves the app has no access-control issues'
        ],
        correct: 2,
        explanation:
          'Transport security is necessary but not a full cryptography review.',
      },
    ],
  },
  {
    slug: 'stage-10',
    title: 'Cloud Security Assessment',
    hours: '3-4',
    sortOrder: 10,
    md: 'stage-10-cloud-security-assessment.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes a cloud assessment safe and useful?',
        options: [
          'Scoped configuration evidence and ownership',
          'Testing every account found',
          'Ignoring identity boundaries',
          'Reporting without remediation'
        ],
        correct: 0,
        explanation:
          'Cloud work is mostly scoped config evidence tied to an owner.',
      },
      {
        type: 'multiple_choice',
        question: 'In the shared responsibility model, who usually owns IAM role choices?',
        options: [
          'Only the physical data-center vendor',
          'Whoever finds a public bucket on the internet',
          'The customer / lab account owner',
          'No one, because cloud is automatically secure'
        ],
        correct: 2,
        explanation:
          'Providers supply IAM features; customers choose who gets which permissions.',
      },
      {
        type: 'multiple_choice',
        question: 'What should you do if unexpected foreign data appears in a cloud check?',
        options: [
          'Mirror the data for a more complete lab report',
          'Stop, avoid downloading it, and fix ownership assumptions',
          'Open more accounts to compare',
          'Post the objects publicly for peer review'
        ],
        correct: 1,
        explanation:
          'Unexpected data is a boundary problem, not a collection opportunity.',
      },
    ],
  },
  {
    slug: 'stage-11',
    title: 'Mobile Security Review',
    hours: '3-4',
    sortOrder: 11,
    md: 'stage-11-mobile-security-review.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What data should a beginner mobile security lab use?',
        options: [
          'Personal production data',
          'A stranger’s account',
          'Synthetic approved test data',
          'Untracked secrets'
        ],
        correct: 2,
        explanation:
          'Synthetic data keeps mobile review from becoming a privacy incident.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a mobile review card name before inspecting app behavior?',
        options: [
          'Package, test device, data rule, permission question, and finding note',
          'Only the word Frida',
          'A production SSO account',
          'Every app installed on a daily-driver phone'
        ],
        correct: 0,
        explanation:
          'Controlled review starts with device, data, and one clear question.',
      },
      {
        type: 'multiple_choice',
        question: 'Why prefer a lab emulator or dedicated test device?',
        options: [
          'Emulators remove the need for authorization',
          'Daily-driver phones produce better secret dumps',
          'It reduces the chance of touching real personal identity data',
          'Emulators make all permissions malicious by default'
        ],
        correct: 2,
        explanation:
          'Isolated test devices keep practice away from real personal data.',
      },
    ],
  },
  {
    slug: 'stage-12',
    title: 'Reporting & Remediation',
    hours: '2-3',
    sortOrder: 12,
    md: 'stage-12-reporting-remediation.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes a finding actionable?',
        options: [
          'Evidence, impact, remediation, and verification',
          'A dramatic title',
          'Tool output only',
          'No owner'
        ],
        correct: 0,
        explanation:
          'Defenders need proof, meaning, a fix, and a way to confirm the fix.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the job of an executive summary?',
        options: [
          'List every packet captured',
          'Explain scope, overall risk, key finding, top fix, and verification in plain language',
          'Replace technical evidence entirely',
          'Hide uncertainty behind severity labels'
        ],
        correct: 1,
        explanation:
          'Executives need a clear risk story; engineers still need the detail underneath.',
      },
      {
        type: 'multiple_choice',
        question: 'Which remediation quality check matters most?',
        options: [
          'The fix is specific, owned, and paired with a verification step',
          'The advice says only “be more secure”',
          'The finding has the longest tool log',
          'Severity is always labeled critical'
        ],
        correct: 0,
        explanation:
          'Actionable remediation is concrete, owned, and retestable.',
      },
    ],
  },
  {
    slug: 'stage-13',
    title: 'Metasploit Framework in the Lab',
    hours: '3-4',
    sortOrder: 13,
    md: 'stage-13-metasploit-lab.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Who owns the risk when using an exploitation framework in a lab?',
        options: [
          'The tool alone',
          'The tester following scope and safety rules',
          'The target',
          'Nobody if it is automated'
        ],
        correct: 1,
        explanation:
          'Frameworks amplify judgment; they do not replace authorization or stop rules.',
      },
      {
        type: 'multiple_choice',
        question: 'What should come before launching a module?',
        options: [
          'A bridged adapter facing the public internet',
          'Leaving handlers running overnight by default',
          'A written framework-use plan with target, expected signal, safety option, and stop condition',
          'Skipping inventory because modules are ranked'
        ],
        correct: 2,
        explanation:
          'Plans keep automation tied to evidenced, authorized validation goals.',
      },
      {
        type: 'multiple_choice',
        question: 'Why can choosing not to run an exploit module still be professional work?',
        options: [
          'Because reports should never include technical detail',
          'If evidence or safety conditions do not justify the impact, restraint is correct',
          'Because frameworks are never useful',
          'Because stop conditions are optional'
        ],
        correct: 1,
        explanation:
          'Judgment includes deciding when check-mode evidence is enough.',
      },
    ],
  },
  {
    slug: 'stage-14',
    title: 'Incident Response Handoff',
    hours: '3-4',
    sortOrder: 14,
    md: 'stage-14-incident-response-handoff.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should an urgent security handoff include?',
        options: [
          'Trigger, contact, preserved evidence, and communication path',
          'Only a tool name',
          'A public post',
          'No timestamps'
        ],
        correct: 0,
        explanation:
          'Responders need a clear trigger, owner path, and preservable facts.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a tester do first when a test becomes an incident signal?',
        options: [
          'Pivot harder to confirm impact',
          'Stop expanding access and preserve what already exists',
          'Delete messy logs',
          'Announce theories on a public channel'
        ],
        correct: 1,
        explanation:
          'Preservation and containment communication beat continued exploitation.',
      },
      {
        type: 'multiple_choice',
        question: 'Why include a lesson-learned field on the handoff card?',
        options: [
          'So the report can skip remediation',
          'So ownership becomes optional',
          'So the next engagement changes scope or monitoring based on what went wrong',
          'So timestamps are unnecessary'
        ],
        correct: 2,
        explanation:
          'Lessons convert chaos into process improvement.',
      },
    ],
  },
  {
    slug: 'stage-15',
    title: 'Defense & Hardening',
    hours: '3-4',
    sortOrder: 15,
    md: 'stage-15-defense-hardening.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What proves hardening reduced risk?',
        options: [
          'A screenshot alone',
          'A louder severity label',
          'A validation step tied to the control',
          'Deleting the report'
        ],
        correct: 2,
        explanation:
          'Closure requires retesting the control, not hoping the change worked.',
      },
      {
        type: 'multiple_choice',
        question: 'What belongs in a hardening row besides the control name?',
        options: [
          'Asset, validation step, owner, and residual risk decision',
          'Only the word patched',
          'A claim that residual risk is always none',
          'An unowned CIS dump with no tie to the finding'
        ],
        correct: 0,
        explanation:
          'Hardening is complete when ownership and residual risk are explicit.',
      },
      {
        type: 'multiple_choice',
        question: 'Why pair detection with prevention after a fix?',
        options: [
          'Detection replaces the need to fix anything',
          'Monitoring helps catch control failure or repeat probing',
          'Logs make authorization unnecessary',
          'Alerts remove residual risk automatically'
        ],
        correct: 1,
        explanation:
          'Reduce first, then monitor; detection is a partner to controls.',
      },
    ],
  },
  {
    slug: 'stage-16',
    title: 'Capstone: Authorized Assessment',
    hours: '4-6',
    sortOrder: 16,
    md: 'stage-16-capstone-authorized-assessment.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a capstone assessment prove?',
        options: [
          'A complete authorized workflow and defensible evidence',
          'Only that a tool ran',
          'That scope can be skipped',
          'That remediation is optional'
        ],
        correct: 0,
        explanation:
          'Capstone success is a reviewable path from permission to fix verification.',
      },
      {
        type: 'multiple_choice',
        question: 'Which deliverable set best matches this course’s capstone bar?',
        options: [
          'A single screenshot of msfconsole',
          'Unauthenticated scans of random internet hosts',
          'Summary, scope, evidence index, finding, hardening, handoff, and readout',
          'Specialty wireless captures with no authorization note'
        ],
        correct: 2,
        explanation:
          'The bundle must tell the whole authorized story, not show one tool moment.',
      },
      {
        type: 'multiple_choice',
        question: 'How should specialty stages (wireless, cloud, mobile) enter the capstone?',
        options: [
          'Only when the lab and authorization honestly support them',
          'Always, even if you must fake screenshots',
          'Never, because reporting is enough',
          'By substituting public third-party targets'
        ],
        correct: 0,
        explanation:
          'Honesty beats portfolio inflation; optional intensifiers need real authorization.',
      },
      {
        type: 'multiple_choice',
        question: 'What hours promise should the capstone respect for this course card?',
        options: [
          'An open-ended multi-hundred-hour second curriculum by default',
          'A focused integration block inside the overall 40–50 hour path',
          'Zero documentation time because tools are enough',
          'Unlimited public-internet practice hours'
        ],
        correct: 1,
        explanation:
          'Keep the live card honest: deepen the authorized loop without inventing endless scope.',
      },
    ],
  },
]

const course = {
  slug: 'ethical-hacking',
  title: 'Ethical Hacking & Penetration Testing',
  description:
    'Learn authorized security assessment workflow: scope, reconnaissance, validation, evidence handling, reporting, remediation, and defender handoff. Practice runs in your own lab (local terminal, VM, or authorized lab hosts). Keep scope legal and documented. Lessons are read in ASV Learn; hosted shell sandboxes are not part of this LearnHouse path yet.',
  difficulty: 'Intermediate',
  hours: '40-50',
  topics: [
    'Authorization',
    'Reconnaissance',
    'Web Security',
    'Cloud Security',
    'Reporting',
  ],
  certBadges: ['CEH', 'OSCP Prep'],
  runtime: 'shell',
  source: {
    fixture: 'content/courses/technodex-fixtures/ethical-hacking.ts',
    live: 'https://technodex.io/courses/ethical-hacking',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/ethical-hacking.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')

const quizCounts = course.stages.map((s) => s.quiz.length)
const words = course.stages.map((s) => ({
  slug: s.slug,
  words: s.content.trim().split(/\s+/).filter(Boolean).length,
  quiz: s.quiz.length,
}))
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
console.log(`hours=${course.hours}`)
console.log(
  words
    .map((w) => `${w.slug}: ${w.words} words, ${w.quiz} quiz`)
    .join('\n'),
)
console.log(
  `quiz range ${Math.min(...quizCounts)}-${Math.max(...quizCounts)}; total quiz items ${quizCounts.reduce((a, b) => a + b, 0)}`,
)
