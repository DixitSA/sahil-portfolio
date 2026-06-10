"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function WaveformSVG() {
  const bars = [4, 8, 14, 10, 18, 22, 16, 24, 20, 14, 10, 18, 12, 16, 22, 20, 8, 14, 10, 6];
  return (
    <div className="flex items-end gap-[4px] h-16">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-none origin-bottom"
          style={{
            height: `${h * 2.2}px`,
            background: "rgba(240,180,41,0.5)",
            animation: `waveBar ${0.8 + i * 0.08}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function NoTrace() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="notrace"
      ref={ref}
      className="py-32 px-6 border-t border-white/[0.04] relative overflow-hidden"
    >
      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 110%, rgba(240,180,41,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            {/* Overline */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-[10px] tracking-[0.25em] uppercase mb-6"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(240,180,41,0.6)",
              }}
            >
              Music
            </motion.p>

            {/* Heading */}
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-[clamp(64px,10vw,120px)] font-normal text-white leading-[0.9] mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              No Trace
            </motion.h2>

            {/* Waveform */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mb-8"
            >
              <WaveformSVG />
            </motion.div>

            {/* Description */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-gray-500 text-sm leading-7 max-w-sm mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Dark, high-energy club music in the tech-house and lo-fi house space.
              Built for late nights and loud rooms.
            </motion.p>

            {/* Tags + listen link */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex flex-wrap items-center gap-3"
            >
              {["Tech-House", "Lo-Fi House", "Ableton"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] text-gray-600 border border-white/[0.07] rounded-none px-2.5 py-0.5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {t}
                </span>
              ))}
              <a
                href="#" /* TODO: replace with Spotify / SoundCloud artist URL */
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 ml-2 transition-colors duration-200 cursor-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(240,180,41,0.6)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,180,41,1)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,180,41,0.6)")
                }
              >
                <ExternalLink size={11} />
                Listen
              </a>
            </motion.div>
          </div>

          {/* Ghost text — vertical orientation, decorative */}
          <div
            className="hidden md:block pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-[clamp(100px,14vw,180px)] font-normal text-white leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                opacity: 0.03,
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
            >
              music
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
