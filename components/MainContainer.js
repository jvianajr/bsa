import Navbar from './navbar'
import Footer from './footer'
import { FUNDOS, PADRAO } from '../lib/visual'

// Estrutura de todas as páginas: menu no topo, conteúdo no meio, rodapé embaixo.
export default function MainContainer({ children }) {
  const variante = FUNDOS[PADRAO.fundo] || FUNDOS.original
  return (
    <>
      {/* atalho para teclado e leitor de tela: aparece só ao apertar Tab e pula o menu */}
      <a href='#conteudo' className='pular-para-conteudo'>Pular para o conteúdo</a>
      <Navbar />
      <div className={`fundo-principal ${variante.fixoNoComputador ? 'fundo-fixo' : ''}`} style={variante.css}>
        {/* largura total: assim todas as páginas começam no mesmo lugar */}
        <main id='conteudo' tabIndex={-1} style={{ width: '100%', outline: 'none' }}>{children}</main>
      </div>
      <Footer />
    </>
  )
}
