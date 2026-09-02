"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { desktop, projects, roles } from "@/content";
import type { FSNode } from "@/content/types";
import { useOS } from "@/lib/os/store";
import DesktopIcon from "./DesktopIcon";
import WallpaperMenu, { useWallpaper } from "./WallpaperMenu";
import KaalWidget from "./widgets/KaalWidget";
import NowWidget from "./widgets/NowWidget";
import { useOpenWindow, type OpenHandler, type OpenTarget } from "./Dock";

/* ═══════════════════════════════════════════════════════════════════
   Desktop. The wallpaper ground plus the icon column.

   Icons read from the same FSNode tree the Finder window reads, so the
   two can never drift. Right-aligned column at 96px pitch on desktop;
   below 768px the column degrades to a springboard grid, which is the
   better interface on a phone.
   ═══════════════════════════════════════════════════════════════════ */

/** Accepts an FSNode[], a root folder node, or a single node. */
function rootNodes(tree: unknown): FSNode[] {
  if (Array.isArray(tree)) return tree as FSNode[];
  const node = tree as FSNode | null | undefined;
  if (!node) return [];
  if (node.kind === "folder") return node.children;
  return [node];
}

/** Selection key. Routes for windows and folders, href for real files. */
export function iconKey(node: FSNode): string {
  return node.kind === "file" ? node.href : node.route;
}

export function targetFor(node: FSNode): OpenTarget {
  if (node.kind === "file") {
    return { kind: "link", href: node.href, external: node.external };
  }
  return { kind: "window", id: node.route, title: node.name, route: node.route };
}

export interface DesktopProps {
  /** Route-aware activation. Falls back to the window store. */
  onOpen?: OpenHandler;
  /** Windows render above the icon layer. */
  children?: ReactNode;
}

export default function Desktop({ onOpen, children }: DesktopProps) {
  const activate = useOpenWindow(onOpen);
  const selected = useOS((s) => s.selectedIcon);
  const selectIcon = useOS((s) => s.selectIcon);

  const nodes = useMemo(() => rootNodes(desktop), []);

  // Right-click the desktop to change the wallpaper, as you would on a Mac.
  const { wallpaper, choose } = useWallpaper();
  const [menuAt, setMenuAt] = useState<{ x: number; y: number } | null>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = nodes.findIndex((n) => iconKey(n) === selected);
  const rovingIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const move = useCallback(
    (delta: number) => {
      if (!nodes.length) return;
      const next = (rovingIndex + delta + nodes.length) % nodes.length;
      selectIcon(iconKey(nodes[next]));
      refs.current[next]?.focus();
    },
    [nodes, rovingIndex, selectIcon],
  );

  return (
    <>
    <nav aria-label="Site" className="sr-only">
      <ul>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/work">Work</Link></li>
        <li><Link href="/experience">Experience</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`}>{p.name}</Link>
          </li>
        ))}
        {roles.map((r) => (
          <li key={r.id}>
            <Link href={`/experience/${r.id}`}>{r.company}</Link>
          </li>
        ))}
      </ul>
    </nav>

    <div
      aria-label="Desktop"
      className="fixed inset-0"
      onContextMenu={(event) => {
        event.preventDefault();
        setMenuAt({ x: event.clientX, y: event.clientY });
      }}
      style={{
        zIndex: "var(--z-desktop)",
        backgroundColor: "var(--color-desktop)",
        /* A real wallpaper, not a flat fill. The dot grid was dropped here:
           it read as a technical backdrop rather than a desktop. */
        backgroundImage: wallpaper.css,
        backgroundSize: "cover",
      }}
      onPointerDown={(event) => {
        const hitIcon = (event.target as HTMLElement).closest("[data-desktop-icon]");
        if (!hitIcon) selectIcon(null);
      }}
    >
      <ul
        aria-label="Desktop icons"
        className="absolute inset-x-6 top-[52px] grid grid-cols-3 justify-items-center gap-y-2 sm:grid-cols-4 md:inset-x-auto md:right-6 md:grid-cols-1 md:gap-y-0 md:[grid-auto-rows:96px]"
        style={{ zIndex: "var(--z-desktop-icon)" }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          } else if (event.key === "Home") {
            event.preventDefault();
            move(-rovingIndex);
          } else if (event.key === "End") {
            event.preventDefault();
            move(nodes.length - 1 - rovingIndex);
          }
        }}
      >
        {nodes.map((node, i) => {
          const key = iconKey(node);
          return (
            <li key={key} className="flex justify-center">
              <DesktopIcon
                ref={(el) => {
                  refs.current[i] = el;
                }}
                node={node}
                selected={selected === key}
                tabIndex={i === rovingIndex ? 0 : -1}
                onSelect={() => selectIcon(key)}
                onOpen={() => activate(targetFor(node))}
              />
            </li>
          );
        })}
      </ul>

      {/* Widget column, the way Big Sur stacks them. Hidden on narrow
          viewports, where the springboard owns the screen. */}
      <div
        className="pointer-events-auto absolute top-[52px] left-6 hidden flex-col gap-3 lg:flex"
        style={{ zIndex: "var(--z-desktop-icon)" }}
      >
        <KaalWidget />
        <NowWidget />
      </div>

      {children}

      {menuAt && (
        <WallpaperMenu
          at={menuAt}
          currentId={wallpaper.id}
          onChoose={choose}
          onClose={() => setMenuAt(null)}
        />
      )}
    </div>
    </>
  );
}
