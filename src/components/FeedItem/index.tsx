import { useRef, useState, useEffect } from 'react'
import { IItem } from '../Layout'
import { Gradient } from '../Gradient'
import { Header } from '../Header'
import { Section } from '../Section'
import s from './index.module.css'

interface IFeedItemProps {
    item: IItem
    index: number
}

export const FeedItem: React.FC<IFeedItemProps> = ({ item, index }) => {
    const { title, content, img, color, tags } = item

    const postRef = useRef(null)

    const textRef = useRef(null)
    const imgRef = useRef(null)
    const [state, setState] = useState(false)
    useEffect(() => {
        if (!textRef || !imgRef) {
            return
        }
        const textHeight = textRef.current.getBoundingClientRect().height
        const imgHeight = imgRef.current.getBoundingClientRect().height
        if (textHeight > imgHeight) {
            setState(true)
        }
    }, [textRef, imgRef])

    const side = index - 1 % 2

    return (
        <div
            key={index}
            className={s.container}
            ref={postRef}
        >
            <Header
                style={{
                    borderTop: 'solid 1px black',
                }}
            >
                <Section>
                    <p className={s.title}>
                        // {title}
                    </p>
                </Section>
            </Header>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Section
                    style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                >
                    <div ref={textRef}>
                        <p>
                            <span
                                ref={imgRef}
                                style={{
                                    float: side ? 'right' : 'left',
                                    position: 'relative',
                                    top: '-1rem',
                                    marginLeft: side && '1rem',
                                    marginRight: !side && '1rem',
                                    marginBottom: '-2rem',
                                    height: '100%',
                                    maxHeight: 600,
                                    width: '33%',

                                    display: 'flex',
                                }}
                            >
                                <Gradient color={color} />

                                <span style={{
                                    position: 'absolute',
                                    top: 0,
                                    height: 'calc(100%)',
                                    width: '100%',
                                    borderLeft: 'solid 1px black',
                                    borderRight: 'solid 1px black',
                                }} />
                                <img
                                    src={img}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </span>
                            {state && (
                                <span style={{
                                    position: 'relative',
                                    float: 'left',
                                    width: '100%',
                                    marginBottom: '1rem',
                                    marginTop: '1rem',
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `calc(${postRef.current?.getBoundingClientRect().width}px * -.0833 - max(${postRef.current?.getBoundingClientRect().width}px - 1440px, 0px)*.5)`,
                                        zIndex: 10,
                                        borderBottom: 'solid 1px black',
                                        width: postRef.current?.getBoundingClientRect().width
                                    }} />
                                </span>
                            )}
                            {content}
                        </p>
                        <div className={s.links}>
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
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
                    </div>
                </Section>
            </div>
        </div>
    )
}
