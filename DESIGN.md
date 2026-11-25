# Design system

Single-page editorial portfolio. One dark canvas, one ink ladder, one rationed
signal color, one italic serif for emphasis. Motion is choreography, not
decoration: it reveals the argument in the order the page makes it.

The previous macOS-desktop design (windows, dock, menu bar) was retired in
favour of a page that answers "who is this and why should I care" in the
first viewport, on a laptop or a phone.

## Page order

The page is an argument, top to bottom:

| # | Section | Job |
|---|---------|-----|
| — | Hero | Thesis, current employer, availability. WebGL field behind. Credential rail along the bottom edge. |
| — | Proof | Four numbers with the sentence that makes each meaningful. Count up on entry. |
| 01 | Work | Axira and Kaal as large cards with live visuals (agent pipeline diagram, phone mockup). Other projects as rows. |
| 02 | Experience | Timeline with a scroll-driven rail. Figures inside bullets are set in full ink. |
| 03 | About | Bio, "Now", education, toolkit, skills marquee. |
| 04 | Contact | Giant copy-to-clipboard email, GitHub, résumé, footer. |

Case studies live at `/work/[slug]` (long-form, sticky section headings,
reading progress bar). `/kaal` hosts the live Kaal engine demo. Old OS routes
(`/about`, `/work`, `/experience`, `/contact`, `/start`) redirect to anchors.

## Tokens (`app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#08080a` | Page ground |
| `--color-raised` / `-2` | `#0f0f12` / `#16161a` | Cards, visual panels |
| `--color-line` / `-strong` | white 8% / 14% | Hairlines, borders |
| `--color-ink` | `#f2f2f0` | Headlines, key figures |
| `--color-ink-muted` | `#a6a6ab` | Body |
| `--color-ink-subtle` | `#7c7c83` | Meta. Floor for small text |
| `--color-signal` | `#3dff7f` | Live dots, section indices, one hover accent. Never fills, never body text |

Kaal's rust (`rgba(181,86,62,…)`) appears only around Kaal's own visuals and in
the live demo, which renders in the product's identity.

## Type

- **Geist** (sans, variable): everything. Display set at weight 500, tracking −0.045em, line-height ~0.98 (`.display`).
- **Instrument Serif italic** (`.serif-em`): one or two emphasised words per headline, at most. This is the signature move; overusing it kills it.
- **JetBrains Mono** (`.eyebrow`): 11px uppercase labels, indices, code.

All fonts are self-hosted from `@fontsource` packages via `next/font/local`
(`app/fonts.ts`). No request to Google at build or run time.

## Shape

Cards `rounded-2xl`/`rounded-3xl`, pills `rounded-full`, hairline borders, no
heavy shadows. Max content width `max-w-6xl`, gutters `px-5 sm:px-8`, section
rhythm `py-24 md:py-36`.

## Motion

- Easing `cubic-bezier(0.16, 1, 0.3, 1)` everywhere; entrances 0.8–1.1s, stagger 0.045–0.1s.
- Scroll: Lenis on fine pointers only (touch keeps native momentum). Scroll-linked effects via Motion `useScroll`.
- Hero: word-by-word masked reveal; content drifts and fades as it scrolls away.
- WebGL hero field (`HeroShader.tsx`): rendered at half resolution, paused off-screen and in hidden tabs, single static frame under reduced motion, CSS gradient fallback without WebGL.
- `MotionConfig reducedMotion="user"` globally; CSS animations neutralised under `prefers-reduced-motion`.

## Mobile

Designed at 375px, not shrunk to it. No horizontal scroll from 320px, tap
targets ≥44px, nothing hover-only, scroll-pinned layouts collapse to stacks
below `md`.

## Sharing

- `/?for=Stripe` shows "Prepared for the Stripe team" above the headline. `/?for=Jane at Ramp` shows "Prepared for Jane at Ramp". Sanitised and length-capped.
- `app/opengraph-image.tsx` is the link-preview card. It is the first thing a recruiter sees in LinkedIn, email or Slack, so it carries the thesis, not just a name.
