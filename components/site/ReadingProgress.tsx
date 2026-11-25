"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin signal line across the top that tracks how far down the article you are. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-[70] h-[2px] bg-[var(--color-signal)]"
      style={{ scaleX, transformOrigin: "left" }}
    />
  );
}
