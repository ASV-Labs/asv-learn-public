#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const COURSE_DIR = resolve(ROOT, 'content/courses/ai-fundamentals')

const stages = [
  {
    slug: 'stage-01',
    title: 'AI, ML, and LLM Orientation',
    hours: '2-3',
    sortOrder: 1,
    md: 'stage-01-ai-ml-llm-orientation.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why should builders separate automation, prediction, generation, and guarded workflows?',
        options: [
          'So the right tests, evidence, and risks can be named for each behavior',
          'So every feature can be labeled AI without further detail',
          'So learners must bring their own provider API keys',
          'So an automatic grader in the lesson can skip behavioral review',
        ],
        correct: 0,
        explanation:
          'Different behaviors need different evidence. Vague AI labels hide what should be tested.',
      },
      {
        type: 'multiple_choice',
        question: 'What is a hallucination in this course’s language?',
        options: [
          'Fluent output that is not grounded in evidence',
          'A slower model response',
          'A rate-limit error from an internal API',
          'A missing Python import',
        ],
        correct: 0,
        explanation:
          'LLMs can sound confident while inventing unsupported facts; that is a hallucination risk.',
      },
      {
        type: 'multiple_choice',
        question: 'How do you practice Stage 01 in ASV Learn house style?',
        options: [
          'Edit feature_classifications.py locally, save, and run python3 in a terminal',
          'Run code in an automatic grader inside the lesson page',
          'Connect three vendor SDKs before classifying claims',
          'Skip evidence and risk columns if the demo looks good',
        ],
        correct: 0,
        explanation:
          'Practice is local edit → save → run in a terminal.',
      },
    ],
  },
  {
    slug: 'stage-02',
    title: 'Models, LLMs, and AI System Parts',
    hours: '2-3',
    sortOrder: 2,
    md: 'stage-02-models-system-parts.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What belongs in an AI system parts map besides the model?',
        options: [
          'UI, internal API boundary, context, validation, tier limits, and fallback',
          'Only the model family logo',
          'A learner-owned OpenAI key',
          'Unlimited generation for every account',
        ],
        correct: 0,
        explanation:
          'The model is one engine inside a controlled product flow with policy and fallback.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the required policy for AI interaction in this course?',
        options: [
          'Use ASV Learn internal APIs with guardrails and tier controls',
          'Ask learners to connect outside model accounts',
          'Skip validation because the model is intelligent',
          'Let every tier use unlimited AI interactions',
        ],
        correct: 0,
        explanation:
          'AI interaction must stay behind internal APIs with guardrails and usage controls.',
      },
      {
        type: 'multiple_choice',
        question: 'Why do context windows matter to builders?',
        options: [
          'Long prompts and notes can push out earlier instructions and sources',
          'They guarantee factual correctness',
          'They replace validation',
          'They remove the need for tier limits',
        ],
        correct: 0,
        explanation:
          'Context is finite; builders must budget what the model can see.',
      },
    ],
  },
  {
    slug: 'stage-03',
    title: 'Prompting as Instruction Design',
    hours: '2-3',
    sortOrder: 3,
    md: 'stage-03-prompting-instruction-design.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes a prompt an instruction package rather than magic words?',
        options: [
          'Task, context, constraints, output format, success check, and failure mode',
          'Using as many adjectives as possible',
          'Hiding the success check from reviewers',
          'Requiring a learner provider key in the prompt',
        ],
        correct: 0,
        explanation:
          'A strong prompt is a reviewable contract with explicit checks and failure behavior.',
      },
      {
        type: 'multiple_choice',
        question: 'When required context is missing, what should a contract-following assistant do?',
        options: [
          'Follow the failure mode and ask instead of guessing',
          'Invent plausible lesson facts to finish the answer',
          'Ignore constraints to save tokens',
          'Change the output format silently',
        ],
        correct: 0,
        explanation:
          'Failure modes prevent confident guesses when required input is absent.',
      },
      {
        type: 'multiple_choice',
        question: 'What local file do you build in Stage 03?',
        options: [
          'prompt_test.py comparing a weak prompt with an improved package',
          'A hosted notebook graded by an automatic grader in the lesson',
          'A multi-cloud SDK installer',
          'A production vector database cluster',
        ],
        correct: 0,
        explanation:
          'Stage 03 practice is a local prompt test workbook in Python.',
      },
    ],
  },
  {
    slug: 'stage-04',
    title: 'Prompt Debugging and Behavior Testing',
    hours: '2-3',
    sortOrder: 4,
    md: 'stage-04-prompt-debugging.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should a useful prompt debugging log row include?',
        options: [
          'Input, symptom, failure pattern, change, retest check, and guardrail note',
          'Only the word improved',
          'A vendor invoice',
          'An unlimited retry count with no hypothesis',
        ],
        correct: 0,
        explanation:
          'Debugging is behavior testing with a hypothesis and a pass/fail retest.',
      },
      {
        type: 'multiple_choice',
        question: 'Why avoid changing five prompt fields at once?',
        options: [
          'You will not know which change fixed the failure',
          'Models forbid more than one edit per day',
          'Internal APIs reject multi-field prompts',
          'Python cannot print dictionaries with many keys',
        ],
        correct: 0,
        explanation:
          'Controlled one-change tests make improvements attributable.',
      },
      {
        type: 'multiple_choice',
        question: 'Which failure pattern fits inventing facts when lesson notes were never provided?',
        options: [
          'Missing context / hallucination',
          'Successful validation',
          'Tier upgrade',
          'Rollback complete',
        ],
        correct: 0,
        explanation:
          'Without approved context, fluent invented details are a grounding failure.',
      },
    ],
  },
  {
    slug: 'stage-05',
    title: 'How APIs Connect AI Features',
    hours: '2-3',
    sortOrder: 5,
    md: 'stage-05-apis-connect-ai.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'In this course, how should AI model access be reached?',
        options: [
          'Through internal APIs with auth, tier checks, rate limits, and logging',
          'Through learner-owned provider keys in a .env file',
          'Through a public lesson-page code runner endpoint',
          'Through skipping status codes because the model is smart',
        ],
        correct: 0,
        explanation:
          'External learner keys are not allowed; the platform boundary owns AI access.',
      },
      {
        type: 'multiple_choice',
        question: 'What should a 403 tier-blocked response usually mean for product UX?',
        options: [
          'Show a calm gate/upgrade message — do not ask for an outside API key',
          'Secretly embed the teacher’s provider key in the frontend',
          'Retry forever with no user message',
          'Disable validation to force a 200',
        ],
        correct: 0,
        explanation:
          'Tier blocks are product decisions, not prompts for personal vendor keys.',
      },
      {
        type: 'multiple_choice',
        question: 'Why is validation still needed after a 200 response?',
        options: [
          'HTTP success does not prove the body meets the output contract',
          'Status 200 means the facts are verified',
          'Validators replace authentication',
          '200 responses never include model text',
        ],
        correct: 0,
        explanation:
          'Transport success and content safety/quality are different layers.',
      },
    ],
  },
  {
    slug: 'stage-06',
    title: 'Structured Outputs and Validation',
    hours: '2-3',
    sortOrder: 6,
    md: 'stage-06-structured-outputs.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Why do AI product features need structured outputs?',
        options: [
          'So software can validate required fields before showing results',
          'So answers become longer',
          'So learners must memorize JSON syntax only',
          'So external API keys become mandatory',
        ],
        correct: 0,
        explanation:
          'Structure makes outputs machine-checkable and fallback-ready.',
      },
      {
        type: 'multiple_choice',
        question: 'What should happen when validation fails?',
        options: [
          'Use the fallback path instead of showing invalid output',
          'Invent missing citation fields automatically',
          'Disable logging',
          'Mark the answer as certified true',
        ],
        correct: 0,
        explanation:
          'Fallback is the safe product behavior when contracts are not met.',
      },
      {
        type: 'multiple_choice',
        question: 'What does local Stage 06 practice prove with sample cards?',
        options: [
          'Invalid or incomplete objects can be rejected by a validator you run yourself',
          'An automatic grader in the lesson auto-fixes JSON',
          'Enums are optional if confidence sounds high',
          'Provider SDKs are required before any checklist',
        ],
        correct: 0,
        explanation:
          'You run validator checks locally on simulated model outputs.',
      },
    ],
  },
  {
    slug: 'stage-07',
    title: 'Retrieval and Source Grounding',
    hours: '2-3',
    sortOrder: 7,
    md: 'stage-07-retrieval-grounding.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What problem does retrieval mainly solve for builders?',
        options: [
          'Models lack private/current approved context and may invent facts',
          'Python cannot print dictionaries',
          'Certificates cannot be issued',
          'Tier limits become unnecessary',
        ],
        correct: 0,
        explanation:
          'Retrieval supplies approved chunks so answers can be grounded.',
      },
      {
        type: 'multiple_choice',
        question: 'If no approved chunk supports the question, what should the product do?',
        options: [
          'Name the gap or refuse instead of improvising',
          'Cite a random blog with high confidence',
          'Ask the learner for an OpenAI key',
          'Hide uncertainty to keep UX smooth',
        ],
        correct: 0,
        explanation:
          'Grounding requires visible uncertainty when evidence is missing.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the Stage 07 keyword retriever meant to teach?',
        options: [
          'Source attachment, trust, and gaps — not production vector search quality',
          'How to deploy Pinecone on day one',
          'How an automatic grader in the lesson grades embeddings in-browser',
          'How to fine-tune model weights locally',
        ],
        correct: 0,
        explanation:
          'The local matcher is a teaching stand-in for inspection skills.',
      },
    ],
  },
  {
    slug: 'stage-08',
    title: 'RAG Application Patterns',
    hours: '2-3',
    sortOrder: 8,
    md: 'stage-08-rag-patterns.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which sequence best describes a useful RAG app pattern?',
        options: [
          'Question → retrieve approved chunks → context package → answer → cite/validate/uncertainty',
          'Question → invent sources → hide citations → ship',
          'Question → require learner API keys → skip validation',
          'Question → unlimited web browse → no boundaries',
        ],
        correct: 0,
        explanation:
          'RAG is a controlled pipeline from sources to validated, cited answers.',
      },
      {
        type: 'multiple_choice',
        question: 'What is the main job of an answer boundary?',
        options: [
          'Prevent unsupported claims outside retrieved evidence',
          'Make the prompt shorter only',
          'Guarantee the model is always correct',
          'Remove the need for citations',
        ],
        correct: 0,
        explanation:
          'Boundaries tell the system what must not be claimed without evidence.',
      },
      {
        type: 'multiple_choice',
        question: 'Why keep sample eval questions in the RAG plan?',
        options: [
          'To catch regressions on known hit and miss cases after changes',
          'To update model weights automatically',
          'To replace privacy rules',
          'To unlock an automatic grader in the lesson',
        ],
        correct: 0,
        explanation:
          'Fixed eval questions make grounding failures visible after edits.',
      },
    ],
  },
  {
    slug: 'stage-09',
    title: 'AI Workflows and Tool Use',
    hours: '2-3',
    sortOrder: 9,
    md: 'stage-09-workflows-tool-use.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What is a tool in this course’s builder language?',
        options: [
          'A controlled action with permissions, forbidden uses, and audit fields',
          'Unlimited autonomy for the model',
          'A hidden provider key',
          'Any Python function without a contract',
        ],
        correct: 0,
        explanation:
          'Tools are permissions and contracts, not personality.',
      },
      {
        type: 'multiple_choice',
        question: 'Which action class usually needs confirmation before it runs?',
        options: [
          'Create (for example saving a flashcard to a deck)',
          'Read-only lesson search with an allowlist',
          'Printing a local help message',
          'Showing a static lesson link',
        ],
        correct: 0,
        explanation:
          'Write/create actions should not be silent in learner products.',
      },
      {
        type: 'multiple_choice',
        question: 'Why prefer least privilege for tools?',
        options: [
          'Narrow permissions limit blast radius and make audits possible',
          'Mega-tools are required by internal APIs',
          'Audit fields are illegal',
          'Confirmation prompts always remove security needs',
        ],
        correct: 0,
        explanation:
          'Small allowlists and forbidden lists keep workflows reviewable.',
      },
    ],
  },
  {
    slug: 'stage-10',
    title: 'Agents as Guarded Workflows',
    hours: '2-3',
    sortOrder: 10,
    md: 'stage-10-agents-guarded.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What should an agent loop include before it is trusted?',
        options: [
          'Goal, state, allowlisted tools, success check, escalation, and max steps',
          'Unlimited retries with no stop rule',
          'No logging and a hidden goal',
          'Access to every internal write tool by default',
        ],
        correct: 0,
        explanation:
          'Guarded workflows need explicit stop and escalation rules.',
      },
      {
        type: 'multiple_choice',
        question: 'When is a simpler workflow often better than an agent?',
        options: [
          'When one retrieval plus one answer (or a fixed checklist) is enough',
          'When you want infinite tool sprawl',
          'When success cannot be defined — ship anyway',
          'When learners must supply vendor keys',
        ],
        correct: 0,
        explanation:
          'Agents add loop risk; use them only when intermediate decisions require it.',
      },
      {
        type: 'multiple_choice',
        question: 'What does local Stage 10 simulation prove?',
        options: [
          'The boundary and stop rules can be inspected without live tool execution',
          'The agent is production-autonomous',
          'An automatic grader in the lesson verified the loop',
          'Max steps are optional decoration',
        ],
        correct: 0,
        explanation:
          'The sketch proves design discipline; it is not a deploy claim.',
      },
    ],
  },
  {
    slug: 'stage-11',
    title: 'Responsible AI, Guardrails, and Tiered Access',
    hours: '2-3',
    sortOrder: 11,
    md: 'stage-11-responsible-ai.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'Which set best matches operational responsible AI for this course?',
        options: [
          'Privacy rules, abuse checks, tier gates, logging, escalation, eval, and rollback',
          'A single disclaimer banner with unlimited free generation',
          'Learner provider keys and no logs',
          'Skipping review because the demo was fluent',
        ],
        correct: 0,
        explanation:
          'Responsibility is a release packet of enforceable controls.',
      },
      {
        type: 'multiple_choice',
        question: 'Why keep tier gates on internal AI APIs?',
        options: [
          'To control cost, abuse, and who may use generative features',
          'To force every user onto unlimited calls',
          'To replace authentication entirely',
          'To require outside model accounts',
        ],
        correct: 0,
        explanation:
          'Tiers are product guardrails on platform-mediated AI access.',
      },
      {
        type: 'multiple_choice',
        question: 'What is a good reason to choose no-go on a release review?',
        options: [
          'Missing rollback, weak privacy rules, or unevaluated failure cases',
          'The UI colors are not purple enough',
          'The model family name is unpopular on social media',
          'The release review used the wrong font family',
        ],
        correct: 0,
        explanation:
          'An honest no-go with missing controls is better than a fake go.',
      },
    ],
  },
  {
    slug: 'stage-12',
    title: 'Portfolio Capstone: AI Builder Proof',
    hours: '2-3',
    sortOrder: 12,
    md: 'stage-12-portfolio-capstone.md',
    quiz: [
      {
        type: 'multiple_choice',
        question: 'What makes an AI Builder proof portfolio-ready?',
        options: [
          'A reviewable packet covering problem, contracts, flow, tests, boundaries, guardrails, and reflection',
          'A chat screenshot with no failure modes',
          'A claim of job placement',
          'A public deploy URL with no validation',
        ],
        correct: 0,
        explanation:
          'Mentors need inspectable decisions, not hype artifacts.',
      },
      {
        type: 'multiple_choice',
        question: 'Which claim should the capstone explicitly refuse?',
        options: [
          'That an automatic grader in the lesson certified production-ready code',
          'That practice used local Python edit → save → run',
          'That learner provider keys are not allowed on the core path',
          'That uncertainty should be visible when sources are missing',
        ],
        correct: 0,
        explanation:
          'Overclaiming automated certification is dishonest portfolio craft.',
      },
      {
        type: 'multiple_choice',
        question: 'What is a sensible capstone scope for this course?',
        options: [
          'One narrow feature with deep boundaries assembled from earlier local artifacts',
          'Twelve half-built products and three vendor SDKs',
          'A multi-region Kubernetes agent platform',
          'Fine-tuning a foundation model from scratch',
        ],
        correct: 0,
        explanation:
          'Depth on one reviewable feature beats shallow sprawl.',
      },
    ],
  },
  {
    slug: 'certificate',
    title: 'AI Fundamentals Certificate of Completion',
    hours: 'Outcome',
    sortOrder: 13,
    md: 'stage-13-certificate.md',
    quiz: [],
  },
]

const course = {
  slug: 'ai-fundamentals',
  title: 'AI Fundamentals for Builders',
  description:
    'Build practical AI application judgment through prompts, structured outputs, internal API-powered AI interaction, retrieval, workflows, guardrails, evaluation, and portfolio proof. Practice runs on your computer with Python 3: edit → save → run in a terminal. ASV Learn hosts the lesson text; your code runs in your own terminal, not inside the lesson page.',
  difficulty: 'Beginner-to-Builder',
  hours: '28-36',
  topics: [
    'AI Builders',
    'LLMs',
    'Prompt Engineering',
    'Internal APIs',
    'Structured Output',
    'RAG',
    'Evaluation',
    'Agents',
    'Guardrails',
  ],
  certBadges: ['AI Builder Foundations'],
  runtime: 'python',
  source: {
    fixture: 'content/courses/technodex-fixtures/ai-fundamentals.ts',
    live: 'https://technodex.io/courses/ai-fundamentals',
  },
  stages: stages.map(({ md, ...rest }) => ({
    ...rest,
    content: readFileSync(resolve(COURSE_DIR, md), 'utf8'),
  })),
}

const outPath = resolve(ROOT, 'content/courses/ai-fundamentals.json')
writeFileSync(outPath, JSON.stringify(course, null, 2) + '\n')
console.log(`wrote ${outPath} (${course.stages.length} stages)`)
