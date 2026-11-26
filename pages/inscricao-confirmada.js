import Head from 'next/head'
import Link from 'next/link'
import Cabecalho from '../components/Cabecalho'

// Página para onde a pessoa vai depois de confirmar a inscrição no e-mail do Brevo.
export default function InscricaoConfirmada() {
  return (
    <>
      <Head>
        <title>Inscrição confirmada | Banco Sonoro Amazônico</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className='container'>
        <Cabecalho titulo="Inscrição confirmada!" subtitulo="Obrigado por acompanhar o Banco Sonoro Amazônico. Você vai receber as novidades por e-mail." />
        <div className='pilha g-5 pb-10'>
          <p>
            Enquanto isso, escute as <Link href='/colecoes'><b>Coleções</b></Link>.
          </p>
        </div>
      </div>
    </>
  )
}
