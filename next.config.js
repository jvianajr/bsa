/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // endereços antigos que mudaram de nome
  async redirects() {
    return [
      { source: '/projetos', destination: '/ecos', permanent: true },
      { source: '/sobre', destination: '/ficha-tecnica', permanent: true },
    ]
  },
}

module.exports = nextConfig
