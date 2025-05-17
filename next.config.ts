import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['phimimg.com'], // Thêm hostname vào đây
  },
  eslint: {
    ignoreDuringBuilds: true, 
  }
};

export default nextConfig;
