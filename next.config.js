/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'raw.githubusercontent.com',
      'github.com',
      'pokeapi.co'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/pokemon/:path*',
        destination: 'https://pokeapi.co/api/v2/pokemon/:path*',
      },
    ]
  },
}

module.exports = nextConfig
