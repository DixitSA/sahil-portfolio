"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * True below the 768px breakpoint, where DESIGN.md drops the desktop
 * metaphor entirely: draggable windows are unusable on a phone and a dock
 * nobody can hover is not worth shipping.
 *
 * useSyncExternalStore rather than an effect, so there is no setState during
 * mount and the server snapshot is explicit. The server always assumes the
 * desktop layout; a phone corrects itself on hydration.
 */
export function useIsCompact() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default useIsCompact;
