"use client";

/**
 * Traffic lights. 12px dots on 20px hit areas, 8px apart.
 *
 * The three macOS colors are a licensed quotation (DESIGN.md > OS Shell >
 * Traffic lights) bounded by three rules: they appear here and nowhere else,
 * they render only on the FOCUSED window, and they never communicate site
 * state. An unfocused window renders all three in --color-tl-inactive, which
 * is what does most of the work of signalling focus.
 *
 * Glyphs appear on hover of the GROUP, never persistently.
 *
 * Geometry: each button is 20x20 with a 12px dot centred inside, laid out with
 * no gap. That puts 8px between adjacent dots, which is {spacing.sm}.
 */

export interface TrafficLightsProps {
  /** Focused windows show color. Unfocused windows show gray. */
  focused: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onZoom: () => void;
}

type Glyph = "close" | "minimize" | "zoom";

/** 1px-stroke glyphs, drawn from the character set rather than an icon font. */
function GlyphMark({ kind }: { kind: Glyph }) {
  const common =
    "pointer-events-none h-[10px] w-[10px] text-on-primary opacity-0 transition-opacity duration-100 group-hover/tl:opacity-60";

  if (kind === "close") {
    return (
      <svg viewBox="0 0 10 10" aria-hidden="true" className={common}>
        <path
          d="M3 3 L7 7 M7 3 L3 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  if (kind === "minimize") {
    return (
      <svg viewBox="0 0 10 10" aria-hidden="true" className={common}>
        <path
          d="M2.4 5 L7.6 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className={common}>
      <path d="M2.2 7.8 L2.2 4.3 L5.7 7.8 Z" fill="currentColor" />
      <path d="M7.8 2.2 L7.8 5.7 L4.3 2.2 Z" fill="currentColor" />
    </svg>
  );
}

function Light({
  label,
  glyph,
  color,
  focused,
  onActivate,
}: {
  label: string;
  glyph: Glyph;
  /** Tailwind background utility resolving to a --color-tl-* token. */
  color: string;
  focused: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onActivate}
      // Stop the title bar from starting a window drag when a light is pressed.
      // Focus still happens: the window listens in the capture phase.
      onPointerDown={(e) => e.stopPropagation()}
      className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
    >
      <span
        className={`grid h-3 w-3 place-items-center rounded-full ${
          focused ? color : "bg-tl-inactive"
        }`}
      >
        <GlyphMark kind={glyph} />
      </span>
    </button>
  );
}

export function TrafficLights({
  focused,
  onClose,
  onMinimize,
  onZoom,
}: TrafficLightsProps) {
  return (
    <div className="group/tl flex shrink-0 items-center">
      <Light
        label="Close window"
        glyph="close"
        color="bg-tl-close"
        focused={focused}
        onActivate={onClose}
      />
      <Light
        label="Minimize window"
        glyph="minimize"
        color="bg-tl-minimize"
        focused={focused}
        onActivate={onMinimize}
      />
      <Light
        label="Zoom window"
        glyph="zoom"
        color="bg-tl-zoom"
        focused={focused}
        onActivate={onZoom}
      />
    </div>
  );
}

export default TrafficLights;
