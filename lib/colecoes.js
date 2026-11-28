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
  // Ordem de deslocamento (27/11/2026): sai de casa, o hotel fica no meio (13º), o trem fecha.
  // Em 4 colunas, cada bloco abaixo é uma linha da grade.

  { slug: 'sonsdacasa', pacote: 36926, nome: 'Sons da Casa', imagem: '/images/casa_200px.png' },
  { slug: 'sonsdobairro', pacote: 36924, nome: 'Sons do Bairro', imagem: '/images/bairro_200px.png' },
  { slug: 'sonsdabeira', pacote: 36925, nome: 'Sons da Beira', imagem: '/images/beira_200px.png' },
  { slug: 'sonsdapraca', pacote: 46833, nome: 'Sons da Praça', imagem: '/images/praca_200px.png' },

  { slug: 'sonsdobar', pacote: 46829, nome: 'Sons do Bar', imagem: '/images/bar_200px.png' },
  { slug: 'sonsdafeira', pacote: 46839, nome: 'Sons da Feira', imagem: '/images/feira_200px.png' },
  { slug: 'sonsdazonaindustrial', pacote: 46828, nome: 'Sons da Zona Industrial', imagem: '/images/zonaindustrial_200px.png' },
  { slug: 'sonsdocentro', pacote: 36946, nome: 'Sons do Centro', imagem: '/images/centro_200px.png' },

  { slug: 'sonsdacidade', pacote: 36937, nome: 'Sons da Cidade', imagem: '/images/cidade_200px.png' },
  { slug: 'sonsdapraia', pacote: 37158, nome: 'Sons da Praia', imagem: '/images/praia_200px.png' },
  { slug: 'sonsdaestacao', pacote: 46831, nome: 'Sons da Estação', imagem: '/images/estacao_200px.png' },
  { slug: 'sonsdaestradadeterra', pacote: 46837, nome: 'Sons da Estrada de Terra', imagem: '/images/estradadeterra_200px.png' },

  { slug: 'sonsdohotel', pacote: 46834, nome: 'Sons do Hotel', imagem: '/images/hotel_200px.png' },
  { slug: 'sonsdocaminho', pacote: 37159, nome: 'Sons do Caminho', imagem: '/images/caminho_200px.png' },
  { slug: 'sonsdafazenda', pacote: 46843, nome: 'Sons da Fazenda', imagem: '/images/fazenda_200px.png' },
  { slug: 'sonsdositio', pacote: 36911, nome: 'Sons do Sítio', imagem: '/images/sitio_200px.png' },

  { slug: 'sonsdafloresta', pacote: 46840, nome: 'Sons da Floresta', imagem: '/images/floresta_200px.png' },
  { slug: 'sonsdogarimpo', pacote: 46838, nome: 'Sons do Garimpo', imagem: '/images/garimpo_200px.png' },
  { slug: 'sonsdorio', pacote: 46836, nome: 'Sons do Rio', imagem: '/images/rio_200px.png' },
  { slug: 'sonsdailha', pacote: 37157, nome: 'Sons da Ilha', imagem: '/images/ilha_200px.png' },

  { slug: 'sonsdemanifestacoes', pacote: 46841, nome: 'Sons de Manifestações', imagem: '/images/manifestacoes_200px.png' },
  { slug: 'sonsdefora', pacote: 46832, nome: 'Sons de Fora', imagem: '/images/fora_200px.png' },
  { slug: 'sonsdoradio', pacote: 46842, nome: 'Sons do Rádio', imagem: '/images/radio_200px.png' },
  { slug: 'sonsdotrem', pacote: 46830, nome: 'Sons do Trem', imagem: '/images/trem_200px.png' },
].map((c) => ({ ...c, imagem: c.imagem || ICONE_PADRAO }))

export default colecoes

export function colecaoPorSlug(slug) {
  return colecoes.find((c) => c.slug === slug) || null
}
