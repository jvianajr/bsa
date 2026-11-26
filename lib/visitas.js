// Contagem de visitas com o GoatCounter (gratuito, sem cookies).
// Painel: https://bancosonoroamazonico.goatcounter.com
//
// Para a frase "Este site recebeu X visitas" funcionar, no painel do GoatCounter:
// Settings → marque "Allow adding visitor counts on your website".

export const GOATCOUNTER_CODIGO = 'bancosonoroamazonico'
export const GOATCOUNTER_URL = `https://${GOATCOUNTER_CODIGO}.goatcounter.com`
export const VISITAS_DESDE = 'dezembro de 2026'

// Total de visitas do site inteiro (só roda no servidor, ao gerar a página).
export async function buscarTotalVisitas() {
  const res = await fetch(`${GOATCOUNTER_URL}/counter/TOTAL.json`, { signal: AbortSignal.timeout(8000) })
  if (!res.ok) throw new Error(`GoatCounter respondeu ${res.status}`)
  const dados = await res.json()
  const numero = Number(String(dados.count || '').replace(/\D/g, ''))
  return Number.isFinite(numero) ? numero : null
}
