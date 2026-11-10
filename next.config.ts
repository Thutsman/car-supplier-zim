import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's free tier meters image "transformations" (one per unique photo + size + format).
    // Keep that count low: one output format, a short list of sizes, and long caching.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "xourjibposchcfnsttuv.supabase.co",
        pathname: "/storage/v1/object/public/vehicle-images/**",
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
