import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { roles, getRole } from "@/content";

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
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="mb-4 text-[11px] uppercase" style={eyebrow}>
        {"// ROLE"}
      </p>

      <h1
        className="mb-2 uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(34px, 5vw, 60px)",
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: "var(--color-ink)",
        }}
      >
        {role.company}
      </h1>

      <p className="mb-10" style={{ ...mono, color: "var(--color-ink-subtle)" }}>
        {`[${role.period}] · ${role.title} · ${role.location}`}
      </p>

      <ul className="space-y-4">
        {role.bullets.map((b, i) => (
          <li key={i} className="flex gap-3" style={body}>
            <span aria-hidden="true" style={{ color: "var(--color-label)" }}>
              {"→"}
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
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
