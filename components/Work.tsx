"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
type Project = {
  index: string;
  name: string;
  desc: string;
  tags: string[];
  status: string;
  href?: string;
  accent: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const products: Project[] = [
  {
    index: "P01",
    name:  "AxiraLite",
    desc:  "SMS-powered retention SaaS for physical retail. Automated re-engagement campaigns.",
    tags:  ["Next.js", "Prisma", "Twilio", "Stripe"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/axira-lite",
    accent: "#00ff41",
  },
  {
    index: "P02",
    name:  "VibeQueue",
    desc:  "Lets bar patrons queue songs to the venue's Spotify. Jukebox reimagined.",
    tags:  ["Next.js", "Firebase", "Spotify API"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/VibeQueue",
    accent: "#00ff41",
  },
  {
    index: "P03",
    name:  "Kaal",
    desc:  "Deterministic Vedic astrology API. Give it a birth chart, get structured guidance across career, health, and relationships.",
    tags:  ["Next.js", "TypeScript", "Capacitor"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/kaal",
    accent: "#f0b429",
  },
  {
    index: "P04",
    name:  "MANIFEST",
    desc:  "Fleet management platform with real-time vehicle tracking and driver compliance monitoring.",
    tags:  ["Next.js", "Fastify", "PostgreSQL", "WebSocket"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/MANIFEST",
    accent: "#00ff41",
  },
  {
    index: "P05",
    name:  "Polymarket Copytrader",
    desc:  "Bot that mirrors positions from top traders on Polymarket prediction markets.",
    tags:  ["Python", "Polymarket API"],
    status: "BUILD",
    accent: "#f0b429",
  },
];

const consulting: Project[] = [
  {
    index: "C01",
    name:  "SCRIBE",
    desc:  "AI tool that summarizes consumer complaints for regulatory filings — supported ~30 model submissions.",
    tags:  ["AI", "LLM", "Compliance"],
    status: "ACTIVE",
    accent: "#00ff41",
  },
  {
    index: "C02",
    name:  "TRACE",
    desc:  "LLM tool that generates audit trails for regulatory filings — used in ~8 formal responses.",
    tags:  ["AI", "Audit", "Regulatory"],
    status: "ACTIVE",
    accent: "#00ff41",
  },
  {
    index: "C03",
    name:  "CRU",
    desc:  "NLP-based complaint triage. ~80% of submissions completed ahead of deadline.",
    tags:  ["NLP", "Compliance", "Operations"],
    status: "ACTIVE",
    accent: "#00ff41",
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

// ── Featured hero card ────────────────────────────────────────────────────────
function FeaturedProject({ project, inView }: { project: Project; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} on GitHub`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block mb-16 cursor-none"
      style={{
        background:    hovered ? "rgba(0,255,65,0.02)" : "#111",
        border:        `1px solid ${hovered ? "rgba(0,255,65,0.35)" : "rgba(255,255,255,0.07)"}`,
        padding:       "2.5rem",
        textDecoration: "none",
        transition:    "background 0.25s, border-color 0.25s",
      }}
    >
      {/* Index + status */}
      <div className="flex items-center justify-between mb-8">
        <span
          style={{
            fontFamily:    "'JetBrains Mono', monospace",
            fontSize:      10,
            color:         "#555",
            letterSpacing: "0.08em",
          }}
        >
          {project.index} · FEATURED
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize:   10,
            color:      STATUS_COLOR[project.status],
          }}
        >
          <span aria-hidden="true">● </span>{project.status}
        </span>
      </div>

      {/* Name — large display */}
      <p
        style={{
          fontFamily:    "'Bebas Neue', sans-serif",
          fontSize:      "clamp(64px, 10vw, 120px)",
          lineHeight:    0.88,
          letterSpacing: "0.01em",
          color:         hovered ? "#00ff41" : "#e8e8e8",
          transition:    "color 0.2s",
          marginBottom:  "1.5rem",
        }}
      >
        {project.name}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily:   "'Inter', sans-serif",
          fontSize:     14,
          color:        "#777",
          maxWidth:     480,
          lineHeight:   1.7,
          marginBottom: "1.5rem",
        }}
      >
        {project.desc}
      </p>

      {/* Tags + CTA */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize:   10,
                border:     "1px solid rgba(240,180,41,0.3)",
                color:      "#f0b429",
                padding:    "2px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0 }}
          aria-hidden="true"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize:   11,
            color:      "#00ff41",
          }}
        >
          {">> OPEN PROJECT"}
        </motion.span>
      </div>
    </motion.a>
  );
}

// ── ProjectRow ────────────────────────────────────────────────────────────────
function ProjectRow({
  index, name, desc, tags, status, href, animIndex, inView, onHoverStart, onHoverEnd,
}: {
  index: string; name: string; desc: string; tags: string[]; status: string;
  href?: string; animIndex: number; inView: boolean;
  onHoverStart: () => void; onHoverEnd: () => void;
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
      <span
        className="text-xs shrink-0 min-w-[48px]"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555" }}
      >
        {index}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className="text-2xl leading-tight"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color:      hovered ? "#00ff41" : "#e8e8e8",
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

      <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[260px] shrink-0">
        {tags.map(tag => (
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

      <div className="flex items-center gap-3 shrink-0 justify-end" style={{ minWidth: "80px" }}>
        <span
          className="text-xs whitespace-nowrap"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color:      STATUS_COLOR[status] ?? "#00ff41",
          }}
        >
          <span aria-hidden="true">● </span>{status}
        </span>
        <AnimatePresence>
          {hovered && href && (
            <motion.span
              key="open"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
    custom:    animIndex,
    variants:  rowAnim,
    initial:   "hidden" as const,
    animate:   inView ? ("show" as const) : ("hidden" as const),
    onMouseEnter: () => { setHovered(true);  onHoverStart(); },
    onMouseLeave: () => { setHovered(false); onHoverEnd(); },
    className: "flex items-center gap-4 px-5 py-4",
    style:     rowStyle,
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

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursor, setCursor]                 = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="py-20 md:py-32 px-6 border-t border-white/[0.04]"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <p
          className="text-xs mb-12 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          {">"} PROJECT_REGISTRY
        </p>

        {/* Featured hero */}
        <FeaturedProject project={products[0]} inView={inView} />

        {/* Products index */}
        <p
          className="text-xs mb-4 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          // PRODUCTS [05]
        </p>
        <div className="flex flex-col gap-2">
          {products.map((p, i) => (
            <ProjectRow
              key={p.index}
              {...p}
              animIndex={i}
              inView={inView}
              onHoverStart={() => setHoveredProject(p)}
              onHoverEnd={() => setHoveredProject(null)}
            />
          ))}
        </div>

        {/* Consulting index */}
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
              onHoverStart={() => setHoveredProject(p)}
              onHoverEnd={() => setHoveredProject(null)}
            />
          ))}
        </div>

      </div>

      {/* Cursor preview — fixed, follows mouse on row hover */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.index}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{    opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:      "fixed",
              left:          cursor.x + 20,
              top:           cursor.y - 110,
              zIndex:        200,
              pointerEvents: "none",
              width:         220,
              background:    "#111",
              border:        `1px solid ${hoveredProject.accent}`,
              padding:       "1.25rem",
            }}
          >
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: hoveredProject.accent, letterSpacing: "0.1em", marginBottom: 6 }}>
              {hoveredProject.index}
            </p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#e8e8e8", lineHeight: 1, marginBottom: 10 }}>
              {hoveredProject.name}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {hoveredProject.tags.slice(0, 3).map(t => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   9,
                    border:     "1px solid rgba(255,255,255,0.1)",
                    color:      "#555",
                    padding:    "1px 6px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
