"use client";

import { useState } from "react";

/**
 * Live Kaal widget.
 *
 * Runs a real chart against the production Kaal engine and shows what it
 * computes. Not a screenshot of a product: the product, running, on the
 * portfolio. That is the point, and it is the one claim a recruiter cannot
 * make about anyone else's site.
 *
 * The interpretation stays on getkaal.com behind sign-in, which is correct:
 * the computation is the proof, the reading is the product. So this ends in a
 * link rather than trying to reimplement what Kaal sells.
 *
 * It ships with a sample chart already answered, because a widget that
 * demands input before showing anything is a widget most visitors skip.
 */

interface Chart {
  lagnaSign?: string;
  moonSign?: string;
  moonNakshatra?: string;
  moonNakshatraPada?: number;
  sunSignSidereal?: string;
  ayanamsha?: string;
  birthTimeMode?: string;
}

interface Place {
  displayName: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const SAMPLE = {
  date: "1999-01-01",
  time: "12:00",
  place: "Ahmedabad, Gujarat, India",
  latitude: 23.02579,
  longitude: 72.58727,
  timezone: "Asia/Kolkata",
};

const SAMPLE_CHART: Chart = {
  lagnaSign: "Virgo",
  moonSign: "Gemini",
  moonNakshatra: "Mrigashira",
  moonNakshatraPada: 4,
  sunSignSidereal: "Sagittarius",
  ayanamsha: "lahiri",
};

export default function KaalWidget() {
  const [date, setDate] = useState(SAMPLE.date);
  const [time, setTime] = useState(SAMPLE.time);
  const [place, setPlace] = useState(SAMPLE.place);
  const [chart, setChart] = useState<Chart | null>(SAMPLE_CHART);
  const [resolved, setResolved] = useState<string>(SAMPLE.place);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      // 1. Place to coordinates and timezone.
      const locRes = await fetch("/api/kaal/location/lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: place }),
      });
      const loc = await locRes.json();
      const hit: Place | undefined = loc?.data?.results?.[0];
      if (!hit) {
        setError("Could not find that place. Try a city name.");
        return;
      }

      // 2. Coordinates to chart.
      const chartRes = await fetch("/api/kaal/chart/compute", {
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
      const out = await chartRes.json();
      if (!out?.ok) {
        setError(out?.error?.message ?? "Kaal could not compute that chart.");
        return;
      }

      setChart(out.data.chart as Chart);
      setResolved(hit.displayName);
    } catch {
      setError("Could not reach Kaal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Widget title="Kaal" subtitle="Live chart engine">
      <form onSubmit={run} className="mb-3 grid grid-cols-2 gap-2">
        <Field label="Born" value={date} onChange={setDate} type="date" />
        <Field label="Time" value={time} onChange={setTime} type="time" />
        <div className="col-span-2">
          <Field label="Place" value={place} onChange={setPlace} type="text" />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="col-span-2 py-1.5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 500,
            color: "#fff",
            background: busy
              ? "rgba(255,255,255,0.12)"
              : "linear-gradient(160deg, #5c9bff 0%, #2258d8 100%)",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          {busy ? "Computing…" : "Compute chart"}
        </button>
      </form>

      {error && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#ff9d94" }}>{error}</p>
      )}

      {chart && !error && (
        <dl className="space-y-1.5">
          <Line k="Moon" v={`${chart.moonSign ?? "—"}`} />
          <Line
            k="Nakshatra"
            v={
              chart.moonNakshatra
                ? `${chart.moonNakshatra}${chart.moonNakshatraPada ? ` · pada ${chart.moonNakshatraPada}` : ""}`
                : "—"
            }
          />
          <Line k="Lagna" v={chart.lagnaSign ?? "—"} />
          <Line k="Sun" v={chart.sunSignSidereal ?? "—"} />
        </dl>
      )}

      <p
        className="mt-3 truncate"
        style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-faint)" }}
        title={resolved}
      >
        {resolved}
      </p>

      <a
        href="https://getkaal.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block underline-offset-4 hover:underline"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--link-accent)",
        }}
      >
        Full reading on getkaal.com
      </a>

      <p
        className="mt-2"
        style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--color-ink-faint)" }}
      >
        Birth details are sent to the Kaal API to compute the chart. Nothing is stored here.
      </p>
    </Widget>
  );
}

/* ── bits ─────────────────────────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <label className="block">
      <span
        className="mb-1 block uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.14em",
          color: "var(--color-ink-faint)",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--color-ink)",
          background: "rgba(0,0,0,0.28)",
          border: "1px solid var(--color-group-border)",
          borderRadius: 5,
        }}
      />
    </label>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt
        style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-ink-faint)" }}
      >
        {k}
      </dt>
      <dd
        style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-ink)" }}
      >
        {v}
      </dd>
    </div>
  );
}

export function Widget({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="w-[228px] p-3.5"
      style={{
        background: "var(--color-chrome-window)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        boxShadow: "var(--shadow-dock)",
      }}
    >
      <header className="mb-2.5">
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-ink)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.14em",
              color: "var(--color-ink-faint)",
            }}
          >
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}
