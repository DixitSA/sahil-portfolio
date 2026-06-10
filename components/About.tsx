"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  { label: "PRODUCTS_SHIPPED", num: "05",   sub: "FINTECH & CONSUMER",         wide: false },
  { label: "ON_TIME_RATE",     num: "~80%", sub: "REGULATORY SUBMISSIONS",     wide: false },
];

// ── Animations ────────────────────────────────────────────────────────────────
const panelAnim = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-40 px-6 border-t border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <p
          className="text-xs mb-12 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
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
              background: "#111",
              border:     "1px solid rgba(255,255,255,0.07)",
              padding:    "2.5rem",
            }}
          >
            {/* Bio */}
            <p
              className="text-sm leading-7"
              style={{ fontFamily: "'Inter', sans-serif", color: "#9a9a9a" }}
            >
              Strategy &amp; Management Consultant at Bank of America, focused on AI
              regulatory compliance and consumer bank strategy. I studied Financial Technology
              with a Statistics minor at VCU. Outside of work, I build and ship fintech and
              consumer products.
            </p>

            {/* Dashed divider */}
            <div
              style={{
                borderTop: "1px dashed rgba(255,255,255,0.05)",
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
                    className="text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#666" }}
                  >
                    {key}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#444" }}
                  >
                    →
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9a9a9a" }}
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
              <motion.div
                key={s.label}
                custom={i + 1}
                variants={panelAnim}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                whileHover={{ boxShadow: "inset 0 -2px 0 #00ff41" }}
                transition={{ duration: 0.15 }}
                className={`flex flex-col justify-between ${s.wide ? "col-span-2" : ""}`}
                style={{
                  background:  "#111",
                  border:      "1px solid rgba(255,255,255,0.07)",
                  padding:     "2rem",
                  minHeight:   "140px",
                  boxShadow:   "inset 0 0 0 transparent",
                }}
              >
                {/* Label */}
                <p
                  className="text-[10px] uppercase tracking-widest mb-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
                >
                  {s.label}
                </p>

                {/* Big number */}
                <p
                  className="text-5xl md:text-7xl leading-none my-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#00ff41" }}
                >
                  {s.num}
                </p>

                {/* Subtext */}
                <p
                  className="text-[10px] uppercase tracking-wider mt-2"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "#666" }}
                >
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
