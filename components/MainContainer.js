import Navbar from './navbar'
import Footer from './footer'
import { FUNDOS, PADRAO } from '../lib/visual'

// Estrutura de todas as páginas: menu no topo, conteúdo no meio, rodapé embaixo.
export default function MainContainer({ children }) {
  const variante = FUNDOS[PADRAO.fundo] || FUNDOS.original
  return (
    <>
      <Navbar />
      <div className={`fundo-principal ${variante.fixoNoComputador ? 'fundo-fixo' : ''}`} style={variante.css}>
        {/* largura total: assim todas as páginas começam no mesmo lugar */}
        <main style={{ width: '100%' }}>{children}</main>
      </div>
      <Footer />
    </>
  )
}
