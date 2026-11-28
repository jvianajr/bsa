import Seo from '../components/Seo'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from '../components/Form'
import Cabecalho from '../components/Cabecalho'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

export default function Contato() {
  return (
    <>
      <Seo titulo="Contato" descricao="Fale com o Banco Sonoro Amazônico: ideias, parcerias, usos comerciais dos sons e outras questões." caminho="/contato" />
      <div className='container'>
      <Cabecalho titulo="Contato" subtitulo="Ideias, questões e assuntos diversos: escreva pelo formulário abaixo." />
      <div className='pilha g-5 pb-10'>
        <Form />
        <p className='centro pt-5 t-sm'>Ou escreva para <b>bancosonoroamazonico@gmail.com</b></p> 
        <p className='centro pt-5 t-sm'>Para tratar pessoalmente, <b>josealmeidavianajunior@gmail.com</b>. Responderei o mais breve possível.</p>
        <p className='centro pt-5 pb-5 t-sm'>Até logo!</p>
        </div>
</div>
    </>
  )
}

