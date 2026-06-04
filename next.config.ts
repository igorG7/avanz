import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/sobre", destination: "/#sobre", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/contato", destination: "/#contato", permanent: true },
    ];
  },
};

export default config;
