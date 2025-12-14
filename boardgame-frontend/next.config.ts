import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.kakaocdn.net" },
      { protocol: "http", hostname: "**.kakaocdn.net" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "http", hostname: "**.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
