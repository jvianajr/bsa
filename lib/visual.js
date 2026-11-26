// Variações visuais do site. O site usa a combinação definida em PADRAO;
// as outras ficam guardadas aqui para poder voltar a elas trocando uma palavra.

export const PADRAO = { topo: 'escuro', fundo: 'c-suave' }

// o "arco-íris" leve de sempre
const ARCO_IRIS = 'linear-gradient(#FFFFF0 0%, #E6FFFA 25%, #FAF5FF 50%, #FFFFF0 80%)'

// fundo da parte principal das páginas
export const FUNDOS = {
  original: { nome: 'Original (só arco-íris)', css: { backgroundImage: ARCO_IRIS } },
  'a-suave': { nome: 'Espectrograma A, suave', imagem: '/images/espectro-corpo-a-suave.jpg' },
  'a-solido': { nome: 'Espectrograma A, sólido', imagem: '/images/espectro-corpo-a-solido.jpg' },
  'b-solido': { nome: 'Espectrograma B, sólido', imagem: '/images/espectro-corpo-b-solido.jpg' },
  'c-suave': { nome: 'Espectrograma C, suave', imagem: '/images/espectro-corpo-c-suave.jpg' },
  'c-solido': { nome: 'Espectrograma C, sólido', imagem: '/images/espectro-corpo-c-solido.jpg' },
}

// o espectrograma é "multiplicado" sobre o arco-íris: os traços ganham a cor do fundo
for (const f of Object.values(FUNDOS)) {
  if (f.imagem) {
    f.css = {
      backgroundImage: `url('${f.imagem}'), ${ARCO_IRIS}`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover, 100% 100%',
      backgroundPosition: 'center top, center',
      backgroundRepeat: 'no-repeat',
    }
    // no computador a imagem fica parada enquanto a página rola
    f.fixoNoComputador = true
  }
}

// faixa do topo (atrás do logo e do menu)
export const TOPOS = {
  claro: { nome: 'Topo claro' },
  escuro: { nome: 'Topo escuro' },
}
