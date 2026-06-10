"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [emailHover, setEmailHover]    = useState(false);
  const [linkedinHover, setLinkedinHover] = useState(false);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 md:py-32 px-6 border-t border-white/[0.04] overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section label */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-xs mb-6 tracking-widest"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f0b429" }}
        >
          {">"} INITIATE_CONTACT
        </motion.p>

        {/* Main heading */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px, 10vw, 100px)",
            lineHeight: 0.9,
            color: "#e8e8e8",
          }}
        >
          LET'S TALK
        </motion.h2>

        {/* Subtext */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-sm max-w-md mt-6 mb-12"
          style={{ fontFamily: "'Inter', sans-serif", color: "#777" }}
        >
          Open to consulting projects, collaborations, and founder conversations.
        </motion.p>

        {/* Terminal prompt block */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="p-6 mb-8 overflow-x-auto"
          style={{
            background: "#111",
            border:     "1px solid rgba(255,255,255,0.07)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize:   "12px",
          }}
        >
          <p>
            <span style={{ color: "#00ff41" }}>{">"}</span>
            {" "}
            <span style={{ color: "#f0b429" }}>EMAIL</span>
            {"   "}
            <span style={{ color: "#9a9a9a" }}>sahild1230@gmail.com</span>
          </p>
          <p className="mt-2">
            <span style={{ color: "#00ff41" }}>{">"}</span>
            {" "}
            <span style={{ color: "#f0b429" }}>CONNECT</span>
            {"  "}
            <span style={{ color: "#9a9a9a" }}>linkedin.com/in/sahildixit1230</span>
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-wrap gap-3"
        >
          {/* Email */}
          <a
            href="mailto:sahild1230@gmail.com"
            className="px-6 py-2.5 text-xs cursor-none transition-all duration-150"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border:     "1px solid #00ff41",
              color:      emailHover ? "#000" : "#00ff41",
              background: emailHover ? "#00ff41" : "transparent",
            }}
            onMouseEnter={() => setEmailHover(true)}
            onMouseLeave={() => setEmailHover(false)}
          >
            [SEND_EMAIL {">>"}]
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sahildixit1230/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs cursor-none transition-all duration-150"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              border:     linkedinHover ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
              color:      linkedinHover ? "#fff" : "#9a9a9a",
              background: "transparent",
            }}
            onMouseEnter={() => setLinkedinHover(true)}
            onMouseLeave={() => setLinkedinHover(false)}
          >
            [LINKEDIN {">>"}]
          </a>
        </motion.div>

      </div>
    </section>
  );
}
