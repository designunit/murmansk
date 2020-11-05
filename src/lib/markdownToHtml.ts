import remark from 'remark'
import html from 'remark-html'
import { emojiToApple } from './emojiToApple'

export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown)
    return emojiToApple(result.toString())
}