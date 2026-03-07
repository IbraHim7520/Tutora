import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For the static placeholder images
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // For fallback avatars
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Common if your backend uses Cloudinary
      },
      
    ],
  },
  
  env: {
    NEXT_PUBLIC_BACKKEND_URL: process.env.NEXT_PUBLIC_BACKKEND_URL,
  },
};

export default nextConfig;