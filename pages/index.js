import Head from 'next/head'
import Link from 'next/link'
import Colecoes from './colecoes'
import {
  Container, Heading, Text, Stack, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'


export default function Home() {
  return (
    <>
      <Head>
        <title>BSA _ página inicial</title>
        <meta name="keywords" content="inserir palavras chave"></meta>
        <meta name="description" content="inserir descrição da página"></meta>
      </Head>
      <Container maxW='4xl'>
        <Stack spacing={6} pb="5">
          <Heading>
            Uma coleção de sons da paisagem amazônica,
          </Heading>
          <Heading size='5xl' pb="5">
            escute, baixe, crie e compartilhe.
          </Heading>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>BSA</Tab>
              <Tab>Como funciona?</Tab>
              <Tab>Modos de utilizar</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <Text pb="5">O Banco Sonoro Amazônico é uma coleção digital de sons coletados na paisagem, categorizados e disponibilizados gratuitamente através da plataforma <b>freesound.org</b>, sob licença <i>creative commons</i>.</Text>
              <Text fontSize="sm">O BSA está na versão 1.1 e conta atualmente com 53 elementos sonoros. Esta etapa foi realizada com recursos do Prêmio Preamar Arte e Cultura 2022 - Governo do Estado do Pará.</Text>
              </TabPanel>
              <TabPanel>
                <Text pb="5">Para navegar e escutar os sons basta acessar as <b>Coleções</b> no menu acima. Funciona bem no computador e no celular. Para fazer o <i>download</i>, é necessário ter uma conta na plataforma <i>freesound</i>. É simples, rápido e gratuito <Link legacyBehavior href='https://freesound.org/home/register/'><a target="_blank">[clicando aqui]</a></Link>.</Text>
                <Text fontSize="sm" pb="3">Ao re-utilizar os sons no seu projeto, você aceita em mecionar nos créditos: Este projeto conta com recursos sonoros do Banco Sonoro Amazônico, com autoria de José Viana.</Text>
              </TabPanel>
              <TabPanel>
              <Text pb="5">Imaginamos que o BSA possa ser utilizado de muitas formas ao longo do tempo. O intuito inicial é servir como recurso para outres pesquisadores e criadores - artistas, DJs, músicos, podcasters, montadores. Além do uso livre - navegar com fones de ouvido, mergulhar na duração dos acontecimentos e liberar a imaginação.</Text>
              <Text fontSize="sm">Não hesite em compartilhá-lo com quem achar válido. Por ora, é isso, boa navegação!</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
        <Heading size='5xl' pb="5">
            Coleções:
          </Heading>
          <Colecoes />
      </Container>
    </>
  )
}
