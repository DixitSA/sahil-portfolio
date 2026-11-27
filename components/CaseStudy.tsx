import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import { ViewTransition, type ReactNode } from "react";
import type { Project } from "@/content/types";
import { featuredProjects } from "@/content";
import ReadingProgress from "@/components/site/ReadingProgress";
import { BrowserFrame, PhoneFrame } from "@/components/site/Frames";
import AgentPipeline from "@/components/site/AgentPipeline";
import VazaarPipeline from "@/components/site/VazaarPipeline";

/** Splits on backticks; odd segments render as inline code. */
function withCode(text: string): ReactNode[] {
  return text.split("`").map((seg, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="t-mono rounded-[4px] border border-rule bg-sheet px-1.5 py-0.5 text-[0.9em] text-ink"
      >
        {seg}
      </code>
    ) : (
      <span key={i}>{seg}</span>
    ),
  );
}

/** Wraps the project's result figure in a strong; falls back to plain text. */
function withAnswer(summary: string, answer?: string): ReactNode {
  const i = answer ? summary.indexOf(answer) : -1;
  if (!answer || i === -1) return summary;
  return (
    <>
      {summary.slice(0, i)}
      <strong className="font-semibold text-ink">{answer}</strong>
      {summary.slice(i + answer.length)}
    </>
  );
}

function hostOf(href?: string) {
  if (!href) return "";
  try {
    return new URL(href).host;
  } catch {
    return "";
  }
}

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
  const pw = project.previewSize?.w ?? 1280;
  const ph = project.previewSize?.h ?? 800;
  const landscape = pw > ph;
  const isKaal = project.slug === "kaal";
  const secondary = "btn btn-secondary";

  return (
    <div className="pt-[120px] pb-24">
      <ReadingProgress />
      <article className="wrap">
        <Link href="/#work" className="link mb-10 inline-flex min-h-11 items-center gap-2">
          <ArrowLeft size={16} aria-hidden />
          All projects
        </Link>

        <header>
          <ViewTransition name={`title-${project.slug}`} share="title-morph">
            <h1 className="t-hero-cs break-words">{project.name}</h1>
          </ViewTransition>
          <p className="t-lead mt-6 max-w-[40ch] text-ink">
            {withAnswer(project.summary, project.answer)}
          </p>
          {project.angle && <p className="mt-3 max-w-[60ch] text-ink-2">{project.angle}</p>}
          <p className="t-meta mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              aria-hidden
              className={`h-2 w-2 ${live ? "bg-field" : "border border-ink-3"}`}
            />
            <span>{live ? "Live" : "In build"}</span>
            <span aria-hidden>·</span>
            {project.tags.map((tag, i) => (
              <span key={tag} className="t-mono">
                {tag}
                {i < project.tags.length - 1 ? "," : ""}
              </span>
            ))}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {project.href && (
              <li>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className={secondary}>
                  Visit the live site
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </li>
            )}
            {project.repo && (
              <li>
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={secondary}>
                  View the source
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </li>
            )}
            {isKaal && (
              <li>
                <Link href="/kaal" className={secondary}>
                  Run the live engine
                  <ArrowRight size={16} aria-hidden className="nudge" />
                </Link>
              </li>
            )}
          </ul>
        </header>

        {!project.preview && project.slug === "mixxx-mcp" && (
          <div className="stage mt-16 flex items-center justify-center p-8 lg:p-12">
            <AgentPipeline />
          </div>
        )}

        {project.preview &&
          (isKaal ? (
            <div className="stage mt-16 h-[clamp(300px,42vw,620px)]">
              <BrowserFrame
                src="/previews/kaal-landing.png"
                w={1600}
                h={1280}
                alt="Kaal on the web: the birth-details form under &quot;Know what's happening. Know what to do.&quot;"
                url="getkaal.com"
                sizes="(max-width: 1024px) 58vw, 780px"
                className="absolute top-[8%] left-[5%] w-[58%]"
              />
              <PhoneFrame
                src={project.preview}
                alt="Kaal interface"
                sizes="(max-width: 640px) 36vw, 22vw"
                className="absolute top-[10%] right-8 w-[36%] sm:w-[22%]"
              />
            </div>
          ) : (
            <div className="stage mt-16 p-6 md:p-12">
              {landscape ? (
                <BrowserFrame
                  src={project.preview}
                  w={pw}
                  h={ph}
                  alt={`${project.name} interface`}
                  url={hostOf(project.href)}
                  sizes="(max-width: 768px) 100vw, 960px"
                  eager={project.slug === "vazaar"}
                  className="mx-auto max-w-5xl"
                />
              ) : (
                <PhoneFrame
                  src={project.preview}
                  alt={`${project.name} interface`}
                  sizes="260px"
                  className="mx-auto w-[250px] max-w-full"
                />
              )}
            </div>
          ))}

        {cs ? (
          <>
            <div className="my-16 md:my-24">
              <h2 className="t-h2">The problem</h2>
              <p className="t-lead mt-6 max-w-[60ch] text-ink">{withCode(cs.problem)}</p>
            </div>

            <div>
              {cs.sections.map((s) => (
                <section
                  key={s.heading}
                  className="grid gap-8 border-t border-rule py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-16 md:py-16"
                >
                  <h2 className="t-result self-start md:sticky md:top-24">{s.heading}</h2>
                  <div className="max-w-[60ch] space-y-5">
                    {s.body.map((para, j) => (
                      <p key={j} className="text-ink-2">
                        {withCode(para)}
                      </p>
                    ))}
                    {project.slug === "vazaar" && s.heading.startsWith("AI drafts.") && (
                      <div className="mt-8 flex items-center justify-center">
                        <VazaarPipeline />
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <section className="pt-12 md:pt-16">
              <h2 className="t-h2">Results</h2>
              <ul className="mt-8 border-t border-rule">
                {cs.outcome.map((line, i) => (
                  <li key={i} className="max-w-[60ch] border-b border-rule py-5 text-ink">
                    {withCode(line)}
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          project.repo && <p className="mt-14 text-ink-2">Source and details are on GitHub.</p>
        )}

        <nav aria-label="Next case study" className="mt-24 md:mt-32">
          {next && next.slug !== project.slug && (
            <Link
              href={`/work/${next.slug}`}
              className="group block min-h-11 border-t border-rule pt-10"
            >
              <span className="t-meta block">Next case study</span>
              <span className="mt-3 flex items-end justify-between gap-6">
                <ViewTransition name={`title-${next.slug}`} share="title-morph">
                  <span className="t-mega break-words underline decoration-transparent decoration-2 [text-underline-offset:.12em] group-hover:decoration-ink">
                    {next.name}
                  </span>
                </ViewTransition>
                <ArrowRight aria-hidden className="nudge mb-2 h-8 w-8 shrink-0 text-ink" />
              </span>
            </Link>
          )}
          <Link href="/" className="link mt-8 inline-flex min-h-11 items-center">
            Back to home
          </Link>
        </nav>
      </article>
    </div>
  );
}
