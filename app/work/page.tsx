import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content";
import {
  Doc,
  DocHeader,
  SectionTitle,
  Group,
  Chip,
  Status,
  DocLink,
  body,
  sectionTitle,
} from "@/components/os/DocChrome";

export const metadata: Metadata = {
  title: "Work — Sahil Dixit",
  description: "Products and systems shipped by Sahil Dixit.",
};

export default function Page() {
  const featured = projects.filter((p) => p.tier === "featured");
  const listed = projects.filter((p) => p.tier === "listed");

  return (
    <Doc>
      <DocHeader
        heading="Work"
        subtitle="Two projects with full write-ups, plus everything else worth linking."
      />

      <section className="mb-10">
        <SectionTitle>Selected</SectionTitle>
        <Group>
          {featured.map((p) => (
            <div
              key={p.slug}
              className="px-4 py-4 first:border-t-0"
              style={{ borderTop: "1px solid var(--color-row-divider)" }}
            >
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Link
                  href={`/work/${p.slug}`}
                  style={{ ...sectionTitle, color: "var(--color-ink)" }}
                  className="underline-offset-4 hover:underline"
                >
                  {p.name}
                </Link>
                <Status value={p.status} />
              </div>

              <p className="mb-3 max-w-xl" style={{ ...body, fontSize: 14 }}>
                {p.summary}
              </p>

              <div className="mb-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <DocLink href={`/work/${p.slug}`} external={false}>
                  Read the write-up
                </DocLink>
                {p.href && <DocLink href={p.href}>Live site</DocLink>}
                {p.repo && <DocLink href={p.repo}>GitHub</DocLink>}
              </div>
            </div>
          ))}
        </Group>
      </section>

      <section>
        <SectionTitle>Also built</SectionTitle>
        <Group>
          {listed.map((p) => (
            <div
              key={p.slug}
              className="px-4 py-3 first:border-t-0"
              style={{ borderTop: "1px solid var(--color-row-divider)" }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span style={{ ...body, fontSize: 15, color: "var(--color-ink)" }}>{p.name}</span>
                {p.repo ? <DocLink href={p.repo}>GitHub</DocLink> : <Status value={p.status} />}
              </div>
              <p className="mt-1 max-w-xl" style={{ ...body, fontSize: 14 }}>
                {p.summary}
              </p>
            </div>
          ))}
        </Group>
      </section>
    </Doc>
  );
}
