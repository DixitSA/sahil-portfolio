"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="eyebrow mb-6 text-[var(--color-ink-muted)]"
    >
      Prepared for{" "}
      {label}
    </motion.p>
  );
}
