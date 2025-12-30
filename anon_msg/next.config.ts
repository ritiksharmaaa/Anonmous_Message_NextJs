import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'signal.org',
        port: '',
        pathname: '/**', // This means "allow any image path from this site"
      },
    ],
  },
};

// module.exports = nextConfig;

// const nextConfig: NextConfig = {
//   /* config options here */
// };

export default nextConfig;
