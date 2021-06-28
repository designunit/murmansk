import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Section } from '../Section'
import { buttonsType } from '../Layout'
import { Header } from '../Header'
import { markdownToHtml } from '@/lib/markdownToHtml'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Emoji } from '../Emoji'
import { signIn, signOut } from 'next-auth/client'

interface IMenuProps {
    buttons: buttonsType
    isIndex?: boolean
    session?: any
}

export const Menu: React.FC<IMenuProps> = ({ buttons, isIndex = false, session }) => {
    const isMobile = useMobile()

    const [state, setState] = useState('')
    const getPlaceholder = async () => await markdownToHtml(isMobile ? `👦🌊🌅` : `👨👩👧👦💗🌊⛄🏂🚣🌅🎑`, true).then(x => setState(x))
    getPlaceholder()

    const [avatar, setAvatar] = useState(false)

    return (
        <div style={{
            height: isIndex ? '100%' : '69px',
            width: '100%',
            margin: isIndex ? 'calc(2rem - 1px)' : 0,
        }}>
            <Header
                style={{
                    position: 'fixed',
                    top: 0,
                    zIndex: 100,
                }}
            >
                <Section
                    className={s.section}
                >
                    <Link href='/'>
                        <a className={s.logo}>
                            Мойзалив.рф
                        </a>
                    </Link>
                    <div className={s.menu}>
                        <div
                            dangerouslySetInnerHTML={{ __html: state }}
                        />
                        {false && session && (
                            <div
                                style={{
                                    position: 'relative',
                                    borderRadius: '50%',
                                    width: '3rem',
                                    height: '3rem',
                                    marginLeft: '1rem',
                                    alignSelf: 'center',
                                    backgroundImage: `url(${session?.user.image ?? null})`,
                                    backgroundSize: 'cover',
                                    border: 'solid 1px black',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setAvatar(!avatar)}
                            >
                                {!session && (
                                    <Emoji name='📲'
                                        style={{
                                            position: 'relative',
                                            top: 'calc(50% - .5em)',
                                            left: 'calc(50% - .5em)',
                                            fontSize: 36,
                                        }}
                                    />
                                )}
                                {avatar && (
                                    <button
                                        className={s.logInOut}
                                        style={{
                                            backgroundColor: !session && '#2787f5',
                                            color: !session && 'white',
                                        }}
                                        onClick={() => {
                                            session ? signOut() : signIn('vk')
                                        }}
                                    >
                                        {session ? (
                                            'Разлогиниться'
                                        ) : (
                                            <>
                                                {'Авторизоваться ВК '}
                                                < Emoji name='🔑' />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                        {!isMobile && (
                            buttons.map(({ text, id, href }, index) => (
                                <a
                                    key={index}
                                    className={s.button}
                                    href={href}
                                >
                                    {text}
                                </a>
                            ))
                        )}
                    </div>
                </Section>
            </Header>
        </div>
    )
}