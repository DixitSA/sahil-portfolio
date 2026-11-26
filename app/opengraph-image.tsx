import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sahil Dixit: put AI to work, check its work, ship what passes.";

/** Share card. Default font only: a webfont would add a network dependency to the build. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F4F3EF" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 840,
            height: "100%",
            padding: 72,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#161513" }}>
            Sahil Dixit
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 60,
              fontWeight: 750,
              color: "#161513",
              letterSpacing: -2,
              lineHeight: 1.0,
              maxWidth: 680,
            }}
          >
            {["Put AI to work.", "Check its work.", "Ship what passes."].map((l) => (
              <div key={l} style={{ display: "flex" }}>
                {l}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, color: "#3D3B37" }}>
              <div style={{ display: "flex" }}>Slide turnaround from hours to&nbsp;</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>about 15 minutes</div>
                <div style={{ display: "flex", height: 2, background: "#B8360F", marginTop: 2 }} />
                <div style={{ display: "flex", height: 2, background: "#B8360F", marginTop: 4 }} />
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 20, color: "#605D57", marginTop: 20 }}>
              {SITE_HOST}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
            width: 360,
            height: "100%",
            padding: 40,
            background: "#161513",
          }}
        >
          {["Vazaar", "Kaal", "Mixxx MCP"].map((n) => (
            <div key={n} style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#F4F3EF" }}>
              {n}
            </div>
          ))}
          <div style={{ display: "flex", fontSize: 20, color: "#ABA79F", marginTop: 16 }}>
            Open to AI strategy roles
          </div>
        </div>
      </div>
    ),
    size,
  );
}
