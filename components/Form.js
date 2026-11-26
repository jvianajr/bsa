import { useState } from 'react'
import emailjs from '@emailjs/browser'

// Formulário da página Contato (envia pelo EmailJS para o e-mail do BSA).
export default function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function sendEmail(e) {
    e.preventDefault()
    if (name === '' || email === '' || message === '') {
      alert('Favor preencher todos os campos do formulário.')
      return
    }
    const templateParams = { from_name: name, message, email }
    emailjs.send('service_789rqea', 'template_c6g132p', templateParams, 'c7Hf0SYeVVI_4Jic-').then(
      (response) => {
        console.log('Email enviado', response.status, response.text)
        alert('Mensagem enviada com sucesso! Responderemos assim que possível.')
        setName('')
        setEmail('')
        setMessage('')
      },
      (err) => console.log('Erro: ', err)
    )
  }

  return (
    <div className='container' style={{ maxWidth: '60ch' }}>
      <form onSubmit={sendEmail} className='pilha g-3'>
        <input className='campo campo-transparente' placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name} />
        <input className='campo campo-transparente' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email} />
        <textarea className='campo campo-transparente' placeholder='Mensagem' onChange={(e) => setMessage(e.target.value)} value={message} />
        <button type='submit' className='botao botao-sm' style={{ height: '2.5rem' }}>Enviar</button>
      </form>
    </div>
  )
}
