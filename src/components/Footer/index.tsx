import { Section } from '../Section'
import Link from 'next/link'
import s from './index.module.css'

export const Footer: React.FC = () => {
    return (
        <div className={s.container}>
            <Section className={s.section}>
                <div className={s.flex}>
                    <span>
                        автор проекта: Алексей Арушанян
                    </span>
                    <span>
                        реализация проекта: Цайт План
                    </span>
                </div>

                <span>
                    © 2017-2022
                </span>
                <div className={s.flex}>
                    <span>
                        разработка и сопровождение сайта / интерактивной карты:
                    </span>
                    <a
                        href='https://unit4.io'
                    >
                        design : : unit 4
                    </a>
                </div>
            </Section>
        </div>
    )
}