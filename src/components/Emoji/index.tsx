import { CSSProperties, useMemo } from 'react'
import emojiUnicode from 'emoji-unicode'

function useEmojiImg(emoji: string) {
	return useMemo(() => {
		const file = emojiUnicode(emoji)
			.split(' ')
			.join('-')
		const filename = `${file}.png`

		return `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.0/img/apple/64/${filename}`
	}, [emoji])
}

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
	const src = useEmojiImg(name)
	return (
		<img
			src={src}
			style={{
				...defaultStyle,
				...style,
			}}
		/>
	)
}
