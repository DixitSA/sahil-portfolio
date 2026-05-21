# Design System — Sahil Portfolio

Generated from codebase. Source of truth for tokens, typography, spacing, and component patterns.

---

## Color Tokens

Defined in `app/globals.css` `@theme` block. Use `var(--token)` to reference in CSS; in Tailwind v4 these are available as `bg-(--color-bg)` etc.

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#080808` | Page background, dark surface |
| `--color-indigo` | `#6366f1` | Primary accent — timeline, dots, active states, CTAs |
| `--color-gold` | `#f59e0b` | Reserved (unused — legacy NoTrace section) |
| `--color-surface` | `#111111` | Elevated cards, Stack badges |
| `--color-border` | `#1f1f1f` | Hard borders (unused in components — use `rgba` variants instead) |
| `--color-muted` | `#6b7280` | Reference only — never use directly; see Text Colors |
| `--font-display` | `'Instrument Serif', Georgia, serif` | All display headings |
| `--font-body` | `'DM Sans', system-ui, sans-serif` | All body copy, labels, tags |

### Inline Color Scale (Tailwind)

Components use inline `rgba` or Tailwind utility classes. Established precedents:

| Role | Class / Value | Contrast on #080808 | WCAG AA |
|---|---|---|---|
| Headings | `text-white` | 18.1:1 | Pass |
| Primary body | `text-gray-400` (#9ca3af) | ~6.0:1 | Pass |
| Secondary body | `text-gray-500` (#6b7280) | ~3.9:1 | Fail large text only |
| Decorative only | `text-gray-600` (#4b5563) | ~2.8:1 | Fail — decorative use only |
| Purely visual | `text-gray-700` (#374151) | ~2.1:1 | Fail — never on text |
| Indigo accent | `#6366f1` / `indigo-500` | — | — |
| Indigo dim | `rgba(99,102,241,0.2–0.55)` | — | Decorative only |
| Surface | `#111` / `bg-[#111]` | — | Card backgrounds |
| Border subtle | `rgba(255,255,255,0.04–0.08)` | — | Section dividers |
| Border medium | `rgba(255,255,255,0.06–0.1)` | — | Interactive borders |

**Rule:** `text-gray-400` is the floor for any readable text. `text-gray-500` is acceptable for large (18px+) secondary labels only. `gray-600` and below are decorative (row numbers, divider dots, purely visual spans).

---

## Typography

### Fonts

```css
/* Loaded via Google Fonts in globals.css */
font-family: 'Instrument Serif', Georgia, serif;   /* display */
font-family: 'DM Sans', system-ui, sans-serif;     /* body */
```

### Scale

| Role | Size | Family | Style | Weight |
|---|---|---|---|---|
| Hero headline | `clamp(64px, 10vw, 120px)` | Instrument Serif | italic | 400 |
| Section heading | `clamp(36px, 5vw, 56px)` | Instrument Serif | italic | 400 |
| Stack heading | `clamp(42px, 5.5vw, 72px)` | Instrument Serif | italic | 400 |
| Company name | `clamp(22px, 2.8vw, 30px)` | Instrument Serif | italic | 400 |
| Contact heading | `clamp(56px, 10vw, 120px)` | Instrument Serif | italic | 400 |
| Project row name | `clamp(28px, 4vw, 48px)` | Instrument Serif | italic | 400 |
| Stat number | `text-lg` (18px) | DM Sans | normal | 500 |
| Body copy | `text-base` (16px), `leading-8` | DM Sans | normal | 400 |
| Body small | `text-sm` (14px), `leading-relaxed` | DM Sans | normal | 400 |
| Role/subtitle | `text-sm` (14px) | DM Sans | normal | 400 |
| Tags / badges | `text-xs` (12px) | DM Sans | normal | 400 |
| Overline labels | `text-[10px]`, `tracking-[0.2em]`, uppercase | DM Sans | normal | 400 |
| Meta / dates | `text-xs`, `tracking-wide` | DM Sans | normal | 400 |
| Eyebrow | `text-[11px]`, `tracking-[0.2em]`, uppercase | DM Sans | normal | 400 |
| Footer copy | `text-[11px]`, `tracking-widest`, uppercase | DM Sans | normal | 400 |

---

## Spacing & Layout

### Page

- Max content width: `max-w-6xl` (72rem) with `mx-auto px-6`
- Section padding: `py-24 px-6` (standard), `py-32` (Contact)
- Section dividers: `border-t border-white/[0.04]`

### Grid

| Component | Grid | Notes |
|---|---|---|
| About | `md:grid-cols-2 gap-16` | Bio left, stats right |
| Stack | `md:grid-cols-[1fr_2fr] gap-16` | Heading left sticky, badges right |
| Stack badges | `sm:grid-cols-2 gap-10` | 4 groups |
| Footer | `grid-cols-1 gap-4 md:grid-cols-3 md:gap-0` | Stacks on mobile |

### Timeline (Experience)

- Left rule: `w-px absolute`, `rgba(99,102,241,0.2)`
- Dot: 9×9px, `border: 2px solid rgba(99,102,241,0.55)`, background `#080808`, `left: -4px top: 14px`
- Entry padding: `pl-10 pb-14`, last has `last:pb-0`

---

## Component Patterns

### MagneticLink (Navbar)

Magnetic hover using `useMotionValue` + `useSpring` (stiffness 300, damping 25). Movement factor 0.35. Animated underline via `scale-x-0 → scale-x-100` on `origin-left`. Active state: `text-white` + `scale-x-100` underline always visible.

Focus: `focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]`

### ProjectRow (Work)

List rows with custom cursor hidden. Hover: row shifts `x: 8` via `motion.div animate`, background fades to `rgba(99,102,241,0.04)`. Preview card (gradient swatch) floats at cursor via `useMotionValue` + `useTransform` — zero React re-renders on `mousemove`.

### Stack Badge

`bg-[#111] border border-white/[0.07] rounded-lg`. Hover: `borderColor → rgba(99,102,241,0.45)`, `color → #fff`. No box shadow.

### Stat Row (About)

Divider list: `border-t border-white/[0.06]` top, `border-b border-white/[0.06]` per entry. `py-5` per row. No card backgrounds. Number `text-white font-medium text-lg`, subtitle `text-gray-500 text-sm`.

### Overline Label

Pattern used in Work and Stack sections:
```tsx
<p className="text-[10px] text-indigo-400/80 tracking-[0.2em] uppercase mb-2"
   style={{ fontFamily: "'DM Sans', sans-serif" }}>
  Label
</p>
```

---

## Motion

### Easing

- Standard ease: `[0.22, 1, 0.36, 1]` — fast-out-slow-in, used across all fade/slide anims
- Spring (magnetic): `stiffness: 300, damping: 25`
- Spring (row indent): `stiffness: 400, damping: 30`
- Exit transitions: `duration: 0.2, ease: "easeOut"`

### Fade-up pattern

```ts
const fadeUp = {
  hidden: { opacity: 0, y: 24–30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6–0.7, delay: i * 0.12–0.15, ease: [0.22, 1, 0.36, 1] }
  }),
};
// Trigger: useInView with { once: true, margin: "-80px" to "-100px" }
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track, .marquee-track-reverse, .scroll-indicator { animation: none; }
  * { transition-duration: 0.01ms !important; }
}
```

Framer Motion does not auto-respect this — components should check `useReducedMotion()` for complex animations if adding new ones.

---

## Texture & Atmosphere

- **Grain**: `body::before` SVG feTurbulence noise, `baseFrequency: 0.75`, `opacity: 0.04`, fixed full-viewport, `z-index: 9999`, pointer-events none
- **Custom cursor**: `cursor: none` on body. `@media (pointer: coarse)` restores `cursor: auto` for touch
- **Indigo ambient glow** (Contact): `radial-gradient(ellipse 70% 60% at 50% 110%, rgba(99,102,241,0.06))`
- **Ghost word** (Contact): `"AVAILABLE"` at `clamp(80px,18vw,260px)`, `opacity: 0.06`, `aria-hidden`
- **Marquee**: dual-track CSS-only infinite scroll, `40s linear infinite`, reversed second track. `aria-hidden` on container.

---

## Accessibility Checklist

| Item | Status |
|---|---|
| All decorative elements `aria-hidden` | Done (marquee, timeline dots/line, bullet dots, ghost word, chevron) |
| Hamburger `aria-expanded` + `aria-controls` | Done |
| Nav links `focus-visible` ring | Done |
| Hamburger 44px touch target (`p-3`) | Done |
| `prefers-reduced-motion` CSS block | Done |
| WCAG AA contrast — primary text (gray-400+) | Done |
| WCAG AA contrast — secondary (gray-500 large text) | Marginal — monitor |
| Skip-to-content link | Not implemented |
| `<html lang="en">` | Check layout.tsx |

---

## Anti-Patterns (banned)

- Side-stripe `border-left` accents
- Gradient text (`background-clip: text`)
- Glassmorphism as default
- Hero metric template (big number + small label)
- Identical card grids
- `boxShadow` glow on hover (use `borderColor` shift instead)
- Em dashes in copy
