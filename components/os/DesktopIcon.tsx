"use client";

import type { Ref } from "react";
import type { FSNode } from "@/content/types";
import { Glyph, type GlyphName } from "./Dock";

/* ═══════════════════════════════════════════════════════════════════
   Desktop icon. 72px glyph box, caption label below.

   Single click selects. Double click opens. On coarse pointers a
   single tap opens, because double-tap is not a phone gesture.
   Glyphs are 1px-stroke SVG in ink-muted. No Apple icon replicas.
   ═══════════════════════════════════════════════════════════════════ */

export function glyphFor(node: FSNode): GlyphName {
  if (node.kind === "folder") return "folder";
  const name = node.name.toLowerCase();
  if (name.endsWith(".app")) return "app";
  if (name.endsWith(".pdf") || name.endsWith(".md") || name.endsWith(".txt")) return "doc";
  if (node.kind === "file") return "doc";
  return "window";
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
          color: "var(--color-ink-muted)",
          backgroundColor: selected ? "var(--color-selection)" : "transparent",
          border: selected
            ? "1px solid var(--color-selection-border)"
            : "1px solid transparent",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <Glyph name={glyphFor(node)} size={34} />
      </span>

      <span
        className="max-w-full px-1 font-mono text-[10px] leading-[1.4] tracking-[0.14em] break-words uppercase"
        style={{
          color: selected ? "var(--color-ink)" : "var(--color-ink-muted)",
          backgroundColor: selected ? "var(--color-selection)" : "transparent",
          borderRadius: "var(--radius-xs)",
        }}
      >
        {node.name}
      </span>
    </button>
  );
}
