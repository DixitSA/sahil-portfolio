import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits above this directory, so Turbopack inferred
  // the wrong workspace root and traced files from there. Pin it.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
