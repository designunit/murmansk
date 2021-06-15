import { ProjectsGrid } from '@/components/ProjectsGrid'
import { Project } from '@/components/Project'
import { Hero } from '@/components/Hero'
import { Layout } from '@/components/Layout'
import { Markers } from '@/components/Markers'
import { IMeta, Meta } from '@/components/Meta'
import { Section } from '@/components/Section'
import { Item, MarkerData } from '@/types'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { useSession } from 'next-auth/client'
import { Emoji } from '@/components/Emoji'

interface ILandingProps {
    data: Item[]
    meta: IMeta
    markers: MarkerData[]
}

const ProjectPage: NextPage<ILandingProps> = ({ data, meta, markers }) => {
    const [session, isLoadingSession] = useSession()

    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Layout data={data}>
                <Section style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                }}>
                    {isLoadingSession ? (
                        <div style={{
                            height: '75vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexFlow: 'column',
                        }}>
                            <span>
                                Загрузка
                            </span>
                            <div>
                                <Emoji name={'🌐'} />
                                <Emoji name={'📲'} />
                                <Emoji name={'👾'} />
                            </div>
                        </div>
                    ) : (
                        <Project
                            project={data[0]}
                        />
                    )}
                </Section>
            </Layout>
        </>
    )
}

const data = [
    {
        title: 'Название тестового проекта',
        preview: 'src',
        description: 'описание для тестового проекта',
        id: 'test',
        items: [
            {
                type: 'slider',
                left: '/static/proj/1.jpg',
                right: '/static/proj/2.jpg',
                id: 666,
            },
            {
                type: 'text',
                text: 'Асфальтовая парковка вокруг важнейшего собора Петербурга или площадь с открыточным видом, фруктовым садом и пешеходной набережной вдоль воды. Каждый день вокруг Казанского собора движутся десятки тысяч прихожан, туристов и местных жителей, тут же паркуются 250 автомобилей, которые занимают 7 гектаров территории, портят вид, мешают проходу и уничтожают культурный потенциал общественного пространства. У нас есть быстрые и простые решения этих проблем.'
            },
            {
                type: 'slider',
                left: '/static/proj/2.jpg',
                right: '/static/proj/3.jpg',
                id: 1337,
            },
            {
                type: 'text',
                text: 'Как хаотичная парковка в одном из красивейших мест города превращается в качественное общественное пространство для разных возрастов и потребителей. Конюшенная площадь — это 8000 квадратных метров паркинга на 200 автомобилей среди памятников культурного наследия. Площадь такого размера и расположения должна быть превращена в мощный центр притяжения для массовых мероприятий.'
            },
            {
                type: 'slider',
                left: '/static/proj/1.jpg',
                right: '/static/proj/3.jpg',
                id: 322,
            },
            {
                type: 'text',
                text: 'Превращаем сквер для автомобилей в общественное пространство для людей. Каждый час до 1000 человек протискивается через 30 хаотично припаркованных автомобилей. Люди идут по узкому тротуару между нагромождением знаков и рекламных стендов, перебегают набережную по широкой проезжей части — всё это противоречит здравому смыслу и легко превращается в удобное пространство для пешеходов.'
            },
        ]
    }
]

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
            data,
            meta,
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: data.map(x => `/${x.id}`),
        fallback: false,
    }
}

export default ProjectPage