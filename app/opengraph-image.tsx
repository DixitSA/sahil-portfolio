import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sahil Dixit — Strategist. Builder.";

/**
 * Share card. Rendered at build time, so it replaces the /og.png that was
 * referenced in metadata but never existed.
 *
 * Deliberately font-agnostic: loading a webfont here would add a network
 * dependency to the build for very little gain at this size.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 72,
        }}
      >
        {/* Menu-bar quotation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8a8a8a",
            letterSpacing: 2,
          }}
        >
          <span>SAHIL_DIXIT.exe</span>
          <span style={{ color: "#00ff41" }}>● AVAILABLE FOR WORK</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, color: "#f0b429", letterSpacing: 6, marginBottom: 20 }}>
            {"// STRATEGY · AI GOVERNANCE · PRODUCT"}
</span>
          <span
            style={{
              fontSize: 104,
              color: "#e8e8e8",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            SAHIL DIXIT
          </span>
          <span style={{ fontSize: 30, color: "#9a9a9a", marginTop: 24, maxWidth: 900 }}>
            Strategy &amp; Management Consultant at Bank of America. AI compliance by day,
            shipped products by night.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid #1e1e1e",
            paddingTop: 24,
            fontSize: 22,
            color: "#6a6a6a",
            letterSpacing: 2,
          }}
        >
          {SITE_HOST}
        </div>
      </div>
    ),
    size,
  );
}
