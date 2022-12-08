import Link from 'next/link'


function Home() {
    return (
    <div>
        <h1>Banco Sonoro Amazônico</h1>
        <Link href="/sobre">
        <a>Sobre o projeto</a>
        </Link>
        </div>

    )
}

export default Home