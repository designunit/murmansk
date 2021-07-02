import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { Emoji } from '../Emoji'
import s from './index.module.css'

export const Timeline = () => {
    const data = [
        {
            left: '01.01.2021',
            right: 'запуск проекта',
            emoji: '🚀',
        },
        {
            left: '01.02.2021',
            right: 'запуск интерактивной карты мойзалив.рф ',
            emoji: '🗺️',
        },
        {
            left: '30.03.2021',
            right: 'интервью с жителями и пользователями потенциальных участков',
            emoji: '🗨️',
        },
        {
            left: '25.05.2021',
            right: 'онлайн опрос по функционалу видовых площадок',
            emoji: '📑',
        },
        {
            left: '15.06.2021',
            right: 'разработка концепций видовых площадок',
            emoji: '📐',
        },
        {
            left: '20.06.2021',
            right: 'общественные консультации',
            emoji: '🧑‍🤝‍🧑',
        },
        {
            left: '15.07.2021',
            right: 'разработка рабочей документации видовых площадок',
            emoji: '📄',
        },
        {
            left: '20.07.2021',
            right: 'cтарт реализации видовых площадок',
            emoji: '🏁',
        },
    ]
    const index = 6

    const ref = useRef(null)
    useEffectOnce(() => {
        setTimeout(() => {
            ref.current.scrollTo({
                top: 700,
                behavior: 'smooth',
            })
        }, 500)
    })

    return (
        <div className={s.container} ref={ref}>
            {data.map((x, i) => (
                <div className={s.item}>
                    <div className={`${s.itemContent} ${i < index && s.disabled}`}>
                        <span>
                            {x.left}
                        </span>
                        <div className={s.icon}>
                            <Emoji
                                name={x.emoji}
                            />
                            {i !== data.length - 1 && (
                                <div className={s.line} />
                            )}
                        </div>
                        <span>
                            {x.right}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}