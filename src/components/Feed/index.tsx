import { Item } from '@/types'
import React from 'react'
import { FeedItem } from '../FeedItem'

interface IFeedProps {
    data: Item[]
}
export const Feed: React.FC<IFeedProps> = ({ data }) => {
    return (
        <>
            {data.map((item, index) => (
                <FeedItem
                    key={index}
                    item={item}
                    index={index}
                />
            ))}
        </>
    )
}