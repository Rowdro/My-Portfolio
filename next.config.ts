import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // silence dev-only cross-origin warning from the sandbox preview gateway
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
