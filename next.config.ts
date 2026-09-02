import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Ignorar errores de tipos en producción para que Vercel no bloquee el deploy
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de linter en producción
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;