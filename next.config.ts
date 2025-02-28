import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
