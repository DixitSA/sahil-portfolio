"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
type Project = {
  index: string;
  name: string;
  desc: string;
  tags: string[];
  status: string;
  href?: string;
  previewImg?: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const products: Project[] = [
  {
    index: "P01",
    name:  "Axira",
    desc:  "Multi-agent outreach automation. Three LLM agents orchestrated across research, drafting, and follow-up in one pipeline, with a human-in-the-loop approval gate. Runs on ~$0 infrastructure via a headless home server.",
    tags:  ["Python", "LLM Orchestration", "Self-hosted Linux"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/axira-lite",
  },
  {
    index: "P02",
    name:  "Kaal",
    desc:  "Vedic astrology decision app, shipped to production on web and iOS. Local-first deterministic chart computation across 17 modules and 277 commits, turning raw chart state into preset guidance.",
    tags:  ["Next.js", "TypeScript", "Python", "Capacitor"],
    status: "LIVE",
    href:       "https://getkaal.com",
    previewImg: "/previews/kaal-dashboard.png",
  },
  {
    index: "P03",
    name:  "VibeQueue",
    desc:  "Lets bar patrons queue songs to the venue's Spotify. Jukebox reimagined.",
    tags:  ["Next.js", "Firebase", "Spotify API"],
    status: "LIVE",
    href:  "https://github.com/DixitSA/VibeQueue",
  },
  {
    index: "P04",
    name:  "MANIFEST",
    desc:  "Fleet management platform with real-time vehicle tracking and driver compliance monitoring.",
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

const consulting: Project[] = [
  {
    index: "C01",
    name:  "Complaints AI Integration",
    desc:  "Coordinated model-risk governance across 3 AI complaint-handling workstreams. Delivered ~30 model-level submissions and ~8 regulatory responses, ~80% ahead of deadline.",
    tags:  ["AI/ML Governance", "Model Risk", "Regulatory"],
    status: "ACTIVE",
  },
  {
    index: "C02",
    name:  "Governed GenAI Slide Framework",
    desc:  "Cut ad-hoc slide turnaround from hours to ~15 minutes with a governed prompt framework that turns rough inputs into source-backed executive slides. Adopted teamwide.",
    tags:  ["Generative AI", "Prompt Engineering", "Workflow"],
    status: "ACTIVE",
  },
  {
    index: "C03",
    name:  "Consumer Bank Strategy",
    desc:  "Prioritized growth opportunities and key risks in a 3-year strategic plan for a ~69MM-client Consumer Bank. Shaped Investor Day messaging for senior leadership.",
    tags:  ["Strategy", "Market Analysis", "Executive Comms"],
    status: "ACTIVE",
  },
];

/* Status colors. Green is live state and nothing else, so LIVE and ACTIVE take
   it. BUILD is also a state, and amber may never indicate state, so it drops to
   the ink ladder rather than borrowing the label color. */
const STATUS_COLOR: Record<string, string> = {
  LIVE:   "var(--color-primary)",
  ACTIVE: "var(--color-primary)",
  BUILD:  "var(--color-ink-subtle)",
};

// ── Featured hero card ────────────────────────────────────────────────────────
function FeaturedProject({
  project, inView, reduce,
}: { project: Project; inView: boolean; reduce: boolean }) {
  const [hovered, setHovered] = useState(false);

  const rest  = reduce ? { opacity: 0 } : { opacity: 0, y: 24 };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} (opens in a new tab)`}
      initial={rest}
      animate={inView ? shown : rest}
      transition={reduce ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block mb-16 cursor-none"
      style={{
        background:     hovered ? "var(--color-surface-3)" : "var(--color-surface-2)",
        border:         `1px solid ${hovered ? "var(--color-hairline-strong)" : "var(--color-hairline)"}`,
        padding:        "2.5rem",
        textDecoration: "none",
        transition:     "background 250ms var(--ease-standard), border-color 250ms var(--ease-standard)",
      }}
    >
      {/* Index + status */}
      <div className="flex items-center justify-between mb-8">
        <span
          className="font-mono text-[11px]"
          style={{ color: "var(--color-ink-faint)", fontWeight: 300, letterSpacing: "0.1em" }}
        >
          {project.index} · FEATURED
        </span>
        <span
          className="font-mono text-[10px]"
          style={{ color: STATUS_COLOR[project.status], letterSpacing: "0.14em" }}
        >
          <span aria-hidden="true">● </span>{project.status}
        </span>
      </div>

      {/* Name — display-xl, weight 300 */}
      <p
        className="font-display"
        style={{
          fontSize:      "clamp(48px, 8vw, 104px)",
          fontWeight:    300,
          lineHeight:    0.94,
          letterSpacing: "-0.045em",
          textTransform: "uppercase",
          color:         "var(--color-ink)",
          marginBottom:  "1.5rem",
        }}
      >
        {project.name}
      </p>

      {/* Description */}
      <p
        className="font-body text-sm"
        style={{
          color:        "var(--color-ink-subtle)",
          maxWidth:     480,
          lineHeight:   1.6,
          marginBottom: "1.5rem",
        }}
      >
        {project.desc}
      </p>

      {/* Tags + CTA. Tags live inside a link, so they are interactive and can
          never be amber. They take the tag-chip treatment instead. */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px]"
              style={{
                border:        "1px solid var(--color-hairline-strong)",
                color:         "var(--color-ink-subtle)",
                letterSpacing: "0.14em",
                borderRadius:  "var(--radius-xs)",
                padding:       "2px 8px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.15 }}
          aria-hidden="true"
          className="font-mono text-[11px]"
          style={{ color: "var(--color-primary)" }}
        >
          {">> OPEN PROJECT"}
        </motion.span>
      </div>
    </motion.a>
  );
}

// ── ProjectRow ────────────────────────────────────────────────────────────────
function ProjectRow({
  index, name, desc, tags, status, href, animIndex, inView, reduce,
  onHoverStart, onHoverEnd,
}: {
  index: string; name: string; desc: string; tags: string[]; status: string;
  href?: string; animIndex: number; inView: boolean; reduce: boolean;
  onHoverStart: () => void; onHoverEnd: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  /* Hover feedback is a surface step plus a borderColor shift. The old
     `inset 0 -2px 0` box-shadow and its transition are gone. */
  const rowStyle = {
    background: hovered ? "var(--color-surface-1)" : "var(--color-surface-2)",
    border:     `1px solid ${hovered ? "var(--color-hairline-strong)" : "var(--color-hairline)"}`,
    transition: "background 200ms var(--ease-standard), border-color 200ms var(--ease-standard)",
  };

  const rowAnim = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -8 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.55, delay: Math.min(i, 4) * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const inner = (
    <>
      <span
        className="font-mono text-[11px] shrink-0 min-w-[48px]"
        style={{ color: "var(--color-ink-faint)", fontWeight: 300, letterSpacing: "0.1em" }}
      >
        {index}
      </span>

      <div className="flex-1 min-w-0">
        <p
          className="font-display"
          style={{
            fontSize:      "24px",
            fontWeight:    400,
            lineHeight:    1.1,
            letterSpacing: "-0.02em",
            color:         "var(--color-ink)",
          }}
        >
          {name}
        </p>
        <p
          className="font-body text-sm leading-relaxed mt-1"
          style={{ color: "var(--color-ink-subtle)" }}
        >
          {desc}
        </p>
      </div>

      <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[260px] shrink-0">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5"
            style={{
              border:        "1px solid var(--color-hairline-strong)",
              color:         "var(--color-ink-subtle)",
              letterSpacing: "0.14em",
              borderRadius:  "var(--radius-xs)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 shrink-0 justify-end" style={{ minWidth: "80px" }}>
        <span
          className="font-mono text-[10px] whitespace-nowrap"
          style={{
            color:         STATUS_COLOR[status] ?? "var(--color-ink-subtle)",
            letterSpacing: "0.14em",
          }}
        >
          <span aria-hidden="true">● </span>{status}
        </span>
        <AnimatePresence>
          {hovered && href && (
            <motion.span
              key="open"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.15 }}
              aria-hidden="true"
              className="font-mono text-[11px] whitespace-nowrap hidden md:inline"
              style={{ color: "var(--color-primary)" }}
            >
              {">> OPEN"}
            </motion.span>
          )}
          {hovered && !href && status === "LIVE" && (
            <motion.span
              key="link-soon"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.15 }}
              aria-hidden="true"
              className="font-mono text-[11px] whitespace-nowrap hidden md:inline"
              style={{ color: "var(--color-ink-subtle)" }}
            >
              [LINK_SOON]
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  const sharedProps = {
    custom:       animIndex,
    variants:     rowAnim,
    initial:      "hidden" as const,
    animate:      inView ? ("show" as const) : ("hidden" as const),
    whileHover:   reduce ? undefined : { x: 8 },
    transition:   { type: "spring" as const, stiffness: 400, damping: 30 },
    onMouseEnter: () => { setHovered(true);  onHoverStart(); },
    onMouseLeave: () => { setHovered(false); onHoverEnd(); },
    style:        rowStyle,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${name} (opens in a new tab)`}
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
  const reduce = !!useReducedMotion();

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursor, setCursor]                 = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="py-16 md:py-32 px-6"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section eyebrow — structural label, amber */}
        <p
          className="font-mono text-[11px] uppercase mb-12"
          style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
        >
          {">"} PROJECT_REGISTRY
        </p>

        {/* Featured hero */}
        <FeaturedProject project={products[0]} inView={inView} reduce={reduce} />

        {/* Products index */}
        <p
          className="font-mono text-[11px] uppercase mb-4"
          style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
        >
          {"// PRODUCTS [05]"}
        </p>
        <div className="flex flex-col gap-2">
          {products.map((p, i) => (
            <ProjectRow
              key={p.index}
              {...p}
              animIndex={i}
              inView={inView}
              reduce={reduce}
              onHoverStart={() => setHoveredProject(p)}
              onHoverEnd={() => setHoveredProject(null)}
            />
          ))}
        </div>

        {/* Consulting index */}
        <p
          className="font-mono text-[11px] uppercase mb-4 mt-12"
          style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
        >
          {"// CONSULTING [03]"}
        </p>
        <div className="flex flex-col gap-2">
          {consulting.map((p, i) => (
            <ProjectRow
              key={p.index}
              {...p}
              animIndex={i}
              inView={inView}
              reduce={reduce}
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
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce    ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
            transition={reduce ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:      "fixed",
              left:          cursor.x + 20,
              top:           cursor.y - (hoveredProject.previewImg ? 190 : 110),
              zIndex:        200,
              pointerEvents: "none",
              width:         220,
              /* preview-card: surface-2 fill, hairline-strong border, 8px inset
                 frame so the screenshot reads as a mounted plate. No radius. */
              background:    "var(--color-surface-2)",
              border:        "1px solid var(--color-hairline-strong)",
              padding:       "8px",
            }}
          >
            {hoveredProject.previewImg && (
              /* 16:10 plate, explicit dimensions so it cannot shift layout */
              <div style={{ position: "relative", width: 204, height: 128, overflow: "hidden" }}>
                <Image
                  src={hoveredProject.previewImg}
                  alt=""
                  width={204}
                  height={128}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            <div style={{ paddingTop: hoveredProject.previewImg ? "0.6rem" : 0 }}>
              <p
                className="font-mono text-[10px]"
                style={{ color: "var(--color-ink-faint)", letterSpacing: "0.1em", marginBottom: 4 }}
              >
                {hoveredProject.index}
              </p>
              <p
                className="font-display"
                style={{
                  fontSize:      20,
                  fontWeight:    400,
                  lineHeight:    1.2,
                  letterSpacing: "-0.01em",
                  color:         "var(--color-ink)",
                  marginBottom:  8,
                }}
              >
                {hoveredProject.name}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {hoveredProject.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px]"
                    style={{
                      border:       "1px solid var(--color-hairline-strong)",
                      color:        "var(--color-ink-subtle)",
                      borderRadius: "var(--radius-xs)",
                      padding:      "1px 6px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
