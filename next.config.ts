import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {},

  // Disable source maps in production to reduce bundle size and latency
  productionBrowserSourceMaps: false,

  // Enable React strict mode
  reactStrictMode: true,

  // Tree-shake large dependencies to reduce bundle size
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/rapier",
      "lucide-react",
      "react-icons",
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
