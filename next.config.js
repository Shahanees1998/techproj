/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    turbo: {
      loaders: {
        '.css': ['style-loader', 'css-loader'],
      },
    },
  },
}

module.exports = nextConfig 