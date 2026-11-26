// Cabeçalho padrão de todas as páginas, no mesmo formato da página inicial:
// primeira linha maior, segunda linha menor logo abaixo.
export default function Cabecalho({ titulo, subtitulo, pb = '10' }) {
  return (
    <div className={`cabecalho pb-${pb}`}>
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  )
}
