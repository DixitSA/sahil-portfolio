"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";

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

  const railLeft = lg ? "left-[10.5px]" : "left-[9.5px]";
  const railFirst = lg ? "top-[30px] bottom-0" : "top-[24px] bottom-0";
  const railLast = lg ? "top-0 h-[30px]" : "top-0 h-[24px]";
  const railMid = "top-0 bottom-0";
  const bracketEnd = lg ? "h-[30px]" : "h-6";
  const bracketStart = lg ? "top-[30px]" : "top-6";
  return (
    <ol ref={ref} aria-label={label} className="relative w-fit max-w-full">
      {nodes.map((node, i) => {
        const on = active === i;
        const inLoop = !!loop && i >= loop.from && i <= loop.to;
        const isFirst = !!loop && i === loop.from;
        const isLast = !!loop && i === loop.to;
        const railSegment = i === 0 ? railFirst : i === nodes.length - 1 ? railLast : railMid;
        return (
          <li
            key={node.name}
            className={`relative grid ${lg ? "grid-cols-[22px_1fr] gap-x-5 py-4" : "grid-cols-[20px_1fr] gap-x-4 py-3"} ${
              inLoop ? "pr-7" : ""
            }`}
          >
            {nodes.length > 1 && (
              <span aria-hidden className={`absolute w-px bg-rule-strong ${railLeft} ${railSegment}`} />
            )}
            {on && node.gate && (
              <span aria-hidden className="absolute -inset-x-3 inset-y-0 rounded-[6px] bg-[rgba(184,54,15,.06)]" />
            )}
            <div className={`relative z-10 flex items-center justify-center ${lg ? "h-7" : "h-6"}`}>
              <span
                aria-hidden
                className={`block ${lg ? "h-3 w-3" : "h-2.5 w-2.5"} border-[1.5px] transition-colors duration-200 ${
                  node.gate ? "border-mark" : "border-ink-3"
                } ${on ? (node.gate ? "bg-mark" : "bg-ink border-ink") : "bg-sheet"}`}
              />
            </div>
            <div className="relative min-w-0 max-w-[520px]">
              <p className={`${lg ? "text-[20px] leading-7" : "text-[17px] leading-6"} font-semibold text-ink`}>{node.name}</p>
              <p className={`mt-0.5 ${lg ? "text-[16px] leading-6" : "text-[15px] leading-[22px]"} text-ink-2`}>{node.sub}</p>
              {isLast && loop && (
                <p className="t-meta mt-1 flex items-center gap-1.5 text-ink-2">
                  <RotateCw aria-hidden className="h-3.5 w-3.5 shrink-0" />
                  {loop.label}
                </p>
              )}
            </div>
            {inLoop && (
              <span
                aria-hidden
                className={`absolute right-1 w-3 border-r-[1.5px] transition-colors duration-200 ${
                  backward ? "border-ink" : "border-ink-3"
                } ${isFirst ? `${bracketStart} bottom-0 border-t-[1.5px] rounded-tr-[4px]` : "top-0"} ${
                  isLast ? `${bracketEnd} border-b-[1.5px] rounded-br-[4px]` : isFirst ? "" : "bottom-0"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
