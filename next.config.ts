import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Bloque para Turbopack requerido en Next.js 16
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      html2canvas: "html2canvas-pro",
    };
    return config;
  },
  // 🛡️ Cabeceras de Seguridad Nivel Dios
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Bloquea ataques de Clickjacking (evita que incrusten tu web en iframes)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Impide que el navegador adivine o fuercie tipos MIME inseguros
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block', // Capa extra de protección contra ataques XSS
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Control de privacidad para referencias externas
          },
        ],
      },
    ];
  },
};

export default nextConfig;