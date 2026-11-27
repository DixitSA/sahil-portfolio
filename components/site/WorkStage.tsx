"use client";

// technique after taste-skill "pinned-chapters" (MIT), re-implemented
import { useEffect, useState } from "react";

/** The pinned product stage: layers wipe up as the matching #work [data-chapter] crosses the middle. */
export default function WorkStage({ layers }: { layers: React.ReactNode[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("#work [data-chapter]"));
    if (!chapters.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    chapters.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div className="work-sticky sticky top-[88px] h-[calc(100svh-120px)] max-h-[860px]">
      <div className="stage h-full">
        {layers.map((layer, i) => (
          <div key={i} className="ws-layer" data-state={i < active ? "past" : i === active ? "on" : "next"}>
            <div className="ws-print">{layer}</div>
          </div>
        ))}
        <div aria-hidden className="absolute bottom-4 left-4 z-10 flex gap-1.5">
          {layers.map((_, i) => (
            <span key={i} className={`h-[2px] w-6 ${i === active ? "bg-ink" : "bg-rule-strong"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
