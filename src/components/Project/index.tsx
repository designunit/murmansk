import { Header } from '../Header'
import s from './index.module.css'
import { useMobile } from '@/hooks/useMobile'
import React from 'react'
import { Markers } from '../Markers'

interface IFeedItemProps {
    project: any // Item
}

const ProjectItem = ({ item }) => {
    switch (item.type) {
        case 'text':
            return (
                <p>{item.text}</p>
            )
        case 'slider':
            return (
                // <CommentedImage 
                //     id={item.id}
                //     src={item.right}
                //     style={{
                //         position: 'relative',
                //         margin: '1rem 0',
                //         padding: 0,
                //     }}
                // />
                <Markers
                    leftImage={item.left}
                    rightImage={item.right}
                    data={item}
                />
            )

        default:
            return null
    }
}

export const Project: React.FC<IFeedItemProps> = ({ project }) => {
    const isMobile = useMobile()
    return (
        <div className={s.container} style={{
            borderLeft: !isMobile && 'solid 1px black',
            borderRight: !isMobile && 'solid 1px black',
        }}>
            <Header style={{
                justifyContent: 'flex-start',
            }}>
                <h1 className={s.title}>{project.title}</h1>
            </Header>
            <div style={{
                padding: '0 1rem',
            }}>
                {project.items.map((x, i) => (
                    <ProjectItem item={x} key={i} />
                ))}
            </div>
        </div>
    )
}
