import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;