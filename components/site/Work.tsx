import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects, listedProjects } from "@/content";
import type { Project } from "@/content";
import AgentPipeline from "./AgentPipeline";
import KaalVisual from "./KaalVisual";
import VazaarVisual from "./VazaarVisual";
import VazaarPipeline from "./VazaarPipeline";
import WorkStage from "./WorkStage";

function Status({ project }: { project: Project }) {
  const live = project.status === "LIVE";
  return (
    <p className="t-meta mt-3 flex flex-wrap items-center gap-x-2">
      <span
        aria-hidden
        className={`h-2 w-2 shrink-0 ${live ? "bg-field" : "border border-ink-3"}`}
      />
      <span>{live ? "Live" : "In build"}</span>
      <span aria-hidden>·</span>
      <span>{project.tags.join(", ")}</span>
    </p>
  );
}

function Actions({ project }: { project: Project }) {
  const items: React.ReactNode[] = [];
  if (project.caseStudy) {
    items.push(
      <Link key="read" href={`/work/${project.slug}`} className="btn btn-primary">
        Read the case study
        <ArrowRight aria-hidden className="nudge h-4 w-4" />
      </Link>,
    );
  }
  if (project.slug === "kaal") {
    items.push(
      <Link key="run" href="/kaal" className="btn btn-secondary">
        Run the live engine
        <ArrowRight aria-hidden className="nudge h-4 w-4" />
      </Link>,
    );
  }
  if (project.href) {
    items.push(
      <a key="visit" href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
        Visit the live site
        <ArrowUpRight aria-hidden className="nudge h-4 w-4" />
      </a>,
    );
  }
  if (project.repo) {
    items.push(
      <a key="repo" href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
        View the source
        <ArrowUpRight aria-hidden className="nudge h-4 w-4" />
      </a>,
    );
  }
  return (
    <ul className="mt-7 flex flex-wrap gap-3">
      {items.slice(0, 3).map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Angle({ project }: { project: Project }) {
  return project.angle ? <p className="mt-3 max-w-[60ch] text-ink-2">{project.angle}</p> : null;
}

function bySlug(slug: string) {
  const p = featuredProjects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Missing featured project: ${slug}`);
  return p;
}

/** The summary with its result figure in ink at weight 600 (no underline: the accent is for what passed review). */
function Summary({ project }: { project: Project }) {
  const { summary, answer } = project;
  const at = answer ? summary.indexOf(answer) : -1;
  if (!answer || at < 0) throw new Error(`Project ${project.slug}: summary must contain its answer`);
  return (
    <p className="t-lead mt-5 max-w-[60ch] text-ink">
      {summary.slice(0, at)}
      <strong className="font-semibold text-ink">{answer}</strong>
      {summary.slice(at + answer.length)}
    </p>
  );
}

/** Inline (phone, tablet, reduced motion, no-JS) visual: full-bleed on a phone. */
const BLEED = "border-x-0! rounded-none! sm:border-x! sm:rounded-[4px]!";
function Inline({ children }: { children: React.ReactNode }) {
  return <div className="work-inline -mx-4 mt-6 sm:mx-0">{children}</div>;
}
function Title({ project }: { project: Project }) {
  return (
    <ViewTransition name={`title-${project.slug}`} share="title-morph">
      <h3 className="t-h3">{project.name}</h3>
    </ViewTransition>
  );
}

function MoreRow({ project }: { project: Project }) {
  const arrow = project.caseStudy ? "right" : project.href ? "up" : null;
  const label = project.caseStudy ? "Read the case study" : project.href ? "Visit the live site" : "In build";
  const name = (
    <span
      className={`font-display text-[clamp(22px,1.4vw+12px,32px)] font-[650] leading-tight text-ink underline decoration-1 underline-offset-[6px] ${
        arrow ? "decoration-transparent group-hover:decoration-ink" : "decoration-transparent"
      } transition-[text-decoration-color] duration-150`}
    >
      {project.name}
    </span>
  );
  const body = (
    <>
      {project.slug === "axira" ? (
        <ViewTransition name="title-axira" share="title-morph">
          {name}
        </ViewTransition>
      ) : (
        name
      )}
      <span className="max-w-[60ch] text-ink-2">{project.summary}</span>
      <span className="t-meta flex items-center gap-1.5 text-ink! md:justify-end">
        {label}
        {arrow === "right" && <ArrowRight aria-hidden className="nudge h-4 w-4" />}
        {arrow === "up" && <ArrowUpRight aria-hidden className="nudge h-4 w-4" />}
      </span>
    </>
  );
  const cls = "grid gap-x-6 gap-y-1 py-7 md:grid-cols-[3fr_6fr_3fr] md:items-baseline";

  if (project.caseStudy) {
    return (
      <Link href={`/work/${project.slug}`} className={`group ${cls}`}>
        {body}
      </Link>
    );
  }
  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={`group ${cls}`}>
        {body}
      </a>
    );
  }
  return <div className={cls}>{body}</div>;
}

export default function Work() {
  const vazaar = bySlug("vazaar");
  const kaal = bySlug("kaal");
  const mixxx = bySlug("mixxx-mcp");
  if (!vazaar.aiNote) throw new Error("Project vazaar: aiNote is required");

  const center = "flex h-full w-full items-center justify-center p-8";
  const layers = [
    <VazaarVisual key="vz" fill />,
    <div key="vp" className={center}>
      <VazaarPipeline className="max-w-[420px]" />
    </div>,
    <KaalVisual key="kl" fill />,
    <div key="mx" className={center}>
      <AgentPipeline />
    </div>,
  ];

  return (
    <section id="work" aria-labelledby="work-title" className="py-[88px] lg:py-32">
      <div className="wrap">
        <h2 id="work-title" className="t-mega">
          Products I built and shipped
        </h2>
        <p className="t-lead mt-6 max-w-[52ch] text-ink-2">
          Full write-ups for each: the problem, the build, the results.
        </p>
      </div>

      <div className="wrap mt-14 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <article data-chapter={0} className="work-chapter flex flex-col justify-center py-12">
            <Title project={vazaar} />
            <Status project={vazaar} />
            <Inline>
              <VazaarVisual className={BLEED} />
            </Inline>
            <Summary project={vazaar} />
            <Angle project={vazaar} />
            <Actions project={vazaar} />
          </article>

          <div data-chapter={1} className="work-chapter flex flex-col justify-center py-12">
            <h4 className="t-result max-w-[24ch]">AI drafts. A deterministic gate publishes.</h4>
            <Inline>
              <div className={`stage p-6 sm:p-10 ${BLEED}`}>
                <VazaarPipeline className="mx-auto max-w-[420px]" />
              </div>
            </Inline>
            <p className="mt-5 max-w-[46ch] text-ink-2">{vazaar.aiNote}</p>
          </div>

          <article data-chapter={2} className="work-chapter flex flex-col justify-center py-12">
            <Title project={kaal} />
            <Status project={kaal} />
            <Inline>
              <KaalVisual className={BLEED} />
            </Inline>
            <Summary project={kaal} />
            <Angle project={kaal} />
            <Actions project={kaal} />
          </article>

          <article data-chapter={3} className="work-chapter flex flex-col justify-center py-12">
            <Title project={mixxx} />
            <Status project={mixxx} />
            <Inline>
              <div className={`stage p-6 sm:p-10 ${BLEED}`}>
                <AgentPipeline className="mx-auto" />
              </div>
            </Inline>
            <Summary project={mixxx} />
            <Angle project={mixxx} />
            <Actions project={mixxx} />
          </article>
        </div>

        <div className="lg:col-span-7">
          <WorkStage layers={layers} />
        </div>
      </div>

      <div className="wrap mt-24">
        <h3 className="t-result">More projects</h3>
        <ul className="mt-6 border-b border-rule">
          {listedProjects.map((project) => (
            <li key={project.slug} className="border-t border-rule">
              <MoreRow project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
