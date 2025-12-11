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
    ],
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
