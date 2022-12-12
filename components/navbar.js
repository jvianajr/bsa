import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
    return (
        <>
        <nav className={styles.navbar}>
        <div>
        <Link href="/">
        <Image src="/images/bsa_450px.png" 
        width="350" 
        height="34"
        alt="BancoSonoroAmazonico"/></Link>
        </div>
         <ul className={styles.link_items}>
            <li>
            <Link legacyBehavior href="/colecoes">
                <a>Coleções</a>
            </Link>
            </li>
            <li>
            <Link legacyBehavior href="/mediacao">
            <a>Mediação</a>
            </Link>
            </li>        
            <li>
            <Link legacyBehavior href="/sobre">
            <a>Sobre</a>
            </Link>
            </li>
            <li>
            <Link legacyBehavior href="/">
            <a>Contato</a>
            </Link>
            </li>
            </ul>
    </nav>
    </>
    )
}
