import Pipeline from "./Pipeline";

const NODES = [
  { name: "AI research draft", sub: "drafted offline, never at runtime" },
  { name: "Independent judge", sub: "a separate, lower-cost model reviews each draft" },
  { name: "Publication gate", sub: "deterministic; checks the recorded judgment", gate: true },
  { name: "Live catalog", sub: "no runtime model calls, no AI API key" },
];
const SEQUENCE = [0, 1, 0, 1, 2, 3];
const LOOP = { from: 0, to: 1, label: "up to two revision rounds" };

/** How Vazaar's research gets published. The parent provides the stage. */
export default function VazaarPipeline({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <Pipeline nodes={NODES} sequence={SEQUENCE} loop={LOOP} label="How Vazaar's research gets published" />
    </div>
  );
}
