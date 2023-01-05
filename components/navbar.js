import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'

import { Flex, Spacer } from '@chakra-ui/react'


export default function Navbar() {
    return (
    <>
    <Flex p="5" alignItems='center' justifyContent='center'>
        <Link href="/">
        <Image src="/images/bsa_400px.png" 
        width="400" 
        height="39"
        alt="Banco Sonoro Amazonico"
        priority="true"/></Link>
        </Flex>
        <Flex pl="5" pt="1" pb="5" justifyContent='center' borderBottom="1px" borderBottomColor="gray.600">
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
            <Link legacyBehavior href="/contato">
            <a>Contato</a>
            </Link>
            </li>
            </ul>
    </Flex>
    </>
    )
}