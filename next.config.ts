import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a pure static site in ./out for hosts like
// Cloudflare Pages. The default standalone build is what the sandbox runs.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : "standalone",
  ...(isStatic ? { images: { unoptimized: true } } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
