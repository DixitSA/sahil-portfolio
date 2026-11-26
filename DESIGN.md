# Design: The computation pad

## World
The page is an engineer's computation pad: pale green paper, a faint grid, graphite lettering, and one convention: **the answer gets a red-pencil double underline**. That mark is the thesis: he finds the number that matters, works it out in the open, and underlines it. The one live effect is a loss surface drawn as contour lines on the pad's grid, behind real product UI. Real screens (Vazaar's browser window, Kaal on web and iPhone, the MCP pipeline) sit on the pad like taped-in printouts. A deep pad-green field runs edge to edge twice, for the evidence ledger and the close; only one is on screen at a time. Type is GitHub's own family: Hubot Sans display, Mona Sans text, set wide and bold like drafting lettering. The ground is light because the scene is daylight, often a phone opened from an email.

Rejected: black canvas, neon green, grain and glow, Geist, italic serif accents, mono uppercase kickers, numbered labels, pill chips, stat strips, nested cards, floating chips, reveal-on-scroll, any framing as a banker.

## Color (light only)
| Token | Hex | Use |
|---|---|---|
| paper | `#E7EDE1` | page ground |
| sheet | `#F4F7F0` | stage and frame grounds |
| ink | `#18201A` | headings, primary text, primary button |
| ink-2 | `#3B4A3E` | body |
| ink-3 | `#56655A` | meta (14px minimum) |
| ink-hover | `#2A352C` | primary button hover |
| rule / rule-strong | `rgba(24,32,26,.16/.32)` | hairlines / stage borders |
| grid | `rgba(30,74,52,.10)` | 24px grid inside `.stage` only |
| field | `#1E4A34` | the two full-bleed bands |
| on-field / on-field-2 | `#EEF3EA` / `#B8CCBB` | text on field |
| rule-field | `rgba(238,243,234,.22)` | hairlines on field |
| mark / mark-on-field | `#B23A0B` / `#F59A6B` | answer underline, focus ring, selection, caret |

The mark never fills an area and is never body text.

## Type
Hubot Sans (display, wdth 106%), Mona Sans (text), JetBrains Mono (code, URLs, tags only). Classes: `.t-display`, `.t-h2`, `.t-h3`, `.t-result`, `.t-hero-cs`, `.t-lead`, `.t-meta`, `.t-mono`. Body 16px phone, 17px desktop, line-height 1.65, max 68ch. Nothing below 14px except the aria-hidden 13px browser-bar URL.

## Space and shape
- `.wrap`: max 1440px, gutters 16/32/48/64. 12 columns, 24px gap from lg.
- Sections: 128px vertical from lg, 88px on a phone. More space above a heading than below.
- Radii: 4px frames, stages and inputs; 6px buttons; 28/22px phone bezel and screen. No pills.
- Borders: 1px rule; browser frames 1px ink; stages 1px rule-strong. Shadow on frames only.

## Motion
Easing `--ease-ui` and `--ease-enter`. Hover 150ms in, 120ms out; press 90ms. The hero load is pure CSS and visible without JS: words rise from masks, lead and buttons fade up, the stage settles, then the double underline draws under "277 commits". The contour shader is the one effect: it pauses offscreen, renders one frame under reduced motion, and falls back to the grid. The AgentPipeline packet loops only in view. Nothing else animates: no section reveals, parallax, counters or timelines. Reduced motion skips every entrance.
