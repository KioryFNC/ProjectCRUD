import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-teste-front-production.up.railway.app",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
