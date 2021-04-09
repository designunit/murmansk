import { Hero } from '../Hero'
import s from './index.module.css'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { MobileMenu } from '../MobileMenu'
import { Feed } from '../Feed'
import { Map } from '../Map'
import { Footer } from '../Footer'
import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal'
import { useRouter } from 'next/router'

type button = {
    text: string
    id: string
    href?: string
}

export type buttonsType = button[]

const buttons: buttonsType = []

export const Layout: React.FC<any> = ({ data }) => {
    const isMobile = useMobile()

    const router = useRouter()
    const isModalOpen = ['1', 'true'].includes(router.query.popForm as string)
    useEffect(() => setModalIsOpen(isModalOpen), [router.query.popForm])
    
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
