import Link from 'next/link'

// Ícones de contorno, todos com o mesmo traço
const traco = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round', className: 'icone', 'aria-hidden': true }

const InfoIcon = () => (
  <svg {...traco}>
    <circle cx='12' cy='12' r='9' />
    <line x1='12' y1='11' x2='12' y2='16.5' />
    <circle cx='12' cy='7.6' r='0.6' fill='currentColor' stroke='none' />
  </svg>
)

const EnvelopeIcon = () => (
  <svg {...traco}>
    <rect x='3' y='5' width='18' height='14' rx='2.5' />
    <path d='M4 7l8 6 8-6' />
  </svg>
)

// Ícone do Instagram (contorno simples: câmera arredondada)
const InstagramIcon = () => (
  <svg {...traco}>
    <rect x='3' y='3' width='18' height='18' rx='5' />
    <circle cx='12' cy='12' r='4' />
    <circle cx='17.3' cy='6.7' r='0.6' fill='currentColor' stroke='none' />
  </svg>
)

const ICONES = [
  { href: '/ficha-tecnica', nome: 'Ficha técnica', icone: InfoIcon },
  { href: '/contato', nome: 'Contato', icone: EnvelopeIcon },
  { href: 'https://instagram.com/bancosonoroamazonico', nome: 'Instagram do Banco Sonoro Amazônico', icone: InstagramIcon, externo: true },
]

export default function Footer() {
  return (
    <footer className='pilha g-3' style={{ padding: '70px', alignItems: 'center' }}>
      <div className='linha g-6'>
        {ICONES.map(({ href, nome, icone: Icone, externo }) => (
          <Link key={href} href={href} aria-label={nome} data-dica={nome} className='dica'
            {...(externo ? { target: '_blank', rel: 'noreferrer' } : {})}>
            <Icone />
          </Link>
        ))}
      </div>
      <div className='linha quebra' style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <p className='t-xs centro' style={{ padding: '.75rem' }}><b>Banco Sonoro Amazônico</b> hospeda seus arquivos na plataforma <a href="https://freesound.org" target="_blank" rel="noreferrer"><i>Freesound.org</i></a>.</p>
        <p className='t-xs centro' style={{ padding: '.75rem' }}>Desenvolvido por <Link href='/'><b>Estúdio Curica</b></Link> + Claude.AI com tecnologia <a href="https://github.com/" target="_blank" rel="noreferrer"><i>GitHub</i></a> + <a href="https://vercel.com" target="_blank" rel="noreferrer"><i>Vercel</i></a>.</p>
      </div>
      <p className='t-xs centro' style={{ padding: '0 .75rem .75rem' }}>Este site conta com estratégias de acessibilidade para leitores de tela e navegação por teclado. <Link href='/acessibilidade'><b>Saiba mais</b></Link>.</p>
    </footer>
  )
}
