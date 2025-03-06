/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export", 
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  images: {
    domains: ["your-image-domain.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
