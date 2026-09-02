"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion, useDragControls, useMotionValue, useReducedMotion } from "framer-motion";
import { useOS, type WindowState } from "@/lib/os/store";
import { TrafficLights } from "./TrafficLights";

/**
 * A single draggable, resizable window.
 *
 * Chrome only. This component knows nothing about what it holds; the body is
 * whatever `children` the server layout passed down through WindowManager.
 *
 * Rules it enforces, from DESIGN.md:
 *  - No box-shadow. Elevation is a 1px hairline plus a surface step.
 *  - The frame is rounded (rounded.window 10px). The body is not.
 *  - transform and opacity animate. Nothing else does.
 *  - Drag is transform-only with no momentum. Windows stop where released.
 *  - useReducedMotion() gates every scale and every spring.
 */

/** Menu bar height. WindowManager offsets the window layer by this. */
export const MENUBAR_HEIGHT = 28;
/** Title bar height. Also the drag handle height. */
export const TITLEBAR_HEIGHT = 32;
/**
 * Vertical space reserved for the dock at the bottom of the desktop:
 * 64px slab + 12px float off the edge + 12px breathing room. Zoom fills the
 * area between the menu bar and this, not true fullscreen.
 */
export const DOCK_RESERVE = 88;
/** Floors from spacing.window-min-w / spacing.window-min-h. */
export const MIN_W = 480;
export const MIN_H = 320;
/** Invisible resize hit area on every edge and corner, spacing.resize-handle. */
const HANDLE = 8;
/** How much of a window must stay on screen horizontally while dragging. */
const KEEP_VISIBLE = 96;

export interface WindowProps {
  /** The window's row in the OS store. Geometry, z, and focus derive from it. */
  window: WindowState;
  /** Server-rendered body content. */
  children?: ReactNode;
}

type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const HANDLES: { edge: Edge; label: string; cursor: string; style: CSSProperties }[] = [
  {
    edge: "n",
    label: "Resize window from the top edge",
    cursor: "ns-resize",
    style: { top: 0, left: HANDLE, right: HANDLE, height: HANDLE },
  },
  {
    edge: "s",
    label: "Resize window from the bottom edge",
    cursor: "ns-resize",
    style: { bottom: 0, left: HANDLE, right: HANDLE, height: HANDLE },
  },
  {
    edge: "w",
    label: "Resize window from the left edge",
    cursor: "ew-resize",
    style: { left: 0, top: HANDLE, bottom: HANDLE, width: HANDLE },
  },
  {
    edge: "e",
    label: "Resize window from the right edge",
    cursor: "ew-resize",
    style: { right: 0, top: HANDLE, bottom: HANDLE, width: HANDLE },
  },
  {
    edge: "nw",
    label: "Resize window from the top left corner",
    cursor: "nwse-resize",
    style: { top: 0, left: 0, width: HANDLE, height: HANDLE },
  },
  {
    edge: "se",
    label: "Resize window from the bottom right corner",
    cursor: "nwse-resize",
    style: { bottom: 0, right: 0, width: HANDLE, height: HANDLE },
  },
  {
    edge: "ne",
    label: "Resize window from the top right corner",
    cursor: "nesw-resize",
    style: { top: 0, right: 0, width: HANDLE, height: HANDLE },
  },
  {
    edge: "sw",
    label: "Resize window from the bottom left corner",
    cursor: "nesw-resize",
    style: { bottom: 0, left: 0, width: HANDLE, height: HANDLE },
  },
];

export function Window({ window: win, children }: WindowProps) {
  const focus = useOS((s) => s.focus);
  const close = useOS((s) => s.close);
  const minimize = useOS((s) => s.minimize);
  const toggleZoom = useOS((s) => s.toggleZoom);
  const move = useOS((s) => s.move);
  const resize = useOS((s) => s.resize);
  const focused = useOS((s) => s.focusedId === win.id);
  /** False while the window is playing its exit animation after close(). */
  const live = useOS((s) => s.windows.some((w) => w.id === win.id));

  const reducedMotion = useReducedMotion();
  const dragControls = useDragControls();

  // Position is a transform, never top/left.
  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const frameRef = useRef<HTMLDivElement>(null);

  // A freshly opened window is the accessibility root. Taking DOM focus once,
  // on mount, is what makes Escape and Tab work without a pointer.
  useEffect(() => {
    frameRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const read = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  // Store -> motion values. Skipped mid-drag so the pointer stays authoritative.
  useEffect(() => {
    if (draggingRef.current) return;
    x.set(win.x);
    y.set(win.y);
  }, [win.x, win.y, x, y]);

  /**
   * Drag bounds, in the window layer's coordinate space. The layer already
   * starts below the menu bar, so top: 0 IS the menu bar edge. The title bar
   * can never go above it, below the viewport, or so far sideways that the
   * window becomes unreachable.
   */
  const dragConstraints = useMemo(() => {
    const layerH = Math.max(viewport.h - MENUBAR_HEIGHT, TITLEBAR_HEIGHT);
    return {
      top: 0,
      bottom: Math.max(layerH - TITLEBAR_HEIGHT, 0),
      left: Math.min(-(win.w - KEEP_VISIBLE), 0),
      right: Math.max(viewport.w - KEEP_VISIBLE, 0),
    };
  }, [viewport, win.w]);

  const raise = useCallback(() => {
    if (live) focus(win.id);
  }, [live, focus, win.id]);

  const handleZoom = useCallback(() => {
    toggleZoom(win.id, {
      w: window.innerWidth,
      h: Math.max(window.innerHeight - MENUBAR_HEIGHT - DOCK_RESERVE, MIN_H),
    });
  }, [toggleZoom, win.id]);

  const startDrag = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (win.zoomed) return;
      dragControls.start(e);
    },
    [dragControls, win.zoomed],
  );

  /**
   * Pointer-driven resize. Geometry commits to the store on every move so the
   * store stays the single source of truth. Width and height are plain layout
   * values and are never transitioned.
   */
  const startResize = useCallback(
    (edge: Edge) => (e: ReactPointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      raise();

      const originX = e.clientX;
      const originY = e.clientY;
      const from = { x: win.x, y: win.y, w: win.w, h: win.h };

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - originX;
        const dy = ev.clientY - originY;
        let nx = from.x;
        let ny = from.y;
        let nw = from.w;
        let nh = from.h;

        if (edge.includes("e")) nw = Math.max(MIN_W, from.w + dx);
        if (edge.includes("s")) nh = Math.max(MIN_H, from.h + dy);
        if (edge.includes("w")) {
          nw = Math.max(MIN_W, from.w - dx);
          nx = from.x + (from.w - nw);
        }
        if (edge.includes("n")) {
          nh = Math.max(MIN_H, from.h - dy);
          ny = from.y + (from.h - nh);
          // Never let the title bar slide under the menu bar.
          if (ny < 0) {
            nh = Math.max(MIN_H, nh + ny);
            ny = 0;
          }
        }

        resize(win.id, nw, nh);
        move(win.id, nx, ny);
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [raise, resize, move, win.id, win.x, win.y, win.w, win.h],
  );

  const restingOpacity = focused ? 1 : 0.92;

  return (
    <motion.div
      ref={frameRef}
      role="dialog"
      aria-label={win.title}
      tabIndex={-1}
      // Capture phase, so a press on a traffic light or a resize handle still
      // raises the window even though those stop propagation.
      onPointerDownCapture={raise}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          close(win.id);
        }
      }}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragConstraints}
      onDragStart={() => {
        draggingRef.current = true;
        setDragging(true);
      }}
      onDragEnd={() => {
        draggingRef.current = false;
        setDragging(false);
        move(win.id, x.get(), y.get());
      }}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      animate={
        reducedMotion ? { opacity: restingOpacity } : { opacity: restingOpacity, scale: 1 }
      }
      exit={
        reducedMotion
          ? { opacity: 0, transition: { duration: 0.16 } }
          : {
              opacity: 0,
              scale: 0.96,
              transition: {
                duration: 0.16,
                ease: [0.4, 0, 1, 1] as [number, number, number, number],
              },
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.16 }
          : { type: "spring", stiffness: 260, damping: 26, mass: 0.9 }
      }
      style={{
        x,
        y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
        position: "absolute",
        top: 0,
        left: 0,
        willChange: "transform, opacity",
      }}
      className={`pointer-events-auto flex flex-col overflow-hidden rounded-window border bg-chrome-window backdrop-blur-[24px] ${
        focused ? "border-chrome-border-focused" : "border-chrome-border"
      }`}
    >
      {/* Title bar. The only drag handle. */}
      <div
        onPointerDown={startDrag}
        style={{
          height: "var(--spacing-titlebar-height)",
          cursor: win.zoomed ? "default" : dragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        className={`relative flex shrink-0 items-center border-b border-hairline pl-2 ${
          focused ? "bg-chrome-titlebar" : "bg-chrome-titlebar-inactive"
        }`}
      >
        <TrafficLights
          focused={focused}
          onClose={() => close(win.id)}
          onMinimize={() => minimize(win.id)}
          onZoom={handleZoom}
        />
        <span
          className={`pointer-events-none absolute inset-x-0 truncate px-24 text-center font-mono text-[12px] ${
            focused ? "text-ink" : "text-ink-subtle"
          }`}
        >
          {win.title}
        </span>
      </div>

      {/* Body. Sharp corners: the frame is round, the content is not. */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-none bg-canvas">{children}</div>

      {/* Resize handles. Invisible, pointer-only, kept out of the tab order. */}
      {!win.zoomed &&
        HANDLES.map((h) => (
          <button
            key={h.edge}
            type="button"
            aria-label={h.label}
            tabIndex={-1}
            onPointerDown={startResize(h.edge)}
            style={{ ...h.style, position: "absolute", cursor: h.cursor, zIndex: 2 }}
          />
        ))}
    </motion.div>
  );
}

export default Window;
