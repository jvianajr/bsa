import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Ícone central da página inicial com os "bichinhos" rastejando como lesmas.
// Cada traço da imagem é separado e se move "em sanfona" na direção do próprio corpo:
// a frente se estica, depois a traseira encolhe e alcança. Assim ele avança devagar,
// e de tempos em tempos inverte o sentido, para nunca sair do lugar no desenho.
// Quem prefere menos movimento no sistema (acessibilidade) vê a imagem parada.

const SRC = '/images/sons_300px.png'
const LARGURA = 213 // 85% do tamanho original (250)
const ALTURA = 206 // 85% do tamanho original (242)

// Ajustes do movimento
const ESTICA = 0.18 // quanto o corpo se estica a cada passo (0.18 = 18%)
const PASSO_MIN = 3.5 // duração de um passo (esticar + encolher), em segundos
const PASSO_MAX = 6
const PERCURSO = 2.2 // distância máxima que cada bichinho anda para cada lado, em pixels
const IDA_E_VOLTA_MIN = 40 // tempo para ir e voltar, em segundos
const IDA_E_VOLTA_MAX = 80
const BALANCO = 0.03 // leve balanço da cabeça, em radianos (~2 graus)

function separarBichinhos(img) {
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const { data, width: W, height: H } = ctx.getImageData(0, 0, c.width, c.height)
  const marca = new Int32Array(W * H).fill(-1)
  const visivel = (i) => data[i * 4 + 3] > 10
  const bichinhos = []
  const sorteio = (a, b) => a + Math.random() * (b - a)

  for (let p = 0; p < W * H; p++) {
    if (!visivel(p) || marca[p] >= 0) continue
    const id = bichinhos.length
    const pilha = [p]
    marca[p] = id
    const pixels = []
    let x0 = W, x1 = 0, y0 = H, y1 = 0
    while (pilha.length) {
      const q = pilha.pop()
      pixels.push(q)
      const x = q % W, y = (q / W) | 0
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const n = ny * W + nx
        if (visivel(n) && marca[n] < 0) { marca[n] = id; pilha.push(n) }
      }
    }

    // recorte do bichinho, com uma margem para ele poder se esticar sem cortar
    const w = x1 - x0 + 1, h = y1 - y0 + 1
    const sprite = document.createElement('canvas')
    sprite.width = w
    sprite.height = h
    const sctx = sprite.getContext('2d')
    const recorte = sctx.createImageData(w, h)

    // centro e direção do corpo (eixo mais comprido), pelos momentos da forma
    let soma = 0, mx = 0, my = 0
    for (const q of pixels) {
      const a = data[q * 4 + 3]
      const x = q % W, y = (q / W) | 0
      soma += a; mx += a * x; my += a * y
      recorte.data.set(data.subarray(q * 4, q * 4 + 4), ((y - y0) * w + (x - x0)) * 4)
    }
    sctx.putImageData(recorte, 0, 0)
    mx /= soma; my /= soma
    let cxx = 0, cyy = 0, cxy = 0
    for (const q of pixels) {
      const a = data[q * 4 + 3]
      const dx = (q % W) - mx, dy = ((q / W) | 0) - my
      cxx += a * dx * dx; cyy += a * dy * dy; cxy += a * dx * dy
    }
    const angulo = 0.5 * Math.atan2(2 * cxy, cxx - cyy)
    const ux = Math.cos(angulo), uy = Math.sin(angulo)
    let pmin = Infinity, pmax = -Infinity
    for (const q of pixels) {
      const pr = ((q % W) - mx) * ux + (((q / W) | 0) - my) * uy
      if (pr < pmin) pmin = pr
      if (pr > pmax) pmax = pr
    }

    bichinhos.push({
      sprite,
      ox: mx - x0, oy: my - y0, // centro do corpo dentro do recorte
      cx: mx, cy: my,
      angulo, ux, uy,
      comprimento: Math.max(pmax - pmin, 2),
      passo: sorteio(PASSO_MIN, PASSO_MAX),
      faseP: sorteio(0, Math.PI * 2),
      idaVolta: sorteio(IDA_E_VOLTA_MIN, IDA_E_VOLTA_MAX),
      faseI: sorteio(0, Math.PI * 2),
      faseB: sorteio(0, Math.PI * 2),
    })
  }
  return { bichinhos, escala: LARGURA / W }
}

// Posição e forma de um bichinho no instante t (em segundos).
function poseNoTempo(b, t) {
  // percurso lento de ida e volta ao longo do corpo
  const fi = (2 * Math.PI * t) / b.idaVolta + b.faseI
  const desloc = PERCURSO * Math.sin(fi)
  // para que lado ele está indo; perto da virada o passo diminui até parar, como quem vira devagar
  const sentido = Math.cos(fi)

  // ciclo de um passo (fase de 0 a 1): primeiro estica (a frente avança, a traseira fica),
  // depois encolhe (a frente fica, a traseira alcança)
  const fase = (((t / b.passo) + b.faseP / (2 * Math.PI)) % 1 + 1) % 1
  const CORTE = 0.45
  const suave = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x) // 0 → 1 sem trancos
  const E = ESTICA * b.comprimento // quanto o corpo cresce no auge do passo, em pixels
  let e, centro
  if (fase < CORTE) {
    e = E * suave(fase / CORTE)
    centro = e / 2 // traseira parada: o centro anda metade do que a frente andou
  } else {
    e = E * (1 - suave((fase - CORTE) / (1 - CORTE)))
    centro = E - e / 2 // frente parada: a traseira vem chegando
  }
  // o passo leva o corpo E pixels à frente; tiramos esse avanço médio para que o
  // deslocamento de verdade venha só do percurso lento (e ele não fuja do desenho)
  const sx = 1 + e / b.comprimento
  const sy = 1 / Math.sqrt(sx) // fica um pouco mais fino ao esticar
  const avanço = desloc + sentido * (centro - E * fase)

  const balanco = BALANCO * Math.sin((2 * Math.PI * t) / (b.passo * 2) + b.faseB)
  return { avanço, sx, sy, balanco }
}

export default function BichinhosAnimados() {
  const canvasRef = useRef(null)
  const [animando, setAnimando] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let parar = false
    let quadro = null
    let observador = null
    const img = new window.Image()
    img.src = SRC
    img.onload = () => {
      if (parar || !canvasRef.current) return
      const { bichinhos, escala } = separarBichinhos(img)
      const canvas = canvasRef.current
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = LARGURA * dpr
      canvas.height = ALTURA * dpr
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      let ultimo = 0
      const desenhar = (agora) => {
        quadro = requestAnimationFrame(desenhar)
        if (agora - ultimo < 33) return // ~30 quadros por segundo bastam
        ultimo = agora
        const t = agora / 1000
        const s = escala * dpr
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const b of bichinhos) {
          const { avanço, sx, sy, balanco } = poseNoTempo(b, t)
          const px = b.cx + b.ux * avanço
          const py = b.cy + b.uy * avanço
          // escala do site → posição → gira para a direção do corpo → estica → volta à orientação do desenho
          ctx.setTransform(s, 0, 0, s, px * s, py * s)
          ctx.rotate(b.angulo + balanco)
          ctx.scale(sx, sy)
          ctx.rotate(-b.angulo)
          ctx.drawImage(b.sprite, -b.ox, -b.oy)
        }
      }
      // só anima enquanto o ícone está visível na tela (economiza bateria no celular)
      const ligar = () => { if (quadro === null) quadro = requestAnimationFrame(desenhar) }
      const desligar = () => { if (quadro !== null) { cancelAnimationFrame(quadro); quadro = null } }
      if ('IntersectionObserver' in window) {
        observador = new IntersectionObserver(([e]) => (e.isIntersecting ? ligar() : desligar()))
        observador.observe(canvas)
      } else {
        ligar()
      }
      setAnimando(true)
    }
    return () => {
      parar = true
      if (observador) observador.disconnect()
      if (quadro !== null) cancelAnimationFrame(quadro)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: LARGURA, height: ALTURA, margin: '0 auto' }}>
      {/* imagem parada: aparece até a animação começar (e para quem prefere menos movimento) */}
      <div style={{ position: 'absolute', inset: 0, opacity: animando ? 0 : 1, transition: 'opacity 0.6s' }}>
        <Image src={SRC} width={LARGURA} height={ALTURA} alt='Banco Sonoro Amazônico' priority />
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden='true'
        style={{ position: 'absolute', inset: 0, width: LARGURA, height: ALTURA, opacity: animando ? 1 : 0, transition: 'opacity 0.6s' }}
      />
    </div>
  )
}
