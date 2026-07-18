import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
