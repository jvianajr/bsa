import styles from '../styles/sons.module.css'

export async function getStaticProps(request, response) {
    const apiSecret = process.env.CLIENT_SECRET;
    
    const resPack = await fetch(`https://freesound.org/apiv2/packs/36926?token=${apiSecret}`)
    const dataPack = await resPack.json ();

    return {
        props: {
            infopack: dataPack,
        },
    }

    response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}

