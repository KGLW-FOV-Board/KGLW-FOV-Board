import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: "/KGLW-FOV-Board",
  assetPrefix: "/KGLW-FOV-Board",
};

module.exports = nextConfig;

export default nextConfig;
