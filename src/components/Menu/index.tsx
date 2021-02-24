import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Section } from '../Section'
import { buttonsType } from '../Layout'
import { Header } from '../Header'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { useState } from 'react'

interface IMenuProps {
    buttons: buttonsType
}

export const Menu: React.FC<IMenuProps> = ({ buttons }) => {
    const isMobile = useMobile()

    const [state, setState] = useState('')
    const getPlaceholder = async () => await markdownToHtml(`👨👩👧👦💗🌊⛄🏂🚣🌅🎑`).then(x => setState(x))
    getPlaceholder()

    return (
        <div style={{
            height: '100%',
            width: '100%',
            margin: 'calc(2rem - 1px)',
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
                    <a className={s.logo}>
                        Мойзалив.рф
                </a>
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