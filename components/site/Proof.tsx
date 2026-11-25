"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { profile } from "@/content";

/** "~69MM" -> { pre: "~", n: 69, post: "MM" }. Falls back to plain text. */
function parse(value: string) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { pre: m[1], n: parseFloat(m[2]), post: m[3], decimals: (m[2].split(".")[1] ?? "").length };
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const parts = parse(value);
  const [shown, setShown] = useState(parts ? `${parts.pre}0${parts.post}` : value);

  useEffect(() => {
    if (!inView || !parts) return;
    const controls = animate(0, parts.n, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(`${parts.pre}${v.toFixed(parts.decimals)}${parts.post}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/**
 * Four numbers, each with the sentence that makes it mean something.
 * Placed directly under the hero: claim, then evidence, before any narrative.
 */
export default function Proof() {
  return (
    <section aria-label="Results" className="relative border-b border-[var(--color-line)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="group relative border-[var(--color-line)] px-5 py-10 sm:px-8 sm:py-14 [&:not(:first-child)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-t-0 lg:[&:not(:first-child)]:border-l"
          >
            <p className="eyebrow mb-6">{s.label.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</p>
            <p className="display mb-4 text-[clamp(48px,5.4vw,72px)] tabular-nums text-[var(--color-ink)]">
              <Counter value={s.value} />
            </p>
            <p className="max-w-[26ch] text-[14.5px] leading-[1.55] text-[var(--color-ink-muted)]">{s.sub}</p>
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--color-signal)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
