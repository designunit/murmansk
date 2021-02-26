import { Section } from '../Section'
import Link from 'next/link'
import s from './index.module.css'

export const Footer: React.FC = () => {
    return (
        <div className={s.container}>
            <Section style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
            }}>
                <Link
                    href='https://unit4.io'
                >
                    <a>
                        © 2017-2020 design unit 4
                    </a>
                </Link>
                <a
                    href='mailto:inbox@unit4.io'
                >
                    inbox@unit4.io
                </a>
            </Section>
        </div>
    )
}