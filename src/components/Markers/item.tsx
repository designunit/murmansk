import { useMobile } from '@/hooks/useMobile'
import { MarkerData } from '.'
import s from './item.module.css'

interface IItemProps extends MarkerData {
    onItemClick: (id: string, state: boolean) => void
}

export const Item: React.FC<IItemProps> = ({
    top,
    left,
    itemNumber,
    text,
    isOpen,
    id,
    ...props
}) => {
    const isMobile = useMobile()

    return (
        <div className={s.container}>
            <div
                className={s.point}
                onClick={() => !isMobile && props.onItemClick(id, !isOpen)}
                style={{
                    display: isMobile ? (isOpen ? 'block' : 'none') : 'block',
                }}
            />
            {!isMobile && (
                <div
                    className={s.card}
                    style={{
                        display: isOpen ? 'block' : 'none',
                        transform: left > 75 && 'translateX(-100%)',
                    }}
                    onClick={() => props.onItemClick(id, false)}
                >
                    <p className={s.text}>{text ?? 'Нету текста ):'}</p>
                </div>
            )}
        </div>
    )
}
