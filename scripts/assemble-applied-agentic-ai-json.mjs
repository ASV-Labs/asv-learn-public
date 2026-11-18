#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/applied-agentic-ai')

const stages = [
  {
    slug: 'stage-01',
    title: 'Large Language Models Foundations',
    hours: '2-3',
    sortOrder: 1,
    md: 'stage-01-llm-foundations.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What separates an agent from a raw model call?',
        options: [
          'Goals, tools, checks, memory, and boundaries',
          'A larger logo',
          'A prompt with no success criteria',
          'Unlimited access to every tool',
        ],
        correct: 0,
        explanation:
          'An agent wraps model output with controlled goals, tools, checks, state, and limits.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Edit agent_boundary.py locally, save, and run python3 in a terminal',
          'Expect the lesson page to run and grade your code for you',
          'Memorize API keys before writing any spec',
          'Connect every tool first, then write the goal',
        ],
        correct: 0,
        explanation:
          'Lessons are read in ASV Learn; practice is edit → save → run on your computer with synthetic lab data.',
      },
      {
        type: 'multiple_choice',
        question: 'Which agent-spec field tells the system when to hand work to a human?',
        options: [
          'escalation_condition',
          'allowed_tools',
          'goal',
          'success_check',
        ],
        correct: 0,
        explanation:
          'Escalation conditions stop automated work when context is missing or the request is unsafe.',
      },
    ],
  },
  {
    slug: 'stage-02',
    title: 'Prompt Engineering Mastery',
    hours: '2-3',
    sortOrder: 2,
    md: 'stage-02-prompt-engineering.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why does a prompt need a verification check?',
        options: [
          'So the answer can be judged against a specific requirement',
          'So the model can ignore context',
          'So every output is longer',
          'So the assistant can skip the stated task',
        ],
        correct: 0,
        explanation:
          'A verification check makes quality inspectable instead of relying on fluent wording.',
      },
      {
        type: 'multiple_choice',
        question: 'When required context is missing, what should a contract-following assistant do?',
        options: [
          'Follow the refusal rule and ask instead of guessing',
          'Invent plausible details to finish the task',
          'Skip constraints to save tokens',
          'Change the output format silently',
        ],
        correct: 0,
        explanation:
          'Refusal rules prevent confident guesses when the instruction card says required input is absent.',
      },
      {
        type: 'multiple_choice',
        question: 'What file do you build locally in Stage 02?',
        options: [
          'prompt_contract.py with an assistant_instruction_card dictionary',
          'A hosted notebook that runs inside ASV Learn',
          'An API gateway configuration only',
          'A vector database migration script',
        ],
        correct: 0,
        explanation:
          'Stage 02 practice is a local Python file with context_fields, constraints, and refusal rules you edit, save, and run in your terminal.',
      },
    ],
  },
  {
    slug: 'stage-03',
    title: 'RAG & Knowledge Integration',
    hours: '2-3',
    sortOrder: 3,
    md: 'stage-03-rag-knowledge.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is the main reason to define an answer boundary in RAG?',
        options: [
          'To prevent unsupported claims outside retrieved evidence',
          'To make the prompt shorter',
          'To remove the need for retrieval',
          'To guarantee the model is always correct',
        ],
        correct: 0,
        explanation:
          'The answer boundary tells the model what not to claim when the sources do not support it.',
      },
      {
        type: 'multiple_choice',
        question: 'What should happen when retrieve() finds no matching documents?',
        options: [
          'Surface the uncertainty note instead of guessing confidently',
          'Answer from general knowledge without saying so',
          'Disable all citation rules',
          'Expand the source collection to the entire internet',
        ],
        correct: 0,
        explanation:
          'RAG is useful when missing evidence is visible; the uncertainty note names what is absent.',
      },
      {
        type: 'multiple_choice',
        question: 'In local Stage 03 practice, retrieve() demonstrates what idea?',
        options: [
          'Which approved sources would attach before the model answers',
          'Production-grade embedding search quality',
          'Automatic fine-tuning of the model weights',
          'Hosted sandbox execution of learner code',
        ],
        correct: 0,
        explanation:
          'The simple keyword matcher is a teaching stand-in for source attachment, not a production vector store.',
      },
    ],
  },
  {
    slug: 'stage-04',
    title: 'Agent Architectures',
    hours: '2-3',
    sortOrder: 4,
    md: 'stage-04-agent-architectures.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should an agent loop include before it is trusted?',
        options: [
          'State, allowed steps, stop condition, escalation, and success check',
          'Unlimited retries',
          'No logging',
          'A hidden goal',
        ],
        correct: 0,
        explanation:
          'Explicit state and stop rules keep the agent bounded and testable.',
      },
      {
        type: 'multiple_choice',
        question: 'In this course, what does latest_check_status refer to?',
        options: [
          'Output from your local edit-save-run practice and proof checklists',
          'A hosted sandbox grade from ASV Learn',
          'A cloud GPU utilization metric',
          'An automatic model fine-tune score',
        ],
        correct: 0,
        explanation:
          'House style is honest local Python practice; state references what you actually ran on your machine.',
      },
      {
        type: 'multiple_choice',
        question: 'What should clearing required state (like course) trigger?',
        options: [
          'Escalation instead of continuing the loop',
          'A longer open-ended retry loop',
          'Silent continuation with generic advice',
          'Automatic tool connection',
        ],
        correct: 0,
        explanation:
          'Escalation conditions exist so missing context becomes visible instead of hidden guessing.',
      },
    ],
  },
  {
    slug: 'stage-05',
    title: 'Tools & API Integration',
    hours: '2-3',
    sortOrder: 5,
    md: 'stage-05-tools-api.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why is a tool contract necessary?',
        options: [
          'It turns tool access into explicit permissions and audit rules',
          'It lets the model call anything',
          'It hides the tool output',
          'It replaces user authentication',
        ],
        correct: 0,
        explanation:
          'The contract defines allowed action, forbidden action, schemas, and audit evidence.',
      },
      {
        type: 'multiple_choice',
        question: 'What does validate_input() prove in local Stage 05 practice?',
        options: [
          'Calls missing required schema keys can be rejected before any API runs',
          'Every API key is valid in production',
          'The model will never hallucinate',
          'Hosted sandboxes are available in-lesson',
        ],
        correct: 0,
        explanation:
          'Schema validation is enforceable discipline you can test locally without network calls.',
      },
      {
        type: 'multiple_choice',
        question: 'Which practice best matches least privilege for tools?',
        options: [
          'Separate read-only tools from write tools with explicit forbidden actions',
          'One mega-tool that reads, writes, deletes, and emails',
          'No audit log fields to reduce storage',
          'Skip input schemas to move faster',
        ],
        correct: 0,
        explanation:
          'Narrow permissions plus audit fields make tool use reviewable and limit blast radius.',
      },
    ],
  },
  {
    slug: 'stage-06',
    title: 'Production Agent Systems',
    hours: '3-4',
    sortOrder: 6,
    md: 'stage-06-production-systems.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What proves an agent is closer to production-ready?',
        options: [
          'Monitoring, limits, safety review, rollback, escalation, and evaluation samples',
          'A longer prompt only',
          'No cost tracking',
          'Access to every internal system',
        ],
        correct: 0,
        explanation:
          'Production readiness requires observable behavior, limits, rollback, and repeatable evaluation.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a honest rollback plan do for this course path?',
        options: [
          'Disable tool calls and fall back to lesson-only guidance',
          'Claim a hosted sandbox will auto-fix learner code',
          'Remove all monitoring to reduce noise',
          'Grant the agent every internal API permanently',
        ],
        correct: 0,
        explanation:
          'Rollback returns to a safe known state; this course does not promise in-lesson hosted execution.',
      },
      {
        type: 'multiple_choice',
        question: 'Why keep eval_samples/sample_questions.txt locally?',
        options: [
          'So you can rerun fixed checks after changing specs, prompts, or tools',
          'So the model weights update automatically',
          'So ASV Learn grades Python without you running it',
          'So you never need a runbook',
        ],
        correct: 0,
        explanation:
          'Evaluation samples catch regressions when agent artifacts change; they complement the runbook.',
      },
    ],
  },
]

const course = {
  slug: 'applied-agentic-ai',
  title: 'Applied Agentic AI',
  description:
    'Build AI agents with clear goals, prompt contracts, retrieval boundaries, tool permissions, evaluation checks, and production runbooks. Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.',
  icon: 'AG',
  difficulty: 'Advanced',
  hours: '18-20',
  topics: ['LLMs', 'Agents', 'Prompt Engineering', 'RAG', 'Tool Safety'],
  certBadges: ['AI Agent Developer'],
  runtime: 'python',
  source: {
    fixture: 'content/courses/technodex-fixtures/applied-agentic-ai.ts',
    live: 'https://technodex.io/courses/applied-agentic-ai',
    markdown: 'content/courses/applied-agentic-ai/',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/applied-agentic-ai.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
