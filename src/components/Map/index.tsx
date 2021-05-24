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
                href='https://map.latl.ng/FGF6683DZD8R4GE4'
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
    )
}
