"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/* Pointer capability is a platform fact, not React state, so it is read through
   useSyncExternalStore instead of being pushed into state from inside an
   effect. The server snapshot reports "no fine pointer" so nothing renders
   during SSR. */
const subscribeToPointer = () => () => {};
const readHasFinePointer = () => !("ontouchstart" in window);
const readHasFinePointerOnServer = () => false;

export default function CustomCursor() {
  const hasFinePointer = useSyncExternalStore(
    subscribeToPointer,
    readHasFinePointer,
    readHasFinePointerOnServer,
  );
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const springX = useSpring(rawX, { stiffness: 800, damping: 40, mass: 0.1 });
  const springY = useSpring(rawY, { stiffness: 800, damping: 40, mass: 0.1 });

  // Reduced motion tracks the pointer directly. No spring lag, no smoothing.
  const x = reduce ? rawX : springX;
  const y = reduce ? rawY : springY;

  useEffect(() => {
    if (!hasFinePointer) return;

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
  }, [hasFinePointer, rawX, rawY]);

  if (!hasFinePointer) return null;

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
        className="font-mono"
        animate={{ fontSize: hovered ? "20px" : "12px" }}
        transition={reduce ? { duration: 0 } : { duration: 0.15, ease: "easeOut" }}
        style={{
          color: "var(--color-primary)",
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
