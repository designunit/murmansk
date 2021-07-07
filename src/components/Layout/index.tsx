import s from './index.module.css'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { MobileMenu } from '../MobileMenu'
import { Footer } from '../Footer'
import React from 'react'
import { useRouter } from 'next/router'

type button = {
    text: string
    id: string
    href?: string
}

export type buttonsType = button[]

const buttons: buttonsType = []

export const Layout: React.FC<any> = ({ children, session }) => {
    const isMobile = useMobile()

    const router = useRouter()
    const isIndex = router.asPath === '/'

    return (
        <div className={s.container}>
            {false && isMobile && <MobileMenu buttons={buttons} />}
            <main className={s.main}>
                <Menu buttons={buttons} isIndex={isIndex} session={session} />
                {children}
                <Footer />
            </main>
        </div>
    )
}
