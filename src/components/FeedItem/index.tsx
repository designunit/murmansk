import { Gradient } from '../Gradient'
import { Header } from '../Header'
import { Section } from '../Section'
import s from './index.module.css'
import { Item } from '@/types'
import { useMobile } from '@/hooks/useMobile'
import React from 'react'
import { Markers } from '../Markers'

interface IFeedItemProps {
    project: any // Item
}

const markers = [
    {
        top: 10,
        left: 40,
        text: `Мой батя ебашит вообще адовые блюда. Ну такой вот примерно
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
        id: 'id1',
    },
    {
        top: 33,
        left: 76,
        text: 'близкая точка для проверялки',
        id: 'id2',
    },
    {
        top: 34,
        left: 70,
        text: 'проверялка для близких точек',
        id: 'id3',
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
                <Markers
                    leftImage={item.left}
                    rightImage={item.right}
                    markersData={markers}
                />
            )

        default:
            return null
    }
}


{/* <div
    dangerouslySetInnerHTML={{ __html: item.post }}
/> */}

export const FeedItem: React.FC<IFeedItemProps> = ({ project }) => {
    const isMobile = useMobile()
    return (
        <div className={s.container} style={{
            borderLeft: 'solid 1px black',
            borderRight: 'solid 1px black',
        }}>
            <Header>

                <p className={s.title}>{project.title}</p>
            </Header>
            <Section>
                {project.items.map((x, i) => (
                    <ProjectItem item={x} key={i} />
                ))}
            </Section>
        </div>
    )
}
