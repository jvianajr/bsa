import Head from 'next/head'
import Cabecalho from '../components/Cabecalho'
import Janela from '../components/Janela'
import ListaDeSons from '../components/ListaDeSons'
import { buscarTodosOsSons, ATUALIZAR_A_CADA } from '../lib/freesound'
import { prepararSom, lugarDoSom } from '../lib/sons'

// Mapa dos sons, incorporado do próprio Freesound ("Embed this map").
// Mostra todos os sons com localização da conta jose.viana.
// Embaixo, a mesma informação em texto: os sons agrupados por lugar (para quem não usa o mouse ou usa leitor de tela).
const CENTRO = { lat: -3.2, lon: -49.5, zoom: 5 } // Pará: de Belém à região de Carajás

export async function getStaticProps() {
  const sons = await buscarTodosOsSons().catch(() => null)
  if (!sons) return { props: { lugares: [], falhou: true }, revalidate: 60 } // tenta de novo em 1 minuto
  const grupos = {}
  for (const s of sons) (grupos[lugarDoSom(s.description)] ||= []).push(prepararSom(s))
  const fim = ['em deslocamento', 'outros lugares'] // estes dois vão para o fim da lista
  const lugares = Object.keys(grupos)
    .sort((a, b) => (fim.indexOf(a) - fim.indexOf(b)) || a.localeCompare(b, 'pt-BR'))
    .map((nome) => ({ nome, sons: grupos[nome].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')) }))
  return { props: { lugares }, revalidate: ATUALIZAR_A_CADA }
}

export default function Mapa({ lugares = [], falhou = false }) {
  const src = `https://freesound.org/embed/geotags_box/iframe/?c_lat=${CENTRO.lat}&c_lon=${CENTRO.lon}&z=${CENTRO.zoom}&username=jose.viana`
  return (
    <>
      <Head>
        <title>Mapa | Banco Sonoro Amazônico</title>
        <meta name="description" content="Mapa dos lugares onde os sons do Banco Sonoro Amazônico foram gravados." />
      </Head>
      <div className='container'>
        <Cabecalho titulo="mapa" frase="(ou como se aproximar dos sons pela sua referência geoespacial)" uso="arraste o mapa com o mouse, use a rodinha ou os botões + e − para aproximar e clique em um ponto para ouvir. Logo abaixo do mapa, os mesmos sons aparecem em lista, por lugar." />
        <div className='pilha g-5 pb-10'>
          <div className='mapa-moldura'>
            <iframe
              src={src}
              title='Mapa dos sons do Banco Sonoro Amazônico'
            />
          </div>
          <p className='t-xs cor-600'>Mapa fornecido pelo freesound.org.</p>
          {falhou && <p className='t-sm cor-600 pt-6'>A lista de sons por lugar não pôde ser carregada agora. Tente recarregar a página em alguns instantes.</p>}
          {lugares.length > 0 && (
            <section aria-labelledby='sons-por-lugar' className='pilha g-2 pt-6'>
              <h2 id='sons-por-lugar' className='titulo titulo-xs'>sons por lugar</h2>
              <div className='acordeao'>
                {lugares.map((l) => (
                  <Janela key={l.nome} grupo='lugares' alinhada espaco={1}
                    titulo={`${l.nome} (${l.sons.length} ${l.sons.length === 1 ? 'som' : 'sons'})`}>
                    <ListaDeSons sons={l.sons} mostrarColecao />
                  </Janela>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
