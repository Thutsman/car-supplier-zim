import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Admin photo uploads: up to 12 images at 5MB each won't fit the
      // 1MB default. Multipart overhead counts toward this limit too.
      bodySizeLimit: "30mb",
    },
  },
};

export default nextConfig;
