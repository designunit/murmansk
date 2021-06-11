import Head from 'next/head'
import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { GetStaticProps } from 'next'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { Item, MarkerData } from '@/types'
import { IMeta, Meta } from '@/components/Meta'
import React from 'react'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { Hero } from '@/components/Hero'
import { Map } from '@/components/Map'
import { Markers } from '@/components/Markers'

interface ILandingProps {
    data: Item[]
    meta: IMeta
    markers: MarkerData[]
}

const Landing: NextPage<ILandingProps> = ({ data, meta, markers }) => {    
    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Layout data={data}>
                <Hero />
                <ProjectsGrid data={data} />
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

    const markers = [
        {
            top: 10,
            left: 40,
            text: `Мой батя ебашит вообще адовые блюда. Ну такой вот примерно
            рецепт усредненный, потому что вариаций масса. Берется суп, он
            не греется, греть - это не про моего батю. Он берет это суп,
            вываливает его на сковороду и начинает жарить. Добавляет в него
            огромное количество лука, чеснока, перца черного и красного
            МУКИ! для вязкости, томатная паста сверху. Все это жарится до
            дыма. Потом снимается с огня и остужается на балконе. Потом батя
            заносит и щедро полив майонезом начинает есть. При этом ест со
            сковороды шкрябая по ней ложкой. Ест и приговаривает полушепотом
            ух бля. При этом у него на лбу аж пот выступает. Любезно мне
            иногда предлагает, но я отказываюсь. Надо ли говорить о том
            какой дичайший пердеж потом? Вонища такая, что обои от стен
            отклеиваются.`,
            id: 'id1',
        },
        {
            top: 33,
            left: 76,
            text: 'близкая точка для проверялки',
            id: 'id2',
        },
        {
            top: 34,
            left: 70,
            text: 'проверялка для близких точек',
            id: 'id3',
        },
    ]

    const data = [
        {
            title: 'Название тестового проекта',
            preview: '/static/proj/1.jpg',
            description: 'описание для тестового проекта с открыточным видом, фруктовым садом и пешеходной набережной вдоль воды. Каждый день вокруг Казанского собора движутся десятки тысяч прихожан, туристов и местных жителей, тут же паркуются 250 автомобилей',
            id: 'test',
            items: [
            ]
        },
        {
            title: 'Название другого тестового проекта',
            preview: '/static/proj/3.jpg',
            description: 'ное пространство для людей. Каждый час до 1000 человек протискивается через 30 хаотично припаркованных автомобилей. Люди идут по узкому тротуару между нагромождением ',
            id: 'test',
            items: [
            ]
        },
        {
            title: 'Название третьего проекта',
            preview: '/static/proj/1.jpg',
            description: 'о для людей. Каждый час до 1000 человек протискивается через 30 хаотично припаркованных автомобилей. Люди идут по узкому тро вокруг Казанского собора движутся десятки тысяч прихожан, туристов и местных жителей, тут же паркуются 250 автомобилей',
            id: 'test',
            items: [
            ]
        },
        {
            title: 'Четвертый проект',
            preview: '/static/proj/2.jpg',
            description: 'короткое описание',
            id: 'test',
            items: [
            ]
        },
    ]

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
            markers,
        }
    }
}

export default Landing
