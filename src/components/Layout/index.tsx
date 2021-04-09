import { Hero } from '../Hero'
import s from './index.module.css'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { MobileMenu } from '../MobileMenu'
import { Feed } from '../Feed'
import { Map } from '../Map'
import { Footer } from '../Footer'
import React, { useState } from 'react'
import { Modal } from '../Modal'

type button = {
    text: string
    id: string
    href?: string
}

export type buttonsType = button[]

const buttons: buttonsType = [
    {
        text: 'Карта',
        id: 'map',
        href: 'https://map.latl.ng/FGF6683DZD8R4GE4',
    },
    // {
    //     text: 'Проекты',
    //     id: '#one',
    // },
    // {
    //     text: 'Мероприятия',
    //     id: '#three',
    // },
]

export const Layout: React.FC<any> = ({ data }) => {
    const isMobile = useMobile()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div className={s.container}>
            {false && isMobile && <MobileMenu buttons={buttons} />}
            <main className={s.main}>
                <Modal
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                />
                <Menu buttons={buttons} />
                <Hero setModalIsOpen={setModalIsOpen} />
                <Map />
                {false && <Feed data={data} />}
                <Footer />
            </main>
        </div>
    )
}
