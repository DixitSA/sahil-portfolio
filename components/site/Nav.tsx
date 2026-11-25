"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Floating pill nav. Gets out of the way while reading down, comes back the
 * moment the visitor scrolls up, which is when they are looking for it.
 */
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -96 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Primary"
        className="flex w-full max-w-5xl items-center justify-between rounded-full border px-2 py-2 transition-[background-color,border-color,backdrop-filter] duration-500"
        style={{
          borderColor: scrolled ? "var(--color-line)" : "transparent",
          background: scrolled ? "rgba(12,12,14,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
        }}
      >
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2.5 rounded-full px-3 py-1.5 text-[14px] font-medium tracking-tight text-[var(--color-ink)]"
        >
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-ink)] text-[10px] font-semibold text-[var(--color-canvas)]"
          >
            SD
          </span>
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[13.5px] text-[var(--color-ink-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--color-ink)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="/Sahil_Dixit_Resume.pdf"
          target="_blank"
          rel="noopener"
          className="group flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-1.5 text-[13.5px] font-medium text-[var(--color-canvas)] transition-transform active:scale-[0.97]"
        >
          Résumé
          <svg
            aria-hidden
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className="transition-transform duration-300 group-hover:translate-y-0.5"
          >
            <path d="M6 1v8M2.5 5.5 6 9l3.5-3.5M2 11h8" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </a>
      </nav>
    </motion.header>
  );
}
