// Login com o Freesound (OAuth2) para baixar sons sem sair do site do BSA.
// Fluxo: /api/freesound/entrar → tela de autorização do Freesound → /api/freesound/retorno
// → o acesso fica num cookie protegido → /api/freesound/baixar?id=... baixa o arquivo original.
//
// Variáveis necessárias:
//   FREESOUND_CLIENT_ID   "Client id" da credencial do site no Freesound
//   CLIENT_SECRET         "Client secret/Api key" da mesma credencial (já usada pelo site)
// Na credencial do Freesound, o "Callback URL" precisa ser <endereço do site>/api/freesound/retorno.

export const OAUTH = 'https://freesound.org/apiv2/oauth2'

//   FREESOUND_CLIENT_SECRET  (opcional) segredo da credencial do login, quando ela for separada
//                            da credencial que gera as páginas (CLIENT_SECRET). Assim o limite diário
//                            de pedidos das páginas não bloqueia os downloads.
export function credenciais() {
  return { id: process.env.FREESOUND_CLIENT_ID, segredo: process.env.FREESOUND_CLIENT_SECRET || process.env.CLIENT_SECRET }
}

function cookie(nome, valor, { maxAge, httpOnly = true } = {}) {
  const partes = [`${nome}=${encodeURIComponent(valor)}`, 'Path=/', 'SameSite=Lax']
  if (httpOnly) partes.push('HttpOnly')
  if (process.env.NODE_ENV === 'production') partes.push('Secure')
  if (maxAge !== undefined) partes.push(`Max-Age=${maxAge}`)
  return partes.join('; ')
}

export function definirCookies(res, lista) {
  res.setHeader('Set-Cookie', lista.map(([n, v, o]) => cookie(n, v, o)))
}

export function lerCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || '')
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([n]) => n)
      .map(([n, ...v]) => [n, decodeURIComponent(v.join('='))])
  )
}

// Só aceita voltar para uma página do próprio site.
export function caminhoSeguro(v) {
  return typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') ? v : '/colecoes'
}

// Quanto tempo o site lembra o login (com renovação automática do acesso de 24 h).
export const LEMBRAR_POR = 180 * 24 * 3600 // 6 meses, em segundos

// Guarda o acesso (24 h) e o código de renovação (6 meses) em cookies protegidos.
export function cookiesDeAcesso(t) {
  const validade = Math.max(60, Number(t.expires_in || 86400) - 60)
  const lista = [['fs_token', t.access_token, { maxAge: validade }]]
  if (t.refresh_token) lista.push(['fs_renovar', t.refresh_token, { maxAge: LEMBRAR_POR }])
  lista.push(['fs_logado', '1', { maxAge: t.refresh_token ? LEMBRAR_POR : validade, httpOnly: false }])
  return lista
}

export const cookiesDeSaida = () => [
  ['fs_token', '', { maxAge: 0 }],
  ['fs_renovar', '', { maxAge: 0 }],
  ['fs_logado', '', { maxAge: 0, httpOnly: false }],
]

// Pede um acesso novo ao Freesound usando o código de renovação.
export async function renovarAcesso(refresh) {
  const { id, segredo } = credenciais()
  const corpo = new URLSearchParams({ client_id: id, client_secret: segredo, grant_type: 'refresh_token', refresh_token: refresh })
  const r = await fetch(`${OAUTH}/access_token/`, { method: 'POST', body: corpo, signal: AbortSignal.timeout(15000) })
  if (!r.ok) return null
  return r.json()
}
