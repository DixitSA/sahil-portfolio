import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/content/types";
import { featuredProjects } from "@/content";
import Reveal from "@/components/site/Reveal";
import ReadingProgress from "@/components/site/ReadingProgress";

/** Splits on backticks; odd segments render as inline code. */
function withCode(text: string): ReactNode[] {
  return text.split("`").map((seg, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded-md border border-[var(--color-line)] bg-[var(--color-raised)] px-1.5 py-0.5 font-mono text-[0.88em] text-[var(--color-ink)]"
      >
        {seg}
      </code>
    ) : (
      <span key={i}>{seg}</span>
    ),
  );
}

const pill =
  "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-4 text-[14px] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-raised)]";

/**
 * Server component. Long-form case study: readable with scripting disabled
 * and indexable by a crawler.
 */
export default function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const idx = featuredProjects.findIndex((p) => p.slug === project.slug);
  const next =
    idx === -1
      ? featuredProjects[0]
      : featuredProjects[(idx + 1) % featuredProjects.length];
  const live = project.status === "LIVE";

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <ReadingProgress />
      <article className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Link
          href="/#work"
          className="mb-10 inline-flex min-h-11 items-center text-[14px] text-[var(--color-ink-subtle)] transition-colors hover:text-[var(--color-ink)]"
        >
          ← All work
        </Link>

        <header>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              {live && <span className="live-dot" aria-hidden />}
              {live ? "Live in production" : "In build"}
            </p>
            <h1 className="display text-[clamp(56px,10vw,140px)] break-words">
              {project.name}
            </h1>
            <p className="mt-8 max-w-3xl text-[20px] leading-snug text-[var(--color-ink-muted)] md:text-[24px]">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-6">
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--color-line-strong)] px-3 py-1 font-mono text-[11.5px] text-[var(--color-ink-muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {project.slug === "kaal" && (
                <Link href="/kaal" className={pill}>
                  Try the live engine
                  <ArrowRight size={15} aria-hidden />
                </Link>
              )}
              {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className={pill}>
                  Live site
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={pill}>
                  GitHub
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              )}
            </div>
          </Reveal>
        </header>

        {project.preview && (
          <Reveal className="mt-14 md:mt-20">
            <figure className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-raised)] p-3 sm:p-6">
              <Image
                src={project.preview}
                alt={`${project.name} interface`}
                width={project.previewSize?.w ?? 1280}
                height={project.previewSize?.h ?? 800}
                sizes="(max-width: 768px) 100vw, 960px"
                className="mx-auto block h-auto max-h-[560px] w-auto max-w-full rounded-2xl object-contain"
              />
            </figure>
          </Reveal>
        )}

        {cs ? (
          <>
            <Reveal className="my-16 md:my-24">
              <p className="eyebrow mb-6">The problem</p>
              <p className="max-w-4xl text-[22px] leading-snug text-[var(--color-ink)] md:text-[28px]">
                {withCode(cs.problem)}
              </p>
            </Reveal>

            <div>
              {cs.sections.map((s, i) => (
                <section
                  key={s.heading}
                  className="grid gap-8 border-t border-[var(--color-line)] py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-16 md:py-16"
                >
                  <div className="self-start md:sticky md:top-28">
                    <p className="mb-3 font-mono text-[12px] text-[var(--color-signal)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display text-[24px] md:text-[30px]">{s.heading}</h2>
                  </div>
                  <Reveal className="space-y-5">
                    {s.body.map((para, j) => (
                      <p
                        key={j}
                        className="text-[17px] leading-[1.75] text-[var(--color-ink-muted)]"
                      >
                        {withCode(para)}
                      </p>
                    ))}
                  </Reveal>
                </section>
              ))}
            </div>

            <section className="border-t border-[var(--color-line)] pt-12 md:pt-16">
              <p className="eyebrow mb-8">Outcome</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {cs.outcome.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)] p-6"
                  >
                    <Check
                      size={16}
                      aria-hidden
                      className="mt-1 shrink-0 text-[var(--color-signal)]"
                    />
                    <p className="text-[15.5px] leading-relaxed text-[var(--color-ink)]">
                      {withCode(line)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          project.repo && (
            <p className="mt-14 text-[17px] text-[var(--color-ink-muted)]">
              Source and details are on GitHub.
            </p>
          )
        )}

        <nav aria-label="Next project" className="mt-24 md:mt-32">
          {next && next.slug !== project.slug && (
            <Link
              href={`/work/${next.slug}`}
              className="group block rounded-3xl border border-[var(--color-line)] p-8 transition-colors hover:bg-[var(--color-raised)] md:p-12"
            >
              <p className="eyebrow mb-6">Next project</p>
              <div className="flex items-end justify-between gap-6">
                <span className="display text-[clamp(40px,7vw,96px)] break-words">
                  {next.name}
                </span>
                <ArrowRight
                  aria-hidden
                  className="mb-2 h-8 w-8 shrink-0 text-[var(--color-ink-muted)] transition-transform duration-500 group-hover:translate-x-1.5 group-hover:text-[var(--color-ink)] md:h-12 md:w-12"
                />
              </div>
            </Link>
          )}
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center text-[14px] text-[var(--color-ink-subtle)] transition-colors hover:text-[var(--color-ink)]"
          >
            Back to home
          </Link>
        </nav>
      </article>
    </div>
  );
}
