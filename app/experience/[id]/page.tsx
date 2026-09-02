import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { roles, getRole } from "@/content";
import { Doc, DocHeader, Group, body, mono } from "@/components/os/DocChrome";

export function generateStaticParams() {
  return roles.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const role = getRole(id);
  if (!role) return { title: "Not found" };
  return {
    title: `${role.company} — Sahil Dixit`,
    description: `${role.title} at ${role.company}, ${role.period}.`,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = getRole(id);
  if (!role) notFound();

  return (
    <Doc>
      <DocHeader
        heading={role.company}
        subtitle={role.location ? `${role.title} · ${role.location}` : role.title}
        meta={<span style={{ ...mono, fontSize: 11 }}>{role.period}</span>}
      />

      <Group>
        {role.bullets.map((b, i) => (
          <div
            key={i}
            className="px-4 py-3 first:border-t-0"
            style={{ borderTop: "1px solid var(--color-row-divider)" }}
          >
            <p style={{ ...body, fontSize: 14 }}>{b}</p>
          </div>
        ))}
      </Group>
    </Doc>
  );
}
