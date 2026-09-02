"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "ABOUT",   href: "#about"      },
  { label: "WORK",    href: "#work"       },
  { label: "EXP",     href: "#experience" },
  { label: "STACK",   href: "#stack"      },
  { label: "CONTACT", href: "#contact"    },
];

export default function Navbar() {
  const [open, setOpen]            = useState(false);
  const [activeSection, setActive] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const track = () => {
      const threshold = window.scrollY + 80;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", track, { passive: true });
    track();
    return () => window.removeEventListener("scroll", track);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Bar ─────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
        style={{
          height:       "44px",
          background:   "var(--color-surface-1)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        {/* LEFT: live-status dot + exe name */}
        <a href="#" className="flex items-center gap-2 cursor-none">
          <motion.span
            className="w-1.5 h-1.5 inline-block"
            style={{ background: "var(--color-primary)", borderRadius: "9999px" }}
            animate={reduce ? { opacity: 1 } : { opacity: [1, 0, 1] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <span
            className="font-mono text-xs"
            style={{ color: "var(--color-ink)", letterSpacing: "0.1em" }}
          >
            SAHIL_DIXIT.exe
          </span>
        </a>

        {/* CENTER: live availability — desktop only, truly centered via absolute */}
        <span
          className="font-mono hidden md:block absolute left-1/2 -translate-x-1/2 text-xs pointer-events-none select-none"
          style={{ color: "var(--color-primary)" }}
        >
          STATUS: AVAILABLE_FOR_WORK
        </span>

        {/* RIGHT: desktop links + mobile hamburger */}
        <div className="flex items-center gap-5">
          <ul className="hidden md:flex items-center gap-5">
            {links.map((l) => {
              const active = activeSection === l.href.replace("#", "");
              return (
                <li key={l.label}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="font-mono text-xs cursor-none transition-colors duration-150"
                    style={{
                      /* The active link is the one live thing in the nav, so it
                         is the only place the green underline appears. */
                      color:          active ? "var(--color-ink)" : "var(--color-ink-subtle)",
                      borderBottom:   active
                        ? "1px solid var(--color-primary)"
                        : "1px solid transparent",
                      paddingBottom:  "2px",
                    }}
                  >
                    [{l.label}]
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="md:hidden cursor-none transition-colors p-1"
            style={{ color: "var(--color-ink-subtle)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay ────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center md:hidden"
            style={{ background: "var(--color-canvas)" }}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-6 cursor-none transition-colors"
              style={{ color: "var(--color-ink-subtle)" }}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={16} />
            </button>

            {/* Links */}
            <div className="flex flex-col items-center gap-6">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }
                  onClick={() => handleNav(l.href)}
                  className="font-display cursor-none transition-colors duration-150"
                  style={{
                    fontSize:      "clamp(34px, 9vw, 56px)",
                    fontWeight:    300,
                    lineHeight:    1.1,
                    letterSpacing: "-0.035em",
                    textTransform: "uppercase",
                    color:         "var(--color-ink)",
                  }}
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
