import { OAUTH, credenciais, definirCookies, lerCookies, caminhoSeguro, cookiesDeAcesso } from '../../../lib/freesoundLogin'

// O Freesound devolve a pessoa para cá depois da autorização, com um código.
// Trocamos o código por um acesso (24 h) e um código de renovação (o site renova sozinho por até 6 meses).
export default async function handler(req, res) {
  const cookies = lerCookies(req)
  const voltar = caminhoSeguro(cookies.fs_voltar)
  const { code, state, error } = req.query

  if (error || !code) return res.redirect(302, voltar)
  if (!state || state !== cookies.fs_estado) return res.status(400).send('Pedido de login inválido. Tente de novo.')

  const { id, segredo } = credenciais()
  const corpo = new URLSearchParams({ client_id: id, client_secret: segredo, grant_type: 'authorization_code', code })
  const r = await fetch(`${OAUTH}/access_token/`, { method: 'POST', body: corpo, signal: AbortSignal.timeout(15000) })
  if (!r.ok) {
    console.error('Freesound login: troca do código falhou', r.status, (await r.text()).slice(0, 300))
    return res.status(502).send('Não foi possível concluir o login com o Freesound. Tente de novo.')
  }
  const t = await r.json()
  definirCookies(res, [
    ...cookiesDeAcesso(t),
    ['fs_estado', '', { maxAge: 0 }],
    ['fs_voltar', '', { maxAge: 0 }],
  ])
  res.redirect(302, voltar)
}
