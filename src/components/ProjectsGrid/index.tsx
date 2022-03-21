import classNames from 'classnames'
import Link from 'next/link'
import React, { CSSProperties } from 'react'
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
    <div className={classNames(s.a, s.noHref)}>
        {children}
    </div>
)

type ProjectsGridProps = {
    data: any[]
    title?: string
    style?: CSSProperties
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ data, title, style }) => {
    return (
        <div style={{
            width: '100%',
            borderTop: 'solid 1px black',
            borderBottom: 'solid 1px black',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            ...style
        }}>
            <Section>
                <div className={s.border}>
                    {title && (
                        <h3 className={s.h3}>
                        {title}
                    </h3>
                    )}
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
                                    <img
                                        src={project.preview}
                                        style={{
                                            display: 'block',
                                            maxWidth: '100%',
                                            height: 200,
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
                </div>
            </Section>
        </div>
    )
}