import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    APP_DOMAIN_CDN_IMAGE: process.env.APP_DOMAIN_CDN_IMAGE,
    API_DOMAIN: process.env.API_DOMAIN,
    APP_DOMAIN: process.env.APP_DOMAIN,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
