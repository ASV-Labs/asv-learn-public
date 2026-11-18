# ASV Labs Learn global navigation return link

Page file: `apps/web/components/Objects/Menus/OrgMenu.tsx` (shared authenticated Learn shell)

Project/topic: ASV Labs Learn global navigation
Page or site type: learning-program
Primary audience: signed-in learners moving through courses, lessons, progress, and account tools
Primary user action: continue the current learning task
Secondary user action: return to the ASV Labs platform
Emotional tone: precise, calm, trustworthy
Content density: compact utility shell
Device priority: mobile and desktop parity
Interaction level: low
Motion level: none
Trust requirement: high
Conversion pressure: none
Implementation stack: Next.js, React, TypeScript, Tailwind CSS

Site type: learning-program
Audience: signed-in ASV Labs Learn users
Primary action: continue learning without losing orientation
Tone: precise, calm, trustworthy
Selected composition: guided-lesson-room with a subject-shaped utility shell
Why this composition fits: the existing page remains the actual course or lesson surface; the new link is a subordinate way out of the learning product, not a competing destination or marketing block.
Style atlas match: structured, encouraging, clear, low-friction
Reference/pattern moves borrowed (max 3): subject-shaped IA; restrained utility link; mobile disclosure inside the existing menu
Card budget for this site type / cards used / justification if > 0: 0 / 0 / no cards introduced
Forbidden defaults rejected: equal-height card wall; three columns under a centered hero; fake dashboard screenshot / invented product UI; pointless KPI strip; stock-icon feature grid; repeated two-column zig-zag sections; unearned gradient blob background; giant testimonial card row. None fits a global navigation utility.
Product imagery provenance: none
Motion behavior: no animation beyond the existing menu disclosure; reduced-motion behavior is unchanged.
Responsive behavior (mobile composed, not squeezed): desktop receives one quiet text utility beside the existing product navigation; mobile receives the same destination as a full 44px row inside the existing menu.
Accessibility fallback (reduced-motion, keyboard, no-JS): native anchor semantics, visible focus, exact accessible name `ASV Labs home`, and no script dependency for the destination once the menu is rendered.
Performance risk: negligible; one static anchor, no image, icon, script, font, or network dependency is added.

Signature conformance: the existing lesson/course surface remains first and functional. The change does not add a marketing hero or dashboard panels for reading.

