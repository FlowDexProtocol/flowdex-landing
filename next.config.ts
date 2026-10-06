import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/buy',
        destination: 'https://purchase.flowdexprotocol.com',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
