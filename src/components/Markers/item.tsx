import { useCallback, useState } from 'react'
import { MarkerData } from '.'
import s from './item.module.css'

interface IItemProps extends MarkerData {}

export const Item: React.FC<IItemProps> = ({
    top,
    left,
    itemNumber,
    text,
    isOpen,
    ...props
}) => {
    const [open, setOpen] = useState(isOpen ?? true)

    const onClick = useCallback(() => {
        setOpen(!open)
    }, [open])

    return (
        <div className={s.container}>
            <div className={s.point} onClick={onClick} />
            <div
                className={s.card}
                style={{
                    display: open ? 'block' : 'none',
                    left: left > 75 && 'unset',
                    transform: left > 75 && 'translateX(calc(-100% + 5px))',
                }}
                onClick={() => setOpen(false)}
            >
                <p className={s.text}>{text ?? 'Нету текста ):'}</p>
            </div>
        </div>
    )
}
