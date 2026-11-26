import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits above this directory, so Turbopack inferred
  // the wrong workspace root and traced files from there. Pin it.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  experimental: { viewTransition: true },
  // Old multi-route links now land on the matching section of the single page.
  async redirects() {
    return [
      { source: "/start", destination: "/", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/work", destination: "/#work", permanent: false },
      { source: "/experience", destination: "/#experience", permanent: false },
      { source: "/experience/:id", destination: "/#experience", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
