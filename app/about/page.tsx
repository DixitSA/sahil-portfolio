import type { Metadata } from "next";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: "About — Sahil Dixit",
  description: profile.bio[0],
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="mb-8 text-[11px] uppercase" style={eyebrow}>
        {"// ABOUT"}
      </p>

      {profile.bio.map((para, i) => (
        <p key={i} className="mb-4 max-w-xl" style={body}>
          {para}
        </p>
      ))}

      {/* Stats */}
      <ul className="mt-12 border-t" style={{ borderColor: "var(--color-hairline)" }}>
        {profile.stats.map((s) => (
          <li
            key={s.label}
            className="flex flex-wrap items-baseline gap-x-4 border-b py-4"
            style={{ borderColor: "var(--color-hairline)" }}
          >
            <span
              className="text-[10px] uppercase"
              style={{ ...mono, color: "var(--color-label)", letterSpacing: "0.14em" }}
            >
              {s.label}
            </span>
            <span style={{ ...mono, fontSize: 14, color: "var(--color-ink)" }}>{s.value}</span>
            <span
              className="ml-auto text-[10px] uppercase"
              style={{ ...mono, color: "var(--color-ink-subtle)", letterSpacing: "0.14em" }}
            >
              {s.sub}
            </span>
          </li>
        ))}
      </ul>

      {/* Education */}
      <section className="mt-12">
        <p className="mb-4 text-[11px] uppercase" style={eyebrow}>
          {"// EDUCATION"}
        </p>
        <p style={{ ...mono, fontSize: 14, color: "var(--color-ink)" }}>
          {profile.education.school}
        </p>
        <p style={{ ...body, fontSize: 15 }}>
          {profile.education.degree}. {profile.education.detail}. {profile.education.graduated}.
        </p>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <p className="mb-4 text-[11px] uppercase" style={eyebrow}>
          {"// STACK"}
        </p>
        <div className="space-y-6">
          {profile.skills.map((group) => (
            <div key={group.group}>
              <p
                className="mb-2 text-[10px] uppercase"
                style={{ ...mono, color: "var(--color-ink-subtle)", letterSpacing: "0.14em" }}
              >
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border px-2 py-1"
                    style={{
                      ...mono,
                      color: "var(--color-ink-muted)",
                      borderColor: "var(--color-hairline)",
                      background: "var(--color-surface-2)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
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
  fontSize: 16,
  lineHeight: 1.7,
  color: "var(--color-ink-muted)",
};
