import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Botão de download de um som.
// Com o login do Freesound feito neste site, baixa o arquivo original direto daqui.
// Sem login, leva à autorização do Freesound (uma vez) e depois volta para a mesma página.
export default function BotaoDownload({ id }) {
  const router = useRouter()
  const [logado, setLogado] = useState(false)

  useEffect(() => {
    setLogado(/(?:^|;\s*)fs_logado=1/.test(document.cookie))
  }, [])

  const voltar = encodeURIComponent(router.asPath || '/colecoes')
  const href = logado
    ? `/api/freesound/baixar?id=${id}&voltar=${voltar}`
    : `/api/freesound/entrar?voltar=${voltar}&som=${id}`

  return (
    <a href={href} className='botao botao-xs' style={{ marginBlock: '.75rem' }}
      title={logado ? 'Baixar o arquivo original' : 'Entrar com sua conta do Freesound para baixar'}>
      {logado ? 'Download' : 'Download (entrar com Freesound)'}
    </a>
  )
}
