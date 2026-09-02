"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

/**
 * Right-click the desktop to change the wallpaper, the way you would on a Mac.
 *
 * Five presets. The choice persists per visitor in localStorage, wrapped in
 * try/catch because private windows and blocked site data both throw on
 * access, and a wallpaper is not worth a crash.
 */

export interface Wallpaper {
  id: string;
  name: string;
  css: string;
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: "dusk",
    name: "Dusk",
    css: `radial-gradient(1100px 780px at 16% 10%, #1e2f6b 0%, transparent 62%),
          radial-gradient(980px 860px at 84% 20%, #5b2a72 0%, transparent 60%),
          radial-gradient(1300px 900px at 62% 96%, #86304f 0%, transparent 60%),
          radial-gradient(700px 600px at 96% 78%, #1d4f6b 0%, transparent 62%),
          linear-gradient(160deg, #0b1024 0%, #130b20 46%, #1a0f1d 100%)`,
  },
  {
    id: "monsoon",
    name: "Monsoon",
    css: `radial-gradient(1200px 800px at 20% 15%, #0f4c5c 0%, transparent 62%),
          radial-gradient(1000px 900px at 80% 30%, #14708a 0%, transparent 60%),
          radial-gradient(1200px 800px at 55% 95%, #1b3a4b 0%, transparent 62%),
          linear-gradient(165deg, #05141a 0%, #08202b 50%, #0a2a33 100%)`,
  },
  {
    id: "saffron",
    name: "Saffron",
    css: `radial-gradient(1100px 760px at 18% 12%, #7a2f12 0%, transparent 60%),
          radial-gradient(1000px 880px at 82% 26%, #b4551b 0%, transparent 58%),
          radial-gradient(1200px 860px at 60% 96%, #5e1f2e 0%, transparent 62%),
          linear-gradient(160deg, #1a0c07 0%, #24110c 48%, #2a1010 100%)`,
  },
  {
    id: "ink",
    name: "Ink",
    css: `radial-gradient(900px 700px at 22% 18%, #1c1c22 0%, transparent 62%),
          radial-gradient(1100px 900px at 78% 34%, #24242c 0%, transparent 60%),
          radial-gradient(1200px 800px at 50% 98%, #101014 0%, transparent 60%),
          linear-gradient(160deg, #0a0a0d 0%, #101015 55%, #08080b 100%)`,
  },
  {
    id: "afterhours",
    name: "After Hours",
    css: `radial-gradient(1000px 760px at 14% 14%, #3d1360 0%, transparent 60%),
          radial-gradient(1100px 900px at 86% 24%, #8a1d5a 0%, transparent 58%),
          radial-gradient(1200px 900px at 58% 98%, #12206b 0%, transparent 62%),
          linear-gradient(160deg, #0a0616 0%, #140a20 50%, #100a1c 100%)`,
  },
];

const KEY = "wallpaper";

/**
 * localStorage as an external store.
 *
 * Reading it in an effect and copying it into state means a setState during
 * mount, which cascades a render. useSyncExternalStore reads it directly and
 * declares the server snapshot, so SSR always renders the default and the
 * client corrects on hydration.
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  // `storage` fires for other tabs; local writes notify through `emit`.
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function emit() {
  listeners.forEach((cb) => cb());
}

function getSnapshot() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved && WALLPAPERS.some((w) => w.id === saved) ? saved : WALLPAPERS[0].id;
  } catch {
    // Private window or blocked site data. A wallpaper is not worth throwing.
    return WALLPAPERS[0].id;
  }
}

const getServerSnapshot = () => WALLPAPERS[0].id;

export function useWallpaper() {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = useCallback((next: string) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* not worth failing over */
    }
    emit();
  }, []);

  const wallpaper = WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
  return { wallpaper, choose };
}

export default function WallpaperMenu({
  at,
  currentId,
  onChoose,
  onClose,
}: {
  at: { x: number; y: number };
  currentId: string;
  onChoose: (id: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const dismiss = () => onClose();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="menu"
      aria-label="Change wallpaper"
      className="fixed overflow-hidden py-1"
      style={{
        left: Math.min(at.x, typeof window === "undefined" ? at.x : window.innerWidth - 200),
        top: at.y,
        minWidth: 184,
        zIndex: "var(--z-menu-dropdown)",
        background: "var(--color-chrome-window)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid var(--color-chrome-border-focused)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-window)",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <p
        className="px-3 py-1.5 uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "var(--color-ink-faint)",
        }}
      >
        Wallpaper
      </p>

      {WALLPAPERS.map((w) => (
        <button
          key={w.id}
          type="button"
          role="menuitemradio"
          aria-checked={w.id === currentId}
          onClick={() => {
            onChoose(w.id);
            onClose();
          }}
          className="flex w-full items-center gap-3 px-3 py-1.5 text-left"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-ink)",
            background: w.id === currentId ? "var(--color-selection)" : "transparent",
          }}
        >
          <span
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
            style={{ backgroundImage: w.css, backgroundSize: "cover", borderRadius: 3 }}
          />
          {w.name}
        </button>
      ))}
    </div>
  );
}
