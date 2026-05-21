"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const links = [
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Stack",   href: "#stack"   },
  { label: "Contact", href: "#contact" },
];

function MagneticLink({
  label,
  onClick,
  isActive,
}: {
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    rawY.set((e.clientY - rect.top  - rect.height / 2) * 0.35);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-none group"
    >
      <button
        onClick={onClick}
        className={`relative text-sm transition-colors duration-200 tracking-wide py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] rounded-sm ${
          isActive ? "text-white" : "text-gray-400 group-hover:text-white"
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-px w-full bg-indigo-500 origin-left transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </button>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));

    const trackActive = () => {
      const threshold = window.scrollY + 120;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", trackActive, { passive: true });
    trackActive();
    return () => window.removeEventListener("scroll", trackActive);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-lg text-indigo-500 tracking-[0.2em] select-none"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic" }}
          >
            SK
          </a>

          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.label}>
                <MagneticLink
                  label={l.label}
                  onClick={() => handleNav(l.href)}
                  isActive={activeSection === l.href.replace("#", "")}
                />
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors cursor-none p-3 -mr-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] rounded-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a] border-b border-white/[0.04] md:hidden"
          >
            <ul className="flex flex-col px-6 py-5 gap-5">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="w-full text-left text-base text-gray-300 hover:text-white transition-colors py-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
