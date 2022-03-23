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
import { Emoji } from '@/components/Emoji'

interface ILandingProps {
    data: Item[]
    meta: IMeta
}

const season1 = [
    {
        title: 'Склон Либнекхта',
        preview: '/static/projects/sklon-karla/preview.jpeg',
        href: '/karla-libnekhta',
    },
    {
        title: 'Площадка на Северном проезде',
        preview: '/static/projects/severny/9.jpg',
        href: '/severny',
    },
    {
        title: 'Абрам-мыс',
        preview: '/static/projects/abram-mys/3.jpg',
        href: '/abram-mys',
    },
    {
        title: 'Сквер Шмидта',
        preview: '/static/projects/skver-shmidta/preview.jpg',
        href: '/skver-shmidta',
    },
    {
        title: 'Кильдинская площадка',
        preview: '/static/projects/kildinskaya/preview.jpg',
        href: '/kildinskaya',
    },
    {
        title: 'Маяк на сопке Достоевского',
        preview: '/static/projects/dostoevskogo/preview.jpg',
        href: '/dostoevskogo',
    },
    {
        title: 'Площадка Маяковского',
        preview: '/static/mayakovskogo.jpg',
        href: null,
    },
]

const season2 = [
    {
        title: 'Арктический пляж',
        preview: '/static/projects/arctic-beach/preview.jpg',
        href: null,
    },
    {
        title: 'Гора Горелая',
        preview: '/static/projects/gorelaya/preview.jpg',
        href: null,
    },
    {
        title: 'Склон Чумбарова-Лучинского',
        preview: '/static/projects/chumbarova-luchinskogo/preview.jpg',
        href: null,
    },
    {
        title: 'Сопка Орликовой',
        preview: '/static/projects/orlikovoy/preview.jpg',
        href: null,
    },
    {
        title: 'Набережная Росляково',
        preview: '/static/projects/roslyakovo/preview.jpg',
        href: null,
    },
    {
        title: 'Плетеные гнейсы',
        preview: '/static/projects/wicker-gneises/preview.jpg',
        href: null,
    },
]

const Landing: NextPage<ILandingProps> = ({ data, meta }) => {
    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Layout data={data}>
                <Hero />
                <ProjectsGrid
                    data={season1}
                />
                <ProjectsGrid
                    data={season2}
                    style={{
                        borderTop: 'none',
                    }}
                />
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
