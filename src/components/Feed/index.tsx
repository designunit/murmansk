import React from 'react'
import { FeedItem } from '../FeedItem'

import { IItem } from '../Layout'

interface IFeedProps {
    data: IItem[]
}
export const Feed: React.FC<any> = ({ data }) => {
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