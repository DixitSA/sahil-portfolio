"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { profile } from "@/content";
import { useOS } from "@/lib/os/store";
import MacIcon, { type MacIconName } from "./MacIcon";

/* ═══════════════════════════════════════════════════════════════════
   Shared launcher contract.

   Every chrome surface (dock, menu bar, desktop icons, spotlight)
   activates the same two kinds of target: an in-OS window, or a real
   link. Routes are the source of truth per DESIGN.md, so the default
   handler only touches the window store. Pass `onOpen` from a client
   WindowManager to push the route as well.
   ═══════════════════════════════════════════════════════════════════ */

export interface WindowTarget {
  kind: "window";
  /** Stable id. Equal to the route, per the store contract. */
  id: string;
  title: string;
  route: string;
  w?: number;
  h?: number;
}

export interface LinkTarget {
  kind: "link";
  href: string;
  /** false keeps navigation in the current tab. */
  external?: boolean;
}

export type OpenTarget = WindowTarget | LinkTarget;
export type OpenHandler = (target: OpenTarget) => void;

/** The four section applications. Shared by dock, menu bar and spotlight. */
export const OS_APPS: WindowTarget[] = [
  { kind: "window", id: "/about", title: "About", route: "/about", w: 720, h: 520 },
  { kind: "window", id: "/work", title: "Work", route: "/work", w: 840, h: 560 },
  {
    kind: "window",
    id: "/experience",
    title: "Experience",
    route: "/experience",
    w: 760,
    h: 560,
  },
  { kind: "window", id: "/contact", title: "Contact", route: "/contact", w: 560, h: 420 },
  // Kaal is a real application, not portfolio content: it renders in the
  // product's own identity and computes against the production engine.
  { kind: "window", id: "/kaal", title: "Kaal", route: "/kaal", w: 620, h: 640 },
];

/** Must match the file in /public and the Resume.pdf node in content/fs.ts. */
export const RESUME_HREF = "/Sahil_Dixit_Resume.pdf";
export const emailHref = `mailto:${profile.email}`;
export const githubHref = profile.github.startsWith("http")
  ? profile.github
  : `https://github.com/${profile.github.replace(/^@/, "")}`;

/**
 * Activation.
 *
 * Default behaviour opens the window and pushes its route, in that order:
 * the window appears without waiting on navigation, and the URL becomes the
 * linkable truth. WindowManager's pathname effect then resolves to the same
 * id, and the store treats a second open as a focus. Supply `onOpen` to take
 * over entirely.
 */
export function useOpenWindow(onOpen?: OpenHandler): OpenHandler {
  const open = useOS((s) => s.open);
  const router = useRouter();

  return useCallback(
    (target: OpenTarget) => {
      if (onOpen) {
        onOpen(target);
        return;
      }
      if (target.kind === "window") {
        open({
          id: target.id,
          title: target.title,
          route: target.route,
          w: target.w,
          h: target.h,
        });
        router.push(target.route);
        return;
      }
      if (target.href.startsWith("mailto:") || target.external === false) {
        window.location.href = target.href;
        return;
      }
      window.open(target.href, "_blank", "noopener,noreferrer");
    },
    [onOpen, open, router],
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Glyphs. 1px stroke, currentColor, no fills. No skeuomorphic Apple
   icon replicas, per the icon rule.
   ═══════════════════════════════════════════════════════════════════ */

export type GlyphName =
  | "user"
  | "folder"
  | "timeline"
  | "mail"
  | "doc"
  | "terminal"
  | "window"
  | "app";

export function Glyph({
  name,
  size = 22,
  strokeWidth = 1,
}: {
  name: GlyphName;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {name === "user" && (
        <>
          <circle cx="12" cy="9" r="3.5" />
          <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
        </>
      )}
      {name === "folder" && (
        <>
          <path d="M3 6h6l2 2h10v11H3z" />
          <path d="M3 11h18" />
        </>
      )}
      {name === "timeline" && (
        <>
          <path d="M6 4v16" />
          <circle cx="6" cy="8" r="1.5" />
          <circle cx="6" cy="15" r="1.5" />
          <path d="M10 8h9" />
          <path d="M10 15h6" />
        </>
      )}
      {name === "mail" && (
        <>
          <path d="M3 6h18v12H3z" />
          <path d="M3 7l9 6 9-6" />
        </>
      )}
      {name === "doc" && (
        <>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </>
      )}
      {name === "terminal" && (
        <>
          <path d="M3 5h18v14H3z" />
          <path d="M7 10l2.5 2.5L7 15" />
          <path d="M12.5 15h4.5" />
        </>
      )}
      {name === "window" && (
        <>
          <path d="M3 5h18v14H3z" />
          <path d="M3 9h18" />
        </>
      )}
      {name === "app" && (
        <>
          <path d="M4 4h7v7H4z" />
          <path d="M13 4h7v7h-7z" />
          <path d="M4 13h7v7H4z" />
          <path d="M13 13h7v7h-7z" />
        </>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Dock
   ═══════════════════════════════════════════════════════════════════ */

export interface DockEntry {
  key: string;
  label: string;
  glyph: GlyphName;
  target: OpenTarget;
  /** Drawn macOS-language icon. See MacIcon.tsx. */
  icon: MacIconName;
  /** Trailing group sits after the separator rule. */
  trailing?: boolean;
}

const DOCK_ICONS: Record<string, MacIconName> = {
  "/about": "person",
  "/work": "folder",
  "/experience": "timeline",
  "/contact": "mail",
  "/kaal": "grid",
};

const DOCK_GLYPHS: Record<string, GlyphName> = {
  "/about": "user",
  "/work": "folder",
  "/experience": "timeline",
  "/contact": "mail",
};

export const DOCK_ENTRIES: DockEntry[] = [
  ...OS_APPS.map<DockEntry>((app) => ({
    key: app.id,
    label: app.title,
    glyph: DOCK_GLYPHS[app.id] ?? "window",
    target: app,
    icon: DOCK_ICONS[app.id] ?? "grid",
  })),
  {
    key: "resume",
    label: "Resume",
    glyph: "doc",
    target: { kind: "link", href: RESUME_HREF },
    icon: "pdf",
    trailing: true,
  },
  {
    key: "github",
    label: "GitHub",
    glyph: "terminal",
    target: { kind: "link", href: githubHref },
    icon: "terminal",
    trailing: true,
  },
];

const ICON = 48;
const GAP = 8;
const PAD = 8;
const SEPARATOR = 1;
/** 48 * 1.5 = 72 = spacing.dock-icon-max. Scale only, never width. */
const MAX_SCALE = 1.5;
const NEIGHBOUR = 1 + (MAX_SCALE - 1) * 0.32;
const FALLOFF = 130;

/**
 * Item centres relative to the dock's left edge. Sizes are fixed and
 * `scale` does not affect layout, so these never change: no measuring
 * on pointer move, and no React re-render while the pointer travels.
 */
function computeCentres(entries: DockEntry[]): number[] {
  const centres: number[] = [];
  let offset = PAD;
  entries.forEach((entry, i) => {
    if (entry.trailing && !entries[i - 1]?.trailing) offset += SEPARATOR + GAP;
    centres.push(offset + ICON / 2);
    offset += ICON + GAP;
  });
  return centres;
}

export interface DockProps {
  /** Route-aware activation. Falls back to the window store. */
  onOpen?: OpenHandler;
}

export default function Dock({ onOpen }: DockProps) {
  const reduce = useReducedMotion();
  const activate = useOpenWindow(onOpen);

  /** Joined string, not an array: keeps the zustand snapshot stable. */
  const openIds = useOS((s) => s.windows.map((w) => w.id).join(""));
  const running = useMemo(() => new Set(openIds.split("")), [openIds]);

  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const centres = useMemo(() => computeCentres(DOCK_ENTRIES), []);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
  };

  const handleLeave = () => mouseX.set(Number.POSITIVE_INFINITY);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-3 hidden justify-center md:flex"
      style={{ zIndex: "var(--z-dock)" }}
    >
      <div
        role="toolbar"
        aria-label="Dock"
        aria-orientation="horizontal"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="pointer-events-auto flex h-16 items-end gap-2 p-2"
        style={{
          backgroundColor: "var(--color-chrome-dock)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "var(--radius-dock)",
          boxShadow: "var(--shadow-dock)",
        }}
      >
        {DOCK_ENTRIES.map((entry, i) => (
          <div key={entry.key} className="flex items-end gap-2">
            {entry.trailing && !DOCK_ENTRIES[i - 1]?.trailing ? (
              <span
                aria-hidden="true"
                className="h-10 w-px self-center"
                style={{ backgroundColor: "var(--color-hairline-strong)" }}
              />
            ) : null}
            <DockItem
              entry={entry}
              centre={centres[i]}
              mouseX={mouseX}
              magnify={!reduce}
              isRunning={entry.target.kind === "window" && running.has(entry.target.id)}
              onActivate={() => activate(entry.target)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface DockItemProps {
  entry: DockEntry;
  centre: number;
  mouseX: MotionValue<number>;
  magnify: boolean;
  isRunning: boolean;
  onActivate: () => void;
}

function DockItem({
  entry,
  centre,
  mouseX,
  magnify,
  isRunning,
  onActivate,
}: DockItemProps) {
  const reduceBounce = !magnify;
  const raw = useTransform(
    mouseX,
    [
      centre - FALLOFF,
      centre - FALLOFF / 2,
      centre,
      centre + FALLOFF / 2,
      centre + FALLOFF,
    ],
    [1, NEIGHBOUR, MAX_SCALE, NEIGHBOUR, 1],
    { clamp: true },
  );
  const scale = useSpring(raw, { stiffness: 400, damping: 28 });

  // macOS bounces a dock icon while an app launches. Nothing here takes long
  // enough to need a progress cue, so this is purely the acknowledgement.
  const [bouncing, setBouncing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (!reduceBounce) setBouncing(true);
        onActivate();
      }}
      aria-label={
        entry.target.kind === "window"
          ? `Open ${entry.label}${isRunning ? ", running" : ""}`
          : `Open ${entry.label} in a new tab`
      }
      className="group relative h-12 w-12"
    >
      <motion.span
        style={{
          scale: magnify ? scale : 1,
          transformOrigin: "bottom center",
          filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.45))",
        }}
        className="flex h-12 w-12 items-center justify-center"
      >
        <span
          className={bouncing ? "dock-bounce" : undefined}
          onAnimationEnd={() => setBouncing(false)}
        >
          <MacIcon name={entry.icon} size={48} />
        </span>
      </motion.span>

      {/* Running indicator. Green is live state, which this is. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-7px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full"
        style={{
          backgroundColor: "var(--color-primary)",
          opacity: isRunning ? 1 : 0,
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-4 -translate-x-1/2 px-2 py-[2px] font-mono text-[10px] tracking-[0.14em] whitespace-nowrap uppercase opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          backgroundColor: "var(--color-surface-3)",
          border: "1px solid var(--color-hairline-strong)",
          borderRadius: "var(--radius-sm)",
          color: "var(--color-ink)",
        }}
      >
        {entry.label}
      </span>
    </button>
  );
}
