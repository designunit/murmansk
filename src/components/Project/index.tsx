import { Header } from '../Header'
import s from './index.module.css'
import { useMobile } from '@/hooks/useMobile'
import React from 'react'
import { Markers } from '../Markers'

interface IFeedItemProps {
    project: any // Item
    session: any
    showModal: any
}

const ProjectItem = ({ item, session, showModal }) => {
    switch (item.type) {
        case 'text':
            return (
                <p>{item.text}</p>
            )
        case 'slider':
            return (
                <Markers
                    data={item}
                    session={session}
                    showModal={showModal}
                />
            )

        default:
            return null
    }
}

export const Project: React.FC<any> = ({ title, children }) => {
    const isMobile = useMobile()
    return (
        <div className={s.container} style={{
            borderLeft: !isMobile && 'solid 1px black',
            borderRight: !isMobile && 'solid 1px black',
        }}>
            <Header style={{
                justifyContent: 'flex-start',
            }}>
                <h1 className={s.title}>{title}</h1>
            </Header>
            <div style={{
                padding: '0 1rem',
            }}>
                {children}
            </div>
        </div>
    )
}
