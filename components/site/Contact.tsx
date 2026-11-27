"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { githubUrl, profile } from "@/content";
import ContourField from "./ContourField";
import DescentPath from "./DescentPath";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

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
      data-cf-host
      data-cf-intro="view"
      className="on-field cf-host relative overflow-hidden pt-[88px] pb-10 lg:pt-36"
    >
      <ContourField tone="field" className="cf-mask-close" />
      <div className="wrap relative z-10">
        <h2 id="contact-title" className="t-mega max-w-[12ch]">
          Open to AI strategy roles at startups
        </h2>
        <p className="t-lead mt-4">Based in Charlotte, NC. Email reaches me fastest.</p>

        <DescentPath className="mt-6 h-[120px] lg:absolute lg:top-0 lg:right-12 lg:mt-0 lg:h-[46%] lg:w-[28%] xl:right-16" />

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block max-w-full font-display text-[clamp(24px,6.4vw,96px)] leading-[1.1] font-bold tracking-[-0.02em] text-on-field [font-stretch:100%] hover:text-white lg:mt-14"
        >
          <span className="answer answer--plain" data-land>
            {profile.email}
          </span>
        </a>

        <div className="mt-12 flex flex-wrap items-center gap-3 lg:mt-16">
          <button type="button" onClick={copy} className="btn btn-secondary">
            {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
            {copied ? "Copied" : "Copy email address"}
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex min-h-[44px] items-center gap-1"
          >
            GitHub
            <ArrowUpRight size={16} aria-hidden />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex min-h-[44px] items-center gap-1"
          >
            LinkedIn
            <ArrowUpRight size={16} aria-hidden />
          </a>
          <a
            href="/Sahil_Dixit_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex min-h-[44px] items-center"
          >
            Résumé (PDF)
          </a>
        </div>

        <footer className="t-meta mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-rule-field pt-6">
          <p>© {new Date().getFullYear()} Sahil Dixit</p>
          <p className="max-w-[60ch]">
            The lines behind this page are a live loss surface; the path across it is gradient
            descent, computed in your browser, and the red ring marks where it converged.
          </p>
          <a href="#main" className="link inline-flex min-h-[44px] items-center">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
