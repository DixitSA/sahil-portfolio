import type { Metadata } from "next";
import { profile } from "@/content";
import {
  Doc,
  DocHeader,
  SectionTitle,
  Group,
  FieldRow,
  Chip,
  body,
} from "@/components/os/DocChrome";

export const metadata: Metadata = {
  title: "About — Sahil Dixit",
  description: profile.bio[0],
};

export default function Page() {
  return (
    <Doc>
      <DocHeader heading="About" subtitle={`${profile.title} · ${profile.location}`} />

      <div className="mb-10 space-y-4">
        {profile.bio.map((para, i) => (
          <p key={i} style={body}>
            {para}
          </p>
        ))}
      </div>

      <section className="mb-10">
        <SectionTitle>At a glance</SectionTitle>
        <Group>
          {profile.stats.map((s) => (
            <FieldRow
              key={s.label}
              name={s.sub}
              value={<span style={{ fontVariantNumeric: "tabular-nums" }}>{s.value}</span>}
            />
          ))}
        </Group>
      </section>

      <section className="mb-10">
        <SectionTitle>Education</SectionTitle>
        <Group>
          <FieldRow name="School" value={profile.education.school} />
          <FieldRow name="Degree" value={profile.education.degree} />
          <FieldRow name="Detail" value={profile.education.detail} />
          <FieldRow name="Graduated" value={profile.education.graduated} />
        </Group>
      </section>

      <section>
        <SectionTitle>Skills</SectionTitle>
        <Group>
          {profile.skills.map((group) => (
            <div
              key={group.group}
              className="px-4 py-4 first:border-t-0"
              style={{ borderTop: "1px solid var(--color-row-divider)" }}
            >
              <p className="mb-2" style={{ ...body, fontSize: 14, color: "var(--color-ink-subtle)" }}>
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          ))}
        </Group>
      </section>
    </Doc>
  );
}
