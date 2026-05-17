import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phimapi.com",
      },
    ],
  },
};

export default nextConfig;
