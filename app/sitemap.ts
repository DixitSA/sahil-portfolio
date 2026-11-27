import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "", priority: 1 },
    { path: "/kaal", priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const projectRoutes = caseStudyProjects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.tier === "featured" ? 0.9 : 0.7,
  }));

  return [...pages, ...projectRoutes];
}
