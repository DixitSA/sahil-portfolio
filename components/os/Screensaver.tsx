"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Idle screensaver.
 *
 * After a stretch of no input the desktop drifts into an ink field: Devanagari
 * and Gujarati glyphs floating like brush marks on wet paper, with the clock
 * over the top. Any input dismisses it instantly.
 *
 * Purely for delight. It holds no content, so nothing is lost if a visitor
 * never sees it, and it cannot trap anyone: pointer, key, scroll or touch all
 * wake it.
 */

const IDLE_MS = 60_000;

/** Devanagari and Gujarati. Drawn as marks, not as words. */
const GLYPHS = [
  "अ", "क", "ग", "ध", "म", "र", "स", "ह", "ॐ",
  "ક", "ગ", "જ", "ધ", "મ", "ર", "સ", "હ",
];

interface Mark {
  id: number;
  glyph: string;
  x: number;
  y: number;
  size: number;
  drift: number;
  delay: number;
  duration: number;
  opacity: number;
}

function buildMarks(count: number): Mark[] {
  // Deterministic-ish spread so marks do not clump. Seeded by index, not
  // Math.random at module scope, so there is no hydration mismatch risk.
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
    return {
      id: i,
      glyph: GLYPHS[i % GLYPHS.length],
      x: r(1) * 100,
      y: r(2) * 100,
      size: 42 + r(3) * 120,
      drift: -30 - r(4) * 90,
      delay: r(5) * 14,
      duration: 22 + r(6) * 20,
      opacity: 0.05 + r(7) * 0.12,
    };
  });
}

export default function Screensaver() {
  const [idle, setIdle] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const reduce = useReducedMotion();
  // Static once computed. useMemo rather than a ref, which cannot be read
  // during render.
  const marks = useMemo(() => buildMarks(22), []);

  useEffect(() => {
    // Reduced motion opts out entirely: a drifting field is exactly the kind
    // of ambient movement that setting exists to suppress.
    if (reduce) return;

    let timer: ReturnType<typeof setTimeout>;

    const sleep = () => setIdle(true);
    const wake = () => {
      setIdle((was) => (was ? false : was));
      clearTimeout(timer);
      timer = setTimeout(sleep, IDLE_MS);
    };

    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    timer = setTimeout(sleep, IDLE_MS);

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, wake));
    };
  }, [reduce]);

  useEffect(() => {
    if (!idle) return;
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, [idle]);

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <AnimatePresence>
      {idle && (
        <motion.div
          key="screensaver"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="fixed inset-0 overflow-hidden"
          style={{ zIndex: "var(--z-boot)", background: "#07060b" }}
          aria-hidden="true"
        >
          {marks.map((m) => (
            <span
              key={m.id}
              className="screensaver-mark absolute select-none"
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                fontSize: m.size,
                color: "#ffffff",
                opacity: m.opacity,
                animationDelay: `${m.delay}s`,
                animationDuration: `${m.duration}s`,
                ["--drift" as string]: `${m.drift}px`,
              }}
            >
              {m.glyph}
            </span>
          ))}

          <div className="absolute inset-x-0 bottom-[12vh] flex flex-col items-center">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(56px, 8vw, 96px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.9)",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {time}
            </p>
            <p
              className="mt-4 uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              move to wake
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
