"use client";

import { Fragment, Suspense, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { roles } from "@/content";
import HeroShader from "./HeroShader";
import ForCompany from "./ForCompany";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Headline as words. `em` words set in the italic serif. */
const HEADLINE: { w: string; em?: boolean }[] = [
  { w: "Most" },
  { w: "AI" },
  { w: "programs" },
  { w: "die" },
  { w: "between" },
  { w: "what" },
  { w: "a" },
  { w: "model" },
  { w: "can" },
  { w: "do", em: true },
  { w: "and" },
  { w: "what" },
  { w: "an" },
  { w: "institution" },
  { w: "can" },
  { w: "defend.", em: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 70% 10%, #0d1714 0%, #08080a 60%)",
      }}
    >
      <HeroShader />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-24 pb-14 sm:px-8 md:pt-28"
      >
        <Suspense fallback={null}>
          <ForCompany />
        </Suspense>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[var(--color-ink-muted)] sm:text-[14px]"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/[0.03] px-3 py-1 text-[var(--color-ink)]">
            <span className="live-dot" aria-hidden />
            Open to new roles
          </span>
          <span>Strategy &amp; Management Analyst, Bank of America</span>
        </motion.p>

        <h1 className="display max-w-[22ch] text-[clamp(38px,5.6vw,88px)] text-[var(--color-ink)]">
          {HEADLINE.map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${word.em ? "serif-em pr-[0.04em]" : ""}`}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.045 }}
                >
                  {word.w}
                </motion.span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          className="mt-6 grid max-w-3xl gap-6 md:mt-10"
        >
          <p className="text-[16px] leading-[1.55] text-[var(--color-ink-muted)] sm:text-[19px]">
            I&apos;m <span className="text-[var(--color-ink)]">Sahil Dixit</span>, and I work in that
            gap. By day: fraud strategy, AI model governance and consumer strategy at a bank serving
            69 million clients. By night: production software, live on the web and iOS.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[15px] font-medium text-[var(--color-canvas)] transition-transform active:scale-[0.98]"
            >
              See the work
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-6 py-3.5 text-[15px] text-[var(--color-ink)] transition-colors hover:bg-white/[0.05]"
            >
              Get in touch
            </a>
            <Link
              href="/kaal"
              className="inline-flex min-h-[44px] items-center px-2 text-[15px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              Try Kaal live →
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Credential rail. The fastest possible answer to "where has this
          person been", before a single scroll. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="relative z-10 border-t border-[var(--color-line)]"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
          <span className="eyebrow">Background</span>
          {roles.map((r) => (
            <span key={r.id} className="text-[14px] font-medium tracking-tight text-[var(--color-ink-muted)]">
              {r.company}
            </span>
          ))}
          <span className="text-[14px] font-medium tracking-tight text-[var(--color-ink-muted)]">
            VCU · B.S. FinTech
          </span>
        </div>
      </motion.div>
    </section>
  );
}
