import { CSSProperties } from 'react'
import emojiUnicode from "emoji-unicode"


interface IEmojiProps {
    name: string
    style?: CSSProperties
}

const defaultStyle: CSSProperties = {
    width: '1em',
    maxWidth: 64,
    maxHeight: 64,
}

export const Emoji: React.FC<IEmojiProps> = ({ name, style = defaultStyle }) => {
    return (
        <img
            src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.0/img/apple/64/${emojiUnicode(name).split(' ').join('-')}.png`}
            style={style}
        />
    )
}