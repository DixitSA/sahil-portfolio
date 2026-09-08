import { profile } from "@/content";
import Widget from "./Widget";

/**
 * "What I'm working on" tile.
 *
 * What is being worked on this month. A static portfolio cannot prove
 * freshness; a dated line can. Content lives in content/profile.ts so it is
 * edited in one place, next to everything else that is true about the owner.
 *
 * Titled as a sentence rather than as "Now", which is a convention borrowed
 * from personal sites and means nothing to a recruiter who has not seen one.
 * The tile has to say what it is holding before anyone decides to read it.
 */
export default function NowWidget() {
  const now = profile.now;
  if (!now) return null;

  return (
    <Widget title="What I'm working on" subtitle={now.updated}>
      <ul className="space-y-2.5">
        {now.items.map((item, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full"
              style={{ background: "var(--link-accent)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.5,
                color: "var(--color-ink-muted)",
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Widget>
  );
}
