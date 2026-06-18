import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jmc/core"],
  images: {
    // Catalog images: owned uploads served by the API (http in dev) plus any
    // https host while external URLs are still allowed.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
