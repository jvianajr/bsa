import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'

import { Flex, Spacer } from '@chakra-ui/react'


export default function Navbar() {
    return (
    <>
    <Flex p="5" minWidth='max-content' alignItems='center' justifyContent='center' flexWrap>
        <Link href="/">
        <Image src="/images/bsa_450px.png" 
        width="450" 
        height="44"
        alt="BancoSonoroAmazonico"/></Link>
        </Flex>
        <Flex pt="1" pb="5" alignItems='center' justifyContent='center' flexWrap borderBottom="1px" borderBottomColor="gray.3600">
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
    </Flex>
    </>
    )
}