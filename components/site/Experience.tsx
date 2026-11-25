"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { roles } from "@/content";
import Reveal, { SectionHead } from "./Reveal";

/** Whole numbers (never digits inside words), with an attached %, + or unit. One capture group. */
const FIGURE = /(?<![\w.])(\d+(?:,\d{3})*(?:\.\d+)?(?:\+|%|\s(?:million|minutes))?)(?!\w)/g;

/** Splits bullet text so numeric figures render in full ink. Pure. */
function highlight(text: string) {
  return text.split(FIGURE).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-medium text-[var(--color-ink)]">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Bullets({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className={className}>
      {items.map((b) => (
        <li key={b} className="flex gap-4 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]">
          <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-[var(--color-line-strong)]" />
          <span>{highlight(b)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t border-[var(--color-line)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="02"
          eyebrow="Experience"
          title={
            <span id="experience-title">
              Trusted with <span className="serif-em">consequential</span> systems
            </span>
          }
        />

        <ol ref={listRef} className="relative pl-7 md:pl-10">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px bg-[var(--color-line)]"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: fill, originY: 0 }}
            className="absolute top-0 bottom-0 left-0 w-px bg-[var(--color-signal)]"
          />

          {roles.map((role, i) => (
            <li
              key={role.id}
              className={`relative py-10 md:py-14 ${i > 0 ? "border-t border-[var(--color-line)]" : "pt-0 md:pt-0"}`}
            >
              <Reveal delay={i * 0.08}>
                <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:block md:space-y-2">
                    <p className="font-mono text-[12px] text-[var(--color-ink-subtle)]">{role.period}</p>
                    {role.location && (
                      <p className="font-mono text-[12px] text-[var(--color-ink-subtle)]">{role.location}</p>
                    )}
                    {role.current && (
                      <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-[var(--color-ink-muted)] uppercase">
                        <span className="live-dot" aria-hidden />
                        Current
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <span
                      aria-hidden
                      className={`absolute top-[calc(0.49*clamp(28px,3.4vw,44px)_-_4px)] left-[calc(-1.75rem_+_0.5px)] h-2 w-2 -translate-x-1/2 rounded-full border md:left-[calc(-5rem_-_220px_+_0.5px)] ${
                        role.current
                          ? "border-[var(--color-signal)] bg-[var(--color-signal)]"
                          : "border-[var(--color-line-strong)] bg-[var(--color-canvas)]"
                      }`}
                    />
                    <h3 className="display text-[clamp(28px,3.4vw,44px)]">{role.company}</h3>
                    <p className="mt-3 text-[16px] text-[var(--color-ink-muted)]">{role.title}</p>
                    {role.workstreams?.length ? (
                      <div className="mt-8 space-y-8">
                        {role.workstreams.map((w) => (
                          <div key={w.name}>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                              <h4 className="text-[17px] font-medium text-[var(--color-ink)]">{w.name}</h4>
                              <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--color-ink-subtle)] uppercase">
                                {w.focus}
                              </p>
                            </div>
                            <Bullets items={w.bullets} className="mt-4 space-y-3" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Bullets items={role.bullets} className="mt-6 space-y-3" />
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
