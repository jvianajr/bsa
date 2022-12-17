import Head from 'next/head'
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
            uma coleção de sons da paisagem amazônica
          </Heading>
          <Heading size='5xl'>
            escute, baixe, crie e compartilhe
          </Heading>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab>BSA</Tab>
              <Tab>Como funciona?</Tab>
              <Tab>Modos de utilizar</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>O Banco Sonoro Amazônico [BSA] é construído a partir de sons coletados na paisagem amazônica, categorizados e disponibilizado na internet através da plataforma freesound.org, no intuito de que possam ser escutados, compartilhados, baixados e utilizados em outros projetos de arte, criação multimídia, pesquisa e educação - de forma gratuita* - sob licença Creative Commons.</p>
              </TabPanel>
              <TabPanel>
                <Text fontSize="sm">É possível navegar e ouvir os sons do Banco Sonoro Amazônico através da estrutura de organização ao longo do site. No entanto, para baixar os arquivos para o computador ou celular, é necessário criar uma conta gratuita no freesound. Para isso, basta preencher o formulário de cadastro, confirmar os dados no seu email e fazer o login na plataforma.</Text>
                <Text fontSize="sm">Todas as vezes que algum som do BSA for utilizado, o projeto deve ser mencionado. Clique para saber mais sobre como dar crédito ao projeto e autor.</Text>
              </TabPanel>
              <TabPanel>
              <Text fontSize="sm">O BSA está em sua primeira versão e esperamos a cada mês inserir novos arquivos. Utilizamos tecnologia gratuita e de código aberto através do serviço GitHub e Vercel para que sua autonomia não dependa de custos mensais de manutenção. Esperamos que o BSA possa servir ao longo do tempo às mais diversas necessidades, portanto, não hesite em compartilhá-lo com quem achar válido.</Text>
                <Text fontSize="sm">Caso queira contribuir financeiramente com o projeto, faça uma doação via PIX através do qr-code abaixo, ou da chave via email bancosonoroamazonico@gmail.com</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </>
  )
}
