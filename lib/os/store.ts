"use client";

import { create } from "zustand";

/**
 * Window manager state.
 *
 * Routes are the source of truth. This store is a projection of the URL,
 * never the other way around. WindowManager syncs pathname -> store on
 * navigation; chrome components call open()/close() which push routes.
 */

export const Z_BASE = 100;
export const Z_CEILING = 899;

export interface WindowState {
  /** Stable id, equal to the window's route. */
  id: string;
  title: string;
  route: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  zoomed: boolean;
  /** Geometry before zoom, restored on unzoom. */
  restore?: { x: number; y: number; w: number; h: number };
}

export interface OpenWindowInput {
  id: string;
  title: string;
  route: string;
  w?: number;
  h?: number;
}

interface OSStore {
  windows: WindowState[];
  focusedId: string | null;
  counter: number;
  spotlightOpen: boolean;
  /** Desktop icon selection, by route. */
  selectedIcon: string | null;

  open: (input: OpenWindowInput) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string) => void;
  toggleZoom: (id: string, bounds: { w: number; h: number }) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  closeAll: () => void;

  setSpotlight: (open: boolean) => void;
  selectIcon: (route: string | null) => void;
}

const MIN_W = 480;
const MIN_H = 320;

/** Cascade new windows so they do not stack exactly on top of each other. */
function cascade(count: number) {
  const step = 28;
  const cycle = count % 6;
  return { x: 120 + cycle * step, y: 80 + cycle * step };
}

/**
 * Keep z-indices bounded. When the counter would exceed the ceiling,
 * renormalize the whole stack back down preserving order.
 */
function renormalize(windows: WindowState[]): { windows: WindowState[]; counter: number } {
  const ordered = [...windows].sort((a, b) => a.z - b.z);
  const next = ordered.map((w, i) => ({ ...w, z: Z_BASE + i }));
  return { windows: next, counter: Z_BASE + next.length };
}

export const useOS = create<OSStore>((set) => ({
  windows: [],
  focusedId: null,
  counter: Z_BASE,
  spotlightOpen: false,
  selectedIcon: null,

  open: (input) =>
    set((s) => {
      const existing = s.windows.find((w) => w.id === input.id);
      const counter = s.counter + 1;

      // Already open: focus and unminimize rather than duplicating.
      if (existing) {
        const windows = s.windows.map((w) =>
          w.id === input.id ? { ...w, z: counter, minimized: false } : w,
        );
        const norm = counter > Z_CEILING ? renormalize(windows) : { windows, counter };
        return { ...norm, focusedId: input.id };
      }

      const pos = cascade(s.windows.length);
      const win: WindowState = {
        id: input.id,
        title: input.title,
        route: input.route,
        x: pos.x,
        y: pos.y,
        w: Math.max(input.w ?? 720, MIN_W),
        h: Math.max(input.h ?? 480, MIN_H),
        z: counter,
        minimized: false,
        zoomed: false,
      };
      const windows = [...s.windows, win];
      const norm = counter > Z_CEILING ? renormalize(windows) : { windows, counter };
      return { ...norm, focusedId: win.id };
    }),

  close: (id) =>
    set((s) => {
      const windows = s.windows.filter((w) => w.id !== id);
      const focusedId =
        s.focusedId === id
          ? windows.reduce<WindowState | null>(
              (top, w) => (!w.minimized && (!top || w.z > top.z) ? w : top),
              null,
            )?.id ?? null
          : s.focusedId;
      return { windows, focusedId };
    }),

  focus: (id) =>
    set((s) => {
      if (s.focusedId === id) return s;
      const counter = s.counter + 1;
      const windows = s.windows.map((w) => (w.id === id ? { ...w, z: counter } : w));
      const norm = counter > Z_CEILING ? renormalize(windows) : { windows, counter };
      return { ...norm, focusedId: id };
    }),

  minimize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      focusedId: s.focusedId === id ? null : s.focusedId,
    })),

  restore: (id) =>
    set((s) => {
      const counter = s.counter + 1;
      const windows = s.windows.map((w) =>
        w.id === id ? { ...w, minimized: false, z: counter } : w,
      );
      const norm = counter > Z_CEILING ? renormalize(windows) : { windows, counter };
      return { ...norm, focusedId: id };
    }),

  toggleZoom: (id, bounds) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.zoomed && w.restore) {
          return { ...w, ...w.restore, zoomed: false, restore: undefined };
        }
        return {
          ...w,
          restore: { x: w.x, y: w.y, w: w.w, h: w.h },
          x: 0,
          y: 0,
          w: bounds.w,
          h: bounds.h,
          zoomed: true,
        };
      }),
    })),

  move: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),

  resize: (id, w, h) =>
    set((s) => ({
      windows: s.windows.map((win) =>
        win.id === id ? { ...win, w: Math.max(w, MIN_W), h: Math.max(h, MIN_H) } : win,
      ),
    })),

  closeAll: () => set({ windows: [], focusedId: null }),

  setSpotlight: (open) => set({ spotlightOpen: open }),
  selectIcon: (route) => set({ selectedIcon: route }),
}));
