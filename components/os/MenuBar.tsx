"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
   Menu bar. Fixed top, 28px, blur(20px) saturate(180%).

   Left:  monogram, focused window name, menus.
   Right: availability dot and a live clock.

   No battery. No wifi. Simulating hardware we do not have is where an
   OS portfolio tips from clever into costume.
   ═══════════════════════════════════════════════════════════════════ */

interface MenuAction {
  kind: "action";
  label: string;
  hint?: string;
  run: () => void;
}

interface MenuSeparator {
  kind: "separator";
}

type MenuEntry = MenuAction | MenuSeparator;

interface Menu {
  id: string;
  label: string;
  /** Absent means the trigger is a plain button, not a dropdown. */
  items?: MenuEntry[];
  run?: () => void;
  monogram?: boolean;
}

export interface MenuBarProps {
  /** Route-aware activation. Falls back to the window store. */
  onOpen?: OpenHandler;
}

export default function MenuBar({ onOpen }: MenuBarProps) {
  const reduce = useReducedMotion();
  const activate = useOpenWindow(onOpen);

  const setSpotlight = useOS((s) => s.setSpotlight);
  const closeAll = useOS((s) => s.closeAll);
  const focusedTitle = useOS(
    (s) => s.windows.find((w) => w.id === s.focusedId)?.title ?? "Finder",
  );

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const menus = useMemo<Menu[]>(() => {
    const app = (id: string) => OS_APPS.find((a) => a.id === id)!;
    const openApp = (id: string) => () => activate(app(id));

    const caseStudies = projects
      .filter((p) => p.tier === "featured")
      .map<MenuEntry>((p) => ({
        kind: "action",
        label: p.name,
        hint: p.status,
        run: () =>
          activate({
            kind: "window",
            id: `/work/${p.slug}`,
            title: p.name,
            route: `/work/${p.slug}`,
            w: 860,
            h: 600,
          }),
      }));

    return [
      {
        id: "system",
        label: initials(profile.name),
        monogram: true,
        items: [
          {
            kind: "action",
            label: "Command Palette",
            hint: "⌘K",
            run: () => setSpotlight(true),
          },
          { kind: "separator" },
          ...OS_APPS.map<MenuEntry>((a) => ({
            kind: "action",
            label: a.title,
            run: () => activate(a),
          })),
          { kind: "separator" },
          { kind: "action", label: "Close All Windows", run: () => closeAll() },
        ],
      },
      {
        id: "about",
        label: "About",
        items: [
          { kind: "action", label: "Open About", run: openApp("/about") },
          { kind: "separator" },
          {
            kind: "action",
            label: "Resume.pdf",
            run: () => activate({ kind: "link", href: RESUME_HREF }),
          },
          {
            kind: "action",
            label: "GitHub",
            run: () => activate({ kind: "link", href: githubHref }),
          },
        ],
      },
      {
        id: "work",
        label: "Work",
        items: [
          { kind: "action", label: "Open Work", run: openApp("/work") },
          ...(caseStudies.length ? [{ kind: "separator" } as MenuEntry] : []),
          ...caseStudies,
        ],
      },
      {
        id: "experience",
        label: "Experience",
        run: openApp("/experience"),
      },
      {
        id: "contact",
        label: "Contact",
        items: [
          { kind: "action", label: "Open Contact", run: openApp("/contact") },
          { kind: "separator" },
          {
            kind: "action",
            label: profile.email,
            run: () => activate({ kind: "link", href: emailHref }),
          },
          {
            kind: "action",
            label: "GitHub",
            run: () => activate({ kind: "link", href: githubHref }),
          },
        ],
      },
    ];
  }, [activate, closeAll, setSpotlight]);

  /* Dismiss on outside pointer and on Escape. */
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        triggerRefs.current[openMenu]?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  /* Left and right arrows walk the menu titles, as in macOS. */
  const stepTrigger = useCallback(
    (from: string, delta: number) => {
      const index = menus.findIndex((m) => m.id === from);
      const next = menus[(index + delta + menus.length) % menus.length];
      triggerRefs.current[next.id]?.focus();
      if (openMenu) setOpenMenu(next.items ? next.id : null);
    },
    [menus, openMenu],
  );

  return (
    <header
      className="fixed inset-x-0 top-0 flex h-7 items-stretch justify-between px-3"
      style={{
        zIndex: "var(--z-menubar)",
        backgroundColor: "var(--color-chrome-menubar)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div ref={barRef} className="flex items-stretch">
        <nav
          aria-label="Main menu"
          className="flex items-stretch"
          onKeyDown={(event) => {
            const id = (event.target as HTMLElement).dataset.menuTrigger;
            if (!id) return;
            if (event.key === "ArrowRight") {
              event.preventDefault();
              stepTrigger(id, 1);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              stepTrigger(id, -1);
            }
          }}
        >
          {menus.map((menu) => (
            <MenuTitle
              key={menu.id}
              menu={menu}
              isOpen={openMenu === menu.id}
              reduce={Boolean(reduce)}
              registerTrigger={(el) => {
                triggerRefs.current[menu.id] = el;
              }}
              onToggle={() =>
                setOpenMenu((current) => (current === menu.id ? null : menu.id))
              }
              onHover={() => {
                if (openMenu && menu.items) setOpenMenu(menu.id);
              }}
              onClose={(refocus) => {
                setOpenMenu(null);
                if (refocus) triggerRefs.current[menu.id]?.focus();
              }}
            />
          ))}
        </nav>

        {/* Focused window name. Medium weight, per the spec. */}
        <span
          className="ml-1 hidden items-center px-2 font-mono text-[12px] font-medium md:flex"
          style={{ color: "var(--color-ink)" }}
        >
          {focusedTitle}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <SpotlightButton onOpen={() => setSpotlight(true)} />
        <Availability available={profile.available} reduce={Boolean(reduce)} />
        <Clock />
      </div>
    </header>
  );
}

/* ── Menu title + dropdown ─────────────────────────────────────────── */

interface MenuTitleProps {
  menu: Menu;
  isOpen: boolean;
  reduce: boolean;
  registerTrigger: (el: HTMLButtonElement | null) => void;
  onToggle: () => void;
  onHover: () => void;
  onClose: (refocus: boolean) => void;
}

function MenuTitle({
  menu,
  isOpen,
  reduce,
  registerTrigger,
  onToggle,
  onHover,
  onClose,
}: MenuTitleProps) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const actions = useMemo(
    () => (menu.items ?? []).filter((i): i is MenuAction => i.kind === "action"),
    [menu.items],
  );

  const focusItem = (index: number) => {
    const count = actions.length;
    if (!count) return;
    itemRefs.current[(index + count) % count]?.focus();
  };

  return (
    <div className="relative flex items-stretch">
      <button
        type="button"
        ref={registerTrigger}
        data-menu-trigger={menu.id}
        aria-haspopup={menu.items ? "menu" : undefined}
        aria-expanded={menu.items ? isOpen : undefined}
        aria-label={menu.items ? `${menu.label} menu` : `Open ${menu.label}`}
        onClick={() => (menu.items ? onToggle() : menu.run?.())}
        onPointerEnter={onHover}
        onKeyDown={(event) => {
          if (!menu.items) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!isOpen) onToggle();
            window.requestAnimationFrame(() => focusItem(0));
          }
        }}
        className={[
          "flex items-center px-2 font-mono text-[12px] transition-colors duration-150",
          menu.monogram ? "tracking-[0.1em]" : "",
        ].join(" ")}
        style={{
          color: isOpen || menu.monogram ? "var(--color-ink)" : "var(--color-ink-muted)",
          backgroundColor: isOpen ? "var(--color-selection)" : "transparent",
          borderRadius: "var(--radius-sm)",
        }}
      >
        {menu.label}
      </button>

      <AnimatePresence>
        {isOpen && menu.items ? (
          <motion.div
            role="menu"
            aria-label={menu.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-px min-w-[200px] py-1"
            style={{
              zIndex: "var(--z-menu-dropdown)",
              transformOrigin: "top left",
              backgroundColor: "var(--color-chrome-window)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--color-chrome-border-focused)",
              borderRadius: "var(--radius-sm)",
            }}
            onKeyDown={(event) => {
              const index = itemRefs.current.findIndex(
                (el) => el === document.activeElement,
              );
              if (event.key === "ArrowDown") {
                event.preventDefault();
                focusItem(index + 1);
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                focusItem(index - 1);
              } else if (event.key === "Tab") {
                onClose(false);
              }
            }}
          >
            {(() => {
              let cursor = -1;
              return menu.items.map((item, i) => {
                if (item.kind === "separator") {
                  return (
                    <div
                      key={`sep-${i}`}
                      role="separator"
                      className="my-1 h-px"
                      style={{ backgroundColor: "var(--color-hairline)" }}
                    />
                  );
                }
                cursor += 1;
                const at = cursor;
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    ref={(el) => {
                      itemRefs.current[at] = el;
                    }}
                    aria-label={item.label}
                    onClick={() => {
                      onClose(false);
                      item.run();
                    }}
                    className="flex w-full items-center justify-between gap-6 px-3 py-1 text-left font-mono text-[12px] transition-colors duration-150 hover:bg-selection focus-visible:bg-selection"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    <span>{item.label}</span>
                    {item.hint ? (
                      <span style={{ color: "var(--color-ink-faint)" }}>{item.hint}</span>
                    ) : null}
                  </button>
                );
              });
            })()}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ── Status items ──────────────────────────────────────────────────── */

/**
 * Spotlight affordance.
 *
 * macOS keeps search in the menu bar, and this doubles as the only permanent
 * instruction on the page: the shortcut is printed next to the glyph, so a
 * visitor learns the most useful key without being told anything.
 */
function SpotlightButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Search. Keyboard shortcut Command K"
      className="flex items-center gap-1.5 px-1.5 py-0.5"
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          cx="11"
          cy="11"
          r="6.5"
          stroke="var(--color-ink-subtle)"
          strokeWidth="1.6"
        />
        <path
          d="M16 16l4.5 4.5"
          stroke="var(--color-ink-subtle)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span
        className="hidden font-mono text-[10px] tracking-[0.1em] md:inline"
        style={{ color: "var(--color-ink-faint)" }}
      >
        ⌘K
      </span>
    </button>
  );
}

function Availability({ available, reduce }: { available: boolean; reduce: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-[6px] w-[6px] rounded-full"
        style={{
          backgroundColor: available
            ? "var(--color-primary)"
            : "var(--color-ink-faint)",
          animation: available && !reduce ? "status-pulse 2s ease-in-out infinite" : undefined,
        }}
      />
      <span
        className="hidden font-mono text-[10px] tracking-[0.14em] uppercase sm:inline"
        style={{ color: "var(--color-ink-subtle)" }}
      >
        {available ? "Available" : "Booked"}
      </span>
    </span>
  );
}

/**
 * Local clock. The cheapest possible proof the thing is alive.
 * Renders empty on the server so hydration cannot mismatch, then ticks
 * on a one-second interval which is cleared on unmount.
 */
function Clock() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const day = d
        .toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" })
        .toUpperCase();
      const time = d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setNow(`${day}  ${time}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className="font-mono text-[12px] tabular-nums"
      style={{ color: "var(--color-ink-subtle)" }}
      suppressHydrationWarning
    >
      {now}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
