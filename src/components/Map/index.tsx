import Image from 'next/image'
import Link from 'next/link'
import { Section } from '../Section'
import s from './index.module.css'

export const Map: React.FC = () => {
    return (
        <div className={s.container}>
            <Image
                src='/static/map.png'
                width={1152}
                height={452}
                layout='responsive'
            />
            <Link
                href=''
            >
            <a className={s.text}>
                <Section style={{
                    height: '100%',

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 50,
                    lineHeight: '135%',
                }}>
                    <span>
                        я много думаю о мурманске
                </span>
                    <span>
                        у меня есть свое мнение
                </span>
                    <span>
                        хочу чтобы его слышали
                </span>
                </Section>
            </a>
            </Link>
        </div>
    )
}