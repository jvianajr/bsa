import styles from '../styles/sons.module.css'

export async function getStaticProps(request, response) {
    const apiSecret = process.env.CLIENT_SECRET;
    
    const resPack = await fetch(`https://freesound.org/apiv2/packs/36926?token=${apiSecret}`)
    const dataPack = await resPack.json ();

    const res = await fetch(`https://freesound.org/apiv2/packs/36926/sounds?token=${apiSecret}`)
    const data = await res.json ();

    return {
        props: {
            infopack: dataPack,
            sons: data.results,
        },
    }

    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}



export default function Home({ sons, infopack }) {
    return (
        <div className={styles.listadesons}>
            <div>
            <h1>{infopack.name}</h1>
            <h3>{infopack.description}</h3>
            <p>Esta coleção possui atualmente <span>{infopack.num_sounds}</span> elementos sonoros.</p>
            </div>
            <p></p>
            <ul>
            {sons.map((results) => (
                <li key={results.id}>{results.name}<h6>{results.tags}</h6>
                <iframe frameborder="0" scrolling="no" src={`https://freesound.org/embed/sound/iframe/${results.id}/simple/large/`} width="920" height="245"></iframe></li>
            ))}
            </ul>
        </div>
    )
}

