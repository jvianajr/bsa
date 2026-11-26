import Head from 'next/head'
import Cabecalho from '../components/Cabecalho'

// Mapa dos sons, incorporado do próprio Freesound ("Embed this map").
// Mostra todos os sons com localização da conta jose.viana.
const CENTRO = { lat: -3.2, lon: -49.5, zoom: 5 } // Pará: de Belém à região de Carajás

export default function Mapa() {
  const src = `https://freesound.org/embed/geotags_box/iframe/?c_lat=${CENTRO.lat}&c_lon=${CENTRO.lon}&z=${CENTRO.zoom}&username=jose.viana`
  return (
    <>
      <Head>
        <title>Mapa | Banco Sonoro Amazônico</title>
        <meta name="description" content="Mapa dos lugares onde os sons do Banco Sonoro Amazônico foram gravados." />
      </Head>
      <div className='container'>
        <Cabecalho titulo="Mapa" subtitulo="Os lugares onde os sons foram escutados e gravados. Clique em um ponto para ouvir." />
        <div className='pilha g-5 pb-10'>
          <div className='mapa-moldura'>
            <iframe
              src={src}
              title='Mapa dos sons do Banco Sonoro Amazônico'
              
            />
          </div>
          <p className='t-xs cor-600'>Mapa fornecido pelo freesound.org.</p>
        </div>
      </div>
    </>
  )
}
