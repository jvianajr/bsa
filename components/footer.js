import Link from 'next/link'
import styles from '../styles/Footer.module.css'


export default function Footer() {
    return (
    <footer className={styles.footer}> <p><span>Banco Sonoro Amazônico</span> desde 2022. Desenvolvido por <Link legacyBehavior href='/'><a>Estúdio Curica</a></Link> hospedado por <Link legacyBehavior href="http://github.com"><a>GitHub</a></Link> + <Link legacyBehavior href="http://vercel.com"><a>Vercel</a></Link>
</p> </footer>
    )
}
