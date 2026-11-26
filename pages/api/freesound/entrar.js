import crypto from 'node:crypto'
import { OAUTH, credenciais, definirCookies, caminhoSeguro } from '../../../lib/freesoundLogin'

// Começa o login: manda a pessoa para a tela de autorização do Freesound.
export default function handler(req, res) {
  const { id } = credenciais()
  // enquanto o login não estiver configurado neste ambiente, o botão leva à página do som no Freesound
  if (!id) {
    const som = String(req.query.som || '')
    return res.redirect(302, /^\d+$/.test(som) ? `https://freesound.org/s/${som}/` : 'https://freesound.org/people/jose.viana/')
  }
  const estado = crypto.randomBytes(16).toString('hex')
  definirCookies(res, [
    ['fs_estado', estado, { maxAge: 600 }],
    ['fs_voltar', caminhoSeguro(req.query.voltar), { maxAge: 600 }],
  ])
  const url = `${OAUTH}/authorize/?client_id=${encodeURIComponent(id)}&response_type=code&state=${estado}`
  res.redirect(302, url)
}
