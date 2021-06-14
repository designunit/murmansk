import { useMobile } from '@/hooks/useMobile'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Emoji } from '../Emoji'
import { Section } from '../Section'
import s from './index.module.css'

export const Map: React.FC = () => {
    const isMobile = useMobile()
    return (
        <>
            <Section style={{
                paddingTop: 0,
                paddingBottom: 0,
            }}>
                <p style={{
                    margin: '0',
                    padding: isMobile ? '1rem 0' : '1rem',
                    borderLeft: !isMobile && 'solid 1px black',
                    borderRight: !isMobile && 'solid 1px black',
                }}>
                    Делитесь своими предложениями <Emoji name='💡' /> на интерактивной карте. Если вы не нашли свои любимые видовые точки - предложите, и мы включим их в программу на следующий год!
                    <span>
                        <Emoji name='👇' />
                        <Emoji name='🗺️' />
                        <Emoji name='👇' />
                    </span>
                </p>
            </Section>
            <div className={s.container}>
                <span>
                    <Image
                        src='/static/map.png'
                        layout='fill'
                        priority
                    />
                </span>
                <Link
                    href='https://mesto.io/FGF6683DZD8R4GE4'
                >
                    <a className={s.text}>
                        <Section style={{
                            position: 'relative',
                            height: '100%',

                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',

                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: isMobile ? 28 : 36,
                            lineHeight: '135%',
                        }}>
                            {/* <span style={{
                            position: 'absolute',
                            bottom: isMobile ? '-25px' : '-95px',
                            right: isMobile ? '0%' : 'calc(50% - 220px)',
                        }}>
                            <Image
                                src='/static/palec.png'
                                width={isMobile ? 95 * .75 : 95}
                                height={isMobile ? 122 * .75 : 122}
                                priority
                            />
                        </span> */}
                            {['Покажу вам на карте точную точку!'].map((x, i) => (
                                <span className={s.str} key={i}>
                                    {x}
                                </span>
                            ))}
                        </Section>
                    </a>
                </Link>
            </div>
        </>
    )
}
