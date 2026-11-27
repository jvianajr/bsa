import Head from 'next/head'
import Image from 'next/image'
import Logos from '../components/Logos'
import Cabecalho from '../components/Cabecalho'
import Janela from '../components/Janela'

// Ficha técnica: créditos gerais e, em janelas que abrem e fecham, os créditos de cada etapa do projeto.

function Etapa({ titulo, children }) {
  return <Janela grupo='etapas' titulo={titulo} alinhada espaco={1}>{children}</Janela>
}

// Um bloco de crédito: título pequeno e o texto logo abaixo
function Credito({ titulo, children }) {
  return (
    <div className='pb-4'>
      <h6 className='titulo titulo-xs pb-1'>{titulo}</h6>
      {children}
    </div>
  )
}

// Agradecimentos da etapa Carajás, por lugar
const AGRADECIMENTOS_CARAJAS = [
  ['São Luís, MA', 'Ramusyo Brasil, Carolla Ramos, Renata Figueiredo e Victor Sarmento'],
  ['Alto Alegre do Pindaré, MA', 'Jerônio e Jorge'],
  ['Parauapebas, PA', 'Juan Baez, Dany Pimentel, Deyvid Roger, Jacqueline Oliveira e Círia'],
  ['Marabá, PA', 'Amanda Gondim, Margareth Gondim e Mano Souza; Thiago Martins, Tarcilene Varella, Zequinha, Fabio Oliveira e Gabriel Lopes, da Comuna CEPASP; Deíze Botelho e Jairon Gomes, do Instituto Pontal; Clara, Claudenir e Claudelice Santos do Instituto Zé Cláudio e Maria; Mariana Botelho; Gil Ceará; Eric Belém; José Alves, Neto Procopio, Aucimar e o Bar do Moi; Yago Coelho e os vaqueiros da fazenda Paloma, Leonardo, Antônio e Nequinha'],
  ['Canaã dos Carajás, PA', 'Edson da Vila Bom Jesus'],
  ['Nova Ipixuna, PA', 'Claudecir e Manoel Santos da Reserva Zé Cláudio e Maria'],
  ['Itupiranga, PA', 'Allan Amazônico; irmã Maria, Dayane Loura, Dona Socorro e Ronaldo Macena da comunidade da Vila do Tauiry'],
  ['Belém, PA', 'Irene Almeida e Lucas Domires; Rafael da Luz, Samir Dams, e a Associação Fotoativa; Diná Maria Chermont e Raquel Cardoso; Aline Monteiro e Aline Rodrigues'],
]

export default function FichaTecnica() {
  return (
    <>
      <Head>
        <title>Ficha técnica | Banco Sonoro Amazônico</title>
        <meta name="keywords" content="amazonia som arte-sonora paisagem paisaje landscape amazon soundart sound sonido jose-viana amazonica"></meta>
        <meta name="description" content="Ficha técnica do Banco Sonoro Amazônico: créditos, financiamento e agradecimentos de cada etapa do projeto."></meta>
      </Head>
      <div className='container'>
        <Cabecalho titulo="ficha técnica" frase="(créditos, financiamento e agradecimentos de cada etapa do projeto)" uso="abra cada etapa para ver os créditos e os agradecimentos." />
        <div className='pilha g-2'>
          <p>O <b>Banco Sonoro Amazônico</b> é um projeto de construção e partilha de sons, registrados a partir de experiências de deslocamento, de convívio e de escuta das múltiplas realidades da Amazônia.</p>
          <p>Os sons são disponibilizados gratuitamente para usos não comerciais pela plataforma <i>freesound.org</i>, sob licença <i>Creative Commons</i> CC BY-NC 4.0.</p>

          <div className='pt-10'>
            <Credito titulo="concepção, escuta e desenvolvimento"><p>José Viana</p></Credito>
            <Credito titulo="desenvolvimento web"><p>Estúdio Curica</p></Credito>
            <Credito titulo="Banco Sonoro Amazônico"><p>Versão 2.0, 2026.</p></Credito>
          </div>

          <div className='acordeao pt-4 pb-10'>
            <Etapa titulo={<><span className='peso-normal'>2022.</span> Banco Sonoro Amazônico - Etapa 1: Imersão, criação e partilha</>}>
              <p className='pb-5'>Projeto financiado pelo <b>Prêmio Preamar de Cultura e Arte 2022</b> (Edital nº 001/2022, Modalidade 2), da Secretaria de Cultura do Governo do Estado do Pará - SECULT/PA.</p>

              <Credito titulo="assessoria de som"><p>Yuri Onça (Onça Records)</p></Credito>

              <Credito titulo="agradecimentos">
                <p>Diná Maria Chermont, Ewa Urfalino, Raquel Cardoso. Raio Verde, Camila Fialho, Felipe Mendonça, Martín Perez, Rodrigo José. Associação Fotoativa, Anne Dias, Irene Almeida, Jorge Ramos. Debora Flor, Veronique Isabelle, Paula Vanessa, Hugo Kloeckner. Kamara Kó Galeria. Claudia Leão, Delen Castro, Paulo Meira. Carol Abreu, Erika Morhy, Felipe Pamplona. Associação Amprunam, Jéssica, Tadeu, IMPA. Arte Fazenda Renascer, Pablo Remigi, Moana Remigi. Jean Christoff, Rosi Elbaum. Yuri Onça, Bernardo Onça, Onça Records. Louiza Lima, Bernardo Sertório. Bruno Lopes, Marlon Thiago, Raony Miccione. Tainah Fagundes, Felipe Cruz, Cassio Tavernard, Pablo Mufarrej. E todas as pessoas que cruzaram de alguma maneira no processo de construção do BSA.</p>
              </Credito>

              <div className='centro pt-4'>
                <Image src="/images/preamar-secult.png" width="400" height="134" alt="Preamar Cultura e Arte 2022" style={{ margin: '0 auto' }} />
                <p className='t-xs pt-2'>Projeto realizado com recursos do Prêmio Preamar - Cultura e Arte 2022 - Governo do Estado do Pará</p>
              </div>
            </Etapa>

            <Etapa titulo={<><span className='peso-normal'>2026.</span> Banco Sonoro Amazônico - Etapa Carajás</>}>
              <p className='pb-5'>Projeto financiado pelo <b>Edital nº 002/2025 - Cultura Digital</b>, da Política Nacional Aldir Blanc de Fomento à Cultura - PNAB 2025, Governo Federal e Governo do Estado do Pará.</p>

              <Credito titulo="produção local">
                <p>Marabá: Amanda Gondim, Margareth Gondim e Thiago Cruz</p>
                <p>Parauapebas: Deyvid Roger</p>
              </Credito>

              <Credito titulo="vídeo de divulgação"><p>Lucas Domires</p></Credito>

              <Credito titulo="assessoria de imprensa"><p>Ewa Urfalino</p></Credito>

              <Credito titulo="apoio institucional">
                <p>Comuna Cepasp (Marabá, PA)</p>
                <p>Instituto Pontal (Marabá, PA)</p>
                <p>Associação Fotoativa (Belém, PA)</p>
              </Credito>

              <Credito titulo="agradecimentos pessoais">
                <div className='pilha g-3'>
                  {AGRADECIMENTOS_CARAJAS.map(([lugar, nomes]) => (
                    <div key={lugar}>
                      <h6 className='titulo titulo-xs pb-1'>{lugar}</h6>
                      <p>{nomes}</p>
                    </div>
                  ))}
                </div>
              </Credito>

              <div className='pt-4'><Logos /></div>
            </Etapa>
          </div>


        </div>
      </div>
    </>
  )
}
