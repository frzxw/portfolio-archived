import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {},

  // Enable production source maps for debugging and Lighthouse insights
  productionBrowserSourceMaps: true,

  // Tree-shake large dependencies to reduce bundle size
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/rapier",
      "framer-motion",
      "lucide-react",
      "react-icons",
    ],
  },
};

export default nextConfig;
