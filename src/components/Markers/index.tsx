import { Section } from '../Section'
import React, { useCallback, useState } from 'react'
import { Item } from './item'
import { Emoji } from '../Emoji'
import ReactCompareImage from 'react-compare-image'
import { useMobile } from '@/hooks/useMobile'
import Collapse from 'rc-collapse'
import s from './index.module.css'
import cx from 'classnames'
import { useForm } from 'react-hook-form'
import ImageMarker, { Marker } from 'react-image-marker'

export interface MarkerData extends Marker {
    text: string
    itemNumber?: Number
    id: string
    isOpen: boolean
}

export const Markers: React.FC = () => {
    const isMobile = useMobile()

    const [markers, setMarkers] = useState<MarkerData[]>([
        {
            top: 10,
            left: 40,
            text: `Мой батя ебашит вообще адовые блюда. Ну такой вот примерно
            рецепт усредненный, потому что вариаций масса. Берется суп, он
            не греется, греть - это не про моего батю. Он берет это суп,
            вываливает его на сковороду и начинает жарить. Добавляет в него
            огромное количество лука, чеснока, перца черного и красного
            МУКИ! для вязкости, томатная паста сверху. Все это жарится до
            дыма. Потом снимается с огня и остужается на балконе. Потом батя
            заносит и щедро полив майонезом начинает есть. При этом ест со
            сковороды шкрябая по ней ложкой. Ест и приговаривает полушепотом
            ух бля. При этом у него на лбу аж пот выступает. Любезно мне
            иногда предлагает, но я отказываюсь. Надо ли говорить о том
            какой дичайший пердеж потом? Вонища такая, что обои от стен
            отклеиваются.`,
            isOpen: true,
            id: 'id1',
        },
        {
            top: 33,
            left: 76,
            text: 'близкая точка для проверялки',
            isOpen: true,
            id: 'id2',
        },
        {
            top: 34,
            left: 70,
            text: 'проверялка для близких точек',
            isOpen: true,
            id: 'id3',
        },
    ])
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

    const { register, handleSubmit, reset, errors } = useForm()

    const onSubmit = useCallback(
        (data) => {
            const newMarker = {
                ...draft,
                text: data.text,
                isOpen: true,
                id: 'vkhgadrg', // not UNIQUE !!!
            }
            setMarkers([...markers, newMarker])
            setAddMode(false)

            setShowForm(false)
            reset()
        },
        [markers, draft]
    )

    const hideForm = useCallback(() => {
        setShowForm(false)
        reset()
    }, [])

    return (
        <Section style={{
            paddingTop: 36,
            paddingBottom: 36,
        }}>
            <div
                style={{
                    position: 'relative',
                }}
            >
                <div className={s.bg}>
                    <ReactCompareImage
                        leftImage='static/map.png'
                        rightImage='static/meta.jpg'
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
                            <div className={s.formContainer} onClick={hideForm}>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className={s.form}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className={s.formHead}>
                                        <span>// Новая точка</span>
                                        <button
                                            style={{
                                                width: 30,
                                                border: 'none',
                                                background: 'white',
                                                cursor: 'pointer',
                                            }}
                                            onClick={hideForm}
                                        >
                                            <Emoji name='❌' />
                                        </button>
                                    </div>
                                    <textarea
                                        name='text'
                                        ref={register({
                                            required: 'Обязательное поле',
                                            maxLength: {
                                                value: 300,
                                                message:
                                                    'Максимум 300 символов',
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Минимум 6 символов',
                                            },
                                        })}
                                        rows={4}
                                        cols={45}
                                        placeholder='Что вы думаете?'
                                        style={{
                                            resize: 'none',
                                        }}
                                    />
                                    {errors?.text && (
                                        <p
                                            style={{
                                                color: 'tomato',
                                                fontSize: 12,
                                            }}
                                        >
                                            {errors?.text.message}
                                        </p>
                                    )}
                                    <button type='submit'>
                                        Поставить точку
                                        <Emoji name='📍' />
                                    </button>
                                </form>
                            </div>
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
