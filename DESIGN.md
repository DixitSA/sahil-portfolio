---
version: 1.0
name: Sahil-Dixit-Portfolio-design-system
description: A systems-register personal portfolio. Near-black canvas, an all-monospace typographic voice, sharp rectangular geometry, and two strictly-rationed signal colors borrowed from terminal semantics: green for live state, amber for structural labels. Elevation is carried by hairlines and surface contrast, never by shadow. The aesthetic argues that its author thinks in systems, so the system itself has to be airtight.

colors:
  # Signal (chromatic)
  primary: "#00ff41"           # terminal green. LIVE STATE ONLY
  on-primary: "#0a0a0a"
  primary-dim: "rgba(0,255,65,0.55)"
  primary-ghost: "rgba(0,255,65,0.10)"
  label: "#f0b429"             # terminal amber. STRUCTURAL LABELS ONLY
  label-dim: "rgba(240,180,41,0.55)"

  # Surfaces
  canvas: "#0a0a0a"
  surface-1: "#0d0d0d"
  surface-2: "#111111"
  surface-3: "#161616"
  hairline: "#1e1e1e"
  hairline-strong: "#2a2a2a"

  # Ink ladder
  ink: "#e8e8e8"               # 16.2:1  headlines
  ink-muted: "#9a9a9a"         #  7.0:1  body copy
  ink-subtle: "#8a8a8a"        #  5.7:1  meta, dates, secondary labels
  ink-faint: "#6a6a6a"         #  3.7:1  indices, disabled. LARGE TEXT ONLY
  ornament: "#2a2a2a"          #  non-text. Ghost type, rules-as-texture

  # OS chrome
  desktop: "#070707"                        # deeper than canvas. The wallpaper ground
  chrome-menubar: "rgba(14,14,14,0.72)"     # + backdrop-blur(20px) saturate(180%)
  chrome-window: "rgba(17,17,17,0.88)"      # + backdrop-blur(24px)
  chrome-titlebar: "#161616"                # focused window title bar
  chrome-titlebar-inactive: "#101010"       # unfocused window title bar
  chrome-dock: "rgba(20,20,20,0.60)"        # + backdrop-blur(28px) saturate(180%)
  chrome-border: "#2a2a2a"                  # unfocused window border
  chrome-border-focused: "#3a3a3a"          # focused window border
  selection: "rgba(0,255,65,0.14)"          # icon + text selection fill
  selection-border: "rgba(0,255,65,0.45)"   # selection outline

  # Traffic lights. Licensed quotation, focused window only. See OS Shell section.
  tl-close: "#ff5f57"
  tl-minimize: "#febc2e"
  tl-zoom: "#28c840"
  tl-inactive: "#3a3a3a"

typography:
  display-xl:
    fontFamily: JetBrains Mono, ui-monospace, SFMono-Regular, monospace
    fontSize: clamp(48px, 8vw, 104px)
    fontWeight: 300
    lineHeight: 0.94
    letterSpacing: -0.045em
    textTransform: uppercase
  display-lg:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: clamp(34px, 5vw, 60px)
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: -0.035em
    textTransform: uppercase
  display-md:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: clamp(24px, 3vw, 36px)
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-sm:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  mono-md:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  mono-sm:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  eyebrow:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.22em
    textTransform: uppercase
  index:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: 11px
    fontWeight: 300
    letterSpacing: 0.1em
  caption:
    fontFamily: JetBrains Mono, ui-monospace, monospace
    fontSize: 10px
    fontWeight: 400
    letterSpacing: 0.14em
    textTransform: uppercase

rounded:
  none: 0px      # default for everything INSIDE a window
  xs: 2px        # status pills, tag chips
  sm: 4px        # maximum permitted radius for content
  window: 10px   # OS chrome ONLY. Licensed exception, see OS Shell
  dock: 16px     # the dock slab ONLY
  full: 9999px   # status dots, traffic lights, dock icons

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 40px
  3xl: 64px
  4xl: 96px
  section: 128px

  # OS metrics
  menubar-height: 28px
  titlebar-height: 32px
  dock-height: 64px
  dock-icon: 48px
  dock-icon-max: 72px      # magnified
  desktop-icon: 72px       # glyph box, label sits below
  desktop-gutter: 24px     # inset from viewport edges
  window-min-w: 480px
  window-min-h: 320px
  resize-handle: 8px       # invisible hit area on each edge

zindex:
  desktop: 0
  desktop-icon: 10
  window-base: 100         # incremented by 1 per focus event
  window-ceiling: 899      # renormalize the stack when any window reaches this
  dock: 900
  menubar: 1000
  menu-dropdown: 1010
  spotlight: 1100
  boot: 9000
  grain: 9999

motion:
  ease-standard: "cubic-bezier(0.22, 1, 0.36, 1)"
  ease-exit: "cubic-bezier(0.4, 0, 1, 1)"
  duration-micro: "120ms"
  duration-ui: "200ms"
  duration-reveal: "600ms"
  stagger: "80ms"
  spring-magnetic: "stiffness 300, damping 25"
  spring-row: "stiffness 400, damping 30"
  # OS shell
  spring-window-open: "stiffness 260, damping 26, mass 0.9"
  spring-dock-magnify: "stiffness 400, damping 28"
  duration-window-close: "160ms"
  duration-minimize: "280ms"
  duration-spotlight: "140ms"
  drag-momentum: "none"    # windows stop where released. No inertia.

components:
  nav-bar:
    backgroundColor: "rgba(10,10,10,0.72)"
    backdropFilter: "blur(12px)"
    borderColor: "{colors.hairline}"
    typography: "{typography.mono-sm}"
    padding: "{spacing.md} {spacing.xl}"
  nav-link:
    textColor: "{colors.ink-subtle}"
    textColorActive: "{colors.ink}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.none}"
    underline: "1px solid {colors.primary}"
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.primary}"
    typography: "{typography.mono-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.xl}"
    hover: "backgroundColor {colors.primary}, textColor {colors.on-primary}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.mono-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.xl}"
  eyebrow-label:
    textColor: "{colors.label}"
    typography: "{typography.eyebrow}"
    marginBottom: "{spacing.md}"
  status-pill:
    backgroundColor: "{colors.primary-ghost}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "{spacing.xxs} {spacing.sm}"
  status-dot:
    backgroundColor: "{colors.primary}"
    size: "6px"
    rounded: "{rounded.full}"
    animation: "pulse 2s ease-in-out infinite"
  tag-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-subtle}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "{spacing.xxs} {spacing.sm}"
  project-row:
    backgroundColor: "transparent"
    backgroundColorHover: "{colors.surface-1}"
    borderColor: "{colors.hairline}"
    indexTypography: "{typography.index}"
    nameTypography: "{typography.display-md}"
    descTypography: "{typography.body-sm}"
    padding: "{spacing.xl} 0"
    hoverTransform: "translateX(8px)"
  preview-card:
    backgroundColor: "{colors.surface-2}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
    aspectRatio: "16 / 10"
  timeline-rail:
    color: "{colors.hairline-strong}"
    width: "1px"
    nodeSize: "7px"
    nodeBorder: "1px solid {colors.label-dim}"
    nodeBackground: "{colors.canvas}"
    entryPadding: "0 0 {spacing.2xl} {spacing.2xl}"
  stat-row:
    borderColor: "{colors.hairline}"
    valueTypography: "{typography.mono-md}"
    valueColor: "{colors.ink}"
    labelTypography: "{typography.body-sm}"
    labelColor: "{colors.ink-subtle}"
    padding: "{spacing.lg} 0"
  stack-badge:
    backgroundColor: "{colors.surface-2}"
    borderColor: "{colors.hairline}"
    borderColorHover: "{colors.primary-dim}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm} {spacing.md}"
  section-band:
    backgroundColor: "{colors.canvas}"
    borderTop: "1px solid {colors.hairline}"
    padding: "{spacing.section} {spacing.xl}"
    maxWidth: "1152px"
  footer:
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    borderTop: "1px solid {colors.hairline}"
    padding: "{spacing.3xl} {spacing.xl}"

  # ── OS shell ────────────────────────────────────────
  menu-bar:
    height: "{spacing.menubar-height}"
    backgroundColor: "{colors.chrome-menubar}"
    backdropFilter: "blur(20px) saturate(180%)"
    borderBottom: "1px solid {colors.hairline}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-sm}"
    padding: "0 {spacing.md}"
    zIndex: "{zindex.menubar}"
    position: "fixed top"
  menu-bar-item:
    textColor: "{colors.ink-muted}"
    textColorActive: "{colors.ink}"
    backgroundColorOpen: "{colors.selection}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xxs} {spacing.sm}"
  menu-bar-status:
    textColor: "{colors.ink-subtle}"
    typography: "{typography.mono-sm}"
    gap: "{spacing.md}"
    items: "availability dot, local clock"
  menu-dropdown:
    backgroundColor: "{colors.chrome-window}"
    backdropFilter: "blur(24px)"
    borderColor: "{colors.chrome-border-focused}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} 0"
    minWidth: "200px"
    itemPadding: "{spacing.xs} {spacing.md}"
    itemHoverBackground: "{colors.selection}"
    zIndex: "{zindex.menu-dropdown}"
  window:
    backgroundColor: "{colors.chrome-window}"
    backdropFilter: "blur(24px)"
    borderColor: "{colors.chrome-border}"
    borderColorFocused: "{colors.chrome-border-focused}"
    rounded: "{rounded.window}"
    minWidth: "{spacing.window-min-w}"
    minHeight: "{spacing.window-min-h}"
    overflow: "hidden"
    opacityUnfocused: 0.92
  window-titlebar:
    height: "{spacing.titlebar-height}"
    backgroundColor: "{colors.chrome-titlebar}"
    backgroundColorUnfocused: "{colors.chrome-titlebar-inactive}"
    borderBottom: "1px solid {colors.hairline}"
    textColor: "{colors.ink-subtle}"
    textColorFocused: "{colors.ink}"
    typography: "{typography.mono-sm}"
    titleAlign: "center"
    cursor: "grab / grabbing while dragging"
  traffic-light:
    size: "12px"
    gap: "{spacing.sm}"
    inset: "{spacing.md}"
    rounded: "{rounded.full}"
    colorUnfocused: "{colors.tl-inactive}"
    colorClose: "{colors.tl-close}"
    colorMinimize: "{colors.tl-minimize}"
    colorZoom: "{colors.tl-zoom}"
    glyphOnGroupHover: "x, minus, arrows. {colors.on-primary} at 60% opacity"
    hitArea: "20px"
  window-body:
    backgroundColor: "{colors.canvas}"
    padding: "{spacing.xl}"
    overflowY: "auto"
    rounded: "{rounded.none}"
  desktop:
    backgroundColor: "{colors.desktop}"
    backgroundImage: "24px dot grid, rgba(255,255,255,0.03)"
    padding: "{spacing.desktop-gutter}"
  desktop-icon:
    size: "{spacing.desktop-icon}"
    glyph: "1px stroke SVG, {colors.ink-muted}"
    labelTypography: "{typography.caption}"
    labelColor: "{colors.ink-muted}"
    labelBackgroundSelected: "{colors.selection}"
    borderSelected: "1px solid {colors.selection-border}"
    rounded: "{rounded.sm}"
    layout: "right-aligned column, top-down, 96px pitch"
  dock:
    height: "{spacing.dock-height}"
    backgroundColor: "{colors.chrome-dock}"
    backdropFilter: "blur(28px) saturate(180%)"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.dock}"
    padding: "{spacing.sm}"
    gap: "{spacing.sm}"
    zIndex: "{zindex.dock}"
    position: "fixed bottom center, {spacing.md} from edge"
  dock-item:
    size: "{spacing.dock-icon}"
    sizeMagnified: "{spacing.dock-icon-max}"
    rounded: "{rounded.full}"
    runningIndicator: "3px dot, {colors.primary}, below icon"
    transform: "scale only. Never width/height"
    spring: "{motion.spring-dock-magnify}"
  spotlight:
    width: "min(560px, 90vw)"
    backgroundColor: "{colors.chrome-window}"
    backdropFilter: "blur(32px)"
    borderColor: "{colors.chrome-border-focused}"
    rounded: "{rounded.window}"
    inputTypography: "{typography.display-sm}"
    resultTypography: "{typography.mono-md}"
    resultHoverBackground: "{colors.selection}"
    padding: "{spacing.lg}"
    zIndex: "{zindex.spotlight}"
    trigger: "Cmd+K / Ctrl+K"
---

## Overview

This is a personal portfolio operating in a systems register. The canvas is `{colors.canvas}` `#0a0a0a`, near-black without a color cast, carrying a 24px dot-grid at 3% white so the page reads as ruled engineering paper rather than a void. Type is monospace almost everywhere: headlines, navigation, labels, indices, and status all sit in JetBrains Mono, with a neutral grotesque reserved exclusively for paragraphs longer than one line. Geometry is rectangular by default. Radii above 4px do not exist in the system, and shadows do not exist at all.

The decoration budget is deliberately near-zero. There is one full-viewport SVG grain overlay at 4% opacity, one dot-grid, and a set of hairline rules. That is the entire atmospheric system. Everything else is content: a boot sequence, a marquee, a timeline, a project list with cursor-tracked screenshot previews, and a stack inventory.

Two chromatic signals carry the whole brand, and their separation is the single most important rule in this document. `{colors.primary}` terminal green means **live state** and nothing else. `{colors.label}` terminal amber means **structural label** and nothing else. In a real terminal, green is success and amber is attention. The site inherits that grammar literally, which is what keeps two accents from reading as indecision.

**Key Characteristics:**
- Monospace is the primary voice, not an accent face. The sans exists only to make paragraphs readable.
- Hairlines and surface contrast carry every level of elevation. `box-shadow` is banned outright.
- Sharp rectangles by default. `{rounded.sm}` 4px is the ceiling; `{rounded.full}` is licensed only for the 6px live-status dot.
- Two accents with mutually exclusive semantic jobs, plus a hard density budget of one green element per viewport.
- A four-step ink ladder where every step has a measured contrast ratio and a named job.
- Sentence-level copy is specific and unadorned. Numbers over adjectives, always.
- The page is a document, not a deck. Sections are bands separated by 1px rules, never floating cards.
- **The shell is a macOS-style desktop.** Projects are files, sections are applications, navigation happens by opening windows. The metaphor is committed to completely, and it is subordinate to real routes and server-rendered content. See OS Shell.

**Reference lineage.** ClickHouse supplies the structure: identical near-black canvas, a stepped surface ladder, and a single high-voltage accent used sparingly. Warp supplies the restraint: tight radii, hairline elevation, no shadows, and display type set at a light weight rather than a heavy one. opencode.ai supplies the typographic nerve to run monospace everywhere and treat bracket glyphs as the icon system. Linear supplies the rule that product screenshots do the persuading while the chrome stays quiet.

## Colors

### Signal

- **Terminal Green** (`{colors.primary}` `#00ff41`, 14.5:1 on canvas): **Live state only.** Permitted on: the availability status dot and pill, the blinking cursor glyph, boot-sequence output, the active navigation underline, primary CTA border and hover fill, and the focus ring. Forbidden on: section headings, body copy, decorative rules, tag chips, and any element that is not communicating something currently happening.
- **Terminal Amber** (`{colors.label}` `#f0b429`, 10.6:1 on canvas): **Structural labels only.** Permitted on: section eyebrows, project indices, timeline nodes, and column headers. Forbidden on: anything interactive. Amber never indicates state and is never a hover target. If a user could click it, it is not amber.

**Density budget.** No more than one green element visible per viewport at desktop scroll positions. Amber may appear at most twice per section. If a design needs a third signal, it needs less content, not more color.

### Surfaces

A four-step ladder climbing away from the canvas in even increments. Steps are close together on purpose; the separation between panels comes from hairlines, not from luminance jumps.

- **Canvas** (`{colors.canvas}` `#0a0a0a`): The only page background. Every section band sits directly on it.
- **Surface 1** (`{colors.surface-1}` `#0d0d0d`): Row hover states. The faintest possible acknowledgement of the pointer.
- **Surface 2** (`{colors.surface-2}` `#111111`): Default panel fill. Stack badges, preview cards, inset blocks.
- **Surface 3** (`{colors.surface-3}` `#161616`): The highest surface. Reserved for content sitting on top of another surface.
- **Hairline** (`{colors.hairline}` `#1e1e1e`): 1px section dividers and default borders.
- **Hairline Strong** (`{colors.hairline-strong}` `#2a2a2a`): 1px borders that need to be seen, such as tag chips and the timeline rail.

### Ink

Four text steps, each with a verified contrast ratio against `#0a0a0a` and exactly one job. Nothing outside this ladder is a legal text color.

| Token | Value | Contrast | Job | WCAG |
|---|---|---|---|---|
| `{colors.ink}` | `#e8e8e8` | 16.2:1 | Headlines, project names, emphasis | AAA |
| `{colors.ink-muted}` | `#9a9a9a` | 7.0:1 | Body copy, paragraph text | AAA |
| `{colors.ink-subtle}` | `#8a8a8a` | 5.7:1 | Meta, dates, secondary labels, footer | AA |
| `{colors.ink-faint}` | `#6a6a6a` | 3.7:1 | Row indices, disabled | AA large text only |
| `{colors.ornament}` | `#2a2a2a` | 1.4:1 | Ghost type, marquee, texture | Non-text only |

Pure `#ffffff` is not in the system. On a near-black canvas it vibrates, and `{colors.ink}` reads as brighter precisely because it does not.

## Typography

### Families

Two faces, down from three.

1. **Geist** (400 / 500) carries display, body, section headings, and links. It is the voice of the site.
2. **JetBrains Mono** (300 / 400) carries technical values only: tags, status, indices, periods, paths, metrics, keycaps, and code.

**OS chrome follows the same rule.** The menu bar, desktop icon labels, dock
tooltips and spotlight all set in Geist at 13px, sentence case, no tracking,
because that is how macOS sets its own chrome. They were uppercase letterspaced
mono, which is a terminal reading a file listing rather than a Mac naming a
file. Icon labels read "About.md", not "ABOUT.MD".

**The roles were swapped once the shell became macOS.** The original system ran
monospace everywhere, which was right for a terminal page and wrong inside Mac
chrome: uppercase mono headlines read as a different application from the
window they sit in. macOS uses one humanist sans throughout and reserves mono
for code, so this does the same. Display type is sentence case at weight 500
with negative tracking, not uppercase at weight 300.

Mono did not disappear. It still carries everything that is a value rather than
a sentence, which is what keeps the systems register in the writing.

Both are self-hosted through the framework's font pipeline. Neither is requested from a third-party stylesheet at runtime.

**Inter is banned.** It appears by name in this project's own anti-references, and it is the single most reliable signal that a portfolio's typography was not chosen. Geist is the replacement: a geometric grotesque with a matching mono, free, and not yet exhausted.

**Bebas Neue is retired.** It is a condensed poster face built for sports graphics and event flyers. Set against a terminal system it reads as borrowed rather than chosen, and it is one of the most common free-font tells on the web. Its job moves to JetBrains Mono at weight 300, which is more distinctive, removes a network request, and makes the monospace commitment total.

### Scale

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `{typography.display-xl}` | clamp(48-104px) | 300 | -0.045em | Hero headline. Uppercase. |
| `{typography.display-lg}` | clamp(34-60px) | 300 | -0.035em | Section headlines. Uppercase. |
| `{typography.display-md}` | clamp(24-36px) | 400 | -0.02em | Project names, company names. |
| `{typography.display-sm}` | 20px | 400 | -0.01em | Card titles. |
| `{typography.body-lg}` | 18px | 400 | 0 | Hero subheading, lead paragraphs. |
| `{typography.body-md}` | 16px | 400 | 0 | Default body. |
| `{typography.body-sm}` | 14px | 400 | 0 | Secondary body, project descriptions. |
| `{typography.mono-md}` | 14px | 400 | 0 | Buttons, nav, inline technical. |
| `{typography.mono-sm}` | 12px | 400 | 0 | Stack badges, meta rows. |
| `{typography.eyebrow}` | 11px | 400 | 0.22em | Section eyebrows. Uppercase, amber. |
| `{typography.index}` | 11px | 300 | 0.1em | Row indices (`P01`, `E02`). |
| `{typography.caption}` | 10px | 400 | 0.14em | Tags, status, footer. Uppercase. |

### Principles

- **Display sets at weight 500 in sentence case.** Confidence comes from scale and negative tracking, not from mass or from shouting in uppercase.
- **Negative tracking scales with size.** `-0.045em` at hero, relaxing to `0` by body. Monospace needs this more than a proportional face does, because its default fit is loose by construction.
- **Positive tracking is for uppercase micro-type only.** Eyebrows, captions, and indices. Never on sentence-case text at any size.
- **Sentence case everywhere except micro-labels.** Uppercase is for 10-11px mono labels, status strings, and chips.
- **Never letter-space body copy.** Not for effect, not for hierarchy, not at all.

### ASCII as icon system

Following opencode.ai, structural glyphs come from the character set rather than an icon font: `[+]` for expandable, `[x]` for closed, `>` for the prompt and for forward links, `//` for inline comments and asides, and box-drawing characters for nested relationships. `lucide-react` remains available but is now the exception. Any icon it supplies must be strokeable at 1px and sit at 14px or 16px. Filled icons are banned.

## Layout

### Spacing

Base unit 4px. Section rhythm is the single most important spacing decision on the page.

`{spacing.xxs}` 2 · `{spacing.xs}` 4 · `{spacing.sm}` 8 · `{spacing.md}` 12 · `{spacing.lg}` 16 · `{spacing.xl}` 24 · `{spacing.2xl}` 40 · `{spacing.3xl}` 64 · `{spacing.4xl}` 96 · `{spacing.section}` 128

**Section padding is `{spacing.section}` 128px on desktop**, stepping down to `{spacing.3xl}` 64px below 768px. This is a deliberate increase over the current 96px. Generous vertical air is what separates a considered page from a dense one, and it costs nothing but scroll.

### Grid

- Container: `max-width: 1152px`, `margin: 0 auto`, `padding-inline: {spacing.xl}`.
- Sections are full-bleed bands. The `1px solid {colors.hairline}` top rule runs edge to edge; content inside stays within the container.
- About: 2-column `1fr 1fr` at `{spacing.3xl}` gap. Bio left, stat rows right.
- Stack: 2-column `1fr 2fr`. Heading column is sticky.
- Work: single-column full-width rows. Never a card grid.
- Footer: 3-column at desktop, stacked at mobile.

### Responsive

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Single column. Section padding drops to 64px. Custom cursor disabled. Preview cards suppressed. Nav collapses to a full-screen overlay. |
| Tablet | 768-1023px | 2-up grids. Section padding 96px. |
| Desktop | >= 1024px | Full layout. Cursor-tracked previews active. |

Desktop is the showcase viewport and mobile is the functional one, but "functional" means every piece of content is reachable and legible, not that it is an afterthought. Touch targets meet the 44x44px floor.

### Images

Project screenshots are the most persuasive content on the page and are currently the most underused. Every project needs one.

- Preview cards: 16:10, `{rounded.none}`, 1px `{colors.hairline-strong}` border, 8px `{colors.surface-2}` inset frame so the screenshot reads as a mounted plate rather than a floating image.
- Served through the framework's image component with explicit dimensions. Raw `<img>` is banned; it is the primary layout-shift source on this page.
- Screenshots are captured on the project's own dark UI where possible so they sit in the canvas rather than punching a bright hole in it.

## Elevation

There are three levels and none of them use a shadow.

| Level | Treatment | Use |
|---|---|---|
| 0 - Flat | No border, no fill | Section bands, hero |
| 1 - Ruled | 1px `{colors.hairline}` | Dividers, stat rows, project rows |
| 2 - Inset | `{colors.surface-2}` fill + 1px `{colors.hairline-strong}` | Preview cards, stack badges, panels |

**`box-shadow` is banned.** Not softened, not subtle, not "just a small one." On a `#0a0a0a` canvas a shadow is invisible at best and a gray smear at worst. Depth comes from surface steps and rules. This is the discipline Warp and Linear share, and it is what makes a dark interface read as engineered rather than as a default dark mode.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | **Default for all content.** Panels, cards, buttons, inputs, previews. |
| `{rounded.xs}` | 2px | Status pills, tag chips. |
| `{rounded.sm}` | 4px | Content ceiling. Requires a reason. |
| `{rounded.window}` | 10px | **OS chrome only.** Window frames, spotlight, dropdowns. |
| `{rounded.dock}` | 16px | The dock slab only. |
| `{rounded.full}` | 9999px | Status dots, traffic lights, dock icons. |

Rectangularity is load-bearing for content. A rounded card on this canvas immediately reads as a generic dashboard component, which is the exact register the project's anti-references rule out.

**The chrome exception.** OS chrome is a separate layer with its own physics, and it obeys the conventions of the thing it depicts rather than the conventions of the content it holds. A macOS window with 4px corners does not read as restraint, it reads as a bug. So window frames, the dock, dropdowns, and spotlight get `{rounded.window}` and `{rounded.dock}`.

The rule that survives: **everything inside a window is still sharp.** The frame is round, the content is not. That boundary is what keeps the diegesis from leaking into the design system, and it is the single easiest place for this build to go soft. Watch it.

## OS Shell

The site boots into a desktop rather than presenting a scrolling page. Projects are files, sections are applications, and navigation happens by opening windows. The metaphor has to be committed to completely or not at all, because a half-simulated OS reads as a broken website rather than as a designed one.

### The rule that governs everything else

**Routes are the source of truth. Window state is derived from the URL, never the other way around.**

Every openable surface owns a real route that server-renders its content:

```
/                 desktop, no windows open
/about            desktop + About window open and focused
/work             desktop + Work (Finder) window open
/work/kaal        desktop + the Kaal case study window open
/experience       desktop + Experience window open
/contact          desktop + Contact window open
```

Opening a window pushes a route. Closing pops it. Multiple open windows serialize into the URL so a specific arrangement is linkable. Focus changes are `replaceState`, not `pushState`, so clicking between windows does not poison the back button.

This is non-negotiable and it is the single thing that separates this build from the four reference implementations. A recruiter must be able to send a colleague `sahildixit.dev/work/kaal` and have that person land on the case study, not on a desktop they have to re-navigate. Search engines must get real HTML per project. Any window whose content exists only in client state is a window that does not exist as far as hiring is concerned.

**Test:** disable JavaScript. Every case study must still render its full text content. The chrome can disappear. The content cannot.

### Layers

| Layer | z-index | Contents |
|---|---|---|
| Desktop | `{zindex.desktop}` | Wallpaper, dot grid |
| Icons | `{zindex.desktop-icon}` | Desktop files, right-aligned column |
| Windows | `{zindex.window-base}`+ | Stacked, one increment per focus event |
| Dock | `{zindex.dock}` | Fixed bottom center |
| Menu bar | `{zindex.menubar}` | Fixed top, full width |
| Dropdowns | `{zindex.menu-dropdown}` | Open menu panels |
| Spotlight | `{zindex.spotlight}` | Command palette |
| Boot | `{zindex.boot}` | Boot sequence, first visit only |
| Grain | `{zindex.grain}` | Texture overlay, above everything |

Windows take `{zindex.window-base}` plus a counter incremented on each focus. When the counter reaches `{zindex.window-ceiling}`, renormalize the whole stack back down rather than letting it climb without bound.

### Window lifecycle

**Open.** Scale from 0.94 with opacity 0, origin at the launching icon or dock item, `{motion.spring-window-open}`. Never a fade alone. The window should feel like it came from somewhere.

**Focus.** Click anywhere in the window raises it, sets the border to `{colors.chrome-border-focused}`, restores full opacity, brightens the title, and colorizes the traffic lights. Unfocused windows sit at `opacityUnfocused` 0.92 with `{colors.chrome-border}` and gray lights. This single treatment does more for the illusion than any animation.

**Drag.** By the title bar only. `transform: translate3d` on a `motion.div`, never `top`/`left`. `{motion.drag-momentum}` is `none`: windows stop where released, because inertia on a window reads as a bug. Constrain so the title bar can never go under the menu bar or fully off-screen. Dragging a window raises it.

**Resize.** 8px invisible hit areas on all four edges and corners, floored at `{spacing.window-min-w}` × `{spacing.window-min-h}`. Cursor changes per edge.

**Zoom.** Green light animates to fill the available desktop area between menu bar and dock. Not true fullscreen.

**Minimize.** Scale and translate toward the window's dock slot over `{motion.duration-minimize}`. A genie effect is not required and a clean scale reads better than a bad genie.

**Close.** Scale to 0.96 with opacity 0 over `{motion.duration-window-close}`, then pop the route.

### Traffic lights

12px circles at the left of the title bar, `{spacing.sm}` apart, with a 20px hit area so they are actually clickable.

**Unfocused windows show `{colors.tl-inactive}` gray dots. Only the focused window shows color.** This is authentic macOS behavior and it does most of the work of communicating focus.

Glyphs (`x`, `−`, `⤢`) appear inside the dots only on hover of the traffic-light group, never persistently.

**On the color license.** `{colors.tl-close}`, `{colors.tl-minimize}`, and `{colors.tl-zoom}` are the real macOS values and they introduce a red and a second green that the base palette forbids. This is a deliberate quotation, not a palette expansion, and it is bounded by three rules:

1. These three values appear on traffic lights and nowhere else on the site, ever.
2. They render only on the focused window, so at most one set is colored at a time.
3. They are never used to communicate site state. `{colors.primary}` remains the only signal for live status.

Recoloring them to the site palette was considered and rejected: a macOS window with green, green, and green traffic lights reads as a knockoff. Quoting a convention exactly is stronger than half-adopting it.

### Widgets

A Big Sur-style column on the left of the desktop. Two tiles, not a dashboard.

**Kaal.** Runs a real chart against the production Kaal engine: a visitor types
a birth date, time and place, and gets back the computed moon sign, nakshatra,
lagna and sidereal sun. It is the product running on the portfolio rather than a
screenshot of it, which is the one proof-of-shipping claim nobody can fake.

It ends in a link rather than a full reading. Kaal's interpretation endpoint is
authenticated, and that is correct: the computation is the proof, the reading is
the thing being sold. The widget stops exactly where the product begins.

It ships with a sample chart already answered, because a widget that demands
input before showing anything is one most visitors skip.

Requests go through `app/api/kaal/[...path]`, a server proxy with an explicit
two-route allowlist. That removes any dependence on Kaal's CORS policy, keeps a
third-party origin out of the visitor's network tab, and means the portfolio
cannot be used as an open relay to the authenticated parts of the API. Charts
are never cached: they are personal to whoever typed them in, and nothing is
stored.

**Now.** What is being worked on this month, dated. Freshness is the one thing a
static portfolio cannot fake. Content lives in `content/profile.ts` with
everything else that is true about the owner.

The stack is hidden below the `lg` breakpoint, where the springboard owns the
screen.

### Guiding the visitor

A desktop is only intuitive to people who already know desktops. Two things
here are not guessable by looking: files open on double click, and the fastest
route anywhere is Command K. A visitor who single-clicks an icon, sees nothing
happen, and leaves is the most expensive failure this design can produce.

Two affordances, both restrained.

**A permanent hint bar** above the dock names double click, Command K and right
click. It does not time out. A hint that disappears has only helped the
visitors who happened to be looking, and the cost of someone never working out
how to open a file is losing them entirely.

The Command K hint is itself the button, so a visitor who does not want to
learn a shortcut can click it. That is why the menu bar carries no separate
search affordance: one control, in one place.

It is hidden on deep links, where the visitor came for a specific case study
rather than a tour, and below `lg`, where the springboard replaces the desktop
and none of it applies.

**The menu bar's active application is a control.** With nothing focused it
reads Finder and opens Work, which is the file browser this desktop has. It was
inert text, so clicking it did nothing and read as broken.

No modal, no tour, nothing to dismiss. A visitor who ignores the bar still
reaches every route from the dock, the menu bar and the hidden navigation.

### Easter eggs

Deliberately unrelated to the work. They exist because an operating system that
does nothing but hold a resume is not an operating system.

- **Idle screensaver.** After 60 seconds of no input the desktop drifts into an
  ink field of Devanagari and Gujarati glyphs with the clock over it. Any
  pointer, key, wheel or touch event wakes it. Disabled outright under
  `prefers-reduced-motion`, since ambient drift is exactly what that setting is
  for.
- **Wallpaper switcher.** Right-click the desktop for five presets: Dusk,
  Monsoon, Saffron, Ink, After Hours. Persisted per visitor in localStorage,
  every access wrapped in try/catch because private windows throw.
- **Dock launch bounce.** Clicking a dock icon bounces it, the way macOS
  acknowledges a launch. Suppressed under reduced motion.

### The cursor

There is no custom cursor. The native system cursor on a Mac IS the macOS
pointer, and drawing a replacement can only be a worse copy of it, on top of
being Apple artwork. Removing it also restores correct semantics for free:
I-beam over text, pointer over links and buttons, resize arrows on window
edges. `cursor: none` is gone.

### The bare desktop

`/` renders no document. macOS does not show a window on login, and a profile
panel on the wallpaper was the single thing keeping this from reading as an
operating system.

The cost is that the homepage carries almost no prose, so it is paid for
deliberately:

- `Desktop.tsx` emits a visually hidden `<nav>` of real `next/link` elements
  covering every section, project, and role. Not cloaking: it is a genuine
  focusable navigation that screen reader users reach first.
- `sitemap.ts` lists every route, and the JSON-LD Person and CreativeWork graph
  still ships on every page.
- The prose that used to sit here lives on `/about`, one click away in the
  dock, the menu bar, and the desktop icons.

Verified: 12 internal routes are reachable from the prerendered `/` HTML.

### Wallpaper and chrome finish

The desktop is a wallpaper, not a flat fill. `{colors.desktop}` alone read as a
dark page with icons on it rather than an operating system, so the ground is a
layered radial gradient in `--wallpaper`: deep blue into violet into warm
magenta. Pure CSS, no image asset and no network request. The 24px dot grid was
removed from the desktop, where it fought the metaphor. It still belongs on
document surfaces.

**Three rules are relaxed here, each scoped to chrome and each with a reason.**

1. **Chrome may cast a shadow.** `--shadow-window` and `--shadow-dock` exist. A
   floating macOS window with no shadow reads as pasted on rather than lifted.
   The ban still holds everywhere else: nothing inside a window gets a shadow,
   and elevation between content elements is still hairlines and surface steps.

2. **Dock icons are saturated rounded squares, not 1px monochrome.** Each app
   tile carries its own gradient behind a white glyph at ~23% corner radius,
   which is the squircle macOS uses. Monochrome outline tiles are most of what
   made the first pass read as a toolbar rather than a dock. The 1px stroke rule
   still governs every other icon on the site.

3. **Window content is grouped, not flat.** `DocChrome.tsx` provides the content
   primitives: a consistent inset, a real header, and macOS-style inset group
   boxes at `--radius-group` 8px with hairline row dividers. Content used to sit
   flush against the title bar as undifferentiated prose, which read as a text
   file dropped into a window. The sharp-corner rule is relaxed for these group
   boxes only, for the same reason the frame is rounded: square blocks read as
   foreign inside Mac chrome.

4. **Desktop and dock icons are drawn macOS shapes, not strokes.** `MacIcon.tsx`
   renders folders with a tab, documents with a folded corner, and squircle app
   tiles, each with a gradient and a bright top edge. Apple's own icon artwork
   and marks are copyrighted, and SF Symbols are licensed for Apple platforms
   only, so none of it ships here. The shape language is what reads as macOS;
   the artwork is ours. The 1px stroke rule still governs content icons.

**Vibrancy goes on chrome, never on content.** Title bars, the menu bar, the
dock, and spotlight are translucent with backdrop blur. Window bodies are
opaque `--color-window-body`. Letting the wallpaper through a window body
stacked two translucent layers and washed the case-study text out. In macOS the
toolbar and sidebar are vibrant while the content area is solid, so this is the
accurate behavior as well as the readable one. `ink-muted` holds 6.6:1 on the
window body and `ink` holds 15.1:1.

### Menu bar

Fixed top, `{spacing.menubar-height}` 28px, translucent with `blur(20px) saturate(180%)`. The saturation boost is what makes backdrop blur read as macOS rather than as a gray panel.

- **Left:** monogram, then the active window's name in medium weight, then menus. Menus are repurposed, not decorative: `File` holds Resume and Contact, `View` toggles desktop arrangement, `Go` jumps to sections, `Help` opens the keyboard shortcut list.
- **Right:** status items in `{typography.mono-sm}` — the live availability dot in `{colors.primary}`, and a local clock ticking in real time. The clock is the cheapest possible proof the thing is alive. Update it on a one-second interval, and clear the interval on unmount.
- No fake battery or wifi icons. Simulating hardware you do not have is where an OS portfolio tips from clever into costume.

### Dock

Fixed bottom center, `{rounded.dock}` 16px, `blur(28px) saturate(180%)`, floating `{spacing.md}` off the bottom edge.

- Icons at `{spacing.dock-icon}` 48px, magnifying to `{spacing.dock-icon-max}` 72px.
- **Magnification is `transform: scale` only.** Never animate width or height. Neighbors scale on a falloff curve based on pointer distance, driven by `useMotionValue` so pointer movement causes zero React re-renders.
- A 3px `{colors.primary}` dot under any icon whose window is open. This is a legitimate live-state use of green.
- Separator rule before the trailing group.
- Dock items are `<button>` elements with real labels, not divs.

### Desktop and the filesystem

Icons in a right-aligned column at 96px pitch, matching macOS convention.

Model the content as an actual tree rather than a flat list, because the Finder window and the desktop must read from the same source:

```
~/
  Work/          one file per project, opens a case study window
  Experience/    one file per role
  About.md
  Resume.pdf     opens a real PDF, does not simulate one
  Contact.app
```

Single click selects with `{colors.selection}` fill and `{colors.selection-border}` outline. Double click opens. Icons are 1px-stroke SVG in `{colors.ink-muted}`, consistent with the ASCII-and-hairline icon rule. No skeuomorphic Apple icon replicas.

### Spotlight

`Cmd+K` / `Ctrl+K` opens a centered command palette. This is the most valuable single component in the build: it is on-metaphor, it is what a technical audience reaches for by reflex, and it doubles as the accessible navigation path that rescues the entire OS conceit.

Searches projects, sections, and actions. Enter opens the top result. Escape closes. Arrow keys move selection.

### Mobile

**The desktop metaphor does not survive at 375px, and faking it is worse than dropping it.** Draggable windows on a phone are unusable and no one is impressed by a dock they cannot hover.

Below 768px the shell degrades to a springboard: a home-screen grid of the same icons, tapping one opens a full-screen "app" view with a back affordance in place of a title bar. Same routes, same content, same tree, no window management. The menu bar collapses to a status strip with the clock and availability dot.

This is a real degradation, not a fallback. It should look intentional, because on a phone it is the better interface.

### Accessibility

An OS simulation is the easiest possible way to build an inaccessible site. These are floors, not aspirations.

- Every window is `role="dialog"` with `aria-label` set to its title. The focused window is the accessibility root.
- Traffic lights, dock items, and desktop icons are `<button>`s with `aria-label`. Nothing interactive is a bare `div`.
- Full keyboard path to every piece of content, with no pointer required: `Cmd+K` for spotlight, `Tab` cycles within the focused window, `Cmd+W` closes, `Esc` closes the frontmost window or dropdown.
- Arrow keys move desktop icon selection; `Enter` opens.
- Visible `{colors.primary}` focus ring on every interactive element. Never `outline: none` without a replacement.
- Respect `prefers-reduced-motion`: windows appear and disappear with opacity only, dock magnification is disabled, the boot sequence is skipped.
- The boot sequence runs on first visit only. Persist a flag. Making a returning recruiter watch a boot animation twice is a hostile pattern, and making someone arriving on a deep link watch one before they see the thing they came for is worse. **A deep link never boots.**

### Performance

The chosen constraint is wow factor over load speed, so the budget is generous but not unbounded. These are the floors that keep the site from failing the audience it exists for:

- **The first viewport is never a spinner.** Desktop, menu bar, and dock render server-side as static markup. Window management hydrates after.
- Backdrop blur is expensive and compounds. Cap it at four simultaneously blurred surfaces. Blurring ten stacked windows will drop a mid-range laptop to single-digit frame rates.
- Window contents mount lazily and unmount on close. Do not keep ten case studies in the tree.
- Everything that animates uses `transform` and `opacity` exclusively.
- Case study content is server-rendered regardless of window state, per the routing rule above.

### The discipline

The failure mode of this genre is building an OS instead of a portfolio. Every reference implementation drifts this way, adding a calculator, a music player, a working terminal, a FaceTime clone. Those are fun to build and they are why most OS portfolios have no actual content in them.

Build only what carries content or sells the illusion at low cost: windows, dock, menu bar, spotlight, desktop icons, a clock. Nothing else earns its place. A trash can that does nothing is a liability. If a component does not hold a case study or take under an hour, it does not ship.

The site still has to answer, in the first ten seconds, why someone should hire you.

## Motion

### Tokens

- Standard ease: `{motion.ease-standard}` `cubic-bezier(0.22, 1, 0.36, 1)`
- Micro-interactions: `{motion.duration-micro}` 120ms
- UI transitions: `{motion.duration-ui}` 200ms
- Scroll reveals: `{motion.duration-reveal}` 600ms, `{motion.stagger}` 80ms between siblings
- Magnetic hover: spring, stiffness 300, damping 25
- Row indent: spring, stiffness 400, damping 30

### Rules

- **Reveal once.** `useInView` with `{ once: true, margin: "-80px" }`. Elements that re-animate on every scroll pass are the fastest way to make a page feel cheap.
- **Cap the stagger.** No reveal sequence runs longer than 400ms total. Beyond that the visitor is waiting on the interface.
- **Animate transform and opacity only.** Never `width`, `height`, `top`, or `left`. Cursor-tracked elements use `useMotionValue` and `useTransform` so pointer movement triggers zero React re-renders.
- **`useReducedMotion()` is mandatory in every component that animates.** Framer Motion does not respect the media query on its own. The CSS block in `globals.css` covers keyframe animations but not a single Framer transition, which means reduced-motion support is currently partial. Treat any new `motion.*` component without a `useReducedMotion()` check as incomplete.

## Texture

- **Grain**: `body::before`, SVG `feTurbulence` fractal noise, `baseFrequency: 0.75`, 4% opacity, fixed, `z-index: 9999`, `pointer-events: none`.
- **Dot grid**: `radial-gradient` 1px dots at `rgba(255,255,255,0.03)`, 24px pitch, on the canvas.
- **Cursor**: native. See The cursor, above.
- **Marquee**: dual-track CSS-only infinite scroll, 40s linear. `aria-hidden` on the container. Type in `{colors.ornament}`.
- **Scanlines, CRT curvature, and glow are banned.** The register is a modern terminal emulator, not a 1980s monitor. This is the line between restrained and costume.

## Copy

- Numbers over adjectives. "~30 model-level submissions" beats "extensive regulatory work" every time.
- No em dashes. Use a period or a colon.
- No "passionate about," "leveraging," "seamless," "cutting-edge," or "I'm a developer who loves."
- Section eyebrows read as system labels: `// EXPERIENCE`, `// SELECTED WORK`, `// STACK`.
- Status strings are uppercase and terse: `LIVE`, `SHIPPED`, `ARCHIVED`, `IN PROGRESS`.
- Sentences end. Paragraphs are three lines or fewer.

## Enforcement

The previous version of this document described a system the code did not implement. These rules exist so that cannot recur.

1. **No inline `fontFamily`.** Use the `@theme` tokens through Tailwind utilities. There are currently 60+ inline declarations; each one is a place the system can silently drift.
2. **No inline hex.** Every color resolves from a token in this file. The codebase currently contains 20 distinct hardcoded hex values, 10 of them grays doing four jobs.
3. **No `box-shadow`.**
4. **No radius above `{rounded.sm}` 4px** except the status dot.
5. **No text color outside the ink ladder.**
6. **Green means live. Amber means label.** No exceptions, in either direction.
7. **Every `motion.*` component checks `useReducedMotion()`.**

## Divergences from current code

Status as of the OS rebuild. This section is the running ledger; update it
rather than letting it go stale, which is what happened to the version of this
document that preceded it.

### Resolved

| # | Was | Resolved by |
|---|---|---|
| 1 | 64 inline `fontFamily` declarations | Tailwind `font-display` / `font-mono` / `font-body` |
| 2 | 115 hardcoded hex, 20 distinct, plus ~38 rgba literals | Every color resolves from a token |
| 3 | `#555` carried footer text at 2.66:1 | Stepped to `ink-subtle` 5.7:1 |
| 3b | `#777` carried body copy at 4.42:1 | Stepped to `ink-muted` 7.0:1 |
| 4 | Bebas Neue on 11 display elements | JetBrains Mono 300, negative tracking |
| 5 | Inter on 7 body elements | Geist |
| 6 | Render-blocking Google Fonts `<link>` | `next/font`, self-hosted |
| 7 | Amber and green used interchangeably | Roles enforced: green live-state, amber label |
| 8 | Section padding 96px | 128px desktop, 64px compact |
| 9 | `NoTrace.tsx` orphaned | Deleted, with nine more the routes superseded |
| 10 | No component honored reduced motion | 9 of 9 animating components call `useReducedMotion()` |
| 11 | `og.png` referenced, absent | `app/opengraph-image.tsx` |
| 12 | 4 of 5 projects had no screenshot | Two featured projects carry the page; three are plaintext rows |
| 13 | Kaal linked to a repo, not the product | Links `getkaal.com` |
| 14 | Axira described as SMS retention SaaS | Multi-agent LLM outreach automation |
| 15 | Capital One listed as "Intern" | Matches the resume |
| 16 | Resume metrics absent from the site | Present in profile, roles, and both case studies |
| 17 | 5 projects flat, none prominent | Two-tier: featured case studies, plaintext index |
| 18 | No route-driven windows | Every window owns a prerendered route |
| 19 | No window manager | Focus stack, drag, resize, minimize, zoom, close |
| 20 | No menu bar | Live clock, availability, section menus |
| 21 | No dock | Transform-only magnification, running indicators |
| 22 | No spotlight | Cmd+K palette over projects, sections, actions |
| 23 | No desktop icons | Rendered from the shared `content/fs.ts` tree |
| 24 | No mobile degradation | Springboard below 768px, no fake windows |
| 25 | Boot screen unconditional | Gated to first visit, skipped on deep links |
| 26 | No keyboard path, no dialog roles | `role="dialog"`, labeled buttons, Escape, arrows, Cmd+K |
| — | Hero content gated behind JS | CSS reveal with a visible resting state |
| — | Windows emitted nothing during SSR | Document layer renders the route body without JS |

### Outstanding

| # | Gap | Note |
|---|---|---|
| 27 | Axira has no repo link | The URL on the resume is a different project: a Next.js/Prisma operations dashboard, not the Python multi-agent system. Verified twice. Fix the resume, then set `repo`. |
| 28 | Axira has no screenshot | Its case study is text only. It is the lead project, so this is the highest-value remaining content task. |
| 29 | Only Kaal has a preview image | VibeQueue, MANIFEST, and Polymarket stay plaintext until they have visuals. |
| 30 | Animations never verified in a browser | The build environment reports `document.hidden`, so rAF never fires and no Motion animation advances. Structure, tokens, DOM, and content are verified; visual motion is not. |
| 31 | `useOpenWindow` and shared launcher constants live in `Dock.tsx` | Three components import a hook from a sibling component file. Works, but belongs in `lib/os/`. |
| 32 | Multi-window is limited to the four section routes | Case studies and roles open as the current-route window. Registering every dynamic route statically would render every case study into every page. |

## Do's and Don'ts

### Do
- Set display type in JetBrains Mono at weight 300 with heavy negative tracking.
- Carry elevation with a 1px hairline and a one-step surface change.
- Keep green for live state and amber for structural labels, strictly.
- Give sections 128px of vertical air on desktop.
- Let project screenshots do the persuading. Keep the chrome quiet.
- Use ASCII glyphs before reaching for an icon.
- Write specifics. Numbers, project names, real outputs.
- Give every window a real route that server-renders its content.
- Show color on the focused window's traffic lights only.
- Animate windows and dock icons with `transform` and `opacity` exclusively.
- Degrade to a springboard on mobile rather than faking window management.

### Don't
- Don't use Inter or Bebas Neue anywhere.
- Don't add a `box-shadow` to content. Window and dock chrome are the licensed exceptions.
- Don't round a corner past 4px.
- Don't put green on anything that is not currently happening.
- Don't set a headline in bold. Weight 300 is the voice.
- Don't letter-space sentence-case copy.
- Don't add scanlines, CRT curvature, or glow.
- Don't introduce a third chromatic color. If the page needs one, it needs less content.
- Don't build a card grid. This page is a document.
- Don't let window content exist only in client state. If it does not server-render, it does not exist to a recruiter or to Google.
- Don't use the traffic-light colors anywhere except traffic lights.
- Don't round the content inside a window. The frame is round, the content is sharp.
- Don't simulate hardware you do not have. No fake battery, no fake wifi.
- Don't let the wallpaper through a window body. Vibrancy is for chrome; content is opaque.
- Don't boot on a deep link, and don't boot a returning visitor twice.
- Don't build a calculator, a music player, a working terminal, or a trash can. Build windows that hold case studies.
- Don't stack more than four blurred surfaces at once.
