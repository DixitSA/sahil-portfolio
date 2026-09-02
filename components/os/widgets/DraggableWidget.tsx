"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
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
  const constraints = useRef<HTMLDivElement | null>(null);

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

  const persist = useCallback(
    (point: Point) => {
      try {
        localStorage.setItem(key(id), JSON.stringify(point));
      } catch {
        /* not worth failing over */
      }
      listeners.forEach((cb) => cb());
    },
    [id],
  );

  if (reduce) return <div>{children}</div>;

  return (
    <>
      {/* Drag bounds: the whole viewport, minus room for the menu bar and dock. */}
      <div ref={constraints} className="pointer-events-none fixed inset-x-4 top-8 bottom-24" />
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.04}
        dragConstraints={constraints}
        initial={false}
        style={{ x: start.x, y: start.y, cursor: "grab" }}
        whileDrag={{ cursor: "grabbing", scale: 1.015 }}
        onDragEnd={(_, info) =>
          persist({ x: start.x + info.offset.x, y: start.y + info.offset.y })
        }
      >
        {children}
      </motion.div>
    </>
  );
}
