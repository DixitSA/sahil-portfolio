"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const NODES = [
  { name: "LLM agent", sub: "plans multi-step work", gate: false },
  { name: "MCP server", sub: "33 narrow, inspectable tools", gate: false },
  { name: "Beat-timed job queue", sub: "lands on the playhead, not on response time", gate: false },
  { name: "Mixxx decks", sub: "driven over virtual MIDI", gate: false },
  { name: "Record & evaluate", sub: "flags clipping, misaligned kicks, harmonic smear", gate: true },
];

const HOPS = NODES.length - 1;
const HOP = 900; // ms per connector

export default function AgentPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const animated = inView && !reduce;
  // One counter drives everything: the packet crosses connector `step`, and
  // `arrived` is the node that just received it.
  const [tick, setTick] = useState(0);
  const step = tick % HOPS;
  const arrived = tick === 0 ? -1 : ((tick - 1) % HOPS) + 1;

  useEffect(() => {
    if (!animated) return;
    const id = window.setInterval(() => setTick((t) => t + 1), HOP);
    return () => window.clearInterval(id);
  }, [animated]);

  return (
    <div ref={ref} className="relative flex min-h-[inherit] items-center justify-center p-6 sm:p-10">
      <div className="flex w-full max-w-sm flex-col items-stretch">
        <ol className="flex flex-col items-stretch" aria-label="Mixxx MCP pipeline stages">
          {NODES.map((node, i) => {
            const pulse = animated && arrived === i && node.gate;
            return (
              <li key={node.name} className="flex flex-col items-stretch">
                <motion.div
                  animate={
                    pulse
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(61,255,127,0)",
                            "0 0 28px 2px rgba(61,255,127,0.35)",
                            "0 0 18px 0 rgba(61,255,127,0.14)",
                          ],
                        }
                      : {
                          boxShadow: node.gate
                            ? "0 0 18px 0 rgba(61,255,127,0.14)"
                            : "0 0 0 0 rgba(0,0,0,0)",
                        }
                  }
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center justify-between gap-4 rounded-xl border bg-[var(--color-canvas)]/80 px-4 py-2.5 ${
                    node.gate
                      ? "border-[var(--color-signal)]/60"
                      : "border-[var(--color-line-strong)]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-ink-subtle)]">
                      Stage 0{i + 1}
                      {node.gate && <span className="text-[var(--color-signal)]"> · gate</span>}
                    </p>
                    <p className="text-[15px] font-medium text-[var(--color-ink)]">{node.name}</p>
                    <p className="text-[12px] leading-[1.4] text-[var(--color-ink-subtle)]">
                      {node.sub}
                    </p>
                  </div>
                  {node.gate && (
                    <ShieldCheck
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-[var(--color-signal)]"
                    />
                  )}
                </motion.div>

                {i < NODES.length - 1 && (
                  <div aria-hidden className="relative mx-auto h-[14px] w-px bg-[var(--color-line-strong)]">
                    {animated && (
                      <motion.span
                        key={`${tick}-${i}`}
                        className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[var(--color-signal)]"
                        style={{ boxShadow: "0 0 10px 2px rgba(61,255,127,0.6)" }}
                        initial={{ y: -3, opacity: step === i ? 1 : 0 }}
                        animate={step === i ? { y: 10, opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: HOP / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mx-auto mt-5 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-canvas)]/80 px-3.5 py-1.5 text-center font-mono text-[11px] text-[var(--color-ink-subtle)]">
          Guardrail: never touch an audible deck unless asked
        </p>
      </div>
    </div>
  );
}
