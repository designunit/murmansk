import s from './styles.module.css'

import ReactModal from 'react-modal'
import React, { useRef, useState } from 'react'
import { OpinionForm } from '../OpinionForm'
import { Button } from '../Button'
import Link from 'next/link'
import { Emoji } from '../Emoji'

export type ModalProps = Omit<ReactModal.Props, 'closeTimeoutMS'>

export const Modal: React.FC<{
    modalIsOpen: boolean
    setModalIsOpen: (isOpen: boolean) => void
}> = ({ modalIsOpen, setModalIsOpen }) => {
    const delay = 250

    const [state, setState] = useState<'start' | 'form' | 'finish'>('start')

    const refContainer = useRef<HTMLDivElement>(null)

    return (
        <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            closeTimeoutMS={delay}
            className={s.modal}
            overlayClassName={s.overlay}
            ariaHideApp={false}
        >
            <>
                <div className={s.title}>
                    <span style={{
                        fontWeight: 'bold',
                    }}>
                        МОЙЗАЛИВ // ОПРОС
                    </span>
                    <span ref={refContainer} />
                    <Button
                        size='default'
                        theme='link'
                        onClick={() => setModalIsOpen(false)}
                        className={s.close}
                        style={{
                            position: 'absolute',
                            top: '5.5rem',
                            right: 'calc(8.33% + 2rem)',
                            zIndex: 2,
                            padding: '4px 4px',
                        }}
                    >
                        <Emoji name='❌' style={{
                            width: 32,
                            height: 32,
                        }} />
                    </Button>
                </div>
                {state == 'start' ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <p>
                            Дорогие мурманчане, спасибо, что вы здесь и хотите чаще любоваться видами нашего города!
                        </p>
                        <p>
                            Проект МОЙЗАЛИВ.РФ направлен на то, чтобы превратить все городские территории, ориентированные на залив, в тихие общественные пространства, предназначенные в первую очередь для жителей, а не для туристов. Сейчас мы проводим исследование одиннадцати тестовых площадок, девять из которых планируем реализовать уже этим летом.
                        </p>
                        <p>
                            Никто лучше самих горожан не знает о заливе, о видовых площадках, и о том, что необходимо городу! Расскажите о тех видовых точках, рядом с которыми живете или часто бываете. Как эти пространства используются сейчас и какими они должны стать в будущем?
                        </p>
                        <p>
                            Мы будем признательны услышать ваше мнение, потому что ваши идеи вместе с результатами исследования станут основой для технического задания по благоустройству для архитекторов.
                        </p>
                        <p>
                            Вы можете скорректировать расположение выбранных точек внутри опроса, если вам кажется, что площадка выбрана неудачно, например, расположена слишком близко к домам или на месте вашей парковки. Предложить абсолютно другие видовые точки вы можете на сайте нашего проекта: мойзалив.рф.
                        </p>
                        <p>
                            Делитесь опросом, следите за новостями и участвуйте в дальнейшем обсуждении в <Link href='https://vk.com/moizaliv'><a>группе</a></Link> !
                        </p>
                        <Button
                            onClick={() => setState('form')}
                            theme={'default'}
                            size='big'
                            style={{
                                marginTop: '2rem',
                                marginBottom: '2rem',
                                width: 'fit-content',
                                alignSelf: 'center',
                            }}
                        >
                            <Emoji name='🏁' style={{ marginRight: '.5em' }} />
                            {'НАЧАТЬ ОПРОС'}
                            <Emoji name='✅' style={{ marginLeft: '.5em' }} />
                        </Button>
                    </div>
                ) : state == 'finish' ? (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            paddingBottom: '3rem',
                        }}>
                            <div style={{ fontSize: '56px', lineHeight: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ padding: '.5em 0' }}>
                                    <Emoji name='❤️' />
                                    <Emoji name='💙' />
                                    <Emoji name='💖' />
                                </span>
                                Спасибо, Ваш ответ отправлен
                                <span style={{ padding: '.5em 0' }}>
                                    <Emoji name='👍' />
                                    <Emoji name='👌' />
                                    <Emoji name='👏' />
                                </span>
                            </div>
                        </div>
                        <Button
                            size='big'
                            onClick={() => setModalIsOpen(false)}
                            style={{
                                width: 'fit-content',
                            }}
                        >
                            ЗАВЕРШИТЬ
                            </Button>
                    </div>
                ) : (
                    <OpinionForm
                        showFinish={() => setState('finish')}
                        scrollTop={() => {
                            if (!refContainer.current) return
                            refContainer.current.scrollIntoView({ behavior: 'smooth' })
                        }}
                    />
                )}
            </>
        </ReactModal>
    )
}