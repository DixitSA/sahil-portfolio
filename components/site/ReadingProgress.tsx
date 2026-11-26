"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin mark line under the nav that tracks how far down the article you are. */
export default function ReadingProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-16 right-0 left-0 z-[60] h-[2px] bg-mark"
      style={{ scaleX, transformOrigin: "left" }}
    />
  );
}
