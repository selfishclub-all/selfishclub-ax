import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/seminar/:slug",
        destination: "/sharing/:slug",
        permanent: true,
      },
      {
        source: "/events/:slug",
        destination: "/sharing/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
