import 'server-only'
import { send } from './resend'

// Non-billing transactional emails (welcome, contact). Same never-throw contract
// as the billing mails: fire-and-forget, no-op without RESEND_API_KEY.

export async function sendWelcomeAccountMail(args: { email: string; username?: string }): Promise<void> {
  const { email, username } = args
  await send(email, 'Welcome to ASV Labs Learn', {
    accentColor: '#991b1b',
    heading: 'Welcome to ASV Labs Learn',
    subtitle: username
      ? `Hey ${username}, we're glad you're here.`
      : "We're glad you're here.",
    body: "You're ready to start learning. Here's how to get going:",
    bulletPoints: [
      'Open Python Zero to Useful and start with Module 00 on your computer.',
      'Keep scripts in one folder and practice edit → save → run.',
      'Come back anytime — your place is saved.',
    ],
    cta: { label: 'Get started', href: '/' },
  })
}

export async function sendContactMail(args: {
  fromEmail: string
  name?: string
  message: string
  to?: string
}): Promise<void> {
  const { fromEmail, name, message, to } = args
  await send(to || 'hello@asv-labs.com', `New contact form message from ${name || fromEmail}`, {
    accentColor: '#991b1b',
    heading: 'New contact message',
    subtitle: `From ${name ? `${name} · ` : ''}${fromEmail}`,
    body: message,
  })
}

/**
 * PLACEHOLDER — course completion + social/share badge email.
 *
 * Not wired yet. Intended handoff for Vision (local Hermes) or Jarvis
 * (external Hermes) via Resend and/or AgentMail:
 *   - Trigger: learner completes a course / certificate stage
 *   - Attach or link: brand/asv-labs-learn/courses/<slug>/badge.png
 *   - Copy: congrats + share-ready badge (unofficial achievement graphic)
 *
 * Keep this a no-op until that integration lands.
 */
export async function sendCourseCompletionBadgeMail(_args: {
  email: string
  courseTitle: string
  courseSlug: string
  badgeUrl?: string
  verifyUrl?: string
}): Promise<void> {
  return
}

// NOTE: org-created / org-deleted / account-deleted confirmation emails are
// deliberately NOT sent from here. Unlike Stripe/billing mails (which the web
// webhook owns), user/org lifecycle is owned by apps/api, which has its own
// email service — those confirmations belong there to avoid duplicate sends.
