"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, projects } from "@/content";
import { useOS } from "@/lib/os/store";
import {
  emailHref,
  githubHref,
  OS_APPS,
  RESUME_HREF,
  useOpenWindow,
  type OpenHandler,
} from "./Dock";

/* ═══════════════════════════════════════════════════════════════════
   Spotlight. Cmd+K / Ctrl+K.

   This is the accessible navigation path for the whole site, so the
   keyboard contract has to be complete: arrows move, Enter opens,
   Escape closes, Tab is trapped, focus is restored on close.
   ═══════════════════════════════════════════════════════════════════ */

type Category = "SECTION" | "PROJECT" | "ACTION";

interface Result {
  id: string;
  label: string;
  detail: string;
  category: Category;
  /** Extra searchable text. Never rendered. */
  keywords: string;
  run: () => void;
}

export interface SpotlightProps {
  /** Route-aware activation. Falls back to the window store. */
  onOpen?: OpenHandler;
}

export default function Spotlight({ onOpen }: SpotlightProps) {
  const open = useOS((s) => s.spotlightOpen);
  const setSpotlight = useOS((s) => s.setSpotlight);

  /* Cmd+K / Ctrl+K. Registered once, independent of the panel. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSpotlight(!useOS.getState().spotlightOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSpotlight]);

  /* The panel mounts on open, so its state is fresh every time. */
  return <AnimatePresence>{open ? <Panel onOpen={onOpen} /> : null}</AnimatePresence>;
}

function Panel({ onOpen }: SpotlightProps) {
  const reduce = useReducedMotion();
  const activate = useOpenWindow(onOpen);

  const setSpotlight = useOS((s) => s.setSpotlight);
  const closeAll = useOS((s) => s.closeAll);

  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const restoreRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setSpotlight(false), [setSpotlight]);

  /* ── Sources ─────────────────────────────────────────────────────── */

  const results = useMemo<Result[]>(() => {
    const sections = OS_APPS.map<Result>((app) => ({
      id: `section:${app.id}`,
      label: app.title,
      detail: app.route,
      category: "SECTION",
      keywords: `${app.title} ${app.route} section window`,
      run: () => activate(app),
    }));

    const work = projects.map<Result>((project) => {
      const route = `/work/${project.slug}`;
      const link = project.href ?? project.repo;
      return {
        id: `project:${project.slug}`,
        label: project.name,
        detail: project.summary,
        category: "PROJECT",
        keywords: `${project.name} ${project.summary} ${project.tags.join(" ")} ${project.status}`,
        run: () => {
          if (project.tier === "featured" || !link) {
            activate({
              kind: "window",
              id: route,
              title: project.name,
              route,
              w: 860,
              h: 600,
            });
            return;
          }
          activate({ kind: "link", href: link });
        },
      };
    });

    const actions: Result[] = [
      {
        id: "action:email",
        label: "Email Sahil",
        detail: profile.email,
        category: "ACTION",
        keywords: `email contact mail ${profile.email}`,
        run: () => activate({ kind: "link", href: emailHref }),
      },
      {
        id: "action:github",
        label: "GitHub",
        detail: githubHref.replace(/^https?:\/\//, ""),
        category: "ACTION",
        keywords: "github source code repo",
        run: () => activate({ kind: "link", href: githubHref }),
      },
      {
        id: "action:resume",
        label: "Resume",
        detail: RESUME_HREF,
        category: "ACTION",
        keywords: "resume cv pdf download",
        run: () => activate({ kind: "link", href: RESUME_HREF }),
      },
      {
        id: "action:close-all",
        label: "Close All Windows",
        detail: "Clear the desktop",
        category: "ACTION",
        keywords: "close all windows clear desktop quit",
        run: () => closeAll(),
      },
    ];

    return [...sections, ...work, ...actions];
  }, [activate, closeAll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return results;
    return results
      .map((result) => {
        const label = result.label.toLowerCase();
        let score = -1;
        if (label.startsWith(q)) score = 0;
        else if (label.includes(q)) score = 1;
        else if (result.detail.toLowerCase().includes(q)) score = 2;
        else if (result.keywords.toLowerCase().includes(q)) score = 3;
        return { result, score };
      })
      .filter((entry) => entry.score >= 0)
      .sort((a, b) => a.score - b.score)
      .map((entry) => entry.result);
  }, [query, results]);

  /* ── Focus: take it on mount, hand it back on close ──────────────── */

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => {
      restoreRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    rowRefs.current[index]?.scrollIntoView({ block: "nearest" });
  }, [index, filtered.length]);

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (!filtered.length) return 0;
        return (current + delta + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  const runAt = useCallback(
    (at: number) => {
      const result = filtered[at];
      if (!result) return;
      close();
      result.run();
    },
    [close, filtered],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "ArrowDown":
        event.preventDefault();
        step(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        step(-1);
        break;
      case "Home":
        event.preventDefault();
        setIndex(0);
        break;
      case "End":
        event.preventDefault();
        setIndex(Math.max(0, filtered.length - 1));
        break;
      case "Enter":
        event.preventDefault();
        runAt(index);
        break;
      case "Tab":
        /* Trap. Focus never leaves the input, so Tab walks results. */
        event.preventDefault();
        step(event.shiftKey ? -1 : 1);
        break;
      default:
        break;
    }
  };

  const safeIndex = Math.min(index, Math.max(0, filtered.length - 1));

  return (
    <div
      className="fixed inset-0 flex items-start justify-center px-4 pt-[14vh]"
      style={{ zIndex: "var(--z-spotlight)" }}
    >
      <motion.button
        type="button"
        tabIndex={-1}
        aria-label="Close command palette"
        onClick={close}
        className="absolute inset-0 cursor-default"
        style={{ backgroundColor: "var(--color-desktop)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.14 }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[min(560px,90vw)] overflow-hidden"
        style={{
          backgroundColor: "var(--color-chrome-window)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid var(--color-chrome-border-focused)",
          borderRadius: "var(--radius-window)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid var(--color-hairline)" }}
        >
          <span
            aria-hidden="true"
            className="font-body text-[20px] leading-none"
            style={{ color: "var(--color-ink-faint)" }}
          >
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-label="Search projects, sections and actions"
            aria-activedescendant={
              filtered.length ? `${listId}-${safeIndex}` : undefined
            }
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIndex(0);
            }}
            placeholder="Search"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent font-body text-[20px] leading-[1.2] tracking-[-0.01em] outline-none"
            style={{ color: "var(--color-ink)" }}
          />
        </div>

        <ul
          id={listId}
          role="listbox"
          aria-label="Results"
          className="max-h-[46vh] overflow-y-auto py-1"
        >
          {filtered.map((result, i) => {
            const active = i === safeIndex;
            return (
              <li key={result.id}>
                <button
                  type="button"
                  role="option"
                  id={`${listId}-${i}`}
                  aria-selected={active}
                  aria-label={`${result.label}. ${result.category.toLowerCase()}`}
                  tabIndex={-1}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onPointerEnter={() => setIndex(i)}
                  onClick={() => runAt(i)}
                  className="flex w-full items-baseline gap-3 px-4 py-2 text-left"
                  style={{
                    backgroundColor: active
                      ? "var(--color-selection)"
                      : "transparent",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span
                    className="w-[64px] shrink-0 font-mono text-[10px] tracking-[0.14em] uppercase"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {result.category}
                  </span>
                  <span
                    className="shrink-0 font-body text-[14px]"
                    style={{
                      color: active ? "var(--color-ink)" : "var(--color-ink-muted)",
                    }}
                  >
                    {result.label}
                  </span>
                  <span
                    className="truncate font-body text-[12px]"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {result.detail}
                  </span>
                </button>
              </li>
            );
          })}

          {filtered.length === 0 ? (
            <li
              className="px-4 py-3 font-body text-[13px]"
              style={{ color: "var(--color-ink-faint)" }}
            >
              NO RESULTS
            </li>
          ) : null}
        </ul>

        <div
          className="flex items-center justify-between px-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase"
          style={{
            borderTop: "1px solid var(--color-hairline)",
            color: "var(--color-ink-faint)",
          }}
        >
          <span>{filtered.length} results</span>
          <span>Enter opens · Esc closes</span>
        </div>
      </motion.div>
    </div>
  );
}
