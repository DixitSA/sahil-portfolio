import { profile, projects } from "@/content";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

/**
 * Person + CreativeWork structured data. A recruiter's first contact with
 * this site is often a search result, not the desktop.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        email: `mailto:${profile.email}`,
        url: BASE,
        sameAs: [`https://${profile.github}`],
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: profile.education.school,
        },
        knowsAbout: profile.skills.flatMap((g) => g.items),
      },
      ...projects
        .filter((p) => p.tier === "featured")
        .map((p) => ({
          "@type": "CreativeWork",
          "@id": `${BASE}/work/${p.slug}#work`,
          name: p.name,
          abstract: p.summary,
          url: p.href ?? `${BASE}/work/${p.slug}`,
          keywords: p.tags.join(", "),
          creator: { "@id": `${BASE}/#person` },
        })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored locally, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
