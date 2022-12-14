import styles from '../styles/Home.module.css'

import { ChakraProvider } from '@chakra-ui/react'

import MainContainer from '../components/MainContainer'


function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider>
  <MainContainer>
  <Component {...pageProps} />
  </MainContainer>
  </ChakraProvider>
  )
}

export default MyApp
