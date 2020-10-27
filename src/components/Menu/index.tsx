import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Section } from '../Section'
import { buttonsType } from '../Layout'
import { Header } from '../Header'

interface IMenuProps {
    buttons: buttonsType
}

export const Menu: React.FC<IMenuProps> = ({ buttons }) => {
    const isMobile = useMobile()

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}
        >
            <Section
                className={s.section}
            >
                <a className={s.logo}>
                    КисКисМур🐯🐱🐈
                </a>
                <div className={s.menu}>
                    {!isMobile && (
                        buttons.map(({ text, id, content }, index) => (
                            <a
                                key={index}
                                className={s.button}
                                href={id}
                            >
                                {text}
                            </a>
                        ))
                    )}
                </div>
            </Section>
        </Header>
    )
}