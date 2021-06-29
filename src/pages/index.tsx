import Head from 'next/head'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import { Item } from '@/types'
import { IMeta, Meta } from '@/components/Meta'
import React from 'react'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { Hero } from '@/components/Hero'
import { Map } from '@/components/Map'

interface ILandingProps {
    data: Item[]
    meta: IMeta
}

const Landing: NextPage<ILandingProps> = ({ data, meta }) => {
    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Layout data={data}>
                <Hero />
                <ProjectsGrid />
                <Map />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    // const res = await fetch(`https://unit.tmshv.com/mur-events`)
    // const data = await res.json()
    // const parsed: Item[] = await Promise.all(
    //     data.map(async x => ({
    //         ...x,
    //         post: await markdownToHtml(x.post)
    //     }))
    // )

    const meta: IMeta = {
		title: 'МОЙЗАЛИВ.РФ',
		description: 'Дорогие Мурманчане, давайте чаще любоваться видами нашего города!',
		image: 'https://мойзалив.рф/static/meta.jpg',
		imageWidth: 911,
		imageHeight: 1023,

		url: 'https://мойзалив.рф/',
		siteName: 'Дорогие Мурманчане, давайте чаще любоваться видами нашего города!',
		locale: 'ru_RU',
		type: 'website',
		domain: 'https://мойзалив.рф',

		twitterCard: 'summary_large_image',
		twitterSite: '@',
		twitterCreator: '@tmshv',
	}

    return {
        props: {
            meta,
        }
    }
}

export default Landing
