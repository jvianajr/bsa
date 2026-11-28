import { useEffect, useRef, useState } from 'react'
import { mostrarTituloAoAbrir } from '../lib/acordeao'
import Link from 'next/link'
import BotaoDownload from './BotaoDownload'

// Seta que gira quando a janela abre
export const Seta = () => (
  <svg viewBox='0 0 24 24' className='seta' aria-hidden='true'>
    <path fill='currentColor' d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
  </svg>
)

// Lista de sons que abre e fecha, usada nas páginas de coleção e de palavra-chave.
// mostrarColecao: mostra de qual coleção o som é (útil nas páginas de palavra-chave).
// Título do som: só a parte em português fica em negrito; do canal ([mono]/[stereo]) ou do " | " em diante,
// a parte em inglês fica no peso normal. É só uma divisão do texto, sem custo para quem visita.
function TituloDoSom({ nome }) {
  const m = /^(.*?)(\s+(?:\[(?:mono|stereo)\]|\|).*)$/i.exec(nome || '')
  if (!m) return <span className='titulo-som'><b>{nome}</b></span>
  return <span className='titulo-som'><b>{m[1]}</b><span lang='en'>{m[2]}</span></span>
}

// aoClicarTag (opcional): em vez de abrir a página da tag, chama esta função (usado na janela da Nuvem)
export default function ListaDeSons({ sons, mostrarColecao = false, aoClicarTag }) {
  // O player do Freesound só é carregado quando o som é aberto pela primeira vez.
  // Depois disso ele continua carregado, então o som segue tocando mesmo se a janela for fechada.
  const [abertos, setAbertos] = useState(() => new Set())

  // se a pessoa abriu algum som antes de a página terminar de carregar, carrega o player dele agora
  const lista = useRef(null)
  useEffect(() => {
    const ja = [...(lista.current?.querySelectorAll('details[open]') || [])].map((d) => Number(d.dataset.id))
    if (ja.length) setAbertos((anterior) => new Set([...anterior, ...ja]))
  }, [])

  function aoAbrir(id, aberto) {
    if (!aberto) return
    setAbertos((anterior) => (anterior.has(id) ? anterior : new Set(anterior).add(id)))
  }

  return (
    <div className='acordeao' ref={lista}>
      {sons.map((som) => (
        <details key={som.id} data-id={som.id} className='janela janela-som' onToggle={(e) => { aoAbrir(som.id, e.currentTarget.open); mostrarTituloAoAbrir(e.currentTarget) }}>
          <summary>
            <span className='rotulo'>
              <TituloDoSom nome={som.name} />
              {mostrarColecao && som.colecao && <span className='t-xs cor-500'>{som.colecao.nome}</span>}
            </span>
            <Seta />
          </summary>
          <div className='conteudo'>
            <div className='player'>
              {abertos.has(som.id) && (
                <iframe
                  src={`https://freesound.org/embed/sound/iframe/${som.id}/simple/full_size/`}
                  title={som.name}
                  scrolling='no'
                />
              )}
            </div>
            <div className='acoes-som'>
              <BotaoDownload id={som.id} />
              <a href={som.licenca.link} target='_blank' rel='noreferrer' className='t-xs cor-600 link'>
                Licença {som.licenca.nome}
              </a>
              <span className='t-xs cor-600' style={{ marginLeft: '-.5rem' }}>
                ({som.num_downloads.toLocaleString('pt-BR')} {som.num_downloads === 1 ? 'download' : 'downloads'})
              </span>
              <span className='espaco' />
              <a href={`https://freesound.org/s/${som.id}/`} target='_blank' rel='noreferrer' className='t-xs cor-600 link'>
                + informações
              </a>
              {som.temLocal && (
                <a href={`https://freesound.org/people/jose.viana/sounds/${som.id}/geotag/`} target='_blank' rel='noreferrer' className='t-xs cor-600 link'>
                  ver localização
                </a>
              )}
            </div>
            {som.agradecimentos && (
              <p className='t-xs cor-700 pb-2'>Agradecimentos: {som.agradecimentos}</p>
            )}
            {som.ficha && <p className='t-xs cor-600 pb-1 ficha-som'>{som.ficha}</p>}
            <div className='tags'>
              {som.tags.map(({ tag, rotulo }) => (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} prefetch={false} className='tag'
                  onClick={aoClicarTag ? (e) => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); aoClicarTag({ tag, rotulo }) } : undefined}>{rotulo}</Link>
              ))}
            </div>
            {som.descricao && <p className='t-xs cor-600 pt-4 quebra-linhas'>{som.descricao}</p>}
            {mostrarColecao && som.colecao && (
              <p className='t-xs pt-3'>
                Da coleção <Link href={`/${som.colecao.slug}/`} className='seminegrito link'>{som.colecao.nome}</Link>
              </p>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
