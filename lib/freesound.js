// Leitura dos dados do Freesound (só roda no servidor, durante a geração das páginas).
import colecoes from './colecoes'

const API = 'https://freesound.org/apiv2'
const USUARIO = 'jose.viana'
const POR_PAGINA = 150 // máximo aceito pelo Freesound

function comToken(url) {
  const u = new URL(url)
  u.searchParams.set('token', process.env.CLIENT_SECRET || '')
  return u.toString()
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

// O Freesound limita o número de pedidos por minuto (erro 429).
// Durante a construção do site (build), espera e tenta de novo algumas vezes.
// Com o site no ar, desiste rápido: a página continua mostrando a última versão boa
// e é refeita na próxima vez, sem deixar quem visita esperando.
const EM_BUILD = process.env.NEXT_PHASE === 'phase-production-build'
const TENTATIVAS = EM_BUILD ? 4 : 1
const ESPERA_MAXIMA = EM_BUILD ? 65 : 3 // segundos
const TEMPO_LIMITE = 15000 // milissegundos por pedido

// Na montagem, as páginas são geradas ao mesmo tempo e disparavam dezenas de pedidos juntos,
// passando do limite do Freesound (60 por minuto). Por isso, durante a montagem, os pedidos
// entram numa fila e saem um de cada vez, com pelo menos 1,1 s entre eles (28/11).
const INTERVALO_NA_MONTAGEM = 1100 // milissegundos
let fila = Promise.resolve()
function naFila(fazer) {
  if (!EM_BUILD) return fazer()
  const vez = fila.then(() => esperar(INTERVALO_NA_MONTAGEM)).then(fazer)
  fila = vez.catch(() => {})
  return vez
}

async function buscar(url) {
  for (let i = 0; ; i++) {
    const res = await naFila(() => fetch(comToken(url), { signal: AbortSignal.timeout(TEMPO_LIMITE) }))
    if (res.ok) return res.json()
    if (res.status === 429 && i < TENTATIVAS) {
      const segundos = Math.min(Number(res.headers.get('retry-after')) || (EM_BUILD ? 65 : 15 * (i + 1)), ESPERA_MAXIMA) // na montagem, espera o minuto virar
      await esperar(segundos * 1000)
      continue
    }
    const detalhe = (await res.text().catch(() => '')).slice(0, 160)
    throw new Error(`Freesound respondeu ${res.status} para ${url.split('?')[0]} ${detalhe}`)
  }
}

// Todos os pacotes da conta (nome, descrição, número de sons), num único pedido.
// O resultado fica guardado por 5 minutos para não repetir o pedido a cada página.
let pacotesEmCache = null
export function buscarPacotes() {
  if (!pacotesEmCache || Date.now() - pacotesEmCache.quando > 5 * 60 * 1000) {
    const promessa = (async () => {
      const pacotes = {}
      let url = `${API}/users/${USUARIO}/packs/?page_size=${POR_PAGINA}`
      while (url) {
        const pagina = await buscar(url)
        for (const p of pagina.results || []) pacotes[p.id] = p
        url = pagina.next
      }
      return pacotes
    })()
    promessa.catch(() => { pacotesEmCache = null })
    pacotesEmCache = { quando: Date.now(), promessa }
  }
  return pacotesEmCache.promessa
}

// Todos os sons de um pacote, percorrendo todas as páginas de resultado.
export async function buscarSonsDoPacote(id) {
  const campos = 'id,name,tags,license,description,type,duration,filesize,samplerate,bitdepth,channels,geotag,num_downloads'
  let url = `${API}/packs/${id}/sounds/?page_size=${POR_PAGINA}&fields=${campos}`
  const sons = []
  while (url) {
    const pagina = await buscar(url)
    sons.push(...(pagina.results || []))
    url = pagina.next
  }
  return sons
}

// Coleções da lista que já têm sons publicados, com o número de sons de cada uma.
export async function buscarColecoesVisiveis() {
  const pacotes = await buscarPacotes()
  return colecoes
    .map((c) => ({ ...c, numSons: pacotes[c.pacote]?.num_sounds || 0 }))
    .filter((c) => c.numSons > 0)
}

// Nome curto da licença a partir do link que o Freesound devolve.
export function licencaCurta(url = '') {
  const m = url.match(/licenses\/([a-z-]+)\/([\d.]+)/)
  if (m) return { nome: `CC ${m[1].toUpperCase()} ${m[2]}`, link: `https://creativecommons.org/licenses/${m[1]}/${m[2]}/deed.pt_BR` }
  if (url.includes('publicdomain/zero')) return { nome: 'CC0', link: 'https://creativecommons.org/publicdomain/zero/1.0/deed.pt_BR' }
  return { nome: 'Creative Commons', link: url }
}

// Soma dos downloads de todos os sons das coleções do BSA (só sons já publicados)
// e a lista de números desses sons (usada para sortear o som de exemplo da página inicial).
let sonsEmCache = null
export function buscarSonsEDownloads() {
  if (!sonsEmCache || Date.now() - sonsEmCache.quando > 5 * 60 * 1000) {
    const promessa = buscarSonsEDownloadsAgora()
    promessa.catch(() => { sonsEmCache = null })
    sonsEmCache = { quando: Date.now(), promessa }
  }
  return sonsEmCache.promessa
}

async function buscarSonsEDownloadsAgora() {
  const pacotesBSA = new Set(colecoes.map((c) => String(c.pacote)))
  let url = `${API}/search/text/?filter=${encodeURIComponent(`username:${USUARIO}`)}&fields=id,num_downloads,pack,tags&page_size=${POR_PAGINA}`
  let total = 0
  const ids = []
  const tags = {} // quantos sons usam cada tag
  while (url) {
    const pagina = await buscar(url)
    for (const s of pagina.results || []) {
      const id = (s.pack || '').match(/packs\/(\d+)/)?.[1]
      if (id && pacotesBSA.has(id)) {
        total += s.num_downloads || 0
        ids.push(s.id)
        for (const t of s.tags || []) tags[t] = (tags[t] || 0) + 1
      }
    }
    url = pagina.next
  }
  return { total, ids, tags }
}

// Informações técnicas de um som, em texto curto (ex.: "WAV · 5:09 · 42,6 MB · 48 kHz · 24 bit · mono").
export function fichaTecnica(s) {
  const partes = []
  const tipos = { wav: 'WAV', flac: 'FLAC', aiff: 'AIFF', aif: 'AIFF', mp3: 'MP3', ogg: 'OGG', m4a: 'M4A' }
  if (s.type) partes.push(tipos[s.type] || String(s.type).toUpperCase())
  if (s.duration) {
    const t = Math.round(s.duration)
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), seg = String(t % 60).padStart(2, '0')
    partes.push(h ? `${h}:${String(m).padStart(2, '0')}:${seg}` : `${m}:${seg}`)
  }
  if (s.filesize) partes.push(`${(s.filesize / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} MB`)
  if (s.samplerate) partes.push(`${(s.samplerate / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} kHz`)
  if (s.bitdepth) partes.push(`${s.bitdepth} bit`)
  if (s.channels) partes.push(s.channels === 1 ? 'mono' : s.channels === 2 ? 'estéreo' : `${s.channels} canais`)
  const { microfone, gravador } = equipamento(s.description)
  if (microfone) partes.push(microfone)
  if (gravador) partes.push(gravador)
  return partes.join(' · ')
}

// Microfone e gravador, lidos da frase da descrição em português, por exemplo:
//   "Em mono com Zoom H6 + Senheiser MKE600."                         (2022)
//   "Foi gravado em estéreo com Clippy EM272 (par estéreo) e Zoom F3 em 32 bits."  (Carajás)
const GRAVADORES = /\b(zoom|tascam|sound ?devices|mixpre|sony|roland|edirol|olympus|marantz|nagra)\b/i

function padronizarEquipamento(nome) {
  let n = nome.trim().replace(/^(e|\+)\s+/i, '')
    .replace(/senheiser/i, 'Sennheiser')
    .replace(/\bmke\s?600\b/i, 'MKE 600')
    .replace(/\s+/g, ' ')
  if (/^MKE 600$/.test(n)) n = 'Sennheiser MKE 600'
  return n
}

export function equipamento(descricao) {
  const pt = String(descricao || '').replace(/\r/g, '').split(/\n\s*--+\s*\n/)[0]
  const m = pt.match(/em\s+(?:mono|est[ée]reo)\s+com\s+([^.\n]+)/i)
  if (!m) return { microfone: null, gravador: null }
  const itens = m[1]
    .replace(/\s+em\s+\d+\s*bits?\s*$/i, '')
    .split(/\s+\+\s+|\s+e\s+/)
    .map(padronizarEquipamento)
    .filter(Boolean)
  const gravador = itens.find((i) => GRAVADORES.test(i)) || null
  const microfone = itens.filter((i) => i !== gravador).join(' + ') || null
  return { microfone, gravador }
}

// Todos os sons das coleções do BSA que têm uma tag (palavra-chave), ou todas as tags de uma lista (até 3).
export async function buscarSonsPorTag(tag) {
  const pacotesBSA = new Set(colecoes.map((c) => String(c.pacote)))
  const campos = 'id,name,tags,license,description,type,duration,filesize,samplerate,bitdepth,channels,geotag,num_downloads,pack'
  const lista = (Array.isArray(tag) ? tag : [tag]).slice(0, 3)
  const filtro = `username:${USUARIO} ` + lista.map((t) => `tag:"${String(t).replace(/"/g, '')}"`).join(' AND ')
  let url = `${API}/search/text/?filter=${encodeURIComponent(filtro)}&fields=${campos}&page_size=${POR_PAGINA}&sort=downloads_desc`
  const sons = []
  while (url) {
    const pagina = await buscar(url)
    for (const s of pagina.results || []) {
      const id = (s.pack || '').match(/packs\/(\d+)/)?.[1]
      if (id && pacotesBSA.has(id)) sons.push(s)
    }
    url = pagina.next
  }
  return sons
}

// Todos os sons publicados das coleções do BSA (usado na lista de sons por lugar, embaixo do mapa).
export async function buscarTodosOsSons() {
  const pacotesBSA = new Set(colecoes.map((c) => String(c.pacote)))
  const campos = 'id,name,tags,license,description,type,duration,filesize,samplerate,bitdepth,channels,geotag,num_downloads,pack'
  let url = `${API}/search/text/?filter=${encodeURIComponent(`username:${USUARIO}`)}&fields=${campos}&page_size=${POR_PAGINA}`
  const sons = []
  while (url) {
    const pagina = await buscar(url)
    for (const s of pagina.results || []) {
      const id = (s.pack || '').match(/packs\/(\d+)/)?.[1]
      if (id && pacotesBSA.has(id)) sons.push(s)
    }
    url = pagina.next
  }
  return sons
}

// De quanto em quanto tempo as páginas são refeitas com dados novos do Freesound (em segundos).
// Os sons mudam raramente; 1 hora protege o limite diário de consultas da API.
export const ATUALIZAR_A_CADA = 3600
