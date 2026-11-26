"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { githubUrl, profile } from "@/content";

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
      className="on-field pt-[88px] pb-10 lg:pt-32"
    >
      <div className="wrap">
        <h2 id="contact-title" className="t-h2 max-w-[24ch]">
          Open to technical growth roles at startups
        </h2>
        <p className="t-lead mt-4">Based in Charlotte, NC. Email reaches me fastest.</p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-block max-w-full font-display text-[clamp(24px,6.6vw,64px)] leading-[1.1] font-bold tracking-[-0.02em] break-all text-on-field decoration-mark-on-field decoration-2 underline-offset-8 hover:underline sm:break-normal"
          style={{ fontStretch: "100%" }}
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            Email me
          </a>
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
          <a href="#main" className="link inline-flex min-h-[44px] items-center">
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
