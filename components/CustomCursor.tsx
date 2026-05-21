"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 150, damping: 20 });
  const y = useSpring(rawY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 14);
      rawY.set(e.clientY - 14);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
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
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "1.5px solid #6366f1",
        pointerEvents: "none",
        zIndex: 99999,
      }}
      className="hidden md:block"
    />
  );
}
