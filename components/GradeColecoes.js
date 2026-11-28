import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Desvios da grade "solta" da página de coleções (em px, só em telas largas).
// As colunas pares descem meio ícone, para não formar faixas vazias na horizontal;
// e as linhas alternam para a direita e para a esquerda, para cada coluna descer
// em ziguezague ( \ / \ / ). A ordem de leitura (teclado, leitor de tela) continua a da lista.
const DESCE_COLUNA = [0, 110, 30, 140]   // quanto cada coluna desce
const VARIA = [0, 12, -8, 16, 6, -10, 14, -4]   // pequenas variações para não ficar regular
const LADO = 26                          // passo lateral do ziguezague
function desvio(i) {
  const linha = Math.floor(i / 4), coluna = i % 4
  const lado = linha % 2 === 0 ? 1 : -1
  return [DESCE_COLUNA[coluna] + VARIA[i % VARIA.length], lado * LADO]
}

// Grade de ícones das coleções. Recebe só as coleções que já têm sons publicados.
//   solta:      desalinhada em degraus e ziguezague (ver desvio acima)
//   aleatoria:  embaralha a ordem a cada visita (usada em "Outras coleções", embaixo das listas).
//               O embaralhamento acontece no navegador, depois de a página carregar; antes disso
//               (e para quem está sem JavaScript) a ordem é a da lista.
export default function GradeColecoes({ colecoes = [], atual, solta = false, aleatoria = false }) {
  const [ordem, setOrdem] = useState(null)
  useEffect(() => {
    if (!aleatoria) return
    const idx = colecoes.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]] }
    setOrdem(idx)
  }, [aleatoria, colecoes])
  const base = ordem ? ordem.map((i) => colecoes[i]).filter(Boolean) : colecoes
  const lista = base.filter((c) => c.slug !== atual)
  return (
    <div className={solta ? 'grade-colecoes grade-solta' : 'grade-colecoes'}>
      {lista.map((c, i) => {
        const [dy, dx] = desvio(i)
        return (
          <Link key={c.slug} href={`/${c.slug}/`} className='colecao-item'
            style={solta ? { '--dy': `${dy}px`, '--dx': `${dx}px` } : undefined}>
            {/* o desenho repetido como máscara: ao passar o mouse, ele aparece no verde dos links */}
            <span className='colecao-icone' style={{ '--icone': `url(${c.imagem})` }}>
              <Image src={c.imagem} width={200} height={200} alt={c.nome} />
            </span>
            <p><b>{c.nome}</b></p>
          </Link>
        )
      })}
    </div>
  )
}
