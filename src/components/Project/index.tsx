import { Gradient } from '../Gradient'
import { Header } from '../Header'
import { Section as div } from '../Section'
import s from './index.module.css'
import { Item } from '@/types'
import { useMobile } from '@/hooks/useMobile'
import React from 'react'
import { Markers } from '../Markers'
import { CommentedImage } from '../CommentedImage'

interface IFeedItemProps {
    project: any // Item
}

const markers = [
    {
        top: 10,
        left: 40,
        content: `Мой батя ебашит вообще адовые блюда. Ну такой вот примерно
        рецепт усредненный, потому что вариаций масса. Берется суп, он
        не греется, греть - это не про моего батю. Он берет это суп,
        вываливает его на сковороду и начинает жарить. Добавляет в него
        огромное количество лука, чеснока, перца черного и красного
        МУКИ! для вязкости, томатная паста сверху. Все это жарится до
        дыма. Потом снимается с огня и остужается на балконе. Потом батя
        заносит и щедро полив майонезом начинает есть. При этом ест со
        сковороды шкрябая по ней ложкой. Ест и приговаривает полушепотом
        ух бля. При этом у него на лбу аж пот выступает. Любезно мне
        иногда предлагает, но я отказываюсь. Надо ли говорить о том
        какой дичайший пердеж потом? Вонища такая, что обои от стен
        отклеиваются.`,
        id: 1,
    },
    {
        top: 33,
        left: 76,
        content: 'близкая точка для проверялки',
        id: 2,
    },
    {
        top: 34,
        left: 70,
        content: 'проверялка для близких точек',
        id: 3,
    },
]

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
            borderLeft: 'solid 1px black',
            borderRight: 'solid 1px black',
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
