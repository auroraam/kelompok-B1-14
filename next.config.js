/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  reactStrictMode: true,
  images: {
    unoptimized: true, // Nonaktifkan Image Optimization untuk bisa pakai Static Export
  },
};

module.exports = nextConfig;