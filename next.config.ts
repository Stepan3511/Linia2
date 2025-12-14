import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${process.env.SERVER_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
