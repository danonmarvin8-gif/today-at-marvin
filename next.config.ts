import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/today-at-marvin',
  trailingSlash: true,
};

export default nextConfig;
