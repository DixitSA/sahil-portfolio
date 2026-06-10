"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 800, damping: 40, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 800, damping: 40, mass: 0.1 });

  useEffect(() => {
    if ("ontouchstart" in window) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 4);
      rawY.set(e.clientY - 4);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      setHovered(!!el?.closest('a, button, [role="button"]'));
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        lineHeight: 1,
      }}
      className="hidden md:block"
    >
      <motion.span
        animate={{ fontSize: hovered ? "20px" : "12px" }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          color: "#00ff41",
          display: "block",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        +
      </motion.span>
    </motion.div>
  );
}
