import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import MainContainer from '../components/MainContainer'
import { GOATCOUNTER_URL } from '../lib/visitas'
import { classesFontes } from '../lib/fontes'
import '../styles/bsa.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // O GoatCounter conta a primeira página sozinho; as páginas seguintes
  // (navegação sem recarregar) são contadas aqui.
  useEffect(() => {
    function contar(url) {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: url })
      }
    }
    router.events.on('routeChangeComplete', contar)
    return () => router.events.off('routeChangeComplete', contar)
  }, [router.events])

  return (
    <>
      <div className={classesFontes}>
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
      </div>
      <Script
        src="https://gc.zgo.at/count.js"
        data-goatcounter={`${GOATCOUNTER_URL}/count`}
        strategy="afterInteractive"
      />
    </>
  )
}

export default MyApp
