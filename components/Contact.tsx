"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const [emailHover, setEmailHover]       = useState(false);
  const [linkedinHover, setLinkedinHover] = useState(false);

  const fadeUp = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
      style={{
        background: "var(--color-canvas)",
        borderTop:  "1px solid var(--color-hairline)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section eyebrow — structural label, amber */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="font-mono text-[11px] uppercase mb-6"
          style={{ color: "var(--color-label)", letterSpacing: "0.22em" }}
        >
          {">"} INITIATE_CONTACT
        </motion.p>

        {/* Main heading — display-lg, weight 300 */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="font-display"
          style={{
            fontSize:      "clamp(34px, 5vw, 60px)",
            fontWeight:    300,
            lineHeight:    1,
            letterSpacing: "-0.035em",
            textTransform: "uppercase",
            color:         "var(--color-ink)",
          }}
        >
          LET&apos;S TALK
        </motion.h2>

        {/* Subtext */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="font-body text-base max-w-md mt-6 mb-12"
          style={{ color: "var(--color-ink-subtle)", lineHeight: 1.7 }}
        >
          Open to consulting work, product collabs, and interesting conversations.
        </motion.p>

        {/* Terminal prompt block */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="font-mono p-6 mb-8 overflow-x-auto"
          style={{
            background: "var(--color-surface-2)",
            border:     "1px solid var(--color-hairline)",
            fontSize:   "12px",
          }}
        >
          <p>
            <span aria-hidden="true" style={{ color: "var(--color-primary)" }}>{">"}</span>
            {" "}
            <span style={{ color: "var(--color-label)" }}>EMAIL</span>
            {"   "}
            <span style={{ color: "var(--color-ink-muted)" }}>sahild1230@gmail.com</span>
          </p>
          <p className="mt-2">
            <span aria-hidden="true" style={{ color: "var(--color-primary)" }}>{">"}</span>
            {" "}
            <span style={{ color: "var(--color-label)" }}>CONNECT</span>
            {"  "}
            <span style={{ color: "var(--color-ink-muted)" }}>linkedin.com/in/sahildixit1230</span>
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
          {/* Email — primary CTA. Green border and hover fill are licensed. */}
          <a
            href="mailto:sahild1230@gmail.com"
            className="font-mono px-6 py-3 text-sm cursor-none transition-colors duration-150"
            style={{
              border:     "1px solid var(--color-primary)",
              color:      emailHover ? "var(--color-on-primary)" : "var(--color-primary)",
              background: emailHover ? "var(--color-primary)" : "transparent",
            }}
            onMouseEnter={() => setEmailHover(true)}
            onMouseLeave={() => setEmailHover(false)}
          >
            [SEND_EMAIL {">>"}]
          </a>

          {/* LinkedIn — ghost button */}
          <a
            href="https://www.linkedin.com/in/sahildixit1230/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono px-6 py-3 text-sm cursor-none transition-colors duration-150"
            style={{
              border: linkedinHover
                ? "1px solid var(--color-ink-faint)"
                : "1px solid var(--color-hairline-strong)",
              color:      linkedinHover ? "var(--color-ink)" : "var(--color-ink-muted)",
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
