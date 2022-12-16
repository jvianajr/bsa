import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import MainContainer from '../components/MainContainer'
import theme from '../styles/theme'

const myTheme = extendTheme(theme);

function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider theme={myTheme}>
  <MainContainer>
    <Component {...pageProps} />
    </MainContainer>
  </ChakraProvider>
  )
}

export default MyApp;