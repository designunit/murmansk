import { Project } from '@/components/Project'
import { Layout } from '@/components/Layout'
import { IMeta, Meta } from '@/components/Meta'
import { Section } from '@/components/Section'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { forwardRef, ReactElement, useCallback, useState } from 'react'
import { useMobile } from '@/hooks/useMobile'
import ReactCompareImage from 'react-compare-image'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/Button'
import { Emoji } from '@/components/Emoji'
import Image from 'next/image'

interface ILandingProps {
    meta: IMeta
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input
        {...props}
        ref={ref}
        style={{
            padding: '8px 16px',
            height: '2rem',
            width: ' 100%',

            fontFamily: ' var(--font-family)',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 26,

            borderRadius: 'var(--border-radius)',
            border: '2px solid #091133',
        }}
    />
))
interface QuestionProps { head: ReactElement | string, required?: boolean, caption?: string }
const Question: React.FC<QuestionProps> = ({ head, children, required = true, caption }) => (
    <div style={{
        marginBottom: '.5rem',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column',
        // maxWidth: '30rem',
        width: '100%',
    }}>
        <div style={{
            fontSize: 22,
            marginBottom: '.5rem',
        }}>
            {head}
        </div>
        {caption && (
            // className={s.questionCaption}
            <p>
                {caption}
            </p>
        )}
        {children}
    </div >
)

const SklonKarla: NextPage<ILandingProps> = ({ meta }) => {
    // const [session, isLoadingSession] = useSession()
    const isMobile = useMobile()

    const { handleSubmit, register } = useForm({
        defaultValues: {
            one: '',
            two: '',
            thee: '',
        },
        shouldFocusError: false,
    })

    const [formState, setFormState] = useState<'start' | 'ok' | 'error' | 'fetch'>('start')

    const onSubmit = useCallback(async value => {
        setFormState('fetch')
        const data = {
            id: 'sklon-karla',
            ...value
        }
        await fetch('/api', { method: 'POST', body: JSON.stringify(data) })
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res)
                }
                return res.json()
            })
            .then(res => {
                res.result === 'error' && console.log(res)
                setFormState(res.result === 'success' ? 'ok' : 'error')
            })
    }, [])

    const Skeleton = props => (
        <img
            src={props.src}
            style={{
                objectFit: 'cover',
                width: '100%',
                filter: ' blur(5px)',
            }}
        />
    )

    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Layout>
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
                                position: 'relative',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/sklon-karla/1.jpg'}
                                rightImage={'/static/projects/sklon-karla/2.jpg'}
                                aspectRatio='wider'
                                skeleton={(
                                    <Skeleton
                                        src={'/static/projects/sklon-karla/1.jpg'}
                                    />
                                )}
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
                                skeleton={(
                                    <Skeleton
                                        src={'/static/projects/sklon-karla/3.jpg'}
                                    />
                                )}
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
                                skeleton={(
                                    <Skeleton
                                        src={'/static/projects/sklon-karla/5.jpg'}
                                    />
                                )}
                            />
                            <p>
                                Выше к амфитеатру ведет тропинка, вдоль которой мы сделали опоры с канатами - это "поручень" для удобного спуска и подъема, особенно зимой и во время дождей или гололедицы. Канаты появились на двух уровнях - для взрослых и тех, кто помладше. Сам амфитеатр расположился на самой высокой точке площадки. Расположение на холме и ступенчатость конструкции защитят отдыхающих от порывов северного ветра, чтобы они могли с комфортом смотреть на закаты и слушать размеренные звуки Барабана.
                            </p>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Section style={{
                                    padding: '2rem 0 1rem 0',
                                    display: 'flex',
                                    flexFlow: 'column',
                                    alignItems: 'center',
                                }}>
                                    <Question
                                        head={(
                                            <>
                                                {'Что вам нравится в предложенном проекте? Какие решения и предложения поддерживаете? '}
                                                <Emoji name='🥰' />
                                            </>
                                        )}
                                    >
                                        <Input
                                            name='one'
                                            ref={register}
                                        />
                                    </Question>
                                    <Question
                                        head={(
                                            <>
                                                {'Что вызывает вопрос в предложенном проекте? Что не нравится? '}
                                                <Emoji name='🥵' />
                                            </>
                                        )}
                                    >
                                        <Input
                                            name='two'
                                            ref={register}
                                        />
                                    </Question>
                                    <Question
                                        head={(
                                            <>
                                                {'Что вы рекомендуете добавить? Ваши идеи и предложения '}
                                                <Emoji name='🤔' />
                                            </>
                                        )}
                                    >
                                        <Input
                                            name='three'
                                            ref={register}
                                        />
                                    </Question>
                                    {(formState === 'start' || formState === 'error') && (
                                        <Button
                                            theme='default'
                                            size={'big'}
                                            type={'submit'}
                                            style={{
                                                alignSelf: 'center',
                                                margin: '2rem 0',
                                            }}
                                        >
                                            {formState === 'error' ? 'Что-то поломалось. Еще раз?' : 'Отправить'}
                                        </Button>
                                    )}
                                    {(formState === 'fetch' || formState === 'ok') && (
                                        <span
                                            style={{
                                                margin: '2rem 0',
                                            }}
                                        >
                                            {formState === 'fetch' ? (
                                                <>
                                                    {'Отправляем '}
                                                    <Emoji name='📡' />
                                                </>
                                            ) : (
                                                <>
                                                    <Emoji name='🤩' />
                                                    {' Ваш ответ отправлен '}
                                                    <Emoji name='🥳' />
                                                </>
                                            )}
                                        </span>
                                    )}
                                </Section>
                            </form>

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
                                        width: ' 100%',
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