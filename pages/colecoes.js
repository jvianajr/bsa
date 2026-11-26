import Head from 'next/head'
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
      <Head>
        <title>Coleções | Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido collections praia rio ilha cidade bairro casa beira porto sitio igarape"></meta>
        <meta name="description" content="O Banco Sonoro Amazônico é uma coleção digital de sons coletados na paisagem, disponibilizados gratuitamente através da plataforma freesound.org, sob licença creative commons."></meta>
      </Head>
      <div className='container'>
        <Cabecalho titulo="Coleções" subtitulo="Os sons organizados pelos lugares e situações em que foram escutados." />
        <div className='pb-10'><GradeColecoes colecoes={colecoes} /></div>
      </div>
    </>
  )
}
