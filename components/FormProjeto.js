import { useState } from 'react'
import emailjs from '@emailjs/browser'

// Formulário para enviar um projeto que usou sons do BSA.
// Usa o mesmo serviço de e-mail (EmailJS) do formulário de Contato: o envio chega no e-mail do BSA.
const SERVICO = 'service_789rqea'
const MODELO = 'template_c6g132p'
const CHAVE_PUBLICA = 'c7Hf0SYeVVI_4Jic-'

export default function FormProjeto() {
  const [estado, setEstado] = useState('livre') // livre | enviando | ok | erro

  async function enviar(e) {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    if (d.bsa_verificacao) return setEstado('ok') // campo anti-robô
    setEstado('enviando')
    const mensagem = [
      '[PROJETO COM SONS DO BSA]',
      '',
      `Projeto: ${d.titulo}`,
      `Link: ${d.link || '-'}`,
      `Imagens: ${d.imagens || '-'}`,
      `Sons ou coleções usados: ${d.sons || '-'}`,
      '',
      'Sobre o projeto:',
      d.descricao || '-',
      '',
      `Autoriza a exibição no site do BSA: ${d.autoriza ? 'sim' : 'não'}`,
    ].join('\n')
    try {
      await emailjs.send(SERVICO, MODELO, { from_name: d.nome, email: d.email, message: mensagem }, CHAVE_PUBLICA)
      setEstado('ok')
    } catch (err) {
      console.error('Ecos: erro ao enviar projeto', err)
      setEstado('erro')
    }
  }

  if (estado === 'ok') {
    return (
      <div className='aviso aviso-ok' role='status'>
        Recebemos o seu projeto, muito obrigado! Vamos conhecer com carinho e avisamos por e-mail quando ele estiver no site.
      </div>
    )
  }

  return (
    <div className='caixa'>
      <h2 className='titulo titulo-md pb-2'>Envie o seu projeto</h2>
      <p className='t-sm pb-5'>
        Usou sons do Banco Sonoro Amazônico em uma música, filme, peça, instalação, podcast, pesquisa ou qualquer outra criação? Conte pra gente: os projetos enviados podem aparecer aqui, como ecos do BSA.
      </p>
      <form onSubmit={enviar} className='pilha g-3'>
        <input className='campo' name='nome' placeholder='Seu nome ou do coletivo' required maxLength={120} />
        <input className='campo' name='email' type='email' placeholder='Seu e-mail' required maxLength={200} />
        <input className='campo' name='titulo' placeholder='Nome do projeto' required maxLength={160} />
        <input className='campo' name='link' type='url' placeholder='Link para ver ou ouvir o projeto (opcional)' maxLength={400} />
        <input className='campo' name='sons' placeholder='Quais sons ou coleções você usou? (opcional)' maxLength={400} />
        <textarea className='campo' name='descricao' placeholder='Conte-nos sobre o projeto (opcional, até umas 5 linhas)' rows={5} maxLength={600} />
        <input className='campo' name='imagens' type='url' placeholder='Link para imagens do projeto (opcional: Google Drive, Dropbox, Instagram...)' maxLength={400} />
        <div aria-hidden='true' className='armadilha'>
          <input name='bsa_verificacao' tabIndex={-1} autoComplete='new-password' defaultValue='' />
        </div>
        <label className='caixa-marcar'>
          <input type='checkbox' name='autoriza' value='sim' defaultChecked />
          <span className='t-sm'>Autorizo a exibição deste projeto no site do Banco Sonoro Amazônico.</span>
        </label>
        {estado === 'erro' && (
          <div className='aviso aviso-erro' role='alert'>
            Não foi possível enviar agora. Tente de novo ou escreva para bancosonoroamazonico@gmail.com.
          </div>
        )}
        <div>
          <button type='submit' className='botao botao-largo' disabled={estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando…' : 'Enviar projeto'}
          </button>
        </div>
      </form>
    </div>
  )
}
