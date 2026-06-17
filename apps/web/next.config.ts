import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jmc/core"],
  images: {
    // Catalog images are admin-managed external URLs for now. Until we add
    // owned image storage + a custom loader, accept any https host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
