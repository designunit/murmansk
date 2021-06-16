import { Section } from '../Section'
import React, { useState } from 'react'
import { Emoji } from '../Emoji'
import ReactCompareImage from 'react-compare-image'
import { useMobile } from '@/hooks/useMobile'
import Collapse from 'rc-collapse'
import s from './index.module.css'
import cx from 'classnames'
import { CommentedImage } from '../CommentedImage'
import { LikeButton } from '../LikeButton'
import { getImage } from '@/api'
import { useQuery } from 'react-query'

interface MarkersProps {
    style?: React.CSSProperties
    data: any
    session: any
    showModal: () => void
}

export const Markers: React.FC<MarkersProps> = ({ style, data, session, showModal }) => {
    const isMobile = useMobile()

    const [showMarkers, setShowMarkers] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [addMode, setAddMode] = useState(false)

    const { isLoading, data: img } = useQuery(`image_${data.id}`, () => getImage(data.id, data.right))

    return (
        <Section style={{
            padding: '1rem 0',
            ...style,
        }}>
            <div style={{
                position: 'relative',
                width: '100%',
                height: ' 100%',
            }}>
                <ReactCompareImage
                    leftImage={data.left}
                    rightImage={data.right}
                    aspectRatio='wider'
                />
                {showMarkers && (
                    <div style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: 0,
                        width: '100%',
                        height: ' 100%',
                    }}>
                        <CommentedImage
                            id={data.id}
                            src={data.right}
                            img={img}
                            allowClick={addMode}
                            onAfterSubmit={() => setAddMode(false)}
                            style={{
                                position: 'relative',
                                margin: '1rem 0',
                                padding: 0,
                            }}
                        />
                    </div>
                )}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <div className={s.viewSwitchContainer}>
                    <LikeButton
                        id={data.id}
                        likes={img?.likeCount}
                        session={session}
                        showModal={showModal}
                    />
                    <button
                        onClick={() => {
                            setShowMarkers(false)
                            setAddMode(false)
                        }}
                        className={cx(
                            !showMarkers && s.viewSwitchActive
                        )}
                    >
                        {'существующая ситуация '}
                        <Emoji name='↔️' />
                        {' концепция изменений'}
                    </button>
                    <button
                        onClick={() => {
                            setShowMarkers(true)

                        }}
                        className={cx(
                            showMarkers && s.viewSwitchActive
                        )}
                    >
                        {'комментарии'}
                        <Emoji name='💡' />
                    </button>
                    {addMode ? (
                        <span style={{
                            marginRight: '1rem',
                            order: 666,
                        }}>
                            {'Выберите место для комментария'}
                        </span>
                    ) : (
                        <button
                            style={{
                                display: !showMarkers && 'none',
                                justifySelf: 'flex-end',
                                marginLeft: 'auto',
                                order: 666,
                            }}
                            onClick={() => {
                                if (!session) {
                                    showModal()
                                    return
                                }
                                setAddMode(true)
                            }}
                        >
                            {'Добавить '}
                            <Emoji name='⚡' />
                        </button>
                    )}
                </div>
                {false && showMarkers && (
                    <div className={s.viewSwitchContainer} style={{ order: 666 }}>
                        {addMode ? (
                            <span style={{
                                marginRight: '1rem',
                            }}>
                                {'Выберите место для комментария'}
                            </span>
                        ) : (
                            <button
                                onClick={() => {
                                    if (!session) {
                                        showModal()
                                        return
                                    }
                                    setAddMode(true)
                                }}
                            >
                                {'Добавить '}
                                <Emoji name='⚡' />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {false && isMobile && showMarkers && ( // mobile comments disabled form now 
                <>
                    <Collapse
                        accordion
                        className={s.mobileAccordion}
                        onChange={(key) => {
                            setActiveId(key)
                        }}
                        expandIcon={(props: any) => (
                            <Emoji
                                name={props.isActive ? '🔽' : '▶️'}
                                style={{ marginRight: '.25em' }}
                            />
                        )}
                    >
                        {data.map((x, i) => (
                            <Collapse.Panel
                                key={x.id}
                                headerClass={s.mobileItemHead}
                                header={<p>{x.content}</p>}
                            >
                                {x.content}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </>
            )}
        </Section>
    )
}
