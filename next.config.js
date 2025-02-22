/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
