"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const experiences = [
  {
    id:      "bofa",
    company: "BANK OF AMERICA",
    role:    "Strategy & Management Consultant",
    period:  "2025–PRESENT",
    accent:  true,
    bullets: [
      "Coordinated AI integration across 3 initiatives (SCRIBE, TRACE, CRU), managing ~8 regulatory responses and ~30 model-level submissions",
      "Completed ~80% of audit and regulatory submissions ahead of deadline during active model risk reviews",
      "Analyzed Consumer Bank performance and market trends to support a 3-year strategic plan identifying growth opportunities and risks",
      "Synthesized cross-functional inputs into executive-ready materials for long-range planning and Investor Day messaging",
    ],
  },
  {
    id:      "capital-one",
    company: "CAPITAL ONE",
    role:    "Business Analyst Intern, Retail Banking",
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
      "Evaluated pricing data and vendor disruption scenarios to support annual valuations and renewal decisions",
    ],
  },
];

// ── Animation ─────────────────────────────────────────────────────────────────
const entryAnim = {
  hidden: { opacity: 0, x: -8 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 md:py-32 px-6 border-t border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <p
          className="text-xs mb-12 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
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
                  background: exp.accent ? "rgba(0,255,65,0.02)" : "#111",
                  border:     exp.accent
                    ? "1px solid rgba(0,255,65,0.25)"
                    : "1px solid rgba(255,255,255,0.06)",
                  padding: "2rem",
                }}
              >
                {/* Company name — display type */}
                <p
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize:   "clamp(28px, 4vw, 38px)",
                    lineHeight: 1,
                    color:      exp.accent ? "#e8e8e8" : "#aaa",
                    letterSpacing: "0.02em",
                  }}
                >
                  {exp.company}
                </p>

                {/* Role + period — monospace subline */}
                <p
                  className="text-[11px] tracking-wider mt-1.5 mb-5"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
                >
                  [{exp.period}] · {exp.role}
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={`${exp.id}-${j}`}
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color:      j === 0 ? "#cccccc" : "#555",
                        fontWeight: j === 0 ? 500 : 400,
                      }}
                    >
                      {j === 0 ? "▸  " : "→  "}{bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Dashed divider between entries (not after last) */}
              {i < experiences.length - 1 && (
                <div
                  style={{
                    borderTop: "1px dashed rgba(255,255,255,0.06)",
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
