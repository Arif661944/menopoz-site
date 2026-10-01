import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/yazilar/normal-dogum-ve-sezaryen",
        destination: "/yazilar/vajinal-dogum-ve-sezaryen",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
