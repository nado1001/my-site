/** @type {import('next').NextConfig} */
module.exports = {
  future: { strictPostcssConfiguration: true },
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  poweredByHeader: false
}
