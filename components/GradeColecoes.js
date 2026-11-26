import Link from 'next/link'
import Image from 'next/image'

// Grade de ícones das coleções. Recebe só as coleções que já têm sons publicados.
export default function GradeColecoes({ colecoes = [], atual }) {
  const lista = colecoes.filter((c) => c.slug !== atual)
  return (
    <div className='grade-colecoes'>
      {lista.map((c) => (
        <Link key={c.slug} href={`/${c.slug}/`} className='colecao-item'>
          <Image src={c.imagem} width={200} height={200} alt={c.nome} />
          <p><b>{c.nome}</b></p>
        </Link>
      ))}
    </div>
  )
}
