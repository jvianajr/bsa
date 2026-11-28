/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // endereços antigos que mudaram de nome
  async redirects() {
    return [
      { source: '/projetos', destination: '/ecos', permanent: true },
      { source: '/sobre', destination: '/ficha-tecnica', permanent: true },
      // 27/11/2026: Manifestação virou Manifestações e absorveu a Comunidade
      { source: '/sonsdamanifestacao', destination: '/sonsdemanifestacoes', permanent: true },
      { source: '/sonsdacomunidade', destination: '/sonsdemanifestacoes', permanent: true },
    ]
  },
}

module.exports = nextConfig
