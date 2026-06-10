"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ── Data bar ──────────────────────────────────────────────────────────────────
const dataBar = [
  { label: "NAME",     value: "Sahil Dixit",        green: false },
  { label: "TITLE",    value: "Strategy Consultant", green: false },
  { label: "BASED IN", value: "Charlotte, NC",       green: false },
  { label: "STATUS",   value: "● ACTIVE",            green: true  },
];

// ── Headline words ────────────────────────────────────────────────────────────
const words = ["BUILDING", "WHAT", "DOESN'T", "EXIST YET"];

// ── Word reveal animation ─────────────────────────────────────────────────────
const wordAnim = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const [vwHover, setVwHover] = useState(false);
  const [ctHover, setCtHover] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden min-h-screen"
      style={{ paddingTop: "44px" }}
    >
      {/* ── Data bar ───────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {dataBar.map((cell, i) => (
          <div
            key={cell.label}
            className="flex flex-col gap-1 px-3 md:px-5 py-3"
            style={{
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : undefined,
            }}
          >
            <span
              className="text-[10px] uppercase tracking-widest leading-none"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
            >
              {cell.label}
            </span>
            <span
              className="text-xs md:text-sm leading-tight"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: cell.green ? "#00ff41" : "#e8e8e8",
              }}
            >
              {cell.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Main content — full width ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-12 md:py-20 max-w-[900px] mx-auto w-full">

        {/* Boot line */}
        <div className="flex items-center gap-0 mb-8">
          <span
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ff41" }}
          >
            {">"} 3 AI initiatives · 4 products shipped · 0 filler sentences{" "}
          </span>
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.499, 0.5, 1], ease: "linear" }}
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ff41", fontSize: "12px" }}
          >
            _
          </motion.span>
        </div>

        {/* Headline — per-word clip reveal */}
        <div className="mb-8">
          {words.map((word, i) => (
            <div key={word} className="overflow-hidden" style={{ lineHeight: 0.92 }}>
              <motion.span
                custom={i}
                variants={wordAnim}
                initial="hidden"
                animate="show"
                className="block text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(72px, 12vw, 148px)",
                  lineHeight: 0.9,
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          className="text-sm leading-7 mb-10 max-w-md"
          style={{ fontFamily: "'Inter', sans-serif", color: "#9a9a9a" }}
        >
          Strategy &amp; Management Consultant at Bank of America. Indie product
          builder. AI compliance by day, consumer fintech by night.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => scrollTo("work")}
            className="px-6 py-2.5 text-xs cursor-none transition-all duration-150"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border:     "1px solid #00ff41",
              color:      vwHover ? "#000" : "#00ff41",
              background: vwHover ? "#00ff41" : "transparent",
            }}
            onMouseEnter={() => setVwHover(true)}
            onMouseLeave={() => setVwHover(false)}
          >
            {">> VIEW_WORK"}
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="px-6 py-2.5 text-xs cursor-none transition-all duration-150"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border:     ctHover ? "1px solid #fff" : "1px solid rgba(255,255,255,0.2)",
              color:      ctHover ? "#fff" : "#9a9a9a",
              background: "transparent",
            }}
            onMouseEnter={() => setCtHover(true)}
            onMouseLeave={() => setCtHover(false)}
          >
            {">> CONTACT"}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
