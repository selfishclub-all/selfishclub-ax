import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
