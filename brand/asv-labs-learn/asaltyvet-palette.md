# ASV Labs Learn brand tokens

Unified product palette for the LMS fork, course media, auth, and email.

| Token | Hex | Use |
| --- | --- | --- |
| ink | `#090b08` | Org primary / header / primary CTAs |
| field | `#101827` | Dark panels, logo plate, dash chrome |
| accent | `#991b1b` | Learn mark rule, links-of-weight, email accent |
| paper | `#fffaf1` | Soft surfaces, hero art ground, auth paper wash |
| paper-deep | `#e8e3d3` | Secondary paper / course thumbnail letterbox |
| muted | `#a7aa9f` | Secondary text |
| olive | `#8fa273` | Supporting accent only (ASV parent site kinship) |

## Rules

1. Primary CTA = `ink` (or near-black), never loud red for destructive-looking actions on learning pages.
2. Leave / remove actions = quiet secondary text, not a full-width red button.
3. AI / Copilot accents use `field` + `accent`, not purple gradients.
4. Auth gradient fallback uses ink/field + warm paper grid — never blue blueprint SaaS defaults.
5. Course intro/hero media already use paper + field + accent; keep them aligned.

Org primary on local community: `#090b08`.
Email accent: `#991b1b`.
