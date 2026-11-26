import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects, listedProjects } from "@/content";
import type { Project } from "@/content";
import AgentPipeline from "./AgentPipeline";
import KaalVisual from "./KaalVisual";
import VazaarVisual from "./VazaarVisual";

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
  return project.angle ? <p className="mt-3 max-w-[62ch] text-ink-2">{project.angle}</p> : null;
}

function bySlug(slug: string) {
  const p = featuredProjects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Missing featured project: ${slug}`);
  return p;
}

function MoreRow({ project }: { project: Project }) {
  const body = (label: string, arrow: "right" | "up" | null) => (
    <>
      <span className={`font-display text-[22px] font-semibold text-ink ${arrow ? "link group-hover:[text-decoration-color:currentColor]" : ""}`}>
        {project.name}
      </span>
      <span className="text-ink-2">{project.summary}</span>
      <span className="t-meta flex items-center gap-1.5 text-ink! md:justify-end">
        {label}
        {arrow === "right" && <ArrowRight aria-hidden className="nudge h-4 w-4" />}
        {arrow === "up" && <ArrowUpRight aria-hidden className="nudge h-4 w-4" />}
      </span>
    </>
  );
  const cls = "grid gap-x-6 gap-y-1 py-6 md:grid-cols-[3fr_6fr_3fr] md:items-baseline";

  if (project.caseStudy) {
    return (
      <Link href={`/work/${project.slug}`} className={`group ${cls}`}>
        {body("Read the case study", "right")}
      </Link>
    );
  }
  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={`group ${cls}`}>
        {body("Visit the live site", "up")}
      </a>
    );
  }
  return <div className={cls}>{body("In build", null)}</div>;
}

export default function Work() {
  const vazaar = bySlug("vazaar");
  const kaal = bySlug("kaal");
  const mixxx = bySlug("mixxx-mcp");

  return (
    <section id="work" aria-labelledby="work-title" className="py-[88px] lg:py-32">
      <div className="wrap">
        <h2 id="work-title" className="t-h2">
          Products I built and shipped
        </h2>
        <p className="t-lead mt-4 max-w-[52ch] text-ink-2">
          Full write-ups for each: the problem, the build, the results.
        </p>

        <div className="mt-8 space-y-20 sm:mt-12 lg:space-y-[112px]">
          {/* 1. Vazaar: split */}
          <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <h3 className="t-h3">{vazaar.name}</h3>
              <Status project={vazaar} />
              <p className="t-lead mt-5 text-ink">{vazaar.summary}</p>
              <Angle project={vazaar} />
              <Actions project={vazaar} />
            </div>
            <div className="lg:col-span-7">
              <VazaarVisual />
            </div>
          </article>

          {/* 2. Kaal: wide */}
          <article>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
              <div className="lg:col-span-5">
                <h3 className="t-h3">{kaal.name}</h3>
                <Status project={kaal} />
                <p className="t-lead mt-5 text-ink">{kaal.summary}</p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Angle project={kaal} />
                <Actions project={kaal} />
              </div>
            </div>
            <div className="mt-8 lg:mt-10">
              <KaalVisual variant="work" />
            </div>
          </article>

          {/* 3. Mixxx MCP: mirrored split */}
          <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <h3 className="t-h3">{mixxx.name}</h3>
              <Status project={mixxx} />
              <p className="t-lead mt-5 text-ink">{mixxx.summary}</p>
              <Angle project={mixxx} />
              <Actions project={mixxx} />
            </div>
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
              <AgentPipeline />
            </div>
          </article>
        </div>

        <div className="mt-20 lg:mt-[112px]">
          <h3 className="t-result">More projects</h3>
          <ul className="mt-6 border-b border-rule">
            {listedProjects.map((project) => (
              <li key={project.slug} className="border-t border-rule">
                <MoreRow project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
