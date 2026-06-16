import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@jmc/core"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;
