import Head from 'next/head'
import Link from 'next/link'
import Cabecalho from '../components/Cabecalho'

// Declaração de acessibilidade. Não aparece no menu: chega-se aqui pelo "Saiba mais." do rodapé.
export default function Acessibilidade() {
  return (
    <>
      <Head>
        <title>Acessibilidade | Banco Sonoro Amazônico</title>
        <meta name="description" content="Estratégias de acessibilidade do site do Banco Sonoro Amazônico para leitores de tela e navegação por teclado." />
      </Head>
      <div className='container'>
        <Cabecalho titulo="acessibilidade" frase="(ou como este site procura ser escutado por todas as pessoas)"
          uso="leia o que o site oferece e conte para nós se encontrar alguma barreira." />
        <div className='pilha g-4 pb-10'>
          <p>Este site conta com estratégias de acessibilidade para leitores de tela e navegação por teclado:</p>
          <ul className='lista-simples'>
            <li>idioma declarado em português do Brasil, com as partes em inglês marcadas, para leitores de tela usarem a pronúncia certa;</li>
            <li>atalho para pular o menu: ao apertar a tecla Tab no começo da página, aparece o botão “Pular para o conteúdo”;</li>
            <li>foco visível: ao navegar pelo teclado, o item selecionado fica contornado;</li>
            <li>contraste adequado nos textos, inclusive nos menores;</li>
            <li>descrição em texto de cada som, junto do player;</li>
            <li>a <Link href='/nuvem'><b>nuvem</b></Link> de palavras também pode ser vista como lista: em ordem alfabética, pelas mais frequentes ou em ordem aleatória;</li>
            <li>os sons do <Link href='/mapa'><b>mapa</b></Link> também aparecem em lista, agrupados por lugar, logo abaixo dele;</li>
            <li>animações reduzidas para quem configura o computador ou o celular para ter menos movimento.</li>
          </ul>
          <p>Em preparação: vídeo de apresentação do projeto em Libras e legendas nos vídeos da <Link href='/mediacao'><b>mediação</b></Link>.</p>
          <p>Encontrou alguma barreira para navegar ou escutar? Escreva pelo <Link href='/contato'><b>contato</b></Link>. Sua mensagem ajuda a melhorar o site.</p>
        </div>
      </div>
    </>
  )
}
