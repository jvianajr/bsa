import Navbar from './navbar' 
import Footer from './footer' 
import Head from 'next/head'
import styles from '../styles/MainContainer.module.css'

export default function MainContainer({children}) {
    return (
        <>
        <Head>
<link rel="shortcut icon" href="/images/favicon.ico"/>
<title>Banco Sonoro Amazônico</title>
        </Head>
        <Navbar />
        <main className={styles.container}>{children}</main>
        <Footer />
        </>
    )
}