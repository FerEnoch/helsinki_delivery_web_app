/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'drive.google.com',
      port: '',
      pathname: '/uc/**'
    }]
  }
}

module.exports = nextConfig
