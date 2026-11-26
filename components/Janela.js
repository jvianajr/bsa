// Janela que abre e fecha com o botão + / − (página inicial e ficha técnica).
// Feita com <details>, que o navegador já sabe abrir e fechar, sem precisar de JavaScript.
//   alinhada: o título fica alinhado com o texto da página (sem recuo)
//   espaco:   distância entre os blocos do conteúdo (como no resto do site: 1 = 4px)
export default function Janela({ titulo, alinhada = false, espaco = 4, children }) {
  return (
    <details className={`janela janela-alta ${alinhada ? 'janela-alinhada' : ''}`}>
      <summary>
        <span className='rotulo seminegrito'>{titulo}</span>
        <span className='mais-menos' aria-hidden='true' />
      </summary>
      <div className={`conteudo pilha g-${espaco}`}>{children}</div>
    </details>
  )
}
