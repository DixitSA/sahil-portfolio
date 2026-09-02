import type { Metadata } from "next";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: "Contact — Sahil Dixit",
  description: "Get in touch with Sahil Dixit.",
};

export default function Page() {
  const links = [
    { label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GITHUB", value: profile.github, href: `https://${profile.github}` },
    { label: "RESUME", value: "Sahil_Dixit_Resume.pdf", href: "/Sahil_Dixit_Resume.pdf" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="mb-8 text-[11px] uppercase" style={eyebrow}>
        {"// CONTACT"}
      </p>

      <h1
        className="mb-6 uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(34px, 5vw, 60px)",
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: "var(--color-ink)",
        }}
      >
        Get in touch
      </h1>

      {profile.available && (
        <p className="mb-8" style={{ ...mono, color: "var(--color-primary)" }}>
          <span aria-hidden="true">● </span>AVAILABLE FOR WORK
        </p>
      )}

      <ul className="border-t" style={{ borderColor: "var(--color-hairline)" }}>
        {links.map((l) => (
          <li key={l.label} className="border-b" style={{ borderColor: "var(--color-hairline)" }}>
            <a
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex flex-wrap items-baseline gap-x-4 py-5 underline-offset-4 hover:underline"
            >
              <span
                className="text-[10px] uppercase"
                style={{ ...mono, color: "var(--color-label)", letterSpacing: "0.14em" }}
              >
                {l.label}
              </span>
              <span style={{ ...mono, fontSize: 14, color: "var(--color-ink)" }}>{l.value}</span>
            </a>
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
