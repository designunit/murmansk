import { Section } from '../Section'
import React, { useState } from 'react'
import { Emoji } from '../Emoji'
import ReactCompareImage from 'react-compare-image'
import { useMobile } from '@/hooks/useMobile'
import Collapse from 'rc-collapse'
import s from './index.module.css'
import cx from 'classnames'
import { CommentedImage } from '../CommentedImage'
import { signIn, useSession } from 'next-auth/client'
import { getImage } from '@/api'
import { useQuery } from 'react-query'
import { LikeButton } from '../LikeButton'

interface MarkersProps {
    leftImage?: string
    rightImage?: string
    style?: React.CSSProperties
    data: any
}

export const Markers: React.FC<MarkersProps> = ({ style, data, leftImage = 'static/map.png', rightImage = 'static/meta.jpg' }) => {
    const isMobile = useMobile()

    const [showMarkers, setShowMarkers] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [addMode, setAddMode] = useState(false)

    const [session, isLoadingSession] = useSession()

    return (
        <Section style={{
            padding: '1rem 0',
            ...style,
        }}>
            {showMarkers ? (
                <CommentedImage
                    id={data.id}
                    src={data.right}
                    allowClick={addMode}
                    style={{
                        position: 'relative',
                        margin: '1rem 0',
                        padding: 0,
                    }}
                />
            ) : (
                <ReactCompareImage
                    leftImage={leftImage}
                    rightImage={rightImage}
                    aspectRatio='wider'
                />
            )}
            {showMarkers && (
                <div className={s.viewSwitchContainer}>
                    {addMode ? (
                        <span style={{
                            marginRight: '1rem',
                        }}>
                            Выберите место и предложите свою идею
                        </span>
                    ) : (
                        <button
                            onClick={() => {
                                if (!addMode && !session) {
                                    signIn('vk')
                                    return 
                                }
                                setAddMode(true)
                            }}
                        >
                            Добавить
                        </button>
                    )}
                </div>
            )}
            <div className={s.viewSwitchContainer}>
                <LikeButton
                    id={data.id}
                    likes={null} // {img?.likeCount ?? 0}
                    src={data.rightImage}
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
