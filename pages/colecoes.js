import Head from 'next/head'
import Link from 'next/link'
import { Grid, GridItem, Box, Container, Text, Flex } from '@chakra-ui/react'
// import MainContainer from '../components/MainContainer'

export default function Colecoes() {
  return (
    <>
      <Head>
        <title>Coleções do Banco Sonoro Amazônico</title>
        <meta name="keywords" content="inserir palavras chave"></meta>
      </Head>
  <Container>
        <Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <GridItem w='100%' h='150' bg='blue.500'>sons da beira</GridItem>
            <GridItem w='100%' h='150' bg='blue.500'>sons da beira</GridItem>
            <GridItem w='100%' h='150' bg='blue.500'>sons da beira</GridItem>
            <GridItem w='100%' h='150' bg='blue.500'>sons da beira</GridItem>
            <GridItem w='100%' h='150' bg='blue.500'>sons da beira</GridItem>
          </Grid>
        </Flex>
        </Container>
    </>
  )
}