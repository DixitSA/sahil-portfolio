import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Sahil Dixit: Strategy, fraud and AI governance at Bank of America. Shipped Vazaar and Kaal.";

/** Share card. Default font only: a webfont would add a network dependency to the build. */
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
          background: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(61,255,127,0.18), transparent 55%), radial-gradient(circle at 5% 100%, rgba(61,255,127,0.07), transparent 45%)",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#f2f2f0" }}>
            Sahil Dixit
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#a6a6ab",
              fontSize: 22,
            }}
          >
            <div style={{ display: "flex", color: "#3dff7f" }}>●</div>
            <div style={{ display: "flex" }}>Open to new roles</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            color: "#f2f2f0",
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          Most AI programs die between what a model can do and what an institution can defend.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 24, color: "#a6a6ab" }}>
              Strategy · Fraud · AI governance — Bank of America
            </div>
            <div style={{ display: "flex", fontSize: 18, color: "#7c7c83", marginTop: 8 }}>
              {SITE_HOST}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#7c7c83" }}>
            Shipped: Vazaar · Kaal
          </div>
        </div>
      </div>
    ),
    size,
  );
}
