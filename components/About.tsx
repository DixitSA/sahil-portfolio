"use client";

import { Fragment, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

// ── Left panel data ───────────────────────────────────────────────────────────
const kvPairs = [
  { key: "INSTITUTION", value: "Bank of America"               },
  { key: "DEGREE",      value: "B.S. Financial Technology"     },
  { key: "UNIVERSITY",  value: "Virginia Commonwealth Univ."   },
  { key: "LANGUAGES",   value: "Hindi · Gujarati · English"    },
];

// ── Right panel stats (3 items — first spans full width) ─────────────────────
const stats = [
  { label: "AI_INITIATIVES",   num: "03",   sub: "AI COMPLIANCE TOOLS",        wide: true  },
  { label: "PRODUCTS_SHIPPED", num: "04",   sub: "LIVE, WEB & IOS",            wide: false },
  { label: "ON_TIME_RATE",     num: "~80%", sub: "REGULATORY SUBMISSIONS",     wide: false },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  // Reduced motion degrades to opacity only. No transform, no stagger drift.
  const panelAnim: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-32 px-6"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section eyebrow — structural label, amber */}
        <p
          className="font-mono text-[11px] uppercase mb-12"
          style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
        >
          {">"} PROFILE_DATA
        </p>

        <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 items-start">

          {/* ── LEFT PANEL ───────────────────────────────────────────────── */}
          <motion.div
            custom={0}
            variants={panelAnim}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            style={{
              background: "var(--color-surface-2)",
              border:     "1px solid var(--color-hairline)",
              padding:    "2.5rem",
            }}
          >
            {/* Bio */}
            <p
              className="font-body text-base leading-[1.7]"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Strategy &amp; Management Consultant at Bank of America. I support a 3-year
              growth plan for a ~69MM-client Consumer Bank and AI/ML model-risk governance
              across 3 complaint-handling workstreams. B.S. in Financial Technology with a
              Statistics minor at VCU, 3.7 GPA. Outside of work I build and ship products:
              multi-agent LLM systems and a Vedic astrology decision app live on web and iOS.
            </p>

            {/* Dashed divider */}
            <div
              style={{
                borderTop: "1px dashed var(--color-hairline)",
                margin:    "1.5rem 0",
              }}
            />

            {/* Key / value pairs — Fragment key on outer element, not inner spans */}
            <div
              className="grid gap-x-3 gap-y-2.5"
              style={{ gridTemplateColumns: "max-content auto 1fr" }}
            >
              {kvPairs.map(({ key, value }) => (
                <Fragment key={key}>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--color-ink-subtle)" }}
                  >
                    {key}
                  </span>
                  <span
                    className="font-mono text-xs"
                    aria-hidden="true"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    →
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {value}
                  </span>
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT PANEL — asymmetric stat layout ─────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <StatPanel
                key={s.label}
                stat={s}
                index={i + 1}
                inView={inView}
                variants={panelAnim}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* Elevation is a hairline, not a shadow. The old `whileHover` inset box-shadow
   is replaced by a borderColor step from hairline to hairline-strong. */
function StatPanel({
  stat, index, inView, variants,
}: {
  stat: { label: string; num: string; sub: string; wide: boolean };
  index: number;
  inView: boolean;
  variants: Variants;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col justify-between ${stat.wide ? "col-span-2" : ""}`}
      style={{
        background:  "var(--color-surface-2)",
        border:      `1px solid ${hovered ? "var(--color-hairline-strong)" : "var(--color-hairline)"}`,
        transition:  "border-color 150ms var(--ease-standard)",
        padding:     "2rem",
        minHeight:   "140px",
      }}
    >
      {/* Label — structural, amber */}
      <p
        className="font-mono text-[10px] uppercase mb-2"
        style={{ color: "var(--color-label)", letterSpacing: "0.14em" }}
      >
        {stat.label}
      </p>

      {/* Big number. Not a live signal, so it sits on the ink ladder, not green. */}
      <p
        className="font-display my-1"
        style={{
          fontSize:      "clamp(40px, 6vw, 60px)",
          fontWeight:    300,
          lineHeight:    1,
          letterSpacing: "-0.035em",
          color:         "var(--color-ink)",
        }}
      >
        {stat.num}
      </p>

      {/* Subtext */}
      <p
        className="font-mono text-[10px] uppercase mt-2"
        style={{ color: "var(--color-ink-subtle)", letterSpacing: "0.14em" }}
      >
        {stat.sub}
      </p>
    </motion.div>
  );
}
