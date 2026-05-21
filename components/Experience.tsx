"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    company: "Bank of America",
    role: "Strategy & Management Consultant, Consumer and Small Business",
    date: "July 2025 – Present",
    location: "Charlotte, NC",
    bullets: [
      "Analyzed Consumer Bank performance and market trends to support a 3-year strategic plan identifying growth opportunities and risks",
      "Synthesized cross-functional inputs into executive-ready materials for long-range planning and Investor Day messaging",
      "Coordinated AI integration across 3 initiatives (SCRIBE, TRACE, CRU), managing ~8 regulatory responses and ~30 model-level submissions",
      "Completed ~80% of audit and regulatory submissions ahead of deadline during active model risk reviews",
    ],
  },
  {
    company: "Capital One",
    role: "Business Analyst Intern, Retail Banking",
    date: "July 2024 – August 2024",
    location: "McLean, VA",
    bullets: [
      "Analyzed customer complaint logs and call data across 5-figure interaction volumes using SQL and Excel",
      "Designed and evaluated A/B tests comparing bank account linking strategies for the Retail Bank Fraud team",
    ],
  },
  {
    company: "Alliant Insurance Services",
    role: "Benefits Analyst (Actuarial Sciences)",
    date: "June 2023 – December 2023",
    location: "McLean, VA",
    bullets: [
      "Analyzed healthcare claims for 7 employer clients using Excel-based actuarial models, contributing to ~10% average premium reduction",
      "Evaluated pricing data and vendor disruption scenarios to support annual valuations and renewal decisions",
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(36px,5vw,56px)] font-normal text-white mb-16 leading-none"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
        >
          Experience
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical indigo line */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
            style={{ background: "rgba(99,102,241,0.2)" }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative pl-10 pb-14 last:pb-0"
            >
              {/* Timeline dot */}
              <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                  left: "-4px",
                  top: "14px",
                  width: "9px",
                  height: "9px",
                  background: "#080808",
                  border: "2px solid rgba(99,102,241,0.55)",
                }}
              />

              {/* Company + date row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                <h3
                  className="text-[clamp(22px,2.8vw,30px)] font-normal text-white leading-tight"
                  style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
                >
                  {exp.company}
                </h3>
                <span
                  className="text-xs text-gray-500 tracking-wide whitespace-nowrap shrink-0"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {exp.date} · {exp.location}
                </span>
              </div>

              {/* Role */}
              <p
                className="text-sm text-gray-400 mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {exp.role}
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-2.5">
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[9px] shrink-0 rounded-full"
                      style={{
                        width: "4px",
                        height: "4px",
                        background: "rgba(99,102,241,0.45)",
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
