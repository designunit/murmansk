import s from './styles.module.css'
import { CSSProperties } from "react"

export type SectionProps = {
    style?: CSSProperties
    className?: string
}

export const Section: React.FC<SectionProps> = props => {
    return (
        <div className={`${s.section} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}