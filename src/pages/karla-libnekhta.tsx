import { Project } from '@/components/Project'
import { Layout } from '@/components/Layout'
import { IMeta, Meta } from '@/components/Meta'
import { Section } from '@/components/Section'
import { Item, MarkerData } from '@/types'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useCallback, useState } from 'react'
import { useSession } from 'next-auth/client'
import { Emoji } from '@/components/Emoji'
import { useMobile } from '@/hooks/useMobile'
import { Modal } from '@/components/Modal'
import ReactCompareImage from 'react-compare-image'

interface ILandingProps {
    meta: IMeta
}

const SklonKarla: NextPage<ILandingProps> = ({ meta }) => {
    const [session, isLoadingSession] = useSession()
    const isMobile = useMobile()

    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Layout session={session} >
                <Section style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    ...{
                        padding: isMobile && 0,
                    }
                }}>
                    <Project
                        title='Склон Карла Либнекхта'
                    >
                        <Section
                            style={{
                                padding: '1rem 0',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/sklon-karla/1.jpg'}
                                rightImage={'/static/projects/sklon-karla/2.jpg'}
                                aspectRatio='wider'
                            />
                        </Section>
                        <p>
                            Площадка на Зеленой сопке - природное место с техногенным пейзажем. На ее вершине, у Алеши, гуляет много туристов и жителей, и немногие спускаются гулять по склону ниже. Случайный прохожий, идущий по зеленым холмам, слышит звуки падающего угля, работы кранов и гула судов - его глазам открывается панорама морского порта. Чтобы прохожие не были случайными и приходили сюда чаще, мы создали романтичное место для наблюдений и необычный арт-объект. Два этих объекта разместились по холму на разных уровнях, соединенных естественной тропинкой.
                        </p>
                        <Section
                            style={{
                                padding: '1rem 0',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/sklon-karla/3.jpg'}
                                rightImage={'/static/projects/sklon-karla/4.jpg'}
                                aspectRatio='wider'
                            />
                        </Section>
                        <p>
                            Внизу расположился Барабан - это звуковой арт-объект, работающий по принципу барабана. Ударив в него, каждый может повзаимодействовать с портовой симфонией, звучащей в воздухе, и дополнить ее новыми звуками.
                            Металлические конструкции Барабана цитируют эстетику промышленной панорамы, а форма и металлическое сияние отсылают к традиционным образам Солнца. Полированная поверхность будет ловить с запада лучи закатного солнца и создавать блики и мерцание, которые будет видно из города.
                        </p>
                        <Section
                            style={{
                                padding: '1rem 0',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/sklon-karla/5.jpg'}
                                rightImage={'/static/projects/sklon-karla/6.jpg'}
                                aspectRatio='wider'
                            />
                            <p>
                                Выше к амфитеатру ведет тропинка, вдоль которой мы сделали опоры с канатами - это "поручень" для удобного спуска и подъема, особенно зимой и во время дождей или гололедицы. Канаты появились на двух уровнях - для взрослых и тех, кто помладше. Сам амфитеатр расположился на самой высокой точке площадки. Расположение на холме и ступенчатость конструкции защитят отдыхающих от порывов северного ветра, чтобы они могли с комфортом смотреть на закаты и слушать размеренные звуки Барабана.
                            </p>

                            <Section style={{
                                padding: '1rem 0',
                                display: 'flex',
                                flexFlow: 'column',
                                alignItems: 'center',
                            }}>
                                <h3
                                    style={{
                                        fontSize: 33,
                                        padding: '3rem 0',
                                        margin: 0,
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Видеопрезентация концепции
                                </h3>
                                <iframe 
                                    style={{
                                        width:' 100%',
                                        height: isMobile ? '300px' : 753,
                                        maxWidth: 922,
                                        maxHeight: 753,
                                    }}
                                src="https://www.youtube.com/embed/eBGIQ7ZuuiU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                            </Section>
                        </Section>
                    </Project>
                </Section>
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

export default SklonKarla