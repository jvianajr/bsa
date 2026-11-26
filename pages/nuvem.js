import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { buscarSonsEDownloads, ATUALIZAR_A_CADA } from '../lib/freesound'
import { rotuloDaTag, tagNaNuvem } from '../lib/sons'
import Cabecalho from '../components/Cabecalho'

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
  return { props: { palavras }, revalidate: ATUALIZAR_A_CADA }
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

export default function Nuvem({ palavras }) {
  const ref = useRef(null)
  const total = palavras.length
  const [faixas, setFaixas] = useState(() => montarFaixas(palavras))
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
      <Head>
        <title>Nuvem | Banco Sonoro Amazônico</title>
        <meta name="description" content="Nuvem de palavras-chave dos sons do Banco Sonoro Amazônico." />
      </Head>
      <div className='container'>
        <Cabecalho titulo="Nuvem" subtitulo="As palavras que descrevem os sons. Quanto maior, mais sons ela reúne. Clique numa palavra para escutar." />
        <div className='pilha g-6 pb-10'>
          <div className='nuvem' ref={ref}>
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
                      style={{
                        fontSize: `${tamanho(p.peso).toFixed(2)}em`,
                        fontWeight: p.peso > 0.6 ? 600 : 400,
                        '--cor': p.peso > 0.6 ? '#1A202C' : p.peso > 0.3 ? '#2D3748' : '#718096',
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
          <p className='t-xs cor-600'>{total} palavras-chave em português. Os sons também têm palavras-chave em inglês, que aparecem junto de cada som.</p>
        </div>
      </div>
    </>
  )
}
