"use client";

import { usePathname } from "next/navigation";
import { useOS } from "@/lib/os/store";

/**
 * Permanent hint bar.
 *
 * A desktop is only intuitive to people who already know desktops, and the
 * things this one needs are not guessable by looking: files open on double
 * click, search is Command K, the desktop has a context menu. A visitor who
 * single-clicks an icon, sees nothing happen, and leaves is the most expensive
 * failure this design can produce, so the guidance stays on screen rather than
 * timing out.
 *
 * It also carries the Command K affordance itself: the search hint is a real
 * button, so a visitor who does not want to learn a shortcut can just click
 * it. That is why the menu bar no longer duplicates it.
 *
 * Hidden on deep links, where the visitor came for a specific case study
 * rather than a tour, and below `lg`, where the springboard replaces the
 * desktop entirely and none of this applies.
 */
export default function Hints() {
  const pathname = usePathname();
  const setSpotlight = useOS((s) => s.setSpotlight);

  if (pathname !== "/") return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[92px] hidden justify-center lg:flex"
      style={{ zIndex: "var(--z-dock)" }}
    >
      <div
        className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--color-ink-subtle)",
          background: "rgba(12,12,16,0.42)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 999,
        }}
      >
        <span>Double-click a file to open it</span>

        <Dot />

        <button
          type="button"
          onClick={() => setSpotlight(true)}
          className="flex items-center gap-1"
          aria-label="Open search. Keyboard shortcut Command K"
          style={{ color: "var(--color-ink-subtle)" }}
        >
          <Key>⌘</Key>
          <Key>K</Key>
          <span>to search</span>
        </button>

        <Dot />

        <span>Right-click the desktop</span>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span aria-hidden="true" style={{ color: "var(--color-ink-faint)" }}>
      ·
    </span>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-block px-1.5 py-[1px]"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--color-ink)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 4,
      }}
    >
      {children}
    </kbd>
  );
}
