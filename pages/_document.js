import { Html, Head, Main, NextScript } from 'next/document'

// Documento base de todas as páginas: declara o idioma (português do Brasil), para leitores de tela
// lerem com a pronúncia certa. Partes em inglês são marcadas com lang="en" onde aparecem.
export default function Document() {
  return (
    <Html lang='pt-BR'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
