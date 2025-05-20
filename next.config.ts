import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "avatars.githubusercontent.com", // ✅ Add this line
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "plus.unsplash.com", // ✅ add this line
    },
    ],
  },
  experimental: {
    ppr: 'incremental'
  },

  devIndicators: {
    position: "bottom-right"
  },


};

export default nextConfig;
