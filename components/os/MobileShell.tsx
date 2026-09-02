"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { desktop, projects, roles } from "@/content";
import type { FSNode } from "@/content/types";
import { useIsCompact } from "@/lib/os/useIsCompact";
import MacIcon, { type MacIconName } from "./MacIcon";
import { useWallpaper } from "./WallpaperMenu";

/**
 * iOS shell.
 *
 * Below 768px the desktop metaphor is dropped completely, as DESIGN.md
 * requires: draggable windows are unusable on a phone and a dock nobody can
 * hover is not worth shipping. What replaces it is the direct translation of
 * the same idea, a springboard, so the design language carries over rather
 * than being abandoned.
 *
 * This owns compact entirely. Desktop, MenuBar, Dock, Hints and the window
 * layer all stand down below the breakpoint, which is why the desktop build is
 * untouched by any of this.
 *
 * Two states:
 *   "/"        home screen. Widgets, then a single app grid.
 *   any route  a full-screen app with a nav bar and a back affordance.
 *
 * No fake status bar. The phone already draws a real one directly above this,
 * and DESIGN.md rules out simulating hardware the site does not have.
 */

const APP_ICON: Record<string, MacIconName> = {
  "/work": "folder",
  "/experience": "timeline",
  "/about": "document",
  "/contact": "mail",
  "/kaal": "kaal",
  "/Sahil_Dixit_Resume.pdf": "pdf",
};

function titleFor(pathname: string): string {
  if (pathname === "/") return "Home";
  const project = projects.find((p) => `/work/${p.slug}` === pathname);
  if (project) return project.name;
  const role = roles.find((r) => `/experience/${r.id}` === pathname);
  if (role) return role.company;
  const map: Record<string, string> = {
    "/about": "About",
    "/work": "Work",
    "/experience": "Experience",
    "/contact": "Contact",
    "/kaal": "Kaal",
  };
  return map[pathname] ?? "Back";
}

/** Parent route for the back chevron, iOS-style hierarchical navigation. */
function parentOf(pathname: string): string {
  if (pathname.startsWith("/work/")) return "/work";
  if (pathname.startsWith("/experience/")) return "/experience";
  return "/";
}

export default function MobileShell({
  children,
  widgets,
}: {
  children: ReactNode;
  widgets?: ReactNode;
}) {
  const compact = useIsCompact();
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const { wallpaper } = useWallpaper();

  // Desktop is untouched: above the breakpoint this renders nothing at all.
  if (!compact) return null;

  const isHome = pathname === "/";

  return (
    <div
      className="fixed inset-0 z-[1200] overflow-hidden"
      style={{
        backgroundImage: isHome ? wallpaper.css : undefined,
        backgroundSize: "cover",
        backgroundColor: isHome ? "var(--color-desktop)" : "var(--color-canvas)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isHome ? (
          <motion.div
            key="home"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="h-full overflow-y-auto overscroll-contain"
            style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
          >
            <HomeScreen widgets={widgets} />
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 26 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full flex-col"
          >
            {/* Nav bar. Translucent and sticky, as iOS draws it. */}
            <header
              className="flex shrink-0 items-center gap-1 px-2"
              style={{
                paddingTop: "max(env(safe-area-inset-top), 10px)",
                paddingBottom: 10,
                background: "var(--color-chrome-menubar)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                borderBottom: "1px solid var(--color-hairline)",
              }}
            >
              <button
                type="button"
                onClick={() => router.push(parentOf(pathname))}
                aria-label={`Back to ${titleFor(parentOf(pathname))}`}
                className="flex items-center gap-0.5 px-2 py-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  color: "var(--link-accent)",
                }}
              >
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" aria-hidden="true">
                  <path
                    d="M9.5 1.5 2 9l7.5 7.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {titleFor(parentOf(pathname))}
              </button>

              <span
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                }}
              >
                {titleFor(pathname)}
              </span>
            </header>

            <main
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
              style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
            >
              {children}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Home screen ──────────────────────────────────────────────────── */

function HomeScreen({ widgets }: { widgets?: ReactNode }) {
  const apps = flatten(desktop);

  return (
    <div
      className="min-h-full px-5 pb-8"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
    >
      {widgets && <div className="mb-6 flex flex-col items-center gap-3 pt-2">{widgets}</div>}

      {/*
        One grid, four across, the iOS springboard column count.

        There is no separate dock. With six destinations a dock would repeat
        four of them directly under the grid, which reads as a rendering bug
        rather than as iOS.
      */}
      <div className="grid grid-cols-4 gap-x-3 gap-y-5">
        {apps.map((app) => (
          <AppIcon key={app.route} route={app.route} name={app.name} external={app.external} />
        ))}
      </div>
    </div>
  );
}

function AppIcon({
  route,
  name,
  external = false,
}: {
  route: string;
  name: string;
  external?: boolean;
}) {
  const Tag = external ? "a" : Link;
  const props = external
    ? { href: route, target: "_blank", rel: "noopener noreferrer" }
    : { href: route };

  return (
    <Tag {...props} className="flex flex-col items-center gap-1.5">
      <span
        className="block"
        style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))" }}
      >
        <MacIcon name={APP_ICON[route] ?? "grid"} size={56} />
      </span>
      <span
        className="max-w-full truncate"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: "#fff",
          textShadow: "0 1px 3px rgba(0,0,0,0.85)",
        }}
      >
        {name}
      </span>
    </Tag>
  );
}

/** Top-level destinations. Files open directly, folders open as a route. */
function flatten(
  nodes: FSNode[],
): { route: string; name: string; external?: boolean }[] {
  return nodes.map((node) =>
    node.kind === "file"
      ? { route: node.href, name: node.name.replace(/\.pdf$/, ""), external: true }
      : { route: node.route, name: node.name.replace(/\.(app|md)$/, "") },
  );
}
