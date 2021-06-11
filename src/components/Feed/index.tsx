import { Item } from '@/types'
import Link from 'next/link'
import React from 'react'
import { FeedItem } from '../FeedItem'
import { Section } from '../Section'

interface IFeedProps {
    data: any // Item[]
}
export const Feed: React.FC<IFeedProps> = ({ data }) => {
    return (
            <Section>
                <div style={{
                    borderLeft: 'solid 1px black',
                    borderRight: 'solid 1px black',
                    padding: '0 1rem',

                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 30%)',
                    gap: 24,
                }}>
                    {data.map((project, i) => (
                        <Link href={`/${project.id}`} >
                            <a style={{
                                textDecoration: 'none',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'clip',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    <img
                                        src={project.preview}
                                        style={{
                                            display: 'block',
                                            maxWidth: '100%',
                                        }}
                                    />
                                    <h3>
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
    )
}