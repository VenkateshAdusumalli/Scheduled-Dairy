/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for production deployment
  swcMinify: true,
  // Enable React strict mode for better development experience
  reactStrictMode: true,
}

module.exports = nextConfig
