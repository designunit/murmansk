import { getImage, getLikes, setLike } from '@/api'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useCallback } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Emoji } from '../Emoji'

export type LikeButtonProps = {
    id: number
    likes: number
    session: any
    showModal: any
}

export const LikeButton: React.FC<LikeButtonProps> = props => {
    const { isLoading, data } = useQuery('likes', getLikes)
    const [active, setActive] = useState(false)
    const router = useRouter()
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
        if (router.query?.like && props.id == Number(router.query?.like)) {
            put.mutate({
                like: true,
            })
            router.push(router.pathname, null, { shallow: true })
        }
    }, [router.query, props.id])

    useEffect(() => {
        if (!data) return

        const like = !isLoading && data.find(x => x.imageId === props.id)

        setActive(!!like)
    }, [data])

    const onClick = useCallback(() => {
        if (!props.session) {
            props.showModal(props.id)
            return
        }
        put.mutate({
            like: !active,
        })

    }, [active, props.session])

    const count = props.likes > 0 ? props.likes : ''

    return (
        <button onClick={onClick}> <Emoji name={emoji} /> {count} </button>
    )
}