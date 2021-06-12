import dynamic from 'next/dynamic'
import { Section } from '../Section'
import { useCallback, useState, useEffect } from 'react'
import { Item, OnClick } from './item'
import ImageMarker, { Marker } from 'react-image-marker'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { MarkerData } from '@/types'
import { FormOnSubmit } from './form'
import { addMarker, getImage, getLikes, setLike } from '@/api'

const Form = dynamic(import('./form').then(m => m.Form), { ssr: false })

type LikeButtonProps = {
	id: number
	likes: number
}

const LikeButton: React.FC<LikeButtonProps> = props => {
	const { isLoading, data } = useQuery('likes', getLikes)
	const [active, setActive] = useState(false)
	const emoji = active ? '❤️' : '🤍'

	const client = useQueryClient()
	const put = useMutation(({ like }: { like: boolean }) => setLike(props.id, like), {
		onSettled: () => {
			const key = `image_${props.id}`
			client.refetchQueries(key)
			client.refetchQueries('likes')
		},
	})

	useEffect(() => {
		const like = !isLoading && data.find(x => x.imageId === props.id)

		setActive(!!like)
	}, [data])

	const onClick = useCallback(() => {
		put.mutate({
			like: !active,
		})

	}, [active])

	const count = props.likes > 0 ? props.likes : ''

	return (
		<button onClick={onClick}> {emoji} {count} </button>
	)
}

export type MarkersProps = {
	id: number
	src: string
	style?: React.CSSProperties
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
	const { isLoading, data: img } = useQuery(key, () => getImage(props.id, props.src))

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
				imageId: img.id,
				marker: draft,
				content,
			})
		}

		setShowForm(false)
	}, [draft, img])

	const markers = isLoading ? [] : img.markers

	return (
		<Section style={props.style}>
			<ImageMarker
				src={props.src}
				markers={markers}
				onAddMarker={(marker: Marker) => {
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

			<LikeButton
				id={props.id}
				likes={img?.likeCount ?? 0}
			/>
		</Section>
	)
}
