import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
  },
  async rewrites() {
    const baseUrl = process.env.SERVER_URL?.replace(/\/api$/, "");
    return [
      {
        source: "/uploads/:path*",
        destination: `${baseUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;