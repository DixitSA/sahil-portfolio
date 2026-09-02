"use client";

import { useId } from "react";

/**
 * macOS-language icons, drawn here rather than taken from Apple.
 *
 * Apple's icon artwork and marks are copyrighted and trademarked, and SF
 * Symbols are licensed for Apple platforms only, so none of it can ship on a
 * public site. What actually reads as macOS is the shape language, not the
 * specific artwork: squircle tiles, a top-down gradient, a bright inner top
 * edge, folders with a tab, documents with a folded corner. That is all
 * reproducible from scratch.
 *
 * These are filled and tinted, which is a deliberate exception to the 1px
 * monochrome icon rule. It is scoped to OS chrome; content icons elsewhere on
 * the site still follow the stroke rule. See DESIGN.md > Wallpaper and chrome
 * finish.
 */

export type MacIconName =
  | "folder"
  | "document"
  | "pdf"
  | "person"
  | "timeline"
  | "mail"
  | "terminal"
  | "kaal"
  | "grid";

/** Per-icon gradient stops. Cool blues for containers, warm for time. */
const RAMP: Record<MacIconName, [string, string]> = {
  folder: ["#6cc0f5", "#2f7fd1"],
  document: ["#fdfdfe", "#cdd2da"],
  pdf: ["#fdfdfe", "#cdd2da"],
  person: ["#5c9bff", "#2258d8"],
  timeline: ["#ffc056", "#e8802b"],
  mail: ["#5fb8ff", "#2563eb"],
  terminal: ["#4c4c55", "#1f1f25"],
  // Kaal carries its own brand, not the portfolio's. A cream tile among blue
  // ones reads as a third-party app, which is exactly what it is.
  kaal: ["#f7f3ec", "#e2d8c6"],
  grid: ["#8fb8ff", "#3f6fd8"],
};

export default function MacIcon({
  name,
  size = 44,
}: {
  name: MacIconName;
  size?: number;
}) {
  /**
   * Unique per instance. Gradient ids used to be `mi-${name}`, so an icon
   * rendered in two places emitted duplicate ids. References resolve to the
   * first match in the document, and the desktop copy is display:none on a
   * phone, where a gradient does not paint. The visible icon then pointed at a
   * dead gradient and lost every gradient-filled shape, which looked like the
   * icon had been clipped.
   */
  const id = useId();
  const [from, to] = RAMP[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        {/* The bright top edge is what sells depth on a macOS icon. */}
        <linearGradient id={`${id}-hi`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {name === "folder" && (
        <>
          {/* Back panel with the tab */}
          <path
            d="M5 14a3 3 0 0 1 3-3h11l4 4h16a3 3 0 0 1 3 3v3H5z"
            fill={to}
          />
          {/* Front panel */}
          <rect x="5" y="17" width="38" height="23" rx="3.5" fill={`url(#${id}-g)`} />
          <rect x="5" y="17" width="38" height="23" rx="3.5" fill={`url(#${id}-hi)`} />
        </>
      )}

      {(name === "document" || name === "pdf") && (
        <>
          <path
            d="M11 7a3 3 0 0 1 3-3h14l9 9v28a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3z"
            fill={`url(#${id}-g)`}
          />
          {/* Folded corner */}
          <path d="M28 4l9 9h-6a3 3 0 0 1-3-3z" fill="#9aa2ad" />
          {name === "pdf" ? (
            <text
              x="24"
              y="34"
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="#c0392b"
            >
              PDF
            </text>
          ) : (
            <>
              <rect x="17" y="22" width="14" height="1.8" rx="0.9" fill="#9aa2ad" />
              <rect x="17" y="27" width="14" height="1.8" rx="0.9" fill="#9aa2ad" />
              <rect x="17" y="32" width="9" height="1.8" rx="0.9" fill="#9aa2ad" />
            </>
          )}
        </>
      )}

      {name !== "folder" && name !== "document" && name !== "pdf" && (
        <>
          {/* Squircle app tile. 24% of 48 is the macOS corner ratio. */}
          <rect x="4" y="4" width="40" height="40" rx="11.5" fill={`url(#${id}-g)`} />
          <rect x="4" y="4" width="40" height="40" rx="11.5" fill={`url(#${id}-hi)`} />
          <g
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            {name === "person" && (
              <>
                <circle cx="24" cy="20" r="5" />
                <path d="M15 35c0-4.6 4-7.2 9-7.2s9 2.6 9 7.2" />
              </>
            )}
            {name === "timeline" && (
              <>
                <path d="M17 14v20" />
                <path d="M22 19h10" />
                <path d="M22 29h6" />
                <circle cx="17" cy="19" r="1.6" fill="#ffffff" />
                <circle cx="17" cy="29" r="1.6" fill="#ffffff" />
              </>
            )}
            {name === "mail" && (
              <>
                <rect x="12" y="16" width="24" height="17" rx="2.5" fill="#ffffff" stroke="none" />
                <path
                  d="M12.8 17.6 24 26.4l11.2-8.8"
                  stroke="#2563eb"
                  strokeWidth="2.1"
                  fill="none"
                />
              </>
            )}
            {name === "terminal" && (
              <>
                <path d="M16 19l5 5-5 5" />
                <path d="M25 30h8" />
              </>
            )}
            {name === "kaal" && (
              <g stroke="#b5563e" strokeWidth="1.6">
                <rect x="13" y="13" width="22" height="22" />
                <path d="M24 13 35 24 24 35 13 24Z" />
                <path d="M13 13 35 35M35 13 13 35" />
              </g>
            )}
            {name === "grid" && (
              <>
                <rect x="14" y="14" width="8" height="8" rx="1.6" />
                <rect x="26" y="14" width="8" height="8" rx="1.6" />
                <rect x="14" y="26" width="8" height="8" rx="1.6" />
                <rect x="26" y="26" width="8" height="8" rx="1.6" />
              </>
            )}
          </g>
        </>
      )}
    </svg>
  );
}
