// Sons de uma palavra-chave (tag), ou de até 3 combinadas, para a janela que abre por cima da Nuvem.
// A resposta fica guardada pela Vercel por 1 hora, para poupar o limite de consultas do Freesound.
import { buscarSonsPorTag } from '../../lib/freesound'
import { prepararSom, rotuloDaTag } from '../../lib/sons'

export default async function handler(req, res) {
  // ?tag=agua  ou  ?tag=agua,rio,barcos (até 3: sons que têm todas as palavras)
  const tags = [...new Set(String(req.query.tag || '').toLowerCase().split(',').map((t) => t.trim()).filter(Boolean))].slice(0, 3)
  if (!tags.length || !tags.every((t) => /^[a-z0-9-]{1,60}$/.test(t))) return res.status(400).json({ erro: 'palavra inválida' })
  try {
    const sons = (await buscarSonsPorTag(tags)).map(prepararSom)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ tags, rotulos: tags.map(rotuloDaTag), sons })
  } catch (e) {
    console.error('sons-da-palavra:', e.message)
    return res.status(502).json({ erro: 'Não foi possível buscar os sons agora.', detalhe: String(e.message).slice(0, 240) }) // detalhe sem a chave (a URL é cortada antes do token)
  }
}
