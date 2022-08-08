import { Section } from '../Section'
import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Ratio } from '../Ratio'
import { Gradient } from '../Gradient'
import { Emoji } from '../Emoji'
import { useFluidFontSize } from 'react-fluid-text'
import Image from 'next/image'
import style from './knopka.module.css'
import React from 'react'
import Link from 'next/link'
import { Timeline } from '../Timeline'

export const Hero: React.FC<any> = () => {
    const isMobile = useMobile()
    const [ref, fontSize] = useFluidFontSize({
        compressor: isMobile ? 0.45 : 0.25,
        maxFontSize: 145,
    })
    return (
        <>
            <section className={s.container}>
                <Section className={s.section}>
                    <Ratio
                        left={1}
                        right={2}
                        reverseMobile
                        leftContent={
                            !isMobile && (
                                <div className={s.leftContainer}>
                                    <Gradient />
                                    <Timeline />
                                    {/* <div className={s.imgContainer}>
                                        <Image
                                            src='/static/hero.png'
                                            width={991}
                                            height={1023}
                                        />
                                    </div> */}
                                </div>
                            )
                        }
                        spacer={
                            !isMobile ? null : (
                                <div
                                    style={{
                                        position: 'relative',
                                        top: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '-10%',
                                            width: '100vw',
                                            borderBottom: 'solid 1px black',
                                        }}
                                    />
                                </div>
                            )
                        }
                        rightContent={
                            <>
                                <h1
                                    className={`${s.h1} ${isMobile && s.h1Mobile
                                        }`}
                                    ref={ref}
                                    style={{
                                        fontSize,
                                    }}
                                >
                                    <div>МУР</div>
                                    <div>МУР</div>
                                    <div>МУР</div>
                                    <div>
                                        МАНСК
                                        <span>
                                            <Image
                                                src='/static/heroEmoji.png'
                                                width={
                                                    isMobile
                                                        ? fontSize * 0.75
                                                        : 120
                                                }
                                                height={
                                                    isMobile
                                                        ? fontSize * 0.75
                                                        : 120
                                                }
                                                priority
                                            />
                                        </span>
                                    </div>
                                </h1>
                            </>
                        }
                    />
                </Section>
                <div
                    className={s.container}
                    style={{
                        borderTop: 'solid 1px black',
                    }}
                >
                    <Section style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}>
                        <div style={{
                            padding: isMobile ? 0 : '0 1rem',
                            borderLeft: !isMobile && 'solid 1px black',
                            borderRight: !isMobile && 'solid 1px black',
                        }}>
                            <h2 className={s.h2}>
                                Дорогие Мурманчане, давайте чаще любоваться
                                видами нашего города!
                            </h2>
                            <div className={s.flex}>
                                <div>
                                    <p>
                                        В этом году мы реализовали 6 площадок: Маяковская площадка, <Link href={'/karla-libnekhta'}>«Склон Либкнехта»</Link> <Emoji name='🌞' />, <Link href={'/severny'}>«Северная площадка»</Link> <Emoji name='🌆' />, <Link href={'/skver-shmidta'}>«Сквер Шмидта»</Link> <Emoji name='👂' />, <Link href={'/dostoevskogo'}>маяк Достоевской</Link> <Emoji name='⚓' /> и <Link href={'/kildinskaya'}>«Кильдинская площадка»</Link> <Emoji name='🏙️' />.
                                    </p>
                                    <p>
                                        Так же публикуем 6 новых концепций : Росляково, Роста, Чумбарово-Лучинского, Орликова, Горелая и Арктический пляж предлагаемых к реализации в 2023 году.
                                    </p>
                                    <p>
                                        Ниже вы найдёте проекты 2021 года <Emoji name='🤩' />, и интерактивную карту Мурманска <Emoji name='🗺️' />, заходите туда и отмечайте точки с лучшими видами города, мы обязательно рассмотрим предложенные территории и включим в список дальнейших реализаций <Emoji name='👍' /> !
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
                {false && (
                    <Section style={{
                        borderTop: 'solid 1px black',
                        borderBottom: 'solid 1px black',
                        maxWidth: '100%',
                        padding: '1% 0',
                        paddingBottom: '0px',
                    }}>
                        <div
                            className={s.cta}
                        >
                            <div className={style['scene-wrapper']}>
                                <svg
                                    className={style.hidden}
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <symbol
                                        viewBox='0 0 2744 489'
                                        id='water-waves'
                                        preserveAspectRatio='xMinYMin'
                                    >
                                        <path
                                            d='M0 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489H0V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489H343V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489H686V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489h-343V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489h-343V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489h-343V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489h-343V0zm343 0s39.5 29.6 79 29.6c41.2 0 82-29.6 82-29.6s50.2 29.6 94 29.6c45.7 0 88-29.6 88-29.6v489h-343V0z'
                                            fillRule='evenodd'
                                        />
                                    </symbol>
                                </svg>
                                <svg
                                    className={
                                        style['water__wave-back']
                                    }
                                >
                                    <use href='#water-waves' />
                                </svg>
                                <svg
                                    className={
                                        style['water__wave-front']
                                    }
                                >
                                    <use href='#water-waves' />
                                </svg>
                            </div>
                            <Link href='/опрос'>
                                <a>
                                    <Section
                                        className={s.ctaText}
                                        style={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            height: '100%',
                                            paddingTop: 0,
                                            paddingBottom: 0,

                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginBottom: '.5em',
                                            }}
                                        >
                                            <Emoji name='📣' />
                                            <Emoji name='📣' />
                                            <Emoji name='📣' />
                                            {' '}{isMobile ? 'пройти опрос' : 'пройти опрос пройти опрос пройти опрос'}{' '}
                                            <Emoji name='📢' />
                                            <Emoji name='📢' />
                                            <Emoji name='📢' />
                                        </span>
                                        <p
                                            style={{
                                                margin: 0,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: isMobile ? 18 : 28,
                                                textTransform: 'uppercase',
                                                whiteSpace: 'normal',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Я расскажу вам, где, как и что надо благоустроить, чтобы с комфортом любоваться заливом!
                                        </p>
                                        <span
                                            style={{
                                                marginTop: '1em',
                                            }}
                                        >
                                            <Emoji name='🔊' />
                                            <Emoji name='🔊' />
                                            <Emoji name='🔊' />
                                            {' '}{isMobile ? 'пройти опрос' : 'пройти опрос пройти опрос пройти опрос'}{' '}
                                            <Emoji name='📣' />
                                            <Emoji name='📣' />
                                            <Emoji name='📣' />
                                        </span>
                                    </Section>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            zIndex: 2,
                                            bottom: isMobile ? '-25px' : '-25px',
                                            right: isMobile
                                                ? '15%'
                                                : '22%',
                                        }}
                                    >
                                        <Image
                                            src='/static/palec.png'
                                            width={
                                                isMobile ? 95 * 0.5 : 95 * 0.75
                                            }
                                            height={
                                                isMobile
                                                    ? 122 * 0.5
                                                    : 122 * 0.75
                                            }
                                            priority
                                        />
                                    </span>
                                </a>
                            </Link>
                        </div>

                    </Section>
                )}
            </section>
        </>
    )
}
