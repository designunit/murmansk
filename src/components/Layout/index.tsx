import { Hero } from '../Hero'
import s from './index.module.css'
import { Menu } from '../Menu'
import { useMobile } from '../../hooks/useMobile'
import { MobileMenu } from '../MobileMenu'
import { Feed } from '../Feed'
import { Emoji } from '../Emoji'
import { Map } from '../Map'

export type modalContentType = {
    text: string
    id: string
    content: JSX.Element | null
}

export type buttonsType = modalContentType[]

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

export interface IItem {
    title: JSX.Element | string
    content: JSX.Element | string
    img: string
    color: string
    tags: string[]
}

const items: IItem[] = [
    {
        title: (
            <>
                Крабовый<Emoji name='crab_1f980' />{' '}
                рейв👽 - музыка🎧 для души👻 и тела💃
            </>
        ),
        content: 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!" Друг мой... Но нет! Мне не под силу это, меня подавляет величие этих явлений.',
        img: '/static/1.png',
        color: '#F5D9D9',
        tags: [
            'мероприятие',
            'проекты'
        ],
    },
    {
        title: 'тест очень длиного заголовока на несколько строчек🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎',
        content: `Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!" Друг мой... Но нет! Мне не под силу это, меня подавляет величие этих явлений.
        Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!" Друг мой... Но нет! Мне не под силу это, меня подавляет величие этих явлений.
        `,
        img: '/static/2.png',
        color: '#DB00FF',
        tags: [
            'жопа с ручкой',
        ]
    },

    {
        title: 'Крабовый🦀 рейв👽 - музыка🎧 для души👻 и тела💃',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit atque voluptas, culpa distinctio voluptates optio numquam laboriosam minima nemo id.',
        img: '/static/hero.png',
        color: 'aqua',
        tags: []
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
            </main>
        </div>
    )
}