"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const products: { index: string; name: string; desc: string; tags: string[]; status: string; href?: string }[] = [
  {
    index: "P01",
    name:  "AxiraLite",
    desc:  "SMS-powered retention SaaS for physical retail. Automated re-engagement campaigns.",
    tags:  ["Next.js", "Prisma", "Twilio", "Stripe"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/axira-lite",
  },
  {
    index: "P02",
    name:  "VibeQueue",
    desc:  "Lets bar patrons queue songs to the venue's Spotify. Jukebox reimagined.",
    tags:  ["Next.js", "Firebase", "Spotify API"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/VibeQueue",
  },
  {
    index: "P03",
    name:  "Kaal",
    desc:  "Deterministic Vedic astrology API. Processes birth charts and returns structured life-guidance across preset decision categories.",
    tags:  ["Next.js", "TypeScript", "Capacitor"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/kaal",
  },
  {
    index: "P04",
    name:  "MANIFEST",
    desc:  "Fleet management platform with real-time vehicle tracking, driver compliance monitoring, and operational analytics.",
    tags:  ["Next.js", "Fastify", "PostgreSQL", "WebSocket"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/MANIFEST",
  },
  {
    index: "P05",
    name:  "Polymarket Copytrader",
    desc:  "Bot that mirrors positions from top traders on Polymarket prediction markets.",
    tags:  ["Python", "Polymarket API"],
    status: "BUILD",
  },
];

const consulting: { index: string; name: string; desc: string; tags: string[]; status: string; href?: string }[] = [
  {
    index: "C01",
    name:  "SCRIBE",
    desc:  "AI-assisted complaint summarization supporting ~30 model-level submissions.",
    tags:  ["AI", "LLM", "Compliance"],
    status: "ACTIVE",
  },
  {
    index: "C02",
    name:  "TRACE",
    desc:  "LLM-powered audit trail generation for ~8 regulatory responses.",
    tags:  ["AI", "Audit", "Regulatory"],
    status: "ACTIVE",
  },
  {
    index: "C03",
    name:  "CRU",
    desc:  "NLP-based complaint triage. ~80% of submissions completed ahead of deadline.",
    tags:  ["NLP", "Compliance", "Operations"],
    status: "ACTIVE",
  },
];

// ── Status colors ─────────────────────────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
  LIVE:   "#00ff41",
  ACTIVE: "#00ff41",
  BUILD:  "#f0b429",
};

// ── Row animation ─────────────────────────────────────────────────────────────
const rowAnim = {
  hidden: { opacity: 0, x: -8 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ── ProjectRow ────────────────────────────────────────────────────────────────
function ProjectRow({
  index,
  name,
  desc,
  tags,
  status,
  href,
  animIndex,
  inView,
}: {
  index: string;
  name: string;
  desc: string;
  tags: string[];
  status: string;
  href?: string;
  animIndex: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const rowStyle = {
    background:  hovered ? "rgba(0,255,65,0.02)" : "#111",
    border:      "1px solid rgba(255,255,255,0.07)",
    boxShadow:   hovered ? "inset 0 -2px 0 #00ff41" : "inset 0 -2px 0 transparent",
    transition:  "background 0.2s, box-shadow 0.2s",
  };

  const inner = (
    <>
      {/* INDEX */}
      <span
        className="text-xs shrink-0 min-w-[48px]"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555" }}
      >
        {index}
      </span>

      {/* NAME + DESC */}
      <div className="flex-1 min-w-0">
        <p
          className="text-2xl leading-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: hovered ? "#00ff41" : "#e8e8e8",
            transition: "color 0.15s",
          }}
        >
          {name}
        </p>
        <p
          className="text-xs leading-relaxed mt-0.5"
          style={{ fontFamily: "'Inter', sans-serif", color: "#777" }}
        >
          {desc}
        </p>
      </div>

      {/* TAGS */}
      <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[260px] shrink-0">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border:     "1px solid rgba(240,180,41,0.3)",
              color:      "#f0b429",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* STATUS + OPEN */}
      <div className="flex items-center gap-3 shrink-0 justify-end" style={{ minWidth: "80px" }}>
        <span
          className="text-xs whitespace-nowrap"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: STATUS_COLOR[status] ?? "#00ff41" }}
        >
          <span aria-hidden="true">● </span>{status}
        </span>
        <AnimatePresence>
          {hovered && href && (
            <motion.span
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              aria-hidden="true"
              className="text-xs whitespace-nowrap hidden md:inline"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00ff41" }}
            >
              {">> OPEN"}
            </motion.span>
          )}
          {hovered && !href && status === "LIVE" && (
            <motion.span
              key="link-soon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              aria-hidden="true"
              className="text-xs whitespace-nowrap hidden md:inline"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
            >
              [LINK_SOON]
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  const sharedProps = {
    custom: animIndex,
    variants: rowAnim,
    initial: "hidden" as const,
    animate: inView ? ("show" as const) : ("hidden" as const),
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: "flex items-center gap-4 px-5 py-4",
    style: rowStyle,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${name} on GitHub`}
        className="flex items-center gap-4 px-5 py-4 cursor-none"
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div {...sharedProps} className="flex items-center gap-4 px-5 py-4 cursor-none">
      {inner}
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Work() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="work"
      ref={ref}
      className="py-20 md:py-32 px-6 border-t border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <p
          className="text-xs mb-12 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          {">"} PROJECT_REGISTRY
        </p>

        {/* Products */}
        <p
          className="text-xs mb-4 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          // PRODUCTS [05]
        </p>
        <div className="flex flex-col gap-2">
          {products.map((p, i) => (
            <ProjectRow key={p.index} {...p} animIndex={i} inView={inView} />
          ))}
        </div>

        {/* Consulting */}
        <p
          className="text-xs mb-4 mt-12 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          // CONSULTING [03]
        </p>
        <div className="flex flex-col gap-2">
          {consulting.map((p, i) => (
            <ProjectRow
              key={p.index}
              {...p}
              animIndex={products.length + i}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
