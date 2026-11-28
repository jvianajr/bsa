import Seo from '../components/Seo'
import GradeColecoes from '../components/GradeColecoes'
import { buscarColecoesVisiveis, ATUALIZAR_A_CADA } from '../lib/freesound'
import Cabecalho from '../components/Cabecalho'

export async function getStaticProps() {
  return {
    props: { colecoes: await buscarColecoesVisiveis() },
    revalidate: ATUALIZAR_A_CADA,
  }
}

export default function Colecoes({ colecoes }) {
  return (
    <>
      <Seo titulo="Coleções" descricao="Os sons do Banco Sonoro Amazônico organizados pelos lugares e situações em que foram escutados: ilha, praia, beira, sítio, cidade, trem, garimpo, feira e outras coleções." caminho="/colecoes" />
      <div className='container'>
        <Cabecalho titulo="coleções" frase="(ou como categorizar o mundo atento às armadilhas da categorização)." uso="escolha uma coleção e dê play nos sons para escutar." />
        <div className='pb-10 grade-larga'><GradeColecoes colecoes={colecoes} solta /></div>
      </div>
    </>
  )
}
