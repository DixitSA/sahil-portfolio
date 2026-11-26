import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sahil Dixit: startup growth, from the SQL query to the shipped app.";

/** Share card. Default font only: a webfont would add a network dependency to the build. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#E7EDE1" }}>
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
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#18201A" }}>
            Sahil Dixit
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              color: "#18201A",
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 680,
            }}
          >
            Startup growth, from the SQL query to the shipped app.
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, color: "#3B4A3E" }}>
              <div style={{ display: "flex" }}>Kaal: live on web and iOS,&nbsp;</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>277 commits</div>
                <div style={{ display: "flex", height: 2, background: "#B23A0B", marginTop: 2 }} />
                <div style={{ display: "flex", height: 2, background: "#B23A0B", marginTop: 4 }} />
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 20, color: "#56655A", marginTop: 20 }}>
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
            background: "#1E4A34",
          }}
        >
          {["Vazaar", "Kaal", "Mixxx MCP"].map((n) => (
            <div key={n} style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#EEF3EA" }}>
              {n}
            </div>
          ))}
          <div style={{ display: "flex", fontSize: 20, color: "#B8CCBB", marginTop: 16 }}>
            Open to technical growth roles
          </div>
        </div>
      </div>
    ),
    size,
  );
}
