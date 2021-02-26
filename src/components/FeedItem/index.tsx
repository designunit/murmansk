import { useRef, useState, useEffect } from 'react'
import { Gradient } from '../Gradient'
import { Header } from '../Header'
import { Section } from '../Section'
import s from './index.module.css'
import { Item } from '@/types'
import { useMobile } from '@/hooks/useMobile'

interface IFeedItemProps {
    item: Item
    index: number
}

export const FeedItem: React.FC<IFeedItemProps> = ({ item, index }) => {
    const isMobile = useMobile()

    // cms placeholers
    const title = 'заглушка для заголовка'
    const img = null // `/static/${(index % 2)+1}.png`
    const color = index % 2 ? '#DB00FF' : '#F5D9D9'
    const tags = ['заглушка', 'для', 'тегов']

    const postRef = useRef(null)

    const textRef = useRef(null)
    const imgRef = useRef(null)
    const [displayLine, setDisplayLine] = useState(false)
    useEffect(() => {
        if (!textRef || !imgRef) {
            return
        }
        const textHeight = textRef.current.getBoundingClientRect().height
        const imgHeight = imgRef.current.getBoundingClientRect().height
        setDisplayLine((textHeight > imgHeight && imgHeight > 50) || isMobile)
    }, [
        textRef.current?.getBoundingClientRect().height,
        imgRef.current?.getBoundingClientRect().height,
    ])

    const side = index - (1 % 2)

    return (
        <div className={s.container} ref={postRef}>
            <Header
                style={{
                    borderTop: 'solid 1px black',
                }}
            >
                <Section>
                    <p className={s.title}>// {title}</p>
                </Section>
            </Header>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Section
                    style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                >
                    <div ref={textRef}>
                        <div
                            style={{
                                display: isMobile && 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <span
                                ref={imgRef}
                                style={{
                                    float: side ? 'right' : 'left',
                                    position: 'relative',
                                    top: !isMobile && '-1rem',
                                    marginLeft: !isMobile && side && '1rem',
                                    marginRight: !isMobile && !side && '1rem',
                                    marginBottom: !isMobile && '-1rem',
                                    height: '100%',
                                    maxHeight: !isMobile && 600,
                                    width: isMobile ? '100%' : '33%',

                                    display: 'flex',
                                    flex: 1,
                                }}
                            >
                                {img && (
                                    <>
                                        <Gradient color={color} />
                                        <span className={s.imgContainer}>
                                            <img src={img} />
                                        </span>
                                    </>
                                )}
                            </span>
                            {displayLine && (
                                <span
                                    style={{
                                        marginBottom: !isMobile && '1rem',
                                        position: 'relative',
                                        float: 'left',
                                        width: '100%',
                                    }}
                                >
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: `calc(${
                                                postRef.current?.getBoundingClientRect()
                                                    .width
                                            }px * -.0833 - max(${
                                                postRef.current?.getBoundingClientRect()
                                                    .width
                                            }px - 1440px, 0px)*.5)`,
                                            zIndex: 10,
                                            borderBottom: 'solid 1px black',
                                            width: isMobile
                                                ? '100vw'
                                                : postRef.current?.getBoundingClientRect()
                                                      .width,
                                        }}
                                    />
                                </span>
                            )}
                            <div
                                dangerouslySetInnerHTML={{ __html: item.post }}
                            />
                        </div>
                        {false && (
                            <div className={s.links}>
                                {tags.map((tag, i) => (
                                    <span key={i}>
                                        <a className={s.link}>#{tag}</a>
                                        {i !== tags.length - 1 && ', '}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </Section>
            </div>
        </div>
    )
}
