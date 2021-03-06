import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'
import { Item, OnClick } from './item'
import ImageMarker, { Marker } from 'react-image-marker'
import { useMutation, useQueryClient } from 'react-query'
import { MarkerData } from '@/types'
import { FormOnSubmit } from './form'
import { addMarker, ImageDto } from '@/api'

const Form = dynamic(import('./form').then(m => m.Form), { ssr: false })

export type MarkersProps = {
    id: number
    src: string
    style?: React.CSSProperties
    allowClick?: boolean
    img: ImageDto
    onAfterSubmit: () => void
}

type AddMarkerMutationOptions = {
    imageId: number,
    content: string,
    marker: Marker,
}

export const CommentedImage: React.FC<MarkersProps> = props => {
    const key = `image_${props.id}`
    const client = useQueryClient()
    const add = useMutation(({ imageId, content, marker }: AddMarkerMutationOptions) => addMarker(imageId, content, marker), {
        onSettled: () => {
            client.refetchQueries(key)
        },
    })

    const [opened, setOpened] = useState<Record<number, boolean>>({})
    const [draft, setDraft] = useState<Marker>(null)
    const [showForm, setShowForm] = useState(false)

    const onMarkerClick = useCallback<OnClick>((id, state) => {
        setOpened(opened => ({
            ...opened,
            [id]: state,
        }))
    }, [])

    const onSubmit = useCallback<FormOnSubmit>(content => {
        if (content) {
            add.mutate({
                imageId: props.img.id,
                marker: draft,
                content,
            })
        }
        setShowForm(false)
        props.onAfterSubmit()
    }, [draft, props.img])

    const markers = props.img?.markers ?? []

    return (
        <div style={{
            position: 'relative',
        }}>
            <ImageMarker
                src={props.src}
                markers={markers}
                onAddMarker={(marker: Marker) => {
                    if (!props.allowClick) return

                    setDraft(marker)
                    setShowForm(true)
                }}
                // @ts-ignore
                markerComponent={(props: MarkerData) => (
                    <Item
                        {...props}
                        onClick={onMarkerClick}
                        isOpen={opened[props.id] ?? false}
                    />
                )}
            />
            {!showForm ? null : (
                <Form
                    onSubmit={onSubmit}
                />
            )}
        </div>
    )
}
