// Lista das coleções do Banco Sonoro Amazônico.
// Cada coleção é um pacote ("pack") da conta jose.viana no Freesound.
//
// Para incluir uma coleção nova, acrescente uma linha com:
//   slug:   o endereço da página (bancosonoroamazonico.com.br/<slug>)
//   pacote: o número do pacote no Freesound (aparece no link freesound.org/people/jose.viana/packs/<número>/)
//   nome:   o nome mostrado no site
//   imagem: o ícone em public/images (se não houver, usa o ícone geral)
//
// Uma coleção só aparece na grade quando o pacote já tem sons publicados
// (os sons em moderação no Freesound ainda não contam).

const ICONE_PADRAO = '/images/sons_200px.png'

const colecoes = [
  // Primeira etapa (2022)
  { slug: 'sonsdailha', pacote: 37157, nome: 'Sons da Ilha', imagem: '/images/ilha_200px.png' },
  { slug: 'sonsdapraia', pacote: 37158, nome: 'Sons da Praia', imagem: '/images/praia_200px.png' },
  { slug: 'sonsdabeira', pacote: 36925, nome: 'Sons da Beira', imagem: '/images/beira_200px.png' },
  { slug: 'sonsdositio', pacote: 36911, nome: 'Sons do Sítio', imagem: '/images/sitio_200px.png' },
  { slug: 'sonsdocaminho', pacote: 37159, nome: 'Sons do Caminho', imagem: '/images/caminho_200px.png' },
  { slug: 'sonsdocentro', pacote: 36946, nome: 'Sons do Centro', imagem: '/images/centro_200px.png' },
  { slug: 'sonsdacidade', pacote: 36937, nome: 'Sons da Cidade', imagem: '/images/cidade_200px.png' },
  { slug: 'sonsdobairro', pacote: 36924, nome: 'Sons do Bairro', imagem: '/images/bairro_200px.png' },
  { slug: 'sonsdacasa', pacote: 36926, nome: 'Sons da Casa', imagem: '/images/casa_200px.png' },

  // Etapa Carajás (2026)
  { slug: 'sonsdazonaindustrial', pacote: 46828, nome: 'Sons da Zona Industrial' },
  { slug: 'sonsdafloresta', pacote: 46840, nome: 'Sons da Floresta' },
  { slug: 'sonsdafazenda', pacote: 46843, nome: 'Sons da Fazenda' },
  { slug: 'sonsdobar', pacote: 46829, nome: 'Sons do Bar' },
  { slug: 'sonsdamanifestacao', pacote: 46841, nome: 'Sons da Manifestação' },
  { slug: 'sonsdotrem', pacote: 46830, nome: 'Sons do Trem' },
  { slug: 'sonsdefora', pacote: 46832, nome: 'Sons de Fora' },
  { slug: 'sonsdaestradadeterra', pacote: 46837, nome: 'Sons da Estrada de Terra' },
  { slug: 'sonsdapraca', pacote: 46833, nome: 'Sons da Praça' },
  { slug: 'sonsdorio', pacote: 46836, nome: 'Sons do Rio' },
  { slug: 'sonsdogarimpo', pacote: 46838, nome: 'Sons do Garimpo' },
  { slug: 'sonsdaestacao', pacote: 46831, nome: 'Sons da Estação' },
  { slug: 'sonsdoradio', pacote: 46842, nome: 'Sons do Rádio' },
  { slug: 'sonsdafeira', pacote: 46839, nome: 'Sons da Feira' },
  { slug: 'sonsdacomunidade', pacote: 46835, nome: 'Sons da Comunidade' },
  { slug: 'sonsdohotel', pacote: 46834, nome: 'Sons do Hotel' },
].map((c) => ({ ...c, imagem: c.imagem || ICONE_PADRAO }))

export default colecoes

export function colecaoPorSlug(slug) {
  return colecoes.find((c) => c.slug === slug) || null
}
