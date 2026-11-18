#!/usr/bin/env node
/**
 * ASV Learn intro VO v4.1 — distinctive storytelling, truthful to current lessons.
 *
 * Spoken beats use standard spelling (API, AI, MITRE ATT&CK). Prefer ElevenLabs
 * pronunciation dictionaries for awkward terms — do not put TTS phonetics in scenes.
 *
 * Usage:
 *   node scripts/write-intro-vo-v4.mjs --all
 *   node scripts/write-intro-vo-v4.mjs --slug soc-blue-team
 *   node scripts/write-intro-vo-v4.mjs --slug=react
 *   node scripts/write-intro-vo-v4.mjs --slug python-zero --mirror-legacy-python-zero
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const COURSES = resolve(ROOT, 'brand/asv-labs-learn/courses')
const LEGACY_PZ = resolve(ROOT, 'brand/asv-labs-learn/intro-video')

const HEADER = `ASV Learn intro VO v4.1
ElevenLabs / sketch pipeline. One file per beat: beat-01 … beat-11
beat-0N.txt files contain spoken lines only (no production headers).

`

/** @typedef {{ title: string, catalogTitle: string, beats: string[][], scenes: object[] }} Pack */

/** @type {Record<string, Pack>} */
const PACKS = {
  'python-zero': {
    title: 'PYTHON ZERO TO USEFUL — INTRO v4.1 VO',
    catalogTitle: 'Python Zero to Useful',
    beats: [
      [
        'This is Python Zero to Useful, from ASV Learn.',
        'A first course for people who have never written code.',
      ],
      [
        'Maybe you are not even sure how to spell Python.',
        'That is fine. That is exactly who this is for.',
      ],
      [
        'Python began in the early nineteen-nineties.',
        'Guido van Rossum wanted a language people could actually read.',
        'He named it after Monty Python — not the snake.',
      ],
      [
        'Today, Python is simply a way to write instructions a computer will follow.',
        'You write the steps. The computer runs them. That is the whole trick.',
      ],
      [
        'Your first win can be tiny and funny.',
        'A program that asks your name, then prints a ridiculous congratulations message just for you.',
        'When that appears on your screen, something clicks: the machine did what you said.',
      ],
      [
        'From there, the same idea powers real work.',
        'Clean a messy spreadsheet. Build a report. Automate a boring weekly task.',
        'Small scripts. Visible results.',
      ],
      [
        'You will learn printing and variables, decisions and loops, lists and dictionaries.',
        'Then functions, files, and what to do when something breaks — step by step on your own computer.',
      ],
      [
        'Module Zero gets Python onto your machine.',
        'You open a terminal, type one short command, and find out if it is already there.',
      ],
      [
        'Mac, Windows, or Linux — you only follow the path for your computer.',
      ],
      [
        'By the end, you will have built a progress tracker and reporting helper.',
        'Something you can open, run, and show someone. That is a real first tool — not just a finished tutorial.',
      ],
      [
        'In industry, Python shows up in websites, data work, automation, and a lot of modern AI tools.',
        'Start with Module Zero. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'PYTHON ZERO', line2: 'to useful', brand: 'ASV LEARN', tag: 'beginner · first code' },
      { type: 'audience', question: 'not sure how to spell Python?', answer: 'you are in the right place.' },
      { type: 'timeline', heading: 'a readable language', points: [{ top: '1990s', bottom: 'Guido' }, { top: 'named for', bottom: 'Monty Python' }, { top: 'goal', bottom: 'clear English' }] },
      { type: 'definition', heading: 'what Python is', items: ['write instructions', 'computer follows them', 'that is the trick'] },
      { type: 'terminal', heading: 'first win', sub: 'tiny and funny', prompt: 'python hello.py', result: 'Congrats, Alex — you made the machine obey.' },
      { type: 'chips', heading: 'same idea, real work', chips: ['spreadsheet cleanup', 'weekly report', 'automation'] },
      { type: 'ladder', heading: 'what you will learn', steps: ['print & variables', 'decisions & loops', 'lists & dicts', 'functions & files', 'fixing breaks'] },
      { type: 'terminal', heading: 'Module Zero', sub: 'is Python here?', prompt: 'python3 --version', result: 'Python 3.x.x' },
      { type: 'cards', heading: 'your computer', cards: ['Mac', 'Windows', 'Linux'] },
      { type: 'panel', heading: 'capstone', subheading: 'show someone', windowTitle: 'progress tracker', lines: ['log a session', 'print a report', 'yours to keep'] },
      { type: 'outro', headline: 'start with Module Zero', sub: 'take your time', industry: 'websites · data · automation · AI tools' },
    ],
  },

  'ai-fundamentals': {
    title: 'AI FUNDAMENTALS FOR BUILDERS — INTRO v4.1 VO',
    catalogTitle: 'AI Fundamentals for Builders',
    beats: [
      [
        'This is AI Fundamentals for Builders, from ASV Learn.',
      ],
      [
        'Picture this: you ask a model for tomorrow’s meeting notes.',
        'It answers with total confidence — and invents three people who were never in the room.',
      ],
      [
        'That is the interesting problem.',
        'Useful AI is not charm. It is getting a system to do a job you can check.',
      ],
      [
        'In this course you learn to treat a model like a component.',
        'You practice clear instructions, catch weird answers, and map the pieces that make an AI feature real.',
      ],
      [
        'You will practice prompting as instruction design.',
        'Then you shape structured outputs — so code could trust what comes back.',
      ],
      [
        'Later, you practice grounding: choose sources, plan retrieval, and refuse a guess when evidence is missing.',
        'Lessons use simulated model outputs on your machine, so the skill is judgment — not a live API bill.',
      ],
      [
        'You move from orientation, to models and system parts, to prompting and debugging,',
        'then APIs, structured outputs, retrieval, and grounded answer patterns.',
      ],
      [
        'Every exercise ends in a local artifact you can re-run: scripts, plans, and checklists in your own folder.',
      ],
      [
        'If you already live in chat apps, this course is the bridge into building habits.',
        'If you are new, we start from zero and keep every step visible.',
      ],
      [
        'Your payoff is a grounded-helper plan and practice pack — ask, retrieve from sources you name, answer only with evidence — built as local exercises you can show.',
      ],
      [
        'In industry, that habit shows up in support tools, internal search, and product features that must stay honest.',
        'Start with AI, ML, and LLM orientation. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'AI FUNDAMENTALS', line2: 'for builders', brand: 'ASV LEARN', tag: 'beginner → builder' },
      { type: 'audience', question: 'confident… and wrong?', answer: 'that is the problem we fix.' },
      { type: 'definition', heading: 'useful AI', items: ['clear job', 'checkable output', 'not just charm'] },
      { type: 'pipeline', leftTitle: 'model', leftLines: ['instructions', 'weird answers'], rightTitle: 'you', rightLines: ['test', 'map the pieces'] },
      { type: 'chips', heading: 'builder moves', chips: ['instruction design', 'structured output', 'debug behavior'] },
      { type: 'pipeline', leftTitle: 'guessing', leftLines: ['no sources'], rightTitle: 'grounded', rightLines: ['named sources', 'simulated practice'] },
      { type: 'ladder', heading: 'the path', steps: ['orientation', 'system parts', 'prompting', 'APIs', 'retrieval', 'grounded patterns'] },
      { type: 'terminal', heading: 'local artifacts', sub: 're-run on your machine', prompt: 'python practice.py', result: 'plan + checklist' },
      { type: 'audience', question: 'chat user or total beginner?', answer: 'same bridge. visible steps.' },
      { type: 'panel', heading: 'capstone', subheading: 'grounded-helper plan', windowTitle: 'ask → retrieve → answer', lines: ['named sources', 'evidence only', 'local practice pack'] },
      { type: 'outro', headline: 'start with orientation', sub: 'take your time', industry: 'support · search · honest product features' },
    ],
  },

  'ai-foundations-engineering': {
    title: 'AI FOUNDATIONS ENGINEERING — INTRO v4.1 VO',
    catalogTitle: 'AI Foundations Engineering',
    beats: [
      [
        'This is AI Foundations Engineering, from ASV Learn.',
        'For builders who want models to behave after launch — not only in a demo.',
      ],
      [
        'Monday, your model looks brilliant.',
        'Friday, the data shifted, and the same pipeline starts quietly lying.',
      ],
      [
        'That drift story is the heart of this course.',
        'You learn the engineering loop that keeps an AI system honest: data, features, training, checks, deploy, watch.',
      ],
      [
        'You are not training a production model in these lessons.',
        'You are building the cards, pipelines, and monitoring plans a team could trust before anyone hits train at scale.',
      ],
      [
        'You will shape data and features, compare training choices,',
        'and write validation and deployment stories you can defend in a review.',
      ],
      [
        'When something goes wrong, you will know whether to blame the data, the features, the model, or the handoff.',
      ],
      [
        'The path runs from ML fundamentals, through pipelines and features,',
        'into training and validation, then deployment, monitoring, and scale.',
      ],
      [
        'Practice stays on your machine with notebooks, scripts, and notes you can re-run.',
      ],
      [
        'Take this when you already understand basic AI ideas and want production habits.',
        'Agent mission design lives in Applied Agentic AI — this course is the reliability spine.',
      ],
      [
        'Your proof is a small engineering packet: validation story, monitoring plan, and handoff notes a teammate could follow.',
      ],
      [
        'In industry, that is how recommendation, forecasting, and quality models survive contact with real users.',
        'Start with ML engineering fundamentals. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'AI FOUNDATIONS', line2: 'engineering', brand: 'ASV LEARN', tag: 'intermediate · production habits' },
      { type: 'audience', question: 'brilliant Monday…', answer: 'quietly wrong by Friday.' },
      { type: 'timeline', heading: 'drift happens', points: [{ top: 'demo', bottom: 'looks great' }, { top: 'data shifts', bottom: 'silent fail' }, { top: 'watch', bottom: 'catch it' }] },
      { type: 'pipeline', leftTitle: 'loop', leftLines: ['data', 'features', 'train'], rightTitle: 'trust', rightLines: ['validate', 'deploy', 'monitor'] },
      { type: 'definition', heading: 'what you build here', items: ['pipeline cards', 'validation story', 'monitoring plan'] },
      { type: 'chips', heading: 'you will practice', chips: ['pipelines', 'features', 'validation', 'monitoring'] },
      { type: 'ladder', heading: 'course path', steps: ['ML fundamentals', 'data pipelines', 'features', 'train & validate', 'deploy & watch', 'scale'] },
      { type: 'terminal', heading: 'local lab', sub: 're-runnable notes', prompt: 'python review_packet.py', result: 'metrics story ready' },
      { type: 'cards', heading: 'sister courses', cards: ['AI Fundamentals', 'this reliability spine', 'Applied Agentic AI'] },
      { type: 'panel', heading: 'capstone', subheading: 'teammate-ready packet', windowTitle: 'system card', lines: ['validation story', 'monitoring plan', 'handoff notes'] },
      { type: 'outro', headline: 'start with ML fundamentals', sub: 'take your time', industry: 'forecasting · quality · recommendations' },
    ],
  },

  'applied-agentic-ai': {
    title: 'APPLIED AGENTIC AI — INTRO v4.1 VO',
    catalogTitle: 'Applied Agentic AI',
    beats: [
      [
        'This is Applied Agentic AI, from ASV Learn.',
        'An advanced course for people ready to put an agent on a real mission — with brakes.',
      ],
      [
        'Give an agent one vague instruction — “handle the inbox” —',
        'and watch it get creative in all the wrong ways.',
      ],
      [
        'Your job in this course is to become mission control.',
        'You set the goal, choose the tools, draw the limits, and demand evidence when something fails.',
      ],
      [
        'Agents are not magic coworkers.',
        'They are systems that plan, call tools, and try again — until you teach them when to stop.',
      ],
      [
        'You will design architectures, write tool contracts, and practice production habits:',
        'logging, safe failure, and a trail you can audit — in local Python with dictionaries and small loops.',
      ],
      [
        'You are not required to call a live model for these lessons.',
        'When the simulated agent goes off-script, you interrupt, inspect, and recover — on purpose.',
      ],
      [
        'The path moves from LLM foundations and prompting mastery,',
        'through retrieval and agent architectures, into tools, then production agent systems.',
      ],
      [
        'You practice locally with scoped tools and synthetic tasks.',
        'Authorization and safety limits are stated once up front — then we build.',
      ],
      [
        'Come here after AI Fundamentals, and ideally after AI Foundations Engineering.',
        'This is the course where autonomy meets accountability.',
      ],
      [
        'Your payoff is a mission-control packet: clear goal, tool list, stop conditions, and a failure report you would show a lead.',
      ],
      [
        'In industry, that is how teams ship research agents, ops assistants, and workflow bots that do not go rogue.',
        'Start with LLM foundations. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'APPLIED AGENTIC', line2: 'AI', brand: 'ASV LEARN', tag: 'advanced · mission control' },
      { type: 'audience', question: '“handle the inbox”?', answer: 'creative… in the wrong ways.' },
      { type: 'definition', heading: 'you are mission control', items: ['set the goal', 'choose tools', 'demand evidence'] },
      { type: 'pipeline', leftTitle: 'agent', leftLines: ['plan', 'call tools', 'retry'], rightTitle: 'limits', rightLines: ['stop rules', 'audit trail'] },
      { type: 'chips', heading: 'local practice', chips: ['architectures', 'tool contracts', 'safe failure', 'logging'] },
      { type: 'terminal', heading: 'off-script', sub: 'interrupt · inspect · recover', prompt: 'agent.run(mission)', result: 'STOPPED — limit hit' },
      { type: 'ladder', heading: 'course path', steps: ['LLM foundations', 'prompt mastery', 'retrieval', 'architectures', 'tools', 'production'] },
      { type: 'cards', heading: 'local + scoped', cards: ['your machine', 'synthetic tasks', 'no live model required'] },
      { type: 'timeline', heading: 'when to take this', points: [{ top: 'after', bottom: 'Fundamentals' }, { top: 'ideally after', bottom: 'Engineering' }, { top: 'then', bottom: 'missions' }] },
      { type: 'panel', heading: 'capstone', subheading: 'mission-control packet', windowTitle: 'agent brief', lines: ['goal + tools', 'stop conditions', 'failure report'] },
      { type: 'outro', headline: 'start with LLM foundations', sub: 'take your time', industry: 'ops assistants · research agents · workflow bots' },
    ],
  },

  devops: {
    title: 'DEVOPS & INFRASTRUCTURE — INTRO v4.1 VO',
    catalogTitle: 'DevOps & Infrastructure',
    beats: [
      [
        'This is DevOps and Infrastructure, from ASV Learn.',
      ],
      [
        'Your app works on your laptop.',
        'Then someone else tries to run it — and three a.m. finds you reading a red dashboard.',
      ],
      [
        'This course follows one application on a journey:',
        'from a messy local project, into a container story, onto a cluster rollout, through a pipeline, under watch.',
      ],
      [
        'DevOps is the craft of making that journey boring — in the best way.',
        'Repeatable builds. Clear deploys. Alerts that mean something.',
      ],
      [
        'You will write release cards for Docker, Kubernetes, CI/CD, Terraform, and observability —',
        'naming gates, rollback, and owners before you claim “it is in production.”',
      ],
      [
        'Optional local installs come later if you want hands on a real daemon.',
        'The lessons themselves train judgment with artifacts you can show a reviewer.',
      ],
      [
        'We start with Linux and shell foundations, then Docker, Kubernetes,',
        'GitHub Actions pipelines, Terraform, and observability.',
      ],
      [
        'Practice is your machine and authorized lab only. ASV Learn does not host a cluster or pipeline sandbox inside the lesson.',
      ],
      [
        'Bring curiosity and patience. You do not need to be a kernel expert on day one.',
      ],
      [
        'Your proof is one honest artifact from each stage — a chain that shows how that app would build, ship, and page a human when it breaks.',
      ],
      [
        'In industry, that journey is how teams ship without heroic weekends.',
        'Start with Linux and shell foundations. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'DEVOPS', line2: '& infrastructure', brand: 'ASV LEARN', tag: 'intermediate · ship & survive' },
      { type: 'audience', question: 'works on my laptop…', answer: 'then three a.m. happens.' },
      { type: 'timeline', heading: 'one app’s journey', points: [{ top: 'laptop', bottom: 'messy project' }, { top: 'container', bottom: 'release card' }, { top: 'pipeline', bottom: 'under watch' }] },
      { type: 'definition', heading: 'make shipping boring', items: ['repeatable builds', 'clear deploys', 'alerts with meaning'] },
      { type: 'pipeline', leftTitle: 'package', leftLines: ['Docker card', 'Kubernetes card'], rightTitle: 'operate', rightLines: ['CI/CD card', 'Terraform', 'observe'] },
      { type: 'chips', heading: 'artifacts over theater', chips: ['shell', 'container', 'cluster', 'pipeline', 'observe'] },
      { type: 'ladder', heading: 'course path', steps: ['Linux & shell', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'monitoring'] },
      { type: 'terminal', heading: 'local lab', sub: 'cards you can show', prompt: './container_release_card.sh', result: 'gates named' },
      { type: 'audience', question: 'kernel expert on day one?', answer: 'no. curiosity is enough.' },
      { type: 'panel', heading: 'capstone chain', subheading: 'one artifact per stage', windowTitle: 'review packet', lines: ['build story', 'ship story', 'page → fix'] },
      { type: 'outro', headline: 'start with Linux & shell', sub: 'take your time', industry: 'ship without heroic weekends' },
    ],
  },

  'ethical-hacking': {
    title: 'ETHICAL HACKING & PENETRATION TESTING — INTRO v4.1 VO',
    catalogTitle: 'Ethical Hacking & Penetration Testing',
    beats: [
      [
        'This is Ethical Hacking and Penetration Testing, from ASV Learn.',
        'A sanctioned investigation course — authorization first, always.',
      ],
      [
        'You inherit a case file: a fake company, a written scope, and a question.',
        'Where could a real attacker walk in — and how do you prove it without causing harm?',
      ],
      [
        'That is the work.',
        'Recon, scanning, careful validation, evidence, and a report a defender can use.',
      ],
      [
        'You learn methodology, not chaos.',
        'Every step has a reason, a note, and a limit written in the rules of engagement.',
      ],
      [
        'You will plan reconnaissance, enumerate services, test web apps in lab targets,',
        'validate findings safely, and practice post-exploitation evidence handling.',
      ],
      [
        'Wireless and social-engineering defense testing appear as controlled chapters — still inside the case, still inside the scope.',
      ],
      [
        'The path runs from ethical fundamentals through recon, scanning, and web testing,',
        'then controlled validation, evidence, and the professional report that closes the case.',
      ],
      [
        'Labs stay on systems you own or are explicitly allowed to test. No freelance heroics.',
      ],
      [
        'Kali Linux and Penetration Testing Tools is the sister course — the workbench and tool fluency.',
        'This course is the investigation method and the professional handoff.',
      ],
      [
        'Your payoff is a findings report: severity, evidence, and defender-ready recommendations.',
      ],
      [
        'In industry, that report is how penetration testers earn trust — not by the exploit, but by the clarity of the handoff.',
        'Start with Ethical Hacking Fundamentals. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'ETHICAL HACKING', line2: '& pen testing', brand: 'ASV LEARN', tag: 'intermediate · authorized' },
      { type: 'audience', question: 'you inherit a case file', answer: 'scope · question · proof.' },
      { type: 'definition', heading: 'the work', items: ['recon', 'careful validation', 'defender report'] },
      { type: 'pipeline', leftTitle: 'method', leftLines: ['plan', 'test', 'note'], rightTitle: 'limits', rightLines: ['written scope', 'no harm'] },
      { type: 'chips', heading: 'investigation moves', chips: ['recon plan', 'enumerate', 'web lab tests', 'evidence'] },
      { type: 'cards', heading: 'still in scope', cards: ['wireless lab', 'social defense', 'controlled only'] },
      { type: 'ladder', heading: 'case path', steps: ['fundamentals', 'recon', 'scanning', 'web testing', 'validation', 'evidence & report'] },
      { type: 'terminal', heading: 'authorized lab only', sub: 'systems you may test', prompt: 'scope check', result: 'IN SCOPE' },
      { type: 'timeline', heading: 'sister courses', points: [{ top: 'Kali', bottom: 'workbench' }, { top: 'this course', bottom: 'method' }, { top: 'handoff', bottom: 'defenders' }] },
      { type: 'panel', heading: 'capstone', subheading: 'findings report', windowTitle: 'case-01', lines: ['severity', 'evidence', 'fix next'] },
      { type: 'outro', headline: 'start with fundamentals', sub: 'take your time', industry: 'trust earned by clear handoffs' },
    ],
  },

  'kali-linux': {
    title: 'KALI LINUX & PENETRATION TESTING TOOLS — INTRO v4.1 VO',
    catalogTitle: 'Kali Linux & Penetration Testing Tools',
    beats: [
      [
        'This is Kali Linux and Penetration Testing Tools, from ASV Learn.',
        'Your course for building a controlled security workbench.',
      ],
      [
        'Imagine opening a toolkit where every wrench has a purpose —',
        'and learning which one to reach for before you swing.',
      ],
      [
        'Kali is that workbench: a Linux environment packed with security tools.',
        'This course teaches you to set it up cleanly, navigate it confidently, and use tools with intent.',
      ],
      [
        'You will practice information gathering, scanning, vulnerability assessment,',
        'web testing tools, and careful exploitation technique — always in authorized labs.',
      ],
      [
        'You also touch wireless tooling and forensics basics, so the bench covers more than one kind of day.',
      ],
      [
        'The habit we want: name the question, pick the tool, capture the output, write what it means.',
      ],
      [
        'Chapters move from setup and basics, through gathering and scanning,',
        'into assessment, web tools, exploitation technique, then wireless and forensics on the same bench.',
      ],
      [
        'Install Kali in a VM you control. Keep targets synthetic or explicitly allowed.',
      ],
      [
        'Ethical Hacking and Penetration Testing is the sister course — case method and reporting.',
        'Kali is where your hands learn the tools those cases depend on.',
      ],
      [
        'Your payoff is a documented workbench: notes, tool runs, and a short playbook you could reuse on the next lab.',
      ],
      [
        'In industry, that fluency is how analysts and testers move fast without guessing which binary to open.',
        'Start with Kali setup and basics. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'KALI LINUX', line2: '& pen-test tools', brand: 'ASV LEARN', tag: 'intermediate · tools with intent' },
      { type: 'audience', question: 'every wrench has a purpose', answer: 'learn which one — first.' },
      { type: 'definition', heading: 'what you build', items: ['clean setup', 'confident navigation', 'tools with intent'] },
      { type: 'chips', heading: 'bench skills', chips: ['gather', 'scan', 'assess', 'web tools'] },
      { type: 'pipeline', leftTitle: 'habit', leftLines: ['question', 'tool', 'output'], rightTitle: 'result', rightLines: ['what it means', 'written down'] },
      { type: 'cards', heading: 'more than one kind of day', cards: ['wireless', 'forensics', 'lab only'] },
      { type: 'ladder', heading: 'course path', steps: ['setup', 'gather', 'scan', 'assess', 'web & exploit', 'wireless & forensics'] },
      { type: 'terminal', heading: 'your VM', sub: 'targets allowed only', prompt: 'whoami', result: 'kali' },
      { type: 'timeline', heading: 'sister courses', points: [{ top: 'Kali', bottom: 'workbench' }, { top: 'Ethical Hacking', bottom: 'case method' }] },
      { type: 'panel', heading: 'capstone', subheading: 'reusable playbook', windowTitle: 'workbench notes', lines: ['tool runs', 'what it meant', 'next lab ready'] },
      { type: 'outro', headline: 'start with setup & basics', sub: 'take your time', industry: 'move fast without guessing tools' },
    ],
  },

  'soc-blue-team': {
    title: 'SOC & BLUE TEAM — INTRO v4.1 VO',
    catalogTitle: 'SOC & Blue Team',
    beats: [
      [
        'This is SOC and Blue Team, from ASV Learn.',
      ],
      [
        'An alert hits at two thirteen a.m.',
        'Same host. Odd process. Is it noise — or an incident with a clock already running?',
      ],
      [
        'This intro is that countdown.',
        'You will learn how analysts triage, enrich, decide, and write a case file someone can continue at sunrise.',
      ],
      [
        'Blue team work is pattern recognition under pressure.',
        'Logs, detections, threat intel, and a calm hand when the room wants drama.',
      ],
      [
        'You will practice SIEM thinking and log analysis,',
        'map activity with MITRE ATT&CK, and walk incident response from detection to containment.',
      ],
      [
        'Later chapters open forensics and threat hunting — so you can chase what the alert only hinted at.',
      ],
      [
        'The path: SOC fundamentals, SIEM and logs, threat intel and MITRE ATT&CK,',
        'incident response, forensics, then hunting.',
      ],
      [
        'You work from local notes and lab datasets. No production network required to start.',
      ],
      [
        'If Ethical Hacking shows how attackers think, this course shows how defenders answer — with tickets, timelines, and proof.',
      ],
      [
        'Your payoff is a case file: timeline, hypothesis, actions taken, and what to watch next.',
      ],
      [
        'In industry, that case file is the difference between a sleepy queue and a team that actually contains harm.',
        'Start with SOC fundamentals. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'SOC & BLUE TEAM', line2: 'operations', brand: 'ASV LEARN', tag: 'intermediate · the night desk' },
      { type: 'audience', question: '2:13 a.m. alert', answer: 'noise — or incident?' },
      { type: 'timeline', heading: 'countdown', points: [{ top: 'triage', bottom: 'what is it?' }, { top: 'enrich', bottom: 'context' }, { top: 'decide', bottom: 'act / watch' }] },
      { type: 'definition', heading: 'blue team craft', items: ['patterns under pressure', 'calm over drama', 'proof in the ticket'] },
      { type: 'chips', heading: 'you will practice', chips: ['SIEM thinking', 'ATT&CK mapping', 'containment'] },
      { type: 'pipeline', leftTitle: 'alert', leftLines: ['hint only'], rightTitle: 'hunt', rightLines: ['forensics', 'deeper signal'] },
      { type: 'ladder', heading: 'course path', steps: ['SOC role', 'SIEM & logs', 'intel & ATT&CK', 'incident response', 'forensics', 'hunting'] },
      { type: 'terminal', heading: 'lab datasets', sub: 'local notes', prompt: 'case open', result: 'timeline started' },
      { type: 'cards', heading: 'attacker vs defender', cards: ['Ethical Hacking', 'this course', 'tickets + proof'] },
      { type: 'panel', heading: 'capstone', subheading: 'case file', windowTitle: 'INC-0213', lines: ['timeline', 'hypothesis', 'next watch'] },
      { type: 'outro', headline: 'start with SOC fundamentals', sub: 'take your time', industry: 'contain harm — not just close tickets' },
    ],
  },

  'python-security': {
    title: 'PYTHON FOR CYBERSECURITY — INTRO v4.1 VO',
    catalogTitle: 'Python for Cybersecurity',
    beats: [
      [
        'This is Python for Cybersecurity, from ASV Learn.',
        'Defensive Python — quiet, precise, useful.',
      ],
      [
        'Thousands of log lines scroll past.',
        'Somewhere in that noise is one useful clue. Python is how you find it without going blind.',
      ],
      [
        'This course turns Python into a defensive amplifier:',
        'safe network checks, HTTP evidence collection, hashing decisions, and small tools that fail closed.',
      ],
      [
        'You will automate the boring proof work analysts and responders repeat every week —',
        'so humans can spend attention on judgment.',
      ],
      [
        'Chapters cover Python basics for security, network programming for safe checks,',
        'HTTP evidence, cryptography and hashing choices, defensive tools, and secure coding habits.',
      ],
      [
        'Every script should be readable tomorrow morning. Clever is optional. Clear is required.',
      ],
      [
        'If Python Zero got you standing, this course puts you on a security desk with a keyboard that helps.',
      ],
      [
        'Practice on your machine with synthetic logs and targets you are allowed to touch.',
      ],
      [
        'This is defensive craft — stated once, then we build.',
      ],
      [
        'Your payoff is a small toolkit: parse logs, pull evidence, make a hashing decision, and document what you proved.',
      ],
      [
        'In industry, that toolkit energy shows up in SOC automation, detection engineering helpers, and secure internal utilities.',
        'Start with Python basics for security. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'PYTHON', line2: 'for cybersecurity', brand: 'ASV LEARN', tag: 'intermediate · defensive' },
      { type: 'audience', question: 'thousands of log lines', answer: 'one useful clue.' },
      { type: 'definition', heading: 'defensive amplifier', items: ['safe checks', 'evidence', 'fail closed'] },
      { type: 'pipeline', leftTitle: 'noise', leftLines: ['raw logs'], rightTitle: 'signal', rightLines: ['parsed clue', 'human judgment'] },
      { type: 'chips', heading: 'weekly proof work', chips: ['HTTP evidence', 'hashing choices', 'small tools'] },
      { type: 'terminal', heading: 'readable tomorrow', sub: 'clear > clever', prompt: 'python parse_logs.py', result: '1 suspicious host' },
      { type: 'ladder', heading: 'course path', steps: ['Python for security', 'safe network checks', 'HTTP evidence', 'hashing', 'defensive tools', 'secure coding'] },
      { type: 'cards', heading: 'local practice', cards: ['synthetic logs', 'allowed targets', 'your machine'] },
      { type: 'audience', question: 'loud offensive theater?', answer: 'no. defensive craft.' },
      { type: 'panel', heading: 'capstone toolkit', subheading: 'prove it', windowTitle: 'helpers/', lines: ['parse logs', 'pull evidence', 'document proof'] },
      { type: 'outro', headline: 'start with Python basics for security', sub: 'take your time', industry: 'SOC automation · detection helpers' },
    ],
  },

  fullstack: {
    title: 'FULL STACK DEVELOPMENT — INTRO v4.1 VO',
    catalogTitle: 'Full Stack Development',
    beats: [
      [
        'This is Full Stack Development, from ASV Learn.',
      ],
      [
        'Imagine one feature: a user saves a profile photo.',
        'You will follow that click from the button, through the API, into data, and back to the screen — as a clear design you can prove.',
      ],
      [
        'That end-to-end path is the joy of full stack work.',
        'Nothing mystical — just seeing a whole feature live in every layer.',
      ],
      [
        'You start with HTML, CSS, and JavaScript foundations,',
        'then practice React interfaces, Node API contracts, and data plans — including a simulated in-memory table before a real database.',
      ],
      [
        'You finish with deployment thinking and a portfolio proof card that shows behavior, not only screenshots.',
      ],
      [
        'Each week, another layer stops being a rumor and becomes something you can edit and run locally.',
      ],
      [
        'The path: foundations, React, Node and Express thinking, databases, deployment basics, then capstone proof.',
      ],
      [
        'You develop on your own machine with Node. You are not submitting a production app to ASV Learn.',
      ],
      [
        'Python Full Stack is the sister track with Django and FastAPI thinking.',
        'This course is the JavaScript-centered path from browser to data.',
      ],
      [
        'Your payoff is a proof card for a feature loop — click, save, reload story included — ready for a portfolio README.',
      ],
      [
        'In industry, that is how product engineers own a change without losing the plot between layers.',
        'Start with HTML, CSS, and JavaScript foundations. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'FULL STACK', line2: 'development', brand: 'ASV LEARN', tag: 'intermediate · one feature, all layers' },
      { type: 'audience', question: 'user saves a photo', answer: 'follow the click.' },
      { type: 'pipeline', leftTitle: 'browser', leftLines: ['button', 'UI'], rightTitle: 'system', rightLines: ['API contract', 'data plan', 'back'] },
      { type: 'definition', heading: 'the joy', items: ['end-to-end path', 'every layer visible', 'feature you can prove'] },
      { type: 'chips', heading: 'your practice stack', chips: ['React', 'Node contracts', 'in-memory data'] },
      { type: 'timeline', heading: 'each week', points: [{ top: 'layer', bottom: 'was a rumor' }, { top: 'now', bottom: 'you can edit it' }] },
      { type: 'ladder', heading: 'course path', steps: ['HTML/CSS/JS', 'React', 'Node & Express', 'databases', 'deploy', 'proof card'] },
      { type: 'terminal', heading: 'your machine', sub: 'local Node practice', prompt: 'node status_card.js', result: 'loop explained' },
      { type: 'cards', heading: 'sister track', cards: ['this: JavaScript', 'Python Full Stack', 'same joy'] },
      { type: 'panel', heading: 'capstone', subheading: 'portfolio proof card', windowTitle: 'feature loop', lines: ['click → save → reload', 'behavior visible', 'README-ready'] },
      { type: 'outro', headline: 'start with foundations', sub: 'take your time', industry: 'own a change end-to-end' },
    ],
  },

  'python-full': {
    title: 'PYTHON FULL STACK — INTRO v4.1 VO',
    catalogTitle: 'Python Full Stack',
    beats: [
      [
        'This is Python Full Stack, from ASV Learn.',
      ],
      [
        'Picture a small service: accounts, stored data, protected routes, and a working API shape.',
        'By the end, you can explain and practice that service end to end — in plain Python first.',
      ],
      [
        'You will map Django-style apps, FastAPI endpoint contracts, SQLAlchemy-shaped data plans, and auth decisions —',
        'often before you are required to install the full framework stack.',
      ],
      [
        'The satisfying moment is watching a request hit your route logic, touch stored data, and return JSON you shaped.',
      ],
      [
        'Foundations come first, then Django thinking, FastAPI contracts, databases, auth and security, then production Python habits.',
      ],
      [
        'You will care about structure: settings, apps, migrations, and tests that catch you before users do.',
      ],
      [
        'If React and Node is the other highway, this is the Python highway to the same destination: a product loop you can run and explain.',
      ],
      [
        'Develop locally. Use files and a database only when a stage asks for it. Deploy thinking comes after the contracts are honest.',
      ],
      [
        'Bring Python Zero comfort — or equivalent. We move faster than absolute beginner pace.',
      ],
      [
        'Your payoff is a service story you can demo from local scripts: sign up flow, save something, fetch it through an API-shaped handler.',
      ],
      [
        'In industry, Python full stack shows up in internal tools, data products, and API-first backends teams trust.',
        'Start with Python web fundamentals. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'PYTHON', line2: 'full stack', brand: 'ASV LEARN', tag: 'intermediate · service you can explain' },
      { type: 'audience', question: 'accounts · data · routes · API', answer: 'map it — then practice it.' },
      { type: 'chips', heading: 'your map', chips: ['Django thinking', 'FastAPI contracts', 'SQLAlchemy plans', 'auth'] },
      { type: 'pipeline', leftTitle: 'request', leftLines: ['hit a route'], rightTitle: 'response', rightLines: ['touch data', 'shaped JSON'] },
      { type: 'ladder', heading: 'course path', steps: ['web fundamentals', 'Django', 'FastAPI', 'databases', 'auth & security', 'deploy habits'] },
      { type: 'definition', heading: 'structure matters', items: ['settings & apps', 'migrations', 'tests before users'] },
      { type: 'cards', heading: 'two highways', cards: ['React & Node', 'this Python path', 'same destination'] },
      { type: 'terminal', heading: 'local first', sub: 'install when a stage asks', prompt: 'python router_demo.py', result: '200 + JSON' },
      { type: 'audience', question: 'absolute beginner pace?', answer: 'no — Python Zero comfort first.' },
      { type: 'panel', heading: 'capstone', subheading: 'service story', windowTitle: 'accounts API shape', lines: ['sign up flow', 'save data', 'fetch it back'] },
      { type: 'outro', headline: 'start with Python web fundamentals', sub: 'take your time', industry: 'internal tools · data products · API backends' },
    ],
  },

  react: {
    title: 'REACT & MODERN FRONTEND — INTRO v4.1 VO',
    catalogTitle: 'React & Modern Frontend',
    beats: [
      [
        'This is React and Modern Frontend, from ASV Learn.',
      ],
      [
        'You flip a toggle. You type in a box. The interface changes before your eyes —',
        'no full page reload, no mystery refresh. That immediate response is why people love React.',
      ],
      [
        'This course teaches you to build interfaces from components and hooks,',
        'so user choices become visible state you control.',
      ],
      [
        'You will add routing, data fetching, and forms,',
        'then learn state management, performance habits, testing, and accessibility.',
      ],
      [
        'The loop stays tactile: edit, save, see the UI answer you — often with Node recipes before full JSX tooling.',
      ],
      [
        'We begin with JavaScript prerequisites, then React core,',
        'routing and data, state and performance, testing and accessibility, and a project proof capstone.',
      ],
      [
        'Four project ideas give you a portfolio map.',
        'Your required proof is one reviewable project card — behavior visible before polish — not four finished production apps.',
      ],
      [
        'You build locally with the browser tooling React developers actually use.',
      ],
      [
        'When you later wire a real API, you will already think in components, state, and clear loading states.',
      ],
      [
        'Your payoff is a React portfolio project card strong enough that a reviewer understands the app before the screenshots.',
      ],
      [
        'In industry, React skills power dashboards, product UIs, and design systems teams ship every week.',
        'Start with JavaScript prerequisites. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'REACT', line2: '& modern frontend', brand: 'ASV LEARN', tag: 'beginner · interfaces that answer' },
      { type: 'audience', question: 'flip a toggle', answer: 'the UI answers instantly.' },
      { type: 'definition', heading: 'why React', items: ['components', 'hooks', 'visible state'] },
      { type: 'chips', heading: 'you will add', chips: ['routing', 'fetching', 'forms', 'a11y'] },
      { type: 'terminal', heading: 'tactile loop', sub: 'edit → save → see', prompt: 'node component_recipe.js', result: 'UI behavior named' },
      { type: 'ladder', heading: 'course path', steps: ['JS prerequisites', 'components & hooks', 'routing & data', 'state & performance', 'test & a11y', 'project proof'] },
      { type: 'panel', heading: 'capstone', subheading: 'one strong proof card', windowTitle: 'portfolio_project', lines: ['problem + tree', 'behavior visible', 'next iteration'] },
      { type: 'cards', heading: 'local practice', cards: ['component recipes', 'Node first', 'browser tooling'] },
      { type: 'pipeline', leftTitle: 'UI', leftLines: ['components', 'state'], rightTitle: 'later', rightLines: ['real API', 'loading states'] },
      { type: 'definition', heading: 'payoff', items: ['reviewable project card', 'four ideas mapped', 'one proof required'] },
      { type: 'outro', headline: 'start with JavaScript prerequisites', sub: 'take your time', industry: 'dashboards · product UIs · design systems' },
    ],
  },

  'security-plus': {
    title: 'COMPTIA SECURITY+ (SY0-701) — INTRO v4.1 VO',
    catalogTitle: 'CompTIA Security+',
    beats: [
      [
        'This is CompTIA Security+, aligned to the SY0-701 exam, from ASV Learn.',
      ],
      [
        'A vendor wants the cheap control. An auditor wants the documented one.',
        'Your job is to choose a security decision that still makes sense under both pressures.',
      ],
      [
        'Security+ is not trivia night.',
        'It is judgment: threats, architecture, operations, and program oversight — practiced as decisions.',
      ],
      [
        'You will work through the five SY0-701 domains:',
        'general security concepts; threats, vulnerabilities, and mitigations; security architecture;',
        'security operations; and security program management and oversight.',
      ],
      [
        'Each domain ends in a local artifact — a risk chain, a design card, a response note —',
        'so you can explain why, not only what the flashcard said.',
      ],
      [
        'A sixth chapter trains exam mindset with original practice scenarios. No dump memorization.',
      ],
      [
        'Come for the certificate language. Stay for the habit of clear security reasoning.',
      ],
      [
        'You practice in your own notes folder on your machine. Authorized lab thinking from day one.',
      ],
      [
        'If you later take Ethical Hacking or SOC courses, this vocabulary becomes the shared map.',
      ],
      [
        'Your payoff is a set of decision artifacts you could defend in a study group — or a junior analyst desk.',
      ],
      [
        'In industry, Security+ language shows up in analyst interviews, GRC conversations, and day-one SOC expectations.',
        'Start with general security concepts. Take your time.',
      ],
    ],
    scenes: [
      { type: 'title', line1: 'SECURITY+', line2: 'SY0-701', brand: 'ASV LEARN', tag: 'beginner · judgment under pressure' },
      { type: 'audience', question: 'cheap control vs documented one?', answer: 'choose a decision that holds.' },
      { type: 'definition', heading: 'not trivia night', items: ['threats', 'architecture', 'operations', 'oversight'] },
      { type: 'ladder', heading: 'SY0-701 domains', steps: ['general concepts', 'threats & mitigations', 'architecture', 'operations', 'program oversight'] },
      { type: 'chips', heading: 'local artifacts', chips: ['risk chain', 'design card', 'response note'] },
      { type: 'cards', heading: 'exam mindset', cards: ['original scenarios', 'no dumps', 'explain why'] },
      { type: 'audience', question: 'here for the cert language?', answer: 'stay for the reasoning habit.' },
      { type: 'terminal', heading: 'your notes folder', sub: 'authorized thinking', prompt: 'mkdir ~/asv-learn-security-plus', result: 'ready' },
      { type: 'timeline', heading: 'later courses', points: [{ top: 'Security+', bottom: 'shared map' }, { top: 'Ethical Hacking', bottom: 'offense method' }, { top: 'SOC', bottom: 'defense desk' }] },
      { type: 'panel', heading: 'capstone habit', subheading: 'defend the why', windowTitle: 'decision set', lines: ['study group ready', 'junior desk ready'] },
      { type: 'outro', headline: 'start with general security concepts', sub: 'take your time', industry: 'analyst interviews · GRC · SOC day one' },
    ],
  },
}

function spokenOnly(lines) {
  return `${lines.join('\n')}\n`
}

function assertLadderSteps(slug, scenes) {
  for (const [i, scene] of scenes.entries()) {
    if (scene?.type === 'ladder' && Array.isArray(scene.steps) && scene.steps.length > 6) {
      throw new Error(`${slug} beat ${i + 1}: ladder has ${scene.steps.length} steps (max 6 for CourseIntroSketch)`)
    }
  }
}

function writePack(slug, pack, { mirrorLegacyPythonZero = false } = {}) {
  assertLadderSteps(slug, pack.scenes)

  /** @type {string[]} */
  const targets = []
  if (slug === 'python-zero') {
    targets.push(resolve(COURSES, 'python-zero', 'intro-video'))
    if (mirrorLegacyPythonZero) targets.push(LEGACY_PZ)
  } else {
    targets.push(resolve(COURSES, slug, 'intro-video'))
  }

  for (const dir of targets) {
    const voDir = resolve(dir, 'vo')
    mkdirSync(voDir, { recursive: true })

    const scriptBody =
      HEADER.replace('ASV Learn intro VO v4.1', pack.title) +
      pack.beats
        .map((lines, i) => {
          const n = String(i + 1).padStart(2, '0')
          return `========== BEAT ${n} → beat-${n} ==========\n\n${lines.join('\n')}\n`
        })
        .join('\n')

    writeFileSync(resolve(voDir, 'SCRIPT.txt'), scriptBody, 'utf8')

    pack.beats.forEach((lines, i) => {
      const n = String(i + 1).padStart(2, '0')
      writeFileSync(resolve(voDir, `beat-${n}.txt`), spokenOnly(lines), 'utf8')
    })

    const scenes = {
      slug,
      title: pack.title,
      catalogTitle: pack.catalogTitle,
      version: '4.1',
      beats: pack.scenes,
    }
    writeFileSync(resolve(dir, 'scenes.json'), JSON.stringify(scenes, null, 2) + '\n', 'utf8')
    console.log(`wrote ${slug} → ${dir}`)
  }
}

function printHelp() {
  console.log(`Usage:
  node scripts/write-intro-vo-v4.mjs --all
  node scripts/write-intro-vo-v4.mjs --slug <slug>
  node scripts/write-intro-vo-v4.mjs --slug=<slug>
  node scripts/write-intro-vo-v4.mjs --slug python-zero --mirror-legacy-python-zero

Flags:
  --all                         Write every pack
  --slug <slug> | --slug=<slug> Write one pack (value required)
  --mirror-legacy-python-zero   Also write python-zero into brand/.../intro-video/
  --help                        Show this help

Known slugs: ${Object.keys(PACKS).join(', ')}`)
}

function parseArgs(argv) {
  /** @type {{ help?: boolean, all: boolean, slug: string | null, mirrorLegacyPythonZero: boolean }} */
  const out = { all: false, slug: null, mirrorLegacyPythonZero: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help' || a === '-h') out.help = true
    else if (a === '--all') out.all = true
    else if (a === '--mirror-legacy-python-zero') out.mirrorLegacyPythonZero = true
    else if (a.startsWith('--slug=')) {
      const val = a.slice('--slug='.length).trim()
      if (!val) throw new Error('--slug= requires a value, e.g. --slug=react')
      out.slug = val
    } else if (a === '--slug') {
      const val = argv[++i]
      if (!val || val.startsWith('--')) {
        throw new Error('--slug requires a value, e.g. --slug react or --slug=react')
      }
      out.slug = val
    } else {
      throw new Error(`Unknown flag: ${a}\nRun with --help for usage.`)
    }
  }
  if (out.slug && out.all) throw new Error('Use either --slug or --all, not both')
  if (!out.help && !out.slug && !out.all) {
    throw new Error('Specify --all or --slug <slug>. Refusing to write with no target.\nRun with --help for usage.')
  }
  return out
}

function main() {
  let opts
  try {
    opts = parseArgs(process.argv.slice(2))
  } catch (err) {
    console.error(String(err?.message || err))
    process.exit(1)
  }
  if (opts.help) {
    printHelp()
    return
  }

  const slugs = opts.slug ? [opts.slug] : Object.keys(PACKS)
  console.log(`Targets (${slugs.length}): ${slugs.join(', ')}`)
  if (opts.mirrorLegacyPythonZero) console.log('Legacy python-zero mirror: ON')

  for (const slug of slugs) {
    const pack = PACKS[slug]
    if (!pack) {
      console.error(`Unknown slug: ${slug}`)
      console.error(`Known: ${Object.keys(PACKS).join(', ')}`)
      process.exit(1)
    }
    if (pack.beats.length !== 11) throw new Error(`${slug}: expected 11 beats, got ${pack.beats.length}`)
    if (pack.scenes.length !== 11) throw new Error(`${slug}: expected 11 scenes, got ${pack.scenes.length}`)
    const open = pack.beats[0][0] || ''
    if (!open.includes(pack.catalogTitle) && !open.includes(pack.catalogTitle.replace('&', 'and'))) {
      // Allow "DevOps and Infrastructure" spoken form of "DevOps & Infrastructure"
      const andForm = pack.catalogTitle.replace(/\s*&\s*/g, ' and ')
      if (!open.includes(andForm)) {
        console.warn(`warn: ${slug} beat-01 may not use catalog title "${pack.catalogTitle}": ${open}`)
      }
    }
    writePack(slug, pack, { mirrorLegacyPythonZero: opts.mirrorLegacyPythonZero })
  }

  for (const slug of slugs) {
    const words = PACKS[slug].beats.flat().join(' ').split(/\s+/).length
    const estSec = Math.round((words / 150) * 60)
    console.log(`  ${slug}: ~${words} words, ~${estSec}s @150wpm`)
  }
}

main()
