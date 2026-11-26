// Inscrição na newsletter do BSA pelo Brevo, com confirmação por e-mail (double opt-in).
// A pessoa recebe um e-mail do Brevo e só entra na lista depois de clicar em "confirmar".
//
// Variáveis necessárias (no painel da Vercel e, para testar, em .env.development.local):
//   BREVO_API_KEY          chave da API do Brevo
//   BREVO_LIST_ID          número da lista de contatos (ex.: 3)
//   BREVO_DOI_TEMPLATE_ID  número do modelo de e-mail de confirmação (double opt-in)

const URL_CONFIRMADA = 'https://www.bancosonoroamazonico.com.br/inscricao-confirmada'
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, mensagem: 'Método não permitido.' })
  }

  const { email = '', nome = '', bsa_verificacao: armadilha = '' } = req.body || {}

  // Campo escondido: pessoas não veem nem preenchem; robôs costumam preencher.
  if (armadilha) {
    console.warn('Newsletter: pedido ignorado (campo anti-robô preenchido).')
    return res.status(200).json({ ok: true })
  }

  const emailLimpo = String(email).trim().toLowerCase()
  if (!EMAIL_VALIDO.test(emailLimpo) || emailLimpo.length > 200) {
    return res.status(400).json({ ok: false, mensagem: 'Confira o e-mail digitado.' })
  }

  const { BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID } = process.env
  if (!BREVO_API_KEY || !BREVO_LIST_ID || !BREVO_DOI_TEMPLATE_ID) {
    console.error('Newsletter: faltam variáveis do Brevo.')
    return res.status(503).json({ ok: false, mensagem: 'A inscrição está temporariamente indisponível. Tente mais tarde.' })
  }

  const corpo = {
    email: emailLimpo,
    includeListIds: [Number(BREVO_LIST_ID)],
    templateId: Number(BREVO_DOI_TEMPLATE_ID),
    redirectionUrl: URL_CONFIRMADA,
  }
  const nomeLimpo = String(nome).trim().slice(0, 100)
  if (nomeLimpo) corpo.attributes = { NOME: nomeLimpo }

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(corpo),
    })
    if (r.ok) return res.status(200).json({ ok: true })
    const detalhe = await r.text()
    console.error('Newsletter: Brevo respondeu', r.status, detalhe.slice(0, 300))
    return res.status(502).json({ ok: false, mensagem: 'Não foi possível concluir a inscrição agora. Tente mais tarde.' })
  } catch (e) {
    console.error('Newsletter: erro ao falar com o Brevo', e)
    return res.status(502).json({ ok: false, mensagem: 'Não foi possível concluir a inscrição agora. Tente mais tarde.' })
  }
}
