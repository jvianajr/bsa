import Seo from '../../components/Seo'
import NextLink from 'next/link'
import ListaDeSons from '../../components/ListaDeSons'
import { buscarSonsPorTag, ATUALIZAR_A_CADA } from '../../lib/freesound'
import { prepararSom, rotuloDaTag } from '../../lib/sons'
import Cabecalho from '../../components/Cabecalho'

// Página de uma palavra-chave (tag): todos os sons do BSA que têm essa tag.
// As páginas são geradas na primeira visita e atualizadas a cada hora.
export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const tag = String(params.tag || '').toLowerCase()
  if (!/^[a-z0-9-]{1,60}$/.test(tag)) return { notFound: true, revalidate: ATUALIZAR_A_CADA }
  const sons = await buscarSonsPorTag(tag)
  if (!sons.length) return { notFound: true, revalidate: ATUALIZAR_A_CADA }
  return {
    props: { tag, rotulo: rotuloDaTag(tag), sons: sons.map(prepararSom) },
    revalidate: ATUALIZAR_A_CADA,
  }
}

export default function PaginaDaTag({ tag, rotulo, sons }) {
  const n = sons.length
  return (
    <>
      <Seo titulo={rotulo} caminho={`/tag/${encodeURIComponent(tag)}`}
        descricao={`${sons.length} ${sons.length === 1 ? 'som' : 'sons'} do Banco Sonoro Amazônico com a palavra-chave "${rotulo}".`} />
      <div className='container'>
        <div className='pilha g-6'>
          <Cabecalho titulo={rotulo} subtitulo={`${n === 1 ? 'Um elemento sonoro tem' : `${n} elementos sonoros têm`} esta palavra-chave.`} pb='2' />
          <p className='t-xs'>
            Dos mais baixados aos menos baixados. Clique em outra palavra-chave, embaixo de cada som, para seguir navegando, ou volte à <NextLink href='/nuvem' className='seminegrito link'>Nuvem</NextLink>.
          </p>
          <div className='pb-10'>
            <ListaDeSons sons={sons} mostrarColecao />
          </div>
        </div>
      </div>
    </>
  )
}
