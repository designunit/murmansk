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

const AbramMys: NextPage<ILandingProps> = ({ meta }) => {
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
            id: 'abram-mys',
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
                        title='Абрам мыс'
                    >
                        <Section
                            style={{
                                padding: '1rem 0',
                                position: 'relative',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/abram-mys/1.jpg'}
                                rightImage={'/static/projects/abram-mys/2.jpg'}
                                aspectRatio='wider'
                                skeleton={(
                                    <Skeleton
                                        src={'/static/projects/abram-mys/1.jpg'}
                                    />
                                )}
                            />
                        </Section>
                        <p>
                            Обзорная площадка на Абрам мысе станем мощным туристическим аттрактором. Такое решение поспособствует дополнительному притоку туристов в этот, на сегодняшний день, обособленный район города. Площадка создаст сильный архитектурный образ, превратиться в значимую достопримечательность, направленную на спокойный отдых и созерцание.
                        </p>
                        <Section
                            style={{
                                padding: '1rem 0',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/abram-mys/3.jpg'}
                                rightImage={'/static/projects/abram-mys/4.jpg'}
                                aspectRatio='wider'
                                skeleton={(
                                    <Skeleton
                                        src={'/static/projects/abram-mys/3.jpg'}
                                    />
                                )}
                            />
                        </Section>
                        <p>
                            Площадка организована таким образом, что позволяет максимально раскрыть видовые возможности этого уникального места. Объект состоит из нескольких уровней, связанных лестницей. Верхний уровень – обзорная площадка – консоль, ориентированная в сторону города, второй уровень образует параллельный заливу променад.
                        </p>
                        <Section
                            style={{
                                padding: '1rem 0',
                                position: 'relative'
                            }}
                        >
                            <Image
                                src={'/static/projects/abram-mys/5.jpg'}
                                width={3733}
                                height={2732}
                                objectFit='cover'
                            />
                            <p>
                                Важно, что площадка будет построена из натуральных материалов (кортеновая сталь, металл), что позволяет органично вписаться в природный ландшафт. Кроме того объект минимально опирается на каменные выступы, бережно сохраняя существующую природную эко-систему. Площадка станет эффектным завершением эко-маршрута и обеспечит безопасный круглогодичный доступ для жителей и гостей города, позволяя увидеть захватывающую панораму с нового ракурса.
                            </p>
                        </Section>
                        <Section
                            style={{
                                padding: '1rem 0',
                            }}
                        >
                            <ReactCompareImage
                                leftImage={'/static/projects/abram-mys/6.jpg'}
                                rightImage={'/static/projects/abram-mys/7.jpg'}
                                aspectRatio='wider'
                                skeleton={(
                                    <Skeleton
                                        src={'/static/projects/abram-mys/6.jpg'}
                                    />
                                )}
                            />
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
                                    <Question
                                        head={(
                                            <>
                                                {'Оставьте свои контакты (телефон/почта/социальные сети/мессенджеры) если вы готовы принимать участие в обсуждении проекта '}
                                                <Emoji name='🤓' />
                                            </>
                                        )}
                                    >
                                        <Input
                                            name='four'
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

export default AbramMys