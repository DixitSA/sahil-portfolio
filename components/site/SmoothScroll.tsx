"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Weighted, inertial scrolling. Native scroll is kept for anyone who asks the
 * OS for reduced motion, for touch devices (the platform's own momentum is
 * already right), and while the nav Motion switch is off (html[data-motion="off"],
 * announced by the "motionchange" window event).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let lenis: Lenis | null = null;
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: -64 },
      });
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
    const sync = () => (document.documentElement.dataset.motion === "off" ? stop() : start());

    sync();
    window.addEventListener("motionchange", sync);
    return () => {
      window.removeEventListener("motionchange", sync);
      stop();
    };
  }, []);

  return null;
}
