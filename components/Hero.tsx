"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ── Data bar ──────────────────────────────────────────────────────────────────
const dataBar = [
  { label: "NAME",     value: "Sahil Dixit",        green: false },
  { label: "TITLE",    value: "Strategy Consultant", green: false },
  { label: "BASED IN", value: "Charlotte, NC",       green: false },
  { label: "STATUS",   value: "● ACTIVE",            green: true  },
];

// ── Headline words ────────────────────────────────────────────────────────────
const words = ["BUILDING", "WHAT", "DOESN'T", "EXIST YET"];

/* ── Reveal is CSS, not JS ────────────────────────────────────────────────────
   The resting state of every element below is VISIBLE. The keyframes animate
   *from* an offset toward that resting state with `animation-fill-mode: both`,
   so if the stylesheet never lands, JS is disabled, or hydration is throttled,
   the hero still renders as readable text. Nothing above the fold is gated
   behind a Framer `initial` value.                                            */
const revealCss = `
.hero-line { overflow: hidden; }
.hero-word {
  display: block;
  animation: hero-word-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes hero-word-rise {
  from { transform: translateY(110%); }
  to   { transform: translateY(0); }
}
.hero-fade {
  animation: hero-fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes hero-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-word,
  .hero-fade { animation: none; }
}
`;

export default function Hero() {
  const reduce = useReducedMotion();
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
      <style dangerouslySetInnerHTML={{ __html: revealCss }} />

      {/* ── Data bar ───────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ borderBottom: "1px solid var(--color-hairline)" }}
      >
        {dataBar.map((cell, i) => (
          <div
            key={cell.label}
            className="flex flex-col gap-1 px-3 md:px-5 py-3"
            style={{
              borderLeft: i > 0 ? "1px solid var(--color-hairline)" : undefined,
            }}
          >
            <span
              className="font-mono text-[11px] uppercase leading-[1.4]"
              style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
            >
              {cell.label}
            </span>
            <span
              className="font-mono text-xs md:text-sm leading-tight"
              style={{
                color: cell.green ? "var(--color-primary)" : "var(--color-ink)",
              }}
            >
              {cell.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Main content — full width ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-12 md:py-20 max-w-[900px] mx-auto w-full">

        {/* Boot line. The prompt glyph and caret carry the green; the sentence
            itself is body-register copy, so it sits on the ink ladder. */}
        <div className="flex items-center gap-0 mb-8">
          <span
            className="font-mono text-xs"
            style={{ color: "var(--color-primary)" }}
            aria-hidden="true"
          >
            {">"}&nbsp;
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--color-ink-muted)" }}>
            3 AI initiatives · 4 products shipped · 0 filler sentences{" "}
          </span>
          <motion.span
            className="font-mono"
            aria-hidden="true"
            animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.8, repeat: Infinity, times: [0, 0.499, 0.5, 1], ease: "linear" }
            }
            style={{ color: "var(--color-primary)", fontSize: "12px" }}
          >
            _
          </motion.span>
        </div>

        {/* Headline — per-word clip reveal, CSS driven, visible at rest */}
        <div className="mb-8">
          {words.map((word, i) => (
            <div key={word} className="hero-line" style={{ lineHeight: 0.94 }}>
              <span
                className="hero-word font-display"
                style={{
                  fontSize: "clamp(48px, 8vw, 104px)",
                  fontWeight: 300,
                  lineHeight: 0.94,
                  letterSpacing: "-0.045em",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <p
          className="hero-fade font-body text-sm leading-7 mb-10 max-w-md"
          style={{ color: "var(--color-ink-muted)", animationDelay: "340ms" }}
        >
          Strategy &amp; Management Consultant at Bank of America. Indie product
          builder. AI compliance by day, consumer fintech by night.
        </p>

        {/* Buttons */}
        <div className="hero-fade flex flex-wrap gap-3" style={{ animationDelay: "420ms" }}>
          <button
            onClick={() => scrollTo("work")}
            className="font-mono px-6 py-3 text-sm cursor-none transition-colors duration-150"
            style={{
              border:     "1px solid var(--color-primary)",
              color:      vwHover ? "var(--color-on-primary)" : "var(--color-primary)",
              background: vwHover ? "var(--color-primary)" : "transparent",
            }}
            onMouseEnter={() => setVwHover(true)}
            onMouseLeave={() => setVwHover(false)}
          >
            {">> VIEW_WORK"}
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="font-mono px-6 py-3 text-sm cursor-none transition-colors duration-150"
            style={{
              border:     ctHover
                ? "1px solid var(--color-ink-faint)"
                : "1px solid var(--color-hairline-strong)",
              color:      ctHover ? "var(--color-ink)" : "var(--color-ink-muted)",
              background: "transparent",
            }}
            onMouseEnter={() => setCtHover(true)}
            onMouseLeave={() => setCtHover(false)}
          >
            {">> CONTACT"}
          </button>
        </div>

      </div>
    </section>
  );
}
