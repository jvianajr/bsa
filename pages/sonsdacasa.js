import React from 'react'
import Image from 'next/image'
import Colecoes from './colecoes'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  AspectRatio,
  Container,
  Button,
  Wrap,
  WrapItem,
  Center,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react'


export async function getStaticProps() {
  const apiSecret = process.env.CLIENT_SECRET;

  const resPack = await fetch(`https://freesound.org/apiv2/packs/36926?token=${apiSecret}`)
  const dataPack = await resPack.json();

  const res = await fetch(`https://freesound.org/apiv2/packs/36926/sounds?token=${apiSecret}`)
  const data = await res.json();

  return {
    props: {
      infopack: dataPack,
      sons: data.results,
    },
    revalidate: 600
  }

}


export default function Home({ sons, infopack }) {

  return (
    <>
      <Container maxW='4xl'>
        <Stack spacing={6}>
          <Heading>
            {infopack.name}
          </Heading>
          <Text as='cite'>{infopack.description}</Text>
          <Text fontSize="xs">Esta coleção possui atualmente <i>{infopack.num_sounds}</i> elementos sonoros. Para escutar, clique no botão <i>play</i> no canto inferior da faixa sonora, para download faça login na plataforma <i>freesound.org</i>.</Text>
          <Box pb="5">
            <Accordion allowMultiple>
              {sons.map((results) => (
                <AccordionItem key={results.id}>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        <Text fontWeight='medium'>{results.name}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  <AccordionPanel pb={4}>
                    <AspectRatio left="0" w="100%" h="0" pos="relative" pb="30%">
                      <iframe src={`https://freesound.org/embed/sound/iframe/${results.id}/simple/full_size/`} style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0, }} scrolling="no" />
                    </AspectRatio>
                    <Button as="a" target="_blank" mt="3" mr="3" mb="3" colorScheme='teal' variant='solid' size='xs' href={`https://freesound.org/s/${results.id}/`}>Download</Button>
                    <Wrap>
                      {results.tags.map((tag, index) => (
                        <WrapItem color="yellow.600" fontSize='xs' key={index}>
                          <Center>{tag}</Center>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
          <Heading size='5xl' pb="5">
            Outras Coleções:
          </Heading>
          <Colecoes />
        </Stack>
      </Container>
    </>
  )
}
