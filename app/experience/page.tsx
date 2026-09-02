import type { Metadata } from "next";
import { roles } from "@/content";
import { Doc, DocHeader, Group, body, mono, sectionTitle } from "@/components/os/DocChrome";

export const metadata: Metadata = {
  title: "Experience — Sahil Dixit",
  description:
    "Strategy and analytics roles at Bank of America, Capital One, and Alliant Insurance Services.",
};

export default function Page() {
  return (
    <Doc>
      <DocHeader heading="Experience" subtitle="Strategy, analytics, and AI governance." />

      <Group>
        {roles.map((role) => (
          <div
            key={role.id}
            className="px-4 py-5 first:border-t-0"
            style={{ borderTop: "1px solid var(--color-row-divider)" }}
          >
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 style={sectionTitle}>{role.company}</h2>
              <span style={{ ...mono, fontSize: 11 }}>{role.period}</span>
            </div>

            <p className="mb-3" style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>
              {role.location ? `${role.title} · ${role.location}` : role.title}
            </p>

            <ul className="space-y-2">
              {role.bullets.map((b, i) => (
                <li key={i} className="flex gap-3" style={{ ...body, fontSize: 14 }}>
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full"
                    style={{ background: "var(--color-ink-faint)" }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Group>
    </Doc>
  );
}
