import Head from 'next/head'

// Título, descrição e prévia de compartilhamento (WhatsApp, redes sociais, buscadores) de cada página.
//   titulo:    nome da página (o site acrescenta " | Banco Sonoro Amazônico"); sem título, usa só o nome do site
//   descricao: uma ou duas frases sobre a página (até ~160 caracteres aparecem no Google)
//   caminho:   endereço da página, ex.: '/mapa' (vira o endereço canônico, sempre com www)
//   imagem:    imagem de prévia (1200 × 630); sem ela, usa a do site
//   naoIndexar: páginas que não devem aparecer no Google (ex.: inscrição confirmada)
export const SITE = 'https://www.bancosonoroamazonico.com.br'
const NOME = 'Banco Sonoro Amazônico'
const IMAGEM_PADRAO = '/images/previa-bsa.jpg'

export default function Seo({ titulo, descricao, caminho = '/', imagem = IMAGEM_PADRAO, naoIndexar = false, children }) {
  const tituloCompleto = titulo ? `${titulo} | ${NOME}` : `${NOME}: uma coleção de sons da Amazônia`
  const url = SITE + (caminho === '/' ? '/' : caminho.replace(/\/$/, ''))
  const img = imagem.startsWith('http') ? imagem : SITE + imagem
  return (
    <Head>
      <title>{tituloCompleto}</title>
      {descricao && <meta name='description' content={descricao} />}
      <link rel='canonical' href={url} />
      {naoIndexar && <meta name='robots' content='noindex' />}
      <meta property='og:site_name' content={NOME} />
      <meta property='og:locale' content='pt_BR' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={titulo || NOME} />
      {descricao && <meta property='og:description' content={descricao} />}
      <meta property='og:url' content={url} />
      <meta property='og:image' content={img} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content='Banco Sonoro Amazônico, escrito à mão sobre um espectrograma de sons' />
      <meta name='twitter:card' content='summary_large_image' />
      {children}
    </Head>
  )
}
