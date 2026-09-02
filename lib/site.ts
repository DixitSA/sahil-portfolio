/**
 * Canonical origin for this deployment.
 *
 * Five files used to hardcode https://sahildixit.dev: metadataBase, the
 * sitemap, robots, the JSON-LD graph and the OG image footer. That domain does
 * not resolve, so every canonical URL, sitemap entry and piece of structured
 * data pointed at nothing. One place now, resolved in this order:
 *
 *   1. NEXT_PUBLIC_SITE_URL, once a real domain exists. Set it in Vercel and
 *      nothing else needs editing.
 *   2. VERCEL_PROJECT_PRODUCTION_URL, which Vercel injects at build time. This
 *      makes the first deploy correct with no configuration at all.
 *   3. localhost, for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel supplies this without a protocol.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Host only, for display. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
