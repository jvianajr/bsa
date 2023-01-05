import Head from 'next/head'
import Link from 'next/link'
import {
  Container, Heading, Text, Stack, Box
} from '@chakra-ui/react'
import Image from 'next/image'

export async function getStaticProps() {
  const apiSecret = process.env.CLIENT_SECRET;

  const res = await fetch(`https://freesound.org/apiv2/users/jose.viana?token=${apiSecret}`)
  const data = await res.json();

  return {
    props: {
      quant: data.num_sounds
    },
    revalidate: 600
  }
}

export default function Home({ quant }) {
  return (
    <>
      <Head>
        <title>Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido"></meta>
        <meta name="description" content="Uma coleção de sons da paisagem amazônica, escute, baixe, crie e compartilhe."></meta>
      </Head>
      <Container maxW='4xl'>
        <Stack spacing={4} pb="5">
          <Text fontSize="2xl" pt="5">
            Uma coleção de sons disponíveis,
          </Text>
          <Text fontSize='lg' pb="5">
            escute, baixe, crie e compartilhe.
          </Text>
          <Box pb="10" align="center">
            <Image src="/images/sons_200px.png" width="270" height="261" alt="Banco Sonoro Amazônico" />
          </Box>
          <Text>O <b>Banco Sonoro Amazônico</b> é uma coleção digital de sons coletados na paisagem, disponibilizados gratuitamente através da plataforma <i>freesound.org</i> sob licença <i>creative commons</i>.</Text>
          <Text>Atualmente o BSA está na versão 1.1 e conta com <b> {quant} elementos sonoros</b>, organizados em <i>9 coleções</i>.</Text>

          <Heading pt="7" size='md'>Modos de utilizar</Heading>
          <Text>Imaginamos o BSA sendo utilizado de muitas formas. Inicialmente como recurso sonoro para outras pesquisas e criações - montagens, remixagens e experimentações com diversas linguagens - além de ser um dispositivo artístico de uso livre.</Text>
          <Text>Para mergulhar na duração dos acontecimentos, sugerimos o uso de fones de ouvido. Este dispositivo foi projetado para funcionar bem no computador e no celular, sendo uma obra acessível em qualquer lugar e tempo.</Text>

          <Heading pt="7" size='md'>Como funciona?</Heading>
          <Text>Para navegar basta acessar as <b>Coleções</b> no menu acima. No canto esquerdo de cada elemento sonoro, há um pequeno botão ► para tocar.</Text>
          <Text>Para fazer o <i>download</i> dos sons é necessário ter uma conta gratuita na plataforma <i>freesound</i>. É simples e rápido. Basta preencher o formulário e confirmar o cadastro no email. <Link legacyBehavior href='https://freesound.org/home/register/'><a target="_blank">[Para criar a conta, clique aqui]</a></Link>.</Text>

          <Heading pt="7" size='md'>Licença de uso, financiamento e contribuições</Heading>
          <Text>Ao re-utilizar os sons no seu projeto, você aceita em mencionar nos créditos algo do tipo: <i>Este projeto conta com recursos sonoros do Banco Sonoro Amazônico, com autoria de José Viana.</i></Text>
          <Text>A etapa inicial do projeto contou com recursos do <b>Prêmio Preamar - Cultura e Arte 2022</b>, da Secretaria de Cultura do Governo do Pará.</Text>
          <Text>E caso você sinta o desejo de contribuir financeiramente para ampliação e manutenção do projeto, faça um PIX para <b>bancosonoroamazonico.com</b> ou utilize o Qr Code abaixo.</Text>
        
          <Box pt="5" pb="5" align="center">
            <Image src="/images/pix_bsa.jpg" width="170" height="170" alt="Banco Sonoro Amazônico"/>
          </Box>
          <Box bg='white.50' fontSize='xs' w='300px' color='black.600' align="center">
          00020101021126520014br.gov.bcb.pix0130bancosonoroamazonico@gmail.com5204000053039865802BR5918JOSE DE A V JUNIOR6005BELEM62070503***63044544
</Box>
        
          <Text align="center" pt="7">Agradecemos a visita! Compartilhe com quem achar válido.</Text>
          <Text align="center">E boa jornada!</Text>
        </Stack>
      </Container>
    </>
  )
}




// <Tabs isFitted variant='enclosed'>
// <TabList mb='1em'>
//   <Tab>BSA</Tab>
//   <Tab>Modos de utilizar</Tab>
//   <Tab>Como funciona?</Tab>
// </TabList>
// <TabPanels>
//   <TabPanel>
//   <Text pb="5">O <i>Banco Sonoro Amazônico</i> é uma coleção digital de sons coletados na paisagem, categorizados e disponibilizados gratuitamente através da plataforma <i>freesound.org</i>, sob licença <i>creative commons</i>.</Text>
//   <Text>Atualmente o BSA está na versão 1.1 e conta com <b> {quant} elementos sonoros</b>, organizados em <i>9 coleções</i>. </Text>
//   <Text>Navegue pelo menu acima, após ler estas caixas de mensagem iniciais.</Text>
//   </TabPanel>
//   <TabPanel>
//   <Text pb="5">Imaginamos que o BSA possa ser utilizado de muitas formas ao longo do tempo. O intuito inicial é de servir como recurso sonoro para outras pesquisas e criações - remixes, montagens e utilizações nas mais diversas linguagens, além de ser um dispositivo artístico de uso livre disponível para navegação.</Text> 
//   <Text pb="5">Para uma boa navegação, sugerimos o uso de fones de ouvido. Desejamos um belo mergulho na duração dos acontecimentos. E se gostar, não hesite em compartilhar com quem achar válido.</Text>
//   <Text pb="5">Caso deseje fazer uma contribuição financeira ao projeto, <Link legacyBehavior href='/contribuicao/'>clique aqui</Link>.</Text>
//   </TabPanel>
//   <TabPanel>
//     <Text pb="5">Para navegar pelos sons basta acessar as <b>Coleções</b> no menu acima. No canto esquerdo de cada elemento sonoro, há um pequeno botão ► para <i>tocar</i>. A navegação funciona no computador e no celular, compartilhe.</Text> 
//     <Text pb="5">Para fazer <i>download</i> é necessário ter conta na plataforma <i>freesound</i>. É simples, rápido e gratuito. Preencha o cadastro e confirme no seu email. <Link legacyBehavior href='https://freesound.org/home/register/'><a target="_blank">[Para criar a conta, clique aqui]</a></Link>.</Text>
//     <Text pb="3">Atenção! Ao re-utilizar os sons no seu projeto, você aceita em mencionar nos créditos algo do tipo: <i>Este projeto conta com recursos sonoros do Banco Sonoro Amazônico, com autoria de José Viana.</i></Text>
//   </TabPanel>
// </TabPanels>
// </Tabs> */}