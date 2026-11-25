"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const NODES = [
  { name: "Research agent", sub: "breadth, tolerates being wrong", gate: false },
  { name: "Drafting agent", sub: "voice, facts must hold", gate: false },
  { name: "Human approval", sub: "nothing sends unreviewed", gate: true },
  { name: "Follow-up agent", sub: "restraint", gate: false },
];

const HOP = 900; // ms per connector

export default function AgentPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const animated = inView && !reduce;
  // step: connector index currently carrying the packet, 0..NODES.length-2.
  const [step, setStep] = useState(0);
  // Node index that has just been reached (for the gate pulse).
  const [arrived, setArrived] = useState(-1);

  useEffect(() => {
    if (!animated) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % (NODES.length - 1);
        setArrived(s + 1);
        return next;
      });
    }, HOP);
    return () => window.clearInterval(id);
  }, [animated]);

  return (
    <div ref={ref} className="relative flex min-h-[inherit] items-center justify-center p-8 sm:p-10">
      <div className="flex w-full max-w-sm flex-col items-stretch">
        <ol className="flex flex-col items-stretch" aria-label="Axira pipeline stages">
          {NODES.map((node, i) => {
            const pulse = animated && arrived === i && node.gate;
            return (
              <li key={node.name} className="flex flex-col items-stretch">
                <motion.div
                  animate={
                    pulse
                      ? { boxShadow: [
                          "0 0 0 0 rgba(61,255,127,0)",
                          "0 0 28px 2px rgba(61,255,127,0.35)",
                          "0 0 18px 0 rgba(61,255,127,0.14)",
                        ] }
                      : { boxShadow: node.gate ? "0 0 18px 0 rgba(61,255,127,0.14)" : "0 0 0 0 rgba(0,0,0,0)" }
                  }
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center justify-between gap-4 rounded-xl border bg-[var(--color-canvas)]/80 px-4 py-3.5 ${
                    node.gate
                      ? "border-[var(--color-signal)]/60"
                      : "border-[var(--color-line-strong)]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-ink-subtle)]">
                      Stage 0{i + 1}
                      {node.gate && <span className="text-[var(--color-signal)]"> · gate</span>}
                    </p>
                    <p className="text-[15px] font-medium text-[var(--color-ink)]">{node.name}</p>
                    <p className="text-[12.5px] text-[var(--color-ink-subtle)]">{node.sub}</p>
                  </div>
                  {node.gate && (
                    <ShieldCheck
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-[var(--color-signal)]"
                    />
                  )}
                </motion.div>

                {i < NODES.length - 1 && (
                  <div aria-hidden className="relative mx-auto h-9 w-px bg-[var(--color-line-strong)]">
                    {animated && (
                      <motion.span
                        key={`${step}-${i}`}
                        className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[var(--color-signal)]"
                        style={{ boxShadow: "0 0 10px 2px rgba(61,255,127,0.6)" }}
                        initial={{ y: -3, opacity: step === i ? 1 : 0 }}
                        animate={step === i ? { y: 33, opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: HOP / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mx-auto mt-7 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-canvas)]/80 px-3.5 py-1.5 font-mono text-[11px] text-[var(--color-ink-subtle)]">
          ~$0 infra · self-hosted Linux
        </p>
      </div>
    </div>
  );
}
