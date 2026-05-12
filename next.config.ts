import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  /*basePath: isProd ? "/KGLW-FOV-Board": "",
  assetPrefix: isProd ? "/KGLW-FOV-Board/": "",*/
  basePath: "",
  assetPrefix: "",
};

module.exports = nextConfig;

export default nextConfig;
