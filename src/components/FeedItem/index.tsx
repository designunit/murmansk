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

    const pictureEl = (
        <span
            ref={imgRef}
            style={{
                float: side ? 'right' : 'left',
                position: 'relative',
                top: '-1rem',
                marginBottom: '-2rem',
                marginRight: '1rem',
                height: '100%',

                display: 'flex',
            }}
        >
            <Gradient color={color} />

            <div style={{
                position: 'absolute',
                top: 0,
                height: 'calc(100%)',
                width: '100%',
                borderLeft: 'solid 1px black',
                borderRight: 'solid 1px black',
            }} />
            <img
                src={img}
            />
        </span>
    )
    const contentEl = (
        <div ref={textRef}>
            <p>
                {pictureEl}
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
                            left: `calc(-8.33vw - max(${postRef.current?.getBoundingClientRect().width}px - 1440px, 0px)*.5 - 17px)`,
                            borderBottom: 'solid 1px black',
                            width: '100vw'
                        }} />
                    </span>
                )}
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
                    {contentEl}
                </Section>
            </div>
        </div>
    )
}
