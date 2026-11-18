# Course completion badge email (placeholder)

**Status:** stub only — not sending.

Hook for Vision (local Hermes) or Jarvis (external Hermes):

- Function: `sendCourseCompletionBadgeMail` in `apps/web/services/emails/transactional.ts` (no-op)
- Assets: `brand/asv-labs-learn/courses/<slug>/badge.png` (+ `badge-source.png`)
- Suggested providers: existing Resend path, or AgentMail once authenticated
- Trigger (later): course / certificate completion

Do not ship real completion mail until badge share copy and provider wiring are reviewed.
