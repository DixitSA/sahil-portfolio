"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { num: "3 AI Initiatives", sub: "SCRIBE, TRACE, CRU @ BofA" },
  { num: "4 Products Shipped", sub: "Across fintech, consumer & nightlife" },
  { num: "3.7 GPA", sub: "B.S. Financial Technology, VCU" },
  { num: "~80%", sub: "Regulatory submissions ahead of deadline" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-4xl md:text-5xl font-normal text-white mb-6"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
              About
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-gray-400 text-base leading-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              I&apos;m a Strategy &amp; Management Consultant at Bank of America working on AI
              regulatory compliance and consumer strategy. I studied Financial Technology
              with a Statistics minor at VCU, graduating with a 3.7 GPA. Outside of work,
              I build and ship my own products at the intersection of fintech, automation,
              and consumer software.
            </motion.p>
          </div>

          {/* Right: stats — editorial divider list */}
          <div className="border-t border-white/[0.06]">
            {stats.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="py-5 border-b border-white/[0.06]"
              >
                <p
                  className="text-white font-medium text-lg mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.num}
                </p>
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
