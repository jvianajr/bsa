import Head from 'next/head'
import { Container, Stack, Heading, Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './Form'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

export default function Contato() {
  return (
    <>
      <Head>
        <title>Contato | Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido"></meta>
        <meta name="description" content="inserir descrição da página"></meta>
      </Head>
      <Container maxW='4xl'>
      <Stack spacing={5}>
          <Text size='5xl' pb="5">
            Ideias, questões e assuntos diversos, entre em contato conosco pelo formulário abaixo:</Text>
        <Form />
        <Text align="center" pt="5" fontSize='sm'>Ou escreva para <b>bancosonoroamazonico@gmail.com</b></Text> 
        <Text align="center" pt="5" fontSize="sm">Para tratar pessoalmente, <b>josealmeidavianajunior@gmail.com</b>. Responderei o mais breve possível.</Text>
        <Text align="center" pt="5" pb="5" fontSize="sm">Até logo!</Text>
        </Stack>
</Container>
    </>
  )
}

