// Mapa do site para os buscadores (Google etc.): páginas fixas e as coleções com sons publicados.
// Endereço: /sitemap.xml. É refeito a cada hora, junto com as outras páginas.
import { buscarColecoesVisiveis } from '../lib/freesound'
import { SITE } from '../components/Seo'

const FIXAS = ['/', '/colecoes', '/mapa', '/nuvem', '/mediacao', '/ecos', '/ficha-tecnica', '/contato', '/acessibilidade']

export async function getServerSideProps({ res }) {
  const colecoes = await buscarColecoesVisiveis().catch(() => [])
  const urls = [...FIXAS, ...colecoes.map((c) => `/${c.slug}`)]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc></url>`).join('\n')}
</urlset>`
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function Sitemap() { return null }
