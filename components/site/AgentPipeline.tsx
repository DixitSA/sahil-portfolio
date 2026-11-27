import Pipeline from "./Pipeline";

const NODES = [
  { name: "Claude", sub: "Picks the tracks and plans the transition" },
  { name: "MCP server", sub: "33 tools, each with one job: load, analyse, plan, mix" },
  { name: "Job queue", sub: "Lands every move on the beat" },
  { name: "Mixxx", sub: "Plays it through a virtual MIDI port" },
  { name: "Recording check", sub: "Listens back for clipping, off-beat kicks and key clashes", gate: true },
];
const SEQUENCE = [0, 1, 2, 3, 4];

/** The Mixxx MCP pipeline. The parent provides the stage. */
export default function AgentPipeline({ className = "" }: { className?: string }) {
  return (
    <div className={`w-fit max-w-full ${className}`}>
      <Pipeline nodes={NODES} sequence={SEQUENCE} label="How Mixxx MCP runs a transition" />
      <p className="t-meta ml-9 mt-4 text-ink-2 lg:ml-[42px] lg:mt-5">
        It won&apos;t touch a deck that&apos;s playing out loud unless I ask.
      </p>
    </div>
  );
}
