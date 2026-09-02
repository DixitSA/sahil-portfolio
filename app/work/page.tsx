import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content";

export const metadata: Metadata = {
  title: "Work — Sahil Dixit",
  description: "Products and systems shipped by Sahil Dixit.",
};

/**
 * The Finder window body. Featured projects get a row that opens a case
 * study; listed projects are a plaintext index with an outbound link,
 * because they have no screenshots and do not earn a full page.
 */
export default function Page() {
  const featured = projects.filter((p) => p.tier === "featured");
  const listed = projects.filter((p) => p.tier === "listed");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-[11px] uppercase" style={eyebrow}>
        {`// SELECTED WORK [${String(featured.length).padStart(2, "0")}]`}
      </h1>

      <ul className="mb-16 border-t" style={{ borderColor: "var(--color-hairline)" }}>
        {featured.map((p, i) => (
          <li key={p.slug} className="border-b" style={{ borderColor: "var(--color-hairline)" }}>
            <Link href={`/work/${p.slug}`} className="group block py-6">
              <div className="mb-2 flex items-baseline gap-4">
                <span style={{ ...mono, color: "var(--color-ink-faint)" }}>
                  {`P${String(i + 1).padStart(2, "0")}`}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(24px, 3vw, 36px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    lineHeight: 1.1,
                  }}
                >
                  {p.name}
                </span>
                <span className="ml-auto" style={{ ...mono, color: "var(--color-primary)" }}>
                  <span aria-hidden="true">● </span>
                  {p.status}
                </span>
              </div>
              <p className="max-w-xl" style={body}>
                {p.summary}
              </p>
            </Link>

            {/* Source and live links sit outside the row Link: nesting an
                anchor inside an anchor is invalid and breaks activation. */}
            <div className="flex flex-wrap gap-4 pb-6">
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...mono, color: "var(--color-ink)" }}
                  className="underline-offset-4 hover:underline"
                >
                  {"> live site"}
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...mono, color: "var(--color-ink-subtle)" }}
                  className="underline-offset-4 hover:underline"
                >
                  {"> github"}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mb-6 text-[11px] uppercase" style={eyebrow}>
        {`// ALSO BUILT [${String(listed.length).padStart(2, "0")}]`}
      </p>

      <ul className="space-y-3">
        {listed.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-baseline gap-x-3">
            <span style={{ ...mono, color: "var(--color-ink)" }}>{p.name}</span>
            <span style={{ ...body, fontSize: 14 }}>{p.summary}</span>
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...mono, color: "var(--color-ink-subtle)" }}
                className="underline-offset-4 hover:underline"
              >
                {"> github"}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
};

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
