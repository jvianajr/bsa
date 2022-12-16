import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'  
import styles from '../styles/MainContainer.module.css'



export default function MainContainer({ children }) {
    return (
        <>
        <Navbar />
        <main> {children} </main>
        <Footer />
        </>
    )
}



// import {
//     useColorMode,
//     Flex,
//     Button,
//     Box,
// } from '@chakra-ui/react'

// import Link from 'next/link'
// import styled from '@emotion/styled'

// import DarkModeSwitch from './DarkModeSwitch'


// const Container = ({ children }) => {
    
//     const { colorMode } = useColorMode();

//     const bgColor = {
//         light: 'white',
//         dark: '#171717'
//     }

//     const navHoverBg = {
//         light: 'gray.600',
//         dark: 'gray.300'
//     }

//     const StickNav = styled(Flex)`
//         position: sticky;
//         z-index: 10;
//         top: 0;
//         backdrop-filter: saturate(180%) blur(20px);
//         transition: height .5s, line-height .5s;
//     `
//     return ( 
//         <>
//         <StickNav
        
//         >
//             <Box>
//                 <Link href="/">
//                 <Button as="a" variant="ghost" p={[1, 2, 4]} _hover={{ backgroundColor: navHoverBg[colorMode]}}/>
//             </Link>
//             <Link legacyBehavior href="/colecoes">
//             <a>Coleções</a>
//             </Link>
//             <Link legacyBehavior href="/mediacao">
//             <a>Mediação</a>
//             </Link>
//             <Link legacyBehavior href="/sobre">
//             <a>Sobre BSA</a>
//             </Link>
//             <Link legacyBehavior href="/contato">
//             <a>Contato</a>
//             </Link>
//         </Box>
//             <DarkModeSwitch />
//         </StickNav>
//         <Footer />
//         </>
//     )
// }


