import Image from 'next/image'
import Link from 'next/link'
import { Section } from '../Section'
import s from './index.module.css'

export const Map: React.FC = () => {
    return (
        <div className={s.container}>
            <span>
            <Image
                src='/static/map.png'
                // width={1152}
                // height={452}
                layout='fill'
            />
            </span>
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
                        {['я много думаю о мурманске', 'у меня есть свое мнение', 'хочу чтобы его слышали'].map(x => (
                            <span className={s.str}>
                                {x}
                            </span>
                        ))}
                    </Section>
                </a>
            </Link>
        </div>
    )
}