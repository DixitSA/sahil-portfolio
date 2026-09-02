import type { MetadataRoute } from "next";
import { projects, roles } from "@/content";

const BASE = "https://sahildixit.dev";

/**
 * Every window in the OS owns a real, indexable route. If a surface is not
 * listed here it does not exist to a search engine, which is the whole
 * reason window state derives from the URL rather than the other way round.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/about", "/work", "/experience", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.tier === "featured" ? 0.9 : 0.6,
  }));

  const roleRoutes = roles.map((r) => ({
    url: `${BASE}/experience/${r.id}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...roleRoutes];
}
