import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
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
    TMDB_API_DOMAIN: process.env.TMDB_API_DOMAIN,
    TMDB_IMAGE_DOMAIN: process.env.TMDB_IMAGE_DOMAIN,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
