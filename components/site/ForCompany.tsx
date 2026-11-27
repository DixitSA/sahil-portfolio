"use client";

import { useSearchParams } from "next/navigation";

/**
 * Personalised greeting for a link sent to a specific team.
 *
 *   /?for=Stripe          ->  "Prepared for the Stripe team"
 *   /?for=Jane%20at%20Ramp ->  "Prepared for Jane at Ramp"
 *
 * Read on the client so the home page stays statically rendered. The value is
 * rendered as text, length-capped, and stripped to a safe character set.
 */
export default function ForCompany() {
  const params = useSearchParams();
  const raw = params.get("for") ?? params.get("to") ?? "";
  const name = raw.replace(/[^\p{L}\p{N} &.,'’\-]/gu, "").trim().slice(0, 48);
  if (!name) return null;

  const personal = /\bat\b/i.test(name);
  const label = personal ? name : `the ${name} team`;

  return (
    <p className="t-meta mb-5 flex items-center gap-2 text-ink-2">
      <span aria-hidden className="h-2 w-2 bg-mark" />
      Prepared for {label}
    </p>
  );
}
