import { Section } from '../Section'
import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Ratio } from '../Ratio'
import { Gradient } from '../Gradient'
import { Emoji } from '../Emoji'
import { useFluidFontSize } from 'react-fluid-text'
import Image from 'next/image'

export const Hero: React.FC = () => {
    const isMobile = useMobile()
    const [ref, fontSize] = useFluidFontSize({
        compressor: isMobile ? .45 : .25,
        maxFontSize: 145
    })
    return (
        <>
            <section className={s.container}>
                <Section className={s.section}>
                    <Ratio
                        left={1}
                        right={2}
                        reverseMobile
                        leftContent={(
                            <div className={s.leftContainer}>
                                <Gradient />
                                <div className={s.imgContainer}>
                                    <Image
                                        src='/static/hero.png'
                                        width={991}
                                        height={1023}
                                    />
                                </div>
                            </div>
                        )}
                        spacer={!isMobile ? null : (
                            <div style={{
                                position: 'relative',
                                top: 0,
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-10%',
                                    width: '100vw',
                                    borderBottom: 'solid 1px black',
                                }} />
                            </div>
                        )}
                        rightContent={(
                            <>
                                <h1
                                    className={`${s.h1} ${isMobile && s.h1Mobile}`}
                                    ref={ref}
                                    style={{
                                        fontSize
                                    }}
                                >
                                    <div>МУР</div>
                                    <div>МУР</div>
                                    <div>МУР</div>
                                    <div>
                                        МАНСК
                                        <span>
                                            <Image
                                                src='/static/heroEmoji.png'
                                                width={isMobile ? fontSize * .75 : 120}
                                                height={isMobile ? fontSize * .75 : 120}
                                                priority
                                            />
                                        </span>
                                    </div>
                                </h1>
                            </>
                        )}
                    />
                </Section>
                <div
                    className={s.container}
                    style={{
                        borderTop: 'solid 1px black',
                    }}
                >
                    <Section>
                        <p>
                            Lorem ipsum dolor sit amet consectetur{' '}<Emoji name='🎃' /> adipisicing elit. Maxime nam corrupti rem ullam pariatur saepe vel nisi quo, illum incidunt ut laboriosam eum cumque asperiores atque nihil hic sit deserunt velit, deleniti a. Quaerat maxime eligendi tempore ipsa necessitatibus ex quas voluptatum amet voluptates, sequi velit porro fuga? Perspiciatis, iusto.
                        </p>
                    </Section>
                </div>
            </section>
        </>
    )
}