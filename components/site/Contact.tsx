"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { githubHandle, githubUrl, profile } from "@/content";
import Reveal, { SectionHead } from "./Reveal";

const tileCls =
  "group relative flex min-h-[120px] flex-col justify-between bg-[var(--color-canvas)] p-6 transition-colors duration-300";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-[var(--color-line)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          index="04"
          eyebrow="Contact"
          title={
            <span id="contact-title">
              Let&apos;s talk about the <span className="serif-em">next</span> one
            </span>
          }
          aside={
            <p className="flex items-center gap-3 text-[14.5px] text-[var(--color-ink-muted)]">
              {profile.available && <span className="live-dot shrink-0" aria-hidden />}
              {profile.available
                ? "Open to strategy, AI governance and product roles"
                : "Not looking right now"}
            </p>
          }
        />

        <Reveal>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy email address ${profile.email}`}
            className="group relative block max-w-full min-h-[44px] pb-3 text-left"
          >
            <span className="display block text-[clamp(22px,6vw,84px)] break-words text-[var(--color-ink)]">
              {profile.email}
            </span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--color-signal)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </button>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-[44px] items-center text-[14.5px] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              Open in mail app ↗
            </a>
            <span
              role="status"
              aria-live="polite"
              className="min-h-[28px]"
            >
              {copied && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-raised)] px-3 py-1.5 text-[13px] text-[var(--color-ink)]">
                  <Check size={14} aria-hidden className="text-[var(--color-signal)]" />
                  Copied to clipboard
                </span>
              )}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tileCls} hover:bg-[var(--color-raised)]`}
            >
              <span className="flex items-start justify-between">
                <span className="eyebrow">GitHub</span>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="text-[var(--color-ink-subtle)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-ink)]"
                />
              </span>
              <span className="mt-6 text-[16px] break-all text-[var(--color-ink)]">{githubHandle}</span>
            </a>
            <a
              href="/Sahil_Dixit_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${tileCls} hover:bg-[var(--color-raised)]`}
            >
              <span className="flex items-start justify-between">
                <span className="eyebrow">Résumé</span>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="text-[var(--color-ink-subtle)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-ink)]"
                />
              </span>
              <span className="mt-6 text-[16px] text-[var(--color-ink)]">PDF, one page</span>
            </a>
            <div className={tileCls}>
              <span className="eyebrow">Based in</span>
              <span className="mt-6 text-[16px] text-[var(--color-ink)]">{profile.location}</span>
            </div>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-[var(--color-line)] pt-8 text-[13px] text-[var(--color-ink-subtle)]">
          <p>© {new Date().getFullYear()} Sahil Dixit</p>
          <p>Designed &amp; built by hand. Next.js, Motion, WebGL.</p>
          <a
            href="#main"
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-[var(--color-ink)]"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
