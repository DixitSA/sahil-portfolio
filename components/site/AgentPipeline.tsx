import Pipeline from "./Pipeline";

const NODES = [
  { name: "LLM agent", sub: "plans multi-step work" },
  { name: "MCP server", sub: "33 narrow, inspectable tools" },
  { name: "Beat-timed job queue", sub: "jobs run against the deck playhead" },
  { name: "Mixxx decks", sub: "driven over virtual MIDI" },
  { name: "Record & evaluate", sub: "flags clipping, misaligned kicks, harmonic smear", gate: true },
];
const SEQUENCE = [0, 1, 2, 3, 4];

/** The Mixxx MCP pipeline. The parent provides the stage. */
export default function AgentPipeline({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[420px] ${className}`}>
      <Pipeline nodes={NODES} sequence={SEQUENCE} label="Mixxx MCP pipeline stages" />
      <p className="t-meta mt-4">Guardrail: never touch an audible deck unless asked.</p>
    </div>
  );
}
