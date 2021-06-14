import { useMobile } from '@/hooks/useMobile'
import { MarkerData } from '@/types'
import s from './item.module.css'

export type OnClick = (id: number, state: boolean) => void
export type ItemProps = MarkerData & {
	isOpen: boolean,
	onClick: OnClick,
}
export const Item: React.FC<ItemProps> = ({ top, left, id, isOpen, ...props }) => {
	const isMobile = useMobile()

	return (
		<div className={s.container}>
			<div
				className={s.point}
				onClick={() => !isMobile && props.onClick(id, !isOpen)}
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
					onClick={() => props.onClick(id, false)}
				>
					<span className={s.text}>{props.content}</span>
				</div>
			)}
		</div>
	)
}
