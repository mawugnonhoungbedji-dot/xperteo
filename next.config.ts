import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.43.78", "localhost", "127.0.0.1"],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560, 3072, 3840],
    qualities: [75, 85, 95],
    formats: ["image/webp"],
  },
};

export default nextConfig;
