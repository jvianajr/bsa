// Fontes do site (27/11/2026): IBM Plex Sans nos textos e no menu; IBM Plex Mono nos dados
// (tags, ficha técnica, licença). Servidas pelo próprio site (next/font): quem visita não faz pedidos ao Google.
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

export const plexSans = IBM_Plex_Sans({ subsets: ['latin'], style: ['normal', 'italic'], display: 'swap', variable: '--f-plex-sans' }) // versão variável: aceita qualquer peso de 100 a 700 (ex.: 550)
export const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--f-plex-mono' })

// classes que definem --f-plex-sans e --f-plex-mono; vão no elemento .raiz (ver pages/_app.js e bsa.css)
export const classesFontes = `raiz ${plexSans.variable} ${plexMono.variable}`
