"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { desktop, profile, projects, roles } from "@/content";
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
 *   "/"        home screen. Identity, then apps, then ambient tiles.
 *   any route  a full-screen app with a nav bar and a back affordance.
 *
 * No fake status bar. The phone already draws a real one directly above this,
 * and DESIGN.md rules out simulating hardware the site does not have.
 */

const APP_ICON: Record<string, MacIconName> = {
  "/start": "guide",
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
    "/start": "Start Here",
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
      {/*
        No AnimatePresence here on purpose. `mode="wait"` holds the incoming
        view until the outgoing one finishes animating, so a stalled exit
        leaves nothing mounted and the screen goes blank on navigation. The
        transition is a CSS keyframe instead, which always resolves and whose
        fill-mode leaves the correct resting state even if it never runs.
      */}
      {isHome ? (
        <div
          key="home"
          className="ios-home h-full overflow-y-auto overscroll-contain"
          style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
        >
          <HomeScreen widgets={widgets} />
        </div>
      ) : (
        <div key={pathname} className="ios-push flex h-full flex-col">
          {/* Nav bar. Translucent, as iOS draws it. */}
          <header
            className="relative flex shrink-0 items-center px-2"
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
                fontSize: 17,
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
              className="pointer-events-none absolute left-1/2 -translate-x-1/2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
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
        </div>
      )}
    </div>
  );
}

/* ── Home screen ──────────────────────────────────────────────────── */

/**
 * Home screen, ordered for the person this site exists to convince.
 *
 * The first version led with two tall widgets, which pushed every app icon
 * below the fold. A recruiter opening this on a phone had to scroll past
 * ambient content to reach the work. So the order is now identity, then
 * navigation, then the ambient tiles:
 *
 *   1. who this is, and whether he is available. Two seconds of reading.
 *   2. the apps, all six above the fold on a standard phone.
 *   3. the working-on and watching tiles, for anyone who keeps scrolling.
 *
 * Icon order is recruiter priority rather than filesystem order: the guide,
 * then work and resume, since those are what someone screening actually opens.
 * Start Here leads because a phone hides the menu bar and the dock, so this
 * grid is the only orientation a mobile visitor gets.
 */
const MOBILE_ORDER = [
  "/start",
  "/work",
  "/Sahil_Dixit_Resume.pdf",
  "/about",
  "/experience",
  "/contact",
  "/kaal",
];

function HomeScreen({ widgets }: { widgets?: ReactNode }) {
  const apps = flatten(desktop).sort((a, b) => {
    const ai = MOBILE_ORDER.indexOf(a.route);
    const bi = MOBILE_ORDER.indexOf(b.route);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });

  return (
    <div
      className="min-h-full px-5"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 28px)" }}
    >
      {/* 1. Identity. Small, immediate, no scrolling required. */}
      <header className="pt-3 pb-6">
        <h1
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#fff",
            textShadow: "0 1px 6px rgba(0,0,0,0.6)",
          }}
        >
          {profile.name}
        </h1>
        <p
          className="mt-0.5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "rgba(255,255,255,0.72)",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {profile.title} · {profile.location}
        </p>

        {profile.available && (
          <span
            className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              background: "rgba(0,255,65,0.12)",
              border: "1px solid rgba(0,255,65,0.32)",
              borderRadius: 999,
            }}
          >
            <span
              aria-hidden="true"
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            Available for work
          </span>
        )}
      </header>

      {/* 2. Apps. Four across, the iOS springboard column count. */}
      <div className="grid grid-cols-4 gap-x-3 gap-y-5">
        {apps.map((app) => (
          <AppIcon key={app.route} route={app.route} name={app.name} external={app.external} />
        ))}
      </div>

      {/* 3. Ambient tiles, for anyone who keeps going. */}
      {widgets && <div className="mt-8 flex flex-col gap-3 pb-2">{widgets}</div>}
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
