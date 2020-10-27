import { useRef } from 'react'
import { Header } from '../Header'
import { Ratio } from '../Ratio'
import { Section } from '../Section'
import s from './index.module.css'

export const Feed: React.FC<{ items: any }> = ({ items }) => {
    return items.map(({ title, content, img, color, tags }, index) => {
        const side = index - 1 % 2

        const imgRef = useRef(null)

        const pictureEl = (
            <div
                className={s.imgContainer}
            >
                <div style={{
                    position: 'absolute',
                    zIndex: -1,
                    top: 'max(-12.5vw, -760px / 2)',
                    left: 'max(-25vw, -760px / 2)',
                    width: '50vw',
                    height: '50vw',
                    maxWidth: 760,
                    maxHeight: 760,
                    background: `radial-gradient(closest-side at center, ${color} 27.23%, rgba(255, 255, 255, 0) 100%)`,
                    pointerEvents: 'none',
                }} />
                <div className={s.imgBorders} />
                <img
                    className={s.img}
                    src={img}
                />
            </div>
        )
        const contentEl = (
            <div className={`${s.content} ${side ? s.contentLeft : s.contentRight}`}>
                <p>
                    {content}
                </p>
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className={s.link}
                    >
                        <a
                            key={i}
                        >
                            #{tag}
                        </a>
                        {!(i === tags.length - 1) && ', '}
                    </span>
                ))}
            </div>
        )

        return (
            <div
                key={index}
                className={s.container}
            >
                <Header>
                    <Section>
                        <p className={s.title}>
                            // {title}
                        </p>
                    </Section>
                </Header>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: 'solid 1px black',
                }}>
                    <Section
                        style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}
                    >
                        {side ? (
                            <Ratio
                                left={2}
                                right={1}
                                leftContent={contentEl}
                                rightContent={pictureEl}
                            />
                        ) : (
                                <Ratio
                                    left={1}
                                    right={2}
                                    leftContent={pictureEl}
                                    rightContent={contentEl}
                                />
                            )}
                    </Section>
                </div>
            </div>
        )
    })
}