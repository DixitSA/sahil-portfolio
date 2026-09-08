"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * The callout that points at Start Here.md.
 *
 * The guide is first in the icon column, first in the dock and first on the
 * springboard, and none of that helps a visitor who never looks at the right
 * edge of the wallpaper. What Apple does here is not a badge or a banner: it
 * is a popover with a tail, aimed at one control, saying one thing.
 *
 * The rules it keeps, so it stays inside the no-modal-no-tour line in
 * DESIGN.md:
 *
 *   - It never blocks. The wrapper is pointer-events-none and only the two
 *     buttons inside take clicks, so every icon underneath stays reachable.
 *   - It never has to be dismissed. It retires on its own after eleven
 *     seconds, on the first pointer down anywhere, and on opening the guide.
 *   - It appears once per browser, not once per load. A recruiter who came
 *     back to check a number does not need the tour again.
 *   - It waits for the lock screen. Arriving underneath the boot animation
 *     would spend the entrance on nobody.
 *   - It never appears on a deep link, where the visitor came for a specific
 *     case study, or below the desktop breakpoint, where the springboard
 *     already leads with the same guide.
 *
 * Unmount is a timeout, never an animationend, for the reason BootScreen
 * documents: an exit that never fires must not be able to strand this on
 * screen.
 */

const SEEN_KEY = "start-callout-seen";
/** Lock screen holds 2600ms and fades over 520ms. Land just after it. */
const APPEAR_MS = 3400;
/** Long enough to read twice, short enough not to become furniture. */
const HOLD_MS = 11000;
const LEAVE_MS = 200;

export type CalloutPhase = "hidden" | "shown" | "leaving";

export interface StartCallout {
  phase: CalloutPhase;
  /** True while the icon should carry its halo. */
  attention: boolean;
  dismiss: () => void;
}

export function useStartCallout(): StartCallout {
  const pathname = usePathname();
  const [phase, setPhase] = useState<CalloutPhase>("hidden");

  const dismiss = useCallback(() => {
    setPhase((current) => (current === "shown" ? "leaving" : current));
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private window. It simply offers itself again next visit. */
    }
  }, []);

  /* Arm once, on the bare desktop, for a visitor who has not seen it. */
  useEffect(() => {
    if (pathname !== "/") return;

    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) !== null;
    } catch {
      /* Treat an unreadable store as a first visit. */
    }
    if (seen) return;

    const id = window.setTimeout(() => setPhase("shown"), APPEAR_MS);
    return () => window.clearTimeout(id);
  }, [pathname]);

  /* Retire on its own, and on the first pointer down anywhere else. */
  useEffect(() => {
    if (phase !== "shown") return;

    const hold = window.setTimeout(dismiss, HOLD_MS);
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-start-callout]")) return;
      dismiss();
    };
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.clearTimeout(hold);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [phase, dismiss]);

  /* Leaving is a CSS class; the unmount is a timer that cannot deadlock. */
  useEffect(() => {
    if (phase !== "leaving") return;
    const id = window.setTimeout(() => setPhase("hidden"), LEAVE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  /* Navigating away hides it without spending the "seen" flag. */
  const visible = phase !== "hidden" && pathname === "/";

  return { phase, attention: visible, dismiss };
}

export interface StartCalloutProps {
  phase: CalloutPhase;
  /** Opens the guide. Same target the icon and the dock use. */
  onOpen: () => void;
  onDismiss: () => void;
}

export default function StartCallout({ phase, onOpen, onDismiss }: StartCalloutProps) {
  if (phase === "hidden") return null;

  return (
    <div
      data-start-callout="true"
      role="note"
      aria-live="polite"
      // The wrapper passes clicks straight through to the desktop. Only the
      // two buttons below opt back in.
      className={`pointer-events-none absolute top-1/2 right-full mr-4 hidden w-[236px] lg:block ${
        phase === "leaving" ? "callout-out" : "callout-in"
      }`}
      style={{ zIndex: "var(--z-desktop-icon)" }}
    >
      <div
        className="relative px-4 py-3"
        style={{
          backgroundColor: "var(--color-chrome-window)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid var(--color-chrome-border-focused)",
          borderRadius: "var(--radius-window)",
          boxShadow: "var(--shadow-window)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-ink)",
          }}
        >
          New here? Open this first.
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.45,
            color: "var(--color-ink-muted)",
          }}
        >
          A five-minute path through the site: what to read, in what order.
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="pointer-events-auto mt-3 px-3 py-[5px]"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-ink)",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          Open Start Here
        </button>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss this tip"
          className="pointer-events-auto absolute top-1.5 right-2 h-5 w-5 leading-none"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--color-ink-faint)",
          }}
        >
          ×
        </button>

        {/*
          The tail. A square rotated 45 degrees with only its two outward
          edges drawn, half outside the popover, so the border reads as one
          continuous line around a shape with a point on it.
        */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 right-[-6px] h-[11px] w-[11px]"
          style={{
            transform: "translateY(-50%) rotate(45deg)",
            backgroundColor: "var(--color-chrome-window)",
            borderTop: "1px solid var(--color-chrome-border-focused)",
            borderRight: "1px solid var(--color-chrome-border-focused)",
          }}
        />
      </div>
    </div>
  );
}
