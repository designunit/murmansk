import s from './form.module.css'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Emoji } from '../Emoji'

type FormDto = {
	text: string
}

export type FormOnSubmit = (comment?: string) => void
export type FormProps = {
	onSubmit: FormOnSubmit
}

export const Form: React.FC<FormProps> = props => {
	const { register, handleSubmit, reset, errors } = useForm<FormDto>()
	const onSubmit = handleSubmit(data => {
		props.onSubmit(data.text)
		reset()
	})

	const cancel = useCallback(() => {
		props.onSubmit()
		reset()
	}, [props.onSubmit])

	return (
		<div className={s.formContainer} onClick={cancel}>
			<form
				onSubmit={onSubmit}
				className={s.form}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={s.formHead}>
					<span>Новый комментарий</span>
					<button
						style={{
							width: 30,
							border: 'none',
							background: 'white',
							cursor: 'pointer',
						}}
						onClick={cancel}
					>
						<Emoji name='❌' />
					</button>
				</div>
				<textarea
					name='text'
					ref={register({
						required: 'Обязательное поле',
						maxLength: {
							value: 300,
							message:
								'Максимум 300 символов',
						},
						// minLength: {
						// 	value: 6,
						// 	message: 'Минимум 6 символов',
						// },
					})}
					rows={4}
					cols={45}
					placeholder='Ваше предложение'
					style={{
						resize: 'none',
					}}
				/>
				{errors?.text && (
					<p style={{
						color: 'tomato',
						fontSize: 12,
					}}>
						{errors?.text.message}
					</p>
				)}
				<button type='submit'>
					Добавить <Emoji name='📍' />
				</button>
			</form>
		</div>
	)
}
