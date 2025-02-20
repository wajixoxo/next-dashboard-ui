/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" }
    ],
    domains: [
      'www.bestpets.co', // your current domain
      'media.istockphoto.com' // the other domain
    ]
  }
};

export default nextConfig;
