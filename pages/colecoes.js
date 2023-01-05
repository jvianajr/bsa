import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Grid, GridItem, Box, Container, Text, Flex, Heading } from '@chakra-ui/react'
// import MainContainer from '../components/MainContainer'

export default function Colecoes() {
  return (
    <>
      <Head>
        <title>Coleções | Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido collections praia rio ilha cidade bairro casa beira porto sitio igarape"></meta>
        <meta name="description" content="O Banco Sonoro Amazônico é uma coleção digital de sons coletados na paisagem, disponibilizados gratuitamente através da plataforma freesound.org, sob licença creative commons."></meta>
      </Head>
        <Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={9}>
          <Box as="a" href='./sonsdailha/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/ilha_200px.png" width ="200" height="200" object-fit="contain" alt="Sons da Ilha"/><Text><b>Sons da Ilha</b></Text></Box>
          <Box as="a" href='./sonsdapraia/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/praia_200px.png" width ="200" height="200" object-fit="contain" alt="Sons da Praia"/><Text><b>Sons da Praia</b></Text></Box>
          <Box as="a" href='./sonsdabeira/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/beira_200px.png" width ="200" height="200" object-fit="contain" alt="Sons da Beira"/><Text><b>Sons da Beira</b></Text></Box>
          <Box as="a" href='./sonsdositio/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/sitio_200px.png" width ="200" height="200" object-fit="contain" alt="Sons do Sítio"/><Text><b>Sons do Sítio</b></Text></Box>
          <Box as="a" href='./sonsdocaminho/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/caminho_200px.png" width ="200" height="200" object-fit="contain" alt="Sons do Caminho"/><Text><b>Sons do Caminho</b></Text></Box>          
          <Box as="a" href='./sonsdocentro/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/centro_200px.png" width ="200" height="200" object-fit="contain" alt="Sons do Centro"/><Text><b>Sons do Centro</b></Text></Box>
          <Box as="a" href='./sonsdacidade/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/cidade_200px.png" width ="200" height="200" object-fit="contain" alt="Sons da Cidade"/><Text><b>Sons da Cidade</b></Text></Box>
          <Box as="a" href='./sonsdobairro/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/bairro_200px.png" width ="200" height="200" object-fit="contain" alt="Sons do Bairro"/><Text><b>Sons do Bairro</b></Text></Box>
          <Box as="a" href='./sonsdacasa/' _hover={{ boxShadow:'inner', rounded:'md', bg:'white' }} align="center" justify="center" flex w='100%' p="3"><Image src="/images/casa_200px.png" width ="200" height="200" object-fit="contain" alt="Sons da Casa"/><Text><b>Sons da Casa</b></Text></Box>
          </Grid>
        </Flex>
    </>
  )
}


