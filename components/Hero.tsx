"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

const lines = ["Building things", "that shouldn't exist yet."];

const lineReveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.9 + i * 0.15, ease: "easeOut" },
  }),
};

function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 20 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top  - rect.height / 2;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      rawX.set(dx * 0.25);
      rawY.set(dy * 0.25);
    }
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Year tag — top right */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-24 right-8 text-xs text-gray-600 tracking-widest"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        — 2026
      </motion.span>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="text-[11px] text-gray-600 tracking-[0.2em] uppercase mb-8"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Strategy &amp; Management Consultant · Product Builder
        </motion.p>

        {/* Headline — clip reveal per line */}
        <div className="flex flex-col items-center gap-y-1 mb-8">
          {lines.map((line, i) => (
            <div key={line} className="clip-line">
              <motion.span
                custom={i}
                variants={lineReveal}
                initial="hidden"
                animate="show"
                className="block text-[clamp(44px,7.5vw,88px)] leading-[1.05] font-normal text-white"
                style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          custom={0}
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-[clamp(14px,1.6vw,17px)] text-gray-500 max-w-sm mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          AI tools by day. Indie SaaS by night. Based in Charlotte, NC.
        </motion.p>

        {/* CTA */}
        <motion.div custom={1} variants={fadeIn} initial="hidden" animate="show">
          <MagneticButton
            onClick={scrollToWork}
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-[0_0_36px_rgba(99,102,241,0.45)] cursor-none"
          >
            See My Work
          </MagneticButton>
        </motion.div>
      </div>

      <div
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-700"
        aria-hidden="true"
      >
        <ChevronDown size={22} />
      </div>
    </section>
  );
}
