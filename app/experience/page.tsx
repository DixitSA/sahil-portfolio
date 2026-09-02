import type { Metadata } from "next";
import { roles } from "@/content";

export const metadata: Metadata = {
  title: "Experience — Sahil Dixit",
  description:
    "Strategy and analytics roles at Bank of America, Capital One, and Alliant Insurance Services.",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="mb-8 text-[11px] uppercase" style={eyebrow}>
        {"// EXPERIENCE"}
      </p>

      <ol className="relative" style={{ paddingLeft: 40 }}>
        {/* Timeline rail */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-0 w-px"
          style={{ background: "var(--color-hairline-strong)" }}
        />

        {roles.map((role) => (
          <li key={role.id} className="relative pb-10 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                left: -44,
                top: 6,
                width: 7,
                height: 7,
                borderRadius: 9999,
                border: `1px solid var(--color-label-dim, var(--color-label))`,
                background: "var(--color-canvas)",
              }}
            />

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
              }}
            >
              {role.company}
            </h2>

            <p className="mt-1 mb-4" style={{ ...mono, color: "var(--color-ink-subtle)" }}>
              {`[${role.period}] · ${role.title} · ${role.location}`}
            </p>

            <ul className="space-y-2">
              {role.bullets.map((b, i) => (
                <li key={i} className="flex gap-3" style={body}>
                  <span aria-hidden="true" style={{ color: "var(--color-label)" }}>
                    {"→"}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 12 };
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  color: "var(--color-label)",
  letterSpacing: "0.22em",
};
const body: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 15,
  lineHeight: 1.7,
  color: "var(--color-ink-muted)",
};
