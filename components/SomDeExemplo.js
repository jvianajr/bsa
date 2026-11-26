import { useEffect, useState } from 'react'

// Um som das coleções, sorteado a cada visita, para a pessoa experimentar o player.
// O sorteio acontece no navegador, depois que a página carrega.
export default function SomDeExemplo({ ids = [] }) {
  const [id, setId] = useState(null)

  function sortear() {
    if (ids.length) setId(ids[Math.floor(Math.random() * ids.length)])
  }

  useEffect(sortear, [ids])

  if (!ids.length) return null

  return (
    <div>
      <p className='t-sm pb-2'>Experimente com este som, sorteado entre as coleções:</p>
      <div className='proporcao-10-3'>
        {id ? (
          <iframe
            key={id}
            src={`https://freesound.org/embed/sound/iframe/${id}/simple/full_size/`}
            title='Som de exemplo do Banco Sonoro Amazônico'
            loading='lazy'
            scrolling='no'
          />
        ) : (
          <div className='fundo-vazio' />
        )}
      </div>
      <button type='button' onClick={sortear} className='botao botao-xs botao-fantasma mt-2'>
        Sortear outro som
      </button>
    </div>
  )
}
