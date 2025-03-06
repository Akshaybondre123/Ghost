/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // Enable Next.js app directory if using App Router
  },
  webpack: (config) => {
    config.cache = false; // Disable Webpack cache to avoid caching issues
    return config;
  },
  images: {
    domains: ["your-image-domain.com"], // Add domains for optimized Next.js images
  },
  eslint: {
    ignoreDuringBuilds: true, // Prevent ESLint errors from breaking production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Prevent TypeScript errors from blocking production builds
  },
};

module.exports = nextConfig;
