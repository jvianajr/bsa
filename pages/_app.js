//import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import MainContainer from '../components/MainContainer';
import theme from '../styles/theme';

const myTheme = extendTheme(theme);

const GlobalStyle = ({ children }) => (
  <>
  <Head>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
  </Head>
  <CSSReset />
  <Global
  style={css`
  html {
    scroll-behavior: smooth;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  `}
/>
{children}
  </>
);

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
