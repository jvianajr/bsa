import Head from 'next/head'
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
      <Head>
        <title>Contato | Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido"></meta>
        <meta name="description" content="inserir descrição da página"></meta>
      </Head>
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

