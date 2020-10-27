import { CSSProperties } from 'react'
import { useMobile } from '../../hooks/useMobile'

interface RatioProps {
    left: string | number
    right: string | number
    style?: CSSProperties
    spacer?: string | number

    leftContent?: React.ReactNode
    rightContent?: React.ReactNode

    reverseMobile?: boolean
}

export const Ratio: React.FC<RatioProps> = ({ spacer = undefined, ...props }) => {
    const isMobile = useMobile()
    return (
        <div style={{
            ...props.style,
            display: 'flex',
            flexDirection: isMobile ? (props.reverseMobile ? 'column-reverse' : 'column') : null
        }}>
            <div style={{flex: props.left }}>
                {props.leftContent}
            </div>

            {!spacer ? null : <div style={{ flex: spacer }} />}

            <div style={{ flex: props.right }}>
                {props.rightContent}
            </div>
        </div>
    )
}