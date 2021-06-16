import s from './styles.module.css'

import ReactModal from 'react-modal'
import React from 'react'
import { Emoji } from '../Emoji'
import { signIn } from 'next-auth/client'

export type ModalProps = Omit<ReactModal.Props, 'closeTimeoutMS'>

export const Modal: React.FC<{
    modalIsOpen: boolean
    setModalIsOpen: (isOpen: boolean) => void
}> = ({ modalIsOpen, setModalIsOpen }) => {
    const delay = 0

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
                    onClick={() => signIn('vk')}
                >
                    {'Авторизоваться ВК '}
                    <Emoji name='🔑' />
                </button>
            </>
        </ReactModal>
    )
}