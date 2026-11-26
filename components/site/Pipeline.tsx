"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RotateCw, ShieldCheck } from "lucide-react";

export interface PipelineNode {
  name: string;
  sub: string;
  gate?: boolean;
}

interface PipelineProps {
  nodes: PipelineNode[];
  sequence: number[];
  loop?: { from: number; to: number; label: string };
  label: string;
  size?: Size;
}

const STEP_MS = 700;

type Size = "md" | "lg";
const SizeContext = createContext<Size>("md");
/** Lets a server parent size every Pipeline below it without threading a prop through wrappers. */
export function PipelineSizeProvider({ size, children }: { size: Size; children: React.ReactNode }) {
  return <SizeContext.Provider value={size}>{children}</SizeContext.Provider>;
}

/**
 * Rows on a rail, no boxed nodes. Plays through `sequence` once while it is in view
 * (and, inside a .ws-layer, while that layer is "on"), then rests on the last step.
 * Server render and reduced motion: static, last node active.
 */
export default function Pipeline({ nodes, sequence, loop, label, size }: PipelineProps) {
  const ctx = useContext(SizeContext);
  const lg = (size ?? ctx) === "lg";
  const ref = useRef<HTMLOListElement>(null);
  const [pos, setPos] = useState(sequence.length - 1); // index into sequence
  const active = sequence[pos];
  const backward = pos > 0 && sequence[pos] < sequence[pos - 1];

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.documentElement.dataset.motion === "off") return;
    const layer = el.closest<HTMLElement>(".ws-layer");
    let inView = false;
    let playing = false;
    let timer = 0;

    const stop = () => { clearTimeout(timer); playing = false; };
    const advance = (i: number) => {
      setPos(i);
      if (i < sequence.length - 1) timer = window.setTimeout(() => advance(i + 1), STEP_MS);
    };
    const update = () => {
      const should = inView && (!layer || layer.dataset.state === "on");
      if (should && !playing) { playing = true; timer = window.setTimeout(() => advance(0), 0); }
      else if (!should && playing) stop();
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); }, { threshold: 0.2 });
    io.observe(el);
    const mo = layer ? new MutationObserver(update) : null;
    if (layer) mo?.observe(layer, { attributes: true, attributeFilter: ["data-state"] });
    return () => { io.disconnect(); mo?.disconnect(); clearTimeout(timer); };
  }, [sequence]);

  return (
    <ol ref={ref} aria-label={label} className="relative w-full">
      {nodes.map((node, i) => {
        const on = active === i;
        const inLoop = !!loop && i >= loop.from && i <= loop.to;
        const isFirst = !!loop && i === loop.from;
        const isLast = !!loop && i === loop.to;
        return (
          <li
            key={node.name}
            className={`relative ${lg ? "py-5 pl-10" : "py-3 pl-8"} transition-colors duration-200 ${inLoop ? "pr-8" : ""} ${
              on && node.gate ? "bg-[rgba(184,54,15,.06)]" : ""
            }`}
          >
            <span
              aria-hidden
              className={`absolute ${lg ? "left-[6.5px]" : "left-[5.5px]"} w-px bg-rule-strong ${
                i === 0 ? (lg ? "top-[34px]" : "top-[22px]") : "top-0"
              } ${i === nodes.length - 1 ? (lg ? "h-[34px] top-0" : "h-[22px] top-0") : "bottom-0"}`}
            />
            <span
              aria-hidden
              className={`absolute left-0 ${lg ? "top-[27px] h-3.5 w-3.5" : "top-[16px] h-3 w-3"} border-[1.5px] transition-colors duration-200 ${
                node.gate ? "border-mark" : "border-ink-3"
              } ${on ? (node.gate ? "bg-mark" : "bg-ink border-ink") : "bg-sheet"}`}
            />
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className={`${lg ? "text-[20px]" : "text-[16px]"} font-semibold leading-snug text-ink`}>{node.name}</p>
                <p className={`t-meta ${lg ? "text-[16px]!" : ""}`}>{node.sub}</p>
              </div>
              {node.gate && <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-mark" />}
            </div>
            {isLast && loop && (
              <p className="t-meta mt-1 flex items-center gap-1.5">
                <RotateCw aria-hidden className="h-3.5 w-3.5 shrink-0" />
                {loop.label}
              </p>
            )}
            {inLoop && (
              <span
                aria-hidden
                className={`absolute right-2 w-3 border-r-[1.5px] transition-colors duration-200 ${
                  backward ? "border-ink" : "border-ink-3"
                } ${isFirst ? `${lg ? "top-[34px]" : "top-[22px]"} border-t-[1.5px] rounded-tr-[4px]` : "top-0"} ${
                  isLast ? `${lg ? "bottom-[34px]" : "bottom-[22px]"} border-b-[1.5px] rounded-br-[4px]` : "bottom-0"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
