import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "readymadeui.com",
      },
    ],
  },
  env: {
    META_TOKEN: process.env.META_TOKEN,
    META_PHONE_NUMBER_ID: process.env.META_PHONE_NUMBER_ID,
  },
};

export default nextConfig;
