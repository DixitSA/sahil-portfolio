import Link from "next/link";
import { profile, projects } from "@/content";

/**
 * Route "/" is the bare desktop. This body is what sits on the wallpaper,
 * and it is also the homepage a crawler and a no-JS visitor receive, so it
 * has to carry the whole pitch on its own: who, what, and where to go next.
 */
export default function Page() {
  const featured = projects.filter((p) => p.tier === "featured");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="mb-4 text-[11px] uppercase" style={eyebrow}>
        {"// PROFILE"}
      </p>

      <h1
        className="mb-6 uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(48px, 8vw, 104px)",
          lineHeight: 0.94,
          letterSpacing: "-0.045em",
          color: "var(--color-ink)",
        }}
      >
        {profile.name}
      </h1>

      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span style={{ ...mono, color: "var(--color-ink-subtle)" }}>{profile.title}</span>
        <span style={{ ...mono, color: "var(--color-ink-subtle)" }}>{profile.location}</span>
        {profile.available && (
          <span style={{ ...mono, color: "var(--color-primary)" }}>
            <span aria-hidden="true">● </span>AVAILABLE FOR WORK
          </span>
        )}
      </div>

      {profile.bio.map((para, i) => (
        <p key={i} className="mb-4 max-w-xl" style={body}>
          {para}
        </p>
      ))}

      <div
        className="mt-12 border-t pt-8"
        style={{ borderColor: "var(--color-hairline)" }}
      >
        <p className="mb-4 text-[11px] uppercase" style={eyebrow}>
          {"// SELECTED WORK"}
        </p>
        <ul className="space-y-2">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="underline-offset-4 hover:underline"
                style={{ ...mono, fontSize: 14, color: "var(--color-ink)" }}
              >
                {`> ${p.name}`}
              </Link>
              <span style={{ ...body, fontSize: 14 }}> {p.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      <nav
        className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t pt-8"
        style={{ borderColor: "var(--color-hairline)" }}
        aria-label="Sections"
      >
        {[
          { href: "/about", label: "About" },
          { href: "/work", label: "Work" },
          { href: "/experience", label: "Experience" },
          { href: "/contact", label: "Contact" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="underline-offset-4 hover:underline"
            style={{ ...mono, color: "var(--color-ink-subtle)" }}
          >
            {`> ${l.label}`}
          </Link>
        ))}
      </nav>
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
