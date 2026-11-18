#!/usr/bin/env node
/**
 * Assemble content/courses/soc-blue-team.json from stage-*.md + quizzes.
 * Usage: node scripts/assemble-soc-blue-team-json.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/soc-blue-team')
const OUT = resolve(ROOT, 'content/courses/soc-blue-team.json')

const stages = [
  {
    slug: "stage-01",
    title: "SOC Fundamentals and the Analyst Role",
    hours: "2-3",
    sortOrder: 1,
    md: "stage-01-soc-fundamentals.md",
    quiz: [
        {
          "type": "multiple_choice",
          "question": "What should a Tier 1 analyst do before escalating an alert?",
          "options": [
            "Collect context and evidence",
            "Assume compromise",
            "Delete the alert",
            "Restart the user's computer"
          ],
          "correct": 0,
          "explanation": "Escalation should be backed by user, source, evidence, severity, and missing context."
        },
        {
          "type": "multiple_choice",
          "question": "What belongs in a triage note's missing-context field?",
          "options": [
            "Facts you observed in the alert",
            "What you still cannot claim or have not checked yet",
            "A dramatic breach announcement",
            "The ATT&CK technique ID only"
          ],
          "correct": 1,
          "explanation": "Missing context keeps assumptions visible so the next analyst knows what is still unknown."
        },
        {
          "type": "multiple_choice",
          "question": "When is \"monitor\" a better next action than \"escalate\"?",
          "options": [
            "When evidence is suspicious but not yet strong enough for handoff",
            "When you have already confirmed active account takeover",
            "When you want to hide uncertainty",
            "When severity is always high by default"
          ],
          "correct": 0,
          "explanation": "Monitor fits when follow-up conditions could change the decision without claiming a full incident yet."
        },
        {
          "type": "multiple_choice",
          "question": "How do you practice this ASV Learn stage?",
          "options": [
            "Write local lab notes on your own terminal, VM, or authorized lab host",
            "Wait for the lesson page to score a hosted shell for you",
            "Probe production systems without permission",
            "Escalate every alert with no missing-context field"
          ],
          "correct": 0,
          "explanation": "Lessons are read in ASV Learn; practice is authorized local lab work only."
        }
      ],
  },
  {
    slug: "stage-02",
    title: "SIEM Fundamentals and Log Analysis",
    hours: "3-4",
    sortOrder: 2,
    md: "stage-02-siem-log-analysis.md",
    quiz: [
        {
          "type": "multiple_choice",
          "question": "Why should a SIEM query include a false-positive check?",
          "options": [
            "To avoid treating normal behavior as an incident",
            "To hide weak evidence",
            "To reduce log retention",
            "To skip investigation"
          ],
          "correct": 0,
          "explanation": "False-positive checks help analysts avoid unnecessary escalation while preserving evidence."
        },
        {
          "type": "multiple_choice",
          "question": "What should you define before writing SIEM query syntax?",
          "options": [
            "A search plan: source, goal, fields, pattern, FP check, escalation condition",
            "Only the vendor name of the SIEM",
            "A final breach report",
            "A malware family label"
          ],
          "correct": 0,
          "explanation": "Question-before-query keeps searches focused and reviewable."
        },
        {
          "type": "multiple_choice",
          "question": "What does a high result count prove by itself?",
          "options": [
            "Nothing conclusive about compromise; it may only show a common pattern",
            "That every user is compromised",
            "That log retention is infinite",
            "That escalation is always required"
          ],
          "correct": 0,
          "explanation": "Result volume is not severity. Analysts still need baseline and false-positive reasoning."
        },
        {
          "type": "multiple_choice",
          "question": "Where should SIEM practice for this course happen?",
          "options": [
            "Authorized log samples or exports in your local lab notes",
            "Any production SIEM you can guess a password for",
            "An in-lesson hosted SIEM console with auto-grading",
            "Public internet packet captures from strangers"
          ],
          "correct": 0,
          "explanation": "This path uses local SIEM-style reasoning on authorized data, not a hosted console inside the lesson."
        }
      ],
  },
  {
    slug: "stage-03",
    title: "Threat Intelligence and MITRE ATT&CK",
    hours: "3-4",
    sortOrder: 3,
    md: "stage-03-threat-intelligence-mitre.md",
    quiz: [
        {
          "type": "multiple_choice",
          "question": "What does ATT&CK help analysts standardize?",
          "options": [
            "Adversary behavior and technique names",
            "Employee schedules",
            "Ticket colors",
            "Cloud billing"
          ],
          "correct": 0,
          "explanation": "ATT&CK gives teams common names for attacker tactics and techniques."
        },
        {
          "type": "multiple_choice",
          "question": "What should come before pasting an ATT&CK technique onto an alert?",
          "options": [
            "Local evidence, intel source, confidence, and a concrete SOC action",
            "A public blog title alone",
            "Blocking every IOC in the report",
            "Deleting the original logs"
          ],
          "correct": 0,
          "explanation": "Intel labels are useful only when tied to local evidence and a detection or hunt action."
        },
        {
          "type": "multiple_choice",
          "question": "Why record confidence on a threat-intel card?",
          "options": [
            "To keep weak intel from becoming certainty in SOC decisions",
            "To make the ticket look finished",
            "To replace local logs",
            "To skip false-positive checks"
          ],
          "correct": 0,
          "explanation": "Confidence prevents overstatement when the match is partial or the source is limited."
        },
        {
          "type": "multiple_choice",
          "question": "What is the difference between tactic and technique in ATT&CK?",
          "options": [
            "Tactic is the attacker goal; technique is how that goal might be achieved",
            "They are identical labels",
            "Technique is always proof of compromise",
            "Tactic replaces the need for local evidence"
          ],
          "correct": 0,
          "explanation": "Tactics name goals; techniques name methods. Neither replaces local logs."
        }
      ],
  },
  {
    slug: "stage-04",
    title: "Incident Response from Detection to Containment",
    hours: "3-4",
    sortOrder: 4,
    md: "stage-04-incident-response.md",
    quiz: [
        {
          "type": "multiple_choice",
          "question": "Why preserve evidence before recovery?",
          "options": [
            "So the team can understand scope and cause",
            "So the alert looks longer",
            "So containment is delayed forever",
            "So logs can be deleted"
          ],
          "correct": 0,
          "explanation": "Evidence supports scope, root cause, and better future detection."
        },
        {
          "type": "multiple_choice",
          "question": "In a sound response order, what comes before reimaging a host?",
          "options": [
            "Containment and evidence preservation",
            "Deleting authentication logs",
            "Closing the ticket as noise",
            "Public disclosure of every IOC"
          ],
          "correct": 0,
          "explanation": "Containment limits harm; evidence capture protects facts before recovery changes the system."
        },
        {
          "type": "multiple_choice",
          "question": "What does naming a communication owner protect during an incident?",
          "options": [
            "Clear handoffs and updates instead of rumor or silence",
            "Faster malware detonation on a laptop",
            "Skipping severity assessment",
            "Automatic proof of attribution"
          ],
          "correct": 0,
          "explanation": "Ownership keeps coordination accountable while technical work continues."
        },
        {
          "type": "multiple_choice",
          "question": "For this course, where may you practice containment actions like isolate or reimage?",
          "options": [
            "Only systems you are authorized to touch—usually a lab VM",
            "Any coworker laptop that looks suspicious",
            "Production hosts without a ticket because practice is urgent",
            "Public cloud instances you discover by scanning"
          ],
          "correct": 0,
          "explanation": "Containment practice stays inside authorization; lab VMs are the default for this path."
        }
      ],
  },
  {
    slug: "stage-05",
    title: "Digital Forensics and Malware Analysis",
    hours: "3-4",
    sortOrder: 5,
    md: "stage-05-digital-forensics.md",
    quiz: [
        {
          "type": "multiple_choice",
          "question": "What does a hash value help prove?",
          "options": [
            "The evidence has not changed",
            "The file is always malicious",
            "The analyst owns the system",
            "The incident is closed"
          ],
          "correct": 0,
          "explanation": "A recorded hash helps verify evidence integrity during handling and analysis."
        },
        {
          "type": "multiple_choice",
          "question": "What should you do before analyzing a suspicious sample?",
          "options": [
            "Record ID, acquisition, custody, hash, question, and a safe handling rule",
            "Run it on your daily workstation",
            "Rename it to look trusted",
            "Delete the original so nobody else can see it"
          ],
          "correct": 0,
          "explanation": "Evidence handling comes before analysis so conclusions remain trustworthy and safe."
        },
        {
          "type": "multiple_choice",
          "question": "Which handling rule fits this course?",
          "options": [
            "Analyze a copy only; do not execute unknown samples on a daily workstation",
            "Open every attachment from the internet to learn faster",
            "Share live malware in chat for convenience",
            "Skip hashes if the filename looks serious"
          ],
          "correct": 0,
          "explanation": "Safe handling protects people and preserves the original evidence."
        },
        {
          "type": "multiple_choice",
          "question": "What is the main practice artifact for the forensics stage?",
          "options": [
            "A local forensic handling note with ID, custody, hash, question, and handling rule",
            "Detonating malware on your daily workstation for a score",
            "An in-lesson auto-graded forensics workspace",
            "A filename that sounds like a malware family"
          ],
          "correct": 0,
          "explanation": "Success is documentation discipline—not unsafe detonation or a hosted grader."
        }
      ],
  },
  {
    slug: "stage-06",
    title: "Threat Hunting and Advanced Detection",
    hours: "3-4",
    sortOrder: 6,
    md: "stage-06-threat-hunting.md",
    quiz: [
        {
          "type": "multiple_choice",
          "question": "What makes threat hunting different from alert triage?",
          "options": [
            "It proactively searches for behavior that may not have alerted",
            "It ignores evidence",
            "It only reads tickets",
            "It avoids hypotheses"
          ],
          "correct": 0,
          "explanation": "Threat hunting proactively searches for suspicious behavior using a testable hypothesis."
        },
        {
          "type": "multiple_choice",
          "question": "What should a hunt plan include before searching logs?",
          "options": [
            "A testable hypothesis, approved source, pattern, anomaly signal, and decision path",
            "Only a feeling that something is wrong",
            "A public tweet",
            "Unlimited access to every system"
          ],
          "correct": 0,
          "explanation": "Hypothesis-before-hunting keeps the work repeatable and honest."
        },
        {
          "type": "multiple_choice",
          "question": "Which outcome is still valuable if no attacker activity is found?",
          "options": [
            "A documented rule-out and/or a detection update with false-positive notes",
            "Deleting the hypothesis so nobody sees it",
            "Claiming the environment is permanently safe",
            "Escalating with no evidence"
          ],
          "correct": 0,
          "explanation": "Hunts can improve coverage or honestly rule out a pattern for the searched window."
        },
        {
          "type": "multiple_choice",
          "question": "Why include a detection update after a useful hunt?",
          "options": [
            "So learning becomes durable coverage instead of a one-time search",
            "So the hunt can avoid authorization",
            "So analysts never need logs again",
            "So rarity alone becomes proof of malice"
          ],
          "correct": 0,
          "explanation": "Detection engineering turns hunt lessons into repeatable alerts or queries."
        }
      ],
  }
]

const course = {
  slug: 'soc-blue-team',
  title: 'SOC & Blue Team',
  description:
    'Practice defensive security operations: triage alerts, read SIEM evidence, map threat intelligence, operate incidents, preserve evidence, and hunt for suspicious behavior. Practice runs in your own lab (local terminal, VM, or authorized lab hosts) with local lab notes and SIEM-style reasoning exercises. Keep scope legal and documented. Lessons are read in ASV Learn; practice is local lab only.',
  difficulty: 'Intermediate',
  hours: '18-24',
  topics: ['SOC Operations', 'Threat Hunting', 'SIEM', 'Incident Response'],
  certBadges: ['SOC Analyst', 'Incident Handler'],
  runtime: 'shell',
  source: {
    markdown: 'content/courses/soc-blue-team/',
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
  console.log(`${s.slug}: ${words} words, ${s.quiz.length} quiz items`)
}
