import emojiRegexRGI from 'emoji-regex/RGI_Emoji.js'
import ReactDOMServer from 'react-dom/server'
import { Emoji } from '../components/Emoji'

export function emojiToApple(input: string) {
    return input.replace(emojiRegexRGI(), match => {
        return ReactDOMServer.renderToString(
            <Emoji
                name={`${match}`}
            />
        )
    })
}