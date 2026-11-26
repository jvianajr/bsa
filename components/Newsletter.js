import { useState } from 'react'

// Caixa de inscrição na newsletter (página inicial).
export default function Newsletter() {
  const [estado, setEstado] = useState('livre') // livre | enviando | ok | erro
  const [mensagem, setMensagem] = useState('')

  async function enviar(e) {
    e.preventDefault()
    const dados = Object.fromEntries(new FormData(e.currentTarget))
    setEstado('enviando')
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dados),
      })
      const j = await r.json().catch(() => ({}))
      if (r.ok && j.ok) {
        setEstado('ok')
      } else {
        setEstado('erro')
        setMensagem(j.mensagem || 'Não foi possível concluir a inscrição agora. Tente mais tarde.')
      }
    } catch {
      setEstado('erro')
      setMensagem('Não foi possível concluir a inscrição agora. Tente mais tarde.')
    }
  }

  return (
    <div className='caixa'>
      <h2 className='titulo titulo-md pb-2'>Receba as novidades do BSA</h2>
      <p className='t-sm pb-4'>
        Inscreva-se gratuitamente para saber de cada nova coleção, lançamento e atividade do Banco Sonoro Amazônico.
      </p>
      {estado === 'ok' ? (
        <div className='aviso aviso-ok' role='status'>
          Quase lá! Enviamos um e-mail para você confirmar a inscrição. Se não encontrar, confira a caixa de spam.
        </div>
      ) : (
        <form onSubmit={enviar}>
          <div className='campos-em-linha'>
            <input className='campo' name='nome' placeholder='Seu nome (opcional)' maxLength={100} />
            <input className='campo' name='email' type='email' placeholder='Seu e-mail' required maxLength={200} />
            {/* campo escondido contra robôs */}
            <div aria-hidden='true' className='armadilha'>
              <input name='bsa_verificacao' tabIndex={-1} autoComplete='new-password' defaultValue='' />
            </div>
            <button type='submit' className='botao botao-largo' disabled={estado === 'enviando'}>
              {estado === 'enviando' ? 'Enviando…' : 'Inscrever'}
            </button>
          </div>
          {estado === 'erro' && (
            <div className='aviso aviso-erro mt-3' role='alert'>{mensagem}</div>
          )}
          <p className='t-xs cor-600 pt-3'>
            Usamos seu e-mail só para enviar as novidades do BSA. Você pode cancelar quando quiser pelo link no fim de cada mensagem.
          </p>
        </form>
      )}
    </div>
  )
}
