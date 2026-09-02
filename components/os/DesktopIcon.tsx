"use client";

import type { Ref } from "react";
import type { FSNode } from "@/content/types";
import MacIcon, { type MacIconName } from "./MacIcon";

/* ═══════════════════════════════════════════════════════════════════
   Desktop icon. 72px glyph box, caption label below.

   Single click selects. Double click opens. On coarse pointers a
   single tap opens, because double-tap is not a phone gesture.
   Icons are macOS-language shapes drawn in MacIcon.tsx, not Apple
   artwork: folders with a tab, documents with a folded corner.
   ═══════════════════════════════════════════════════════════════════ */

export function glyphFor(node: FSNode): MacIconName {
  if (node.kind === "folder") return "folder";
  const name = node.name.toLowerCase();
  if (name.endsWith(".app")) return "grid";
  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".md") || name.endsWith(".txt")) return "document";
  if (node.kind === "file") return "document";
  return "document";
}

export interface DesktopIconProps {
  node: FSNode;
  selected: boolean;
  /** Roving tabindex. Exactly one icon in the column carries 0. */
  tabIndex?: number;
  onSelect: () => void;
  onOpen: () => void;
  ref?: Ref<HTMLButtonElement>;
}

export default function DesktopIcon({
  node,
  selected,
  tabIndex = -1,
  onSelect,
  onOpen,
  ref,
}: DesktopIconProps) {
  const coarse = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    <button
      ref={ref}
      type="button"
      data-desktop-icon="true"
      tabIndex={tabIndex}
      aria-label={`${node.name}${selected ? ", selected" : ""}`}
      aria-current={selected ? "true" : undefined}
      onClick={() => {
        onSelect();
        if (coarse()) onOpen();
      }}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          // Fires before click, so this also suppresses the select.
          event.preventDefault();
          onSelect();
          onOpen();
        }
      }}
      className="flex w-24 flex-col items-center gap-1"
    >
      <span
        className="flex h-[72px] w-[72px] items-center justify-center"
        style={{
          backgroundColor: selected ? "var(--color-selection)" : "transparent",
          border: selected
            ? "1px solid var(--color-selection-border)"
            : "1px solid transparent",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <MacIcon name={glyphFor(node)} size={46} />
      </span>

      <span
        className="max-w-full px-1 font-mono text-[10px] leading-[1.4] tracking-[0.14em] break-words uppercase"
        style={{
          color: "#ffffff",
          backgroundColor: selected ? "var(--color-selection)" : "transparent",
          borderRadius: "var(--radius-xs)",
          // Labels sit directly on the wallpaper, which is bright in places.
          textShadow: "0 1px 3px rgba(0,0,0,0.85)",
        }}
      >
        {node.name}
      </span>
    </button>
  );
}
