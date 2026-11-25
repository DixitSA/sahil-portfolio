"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const chipCls =
  "absolute hidden rounded-full border border-[var(--color-line-strong)] bg-[var(--color-canvas)]/80 px-3.5 py-1.5 font-mono text-[11px] text-[var(--color-ink-muted)] backdrop-blur sm:block";

export default function KaalVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 2]);

  const float = (amp: number) =>
    reduce ? undefined : { y: [0, -amp, 0] };
  const floatT = (dur: number, delay = 0) => ({
    duration: dur,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  });

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(181,86,62,0.18), transparent 100%)",
        }}
      />

      <motion.div
        style={reduce ? undefined : { y, rotate }}
        className="relative w-[220px] sm:w-[250px]"
      >
        <div className="rounded-[2.6rem] border border-[var(--color-line-strong)] bg-black p-2.5">
          <div className="relative overflow-hidden rounded-[2.1rem]">
            <div className="relative aspect-[9/19.5]">
              <Image
                src="/previews/kaal-dashboard.png"
                alt="Kaal dashboard on iPhone"
                width={826}
                height={1600}
                sizes="250px"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <span
              aria-hidden
              className="absolute left-1/2 top-2.5 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>

        <motion.span
          aria-hidden
          animate={float(6)}
          transition={floatT(5)}
          className={`${chipCls} -left-24 top-[22%] lg:-left-32`}
        >
          Same input → same output
        </motion.span>
        <motion.span
          aria-hidden
          animate={float(5)}
          transition={floatT(6, 1)}
          className={`${chipCls} -right-24 bottom-[20%] lg:-right-32`}
        >
          Web + iOS from one codebase
        </motion.span>
      </motion.div>
    </div>
  );
}
