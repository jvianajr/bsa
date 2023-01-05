import Head from 'next/head'
import Image from 'next/image'
import { Container, Stack, Text, Heading, Box } from '@chakra-ui/react'

export default function Sobre() {
    return (
        <>
     <Head>
  <title>Sobre | Banco Sonoro Amazônico</title>
  <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido jose-viana amazonica"></meta>
  <meta name="description" content="O Banco Sonoro Amazônico é uma coleção digital de sons coletados na paisagem, disponibilizados gratuitamente através da plataforma freesound.org, sob licença creative commons."></meta>
</Head>
<Container maxW='4xl'>
        <Stack spacing={2}>
        <Text pt="14">O <b>Banco Sonoro Amazônico</b> é uma coleção digital de sons coletados na paisagem, disponibilizados gratuitamente através da plataforma <i>freesound.org</i>, sob licença <i>creative commons</i>.</Text>
          <Heading pt="10" as='h6' size='xs'>Concepção, criação e partilha</Heading>
    <Text pb="4">José Viana</Text>

    <Heading as='h6' size='xs'>Desenvolvimento web</Heading>
    <Text pb="4">Estúdio Curica</Text>

    <Heading as='h6' size='xs'>Assessoria de som</Heading>
    <Text pb="4" >Yuri Onça (Onça Records)</Text>

    <Heading as='h6' size='xs'>Agradecimentos</Heading>
    <Text pb='10'>Diná Maria Chermont, Ewa Urfalino, Raquel Cardoso. Raio Verde, Camila Fialho, Felipe Mendonça, Martín Perez, Rodrigo José. Associação Fotoativa, Anne Dias, Irene Almeida, Jorge Ramos.
    Debora Flor, Veronique Isabelle, Paula Vanessa, Hugo Kloeckner. Kamara Kó Galeria.
    Claudia Leão, Delen Castro, Paulo Meira. Carol Abreu, Erika Morhy, Felipe Pamplona. Associação Amprunam, Jéssica, Tadeu, IMPA. Arte Fazenda Renascer, Pablo Remigi, Moana Remigi. Jean Christoff, Rosi Elbaum. Yuri Onça, Bernardo Onça, Onça Records. Louiza Lima, Bernardo Sertório. Bruno Lopes, Marlon Thiago, Raony Miccione. Tainah Fagundes, Felipe Cruz, Cassio Tavernard, Pablo Mufarrej.
    E todas as pessoas que cruzaram de alguma maneira no processo de construção do BSA.
    </Text>

    <Heading as='h6' size='xs'>Banco Sonoro Amazônico</Heading>
       <Text pb="4"> Versão 1.1, 2022.</Text>
    <Heading as='h6' size='xs'>Financiamento</Heading>
    <Text pb="4" >A primeira etapa conta com recursos do Prêmio Preamar de Arte e Cultura 2022 - Secretaria de Cultura do Pará - SECULT/PA.</Text>
    <Box align="center">
    <Image src="/images/preamar-secult.png" 
        width="400" 
        height="134"
        alt="Preamar Cultura e Arte 2022"/>
    
       <Text pt="7"> Para contribuir financeiramente para ampliação e manutenção do projeto, faça um PIX para <b>bancosonoroamazonico.com</b> ou utilize o Qr Code abaixo:</Text>
        <Box pt="5" pb="5">
          <Image src="/images/pix_bsa.jpg" width="170" height="170" alt="Banco Sonoro Amazônico"/>
        </Box>
        <Box bg='white.50' fontSize='xs' w='300px' color='black.600'>
        00020101021126520014br.gov.bcb.pix0130bancosonoroamazonico@gmail.com5204000053039865802BR5918JOSE DE A V JUNIOR6005BELEM62070503***63044544
</Box></Box>
    </Stack>
    </Container>
    </>
    )
}