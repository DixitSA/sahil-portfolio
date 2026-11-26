# Design: The red pen

## World
A clean off-white sheet, near-black ink and one reviewer's red pen. The thesis is checking the model's work: put AI to work, check its work, ship what passes. The hero is a loss surface drawn as contour lines. It starts noisy; a graphite path runs real momentum gradient descent on it (the same function in GLSL and TypeScript) and the noise calibrates out as it converges. Only when it lands does red appear: a ring at the minimum and a double underline under the result. Colour otherwise comes from product UI. No grid, no gradients, no glow.

Rejected: uppercase tracked labels, 01/02 indices, marquees, collapsing menu pills, grids, neon, navy or gold, reveal-on-scroll, any framing as a banker.

## Color (light only)
| Token | Hex | Use |
|---|---|---|
| paper | `#F4F3EF` | ground |
| sheet | `#FBFAF8` | stages and frames |
| ink | `#161513` | headings, primary button |
| ink-2 | `#3D3B37` | body |
| ink-3 | `#605D57` | meta (14px minimum) |
| ink-hover | `#2B2A27` | primary hover |
| rule / rule-strong | `rgba(22,21,19,.12 / .26)` | hairlines, stage borders |
| field / on-field | `#161513` / `#F4F3EF` | the two inverse bands |
| on-field-2 | `#ABA79F` | secondary on field |
| rule-field | `rgba(244,243,239,.16)` | hairlines on field |
| mark / mark-on-field | `#B8360F` / `#FF7A4D` | passed review only |

The mark appears only where something passed review: converged ring, hero underline, Evidence underlines, email underline, pipeline gate marker, focus, selection. Never an area over 12px square, never body text. The descent path and dots are ink.

## Type
Hubot Sans display, Mona Sans text, JetBrains Mono for code only.
- `.t-hero`: 750, 112% width, lh .94, three explicit lines, up to 124px.
- `.t-mega`: Work and Contact h2. `.t-h3`: project names. `.t-ledger`: evidence results. `.t-statement`: the About pull line. `.t-hero-cs`: case-study h1. `.t-thesis`: the word-highlight sentence.
- `.t-h2`, `.t-result`, `.t-lead`, `.t-meta`, `.t-mono` as in globals.css. Body copy max 60ch. Nothing under 14px except the aria-hidden browser-bar URL.

## Motion
- Easing: `--ease-enter` for arrivals, `--ease-ui` for hover, `cubic-bezier(.3,0,.2,1)` for the path. Hover 150ms in, 120ms out; press 90ms.
- Hero timeline: lines rise at 120/210/300ms; the path draws 700 to 2100ms while noise decays to zero; the ring and underline land at 2100ms; the surface drifts until about 7s, then rests. Nothing moves on its own for more than 5s.
- Interaction: a fine pointer raises a hill under the cursor and the path re-solves each frame; a click or tap starts a new descent from that point (not on links, buttons or selections).
- Motion switch: `html[data-motion="off"|"on"]`, set before paint from localStorage or `prefers-reduced-motion`. Off renders one settled frame, no drift, no hill; clicks re-solve instantly. It affects only the two fields.
- Scroll moments: the thesis lights word by word; the Work stage is pinned with four chapters wiping up. Nothing else moves on scroll. Both follow OS reduced motion.
- View Transitions: root fades up, titles morph, the nav holds still. Off under reduced motion.
- Fallbacks: no WebGL keeps the ground and SVG path; no JS shows the drawn path and underlines; `html.cf-safe` un-hides after 4s.

## Space and shape
`.wrap`: max 1440px, gutters 16/32/48/64. Radius 4px on stages and frames, 6px on buttons; the one pill is the Motion switch. Stages are plain sheets with a hairline border.
