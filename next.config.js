/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_TOKEN,
  },
};

module.exports = nextConfig;
