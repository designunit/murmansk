import { Project } from '@/components/Project'
import { Layout } from '@/components/Layout'
import { IMeta, Meta } from '@/components/Meta'
import { Section } from '@/components/Section'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { useMobile } from '@/hooks/useMobile'
import { Markers } from '@/components/Markers'
import { useSession } from 'next-auth/client'
import { Modal } from '@/components/Modal'

interface ILandingProps {
    meta: IMeta
}

const Test: NextPage<ILandingProps> = ({ meta }) => {
    const [session, isLoadingSession] = useSession()
    const isMobile = useMobile()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalId, setModalId] = useState(null)
    const showModal = useCallback((id) => {
        setModalIsOpen(true)
        setModalId(id)
    }, [])

    return (
        <>
            <Head>
                <title>Мойзалив.рф</title>
                <Meta meta={meta} />
            </Head>
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                modalCallback={modalId}
            />
            <Layout>
                <Section style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    ...{
                        padding: isMobile && 0,
                    }
                }}>
                    <Project
                        title='тестовая страничка, если вы нашли ее то не палите малину'
                    >
                        <Section>
                            <Markers
                                session={session}
                                data={{
                                    id: 123,
                                    left: '/static/projects/sklon-karla/1.jpg',
                                    right: '/static/projects/sklon-karla/2.jpg'
                                }}
                                showModal={showModal}
                            />
                        </Section>
                    </Project>
                </Section>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const meta: IMeta = {
        title: 'МОЙЗАЛИВ.РФ',
        description: 'Дорогие Мурманчане, давайте чаще любоваться видами нашего города!',
        image: 'https://мойзалив.рф/static/meta.jpg',
        imageWidth: 911,
        imageHeight: 1023,

        url: 'https://мойзалив.рф/',
        siteName: 'Дорогие Мурманчане, давайте чаще любоваться видами нашего города!',
        locale: 'ru_RU',
        type: 'website',
        domain: 'https://мойзалив.рф',

        twitterCard: 'summary_large_image',
        twitterSite: '@',
        twitterCreator: '@tmshv',
    }

    return {
        props: {
            meta,
        }
    }
}

export default Test