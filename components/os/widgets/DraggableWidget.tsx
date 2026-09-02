"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Makes a widget draggable and remembers where it was left.
 *
 * macOS widgets rearrange, so these do too. Position is per visitor and per
 * widget, held in localStorage and read through useSyncExternalStore so there
 * is no setState during mount and the server snapshot is explicit.
 *
 * Drag has no momentum, matching the window rule: things stop where they are
 * released. Under reduced motion dragging is disabled entirely rather than
 * animated differently, since the whole interaction is movement.
 */

interface Point {
  x: number;
  y: number;
}

const listeners = new Set<() => void>();
const key = (id: string) => `widget-pos:${id}`;

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function read(id: string): Point {
  try {
    const raw = localStorage.getItem(key(id));
    if (!raw) return { x: 0, y: 0 };
    const parsed = JSON.parse(raw) as Point;
    return typeof parsed?.x === "number" && typeof parsed?.y === "number"
      ? parsed
      : { x: 0, y: 0 };
  } catch {
    // Private window, blocked storage, or malformed JSON. Fall back to origin.
    return { x: 0, y: 0 };
  }
}

/** Cached so getSnapshot returns a stable reference between renders. */
const cache = new Map<string, string>();

function snapshotFor(id: string) {
  try {
    return localStorage.getItem(key(id)) ?? "";
  } catch {
    return "";
  }
}

export default function DraggableWidget({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  const raw = useSyncExternalStore(
    subscribe,
    useCallback(() => {
      const next = snapshotFor(id);
      if (cache.get(id) !== next) cache.set(id, next);
      return cache.get(id) ?? "";
    }, [id]),
    () => "",
  );

  const start: Point = raw ? read(id) : { x: 0, y: 0 };

  /**
   * Clamp before storing rather than constraining while dragging.
   *
   * `dragConstraints` used to point at a `fixed` sibling element. framer
   * measured that box against a widget living in an absolutely positioned
   * column and "corrected" the widget into it on mount, applying a bogus
   * transform of roughly (502, 140). In development the offset was absorbed;
   * in the production build it centred both widgets and stacked them on top
   * of each other, so Now was completely hidden behind Watching.
   *
   * Nothing constrains the drag now. Widgets still cannot be lost, because
   * the position is clamped to the viewport at the moment it is saved.
   */
  const persist = useCallback(
    (point: Point) => {
      const maxX = Math.max(0, window.innerWidth - 260);
      const maxY = Math.max(0, window.innerHeight - 200);
      const safe: Point = {
        x: Math.min(Math.max(point.x, -8), maxX),
        y: Math.min(Math.max(point.y, -8), maxY),
      };
      try {
        localStorage.setItem(key(id), JSON.stringify(safe));
      } catch {
        /* not worth failing over */
      }
      listeners.forEach((cb) => cb());
    },
    [id],
  );

  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.04}
      initial={false}
      style={{ x: start.x, y: start.y, cursor: "grab" }}
      whileDrag={{ cursor: "grabbing", scale: 1.015 }}
      onDragEnd={(_, info) =>
        persist({ x: start.x + info.offset.x, y: start.y + info.offset.y })
      }
    >
      {children}
    </motion.div>
  );
}
