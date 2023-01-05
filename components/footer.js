import Link from 'next/link'
import styles from '../styles/Footer.module.css'
import { Text, Box, Flex } from '@chakra-ui/react'

export default function Footer() {
    return (
    <Flex p="70" align="center" justify="center">
    <Text p="3" fontSize="xs" alignItems="center" justify-content="center"><b>Banco Sonoro Amazônico</b> hospeda seus arquivos na plataforma <Link legacyBehavior href="https://freesound.org" color="purple.600"><a target="_blank"><i>Freesound.org</i></a></Link>.</Text>
    <Text p="3" fontSize="xs" alignItems="center" justify-content="center">Desenvolvido por <Link legacyBehavior href='/'><a target="_blank"><b>Estúdio Curica</b></a></Link> com tecnologia <Link legacyBehavior href="http://github.com"><a target="_blank"><i>GitHub</i></a></Link> + <Link legacyBehavior href="http://vercel.com"><a target="_blank"><i>Vercel</i></a></Link>.</Text>
    </Flex>
    
    )
}
