import s from './index.module.css'

export const Header: React.FC<any> = props => {
    return (
        <div className={s.container} style={props.style}>
            {props.children}
        </div>
    )
}