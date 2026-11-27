// Janela que abre e fecha com o botão + / − (página inicial e ficha técnica).
// Feita com <details>, que o navegador já sabe abrir e fechar. Ao abrir, a página rola até o título se ele estiver fora da tela.
//   alinhada: o título fica alinhado com o texto da página (sem recuo)
//   espaco:   distância entre os blocos do conteúdo (como no resto do site: 1 = 4px)
//   grupo:    janelas com o mesmo grupo funcionam juntas: abrir uma fecha a outra (atributo name do <details>)
import { mostrarTituloAoAbrir } from '../lib/acordeao'

export default function Janela({ titulo, alinhada = false, espaco = 4, grupo, children }) {
  return (
    <details name={grupo} onToggle={(e) => mostrarTituloAoAbrir(e.currentTarget)} className={`janela janela-alta ${alinhada ? 'janela-alinhada' : ''}`}>
      <summary>
        <span className='rotulo seminegrito'>{titulo}</span>
        <span className='mais-menos' aria-hidden='true' />
      </summary>
      <div className={`conteudo pilha g-${espaco}`}>{children}</div>
    </details>
  )
}
