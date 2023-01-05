import Head from 'next/head'
import Image from 'next/image'
import { Container, Stack, Text, Heading } from '@chakra-ui/react'
export default function Sobre() {
    return (
        <>
     <Head>
  <title>Sobre | Banco Sonoro Amazônico</title>
  <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido"></meta>
  <meta name="description" content="Sobre o Banco Sonoro Amazônico"></meta>
</Head>
<Container maxW='4xl'>
        <Stack spacing={2}>
          
          <Heading as='h6' size='xs'>Concepção, criação e partilha</Heading>
    <Text pb="4">José Viana</Text>

    <Heading as='h6' size='xs'>Desenvolvimento web</Heading>
    <Text pb="4">Estúdio Curica</Text>

    <Heading as='h6' size='xs'>Assessoria de som</Heading>
    <Text pb="4" >Yuri Onça (Onça Records)</Text>

    <Heading as='h6' size='xs'>Agradecimentos</Heading>
    <Text pb='10'>Diná Maria Chermont, Ewa Urfalino, Raquel Cardoso. Associação Fotoativa, Anne Dias, Irene Almeida, Jorge Ramos.
    Associação Amprunam, Jéssica, Tadeu, Impa. Arte Fazenda Renascer, Pablo Remigi, Moana Remigi. Camila Fialho, Paula Vanessa, Rodrigo José.
    Claudia Leão, Delen Castro, Paulo Meira. Carol Abreu, Erika Morhy, Felipe Pamplona. Felipe Mendonça, Pablo Mufarrej, Martín Perez.
    Debora Flor, Veronique Isabelle, Jean Christoff. Yuri Onça, Bernardo Onça, Onça Records. Bernardo Sertório, Bruno Lopes, Marlon Thiago, Raony Miccione. Tainah Fagundes, Felipe Cruz.
    E todas as pessoas que cruzaram de alguma maneira o processo de construção do BSA.
    </Text>

    <Heading as='h6' size='xs'>Banco Sonoro Amazônico</Heading>
       <Text pb="4"> Versão 1.1, 2022.</Text>
    <Heading as='h6' size='xs'>Financiamento</Heading>
    <Text pb="4" >A primeira etapa conta com recursos do Prêmio Preamar de Arte e Cultura 2022 - Secretaria de Cultura do Pará - SECULT/PA.</Text>
    <Image src="/images/preamar-secult.png" 
        width="400" 
        height="134"
        alt="Preamar Cultura e Arte 2022"/>
    </Stack>
    </Container>
    </>
    )
}