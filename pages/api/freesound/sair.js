import { definirCookies, caminhoSeguro, cookiesDeSaida } from '../../../lib/freesoundLogin'

// Sai do login com o Freesound neste site.
export default function handler(req, res) {
  definirCookies(res, cookiesDeSaida())
  res.redirect(302, caminhoSeguro(req.query.voltar))
}
