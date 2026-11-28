/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 28/11: as páginas que buscam todos os sons (início, mapa) podem passar de 60 s na montagem,
  // quando o Freesound pede para esperar (limite por minuto). Damos até 5 minutos por página.
  staticPageGenerationTimeout: 300,
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
