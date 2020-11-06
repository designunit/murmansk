import { useMobile } from '@/hooks/useMobile'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '../Section'
import s from './index.module.css'

export const Map: React.FC = () => {
    const isMobile = useMobile()
    return (
        <div className={s.container}>
            <span>
                <Image
                    src='/static/map.png'
                    layout='fill'
                    priority
                />
            </span>
            <Link
                href=''
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
                        fontSize: 50,
                        lineHeight: '135%',
                    }}>
                        <span style={{
                            position: 'absolute',
                            bottom: isMobile ? '5%' : '-95px',
                            right: isMobile ? '-5%' : 'calc(50% - 220px)',
                        }}>
                            <Image
                                src='/static/palec.png'
                                width={95}
                                height={122}
                                priority
                            />
                        </span>
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