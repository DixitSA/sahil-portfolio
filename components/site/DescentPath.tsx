import type { CSSProperties } from "react";
import { descend, toPath, wellsAt, START, DOTS_EVERY, DOT_POOL } from "@/lib/loss";

const PTS = descend(START, wellsAt(0), null);
const xs = PTS.map((p) => p[0]), ys = PTS.map((p) => p[1]);
const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
const BOX = { "--bw": (x1 - x0 + 0.1).toFixed(3), "--bh": (y1 - y0 + 0.12).toFixed(3),
  "--bcx": (1 + (x0 + x1) / 2).toFixed(3), "--bcy": (1 + (y0 + y1) / 2).toFixed(3) } as CSSProperties;

/** The descent, server-rendered fully drawn; ContourField animates and re-solves it. */
export default function DescentPath({ className = "" }: { className?: string }) {
  const end = PTS[PTS.length - 1];
  return (
    <div aria-hidden className={`cf-slot ${className}`}>
      <svg data-cf-path className="cf-path" viewBox="-1 -1 2 2" style={BOX}>
        <path d={toPath(PTS)} pathLength={1} />
        {Array.from({ length: DOT_POOL }, (_, i) => {
          const p = PTS[(i + 1) * DOTS_EVERY];
          return <circle key={i} data-dot r={0.008} cx={p?.[0] ?? 0} cy={p?.[1] ?? 0} style={p ? undefined : { display: "none" }} />;
        })}
        <circle data-ring r={0.03} cx={end[0]} cy={end[1]} />
      </svg>
    </div>
  );
}
