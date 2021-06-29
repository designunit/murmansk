import Link from 'next/link'
import React from 'react'
import { Section } from '../Section'
import s from './index.module.css'

export const ProjectsGrid: React.FC = () => {
    const data = [
        {
            title: 'Склон Либнекхта',
            preview: '/static/projects/sklon-karla/7.jpg',
            id: 'karla-libnekhta',
        },
        {
            title: 'Площадка на Северном проезде',
            preview: '/static/projects/severny/9.jpg',
            id: 'severny',
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
                {/* <div
                    style={{
                        padding: '0 1rem',
                        borderLeft: 'solid 1px black',
                        borderRight: 'solid 1px black',
                    }}
                >
                    <h2
                        style={{
                            fontSize: 33,
                            padding: '1rem 0 1rem 0',
                            margin: 0,
                            textTransform: 'uppercase',
                        }}
                    >
                        Проекты
                    </h2>
                </div> */}
                <div
                    className={s.grid}
                >
                    {data.map((project, i) => (
                        <Link href={`/${project.id}`} key={project.id} >
                            <a className={s.a}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'clip',
                                    whiteSpace: 'pre-wrap',
                                    padding: '1rem',
                                    height: '100%',
                                }}>
                                    <img
                                        src={project.preview}
                                        style={{
                                            display: 'block',
                                            maxWidth: '100%',
                                        }}
                                    />
                                    <h3 style={{
                                        marginBottom: 0,
                                    }}>
                                        {project.title}
                                    </h3>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    )
}