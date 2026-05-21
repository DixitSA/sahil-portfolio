"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 border-t border-white/[0.04] relative overflow-hidden"
    >
      {/* Indigo ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* "AVAILABLE" ghost word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[clamp(80px,18vw,260px)] font-normal text-white leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            opacity: 0.06,
          }}
        >
          AVAILABLE
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top rule */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="w-full h-px mb-14"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Heading */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-[clamp(56px,10vw,120px)] font-normal text-white leading-[0.95] mb-10"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
        >
          Let&apos;s build something.
        </motion.h2>

        {/* Bottom rule */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="w-full h-px mb-12"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Subtext + buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-gray-400 text-sm max-w-xs leading-7"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Open to consulting projects, collaborations, and founder conversations.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="mailto:sahild1230@gmail.com"
              className="inline-flex items-center gap-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-medium px-6 py-3 rounded-full transition-all duration-200 hover:shadow-[0_0_32px_rgba(99,102,241,0.4)] cursor-none tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Mail size={14} />
              Send an Email
            </a>
            <a
              href="https://linkedin.com/in/sahildixit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/[0.1] hover:border-indigo-500/50 text-gray-400 hover:text-white text-xs font-medium px-6 py-3 rounded-full transition-all duration-200 cursor-none tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
