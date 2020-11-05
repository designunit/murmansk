import Head from 'next/head'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import { markdownToHtml } from '@/lib/markdownToHtml'

const Landing: NextPage<any> = ({ data }) => {
    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
            </Head>
            <Layout data={data} />
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`https://unit.tmshv.com/mur-events`)
    const data = await res.json()
    const parsed = await Promise.all(
        data.map(async x => ({
            ...x,
            post: await markdownToHtml(x.post)
        }))
    )

    return {
        props: {
            data: parsed
        }
    }
}

export default Landing