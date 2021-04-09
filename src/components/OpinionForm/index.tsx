import s from './styles.module.css'
import cx from 'classnames'
import { Controller, useForm, useWatch } from 'react-hook-form'
import React, { useCallback, forwardRef, useState, ReactElement, useEffect } from 'react'
import { Button } from '../Button'
import Image from 'next/image'
import { useEffectOnce } from 'react-use'

const Row: React.SFC = props => (
    <div className={s.row}>
        {props.children}
    </div>
)

const Space: React.SFC = props => (
    <i className={s.space}>
        {props.children}
    </i>
)

type InputProps = React.InputHTMLAttributes<HTMLInputElement>
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input
        {...props}
        ref={ref}
        className={cx(s.field, props.className)}
    />
))

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
    <textarea
        {...props}
        ref={ref}
        className={cx(s.field, props.className)}
    />
))

type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => (
    <form
        {...props}
        ref={ref}
        className={cx(s.form, props.className)}
    />
))

interface QuestionProps { head: ReactElement | string, required?: boolean, caption?: string }
const Question: React.FC<QuestionProps> = ({ head, children, required = true, caption }) => (
    <div className={s.question}>
        <div className={s.questionHead}>
            {required && <Required />}
            {head}
        </div>
        {caption && (
            <p className={s.questionCaption}>
                {caption}
            </p>
        )}
        {children}
    </div>
)

const Radios = forwardRef<HTMLFormElement | any, any>(({ data, name, register, errors, checkbox = false, userAnwser = false, required = true }, ref) => {
    const [state, setState] = useState('')
    const [checked, setChecked] = useState(false)
    return (
        <>
            <div className={s.radio}>
                {/* @ts-ignore */}
                {data.map((x, i) => (
                    x && <label key={i}>
                        <input name={name} type={checkbox ? 'checkbox' : 'radio'} value={x} ref={register(required && { required: 'Обязательное поле' })} />
                        {x}
                    </label>
                ))}
                {userAnwser && (
                    <label>
                        <input onChange={() => setChecked(!checked)} checked={checked} name={name} type={checkbox ? 'checkbox' : 'radio'} value={state} ref={register({ required: 'Обязательное поле' })} />
                        <Input
                            onChange={(e) => {
                                setState(e.target.value)
                                setChecked(true)
                            }}
                            style={{
                                padding: '0 8px',
                                borderWidth: '1px',
                            }}
                            placeholder='Другое...'
                        />
                    </label>
                )}
            </div>
            {errors?.[name] && (
                <p className={cx(s.caption, s.error)}>
                    {errors[name].message}
                </p>
            )}
        </>
    )
})

const Required = () => (
    <span style={{ color: 'tomato' }}>*</span>
)

// @ts-ignore
const Arrow = ({ className }) => (
    <svg className={cx(s.stepButtonRegular, s.arrow, className)} viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M21.6092 16.9793L6.21477 30.9051L6.09009 3.19255L21.6092 16.9793Z" fill='var(--color-fill)' />
        <line x1="21.3275" y1="17.3778" x2="6.32748" y2="30.3778" stroke='var(--color-border)' strokeWidth='.75' />
        <line x1="6.34117" y1="3.63447" x2="21.3412" y2="17.6345" stroke='var(--color-border)' strokeWidth='.75' />
    </svg>

)

const pointNames = [
    '1. Абрам-мыс',
    '2. Гора Горелая',
    '3. Достоевского, д.19',
    '4. Карла Либкнехта, д.54',
    '5. Кильдинская улица, д.11',
    '6. Территория рядом с базой отдыха "Чунга-Чанга" (ул.Маяковского)',
    '7. Гора Петушинка',
    '8. Северный проезд, д. 25',
    '9. Сквер на улице Старостина',
    '10. Чумбарова-Лучинского, д. 48',
    '11. Сквер на ул. Шмидта',
]

const Form1 = (props: any) => {
    const { handleSubmit, register, errors, control } = useForm({
        defaultValues: props.defaultValues,
        shouldFocusError: false,
    })

    useEffectOnce(() => props.scrollTop())

    const selectedContent = [
        {
            src: '/static/form/0.jpg',
            text: [
                'Выбранная для благоустройства точка расположена выше Мемориала под открытым небом, на площадке, которую местные жители называют "корона".',
                'Местные жители рассказали нам, что выбранная площадка и так достаточно популярна у мурманчан с другого берега. Поэтому жители боятся, что благоустройство территории сделает ее еще более популярной для не местных, а местные лишаться своего тихого природного уголка. Возможно, главной ценностью новой видовой площадки должна быть ее природа, или вы можете порекомендовать более подходящую для благоустройства точку поблизости?'
            ],
        },
        {
            text: [
                'Выбранная видовая точка расположена на вершине горы Горелой.',
            ]
        },
        {
            text: [
                'Выбранная видовая площадка расположена дальше дома №19 на улице Достоевского по пути на сопку.',
            ],
            src: '/static/form/2.jpg',
        },
        {
            text: [
                'Выбранная для благоустройства видовая площадка находится выше дома №54  на улице Карла Либкнехта по пути на сопку.',
                'Во время полевого исследования мы узнали от местных жителей, что рядом с выбранной площадкой находится несанкционированная свалка. Возможно, благоустройство территории решит эту проблему, или Вы порекомендуете другую точку поблизости?'
            ],
            src: '/static/form/3.jpg',
        },
        {
            text: [
                'Выбранная для благоустройства видовая площадка расположена над детской площадкой рядом с домами № 11, 13, 15 по улице Кильдинской.',
            ],
            src: '/static/form/4.jpg',
        },
        {
            text: [
                'Выбранная для благоустройства видовая площадка находится правее базы отдыха "Чунга-Чанга" вдоль высокого склона с видом на залив слева через дорогу от домов №21, 23, 25 по улице Маяковского.',
            ],
            src: '/static/form/5.jpg',
        },
        {
            text: [
                'Выбранная для благоустройства видовая площадка находится после гаражей недалеко от домов №43 и 45 по улице Пригородной. ',
                'Во время полевой работы мы узнали, что местные жители боятся лишиться своей домашней атмосферы, которая может исчезнуть с появлением в этом месте благоустроенной видовой площадки. С другой стороны, они рассказали о том, что сейчас эта полузаброшенная площадка используется жителями других районов в маргинальных целях. Возможно, благоустройство тихой и домашней видовой площадки поможет решить эту проблему или все-таки разрушит атмосферу места? Если вы знаете более подходящую точку поблизости, порекомендуйте ее, пожалуйста! '
            ],
            src: '/static/form/6.jpg',
        },
        {
            text: [
                'Выбранная видовая площадка расположена за домом №25 по улице Северный проезд. ',
                'Во время полевой работы мы узнали от местных жителей, что выбранная точка используется горожанами как парковка, при этом поблизости есть несколько видовых территорий, которые, по их мнению, очень нуждаются в таком благоустройстве. Если вы знаете более подходящие точки для новой видовой площадки поблизости, порекомендуйте их! '
            ],
            src: '/static/form/7.jpg',
        },
        {
            text: [
                'Выбранный для благоустройства видовой сквер находится на пересечении Старостина и ул.Мира. Во время полевой работы мы узнали от местных жителей, что территория рядом с выбранной точкой - излюбленное место для выгула и тренировок собак. '
            ],
        },
        {
            text: [
                'Выбранная для благоустройства площадка находится напротив магазина "Два гроша" рядом с лестницей вниз. ',
                'Во время полевой работы мы узнали, что местные жители считают, что в этом районе достаточно видовой площадки у "Ждущей", а на выбранной территории хватает своих шумных посиделок, после которых остается мусор. Возможно, новая видовая площадка в этом месте изменит функцию территории на более спокойную, или вы можете порекомендовать другую более подходящую для благоустройства точку поблизости?'
            ],
            src: '/static/form/9.jpg',
        },
        {
            text: [
                'Выбранный для благоустройства видовой сквер расположен вдоль железной дороги до ж/д моста напротив домов № 35, 37, 39, 47 по улице Шмидта. ',
            ],
            src: '/static/form/10.jpg',
        },
    ]

    const selected = useWatch({
        name: 'sectionOne',
        defaultValue: null,
        control,
    })

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)}>
            <div className={s.questionList}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    maxHeight: '150vh',
                    paddingBottom: '2rem',
                }}>
                    <Image
                        src='/static/form/map.jpg'
                        width={1225}
                        height={2546}
                        objectFit='contain'
                    />
                </div>
                <Question
                    head='Выберите, пожалуйста, одну видовую территорию, мнением о которой хотите поделиться.'
                    required
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionOne'
                        data={pointNames}
                    />
                </Question>

                {!selected ? null : (
                    <>
                        {selectedContent[pointNames.indexOf(selected)].text.map(x => (
                            <span key={x} style={{
                                paddingBottom: '2rem',
                            }}>
                                {x}
                            </span>
                        ))}
                        {selectedContent[pointNames.indexOf(selected)].src && (
                            <div style={{
                                width: '100%',
                                height: '400px',
                                position: 'relative',
                            }}>
                                <Image
                                    src={selectedContent[pointNames.indexOf(selected)].src}
                                    layout='fill'
                                    objectFit='contain'
                                />
                            </div>
                        )}
                    </>
                )}

                {Object.keys(errors).length > 0 && (
                    <p className={cx(s.caption, s.error)} style={{ alignSelf: 'center', }}>
                        Похоже вы что-то не заполнили
                    </p>
                )}
                <Button
                    theme='default'
                    size={'big'}
                    type={'submit'}
                    style={{
                        alignSelf: 'center',
                        margin: '2rem 0',
                    }}
                >
                    {'ДАЛЕЕ >'}
                </Button>
            </div>
        </Form >
    )
}

const Form2 = (props: any) => {
    const { handleSubmit, register, errors } = useForm({
        defaultValues: props.defaultValues,
        shouldFocusError: false,
    })
    useEffectOnce(() => props.scrollTop())

    const selectedPoint = pointNames.indexOf(props.defaultValues.sectionOne)

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)}>
            <div className={s.questionList}>
                <Question
                    head='Вы согласны, что эта точка самая подходящая для создания видовой площадки на выбранной территории?'
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionTwo_one'
                        data={['Да', 'Нет']}
                    />
                </Question>
                <Question
                    head='Если вы ответили "нет" в предыдущем вопросе и знаете более хорошую точку на выбранной территории, расскажите нам, где она находится! После чего отвечайте на вопросы исходя из предложенной вами точки.'
                    required={false}
                >
                    <Input
                        ref={register}
                        name='sectionTwo_two'
                    />
                </Question>
                <Question
                    head='Сколько вам лет?'
                    required
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionTwo_three'
                        data={[
                            '13 лет и младше',
                            '14-17 лет',
                            '18-24 года',
                            '25-34 года',
                            '35-44 года',
                            '45-54 года',
                            '55-64 года',
                            '65 лет и старше',
                        ]}
                    />
                </Question>
                <Question
                    head='Чем вы обычно занимаетесь на обозначенной территории? (любое количество ответов)'
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionTwo_four'
                        checkbox
                        userAnwser
                        data={[
                            'Живу рядом',
                            'Работаю рядом',
                            'Хожу на прогулку',
                            'Гуляю с собакой',
                            'Гуляю с детьми',
                            'Занимаюсь спортом',
                            'Любуюсь видом на залив',
                            'Фотографируюсь',

                            [1].includes(selectedPoint) && 'Собираю грибы/ягоды',
                            [2, 3, 4, 5, 7, 8, 9].includes(selectedPoint) && 'Регулярно прохожу мимо',
                            [2, 3, 4, 7, 8].includes(selectedPoint) && 'Паркую машину',
                            [0, 2, 3, 4, 5, 6, 7, 8, 9].includes(selectedPoint) && 'Делаю шашлыки',
                            [5].includes(selectedPoint) && 'Посещаю базу отдыха "Чунга-Чанга"',
                        ]}
                    />
                </Question>
                <Question
                    head='Напишите, пожалуйста, 3-5 слов (прилагательных, существительных или глаголов), которые  ассоциируются у вас с этой территорией?'
                    required={false}
                >
                    <Input
                        ref={register}
                        name='sectionTwo_five'
                    />
                </Question>
                <Question
                    head='Кого чаще всего можно встретить на выделенной территории? (любое количество ответов)'
                    required
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionTwo_six'
                        checkbox
                        userAnwser
                        data={[
                            'Школьники младшего возраста',
                            'Подростки',
                            'Молодежь',
                            'Родители с детьми',
                            'Люди среднего возраста',
                            'Пожилые люди',
                            'Собачники',
                            'Спортсмены',
                            'Жители других районов города',
                            'Туристы',
                            [5].includes(selectedPoint) && 'Посетители базы отдыха "Чунга-Чанга"',
                        ]}
                    />
                </Question>
                <Question
                    head='Что другие пользователи территории делают там в разное время года? (любое количество ответов)'
                    required
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionTwo_seven'
                        checkbox
                        userAnwser
                        data={[
                            'Ходят на прогулку',
                            'Гуляют с собаками',
                            'Бегают',
                            'Занимаются скандинавской ходьбой',
                            'Собирают грибы/ягоды',
                            'Фотографируются',
                            'Смотрят на фейерверки',

                            [0, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(selectedPoint) && 'Гуляют с детьми',
                            [0, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(selectedPoint) && 'Катаются на лыжах',
                            [0, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(selectedPoint) && 'Делают шашлыки',
                            [0, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(selectedPoint) && 'Выпивают',
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(selectedPoint) && 'Любуются заливом',
                            [2, 3, 4, 5, 6, 7, 8, 9, 10].includes(selectedPoint) && 'Паркуют машину',
                        ]}
                    />
                </Question>
                <Question
                    head='Какую сферу вам бы хотелось видеть наиболее развитой здесь?'
                    required
                    caption='Представьте, что бюджет проекта ограничен (и это, к сожалению, не фантазия, а реальность), поэтому помимо видовой функции будущая благоустроенная площадка может обладать лишь ещё одной функциональной характеристикой. Какая это должна быть характеристика? Важно: выбирая характеристику, вы не соглашаетесь автоматически с созданием всех объектов перечисленных в скобках! В следующем вопросе вы сможете уточнить, что именно вы хотите или не хотите видеть на площадке.'
                >
                    <Radios
                        register={register}
                        errors={errors}
                        name='sectionTwo_eight'
                        data={[
                            'Природная функция (взаимодействие с природой, например, создание экотропы, сада, оранжереи и т.д.)',
                            'Рекреационная функция (проведение семейных и дружеских барбекю, пикников и т.д.)',
                            'Спокойный отдых (тихий досуг, предполагающий создание таких объектов как скамейки-качели для всех возрастов, буккроссинг, беседки и т.д.)',
                            'Спортивная функция и активный отдых (объекты для спортивного досуга, такие как различные спортивные площадки, уличные тренажеры, каток, лыжня и т.д.)',
                            'Детское пространство (объекты для детского досуга, такие как игровые площадки, горки и т.д.)',
                            'Подростковое пространство (объекты для досуга подростков, такие как места для дружеского общения с Wi-Fi, фотозона, скейт пул и т.д.)',
                            'Пространство для домашних животных (прогулочные и тренировочные площадок для домашних питомцев и их хозяев)',
                            'Культурная функция (привлекательные для горожан и туристов арт-объекты, место для рисования на пленэре и т.д.)',
                            'Коммерческая функция (кафе, кофе с собой и т.д.)',
                        ]}
                    />
                </Question>

                {Object.keys(errors).length > 0 && (
                    <p className={cx(s.caption, s.error)} style={{ alignSelf: 'center', }}>
                        Похоже вы что-то не заполнили
                    </p>
                )}
                <Button
                    theme='default'
                    size={'big'}
                    type={'submit'}
                    style={{
                        alignSelf: 'center'
                    }}
                >
                    {'ДАЛЕЕ >'}
                </Button>
                <div style={{ height: '1rem' }} />
            </div>
        </Form >
    )
}

const Form3 = (props: any) => {
    const { handleSubmit, register, errors } = useForm({
        defaultValues: props.defaultValues,
        shouldFocusError: false,
    })

    useEffectOnce(() => props.scrollTop())


    const eightAnwsers = [
        'Природная функция (взаимодействие с природой, например, создание экотропы, сада, оранжереи и т.д.)',
        'Рекреационная функция (проведение семейных и дружеских барбекю, пикников и т.д.)',
        'Спокойный отдых (тихий досуг, предполагающий создание таких объектов как скамейки-качели для всех возрастов, буккроссинг, беседки и т.д.)',
        'Спортивная функция и активный отдых (объекты для спортивного досуга, такие как различные спортивные площадки, уличные тренажеры, каток, лыжня и т.д.)',
        'Детское пространство (объекты для детского досуга, такие как игровые площадки, горки и т.д.)',
        'Подростковое пространство (объекты для досуга подростков, такие как места для дружеского общения с Wi-Fi, фотозона, скейт пул и т.д.)',
        'Пространство для домашних животных (прогулочные и тренировочные площадок для домашних питомцев и их хозяев)',
        'Культурная функция (привлекательные для горожан и туристов арт-объекты, место для рисования на пленэре и т.д.)',
        'Коммерческая функция (кафе, кофе с собой и т.д.)',
    ]
    const selectedEight = eightAnwsers.indexOf(props.defaultValues.sectionTwo_eight)
    const sectionThree_one = [
        {
            head: 'Какие объекты, предполагающие пользовательские сценарии, связанные с природной функцией, вы хотите видеть на будущей видовой площадке? (не более 3-х ответов)',
            data: [
                'Экотропа',
                'Прогулочная зона',
                'Городской огород',
                'Разнообразное ландшафтное озеленение',
                'Терапевтический сад',
                'Коллективная клумба',
                'Зимняя оранжерея',
                'Сад камней',
                'Тактильный сад',
                'Водный объект',
                'Уединенные «зеленые» кулуары'
            ]
        },
        {
            head: 'Какие объекты, предполагающие пользовательские сценарии, связанные с рекреационной функцией, вы хотите видеть на будущей видовой площадке? (не более 2-х ответов)',
            data: [
                'Зона для летнего барбекю',
                'Зона для зимнего барбекю',
                'Место для пикников',
                'Беседка с обогревом',
            ]
        },
        {
            head: 'Какие объекты, предполагающие спокойный отдых, вы хотите видеть на будущей видовой площадке? (не более 3-х ответов)',
            data: [
                'Беседка с обогревом',
                'Скамейки с обогревом',
                'Качели для людей всех возрастов',
                'Зона для чтения и обмена книгами (буккросинг)',
                'Стационарный бинокль для смотровых площадок',
                'Башня для наблюдения за небесными явлениями',
            ]
        },
        {
            head: 'Какие объекты, предполагающие спортивные пользовательские сценарии и активный отдых, вы хотите видеть на будущей видовой площадке? (не более 3-х ответов)',
            data: [
                'Уличные тренажеры',
                'Площадка для ворк-аута',
                'Инклюзивная спортивная площадка (для людей с ОВЗ)',
                'Площадка для игры в стритбол',
                'Лыжня',
                'Стол для игры в настольный теннис',
                'Зимний каток',
                'Безопасные зимние горки',
            ]
        },
        {
            head: 'Какие объекты, предполагающие детские пользовательские сценарии, вы хотите видеть на будущей видовой площадке? (не более 2-х ответов)',
            data: [
                'Игровая площадка для малышей до 3-х лет',
                'Игровая площадка для дошкольников 3-6 лет',
                'Игровая площадка для младших школьников 7-11 лет',
                'Снежные или растительные лабиринты/полоса препятствий',
                'Безопасные всесезонные горки',
                'Безопасные зимние горки',
            ]
        },
        {
            head: 'Какие объекты, предполагающие подростковые пользовательские сценарии, вы хотите видеть на будущей видовой площадке? (не более 3-х ответов)',
            data: [
                'Место для встреч с друзьями с возможностью подключиться к Wi-Fi и электричеству',
                'Скейт пул',
                'Ролледром',
                'Фотозона с видом на залив',
                'Безопасные всесезонные горки',
                'Безопасные зимние горки',
            ]
        },
        {
            head: 'Какие объекты, предполагающие  пользовательские сценарии для владельцев домашних животных, вы хотите видеть на будущей видовой площадке? (не более 3-х ответов)',
            data: [
                'Место для выгула больших собак',
                'Место для выгула маленьких собак',
                'Площадка для тренировок собак',
                'Беседка с обогревом для хозяев',
            ]
        },
        {
            head: 'Какие объекты, предполагающие  пользовательские сценарии, связанные с культурной функцией, вы хотите видеть на будущей видовой площадке? (не более 3-х ответов)',
            data: [
                'Арт-объекты, отражающие историю места',
                'Арт-объекты, отражающие морскую идентичность города',
                'Лэнд-арт (ландшафтное искусство)',
                'Место для рисования пейзажей',
                'Место для проведения соседских встреч и мероприятий',
                'Фотозона с видом на залив',
            ]
        },
        {
            head: 'Какие объекты, предполагающие  пользовательские сценарии, связанные с коммерческой функцией, вы хотите видеть на будущей видовой площадке? (не более 2-х ответов)',
            data: [
                'Кофе с собой',
                'Семейное кафе',
                'Павильоны с уличной едой и горячими напитками',
                'Фудтраки',
            ]
        }
    ]

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)}>
            <div className={s.questionList}>
                <Question
                    head={sectionThree_one[selectedEight].head}
                    required
                >
                    <Radios
                        register={register}
                        errors={errors}
                        checkbox
                        userAnwser
                        name='sectionThree_one'
                        data={sectionThree_one[selectedEight].data}
                    />
                </Question>
                <Question
                    head='Напишите, пожалуйста, 3-5 слов (прилагательных, существительных или глаголов), передающих ваше представление о том, какой должна стать видовая площадка после благоустройства?'
                    required={false}
                >
                    <Input
                        ref={register}
                        name='sectionThree_two'
                    />
                </Question>

                {Object.keys(errors).length > 0 && (
                    <p className={cx(s.caption, s.error)} style={{ alignSelf: 'center', }}>
                        Похоже вы что-то не заполнили
                    </p>
                )}
                <Button
                    theme={'default'}
                    size={'big'}
                    type={'submit'}
                    style={{
                        alignSelf: 'center'
                    }}
                >
                    {'ДАЛЕЕ >'}
                </Button>
                <div style={{ height: '1rem' }} />
            </div>
        </Form>
    )
}

const Form4 = (props: any) => {
    const { handleSubmit, register, errors, formState } = useForm({
        defaultValues: props.defaultValues,
        shouldFocusError: false,
    })

    useEffectOnce(() => props.scrollTop())

    return (
        <Form onSubmit={handleSubmit(props.onSubmit)}>
            <div className={s.questionList}>
                <Question
                    head='Что для вас делает Мурманск морским городом? (любое количество ответов)'
                    required
                >
                    <Radios
                        register={register}
                        errors={errors}
                        checkbox
                        userAnwser
                        name='sectionFour_one'
                        data={[
                            'История города и рассказы старожилов',
                            'Моряки',
                            'Возможность любоваться закатами над заливом',
                            'Возможность наблюдать за кораблями',
                            'Возможность подойти к воде',
                            'Возможность выйти в море',
                            'Близость порта',
                            'Рыба и морепродукты',
                            'Морской ветер и воздух',
                            'Рыбалка',
                            'Крики чаек',
                        ]}
                    />
                </Question>
                <Question
                    head='Какой ваш залив? Напишите, пожалуйста, ответ на этот вопрос в свободной форме: в виде факта, личной истории, либо 3-5 слов, передающих ваши ассоциации с Кольским заливом. '
                    required={false}
                >
                    <TextArea
                        name='sectionFour_two'
                        ref={register}
                    />
                    {errors?.['sectionFour_two'] && (
                        <p className={cx(s.caption, s.error)}>
                            {errors['sectionFour_two'].message}
                        </p>
                    )}
                </Question>
                <Question
                    head='Спасибо, что вам не все равно, каким станет наш город и наш залив! Если вы заинтересованы участвовать в дальнейших обсуждениях по проекту и влиять на то, какими будут городские видовые площадки, оставьте, пожалуйста, ваши имя и любые контакты (почта, телефон, мессенджеры и др.).'
                    required={false}
                >
                    <TextArea
                        name='sectionFour_three'
                        ref={register}
                    />
                    {errors?.['sectionFour_three'] && (
                        <p className={cx(s.caption, s.error)}>
                            {errors['sectionFour_three'].message}
                        </p>
                    )}
                </Question>

                {Object.keys(errors).length > 0 && (
                    <p className={cx(s.caption, s.error)} style={{ alignSelf: 'center', }}>
                        Похоже вы что-то не заполнили
                    </p>
                )}
                <Button
                    theme={'default'}
                    size={'big'}
                    type={'submit'}
                    style={{
                        alignSelf: 'center',
                        backgroundColor: 'var(--color-button)'
                    }}
                    disabled={formState.isSubmitting}
                >
                    {props.buttonText}
                </Button>
                <p style={{ alignSelf: 'center' }}>
                    Нажимая эту кнопку я соглашаюсь на обработку персональных данных.
                </p>
            </div>
        </Form>
    )
}

export const OpinionForm: React.FC<any> = ({ showFinish, scrollTop }) => {
    const [state, setState] = useState('ОТПРАВИТЬ')
    const stateStatus = {
        send: 'Отправляем…',
        error: 'Что-то пошло не так',
        ok: 'Готово!',
    }

    const onSubmit = useCallback(async data => {
        setState(stateStatus.send)

        await fetch('/api', { method: 'POST', body: JSON.stringify(data) })
            .then((res) => {
                if (res.status !== 200) {
                    setState(stateStatus.error)
                    console.log(res)
                }
                return res.json()
            })
            .then(res => {
                res.result === 'error' && console.log(res)
                setState(res.result === 'success' ? showFinish() : stateStatus.error)
            })
    }, [])

    const [formData, setFormData] = useState({})
    const [formState, setFormState] = useState([false, false, false, false])
    const [step, setStep] = useState(0)

    const onSubmitStep = useCallback(value => {
        setFormData({ ...formData, ...value })

        const newState = formState
        newState[step] = true
        setFormState(newState)

        console.log(JSON.stringify(formData, null, 3))

        setStep(step + 1)
    }, [formData, step])

    const finalSubmit = useCallback(async value => {
        const data = { ...formData, ...value }
        setFormData(data)

        const newState = formState
        newState[step] = true
        setFormState(newState)

        const invalidStep = formState.findIndex(x => !x)
        if (invalidStep !== -1) {
            setStep(invalidStep)
            return
        }

        await onSubmit(data)

    }, [formData, formState, step])

    const activeFromComponent = () => {
        switch (step) {
            case 0:
                return (
                    <Form1
                        defaultValues={formData}
                        scrollTop={scrollTop}
                        onSubmit={onSubmitStep}
                    />
                )
            case 1:
                return (
                    <Form2
                        defaultValues={formData}
                        scrollTop={scrollTop}
                        onSubmit={onSubmitStep}
                    />
                )
            case 2:
                return (
                    <Form3
                        defaultValues={formData}
                        scrollTop={scrollTop}
                        onSubmit={onSubmitStep}
                    />
                )
            case 3:
                return (
                    <Form4
                        defaultValues={formData}
                        scrollTop={scrollTop}
                        onSubmit={finalSubmit}
                        buttonText={state}
                    />
                )

            default:
                null
                break
        }
    }

    const stepButtons = [
        {
            button: 'Выбор площадки',
            description: 'Выберите видовую площадку'
        },
        {
            button: 'О площадке',
            description: 'Расскажите нам о выбранной площадке'
        },
        {
            button: 'Сфера площадки',
            description: ''
        },
        {
            button: 'О вас',
            description: 'Наш проект не случайно называется "МОЙЗАЛИВ.РФ". Мы хотим, чтобы каждый горожанин обрёл в Мурманске свой залив. Расскажите нам напоследок о вашем заливе! '
        },
    ]

    return (
        <>
            <div
                className={s.steps}
            >
                <div style={{ display: 'flex' }}>
                    {formState.map((x, i) => (
                        <div key={i}
                            style={{
                                position: 'relative'
                            }}
                        >
                            <div className={cx(s.stepButton, x && s.stepButtonComplete, step == i && s.stepButtonNow)}>
                                <Button
                                    theme='link'
                                    key={i}
                                    style={{
                                        outline: 0,
                                        cursor: 'default',
                                    }}
                                // onClick={() => {
                                //     setStep(i)
                                // }}
                                >
                                    <span className={s.stepButtonText}>
                                        {stepButtons[i].button}
                                    </span>
                                </Button>
                            </div>
                            <Arrow
                                className={cx(x && s.stepButtonComplete, step == i && s.stepButtonNow)}
                            />
                        </div>
                    ))}
                </div>
                <p style={{
                    margin: '1rem 0 0 0',
                }}>
                    {stepButtons[step].description}
                </p>
            </div>
            {activeFromComponent()}
        </>
    )
}
