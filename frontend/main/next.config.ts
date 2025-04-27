import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.rasset.ie',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/photos/**', // fix here!
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // matches any path on images.unsplash.com
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // matches any path on images.unsplash.com
      },
    ],
  },
  
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:3001/:path*',
      },
      {
        source: '/api/user/:path*',
        destination: 'http://localhost:3002/:path*',
      },
      {
        source: '/api/restaurant/:path*',
        destination: 'http://localhost:3003/:path*',
      },
      {
        source: '/api/order/:path*',
        destination: 'http://localhost:3004/:path*',
      },
    ]
  }
};


export default nextConfig