import Seo from '../components/Seo'
import Link from 'next/link'
import Image from 'next/image'

import Cabecalho from '../components/Cabecalho'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const apiYouTubeSecret = process.env.YOUTUBE_API_KEY;

const PLAYLIST_ID = 'PLcgJmV7aMbt6y77UJIlyJgcD3Jav2gRpX';

export async function getServerSideProps() {
  // Se a chave do YouTube faltar ou a API falhar, a página abre com um link para a playlist em vez de quebrar.
  let data = { items: [] };
  try {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${apiYouTubeSecret}`)
    const json = await res.json();
    if (res.ok && Array.isArray(json.items)) data = json;
  } catch (e) {
    console.error('Mediação: não foi possível ler a playlist do YouTube', e);
  }
  return {
    props: {
      data
    }
  }
}


export default function Mediacao({ data }) {
    return (
    <>
      <Seo titulo="Mediação" descricao="Tutoriais, conversas e materiais educativos para conhecer o Banco Sonoro Amazônico e usar os sons em outras criações." caminho="/mediacao" />
      <div className='container'>
      <Cabecalho titulo="mediação" frase="(ou meios para conhecer mais sobre o projeto)" uso="assista aos vídeos e conheça os materiais do projeto." />
      <div className='pilha g-2'>
        {data.items.length === 0 && (
          <p className='t-sm'>Assista aos vídeos na <a href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`} target="_blank" rel="noreferrer"><b>playlist do Banco Sonoro Amazônico no YouTube</b></a>.</p>
        )}
        <div className='linha pt-5' style={{ alignItems: 'stretch' }}>
  {data.items.map(({ id, snippet = {} }) => {
    const { videoId, title, description, thumbnails = {}, resourceId = {} } = snippet
    const { medium } = thumbnails
    return (
      <div key={id} style={{ width: '100%' }}>
 <div className='proporcao-16-9'>
  <iframe src={`https://www.youtube.com/embed/${resourceId.videoId}?controls=0`} scrolling="no" ></iframe>
      </div>
      <p className='pt-4 pb-2 t-md'><b>{ title }</b></p>
          <p className='pb-10 t-sm'>{ description }</p>
      </div>
       )} )}
       </div>
       </div>
      </div>
      </>
  )
}



