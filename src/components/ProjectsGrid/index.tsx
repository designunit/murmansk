import Link from 'next/link'
import React from 'react'
import { Emoji } from '../Emoji'
import { Section } from '../Section'
import s from './index.module.css'

const Container = ({ href, children }) => href ? (
    <Link href={href}>
        <a className={s.a}>
            {children}
        </a>
    </Link>
) : (
    <div className={s.a}>
        {children}
    </div>
)

export const ProjectsGrid: React.FC = () => {
    const data = [
        {
            title: 'Площадка Маяковского',
            preview: '/static/mayakovskogo.jpg',
            href: null, // 'https://vk.com/moizaliv?w=wall-194862104_112',
            // preview: null,
            // description: (
            //     <div
            //         style={{
            //             flex: '1 0 auto',
            //             border: 'solid 1px black',
            //             background: 'white',
            //             padding: '1rem',
            //             height: 200,
            //         }}
            //     >
            //         {'Приглашаем ребят 11-16 лет придумать и построить площадку с видом на залив на ул. Маяковского '}
            //         <span>
            //             <Emoji name='⚒️' /> <Emoji name='👨‍👩‍👧‍👦' /> <Emoji name='🏘️' />
            //         </span>
            //     </div>
            // )
        },
        {
            title: 'Склон Либнекхта',
            preview: '/static/projects/sklon-karla/preview.jpeg',
            href: '/karla-libnekhta',
        },
        {
            title: 'Площадка на Северном проезде',
            preview: '/static/projects/severny/9.jpg',
            href: '/severny',
        },
        {
            title: 'Абрам-мыс',
            preview: '/static/projects/abram-mys/3.jpg',
            href: '/abram-mys',
        },
        {
            title: 'Сквер Шмидта',
            preview: '/static/projects/skver-shmidta/preview.jpg',
            href: '/skver-shmidta',
        },
        {
            title: 'Кильдинская площадка',
            preview: '/static/projects/kildinskaya/4.jpg',
            href: '/kildinskaya',
        },
        {
            title: 'Маяк на сопке Достоевского',
            preview: '/static/projects/dostoevskogo/preview.jpg',
            href: '/dostoevskogo',
        },
    ]

    return (
        <div style={{
            width: '100%',
            borderTop: 'solid 1px black',
            borderBottom: 'solid 1px black',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
        }}>
            <Section>
                <div
                    className={s.grid}
                >
                    {data.map((project, i) => (
                        <Container href={project.href} key={i} >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'clip',
                                whiteSpace: 'pre-wrap',
                                padding: '1rem',
                                height: '100%',
                            }}>
                                {/* {project?.description} */}
                                <img
                                    src={project.preview}
                                    style={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        height: 200, //!project?.description && 
                                        objectFit: 'cover'
                                    }}
                                />
                                <h3 style={{
                                    marginBottom: 0,
                                }}>
                                    {project?.title}
                                </h3>
                            </div>
                        </Container>
                    ))}
                </div>
            </Section>
        </div>
    )
}