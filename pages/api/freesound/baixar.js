import { Readable } from 'node:stream'
import { lerCookies, definirCookies, renovarAcesso, cookiesDeAcesso, cookiesDeSaida } from '../../../lib/freesoundLogin'

// Baixa o arquivo original de um som com o acesso da própria pessoa no Freesound.
export default async function handler(req, res) {
  const id = String(req.query.id || '')
  if (!/^\d+$/.test(id)) return res.status(400).send('Som inválido.')
  const { fs_token, fs_renovar } = lerCookies(req)
  const voltar = `/api/freesound/entrar?voltar=${encodeURIComponent(String(req.query.voltar || '/colecoes'))}&som=${id}`
  let token = fs_token
  let novosCookies = null

  // acesso de 24 h vencido: renova sozinho com o código de renovação
  async function renovar() {
    if (!fs_renovar) return false
    const t = await renovarAcesso(fs_renovar)
    if (!t?.access_token) return false
    token = t.access_token
    novosCookies = cookiesDeAcesso(t)
    return true
  }

  if (!token && !(await renovar())) {
    definirCookies(res, cookiesDeSaida())
    return res.redirect(302, voltar)
  }

  let auth = { Authorization: `Bearer ${token}` }

  const baixarDoFreesound = () => fetch(`https://freesound.org/apiv2/sounds/${id}/download/`, { headers: auth, redirect: 'manual', signal: AbortSignal.timeout(20000) })
  let r = await baixarDoFreesound()

  // Freesound pediu para esperar (limite de pedidos): tenta mais uma vez se a espera for curta
  if (r.status === 429) {
    const espera = Number(r.headers.get('retry-after'))
    console.error('Freesound download 429', espera || '', (await r.text().catch(() => '')).slice(0, 300))
    if (espera > 0 && espera <= 3) {
      await new Promise((ok) => setTimeout(ok, espera * 1000))
      r = await baixarDoFreesound()
    }
  }

  if (r.status === 401 && !novosCookies && (await renovar())) {
    auth = { Authorization: `Bearer ${token}` }
    r = await baixarDoFreesound()
  }
  if (r.status === 401) {
    // não deu para renovar: apaga e pede para autorizar de novo
    definirCookies(res, cookiesDeSaida())
    return res.redirect(302, voltar)
  }
  if (novosCookies) definirCookies(res, novosCookies)
  // se o Freesound responder com um endereço temporário do arquivo, mandamos a pessoa direto para ele
  if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
    return res.redirect(302, r.headers.get('location'))
  }
  if (!r.ok || !r.body) {
    // não deu pelo site: leva a pessoa à página do som no Freesound, onde o download sempre funciona
    console.error('Freesound download falhou', r.status, r.status === 429 ? '' : (await r.text().catch(() => '')).slice(0, 300))
    return res.redirect(302, `https://freesound.org/s/${id}/`)
  }

  // nome do arquivo: nome do som + extensão original
  let nome = `freesound-${id}`
  try {
    const info = await fetch(`https://freesound.org/apiv2/sounds/${id}/?fields=name,type`, { headers: auth, signal: AbortSignal.timeout(8000) })
    if (info.ok) {
      const j = await info.json()
      const base = String(j.name || nome).replace(/\.(wav|mp3|flac|ogg|aiff?|m4a)$/i, '')
      nome = `${base}.${j.type || 'wav'}`.replace(/[\\/:*?"<>|]+/g, '-')
    }
  } catch {}

  res.setHeader('Content-Type', r.headers.get('content-type') || 'application/octet-stream')
  if (r.headers.get('content-length')) res.setHeader('Content-Length', r.headers.get('content-length'))
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(nome)}`)
  res.setHeader('Cache-Control', 'private, no-store')
  Readable.fromWeb(r.body).pipe(res)
}

export const config = { api: { responseLimit: false } }
