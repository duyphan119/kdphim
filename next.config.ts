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
  allowedDevOrigins: [
    "6265-2405-4803-50cc-56c0-7ca6-e8d9-1b30-c8ed.ngrok-free.app",
  ],
};

export default nextConfig;
