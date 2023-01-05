import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Container, Stack, Heading, Flex, Text, AspectRatio, Box } from '@chakra-ui/react'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const apiYouTubeSecret = process.env.YOUTUBE_API_KEY;

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLcgJmV7aMbt6y77UJIlyJgcD3Jav2gRpX&key=${apiYouTubeSecret}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}


export default function Mediacao({ data }) {
    return (
    <>
      <Head>
        <title>Mediação | Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido"></meta>
        <meta name="description" content="O Banco Sonoro Amazônico é uma coleção digital de sons coletados na paisagem, disponibilizados gratuitamente através da plataforma freesound.org, sob licença creative commons."></meta>
      </Head>
      <Container maxW='4xl'>
      <Stack spacing={2}>
          <Text size='5xl' pb="5">
            Tutoriais, conversas e materiais educativos diversos.</Text>
        <Flex pt="5">
  {data.items.map(({ id, snippet = {} }) => {
    const { videoId, title, description, thumbnails = {}, resourceId = {} } = snippet
    const { medium } = thumbnails
    return (
      <Box key={id}>
 <AspectRatio ratio={16 / 9}>
  <iframe src={`https://www.youtube.com/embed/${resourceId.videoId}?controls=0`} style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0, }} scrolling="no" ></iframe>
      </AspectRatio>
      <Text pt="4" pb="2" fontSize='md'><b>{ title }</b></Text>
          <Text pb="10" fontSize='sm'>{ description }</Text>
      </Box>
       )} )}
       </Flex>
       </Stack>
      </Container>
      </>
  )
}



