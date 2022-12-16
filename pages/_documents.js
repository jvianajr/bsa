import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
    render() {
        return (
        <Html>
            <Head>
                <meta content="IE-edge" httpEquiv="X-UM-Compatible" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
        )
    }
}

export default MyDocument