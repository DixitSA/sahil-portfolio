"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "ABOUT",   href: "#about"      },
  { label: "WORK",    href: "#work"       },
  { label: "EXP",     href: "#experience" },
  { label: "STACK",   href: "#stack"      },
  { label: "CONTACT", href: "#contact"    },
];

export default function Navbar() {
  const [open, setOpen]               = useState(false);
  const [activeSection, setActive]    = useState("");

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
          height: "44px",
          background: "#0d0d0d",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* LEFT: blinking dot + exe name */}
        <a href="#" className="flex items-center gap-2 cursor-none">
          <motion.span
            className="w-1.5 h-1.5 bg-terminal-green inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="text-xs tracking-widest text-[#e8e8e8]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            SAHIL_DIXIT.exe
          </span>
        </a>

        {/* CENTER: status — desktop only, truly centered via absolute */}
        <span
          className="hidden md:block absolute left-1/2 -translate-x-1/2 text-xs text-terminal-green pointer-events-none select-none"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
                    className={`text-xs cursor-none transition-colors duration-150 ${
                      active
                        ? "text-terminal-green"
                        : "text-gray-500 hover:text-terminal-green"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    [{l.label}]
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="md:hidden text-gray-400 hover:text-white cursor-none transition-colors p-1"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-[#0a0a0a] flex flex-col items-center justify-center md:hidden"
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-6 text-gray-500 hover:text-white cursor-none transition-colors"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
                  onClick={() => handleNav(l.href)}
                  className="text-white hover:text-terminal-green transition-colors duration-150 cursor-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(48px, 10vw, 72px)",
                    lineHeight: 1.1,
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
