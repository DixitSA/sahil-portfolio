"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const products = [
  {
    name: "AxiraLite",
    desc: "SMS-powered retention SaaS for physical retail businesses.",
    tags: ["Next.js", "Prisma", "Twilio", "Stripe"],
    gradient: "from-indigo-900 to-violet-950",
  },
  {
    name: "VibeQueue",
    desc: "Lets bar patrons queue songs directly to the venue's Spotify.",
    tags: ["Spotify API", "React", "Node.js"],
    gradient: "from-emerald-900 to-teal-950",
  },
  {
    name: "Kaal",
    desc: "Vedic astrology-based timing tool for South Asian professionals.",
    tags: ["React", "Render", "Astrology API"],
    gradient: "from-amber-900 to-orange-950",
  },
  {
    name: "Polymarket Copytrader",
    desc: "Automated bot mirroring top traders on Polymarket prediction markets.",
    tags: ["Python", "Polymarket API", "Automation"],
    gradient: "from-rose-900 to-pink-950",
  },
];

const consulting = [
  {
    name: "SCRIBE",
    desc: "AI-assisted complaint summarization and categorization tool supporting ~30 model-level submissions across enterprise regulatory reviews.",
    tags: ["AI", "LLM", "Compliance", "BofA"],
    gradient: "from-slate-800 to-slate-950",
  },
  {
    name: "TRACE",
    desc: "LLM-powered audit trail generation for consumer complaint resolution workflows, coordinating documentation for ~8 regulatory responses.",
    tags: ["AI", "Audit", "Regulatory", "BofA"],
    gradient: "from-zinc-800 to-neutral-950",
  },
  {
    name: "CRU",
    desc: "Complaint Routing Unit — intelligent NLP-based triage system directing complaints to correct resolution teams, with ~80% of submissions completed ahead of deadline.",
    tags: ["NLP", "Compliance", "Operations", "BofA"],
    gradient: "from-gray-800 to-gray-950",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span
      className="text-[11px] text-gray-600 border border-white/[0.07] rounded-full px-2.5 py-0.5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {label}
    </span>
  );
}

function PreviewCard({
  visible,
  mouseX,
  mouseY,
  gradient,
}: {
  visible: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  gradient: string;
}) {
  const left = useTransform(mouseX, (x) => x + 24);
  const top = useTransform(mouseY, (y) => y - 56);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed pointer-events-none z-[9000] w-44 h-28 rounded-xl bg-gradient-to-br ${gradient} overflow-hidden shadow-2xl`}
          style={{ left, top }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectRow({
  index,
  name,
  tags,
  gradient,
  delay,
}: {
  index: number;
  name: string;
  desc: string;
  tags: string[];
  gradient: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <>
      <PreviewCard visible={hovered} mouseX={mouseX} mouseY={mouseY} gradient={gradient} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
        className="group relative py-6 border-b border-white/[0.06] cursor-none overflow-hidden"
        style={{
          background: hovered ? "rgba(99,102,241,0.04)" : "transparent",
          transition: "background 0.3s",
        }}
      >
        <motion.div
          className="flex items-center justify-between"
          animate={{ x: hovered ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-baseline gap-5 flex-1 min-w-0">
            <span
              className="text-xs text-gray-700 tabular-nums shrink-0 w-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="text-[clamp(28px,4vw,48px)] font-normal text-white leading-none truncate transition-[letter-spacing] duration-300"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                letterSpacing: hovered ? "0.02em" : "0",
              }}
            >
              {name}
            </span>
          </div>
          <div className="flex items-center gap-4 ml-6 shrink-0">
            <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[260px]">
              {tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <motion.span
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-gray-600 group-hover:text-indigo-400 transition-colors text-lg"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

const headingAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const subheadAnim = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={headingAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-[clamp(36px,5vw,56px)] font-normal text-white mb-16 leading-none"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
        >
          Work
        </motion.h2>

        {/* Products subsection */}
        <motion.p
          custom={0}
          variants={subheadAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-[10px] text-indigo-400/80 tracking-[0.2em] uppercase mb-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Products
        </motion.p>

        <div className="mb-16">
          {products.map((item, i) => (
            <ProjectRow
              key={item.name}
              index={i}
              name={item.name}
              desc={item.desc}
              tags={item.tags}
              gradient={item.gradient}
              delay={i * 0.07}
            />
          ))}
        </div>

        {/* Consulting subsection */}
        <motion.p
          custom={1}
          variants={subheadAnim}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-[10px] text-indigo-400/80 tracking-[0.2em] uppercase mb-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Consulting
        </motion.p>

        <div>
          {consulting.map((item, i) => (
            <ProjectRow
              key={item.name}
              index={i}
              name={item.name}
              desc={item.desc}
              tags={item.tags}
              gradient={item.gradient}
              delay={i * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
