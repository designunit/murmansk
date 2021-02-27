import { script } from './lib'

export type YMetrikaProps = {
    number: number | string
    mode: 'script' | 'noscript'
}

export const YMetrika: React.SFC<YMetrikaProps> = props => {
    switch (props.mode) {
        case 'script':
            return (
                <script
                    type={'text/javascript'}
                    dangerouslySetInnerHTML={{ __html: script(props.number) }}
                />
            )
        case 'noscript':
            return (
                <noscript>
                    <div>
                        <img
                            src={`https://mc.yandex.ru/watch/${props.number}`}
                            style={{
                                position: 'absolute',
                                left: '-9999px'
                            }}
                            alt=""
                        />
                    </div>
                </noscript>
            )
        default:
            return null
    }
}