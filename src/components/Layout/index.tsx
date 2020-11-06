import { Hero } from '../Hero'
import s from './index.module.css'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { MobileMenu } from '../MobileMenu'
import { Feed } from '../Feed'
import { Map } from '../Map'
import { Footer } from '../Footer'

type button = {
    text: string
    id: string
}

export type buttonsType = button[]

const buttons: buttonsType = [
    {
        text: 'Проекты',
        id: '#one',
    },
    {
        text: 'Карта',
        id: '#two',
    },
    {
        text: 'Мероприятия',
        id: '#three',
    },
]

export const Layout: React.FC<any> = ({ data }) => {
    const isMobile = useMobile()
    return (
        <div className={s.container}>
            {isMobile && (
                <MobileMenu
                    buttons={buttons}
                />
            )}
            <main
                className={s.main}
            >
                <Menu
                    buttons={buttons}
                />
                <Hero />
                <Map />
                <Feed
                    data={data}
                />
                <Footer />
            </main>
        </div>
    )
}