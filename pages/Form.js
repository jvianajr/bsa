import { useState } from 'react'
import { Container, Input, Textarea, Button, Stack } from '@chakra-ui/react'
import emailjs from '@emailjs/browser'

function Form() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
  

    function sendEmail(e){
      e.preventDefault();

if(name === '' || email === '' || message === ''){
  alert("Favor preencher todos os campos do formulário.")
  return
}

const templateParams = {
  from_name: name,
  message: message,
  email: email
}

emailjs.send("service_789rqea", "template_c6g132p", templateParams, "c7Hf0SYeVVI_4Jic-")
.then((response) => {
  console.log("Email enviado", response.status, response.text)
  alert("Mensagem enviada com sucesso! Responderemos assim que possível.")
  setName('')
  setEmail('')
  setMessage('')
}, (err) => {
console.log("Erro: ", err)
})      
    }


    return (
      <Container>
             
        <form onSubmit={sendEmail}>
        <Stack spacing={3}>
        <Input placeholder='Nome'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          
          <Input placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
  
  <Textarea pb="5" placeholder='Mensagem'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
  
  <Button type="submit" pt="5" pb="5" colorScheme='teal' size='sm'>
   Enviar
  </Button>
  </Stack>
        </form>
    
      </Container>
    );
  }
  
  export default Form;





//   function App() {
//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [message, setMessage] = useState('')
  
//     return (
//       <div className="container">
//         <h1 className="title">Contato</h1>
  
//         <form className="form" onSubmit={() => {}}>
//           <input 
//             className="input"
//             type="text"
//             placeholder="Digite seu nome"
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//           />
          
//           <input 
//             className="input"
//             type="text"
//             placeholder="Digite seu email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
  
//           <textarea 
//             className="textarea"
//             placeholder="Digite sua mensagem..."
//             onChange={(e) => setMessage(e.target.value)}
//             value={message}
//           />
  
//           <input className="button" type="submit" value="Enviar" />
//         </form>
  
//       </div>
//     );
//   }
  
//   export default App;