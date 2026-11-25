"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { roles } from "@/content";
import Reveal, { SectionHead } from "./Reveal";

const FIGURE = /(~?\$?\d+(?:[.,]\d+)*(?:\s?(?:MM|%|minutes|hours))?)/g;

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
              <span
                aria-hidden
                className={`absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full border ${
                  i > 0 ? "top-[calc(2.5rem+0.55rem)] md:top-[calc(3.5rem+0.75rem)]" : "top-[0.55rem] md:top-[0.75rem]"
                } ${
                  role.current
                    ? "border-[var(--color-signal)] bg-[var(--color-signal)]"
                    : "border-[var(--color-line-strong)] bg-[var(--color-canvas)]"
                }`}
              />
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
                  <div>
                    <h3 className="display text-[clamp(28px,3.4vw,44px)]">{role.company}</h3>
                    <p className="mt-3 text-[16px] text-[var(--color-ink-muted)]">{role.title}</p>
                    <ul className="mt-6 space-y-3">
                      {role.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-4 text-[15.5px] leading-relaxed text-[var(--color-ink-muted)]"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.8em] h-px w-3 shrink-0 bg-[var(--color-line-strong)]"
                          />
                          <span>{highlight(b)}</span>
                        </li>
                      ))}
                    </ul>
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
