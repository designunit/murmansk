import s from './styles.module.css'

import ReactModal from 'react-modal'
import React from 'react'
import { Emoji } from '../Emoji'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

export type ModalProps = Omit<ReactModal.Props, 'closeTimeoutMS'>

export const Modal: React.FC<{
    modalIsOpen: boolean
    setModalIsOpen: (isOpen: boolean) => void
    modalCallback: any
}> = ({ modalIsOpen, setModalIsOpen, modalCallback }) => {
    const delay = 0

    const router = useRouter()

    console.log(
        encodeURI(`https://мойзалив.рф${router.pathname}?like=${modalCallback}`)
    )

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
                <span>
                    {'Сначала вам нужно авторизоваться '}
                    <Emoji name='🔐' />
                </span>
                <button
                    onClick={async () => {
                        await signIn('vk', { callbackUrl: encodeURI(`https://мойзалив.рф${router.pathname}?like=${modalCallback}`) })
                    }}
                >
                    {'Войти ВК '}
                    <Emoji name='🔑' />
                </button>
            </>
        </ReactModal>
    )
}