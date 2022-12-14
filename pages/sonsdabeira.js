import styles from '../styles/sons.module.css'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    AspectRatio,
    Container,
  } from '@chakra-ui/react'


export async function getStaticProps(request, response) {
    const apiSecret = process.env.CLIENT_SECRET;
    
    const resPack = await fetch(`https://freesound.org/apiv2/packs/36926?token=${apiSecret}`)
    const dataPack = await resPack.json ();

    const res = await fetch(`https://freesound.org/apiv2/packs/36926/sounds?token=${apiSecret}`)
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
    <AspectRatio maxW='920px' ratio={920 / 245} objectFit='cover'>
    <iframe scrolling="no" src={`https://freesound.org/embed/sound/iframe/${results.id}/simple/large/`}/>
</AspectRatio>
</AccordionPanel>
  </AccordionItem>
  ))}
</Accordion>
</Container>
</Container>

    )
}


