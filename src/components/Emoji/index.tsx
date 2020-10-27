import { CSSProperties } from 'react'

interface IEmojiProps {
    name: string
    resolution?: 60 | 120 | 240
    style?: CSSProperties
}

export const Emoji: React.FC<IEmojiProps> = ({ name, resolution = 60, style = { width: '1em' } }) => (
    <img
        src={`https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/${resolution}/apple/237/${name}.png`}
        style={style}
    />
)