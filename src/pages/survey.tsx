import Head from 'next/head'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { Item } from '@/types'
import { IMeta, Meta } from '@/components/Meta'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/Button'
import { Emoji } from '@/components/Emoji'
import { OpinionForm } from '@/components/OpinionForm'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Layout } from '@/components/Layout'
import { useMobile } from '@/hooks/useMobile'

interface ILandingProps {
    data: Item[]
    meta: IMeta
}

const Landing: NextPage<ILandingProps> = ({ meta }) => {
    const [state, setState] = useState<'start' | 'form' | 'finish'>('start')
    const refContainer = useRef<HTMLDivElement>(null)
    const isMobile = useMobile()

    return (
        <>

            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <span ref={refContainer} />
            <Layout>
                <Section style={{
                    flex: '1 0 100%',
                    paddingTop: 0,
                    paddingBottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: state == 'start' ? 'row' : 'column',

                            borderLeft: state !== 'start' && !isMobile && 'solid 1px black',
                            borderRight: state !== 'start' && !isMobile && 'solid 1px black',
                            padding: state == 'form' && !isMobile && '0 1rem',
                        }}
                    >
                        {state == 'start' ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderLeft: !isMobile && 'solid 1px black',
                                borderRight: !isMobile && 'solid 1px black',
                                padding: isMobile ? '1% 0' : '1% 1rem',
                            }}>
                                <p>
                                    Дорогие мурманчане, спасибо, что вы здесь и хотите чаще любоваться видами нашего города!
                        </p>
                                <p>
                                    Проект МОЙЗАЛИВ.РФ направлен на то, чтобы превратить все городские территории, ориентированные на залив, в тихие общественные пространства, предназначенные в первую очередь для жителей, а не для туристов. Сейчас мы проводим исследование семи тестовых площадок которые планируем реализовать уже этим летом.
                        </p>
                                <p>
                                    Никто лучше самих горожан не знает о заливе, о видовых площадках, и о том, что необходимо городу! Расскажите о тех видовых точках, рядом с которыми живете или часто бываете. Как эти пространства используются сейчас и какими они должны стать в будущем?
                        </p>
                                <p>
                                    Мы будем признательны услышать ваше мнение, потому что ваши идеи вместе с результатами исследования станут основой для технического задания по благоустройству для архитекторов.
                        </p>
                                <p>
                                    Вы можете скорректировать расположение выбранных точек внутри опроса, если вам кажется, что площадка выбрана неудачно, например, расположена слишком близко к домам или на месте вашей парковки. Предложить абсолютно другие видовые точки вы можете на сайте нашего проекта: мойзалив.рф.
                        </p>
                                <p>
                                    Делитесь опросом, следите за новостями и участвуйте в дальнейшем обсуждении в <Link href='https://vk.com/moizaliv'><a>группе</a></Link> !
                        </p>
                                <Button
                                    onClick={() => setState('form')}
                                    theme={'default'}
                                    size='big'
                                    style={{
                                        marginTop: '2rem',
                                        marginBottom: '2rem',
                                        width: 'fit-content',
                                        alignSelf: 'center',
                                    }}
                                >
                                    <Emoji name='🏁' style={{ marginRight: '.5em' }} />
                                    {'НАЧАТЬ ОПРОС'}
                                    <Emoji name='✅' style={{ marginLeft: '.5em' }} />
                                </Button>
                            </div>
                        ) : state == 'finish' ? (
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <div style={{
                                    paddingBottom: '3rem',
                                    textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '56px', lineHeight: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ padding: '.5em 0' }}>
                                            <Emoji name='❤️' />
                                            <Emoji name='💙' />
                                            <Emoji name='💖' />
                                        </span>
                                Спасибо, Ваш ответ отправлен
                                <span style={{ padding: '.5em 0' }}>
                                            <Emoji name='👍' />
                                            <Emoji name='👌' />
                                            <Emoji name='👏' />
                                        </span>
                                    </div>
                                </div>
                                <Link href='/'>
                                    <Button
                                        size='big'
                                        style={{
                                            width: 'fit-content',
                                        }}
                                    >
                                        ЗАВЕРШИТЬ
                            </Button>
                                </Link>
                            </div>
                        ) : (
                            <OpinionForm
                                showFinish={() => setState('finish')}
                                scrollTop={() => {
                                    if (!refContainer.current) return
                                    refContainer.current.scrollIntoView({ behavior: 'smooth' })
                                }}
                            />
                        )}
                    </div>
                </Section>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch(`https://unit.tmshv.com/mur-events`)
    const data = await res.json()
    const parsed: Item[] = await Promise.all(
        data.map(async x => ({
            ...x,
            post: await markdownToHtml(x.post)
        }))
    )

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
            data: parsed,
            meta
        }
    }
}

export default Landing
