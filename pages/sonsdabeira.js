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
  } from '@chakra-ui/react'

  
export async function getStaticProps(request, response) {
    const apiSecret = process.env.CLIENT_SECRET;
    
    const resPack = await fetch(`https://freesound.org/apiv2/packs/36925?token=${apiSecret}`)
    const dataPack = await resPack.json ();

    const res = await fetch(`https://freesound.org/apiv2/packs/36925/sounds?token=${apiSecret}`)
    const data = await res.json ();

    return {
        props: {
            infopack: dataPack,
            sons: data.results,
        },
    }

    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}


export default function Home({ sons, infopack }) {

    return (
      <>
<Container maxW='6xl'>
<h1>{infopack.name}</h1>
<h3>{infopack.description}</h3>
<p>Esta coleção possui atualmente <span>{infopack.num_sounds}</span> elementos sonoros.</p>
<Container maxW='6xl'>
        <Accordion allowMultiple>
        {sons.map((results) => (
  <AccordionItem key={results.id}>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        {results.name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <AspectRatio left="0" w="100%" h="0" pos="relative" pb="30%">
    <iframe src={`https://freesound.org/embed/sound/iframe/${results.id}/simple/full_size/`} style={{top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0,}} allowfullscreen scrolling="no"/>
    </AspectRatio>
      <Button as="a" target="_blank" mt="3" mr="3" colorScheme='teal' variant='solid' size='xs' href={`https://freesound.org/s/${results.id}/`}>Download</Button> 
<Wrap>
{results.tags.map((item, index) => (
  <WrapItem aligItens="center">
  <Center mt="3" color="yellow.600" fontSize='xs' key={index}>{item}</Center>
  </WrapItem>
    ))}
    </Wrap>
</AccordionPanel>
  </AccordionItem>
  ))}
</Accordion>
</Container>
</Container>
</>
    )
}


