import Head from 'next/head'
import NextLink from 'next/link'
import { buscarSonsEDownloads, ATUALIZAR_A_CADA } from '../lib/freesound'
import { rotuloDaTag, tagNaNuvem } from '../lib/sons'
import Cabecalho from '../components/Cabecalho'

// Nuvem de palavras-chave: cada palavra em português, num tamanho proporcional
// ao número de sons que a usam. Cada palavra leva à página dos seus sons.
// As tags em inglês, as genéricas e as técnicas ficam de fora (ver lib/palavras.json).

// "Embaralha" sempre da mesma forma, para a nuvem não ficar em ordem alfabética.
function misturar(lista) {
  // FNV-1a: espalha bem palavras parecidas, sem depender do tamanho delas
  const h = (s) => {
    let x = 0x811c9dc5
    for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 0x01000193) >>> 0 }
    return x
  }
  return [...lista].sort((a, b) => h(a.tag) - h(b.tag))
}

export async function getStaticProps() {
  const { tags } = await buscarSonsEDownloads().catch(() => ({ tags: {} }))
  const lista = Object.entries(tags)
    .filter(([t]) => tagNaNuvem(t))
    .map(([tag, n]) => ({ tag, n, rotulo: rotuloDaTag(tag) }))
  const max = Math.max(1, ...lista.map((p) => p.n))
  const palavras = misturar(lista).map((p) => {
    const peso = Math.log(p.n) / Math.log(Math.max(max, 2)) // 0 (1 som) a 1 (a mais usada)
    return { ...p, peso: Math.round(peso * 100) / 100 }
  })
  return { props: { palavras }, revalidate: ATUALIZAR_A_CADA }
}

export default function Nuvem({ palavras }) {
  return (
    <>
      <Head>
        <title>Nuvem | Banco Sonoro Amazônico</title>
        <meta name="description" content="Nuvem de palavras-chave dos sons do Banco Sonoro Amazônico." />
      </Head>
      <div className='container'>
        <Cabecalho titulo="Nuvem" subtitulo="As palavras que descrevem os sons. Quanto maior, mais sons ela reúne. Clique numa palavra para escutar." />
        <div className='pilha g-6 pb-10'>
          <div className='nuvem'>
            {palavras.map((p) => (
              <NextLink
                key={p.tag}
                href={`/tag/${encodeURIComponent(p.tag)}`}
                title={`${p.n} ${p.n === 1 ? 'som' : 'sons'}`}
                style={{
                  fontSize: `${(0.8 + p.peso * 1.9).toFixed(2)}rem`,
                  fontWeight: p.peso > 0.6 ? 600 : 400,
                  color: p.peso > 0.6 ? '#1A202C' : p.peso > 0.3 ? '#2D3748' : '#718096',
                }}
              >
                {p.rotulo}
              </NextLink>
            ))}
          </div>
          <p className='t-xs cor-600'>{palavras.length} palavras-chave em português. Os sons também têm palavras-chave em inglês, que aparecem junto de cada som.</p>
        </div>
      </div>
    </>
  )
}
