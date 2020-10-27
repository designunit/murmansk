import Head from 'next/head'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'

const Landing: NextPage = () => {
    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
            </Head>
            <Layout />
        </>
    )
}

export default Landing