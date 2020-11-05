import { Hero } from '../Hero'
import s from './index.module.css'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { MobileMenu } from '../MobileMenu'
import { Feed } from '../Feed'
import { Map } from '../Map'
import { Footer } from '../Footer'

export type buttonsType = any

const buttons: buttonsType = [
    {
        text: 'Проекты',
        id: '#one',
        content: <>ТЫ НАЖАЛ "О ПРОЕКТЕ"</>,
    },
    {
        text: 'Карта',
        id: '#two',
        content: <>CCC ASD SA </>,
    },
    {
        text: 'Мероприятия',
        id: '#three',
        content: <>CCC ASD SA </>,
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