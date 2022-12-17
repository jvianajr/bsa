import Head from 'next/head'
import Link from 'next/link'
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
        <Stack spacing={6}>
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
              <Text pb="3">O Banco Sonoro Amazônico é uma coleção digital de sons coletados na paisagem, categorizados e disponibilizados gratuitamente através da plataforma <b>freesound.org</b>, sob licença <i>creative commons</i>.</Text>
              <Text fontSize="xs">O BSA está atualmente na versão 1.1 com 53 elementos sonoros. Etapa realizada com recursos do Prêmio Preamar Arte e Cultura 2022 - Governo do Estado do Pará.</Text>
              </TabPanel>
              <TabPanel>
                <Text pb="3">Para navegar e escutar os sons basta acessar as <b>Coleções</b> no menu de cima. Para fazer o <i>download</i>, é necessário ter uma conta na plataforma <i>freesound</i>. É simples, rápido e gratuito <Link legacyBehavior href='https://freesound.org/home/register/'><a target="_blank">[clique aqui]</a></Link>.</Text>
                <Text fontSize="sm" pb="3">Ao re-utilizar os sons, não esqueça de mencionar nos créditos o Banco Sonoro Amazônico e seu autor José Viana.</Text>
              </TabPanel>
              <TabPanel>
              <Text pb="3">Imaginamos que o BSA possa ser utilizado de muitas formas ao longo do tempo. O intuito inicial é servir como recurso para outres criadores - artistas, DJs, músicos, podcasters, montadores. Recurso para outras pesquisas e para o desfruto livre - navegar com fones de ouvido, mergulhar na duração dos acontecimentos e imaginar os ambientes.</Text>
              <Text fontSize="sm">Não hesite em compartilhá-lo com quem achar válido. Por ora, boa navegação!</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
