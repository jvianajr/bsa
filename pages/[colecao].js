import Seo from '../components/Seo'
import GradeColecoes from '../components/GradeColecoes'
import ListaDeSons from '../components/ListaDeSons'
import colecoes, { colecaoPorSlug } from '../lib/colecoes'
import { buscarPacotes, buscarSonsDoPacote, buscarColecoesVisiveis, ATUALIZAR_A_CADA } from '../lib/freesound'
import { prepararSom } from '../lib/sons'
import Cabecalho from '../components/Cabecalho'

// Uma página para cada coleção da lista em lib/colecoes.js.
// Os endereços antigos (ex.: /sonsdacasa) continuam iguais.
export async function getStaticPaths() {
  // 28/11: as páginas das coleções não são mais montadas na publicação (eram 24 páginas pedindo
  // sons ao Freesound ao mesmo tempo, e a montagem esbarrava no limite de pedidos). Cada uma é
  // montada na primeira visita e depois fica guardada como as outras (revalidate).
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const colecao = colecaoPorSlug(params.colecao)
  if (!colecao) return { notFound: true }
  let pacote, sons, visiveis
  try {
    const pacotes = await buscarPacotes()
    pacote = pacotes[colecao.pacote] || {}
    // Só pede a lista de sons se o pacote já tiver sons publicados.
    sons = pacote.num_sounds > 0 ? await buscarSonsDoPacote(colecao.pacote) : []
    visiveis = await buscarColecoesVisiveis()
  } catch (e) {
    // Freesound fora do ar ou no limite: o erro faz o site continuar mostrando a última versão boa
    // da página (só a primeira montagem de uma coleção fica sem página até o Freesound voltar).
    console.error('coleção', colecao.slug, e.message)
    throw e
  }
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

export default function Colecao({ colecao, sons, infopack, colecoes, falhou }) {
  return (
    <>
      <Seo titulo={infopack.name} caminho={`/${colecao.slug}`}
        descricao={`${infopack.name}: ${sons.length > 0 ? `${sons.length} sons` : 'sons'} do Banco Sonoro Amazônico${infopack.description ? `. ${infopack.description}` : ', gravados na Amazônia, para escutar e baixar.'}`.slice(0, 200)} />
      <div className='container'>
        <div className='pilha g-6'>
          <Cabecalho titulo={infopack.name} subtitulo={infopack.description || null} pb='2' />
          {sons.length > 0 ? (
            <p className='t-xs'>Esta coleção possui atualmente <i>{infopack.num_sounds}</i> elementos sonoros. Para escutar, clique no nome de um som e depois no botão <i>play</i>, no canto inferior da faixa sonora. Para baixar, use o botão <i>Download</i>: na primeira vez, você autoriza o acesso com a sua conta gratuita do <i>freesound.org</i>.</p>
          ) : (
            <p className='t-sm'>{falhou ? 'Não foi possível carregar os sons desta coleção agora. Tente de novo em alguns minutos.' : 'Os sons desta coleção estão em preparação e serão publicados em breve.'}</p>
          )}
          <div className='pb-5'>
            <ListaDeSons sons={sons} />
          </div>
          <h2 className='titulo pb-5'>
            Outras Coleções:
          </h2>
          <div className='grade-larga'><GradeColecoes colecoes={colecoes} atual={colecao.slug} solta aleatoria /></div>
        </div>
      </div>
    </>
  )
}
