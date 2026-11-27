// Ao abrir um acordeon, se o título dele saiu da tela (por exemplo, porque outro acordeon acima fechou
// e a página encolheu), rola a página até o título, para o conteúdo começar à vista.
export function mostrarTituloAoAbrir(details) {
  if (!details || !details.open) return
  requestAnimationFrame(() => {
    const titulo = details.querySelector('summary') || details
    const topo = titulo.getBoundingClientRect().top
    if (topo < 8 || topo > window.innerHeight * 0.85) {
      const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollBy({ top: topo - 16, behavior: suave ? 'smooth' : 'auto' })
    }
  })
}
