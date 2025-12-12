import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const config: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com", // Avatar için
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // Supabase storage
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

const nextPWA = withPWA({
  dest: "public", // Service worker'ın oluşturulacağı yer
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development", // Geliştirme modunda kapalı olsun
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default nextPWA(config);
