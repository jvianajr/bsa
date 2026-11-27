// Preparação dos dados de cada som para as páginas (coleções e palavras-chave).
// Só roda no servidor, ao gerar as páginas.
import colecoes from './colecoes'
import palavras from './palavras.json'
import { licencaCurta, fichaTecnica } from './freesound'

const PT = palavras.pt
const OCULTAS = new Set(palavras.ocultas)
const COLECAO_DO_PACOTE = Object.fromEntries(colecoes.map((c) => [String(c.pacote), c]))

// Como mostrar uma tag: com acentos, quando for uma palavra em português conhecida.
export function rotuloDaTag(tag) {
  return PT[tag] || tag.replace(/-/g, ' ')
}

// A tag entra na nuvem? (só palavras em português, sem as genéricas/técnicas)
export function tagNaNuvem(tag) {
  return Boolean(PT[tag]) && !OCULTAS.has(tag)
}

// Parte em português da descrição do Freesound (antes do separador "--" da versão em inglês),
// sem o bloco de créditos e sem a linha de agradecimentos, que já aparece destacada.
function descricaoEmPortugues(texto) {
  const pt = String(texto || '').replace(/\r/g, '').split(/\n\s*--+\s*\n/)[0]
  // o bloco de créditos ("// projeto...", "Ao utilizar o arquivo...", "Autor:", "Ano:") fica só no Freesound
  const linhas = pt.split('\n')
  const corte = linhas.findIndex((l) => /^\s*(\/\/|\*?\s*Ao utilizar o arquivo)/i.test(l))
  return (corte >= 0 ? linhas.slice(0, corte) : linhas)
    .filter((l) => !/^\s*Agradecimentos:/i.test(l))
    .join('\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim() || null
}

export function colecaoDoSom(som) {
  const id = String(som.pack || '').match(/packs\/(\d+)/)?.[1]
  return id ? COLECAO_DO_PACOTE[id] || null : null
}

// Converte um som do Freesound no formato usado pela lista de sons do site.
export function prepararSom({ description, type, duration, filesize, samplerate, bitdepth, channels, geotag, pack, ...s }) {
  const colecao = colecaoDoSom({ pack })
  return {
    id: s.id,
    name: s.name,
    num_downloads: s.num_downloads || 0,
    tags: (s.tags || []).map((t) => ({ tag: t, rotulo: rotuloDaTag(t) })),
    ficha: fichaTecnica({ type, duration, filesize, samplerate, bitdepth, channels, description }),
    temLocal: Boolean(geotag),
    licenca: licencaCurta(s.license),
    // linha "Agradecimentos: ..." da descrição do som no Freesound, quando houver
    agradecimentos: (String(description || '').match(/Agradecimentos:\s*([^\n\r]+)/i)?.[1] || '').trim() || null,
    descricao: descricaoEmPortugues(description),
    colecao: colecao ? { slug: colecao.slug, nome: colecao.nome } : null,
  }
}

// Lugar do som, lido da frase "Gravado em/no/na …, Pará|Maranhão" da descrição no Freesound.
// Devolve o município com a sigla do estado (ex.: "Marabá, PA"); ilhas e distritos vão para o município.
// Gravações entre dois lugares ficam em "em deslocamento"; sem município reconhecido, "outros lugares".
const MUNICIPIOS = ['Igarapé-Miri', 'Belém', 'Castanhal', 'Santa Izabel do Pará', 'Marabá', 'Itupiranga', 'Parauapebas',
  'Curionópolis', 'Nova Ipixuna', 'Eldorado do Carajás', 'Canaã dos Carajás', 'São Luís', 'Alto Alegre do Pindaré']
const APELIDOS = [[/igarap[ée][\s-]miri/i, 'Igarapé-Miri'], [/mosqueiro|outeiro/i, 'Belém'], [/santa izabel/i, 'Santa Izabel do Pará']]
export function lugarDoSom(descricao) {
  const m = /Gravad[oa]s?\s+(?:(?:em|no|na|nos|nas|num|numa|pela|pelo)\s+)?([^.\n]*?),\s*(Pará|Maranhão)(?=[,.\s])/.exec(String(descricao || ''))
  if (!m) return 'outros lugares'
  const trecho = m[1], uf = m[2] === 'Maranhão' ? 'MA' : 'PA'
  if (/\bentre\b/i.test(trecho)) return 'em deslocamento'
  for (const [re, nome] of APELIDOS) if (re.test(trecho)) return `${nome}, ${uf}`
  const achado = MUNICIPIOS.filter((n) => trecho.includes(n)).sort((a, b) => trecho.lastIndexOf(b) - trecho.lastIndexOf(a))[0]
  return achado ? `${achado}, ${uf}` : 'outros lugares'
}
