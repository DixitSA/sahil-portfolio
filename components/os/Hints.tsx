"use client";

import { usePathname } from "next/navigation";
import { useOS } from "@/lib/os/store";
import { START_APP, useOpenWindow } from "./Dock";

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
 * The mechanics are only half of it. Knowing how to open a window does not
 * tell a recruiter which window to open first, so the bar leads with the
 * guide: one click to a reading path, ahead of the gestures. It is a button to
 * a real route, not a tour that runs at you — nothing here has to be
 * dismissed before the desktop can be used.
 *
 * The Command K hint is likewise the affordance itself, so a visitor who does
 * not want to learn a shortcut can just click it. That is why the menu bar
 * carries no separate search control.
 *
 * Hidden on deep links, where the visitor came for a specific case study
 * rather than an orientation, and below `lg`, where the springboard replaces
 * the desktop entirely and none of this applies.
 */
export default function Hints() {
  const pathname = usePathname();
  const setSpotlight = useOS((s) => s.setSpotlight);
  const activate = useOpenWindow();

  if (pathname !== "/") return null;

  return (
    <div
      // Clear of the dock tooltips, which rise to about 112px and were being
      // covered by this bar.
      className="pointer-events-none fixed inset-x-0 bottom-[136px] hidden justify-center lg:flex"
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
        {/* Brighter than the gestures beside it. Of the four things on this
            bar, this is the one worth clicking first. */}
        <button
          type="button"
          onClick={() => activate(START_APP)}
          className="flex items-center gap-1"
          aria-label="Open Start Here, a guided path through this site"
          style={{ color: "var(--color-ink)" }}
        >
          New here?
          <span style={{ color: "var(--link-accent)" }}>Start here</span>
        </button>

        <Dot />

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
