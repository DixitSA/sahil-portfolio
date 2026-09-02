import Image from "next/image";
import type { Project } from "@/content/types";

/**
 * Server component. Renders a full project case study.
 * No client JS: this is the content a recruiter came for, so it must be
 * readable with scripting disabled and indexable by a crawler.
 */
export default function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      {/* Eyebrow: structural label, amber, never interactive */}
      <p
        className="mb-3 text-[11px] uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-label)",
          letterSpacing: "0.22em",
        }}
      >
        {"// CASE STUDY"}
      </p>

      <h1
        className="mb-4 uppercase"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(34px, 5vw, 60px)",
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: "var(--color-ink)",
        }}
      >
        {project.name}
      </h1>

      <p
        className="mb-8 max-w-xl"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--color-ink-muted)",
        }}
      >
        {project.summary}
      </p>

      {/* Meta strip */}
      <div
        className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-y py-4"
        style={{ borderColor: "var(--color-hairline)" }}
      >
        <span
          className="text-[10px] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-primary)",
            letterSpacing: "0.14em",
          }}
        >
          <span aria-hidden="true">● </span>
          {project.status}
        </span>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border px-2 py-0.5 text-[10px] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-ink-subtle)",
                borderColor: "var(--color-hairline-strong)",
                borderRadius: "var(--radius-xs)",
                letterSpacing: "0.14em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="ml-auto flex gap-4">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink)" }}
            >
              {"> LIVE SITE"}
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline-offset-4 hover:underline"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-subtle)" }}
            >
              {"> SOURCE"}
            </a>
          )}
        </div>
      </div>

      {project.preview && (
        <figure
          className="mb-12 border p-2"
          style={{
            borderColor: "var(--color-hairline-strong)",
            background: "var(--color-surface-2)",
          }}
        >
          {/*
            Product screenshots are full-page portrait captures. Forcing them
            into a 16:10 crop throws away most of the interface, so the frame
            caps height instead and the image keeps its own proportions.
          */}
          <Image
            src={project.preview}
            alt={`${project.name} interface`}
            width={project.previewSize?.w ?? 1280}
            height={project.previewSize?.h ?? 800}
            sizes="(max-width: 768px) 100vw, 720px"
            className="mx-auto block h-auto w-auto"
            style={{ maxHeight: 560, objectFit: "contain" }}
          />
        </figure>
      )}

      {cs ? (
        <>
          <Section heading="The problem">
            <p style={bodyStyle}>{cs.problem}</p>
          </Section>

          {cs.sections.map((s) => (
            <Section key={s.heading} heading={s.heading}>
              {s.body.map((para, i) => (
                <p key={i} style={bodyStyle} className="mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </Section>
          ))}

          <Section heading="Outcome">
            <ul className="space-y-3">
              {cs.outcome.map((line, i) => (
                <li key={i} style={bodyStyle} className="flex gap-3">
                  <span aria-hidden="true" style={{ color: "var(--color-label)" }}>
                    {"→"}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Section>
        </>
      ) : (
        <p style={bodyStyle}>
          Source and details are linked above.
        </p>
      )}
    </article>
  );
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 16,
  lineHeight: 1.7,
  color: "var(--color-ink-muted)",
};

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2
        className="mb-4"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(24px, 3vw, 36px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
        }}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}
