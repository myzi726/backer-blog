import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://158.180.84.171:8080/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
