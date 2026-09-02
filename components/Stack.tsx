"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ── Proficiency tiers ─────────────────────────────────────────────────────────
const tiers: { label: string; tier: "DAILY" | "WORKING" | "LEARNING"; detail: string }[] = [
  { label: "ANALYTICS",   tier: "DAILY",    detail: "SQL · Tableau · Excel · Power BI · SPSS" },
  { label: "AI",          tier: "DAILY",    detail: "LLM APIs · Compliance tooling · Workflow automation" },
  { label: "PRODUCT",     tier: "DAILY",    detail: "4 shipped products — fintech & consumer" },
  { label: "ENGINEERING", tier: "WORKING",  detail: "Next.js · Node.js · Prisma · TypeScript" },
];

/* Proficiency is neither live state nor a structural label, so it carries
   neither green nor amber. The three tiers separate on the ink ladder. */
const TIER_COLOR: Record<string, string> = {
  DAILY:    "var(--color-ink)",
  WORKING:  "var(--color-ink-muted)",
  LEARNING: "var(--color-ink-faint)",
};

// ── Category data ─────────────────────────────────────────────────────────────
const categories = [
  { label: "LANGUAGES", items: ["SQL", "Python", "R", "SAS", "Stata"]                         },
  { label: "FRONTEND",  items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { label: "BACKEND",   items: ["Node.js", "Prisma", "Twilio", "Stripe"]                       },
  { label: "ANALYTICS", items: ["Tableau", "Power BI", "Knime", "Excel", "SPSS"]               },
];

export default function Stack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const rowAnim = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="stack"
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
          {">"} SYSTEM_SPECS
        </p>

        {/* Proficiency tiers */}
        <div
          className="mb-6 p-6"
          style={{
            background: "var(--color-surface-2)",
            border:     "1px solid var(--color-hairline)",
          }}
        >
          <p
            className="font-mono text-[11px] uppercase mb-5"
            style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
          >
            PROFICIENCY_MATRIX
          </p>

          <div className="flex flex-col gap-4">
            {tiers.map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6"
              >
                {/* Label + tier badge */}
                <div className="flex items-center gap-3 sm:min-w-[200px]">
                  <span
                    className="font-mono text-[11px] uppercase"
                    style={{ color: "var(--color-ink-subtle)", letterSpacing: "0.14em" }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="font-mono text-[10px] px-1.5 py-0.5 uppercase"
                    style={{
                      color:         TIER_COLOR[row.tier],
                      border:        "1px solid var(--color-hairline-strong)",
                      borderRadius:  "var(--radius-xs)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {row.tier}
                  </span>
                </div>

                {/* Detail */}
                <span
                  className="font-mono text-[11px] leading-relaxed"
                  style={{ color: "var(--color-ink-subtle)" }}
                >
                  {row.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category rows */}
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              custom={i}
              variants={rowAnim}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-wrap items-center gap-4 p-6"
              style={{
                background: "var(--color-surface-2)",
                border:     "1px solid var(--color-hairline)",
              }}
            >
              {/* Category label — a column header, so amber is in role */}
              <span
                className="font-mono text-[11px] uppercase shrink-0"
                style={{
                  color:         "var(--color-label)",
                  letterSpacing: "0.22em",
                  minWidth:      "160px",
                }}
              >
                {cat.label}
              </span>

              {/* Skill badges. stack-badge borderColorHover is primary-dim. */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{
                      borderColor: "var(--color-primary-dim)",
                      transition:  { duration: reduce ? 0 : 0.15 },
                    }}
                    className="font-mono text-xs px-3 py-1 cursor-none"
                    style={{
                      background: "var(--color-surface-3)",
                      border:     "1px solid var(--color-hairline)",
                      color:      "var(--color-ink-muted)",
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
