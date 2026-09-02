"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * First-visit hints.
 *
 * A desktop is only intuitive to people who already know desktops, and the two
 * things this one needs are not guessable from looking at it: files open on
 * double click, and the fastest way anywhere is Command K. A visitor who
 * single-clicks an icon, sees nothing happen, and leaves is the failure mode
 * that costs the most.
 *
 * So: one line, above the dock, on the first visit only. It fades on its own
 * and disappears the moment the visitor does anything, because a hint that is
 * still on screen after you no longer need it is an instruction manual.
 *
 * Never shown on a deep link, and never on a second visit in the same session.
 */

const subscribeToFlag = () => () => {};
const readFlag = () => sessionStorage.getItem("hinted") !== null;
const readFlagOnServer = () => true;

const HOLD_MS = 9000;

export default function Hints() {
  // A deep link means the visitor followed a shared URL to specific content.
  // Teaching them the desktop is not what they came for.
  const deepLink = usePathname() !== "/";
  const alreadyHinted = useSyncExternalStore(
    subscribeToFlag,
    readFlag,
    readFlagOnServer,
  );
  const [dismissed, setDismissed] = useState(false);
  const reduce = useReducedMotion();

  const show = !alreadyHinted && !dismissed && !deepLink;

  useEffect(() => {
    if (!show) return;

    const dismiss = () => {
      try {
        sessionStorage.setItem("hinted", "1");
      } catch {
        /* private window. The hint simply shows again next load. */
      }
      setDismissed(true);
    };

    // Any real interaction means the visitor is already exploring.
    const events = ["pointerdown", "keydown", "wheel"] as const;
    events.forEach((e) => window.addEventListener(e, dismiss, { once: true, passive: true }));
    const timer = setTimeout(dismiss, HOLD_MS);

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, dismiss));
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="hints"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 1.1, ease: "easeOut" }}
          className="pointer-events-none fixed inset-x-0 bottom-[92px] flex justify-center"
          style={{ zIndex: "var(--z-dock)" }}
        >
          <p
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--color-ink-subtle)",
              background: "rgba(12,12,16,0.5)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 999,
            }}
          >
            <span>
              Double-click a file to open it
            </span>
            <span aria-hidden="true" style={{ color: "var(--color-ink-faint)" }}>
              ·
            </span>
            <span>
              <Key>⌘</Key>
              <Key>K</Key> to search
            </span>
            <span aria-hidden="true" style={{ color: "var(--color-ink-faint)" }}>
              ·
            </span>
            <span>Right-click the desktop</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="mr-1 inline-block px-1.5 py-[1px]"
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
