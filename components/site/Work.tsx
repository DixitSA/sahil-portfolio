"use client";

import type { PointerEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredProjects, listedProjects } from "@/content";
import type { Project } from "@/content";
import Reveal, { SectionHead } from "./Reveal";
import AgentPipeline from "./AgentPipeline";
import KaalVisual from "./KaalVisual";

function onSpot(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
}

function Visual({ slug }: { slug: string }) {
  if (slug === "axira") return <AgentPipeline />;
  if (slug === "kaal") return <KaalVisual />;
  return null;
}

function FeaturedCard({ project, n }: { project: Project; n: number }) {
  const live = project.status === "LIVE";
  const flip = n % 2 === 0; // second card: visual on the left
  const outcomes = project.caseStudy?.outcome.slice(0, 3) ?? [];
  const linkCls =
    "inline-flex min-h-[44px] items-center gap-1 text-[14.5px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]";

  return (
    <article
      onPointerMove={onSpot}
      className="group/card relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-raised)] transition-colors duration-500 hover:border-[var(--color-line-strong)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.05), transparent 70%)",
        }}
      />
      <div className="grid lg:grid-cols-2">
        <div
          className={`relative flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12 ${
            flip ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div>
            <div className="mb-8 flex items-center justify-between gap-4">
              {live ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-white/[0.03] px-3 py-1 text-[12.5px] text-[var(--color-ink)]">
                  <span className="live-dot" aria-hidden />
                  Live in production
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[12.5px] text-[var(--color-ink-muted)]">
                  In build
                </span>
              )}
              <span className="eyebrow">0{n}</span>
            </div>

            <h3 className="display mb-5 text-[clamp(40px,5vw,64px)] text-[var(--color-ink)]">
              {project.name}
            </h3>
            <p className="max-w-[46ch] text-[16px] leading-[1.6] text-[var(--color-ink-muted)] sm:text-[17px]">
              {project.summary}
            </p>

            {outcomes.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow mb-4">Outcomes</p>
                <ul className="grid gap-3">
                  {outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex gap-3 text-[14.5px] leading-[1.55] text-[var(--color-ink-muted)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-1 w-1 shrink-0 bg-[var(--color-signal)]"
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[var(--color-line-strong)] px-3 py-1 font-mono text-[11.5px] text-[var(--color-ink-subtle)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link
              href={`/work/${project.slug}`}
              className="group/cta relative z-20 inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-6 text-[15px] font-medium text-[var(--color-canvas)] transition-transform active:scale-[0.98]"
            >
              Read the case study
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
              />
            </Link>
            {project.slug === "kaal" && (
              <Link href="/kaal" className={`${linkCls} relative z-20`}>
                Try the live engine
                <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} relative z-20`}
              >
                Live site
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkCls} relative z-20`}
              >
                GitHub
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <div
          className={`relative min-h-[340px] overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-raised-2)] sm:min-h-[420px] lg:border-t-0 ${
            flip
              ? "lg:order-1 lg:border-r"
              : "lg:order-2 lg:border-l"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(70% 60% at 50% 40%, rgba(255,255,255,0.04), transparent 70%)",
          }}
        >
          <Visual slug={project.slug} />
        </div>
      </div>
    </article>
  );
}

function ListedRow({ project, n }: { project: Project; n: number }) {
  const live = project.status === "LIVE";
  const status = live ? (
    <span className="inline-flex items-center gap-2 text-[13px] text-[var(--color-ink-muted)]">
      <span className="live-dot" aria-hidden />
      Live
    </span>
  ) : (
    <span className="text-[13px] text-[var(--color-ink-subtle)]">In build</span>
  );
  const idx = (
    <span className="font-mono text-[12px] text-[var(--color-ink-subtle)]">
      {String(n).padStart(2, "0")}
    </span>
  );
  const rowCls =
    "grid items-center gap-x-6 gap-y-3 px-3 py-6 md:grid-cols-[3rem_1fr_1.4fr_auto] md:px-4 md:py-7";

  if (project.repo) {
    return (
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} on GitHub (opens in a new tab)`}
        className={`group ${rowCls} transition-colors hover:bg-white/[0.02]`}
      >
        {idx}
        <span className="text-[20px] font-medium tracking-tight text-[var(--color-ink)] transition-transform duration-300 group-hover:translate-x-1 sm:text-[22px]">
          {project.name}
        </span>
        <span className="text-[15px] leading-[1.55] text-[var(--color-ink-muted)]">
          {project.summary}
        </span>
        <span className="flex items-center gap-3">
          {status}
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 text-[var(--color-ink-subtle)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-ink)]"
          />
        </span>
      </a>
    );
  }

  return (
    <div className={rowCls}>
      {idx}
      <span className="text-[20px] font-medium tracking-tight text-[var(--color-ink)] sm:text-[22px]">
        {project.name}
      </span>
      <span className="text-[15px] leading-[1.55] text-[var(--color-ink-muted)]">
        {project.summary}
      </span>
      <span className="flex items-center gap-3">{status}</span>
    </div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative border-t border-[var(--color-line)] py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Software I&apos;ve <span className="serif-em">shipped</span>
            </>
          }
          aside={
            <p className="max-w-xs text-[15px] leading-[1.6] text-[var(--color-ink-muted)]">
              Two products in production, built nights and weekends. Full write-ups for each.
            </p>
          }
        />

        <div className="flex flex-col gap-6 md:gap-8">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug}>
              <FeaturedCard project={p} n={i + 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="eyebrow mb-4">Also built</p>
            <h3 className="display mb-10 text-[clamp(26px,3vw,36px)] text-[var(--color-ink)]">
              Other projects
            </h3>
          </Reveal>
          <Reveal>
            <div className="border-b border-[var(--color-line)]">
              <ul>
                {listedProjects.map((p, i) => (
                  <li key={p.slug} className="border-t border-[var(--color-line)]">
                    <ListedRow project={p} n={i + 1} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
