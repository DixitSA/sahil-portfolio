"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#evidence", label: "Evidence" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/** Fixed, opaque, always visible. The Motion switch stills the two contour fields. */
export default function Nav() {
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    // Reads the attribute set by the inline head script; SSR cannot know it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionOn(document.documentElement.dataset.motion !== "off");
  }, []);

  function toggleMotion() {
    const next = motionOn ? "off" : "on";
    document.documentElement.dataset.motion = next;
    try {
      localStorage.setItem("motion", next);
    } catch {}
    setMotionOn(next === "on");
    window.dispatchEvent(new Event("motionchange"));
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-16 border-b border-rule bg-paper"
      style={{ viewTransitionName: "site-nav" }}
    >
      <nav aria-label="Primary" className="wrap flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-[44px] items-center font-display text-[17px] font-bold tracking-tight text-ink [font-stretch:106%]"
        >
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="flex min-h-[44px] items-center text-[15px] font-medium text-ink-2 underline decoration-transparent decoration-1 underline-offset-[5px] transition-colors hover:text-ink hover:decoration-current"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            role="switch"
            aria-checked={motionOn}
            aria-label="Motion"
            onClick={toggleMotion}
            suppressHydrationWarning
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 text-[15px] font-medium text-ink-2"
          >
            <span className="hidden md:inline" aria-hidden>
              Motion
            </span>
            <span className="switch-track" aria-hidden />
          </button>
          <a
            href="/Sahil_Dixit_Resume.pdf"
            target="_blank"
            rel="noopener"
            className="btn btn-secondary btn-sm"
          >
            Get résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
