import { Section } from '../Section'
import s from './index.module.css'
import { useMobile } from '../../hooks/useMobile'
import { Ratio } from '../Ratio'
import { Gradient } from '../Gradient'
import { Emoji } from '../Emoji'

export const Hero: React.FC = () => {
    const isMobile = useMobile()
    return (
        <>
            <div className={s.container}>
                <Section className={s.section}>
                    <Ratio
                        left={1}
                        right={2}
                        leftContent={(
                            <div style={{
                                position: 'relative',
                                zIndex: -1,
                                height: '100%',
                            }}>
                                <Gradient />
                                <img
                                    src='/static/hero.svg'
                                    className={s.img}
                                />
                            </div>
                        )}
                        rightContent={(
                            <>
                                <h1
                                    className={s.h1}
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
                                                width: 120
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
                        width: '100%',
                        borderTop: 'solid 1px black',
                        borderBottom: 'none',
                    }}
                >
                    <Section>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nam corrupti rem ullam pariatur saepe vel nisi quo, illum incidunt ut laboriosam eum cumque asperiores atque nihil hic sit deserunt velit, deleniti a. Quaerat maxime eligendi tempore ipsa necessitatibus ex quas voluptatum amet voluptates, sequi velit porro fuga? Perspiciatis, iusto.
                        </p>
                    </Section>
                </div>
            </div>
        </>
    )
}