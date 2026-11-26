import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Logos from '../components/Logos'
import Newsletter from '../components/Newsletter'
import BichinhosAnimados from '../components/BichinhosAnimados'
import SomDeExemplo from '../components/SomDeExemplo'

import { buscarColecoesVisiveis, buscarSonsEDownloads, ATUALIZAR_A_CADA } from '../lib/freesound'
import { buscarTotalVisitas, VISITAS_DESDE } from '../lib/visitas'
import Cabecalho from '../components/Cabecalho'
import Janela from '../components/Janela'

export async function getStaticProps() {
  const colecoes = await buscarColecoesVisiveis()
  // Se a contagem de downloads ou de visitas falhar, a página abre sem essas informações.
  const sons = await buscarSonsEDownloads().catch(() => ({ total: null, ids: [] }))
  const visitas = await buscarTotalVisitas().catch(() => null)
  return {
    props: {
      downloads: sons.total,
      idsDosSons: sons.ids,
      visitas,
      quant: colecoes.reduce((total, c) => total + c.numSons, 0),
      numColecoes: colecoes.length,
    },
    revalidate: ATUALIZAR_A_CADA
  }
}

const LICENCA_URL = 'https://creativecommons.org/licenses/by-nc/4.0/deed.pt_BR'

export default function Home({ quant, numColecoes, downloads, visitas, idsDosSons }) {
  return (
    <>
      <Head>
        <title>Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido"></meta>
        <meta name="description" content="Uma coleção de sons da paisagem amazônica, escute, baixe, crie e compartilhe."></meta>
      </Head>
      <div className='container'>
        <div className='pilha g-4 pb-5'>
          <Cabecalho titulo="Uma coleção de sons" subtitulo={<>para escutar (<i>com fones de ouvido</i>) e fazer ecoar se desejar.</>} pb="12" />
          <BichinhosAnimados />
          <p className='pt-10'>O <b>Banco Sonoro Amazônico</b> é um projeto de construção e partilha de recursos sonoros obtidos a partir de experiências de deslocamento, convívio e escuta das diferentes realidades amazônicas.</p>
          <p>Os sons são disponibilizados gratuitamente para usos não comerciais pela plataforma <i>freesound.org</i>, sob licença <i>Creative Commons</i> CC BY-NC 4.0.</p>
          <p>Atualmente o BSA está na versão 2.0 e conta com <b> {quant} elementos sonoros</b>, organizados em <i>{numColecoes} coleções</i>.</p>
        </div>
        <div className='acordeao pt-10 pb-10'>
          <Janela titulo="Qual a intenção do projeto?">
            <p>O BSA foi inicialmente pensado como fonte de recursos sonoros para outras criações — montagens, remixagens e experimentações com diversas linguagens —, mas também se constitui como um dispositivo de escuta e de memória, contribuindo para conceber, de forma fragmentária e a partir das múltiplas realidades, possíveis ideias sobre a Amazônia.</p>
          </Janela>
          <Janela titulo="Como navegar no site?">
            <p>O site foi projetado para funcionar no computador e no celular, sendo uma obra acessível em qualquer lugar e tempo. Sugerimos o uso de fones de ouvido.</p>
            <p>Para navegar, basta acessar as <Link href="/colecoes"><b>Coleções</b></Link> no menu acima. Clique no nome de um som para abrir o player e, depois, no botão ►, no canto inferior esquerdo.</p>
            <SomDeExemplo ids={idsDosSons} />
          </Janela>
          <Janela titulo="Como baixar os sons?">
            <p>Você pode baixar e utilizar os sons em sua própria criação desde que respeite a licença de uso e o faça com responsabilidade.</p>
            <p>Os sons ficam hospedados na plataforma <i>freesound.org</i>, e para baixá-los é necessário ter uma conta gratuita lá. É simples e rápido: basta preencher o <a href="https://freesound.org/home/register/" target="_blank" rel="noreferrer"><b>formulário de cadastro</b></a> e confirmar pelo e-mail.</p>
            <p>Com a conta criada, clique no botão <b>Download</b> abaixo do player. Na primeira vez, o Freesound pede que você autorize o Banco Sonoro Amazônico a baixar os sons com a sua conta; depois disso, os downloads acontecem direto aqui no site, sem precisar sair dele.</p>
          </Janela>
          <Janela titulo="Como funciona o licenciamento para uso em meu projeto?">
            <p>Os sons têm o amparo legal da licença <a href={LICENCA_URL} target="_blank" rel="noreferrer"><b>Creative Commons CC BY-NC 4.0</b></a>, que permite copiar, remixar e transformar os sons desde que a autoria seja citada e <b>sem fins comerciais</b>. A licença também aparece junto de cada som, ao lado do botão de <i>download</i>.</p>
            <p>Ao usar os sons no seu projeto, cite nos créditos:</p>
            <div className='citacao'>
              <i>Banco Sonoro Amazônico / José Viana, licença CC BY-NC 4.0, agradecimentos (quando o som tiver)</i>
            </div>
            <p>Alguns sons trazem agradecimentos a pessoas e comunidades que tornaram a gravação possível. Eles aparecem junto do som, abaixo do player; nesses casos, inclua-os também nos créditos.</p>
            <p>Para uso comercial, entre em contato pela aba <Link href="/contato"><b>Contato</b></Link>.</p>
            <p>Ficaremos contentes em conhecer o seu projeto: se possível, envie pela aba <Link href="/ecos"><b>Ecos</b></Link>.</p>
          </Janela>
          <Janela titulo="Quem torna este projeto possível?">
            <p>O projeto é concebido e realizado por José Viana, com diversos apoios, parcerias e financiamentos públicos. Na <Link href="/ficha-tecnica"><b>Ficha técnica</b></Link> estão os nomes das pessoas, comunidades e instituições que tornaram possível a realização de cada etapa.</p>
            <p>A primeira etapa (2022), <i>Imersão, criação e partilha</i>, foi realizada com o <b>Prêmio Preamar de Cultura e Arte 2022</b> (Edital nº 001/2022), da Secretaria de Cultura do Governo do Estado do Pará.</p>
            <div className='pb-4'>
              <Image src="/images/preamar-secult.png" width="300" height="100" alt="Preamar Cultura e Arte 2022" />
            </div>
            <p>A segunda etapa (2026), <i>Etapa Carajás</i>, foi realizada com o <b>Edital nº 002/2025 - Cultura Digital</b>, da Política Nacional Aldir Blanc de Fomento à Cultura - PNAB 2025, Governo Federal e Governo do Estado do Pará.</p>
            <div className='pb-4'><Logos alinhamento="left" legenda={false} /></div>
          </Janela>
          <Janela titulo="Utilizei alguns sons. Posso contribuir financeiramente?">
            <p>Sim. Você pode fazer contribuições livres pela chave PIX <b>bancosonoroamazonico@gmail.com</b> ou pelo QR Code abaixo:</p>
            <div className='pt-5 pb-5 centro'>
              <Image src="/images/pix_bsa.jpg" width="170" height="170" alt="QR Code do PIX do Banco Sonoro Amazônico" style={{ margin: '0 auto' }} />
              <p className='t-sm' style={{ padding: '1.25rem' }}>Ou copie e cole as informações do PIX:</p>
              <div className='seminegrito t-xs quebra-palavras' style={{ width: 300, margin: '0 auto' }}>
                00020101021126520014br.gov.bcb.pix0130bancosonoroamazonico@gmail.com5204000053039865802BR5918JOSE DE A V JUNIOR6005BELEM62070503***63044544
              </div>
            </div>
          </Janela>
        </div>
        <Newsletter />
        <div className='pilha g-4 pb-5 pt-10'>
          {(visitas > 0 || downloads > 0) && (
            <p className='centro t-sm'>
              {visitas > 0 && <>Este site recebeu <b>{visitas.toLocaleString('pt-BR')} visitas</b> desde {VISITAS_DESDE}. </>}
              {downloads > 0 && <>Ao todo, <b>{downloads.toLocaleString('pt-BR')} downloads</b> já foram feitos de elementos do Banco Sonoro Amazônico.</>}
              {' '}Os números se atualizam de hora em hora.
            </p>
          )}
          <p className='centro pt-7'>Agradecemos a visita!</p>
        </div>
      </div>
    </>
  )
}

