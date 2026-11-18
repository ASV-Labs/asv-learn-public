# ASV Labs Learn course intro video delivery

Project/topic: Safari-compatible delivery of the existing ASV Labs Learn course intro videos.
Page or site type: learning-program.
Primary audience: learners opening a public course in Safari, Chromium, or Firefox.
Primary user action: play the real course introduction.
Secondary user action: switch back to the authored course image when both media types are available.
Emotional tone: direct, calm, instructional.
Content density: unchanged.
Device priority: mobile and desktop parity.
Interaction level: low; native video controls only.
Motion level: source video only; no decorative page motion.
Trust requirement: high.
Conversion pressure: none.
Implementation stack: existing LearnHouse Next.js course surface, FastAPI local-content delivery, nginx, and Cloudflare.

Site type: learning-program.
Audience: learners using Safari, Chromium, or Firefox.
Primary action: play the existing source-bound course introduction.
Tone: direct, calm, instructional.
Selected composition: guided lesson room, inherited without visual or structural change.
Why this composition fits: this correction repairs the media transport beneath the accepted course page. It does not add a new section, hero, gallery, or promotional composition.
Style atlas match: inherited ASV Labs Learn course-room presentation.
Reference/pattern moves borrowed (max 3): native video controls; honest image fallback; browser-compatible byte-range delivery.
Card budget for this site type / cards used / justification if > 0: 0 / 0 / no visual construction is added.
Forbidden defaults rejected (from the list of 8): equal-height card wall; three columns under a centered hero; fake dashboard screenshot or invented product UI; pointless KPI strip; stock-icon feature grid; repeated two-column zig-zag sections; unearned gradient blob background; giant testimonial card row. None is introduced by this transport repair.
Product imagery provenance: captured-from-product @ existing ASV Labs Learn authored course-intro MP4 and paired course image; the files and their course bindings remain unchanged.
Motion behavior: the course video plays only on learner action or the existing muted autoplay path; no new animation is introduced.
Responsive behavior (mobile composed, not squeezed): the existing aspect-ratio media region and native controls remain unchanged at every breakpoint.
Accessibility fallback (reduced-motion, keyboard, no-JS): native controls remain keyboard-accessible; the paired course image remains the deterministic fallback; no new JavaScript is required.
Performance risk: Cloudflare must not transform or cache the MP4 representation in a way that removes byte-range semantics. The origin must return `206 Partial Content`, `Accept-Ranges: bytes`, and a correct `Content-Range` for Safari probes.

## WDI disposition

This is a transport correction, not a redesign. WDI requires the accepted course composition and media provenance to remain stable. Any fix that replaces the course intro with a screenshot, invented player, decorative animation, or new page construction is rejected.
