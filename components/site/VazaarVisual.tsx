"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const chipCls =
  "absolute hidden rounded-full border border-[var(--color-line-strong)] bg-[var(--color-canvas)]/80 px-3.5 py-1.5 font-mono text-[11px] text-[var(--color-ink-muted)] backdrop-blur sm:block";

export default function VazaarVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [6, 0]);

  const float = (amp: number) => (reduce ? undefined : { y: [0, -amp, 0] });
  const floatT = (dur: number, delay = 0) => ({
    duration: dur,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  });

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[inherit] w-full items-center justify-center p-6 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(196,94,38,0.20), transparent 60%)",
        }}
      />

      <div className="relative w-full min-w-0 max-w-[460px]" style={{ perspective: 1200 }}>
        <motion.div style={reduce ? undefined : { y, rotateX }} className="relative">
          <div className="overflow-hidden rounded-xl border border-[var(--color-line-strong)] bg-[#0c0c0f] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="relative flex h-9 items-center border-b border-[var(--color-line)] px-3">
              <div aria-hidden className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
                <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
                <span className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.18)]" />
              </div>
              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] sm:px-3 sm:text-[11px] text-[var(--color-ink-subtle)]"
              >
                vazaar-site.vercel.app
              </span>
            </div>
            <Image
              src="/previews/vazaar.jpg"
              alt="Vazaar landing page: The underwriting AI market, in one place."
              width={1920}
              height={1080}
              sizes="(min-width: 640px) 460px, 90vw"
              className="block h-auto w-full"
            />
          </div>

          <motion.span
            aria-hidden
            animate={float(6)}
            transition={floatT(5)}
            className={`${chipCls} -left-6 -top-4 lg:-left-10`}
          >
            174 solutions researched
          </motion.span>
          <motion.span
            aria-hidden
            animate={float(5)}
            transition={floatT(6, 1)}
            className={`${chipCls} -bottom-4 -right-6 lg:-right-10`}
          >
            AI drafts · a deterministic gate publishes
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
