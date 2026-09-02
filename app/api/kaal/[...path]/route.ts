import { NextResponse } from "next/server";

/**
 * Thin proxy to the Kaal API.
 *
 * The widget could call getkaal.com directly, but going through the server
 * buys three things: no dependence on Kaal's CORS policy, one place to cap
 * abuse so a portfolio visitor cannot hammer a production service, and no
 * third-party origin appearing in the visitor's network tab.
 *
 * Only two paths are forwarded. Everything else 404s, so this cannot be used
 * as an open relay to the rest of the API, including the authenticated
 * decision endpoint.
 */

const UPSTREAM = "https://getkaal.com";

/** Explicit allowlist. Both of these are public, unauthenticated endpoints. */
const ALLOWED = new Set(["location/lookup", "chart/compute"]);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const route = path.join("/");

  if (!ALLOWED.has(route)) {
    return NextResponse.json(
      { ok: false, error: { code: "NOT_FOUND", message: "Unknown Kaal route." } },
      { status: 404 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "BAD_REQUEST", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${UPSTREAM}/api/${route}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      // Kaal rate-limits compute at 30/min. Never cache a chart: it is
      // personal to whoever typed it in.
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: { code: "UPSTREAM_UNAVAILABLE", message: "Kaal did not respond." },
      },
      { status: 502 },
    );
  }
}
