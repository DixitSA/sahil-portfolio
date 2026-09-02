"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const experiences = [
  {
    id:      "bofa",
    company: "BANK OF AMERICA",
    role:    "Strategy & Management Consultant",
    period:  "2025–PRESENT",
    accent:  true,
    bullets: [
      "Delivered ~8 regulatory responses and ~30 model-level submissions ~80% ahead of deadline for AI/ML complaint-handling models under active model-risk review, coordinating audit and exam evidence across three enterprise systems",
      "Cut ad-hoc slide turnaround from hours to ~15 minutes with a governed generative-AI prompt framework that turns rough inputs into source-backed executive slides, adopted teamwide",
      "Prioritized growth opportunities and key risks in a 3-year strategic plan for a ~69MM-client Consumer Bank, diagnosing performance, market trends, and customer dynamics for senior leadership",
      "Built an executive dashboard giving leadership real-time visibility into testing scope, progress, and control gaps across 3 AI complaint workstreams",
    ],
  },
  {
    id:      "capital-one",
    company: "CAPITAL ONE",
    role:    "Business Analyst, Retail Banking",
    period:  "2024",
    accent:  false,
    bullets: [
      "Designed and evaluated A/B tests comparing bank account linking strategies for the Retail Bank Fraud team",
      "Analyzed customer complaint logs and call data across 5-figure interaction volumes using SQL and Excel",
    ],
  },
  {
    id:      "alliant",
    company: "ALLIANT INSURANCE",
    role:    "Benefits Analyst, Actuarial Sciences",
    period:  "2023",
    accent:  false,
    bullets: [
      "Analyzed healthcare claims for 7 employer clients using Excel-based actuarial models, contributing to ~10% average premium reduction",
      "Modeled pricing data and vendor alternatives to inform annual plan valuations and carrier renewals",
    ],
  },
];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const entryAnim = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="experience"
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
          {">"} WORK_HISTORY
        </p>

        {/* Entries */}
        <div>
          {experiences.map((exp, i) => (
            <div key={exp.id}>
              <motion.div
                custom={i}
                variants={entryAnim}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                style={{
                  /* Emphasis comes from a surface step and a stronger hairline.
                     Green is reserved for live state, so it is not used here. */
                  background: "var(--color-surface-2)",
                  border:     exp.accent
                    ? "1px solid var(--color-hairline-strong)"
                    : "1px solid var(--color-hairline)",
                  padding: "2.5rem",
                }}
              >
                {/* Company name — display type at weight 300 */}
                <p
                  className="font-display"
                  style={{
                    fontSize:      "clamp(24px, 3.4vw, 34px)",
                    fontWeight:    300,
                    lineHeight:    1,
                    letterSpacing: "-0.035em",
                    textTransform: "uppercase",
                    color:         exp.accent ? "var(--color-ink)" : "var(--color-ink-muted)",
                  }}
                >
                  {exp.company}
                </p>

                {/* Period is a structural label (amber). The role is content (ink). */}
                <p className="font-mono text-[11px] mt-1.5 mb-5">
                  <span style={{ color: "var(--color-label)", letterSpacing: "0.1em" }}>
                    [{exp.period}]
                  </span>
                  <span style={{ color: "var(--color-ink-subtle)" }}>
                    {" "}· {exp.role}
                  </span>
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={`${exp.id}-${j}`}
                      className="font-body text-sm leading-relaxed"
                      style={{
                        color:      j === 0 ? "var(--color-ink-muted)" : "var(--color-ink-subtle)",
                        fontWeight: j === 0 ? 500 : 400,
                      }}
                    >
                      <span aria-hidden="true">{j === 0 ? "▸  " : "→  "}</span>{bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Dashed divider between entries (not after last) */}
              {i < experiences.length - 1 && (
                <div
                  style={{
                    borderTop: "1px dashed var(--color-hairline)",
                    margin:    "2rem 0",
                  }}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
