import Pipeline from "./Pipeline";

const NODES = [
  { name: "Draft", sub: "A model writes the research, offline" },
  { name: "Judge", sub: "A second, cheaper model checks every draft" },
  { name: "Gate", sub: "Code, not a model, decides what gets published", gate: true },
  { name: "Live catalog", sub: "The site itself never calls a model" },
];
const SEQUENCE = [0, 1, 0, 1, 2, 3];
const LOOP = { from: 0, to: 1, label: "Sent back for up to two rewrites" };

/** How Vazaar's research gets published. The parent provides the stage. */
export default function VazaarPipeline({ className = "" }: { className?: string }) {
  return (
    <div className={`w-fit max-w-full ${className}`}>
      <Pipeline nodes={NODES} sequence={SEQUENCE} loop={LOOP} label="How Vazaar's research gets published" />
    </div>
  );
}
