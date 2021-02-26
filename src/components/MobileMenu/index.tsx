import { useState } from 'react'
import { slide as Menu, Styles } from 'react-burger-menu'
import { buttonsType } from '../Layout'
import s from './index.module.css'
import Twirl from 'hamburger-react'

interface IMobileMenuProps {
    buttons: buttonsType
}

const menuStules: Partial<Styles> = {
    bmBurgerButton: {
        position: 'fixed',
        width: '48px',
        height: '48px',
        top: '0px',
        right: '0px',
        marginTop: '.5rem',
        marginRight: '8.33%',
        zIndex: '1101',
    },
    bmBurgerBars: {
        background: 'blue',
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        width: '100%',
        padding: '1rem',
        background: 'white',
        borderLeft: 'solid 1px black',
    },
    bmOverlay: {
        
    },
    bmItemList: {
        height: 'min-content',
        marginTop: '64px',
        marginRight: '8%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    }
}

export const MobileMenu: React.FC<IMobileMenuProps> = ({ buttons }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Menu
            right
            disableAutoFocus
            width='80%'
            isOpen={isOpen}
            styles={menuStules}
            onStateChange={({ isOpen }) => setIsOpen(isOpen)}
            customCrossIcon={false}
            customBurgerIcon={(
                <Twirl
                    toggled={isOpen}
                    size={36}
                    color='black'
                />
            )}
        >
            {buttons.map(({ text, id }, index) => (
                <a
                    key={index}
                    className={s.button}
                    href={id}
                    onClick={() => setIsOpen(false)}
                >
                    {text}
                </a>
            ))}
        </Menu>
    )
}