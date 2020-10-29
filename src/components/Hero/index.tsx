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
        compressor: isMobile ? .5 : .25,
        maxFontSize: 145
    })
    return (
        <>
            <section className={s.container}>
                <Section className={s.section}>
                    <Ratio
                        left={1}
                        right={2}
                        leftContent={(
                            <div className={s.leftContainer}>
                                <Gradient />
                                <Image
                                    src='/static/hero.png'
                                    className={s.img}
                                    unsized
                                />
                            </div>
                        )}
                        rightContent={(
                            <>
                                <h1
                                    className={s.h1}
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
                                        <Emoji
                                            name='freezing-face_1f976'
                                            resolution={120}
                                            style={{
                                                width: isMobile ? '.75em' : 120
                                            }}
                                        />
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
                            Lorem ipsum dolor sit amet consectetur{' '}<Emoji name='jack-o-lantern_1f383' /> adipisicing elit. Maxime nam corrupti rem ullam pariatur saepe vel nisi quo, illum incidunt ut laboriosam eum cumque asperiores atque nihil hic sit deserunt velit, deleniti a. Quaerat maxime eligendi tempore ipsa necessitatibus ex quas voluptatum amet voluptates, sequi velit porro fuga? Perspiciatis, iusto.
                        </p>
                    </Section>
                </div>
            </section>
        </>
    )
}