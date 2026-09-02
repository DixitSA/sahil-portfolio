"use client";

import { useState } from "react";

/**
 * Kaal, running as an application inside the desktop.
 *
 * Rendered in the product's own identity rather than the portfolio's: warm
 * cream ground, Playfair Display, Quattrocento Sans, rust accent. Values
 * sampled from getkaal.com. Two applications on a Mac do not look alike, and
 * the point of shipping this as an app rather than a widget is that a visitor
 * can tell they have opened someone else's software.
 *
 * The chart is computed by the real production engine through the server
 * proxy. The interpretation stays behind sign-in on getkaal.com, which is the
 * correct boundary: the computation is the proof, the reading is the product.
 */

const K = {
  ground: "#f5f0e8",
  ink: "#2c2418",
  muted: "#7a7469",
  faint: "#9c9488",
  rule: "rgba(140, 134, 122, 0.35)",
  accent: "#b5563e",
  accentDeep: "#8b3620",
  green: "#5e7a5e",
  tint: "rgba(184, 168, 120, 0.14)",
  serif: "var(--font-kaal-serif), 'Times New Roman', serif",
  sans: "var(--font-kaal-sans), system-ui, sans-serif",
};

interface Chart {
  lagnaSign?: string;
  lagnaDegree?: number;
  moonSign?: string;
  moonNakshatra?: string;
  moonNakshatraPada?: number;
  sunSignSidereal?: string;
  ayanamsha?: string;
  birthTimeMode?: string;
}

const SAMPLE_CHART: Chart = {
  lagnaSign: "Virgo",
  moonSign: "Gemini",
  moonNakshatra: "Mrigashira",
  moonNakshatraPada: 4,
  sunSignSidereal: "Sagittarius",
  ayanamsha: "lahiri",
};

export default function KaalApp() {
  const [date, setDate] = useState("1999-01-01");
  const [time, setTime] = useState("12:00");
  const [place, setPlace] = useState("Ahmedabad, Gujarat, India");
  const [resolved, setResolved] = useState("Ahmedabad, Gujarat, India");
  const [chart, setChart] = useState<Chart>(SAMPLE_CHART);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function compute(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const locRes = await fetch("/api/kaal/location/lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: place }),
      });
      const loc = await locRes.json();
      const hit = loc?.data?.results?.[0];
      if (!hit) {
        setError("No match for that place. A city name works best.");
        return;
      }

      const res = await fetch("/api/kaal/chart/compute", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          birth: {
            date,
            time,
            latitude: hit.latitude,
            longitude: hit.longitude,
            timezone: hit.timezone,
          },
        }),
      });
      const out = await res.json();
      if (!out?.ok) {
        setError(out?.error?.message ?? "The chart could not be computed.");
        return;
      }
      setChart(out.data.chart as Chart);
      setResolved(hit.displayName);
    } catch {
      setError("Could not reach the engine.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ background: K.ground, color: K.ink, minHeight: "100%" }}>
      <div className="mx-auto w-full max-w-xl px-8 py-10">
        {/* Wordmark */}
        <p
          className="mb-10 uppercase"
          style={{ fontFamily: K.serif, fontSize: 15, letterSpacing: "0.22em", color: K.ink }}
        >
          Kaal
        </p>

        <Label>Your chart</Label>
        <h1
          className="mt-2 mb-1"
          style={{ fontFamily: K.serif, fontSize: 40, lineHeight: 1.1, color: K.ink }}
        >
          {chart.moonSign ?? "—"} moon
        </h1>
        <p
          style={{ fontFamily: K.serif, fontStyle: "italic", fontSize: 19, color: K.muted }}
        >
          {chart.moonNakshatra
            ? `${chart.moonNakshatra}, pada ${chart.moonNakshatraPada ?? "—"}`
            : "computed from a real birth chart"}
        </p>

        <Rule />

        <Label>Placements</Label>
        <dl className="mt-3">
          <Line k="Lagna" v={chart.lagnaSign} />
          <Line k="Moon" v={chart.moonSign} />
          <Line k="Nakshatra" v={chart.moonNakshatra} />
          <Line k="Sun" v={chart.sunSignSidereal} />
          <Line k="Ayanamsha" v={chart.ayanamsha} />
        </dl>

        <p className="mt-3" style={{ fontFamily: K.sans, fontSize: 12, color: K.faint }}>
          {resolved}
        </p>

        <Rule />

        <Label>Compute another</Label>
        <form onSubmit={compute} className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date of birth" type="date" value={date} onChange={setDate} />
            <Field label="Time" type="time" value={time} onChange={setTime} />
          </div>
          <div className="mt-3">
            <Field label="Place" type="text" value={place} onChange={setPlace} />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-4 px-5 py-2"
            style={{
              fontFamily: K.sans,
              fontSize: 13,
              color: K.ground,
              background: busy ? K.faint : K.accent,
              border: "none",
              letterSpacing: "0.02em",
            }}
          >
            {busy ? "Computing" : "Compute"}
          </button>
        </form>

        {error && (
          <p className="mt-3" style={{ fontFamily: K.sans, fontSize: 13, color: K.accentDeep }}>
            {error}
          </p>
        )}

        <Rule />

        <p style={{ fontFamily: K.serif, fontStyle: "italic", fontSize: 17, color: K.muted }}>
          The chart is the easy half. The reading is the product.
        </p>

        <a
          href="https://getkaal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block"
          style={{
            fontFamily: K.sans,
            fontSize: 13,
            color: K.accent,
            borderBottom: `1px solid ${K.accent}`,
            paddingBottom: 1,
          }}
        >
          Open the full reading at getkaal.com
        </a>

        <p
          className="mt-6"
          style={{ fontFamily: K.sans, fontSize: 11, lineHeight: 1.6, color: K.faint }}
        >
          Birth details are sent to the Kaal engine to compute the chart and are not
          stored by this site.
        </p>
      </div>
    </div>
  );
}

/* ── bits, in Kaal's voice ────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase"
      style={{ fontFamily: K.sans, fontSize: 10, letterSpacing: "0.18em", color: K.faint }}
    >
      {children}
    </p>
  );
}

function Rule() {
  return <hr className="my-8" style={{ border: "none", borderTop: `1px solid ${K.rule}` }} />;
}

function Line({ k, v }: { k: string; v?: string | number }) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 py-2"
      style={{ borderBottom: `1px solid ${K.rule}` }}
    >
      <dt
        className="uppercase"
        style={{ fontFamily: K.sans, fontSize: 10, letterSpacing: "0.14em", color: K.accent }}
      >
        {k}
      </dt>
      <dd style={{ fontFamily: K.serif, fontSize: 17, color: K.ink }}>{v ?? "—"}</dd>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span
        className="mb-1 block uppercase"
        style={{ fontFamily: K.sans, fontSize: 10, letterSpacing: "0.14em", color: K.faint }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5"
        style={{
          fontFamily: K.sans,
          fontSize: 13,
          color: K.ink,
          background: K.tint,
          border: `1px solid ${K.rule}`,
        }}
      />
    </label>
  );
}
