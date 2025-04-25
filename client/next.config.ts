import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${process.env.PORT}/api/:path*`,
      }
    ]
  }
};

export default nextConfig;
