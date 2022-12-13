import styles from '../styles/sons.module.css'

export async function getStaticProps(request, response) {
    const apiSecret = process.env.CLIENT_SECRET;
    
    const res = await fetch(`https://freesound.org/apiv2/packs/36925/sounds?token=${apiSecret}`)
    const data = await res.json ();

    return {
        props: {
            sons: data.results,
        },
    }

    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}



export default function Home({ sons }) {
    return (
        <div className={styles.listadesons}>
            <h1>sons de Casa</h1>
            <ul>
            {sons.map((results) => (
                <li key={results.id}>{results.name}<h6>{results.tags}</h6></li>
            ))}
            </ul>
        </div>
    )
}