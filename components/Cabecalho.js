// Cabeçalho padrão de todas as páginas, no mesmo formato da página inicial:
// primeira linha maior, segunda linha menor logo abaixo.
// Com "frase" (experimento de 27/11/2026): uma linha só, em minúsculas e no tamanho do texto
// normal do site, com a palavra-título em negrito médio. Ex.: <b>nuvem</b> (ou como se aproximar…)
// Com "uso": uma linha prática logo abaixo, menor e em cinza, dizendo como usar a página.
export default function Cabecalho({ titulo, subtitulo, frase, uso, pb = '10' }) {
  if (frase) {
    return (
      <div className={`cabecalho cabecalho-frase pb-${pb}`}>
        <h1><span className='palavra-titulo'>{titulo}</span> {frase}</h1>
        {uso && <p className='cabecalho-uso'>{uso}</p>}
      </div>
    )
  }
  return (
    <div className={`cabecalho pb-${pb}`}>
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  )
}
