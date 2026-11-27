import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { PADRAO } from '../lib/visual'

// Faixa do topo com espectrograma: 'claro' (bem suave, logo e menu escuros) ou 'escuro' (logo e menu em branco).
// A escolha fica em lib/visual.js (PADRAO).
const ESTILOS_TOPO = {
  claro: {
    classe: styles.claro,
    fundo: { backgroundColor: '#f4f4f4', backgroundImage: "url('/images/espectro-topo-claro.jpg')" },
    filtroLogo: 'none',
  },
  escuro: {
    classe: styles.escuro,
    fundo: { backgroundColor: '#4a4a4a', backgroundImage: "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.38)), url('/images/espectro-topo.jpg')" },
    filtroLogo: 'invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.35))',
  },
}

// Itens do menu principal (computador).
export const MENU = [
  { href: '/', nome: 'Início' },
  { href: '/colecoes', nome: 'Coleções' },
  { href: '/mapa', nome: 'Mapa' },
  { href: '/nuvem', nome: 'Nuvem' },
  { href: '/mediacao', nome: 'Mediação' },
  { href: '/ecos', nome: 'Ecos' },
  { href: '/ficha-tecnica', nome: 'Ficha técnica' },
]

// Também ficam no rodapé (como ícones); no celular aparecem por extenso no menu.
export const MENU_RODAPE = [
  { href: '/ficha-tecnica', nome: 'Ficha técnica' },
  { href: '/contato', nome: 'Contato' },
  { href: 'https://instagram.com/bancosonoroamazonico', nome: 'Instagram' },
]

const IconeMenu = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'><path fill='currentColor' d='M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z' /></svg>
)
const IconeFechar = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'><path fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' d='M6 6l12 12M18 6L6 18' /></svg>
)

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const router = useRouter()
  const topo = ESTILOS_TOPO[PADRAO.topo] || ESTILOS_TOPO.escuro

  // fecha o menu do celular ao trocar de página
  useEffect(() => {
    const fechar = () => setAberto(false)
    router.events.on('routeChangeStart', fechar)
    return () => router.events.off('routeChangeStart', fechar)
  }, [router.events])

  // item do menu da página aberta (coleções e tags contam como Coleções e Nuvem)
  const caminho = router.pathname
  const ativo = (href) => href === '/' ? caminho === '/'
    : caminho.startsWith(href) || (href === '/colecoes' && caminho === '/[colecao]') || (href === '/nuvem' && caminho.startsWith('/tag'))

  return (
    <header className={`${styles.topo} ${topo.classe}`} style={topo.fundo}>
      <div className={styles.logo}>
        <Link href="/" aria-label="Banco Sonoro Amazônico, página inicial">
          <Image src="/images/bsa_400px.png" width="400" height="39" alt="Banco Sonoro Amazonico" priority
            style={{ filter: topo.filtroLogo, maxWidth: '100%', height: 'auto' }} />
        </Link>
      </div>

      {/* computador: lista horizontal */}
      <nav className={styles.computador} aria-label='Menu principal'>
        <ul className={styles.link_items}>
          {MENU.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={ativo(item.href) ? styles.ativo : undefined}
                aria-current={ativo(item.href) ? 'page' : undefined}>{item.nome}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* celular: botão que abre e fecha o menu */}
      <div className={styles.celular}>
        <button type='button' className={styles.botao_menu} onClick={() => setAberto(!aberto)}
          aria-expanded={aberto} aria-controls='menu-celular'>
          {aberto ? <IconeFechar /> : <IconeMenu />} Menu
        </button>
        <div className={`${styles.gaveta} ${aberto ? styles.gaveta_aberta : ''}`}>
          <div>
            <nav id='menu-celular' className={styles.menu_celular} aria-label='Menu'>
              {[...MENU, ...MENU_RODAPE.filter((r) => !MENU.some((m) => m.href === r.href))].map((item) => (
                <Link key={item.href} href={item.href} tabIndex={aberto ? 0 : -1}
                  {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{item.nome}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
