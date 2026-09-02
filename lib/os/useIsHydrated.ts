"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR and on the very first client render, true afterwards.
 *
 * The window layer only exists once React is running, so the server has to
 * emit the route body as a plain document or the page ships empty. After
 * hydration the windows own it, and leaving the document layer mounted meant
 * it covered the desktop and swallowed every click.
 *
 * useSyncExternalStore rather than an effect: the server snapshot is explicit
 * and there is no setState during mount.
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export default useIsHydrated;
