"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Proficiency tiers ─────────────────────────────────────────────────────────
const tiers: { label: string; tier: "DAILY" | "WORKING" | "LEARNING"; detail: string }[] = [
  { label: "ANALYTICS",   tier: "DAILY",    detail: "SQL · Tableau · Excel · Power BI · SPSS" },
  { label: "AI",          tier: "DAILY",    detail: "LLM APIs · Compliance tooling · Workflow automation" },
  { label: "PRODUCT",     tier: "DAILY",    detail: "4 shipped products — fintech & consumer" },
  { label: "ENGINEERING", tier: "WORKING",  detail: "Next.js · Node.js · Prisma · TypeScript" },
];

const TIER_COLOR: Record<string, string> = {
  DAILY:    "#00ff41",
  WORKING:  "#f0b429",
  LEARNING: "#666",
};

// ── Category data ─────────────────────────────────────────────────────────────
const categories = [
  { label: "LANGUAGES", items: ["SQL", "Python", "R", "SAS", "Stata"]                         },
  { label: "FRONTEND",  items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { label: "BACKEND",   items: ["Node.js", "Prisma", "Twilio", "Stripe"]                       },
  { label: "ANALYTICS", items: ["Tableau", "Power BI", "Knime", "Excel", "SPSS"]               },
];

// ── Row animation ─────────────────────────────────────────────────────────────
const rowAnim = {
  hidden: { opacity: 0, x: -8 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Stack() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={ref}
      className="py-20 md:py-32 px-6 border-t border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <p
          className="text-xs mb-12 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          {">"} SYSTEM_SPECS
        </p>

        {/* Proficiency tiers */}
        <div
          className="mb-6 p-6"
          style={{
            background: "#111",
            border:     "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-[10px] tracking-widest mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
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
                    className="text-[10px] tracking-wider"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#666" }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 tracking-widest"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color:      TIER_COLOR[row.tier],
                      border:     `1px solid ${TIER_COLOR[row.tier]}`,
                      opacity:    0.9,
                    }}
                  >
                    {row.tier}
                  </span>
                </div>

                {/* Detail */}
                <span
                  className="text-[10px] leading-relaxed"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555" }}
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
                background: "#111",
                border:     "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Category label */}
              <span
                className="text-[10px] uppercase tracking-widest shrink-0"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color:      "#f0b429",
                  minWidth:   "160px",
                }}
              >
                {cat.label}
              </span>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{
                      borderColor:     "#00ff41",
                      color:           "#00ff41",
                      backgroundColor: "rgba(0,255,65,0.05)",
                      transition:      { duration: 0.15 },
                    }}
                    className="text-[10px] px-3 py-1 cursor-none"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "#0a0a0a",
                      border:     "1px solid rgba(255,255,255,0.08)",
                      color:      "#9a9a9a",
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
