import { Section } from '../Section'
import React, { useCallback, useState } from 'react'
import { Item } from './item'
import { Emoji } from '../Emoji'
import ReactCompareImage from 'react-compare-image'
import { useMobile } from '@/hooks/useMobile'
import Collapse from 'rc-collapse'
import s from './index.module.css'
import cx from 'classnames'
import ImageMarker, { Marker } from 'react-image-marker'
import { MarkerData } from '@/types'
import { Form } from './form'

interface MarkersProps {
    markersData: MarkerData[]
    leftImage?: string
    rightImage?: string
    style?: React.CSSProperties
}

export const Markers: React.FC<MarkersProps> = ({ style, markersData, leftImage = 'static/map.png', rightImage = 'static/meta.jpg' }) => {
    const isMobile = useMobile()

    const [markers, setMarkers] = useState<MarkerData[]>(markersData.map(x => ({ ...x, isOpen: true })))
    const onItemClick = useCallback(
        (id: string, state: boolean) => {
            const newMarkers = markers.map((x, i) =>
                x.id === id ? { ...x, isOpen: state } : x
            )
            setMarkers(newMarkers)
        },
        [markers]
    )
    const [draft, setDraft] = useState({ top: null, left: null })
    const [showForm, setShowForm] = useState(false)
    const [showMarkers, setShowMarkers] = useState(false)
    const [activeId, setActiveId] = useState(undefined)
    const [addMode, setAddMode] = useState(false)

    return (
        <Section style={{
            paddingTop: 36,
            paddingBottom: 36,
            ...style,
        }}>
            <div
                style={{
                    position: 'relative',
                }}
            >
                <div className={s.bg}>
                    <ReactCompareImage
                        leftImage={leftImage}
                        rightImage={rightImage}
                        aspectRatio='wider'
                        handle={showMarkers ? <></> : null}
                    />
                </div>
                {showMarkers && (
                    <>
                        <ImageMarker
                            src='static/placeholder.png'
                            alt=''
                            markers={markers}
                            onAddMarker={(marker: Marker) => {
                                if (!addMode) {
                                    return
                                }
                                setDraft(marker)
                                setShowForm(true)
                            }}
                            // @ts-ignore
                            markerComponent={(props: MarkerData) => (
                                <Item
                                    {...props}
                                    onItemClick={onItemClick}
                                    isOpen={
                                        isMobile
                                            ? activeId === props.id
                                            : props.isOpen
                                    }
                                />
                            )}
                        />
                        {showForm && (
                            <Form
                                setMarkers={setMarkers}
                                setAddMode={setAddMode}
                                setShowForm={setShowForm}
                                draft={draft}
                                markers={markers}
                            />
                        )}
                    </>
                )}
            </div>
            {showMarkers && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 20,
                }}>
                    <button
                        onClick={() => setAddMode(!addMode)}
                    >
                        {addMode ? 'Отмена' : 'Добавить точку'}
                    </button>
                </div>
            )}
            <div className={s.viewSwitchContainer}>
                <button
                    onClick={() => {
                        setShowMarkers(false)
                        setShowForm(false)
                        setAddMode(false)
                    }}
                    className={cx(
                        s.viewSwitch,
                        !showMarkers && s.viewSwitchActive
                    )}
                >
                    {'Посмотреть картинку '}
                    <Emoji name='↔️' />
                </button>
                <span
                    style={{
                        padding: '.5em 1em',
                    }}
                >
                    //
                </span>
                <button
                    onClick={() => {
                        setShowMarkers(true)
                    }}
                    className={cx(
                        s.viewSwitch,
                        showMarkers && s.viewSwitchActive
                    )}
                >
                    {'Посмотреть идеи '}
                    <Emoji name='💡' />
                </button>
            </div>
            {isMobile && showMarkers && (
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
                        {markers.map((x, i) => (
                            <Collapse.Panel
                                key={x.id}
                                headerClass={s.mobileItemHead}
                                header={<p>{x.text}</p>}
                            >
                                {x.text}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </>
            )}
        </Section>
    )
}
