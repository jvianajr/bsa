import { useRef } from 'react'
import Image from 'next/image'

// Faixa com o espectrograma de uma obra, na largura do texto. Ao clicar, abre a imagem
// inteira num popup grande, com o texto de identificação.
//   faixa:   imagem recortada em faixa (a que aparece na página)
//   inteira: imagem completa (a que abre no popup)
//   alt:     descrição da imagem para leitores de tela
//   titulo, serie, ano, autoria: o texto de identificação
export default function FaixaObra({ faixa, faixaLargura, faixaAltura, inteira, inteiraLargura, inteiraAltura, alt, titulo, serie, ano, autoria }) {
  const ref = useRef(null)
  const legenda = <><i>{titulo}</i>. {serie}, {ano}.</>
  return (
    <figure className='faixa-obra'>
      <button type='button' className='faixa-obra-abrir' onClick={() => ref.current.showModal()}
        aria-label={`Ver em tamanho grande: ${titulo}`}>
        <Image src={faixa} width={faixaLargura} height={faixaAltura} alt={alt} />
      </button>
      <figcaption>{legenda} <button type='button' className='faixa-obra-link' onClick={() => ref.current.showModal()}>ver em tamanho grande</button></figcaption>

      <dialog ref={ref} className='janela-obra' aria-label={titulo}
        onClick={(e) => { if (e.target === e.currentTarget) ref.current.close() }}>
        <button type='button' className='janela-palavra-fechar janela-obra-fechar' onClick={() => ref.current.close()}>fechar ✕</button>
        <Image src={inteira} width={inteiraLargura} height={inteiraAltura} alt={alt} sizes='92vw' />
        <div className='janela-obra-texto'>
          <p>{legenda}</p>
          {autoria && <p className='t-sm'>{autoria}</p>}
        </div>
      </dialog>
    </figure>
  )
}
