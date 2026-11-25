"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Rises into place once, the first time it scrolls into view. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section heading: mono eyebrow + display title. */
export function SectionHead({
  index,
  eyebrow,
  title,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-[var(--color-signal)]">{index}</span>
          <span aria-hidden className="h-px w-8 bg-[var(--color-line-strong)]" />
          {eyebrow}
        </p>
        <h2 className="display max-w-[18ch] text-[clamp(36px,5.6vw,76px)]">{title}</h2>
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
