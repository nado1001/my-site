const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  poweredByHeader: false,
  env: {
    stage: isProd ? 'PUBLISHED' : 'DRAFT'
  },
  experimental: {
    appDir: true
  }
}
