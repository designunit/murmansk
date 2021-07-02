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
import Link from 'next/link'

interface ILandingProps {
    meta: IMeta
}

type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement>
const Input = forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => (
    <textarea
        {...props}
        ref={ref}
        cols={3}
        style={{
            padding: '8px 16px',
            // height: '2rem',
            width: ' 100%',
            minWidth: ' 100%',
            maxWidth: '100%',

            fontFamily: ' var(--font-family)',
            fontWeight: 500,
            fontSize: 16,

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
                        title='Склон Карла Либнекхта'
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
                            <img
                                src={'/static/projects/abram-mys/5.jpg'}
                                style={{
                                    width: '100%',
                                }}
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
                        </Section>
                        <Section style={{
                            padding: '3rem 0',
                            display: 'flex',
                            flexFlow: 'column',
                            alignItems: 'center',
                        }}>
                            <h3
                                style={{
                                    fontSize: 33,
                                    padding: '2rem 0',
                                    margin: 0,
                                    textTransform: 'uppercase',
                                }}
                            >
                                ВИДЕОПРЕЗЕНТАЦИЯ КОНЦЕПЦИИ МЕСТНЫМ ЖИТЕЛЯМ 25 ИЮНЯ 2021 Г.
                            </h3>
                            <iframe
                                src="https://drive.google.com/file/d/1Ixg0wGcgoz6A4ALrsD_xwSgqcohoGboW/preview"
                                allow="autoplay"

                                style={{
                                    width: '100%',
                                    height: isMobile ? '100%' : 720,
                                    maxWidth: 1280,
                                    maxHeight: 720,
                                    border: 'none',
                                }}
                            />
                            <Link
                                href='/static/projects/abram-mys/report.pdf'
                            >
                                <a
                                    style={{
                                        paddingTop: '2rem',
                                        whiteSpace: 'unset',
                                        maxWidth: '100%',
                                    }}
                                    target='_blank'
                                >
                                    <Button
                                        size='big'
                                        style={{
                                            maxWidth: '100%',
                                            whiteSpace: 'unset',
                                        }}
                                    >
                                        Резюме обсуждения проекта с местными жителями <br />
                                        по результатам проект будет доработан
                                    </Button>
                                </a>
                            </Link>
                        </Section>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Section style={{
                                padding: '2rem 0 1rem 0',
                                display: 'flex',
                                flexFlow: 'column',
                                alignItems: 'center',
                            }}>
                                <p
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Перед заполенением формы обратной связи, пожалуйста, посмотрите видеопрезентацию о проекте и ознакомьтесь с резюме обсуждения проекта с жителями. Мы ответили на ключевые вопросы о проекте и договорились с жителями об изменениях, которые необходимо внести в проект.
                                </p>
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
                        <Section
                            style={{
                                padding: '1rem 0 1rem 0',
                                display: 'flex',
                                flexFlow: 'column',
                                gap: isMobile ? 32 : 16,
                                fontSize: '1.25rem',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: 33,
                                    padding: '2rem 0 1rem 0',
                                    margin: 0,
                                    textTransform: 'uppercase',
                                }}
                            >
                                Команда проекта
                            </h2>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    Алексей Арушанян
                                    <Emoji name='🥶' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Автор проекта мойзалив.рф, координатор
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    Елизавета Савостьянова
                                    <Emoji name='🥳' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Организатор
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    Дарья Тимофеева
                                    <Emoji name='😎' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Организатор
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    Андрей Фесенко
                                    <Emoji name='🤑' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Организатор
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    Виктория Пашкова
                                    <Emoji name='😏' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Куратор исследования и соучастия
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    Юлия Секушина
                                    <Emoji name='🤩' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Антрополог проекта
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    <Link
                                        href='http://arch-katarsis.com/about/ru'
                                    >
                                        <a
                                            target='_blank'
                                        >
                                            katarsis architects
                                        </a>
                                    </Link>
                                    <Emoji name='🤠' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Авторы концепции
                                </span>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: 8,
                                    flexFlow: isMobile && 'column',
                                }}
                            >
                                <b>
                                    <Link
                                        href='https://unit4.io/'
                                    >
                                        <a
                                            target='_blank'
                                        >
                                            design : : unit 4
                                        </a>
                                    </Link>
                                    <Emoji name='👾' style={{ marginLeft: 8 }} />
                                </b>
                                <span>
                                    Сайт, фирменный стиль
                                </span>
                            </div>
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