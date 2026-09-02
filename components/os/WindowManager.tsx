"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useOS } from "@/lib/os/store";
import { useIsCompact } from "@/lib/os/useIsCompact";
import { Window, MENUBAR_HEIGHT } from "./Window";

/**
 * The window layer, and the one place where routes and window state meet.
 *
 * Routes are the source of truth (DESIGN.md > OS Shell). This component is the
 * only projection point:
 *
 *   1. pathname changes  -> open the window that owns that route
 *   2. last window closes -> push "/"
 *   3. the window owning the current pathname closes while others remain
 *      -> push the topmost remaining window's route
 *   4. focus changes -> replaceState to the focused window's route, so
 *      clicking between windows does not poison the back button
 *
 * Everything it renders comes from `windows`, which a SERVER layout owns. That
 * keeps every window body server-rendered: window content must never exist
 * only in client state.
 *
 * Example wiring from a server layout:
 *
 *   <WindowManager
 *     windows={[
 *       { route: "/about", title: "About.md", content: <About /> },
 *       { route: "/work",  title: "Work",     content: <Work />, w: 860 },
 *     ]}
 *   />
 */

/** One openable surface. `route` doubles as the window id in the store. */
export interface WindowDescriptor {
  /** Real route this window owns, e.g. "/work/kaal". Must start with "/". */
  route: string;
  /** Title bar text. Also the window's aria-label. */
  title: string;
  /** Initial width. Floored at 480 by the store. */
  w?: number;
  /** Initial height. Floored at 320 by the store. */
  h?: number;
  /** Server-rendered body. */
  content: ReactNode;
}

export interface WindowManagerProps {
  /**
   * Statically registered windows. These are the section surfaces whose
   * bodies are cheap enough to render on every route, which is what lets
   * more than one of them be open at once.
   *
   * Do NOT register "/" — that is the bare desktop and opens nothing.
   */
  windows: WindowDescriptor[];

  /**
   * Server-rendered body for the CURRENT route, i.e. the layout's `children`.
   *
   * Dynamic routes (/work/[slug], /experience/[id]) cannot be registered
   * statically without rendering every case study into every page, so the
   * current route's window is synthesized from this instead. Without it a
   * deep link to /work/kaal would resolve to the /work prefix and open the
   * project list rather than the case study.
   */
  currentContent?: ReactNode;

  /**
   * Route -> title bar text for synthesized windows. A plain object so it
   * crosses the server/client boundary; a resolver function could not.
   */
  titles?: Record<string, string>;
}

/**
 * Route -> descriptor. Exact match wins. Otherwise the longest descriptor
 * route that is a path-segment prefix of the pathname wins, so registering
 * "/work" alone still opens a window at "/work/kaal".
 */
function resolveRoute(
  pathname: string,
  table: WindowDescriptor[],
): WindowDescriptor | null {
  let best: WindowDescriptor | null = null;
  for (const d of table) {
    if (d.route === pathname) return d;
    if (d.route === "/") continue;
    if (pathname.startsWith(`${d.route}/`)) {
      if (!best || d.route.length > best.route.length) best = d;
    }
  }
  return best;
}

export function WindowManager({
  windows: table,
  currentContent,
  titles,
}: WindowManagerProps) {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * The effective table: statically registered windows, plus a synthesized
   * descriptor for the current route when it is not already registered.
   * Exact matches always beat the prefix fallback in resolveRoute, so this
   * makes /work/kaal open the case study rather than the project list.
   */
  const effective = useMemo(() => {
    const isRegistered = table.some((d) => d.route === pathname);
    if (pathname === "/" || isRegistered || currentContent == null) return table;
    return [
      ...table,
      {
        route: pathname,
        title: titles?.[pathname] ?? pathname,
        content: currentContent,
        w: 760,
        h: 600,
      } satisfies WindowDescriptor,
    ];
  }, [table, pathname, currentContent, titles]);

  const open = useOS((s) => s.open);
  const windows = useOS((s) => s.windows);
  const focusedId = useOS((s) => s.focusedId);

  // Held in a ref so a new array identity from the parent cannot re-fire the
  // route effect. The route is what drives window state, not the table.
  const tableRef = useRef(effective);
  useEffect(() => {
    tableRef.current = effective;
  }, [effective]);

  // 1. pathname -> window. Opening an already-open window focuses it.
  useEffect(() => {
    const d = resolveRoute(pathname, tableRef.current);
    if (!d) return;
    open({ id: d.route, title: d.title, route: d.route, w: d.w, h: d.h });
  }, [pathname, open]);

  // 2 + 3. window closed -> route follows.
  const prevCount = useRef(windows.length);
  useEffect(() => {
    const count = windows.length;
    const had = prevCount.current;
    prevCount.current = count;
    // Only react to closes. Opens are already route-driven.
    if (count >= had) return;

    if (count === 0) {
      if (pathname !== "/") router.push("/");
      return;
    }

    if (!windows.some((w) => w.route === pathname)) {
      const top = windows.reduce((a, b) => (b.z > a.z ? b : a));
      router.push(top.route);
    }
  }, [windows, pathname, router]);

  // 4. focus -> replaceState. Never pushes, so back still walks open/close.
  useEffect(() => {
    if (!focusedId) return;
    const w = windows.find((win) => win.id === focusedId);
    if (!w || w.minimized || w.route === pathname) return;
    router.replace(w.route, { scroll: false });
  }, [focusedId, windows, pathname, router]);

  const contentByRoute = useMemo(() => {
    const map = new Map<string, ReactNode>();
    for (const d of effective) map.set(d.route, d.content);
    return map;
  }, [effective]);

  const visible = useMemo(
    () => windows.filter((w) => !w.minimized).sort((a, b) => a.z - b.z),
    [windows],
  );

  /**
   * The document layer, and the reason this build is not just another
   * client-side macOS clone.
   *
   * Window state is client-only, so during SSR `visible` is empty and the
   * window layer emits nothing. Without this, a crawler or a visitor with
   * JavaScript off would receive a page with no content in it, which is the
   * exact failure DESIGN.md's routing rule exists to prevent.
   *
   * So the current route's body is also rendered as a plain document:
   *   - at "/" it is permanent. That route is the bare desktop, and this
   *     panel is what sits on the wallpaper.
   *   - elsewhere it renders until the first window exists, then hands off.
   *
   * `hasWindows` is read from the store rather than from a mounted flag, so
   * the server and the client's first render agree and hydration matches.
   */
  const hasWindows = windows.length > 0;
  const isRoot = pathname === "/";
  const compact = useIsCompact();

  // Below 768px the desktop metaphor is dropped: the route renders as a
  // full-screen app view instead of a draggable window, per DESIGN.md.
  // Faking window management on a phone is worse than not shipping it.
  const showDocument = currentContent != null && (isRoot || compact || !hasWindows);

  return (
    <div
      // The layer starts below the menu bar, so a window at y = 0 sits flush
      // against it and zoom fills the desktop rather than the viewport.
      // pointer-events pass through to the desktop between windows.
      className="pointer-events-none fixed inset-x-0 bottom-0"
      style={{ top: MENUBAR_HEIGHT, zIndex: "var(--z-window-base)" }}
    >
      {showDocument && (
        <div
          className="pointer-events-auto absolute inset-0 overflow-y-auto"
          style={{ paddingBottom: 96 }}
        >
          {currentContent}
        </div>
      )}

      <AnimatePresence>
        {(compact ? [] : visible).map((w) => (
          <Window key={w.id} window={w}>
            {contentByRoute.get(w.route) ?? null}
          </Window>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default WindowManager;
