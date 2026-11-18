/**
 * Convert catalog quiz arrays into a TipTap blockQuiz node.
 * Hides answers until the learner selects and submits (native Quiz UI).
 */
import { randomUUID } from 'node:crypto'

export function quizToTipTapNode(quiz) {
  if (!Array.isArray(quiz) || !quiz.length) return null
  return {
    type: 'blockQuiz',
    attrs: {
      quizId: randomUUID(),
      questions: quiz.map((q) => ({
        question_id: randomUUID(),
        question: q.question || '',
        type: q.type === 'custom_answer' ? 'custom_answer' : 'multiple_choice',
        answers: (q.options || []).map((opt, oi) => ({
          answer_id: randomUUID(),
          answer: String(opt),
          correct: oi === q.correct,
        })),
      })),
    },
  }
}

/** Append concept-check heading + interactive quiz to a TipTap doc. */
export function appendQuizToDoc(doc, quiz) {
  const node = quizToTipTapNode(quiz)
  if (!node) return doc
  const content = [...(doc.content || [])]
  content.push({
    type: 'heading',
    attrs: { level: 2 },
    content: [{ type: 'text', text: 'Concept check' }],
  })
  content.push({
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Pick an answer for each question, then submit to see what you got right.',
      },
    ],
  })
  content.push(node)
  return { ...doc, content }
}
