import Head from 'next/head'
import { Container, Text, Box } from '@chakra-ui/react'
// import Container from '../components/Container'
 

export default function Home() {
  return (
    <>
<Head>
  <title>BSA _ página inicial</title>
  <meta name="keywords" content="inserir palavras chave"></meta>
  <meta name="description" content="inserir descrição da página"></meta>
</Head>
<Container>
    <Text>uma coleção de sons da paisagem amazônica</Text>

      escute, baixe, crie e compartilhe
       
O Banco Sonoro Amazônico [BSA] é construído a partir de sons coletados na paisagem amazônica, categorizados e disponibilizado na internet através da plataforma freesound.org, no intuito de que possam ser escutados, compartilhados, baixados e utilizados em outros projetos de arte, criação multimídia, pesquisa e educação - de forma gratuita* - sob licença Creative Commons.

É possível navegar e ouvir os sons do Banco Sonoro Amazônico através da estrutura de organização ao longo do site. No entanto, para baixar os arquivos para o computador ou celular, é necessário criar uma conta gratuita no freesound. Para isso, basta preencher o formulário de cadastro, confirmar os dados no seu email e fazer o login na plataforma.

Todas as vezes que algum som do BSA for utilizado, o projeto deve ser mencionado. Clique para saber mais sobre como dar crédito ao projeto e autor.

A navegação pelo BSA segue as seguintes categorias: ambientes (AMB); acontecimentos (ACONT); deslocamentos (DESLOC); gestos (GEST); sinais (SIN); e ruídos (RUID). A tentativa de categorizar os sons tem por objetivo ajudar a navegação no site, ainda que toda tentativa de categorização contém falhas. Por vezes gestos podem ser entendidos como acontecimentos, ruídos podem ser entendidos como ambientes, e assim por diante. A sugestão é navegar.

Para ajudar no processo também inserimos em cada som as tags (palavras-chave), de forma que possam ser encontrados através do mecanismo de busca, localizado na parte superior do site. No menu acima também será possível acessar a ficha técnica do projeto, as perguntas frequentes, além da aba de formação, onde disponibilizamos tutoriais básicos de edição e conversas com outros artistas sonoros.

O BSA está em sua primeira versão e esperamos a cada mês inserir novos arquivos. Utilizamos tecnologia gratuita e de código aberto através do serviço GitHub e Vercel para que sua autonomia não dependa de custos mensais de manutenção. Esperamos que o BSA possa servir ao longo do tempo às mais diversas necessidades, portanto, não hesite em compartilhá-lo com quem achar válido.

Caso queira contribuir financeiramente com o projeto, faça uma doação via PIX através do qr-code abaixo, ou da chave via email bancosonoroamazonico@gmail.com



E, principalmente, boa navegação!
José Viana
idealizador do projeto Banco Sonoro Amazônico
</Container>  
</>  
  )
}
