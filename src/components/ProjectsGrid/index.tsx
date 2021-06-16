import Link from 'next/link'
import React from 'react'
import { Section } from '../Section'
import s from './index.module.css'

interface IFeedProps {
    data: any // Item[]
}
export const ProjectsGrid: React.FC<IFeedProps> = ({ data }) => {
    return (
        <div style={{
            width: '100%',
            borderTop: 'solid 1px black',
            borderBottom: 'solid 1px black',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Section>
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
                                    <p>
                                        {project.description}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    )
}