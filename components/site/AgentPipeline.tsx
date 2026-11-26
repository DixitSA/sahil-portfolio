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

const SHEET = "rgba(244,247,240,1)";
const PULSE = "rgba(178,58,11,0.08)";

/** The MCP pipeline, one packet walking the stages. Runs only while in view. */
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
    <div ref={ref} className="stage flex items-center justify-center p-6 sm:p-10">
      <div className="flex w-full max-w-sm flex-col items-stretch">
        <ol className="flex flex-col items-stretch" aria-label="Mixxx MCP pipeline stages">
          {NODES.map((node, i) => {
            const pulse = animated && arrived === i && node.gate;
            return (
              <li key={node.name} className="flex flex-col items-stretch">
                <motion.div
                  animate={{ backgroundColor: pulse ? [SHEET, PULSE, SHEET] : SHEET }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-start gap-3 rounded-[4px] border px-4 py-3 ${
                    node.gate ? "border-mark" : "border-rule-strong"
                  }`}
                >
                  <span className="t-mono w-6 shrink-0 pt-0.5 text-ink-3">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-semibold leading-snug text-ink">{node.name}</p>
                    <p className="t-meta">{node.sub}</p>
                  </div>
                  {node.gate && <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-mark" />}
                </motion.div>

                {i < NODES.length - 1 && (
                  <div aria-hidden className="relative mx-auto h-[14px] w-px bg-rule-strong">
                    {animated && (
                      <motion.span
                        key={`${tick}-${i}`}
                        className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 bg-mark"
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

        <p className="t-meta mt-5 text-center">Guardrail: never touch an audible deck unless asked.</p>
      </div>
    </div>
  );
}
