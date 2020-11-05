import { useRef, useState, useEffect } from 'react'
import { Gradient } from '../Gradient'
import { Header } from '../Header'
import { Section } from '../Section'
import s from './index.module.css'
import { Item } from '@/types'

interface IFeedItemProps {
    item: Item
    index: number
}

export const FeedItem: React.FC<IFeedItemProps> = ({ item, index }) => {
    // cms placeholers
    const title ='заглушка для заголовка'
    const img = `/static/${(index % 2)+1}.png`
    const color = (index % 2) ? '#DB00FF' : '#F5D9D9'

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
        if (textHeight > imgHeight && imgHeight > 50) {
            setState(true)
        }
    }, [textRef, imgRef])

    const side = index - 1 % 2

    return (
        <div
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
                        <div>
                            <span
                                ref={imgRef}
                                style={{
                                    float: side ? 'right' : 'left',
                                    position: 'relative',
                                    top: '-1rem',
                                    marginLeft: side && '1rem',
                                    marginRight: !side && '1rem',
                                    marginBottom: '-1rem',
                                    height: '100%',
                                    maxHeight: 600,
                                    width: '33%',

                                    display: 'flex',
                                }}
                            >
                                <Gradient color={color} />
                                <span className={s.imgContainer}>
                                    <img
                                        src={img}
                                    />
                                </span>
                            </span>
                            {state && (
                                <span className={s.textDivider}>
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
                            <div
                                dangerouslySetInnerHTML={{ __html: item.post }}
                            />
                        </div>
                        {/* <div className={s.links}>
                            {tags.map((tag, i) => (
                                <span key={i}>
                                    <a>
                                        #{tag}
                                    </a>
                                    {!(i === tags.length - 1) && ', '}
                                </span>
                            ))}
                        </div> */}
                    </div>
                </Section>
            </div>
        </div>
    )
}
