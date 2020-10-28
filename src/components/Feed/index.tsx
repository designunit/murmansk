import React from 'react'
import { FeedItem } from '../FeedItem'

import { IItem } from '../Layout'

interface IFeedProps {
    items: IItem[]
}
export const Feed: React.FC<IFeedProps> = ({ items }) => {
    return (
        <>
            {items.map((item, index) => (
                <FeedItem
                    item={item}
                    index={index}
                />
            ))}
        </>
    )
}