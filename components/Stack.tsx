"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const groups = [
  { label: "Languages", items: ["SQL", "Python", "R", "SAS", "Stata"] },
  { label: "Frontend",  items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend",   items: ["Node.js", "Prisma", "Twilio", "Stripe"] },
  { label: "Analytics", items: ["Tableau", "Power BI", "Knime", "Excel", "SPSS"] },
];

const badgeAnim = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.05, ease: "easeOut" },
  }),
};

const colAnim = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        {/* Two-column layout */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left heading */}
          <motion.div
            variants={colAnim}
            custom={0}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <h2
              className="text-[clamp(42px,5.5vw,72px)] font-normal text-white leading-[1.05] sticky top-28"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
            >
              My
              <br />
              Stack
            </h2>
          </motion.div>

          {/* Right badge grid */}
          <div className="grid sm:grid-cols-2 gap-10">
            {groups.map((group, gi) => (
              <motion.div
                key={group.label}
                custom={gi + 1}
                variants={colAnim}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <p
                  className="text-[10px] text-indigo-400/80 tracking-[0.2em] uppercase mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      custom={gi * 6 + ii}
                      variants={badgeAnim}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      whileHover={{
                        borderColor: "rgba(99,102,241,0.45)",
                        color: "#fff",
                        transition: { duration: 0.15 },
                      }}
                      className="text-xs text-gray-400 bg-[#111] border border-white/[0.07] rounded-lg px-3 py-1.5 cursor-none transition-colors duration-150"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
