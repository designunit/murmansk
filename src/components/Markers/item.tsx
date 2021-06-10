import { useMobile } from '@/hooks/useMobile'
import { MarkerData } from '@/types'
import s from './item.module.css'

type IItemProps = MarkerData & {
    onItemClick: (id: string, state: boolean) => void
}

export const Item: React.FC<IItemProps> = ({
    top,
    left,
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
                    display: !isMobile || isOpen ? 'block' : 'none',
                }}
            />
            {!isMobile && (
                <div
                    className={s.card}
                    style={{
                        display: isOpen ? 'block' : 'none',
                        transform: `translate(${left > 75 ? '-100%' : '0%'}, ${top < 20 ? '0%' : '-100%'})`,
                    }}
                    onClick={() => props.onItemClick(id, false)}
                >
                    <span className={s.text}>{text ?? 'Нету текста ):'}</span>
                </div>
            )}
        </div>
    )
}
