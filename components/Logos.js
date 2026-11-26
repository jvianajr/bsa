import Image from 'next/image'

// Régua de logos da PNAB (etapa Carajás), com fundo transparente.
// Os textos, que eram brancos no arquivo original, foram escurecidos para aparecer sobre o fundo claro do site.
export default function Logos({ alinhamento = 'center', legenda = true }) {
  return (
    <div className='largura-total py-2'>
      <Image
        src='/images/pnab-regua-transparente.png'
        width={1600}
        height={166}
        style={{ width: '100%', height: 'auto' }}
        alt='Sistema Nacional de Cultura, Política Nacional Aldir Blanc de Fomento à Cultura, Fundação Cultural do Estado do Pará, Secretaria de Cultura do Governo do Estado do Pará e Ministério da Cultura'
      />
      {legenda && (
        <p className='t-xs pt-2' style={{ textAlign: alinhamento }}>
          Edital de Cultura Digital da Política Nacional Aldir Blanc de Fomento à Cultura - PNAB 2025 - Governo Federal e Governo do Estado do Pará
        </p>
      )}
    </div>
  )
}
