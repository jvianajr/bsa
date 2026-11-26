import Head from 'next/head'
import Image from 'next/image'
import FormProjeto from '../components/FormProjeto'
import projetos from '../lib/projetos'
import Cabecalho from '../components/Cabecalho'

export default function Ecos() {
  return (
    <>
      <Head>
        <title>Ecos | Banco Sonoro Amazônico</title>
        <meta name="description" content="Ecos: criações feitas com sons do Banco Sonoro Amazônico." />
      </Head>
      <div className='container'>
        <Cabecalho titulo="Ecos" subtitulo="Músicas, filmes, instalações, pesquisas e outras criações feitas com sons do Banco Sonoro Amazônico." />
        <div className='pilha g-6 pb-10'>

          {projetos.length === 0 ? (
            <div className='quadro-vazio'>
              <p className='t-xl'>Seu projeto vai aparecer aqui.</p>
            </div>
          ) : (
            <div className='grade-2'>
              {projetos.map((p) => (
                <div key={p.titulo + p.link} className='cartao'>
                  {p.imagem && (
                    <Image src={p.imagem} alt={p.titulo} width={800} height={450} style={{ width: '100%', height: 'auto' }} />
                  )}
                  <div className='pilha g-2' style={{ padding: '1.25rem' }}>
                    <h3 className='titulo titulo-sm'>{p.titulo}</h3>
                    <p className='t-sm cor-600'>{[p.autoria, p.ano].filter(Boolean).join(' · ')}</p>
                    {p.descricao && <p className='t-sm'>{p.descricao}</p>}
                    {p.link && (
                      <a href={p.link} target='_blank' rel='noreferrer' className='t-sm seminegrito link' style={{ color: 'var(--verde-escuro)' }}>
                        Ver projeto
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='pt-6'>
            <FormProjeto />
          </div>
        </div>
      </div>
    </>
  )
}
