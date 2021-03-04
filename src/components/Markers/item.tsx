import { useEffect, useState } from 'react'
import { MarkerData } from '.'
import s from './item.module.css'

export const Item: React.FC<MarkerData> = ({
    top,
    left,
    itemNumber,
    text,
    isOpen = false,
    ...props
}) => {
    const [open, setOpen] = useState(isOpen)
    // useEffect(() => {
    //     setOpen(isOpen)
    // }, [isOpen])

    return (
        <div className={s.container}>
            <div className={s.point} onClick={() => {
                setOpen(!open)
            }} />
            <div
                className={s.card}
                style={{
                    display: open ? 'block' : 'none',
                    left: left > 75 && 'calc(-400px + 10px)',
                }}
                onClick={() => setOpen(false)}
            >
                <p className={s.text}>{text ?? 'Нету текста ):'}</p>
            </div>
        </div>
    )
}
