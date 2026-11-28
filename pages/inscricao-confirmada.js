import Seo from '../components/Seo'
import Link from 'next/link'
import Cabecalho from '../components/Cabecalho'

// Página para onde a pessoa vai depois de confirmar a inscrição no e-mail do Brevo.
export default function InscricaoConfirmada() {
  return (
    <>
      <Seo titulo="Inscrição confirmada" caminho="/inscricao-confirmada" naoIndexar />
      <div className='container'>
        <Cabecalho titulo="Inscrição confirmada!" subtitulo="Obrigado por acompanhar o Banco Sonoro Amazônico. Você vai receber as novidades por e-mail." />
        <div className='pilha g-5 pb-10'>
          <p>
            Enquanto isso, conheça o que já está disponível nas <Link href='/colecoes'><b>coleções</b></Link>, ou por meio do <Link href='/mapa'><b>mapa</b></Link> ou da <Link href='/nuvem'><b>nuvem</b></Link>.
          </p>
        </div>
      </div>
    </>
  )
}
