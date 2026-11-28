import { useEffect, useRef, useState } from 'react'
import Seo from '../components/Seo'
import NextLink from 'next/link'
import { buscarSonsEDownloads, ATUALIZAR_A_CADA } from '../lib/freesound'
import { rotuloDaTag, tagNaNuvem } from '../lib/sons'
import Cabecalho from '../components/Cabecalho'
import ListaDeSons from '../components/ListaDeSons'

// Nuvem de palavras-chave: cada palavra em português, num tamanho proporcional
// ao número de sons que a usam. Cada palavra leva à página dos seus sons.
// As tags em inglês, as genéricas e as técnicas ficam de fora (ver lib/palavras.json).

// FNV-1a: um número "aleatório" fixo para cada palavra (a nuvem sai sempre igual).
function hash(s) {
  let x = 0x811c9dc5
  for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 0x01000193) >>> 0 }
  return x
}

const tamanho = (peso) => 0.8 + peso * 0.95 // em em (as maiores crescem pela metade do que cresciam)

// Monta o formato de nuvem: faixas horizontais mais largas no meio e mais curtas em cima e embaixo.
// As palavras mais usadas ficam espalhadas pela nuvem (cada uma vira um pequeno centro),
// e as menores preenchem o espaço em volta.
// O desenho é refeito no navegador com a largura real da nuvem: em telas maiores, mais palavras por faixa
// (as palavras não crescem, a nuvem é que fica mais larga e mais baixa).
const LARGURA_INICIAL = 1180 // px: usada na página pronta, antes de medir a tela
const REM_INICIAL = 17.12 // px de 1rem no computador (fontes 7% maiores)
const AUREA = 0.618034 // espalha as palavras grandes sem repetir padrão
function montarFaixas(palavras, LARGURA = LARGURA_INICIAL, REM = REM_INICIAL) {
  const largura = (p) => (p.rotulo.length * 0.52 * tamanho(p.peso) + 0.9) * REM // estimativa em px
  const total = palavras.reduce((t, p) => t + largura(p), 0)
  // quantas faixas são necessárias para caber tudo, com folga para não quebrar linha
  // elipse "inflada" com ondulações: cada faixa um pouco mais larga ou mais curta, para o contorno ficar irregular, como nuvem
  const ondula = (k) => 1 + 0.11 * Math.sin(1.9 * k + 0.5) + 0.07 * Math.sin(0.7 * k + 2)
  const capacidade = (k, m) => Math.min(LARGURA * 0.97, LARGURA * (1 - Math.abs(k / (m + 0.6)) ** 2.6) ** (1 / 2.6) * ondula(k))
  const somaDe = (m) => { let s = 0; for (let k = -m; k <= m; k++) s += capacidade(k, m); return s }
  let m = 1
  const folga = LARGURA < 600 ? 0.8 : 1.0 // no celular as faixas são curtas: mais folga para não quebrar linha
  while (m < 60 && somaDe(m) * folga < total) m++
  const faixas = []
  for (let k = -m; k <= m; k++) {
    const cap = capacidade(k, m)
    // cada faixa também se desloca um pouco para a esquerda ou para a direita (sem sair da tela)
    const folga = Math.max(0, (1 - cap / LARGURA) / 2) * 100
    const desvio = Math.round(Math.min(folga, 3.5) * Math.sin(1.3 * k + 1) * 10) / 10
    faixas.push({ cap, desvio, usado: 0, grandes: [], pequenas: [] })
  }
  const ordem = [...palavras].sort((a, b) => b.peso - a.peso || hash(a.tag) - hash(b.tag))
  const grandes = ordem.filter((p) => p.peso >= 0.5)
  const pequenas = ordem.filter((p) => p.peso < 0.5).sort((a, b) => hash(a.tag) - hash(b.tag))
  // grandes: cada uma numa faixa diferente, saltando pela nuvem
  grandes.forEach((p, i) => {
    const f = faixas[Math.floor(((i * AUREA + 0.31) % 1) * faixas.length)]
    f.usado += largura(p)
    f.grandes.push(p)
  })
  // pequenas: sempre na faixa proporcionalmente mais vazia
  for (const p of pequenas) {
    const f = faixas.reduce((a, b) => (a.usado / a.cap <= b.usado / b.cap ? a : b))
    f.usado += largura(p)
    f.pequenas.push(p)
  }
  // dentro da faixa, as grandes ficam intercaladas entre as pequenas
  return faixas
    .map((f) => {
      const linha = [...f.pequenas]
      f.grandes.forEach((g, i) => {
        const pos = Math.round(((i + 0.5 + (hash(g.tag) % 100) / 250) / f.grandes.length) * linha.length)
        linha.splice(Math.min(pos + i, linha.length), 0, g)
      })
      return { largura: Math.round((f.cap / LARGURA) * 1000) / 10, desvio: f.desvio, palavras: linha }
    })
    .filter((f) => f.palavras.length)
}

export async function getStaticProps() {
  const { tags } = await buscarSonsEDownloads().catch(() => ({ tags: {} }))
  const lista = Object.entries(tags)
    .filter(([t]) => tagNaNuvem(t))
    .map(([tag, n]) => ({ tag, n, rotulo: rotuloDaTag(tag) }))
  const max = Math.max(1, ...lista.map((p) => p.n))
  const palavras = lista.map((p) => {
    const peso = Math.log(p.n) / Math.log(Math.max(max, 2)) // 0 (1 som) a 1 (a mais usada)
    return { ...p, peso: Math.round(peso * 100) / 100 }
  })
  // sem palavras (Freesound sem responder): tenta de novo em 1 minuto
  return { props: { palavras }, revalidate: palavras.length ? ATUALIZAR_A_CADA : 60 }
}

// Movimento: cada palavra flutua devagar (CSS); com o mouse, as vizinhas se afastam um pouco.
// Nada disso acontece para quem pediu "reduzir movimento" no aparelho.
const RAIO = 130 // px: até onde o mouse empurra
const EMPURRAO = 14 // px: o máximo que uma palavra se afasta
function useNuvemViva(ref, faixas) {
  useEffect(() => {
    const nuvem = ref.current
    if (!nuvem || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const links = [...nuvem.querySelectorAll('a')]
    let centros = null
    let quadro = 0
    let mouse = null
    const medir = () => {
      centros = links.map((a) => {
        const r = a.getBoundingClientRect()
        return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY }
      })
    }
    const desenhar = () => {
      quadro = 0
      if (!centros) medir()
      links.forEach((a, i) => {
        if (!mouse) return (a.style.translate = '')
        const dx = centros[i].x - mouse.x, dy = centros[i].y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d > RAIO || d < 1 || a.matches(':hover')) return (a.style.translate = '')
        const f = (1 - d / RAIO) * EMPURRAO
        a.style.translate = `${((dx / d) * f).toFixed(1)}px ${((dy / d) * f).toFixed(1)}px`
      })
    }
    const pedir = () => { if (!quadro) quadro = requestAnimationFrame(desenhar) }
    const mover = (e) => { if (e.pointerType !== 'mouse') return; mouse = { x: e.pageX, y: e.pageY }; pedir() }
    const sair = () => { mouse = null; pedir() }
    const remedir = () => { centros = null }
    // parado quando a nuvem não está na tela
    const vigia = new IntersectionObserver(([e]) => nuvem.classList.toggle('parada', !e.isIntersecting))
    vigia.observe(nuvem)
    nuvem.classList.add('viva')
    nuvem.addEventListener('pointermove', mover)
    nuvem.addEventListener('pointerleave', sair)
    window.addEventListener('resize', remedir)
    return () => {
      vigia.disconnect()
      nuvem.removeEventListener('pointermove', mover)
      nuvem.removeEventListener('pointerleave', sair)
      window.removeEventListener('resize', remedir)
      cancelAnimationFrame(quadro)
    }
  }, [ref, faixas])
}

// Janela que abre por cima da Nuvem com os sons de uma palavra (sem sair da página).
// Combinar até 3 palavras: no topo, "+ combinar palavra-chave" minimiza a janela e mostra a nuvem; a próxima palavra
// clicada entra na combinação e a janela volta, mostrando só os sons que têm todas. Clicar numa palavra-chave de um som
// também a acrescenta. Usa o <dialog> do navegador: fecha com Esc, com o botão "fechar" ou clicando fora.
const MAX_PALAVRAS = 3
function JanelaPalavra({ palavras, visivel, aoFechar, aoMudar, aoCombinar }) {
  const ref = useRef(null)
  const minimizando = useRef(false)
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState(null)
  const chave = palavras.map((p) => p.tag).join(',')
  useEffect(() => { // mostra ou minimiza a janela
    const d = ref.current
    if (!d || !chave) return
    if (visivel && !d.open) d.showModal()
    if (!visivel && d.open) { minimizando.current = true; d.close() }
  }, [visivel, chave])
  useEffect(() => { // busca os sons das palavras escolhidas
    const d = ref.current
    if (!chave) return
    setDados(null); setErro(null)
    if (d) d.scrollTop = 0
    let vivo = true
    fetch(`/api/sons-da-palavra?tag=${encodeURIComponent(chave)}`)
      .then((r) => r.json())
      .then((j) => { if (vivo) j.erro ? setErro(j.erro) : setDados(j) })
      .catch(() => vivo && setErro('Não foi possível buscar os sons agora.'))
    return () => { vivo = false }
  }, [chave])
  if (!palavras.length) return null
  const n = dados?.sons?.length || 0
  const acrescentar = (p) => {
    if (palavras.some((x) => x.tag === p.tag) || palavras.length >= MAX_PALAVRAS) return
    aoMudar([...palavras, p])
  }
  const tirar = (tag) => {
    const resto = palavras.filter((x) => x.tag !== tag)
    if (resto.length) aoMudar(resto); else ref.current.close()
  }
  const vagas = MAX_PALAVRAS - palavras.length
  return (
    <dialog ref={ref} className='janela-palavra' aria-labelledby='janela-palavra-titulo'
      onClose={() => { if (minimizando.current) minimizando.current = false; else aoFechar() }}
      onClick={(e) => { if (e.target === ref.current) ref.current.close() }}>
      <div className='janela-palavra-topo'>
        <h2 id='janela-palavra-titulo' className='janela-palavra-escolhidas'>
          {palavras.map((p, i) => (
            <span key={p.tag} className='palavra-escolhida'>
              {i > 0 && <span className='cor-600' aria-hidden='true'>+ </span>}
              <span className='palavra-titulo'>{p.rotulo}</span>
              {palavras.length > 1 && (
                <button type='button' className='tirar-palavra' onClick={() => tirar(p.tag)} aria-label={`tirar ${p.rotulo}`}>×</button>
              )}
            </span>
          ))}
          {Array.from({ length: vagas }, (_, k) => (
            <button key={k} type='button' className='vaga-palavra' onClick={aoCombinar}>+ combinar palavra-chave</button>
          ))}
          {dados && <span className='cor-600 qtd-sons'>({n} {n === 1 ? 'som' : 'sons'})</span>}
        </h2>
        <button type='button' className='janela-palavra-fechar' onClick={() => ref.current.close()}>fechar ✕</button>
      </div>
      {!dados && !erro && <p className='t-sm cor-600'>carregando os sons…</p>}
      {erro && <p className='t-sm cor-600'>{erro}</p>}
      {dados && n === 0 && <p className='t-sm cor-600'>nenhum som tem todas essas palavras. Tire uma delas (×) para ampliar a busca.</p>}
      {dados && n > 0 && <ListaDeSons key={chave} sons={dados.sons} mostrarColecao aoClicarTag={acrescentar} />}
    </dialog>
  )
}

// Faixa no rodapé enquanto a pessoa escolhe a próxima palavra na nuvem (janela minimizada).
function FaixaCombinar({ palavras, aoVoltar, aoCancelar }) {
  return (
    <div className='faixa-combinar' role='status'>
      <span>combinando <b>{palavras.map((p) => p.rotulo).join(' + ')}</b> + … clique em uma palavra para acrescentar</span>
      <button type='button' onClick={aoVoltar}>voltar aos sons</button>
      <button type='button' onClick={aoCancelar} aria-label='cancelar e fechar'>✕</button>
    </div>
  )
}

export default function Nuvem({ palavras }) {
  const ref = useRef(null)
  const total = palavras.length
  const [faixas, setFaixas] = useState(() => montarFaixas(palavras))
  // palavra aberta na janela; o clique normal abre a janela, e Ctrl/Cmd+clique continua abrindo a página da palavra
  const [abertas, setAbertas] = useState([])
  const [combinando, setCombinando] = useState(false) // janela minimizada, esperando a próxima palavra
  const abrir = (p) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    const nova = { tag: p.tag, rotulo: p.rotulo }
    if (combinando) {
      setAbertas((a) => (a.some((x) => x.tag === nova.tag) || a.length >= MAX_PALAVRAS ? a : [...a, nova]))
      setCombinando(false)
    } else setAbertas([nova])
  }
  // modo de ver as palavras: em nuvem, em ordem alfabética ou das mais frequentes às menos frequentes
  const [modo, setModo] = useState('nuvem')
  const [semente, setSemente] = useState(1) // muda a cada clique em "aleatória", para sortear uma nova ordem
  const lista = modo === 'alfabetica'
    ? [...palavras].sort((a, b) => a.rotulo.localeCompare(b.rotulo, 'pt-BR'))
    : modo === 'aleatoria'
      ? [...palavras].sort((a, b) => hash(a.tag + semente) - hash(b.tag + semente))
      : [...palavras].sort((a, b) => b.n - a.n || a.rotulo.localeCompare(b.rotulo, 'pt-BR'))
  // mede a nuvem e refaz o desenho para a largura desta tela (e de novo se a janela mudar de tamanho)
  useEffect(() => {
    let largura = 0
    const refazer = () => {
      const n = ref.current
      if (!n) return
      const w = n.clientWidth
      if (Math.abs(w - largura) < 40) return
      largura = w
      setFaixas(montarFaixas(palavras, w, parseFloat(getComputedStyle(n).fontSize)))
    }
    refazer()
    const obs = new ResizeObserver(refazer)
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [palavras])
  useNuvemViva(ref, faixas)
  return (
    <>
      <Seo titulo="Nuvem" descricao="As palavras que descrevem os sons do Banco Sonoro Amazônico. Escolha uma palavra, ou combine até três, para escutar os sons." caminho="/nuvem" />
      <div className='container'>
        <Cabecalho titulo="nuvem" frase="(ou como se aproximar dos sons pela palavra)" uso="clique em uma palavra para escutar os sons, ou mude a forma de ver logo abaixo." />
        <div className='pilha g-6 pb-10'>
          <div className='nuvem-modos t-xs' role='group' aria-label='Ver as palavras'>
            <span className='cor-600'>ver:</span>
            {[['nuvem', 'em nuvem'], ['alfabetica', 'em ordem alfabética'], ['frequentes', 'das mais frequentes'], ['aleatoria', 'em lista aleatória']].map(([id, nome]) => (
              <button key={id} type='button' aria-pressed={modo === id} className={modo === id ? 'ativo' : ''}
                onClick={() => { setModo(id); if (id === 'aleatoria') setSemente(Math.floor(Math.random() * 1e6)) }}>{nome}</button>
            ))}
          </div>
          {modo !== 'nuvem' && (
            <ul className='nuvem-lista'>
              {lista.map((p) => (
                <li key={p.tag}>
                  <NextLink href={`/tag/${encodeURIComponent(p.tag)}`} prefetch={false} rel='nofollow' className='link'
                    title={`${p.n} ${p.n === 1 ? 'som' : 'sons'}`} onClick={abrir(p)}>{p.rotulo}</NextLink>
                </li>
              ))}
            </ul>
          )}
          <div className='nuvem' ref={ref} hidden={modo !== 'nuvem'}>
            {faixas.map((f, i) => (
              <div key={i} className='nuvem-faixa' style={{ maxWidth: `${f.largura}%`, position: 'relative', left: `${f.desvio}%` }}>
                {f.palavras.map((p) => {
                  const h = hash(p.tag)
                  return (
                    <NextLink
                      key={p.tag}
                      href={`/tag/${encodeURIComponent(p.tag)}`}
                      prefetch={false}
                      title={`${p.n} ${p.n === 1 ? 'som' : 'sons'}`}
                      onClick={abrir(p)}
                      style={{
                        fontSize: `${tamanho(p.peso).toFixed(2)}em`,
                        fontWeight: p.peso > 0.6 ? 600 : 450,
                        '--cor': p.peso > 0.6 ? '#1A202C' : p.peso > 0.3 ? '#2D3748' : '#5E6A7D',
                        // ritmo próprio de cada palavra: duração de 5 a 9 s, começando em pontos diferentes
                        '--dur': `${5 + (h % 400) / 100}s`,
                        '--atraso': `-${(h >>> 9) % 900 / 100}s`,
                        '--dx': `${((h >>> 4) % 5) - 2}px`,
                      }}
                    >
                      {p.rotulo}
                    </NextLink>
                  )
                })}
              </div>
            ))}
          </div>
          <JanelaPalavra palavras={abertas} visivel={!combinando} aoFechar={() => setAbertas([])} aoMudar={setAbertas}
            aoCombinar={() => setCombinando(true)} />
          {combinando && abertas.length > 0 && (
            <FaixaCombinar palavras={abertas} aoVoltar={() => setCombinando(false)} aoCancelar={() => { setCombinando(false); setAbertas([]) }} />
          )}
          <p className='t-xs cor-600'>{total} palavras-chave em português. Os sons também têm palavras-chave em inglês, que aparecem junto de cada som.</p>
        </div>
      </div>
    </>
  )
}
