import React from 'react'
import { Gradient } from '../Gradient'
import { Header } from '../Header'
import { IItem } from '../Layout'
import { Ratio } from '../Ratio'
import { Section } from '../Section'
import s from './index.module.css'

interface IFeedProps {
    items: IItem[]
}

export const Feed: React.FC<IFeedProps> = ({ items }) => {
    return (
        <>
            {items.map(({ title, content, img, color, tags }, index) => {
                const side = index - 1 % 2
                const pictureEl = (
                    <div
                        className={s.imgContainer}
                    >
                        <Gradient color={color} />
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
            })}
        </>
    )
}