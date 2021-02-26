import { CSSProperties } from 'react'
import { useMobile } from '../../hooks/useMobile'

interface RatioProps {
    left: string | number
    right: string | number
    style?: CSSProperties
    spacer?: string | number | React.ReactNode

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

            {typeof spacer === 'object' ? spacer : <div style={{ flex: spacer as number | string }} />}

            <div style={{ flex: props.right }}>
                {props.rightContent}
            </div>
        </div>
    )
}