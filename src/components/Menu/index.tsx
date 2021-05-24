import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Section } from '../Section'
import { buttonsType } from '../Layout'
import { Header } from '../Header'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { useState } from 'react'
import Link from 'next/link'

interface IMenuProps {
    buttons: buttonsType
    isIndex?: boolean
}

export const Menu: React.FC<IMenuProps> = ({ buttons, isIndex = false }) => {
    const isMobile = useMobile()

    const [state, setState] = useState('')
    const getPlaceholder = async () => await markdownToHtml(isMobile ? `👦🌊🌅` : `👨👩👧👦💗🌊⛄🏂🚣🌅🎑`, true).then(x => setState(x))
    getPlaceholder()

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