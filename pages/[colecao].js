import GradeColecoes from '../components/GradeColecoes'
import ListaDeSons from '../components/ListaDeSons'
import colecoes, { colecaoPorSlug } from '../lib/colecoes'
import { buscarPacotes, buscarSonsDoPacote, buscarColecoesVisiveis, ATUALIZAR_A_CADA } from '../lib/freesound'
import { prepararSom } from '../lib/sons'
import Cabecalho from '../components/Cabecalho'

// Uma página para cada coleção da lista em lib/colecoes.js.
// Os endereços antigos (ex.: /sonsdacasa) continuam iguais.
export async function getStaticPaths() {
  return {
    paths: colecoes.map((c) => ({ params: { colecao: c.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const colecao = colecaoPorSlug(params.colecao)
  const pacotes = await buscarPacotes()
  const pacote = pacotes[colecao.pacote] || {}
  // Só pede a lista de sons se o pacote já tiver sons publicados.
  const sons = pacote.num_sounds > 0 ? await buscarSonsDoPacote(colecao.pacote) : []
  const visiveis = await buscarColecoesVisiveis()
  return {
    props: {
      colecao,
      infopack: {
        name: pacote.name || colecao.nome,
        description: pacote.description || '',
        num_sounds: sons.length,
      },
      sons: sons.map(prepararSom),
      colecoes: visiveis,
    },
    revalidate: ATUALIZAR_A_CADA,
  }
}

export default function Colecao({ colecao, sons, infopack, colecoes }) {
  return (
    <>
      <div className='container'>
        <div className='pilha g-6'>
          <Cabecalho titulo={infopack.name} subtitulo={infopack.description || null} pb='2' />
          {sons.length > 0 ? (
            <p className='t-xs'>Esta coleção possui atualmente <i>{infopack.num_sounds}</i> elementos sonoros. Para escutar, clique no nome de um som e depois no botão <i>play</i>, no canto inferior da faixa sonora. Para baixar, use o botão <i>Download</i>: na primeira vez, você autoriza o acesso com a sua conta gratuita do <i>freesound.org</i>.</p>
          ) : (
            <p className='t-sm'>Os sons desta coleção estão em preparação e serão publicados em breve.</p>
          )}
          <div className='pb-5'>
            <ListaDeSons sons={sons} />
          </div>
          <h2 className='titulo pb-5'>
            Outras Coleções:
          </h2>
          <GradeColecoes colecoes={colecoes} atual={colecao.slug} />
        </div>
      </div>
    </>
  )
}
