"use client";

import { useEffect, useRef, useState } from "react";

/** The thesis lights up word by word as it crosses the screen (technique after taste-skill "word-highlight", MIT; re-implemented). */
export default function Thesis({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [armed, setArmed] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".tw"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (0.75 * vh - r.top) / (r.height + 0.3 * vh)));
      const lit = p * spans.length * 1.15;
      spans.forEach((s, i) => s.toggleAttribute("data-on", i < lit));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { addEventListener("scroll", onScroll, { passive: true }); update(); }
      else removeEventListener("scroll", onScroll);
    });
    io.observe(el);
    setArmed(true);
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <p ref={ref} className="t-thesis max-w-[22ch] lg:max-w-[26ch]" data-armed={armed ? "" : undefined}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="tw">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
