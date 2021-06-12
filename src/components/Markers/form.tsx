import s from './form.module.css'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Emoji } from '../Emoji'

export const Form = ({ setMarkers, setAddMode, setShowForm, draft, markers }) => {
    const { register, handleSubmit, reset, errors } = useForm()

    const onSubmit = useCallback(
        (data) => {
            const newMarker = {
                ...draft,
                text: data.text,
                isOpen: true,
                id: 'vkhgadrg', // should be unique
            }
            setMarkers([...markers, newMarker])
            setAddMode(false)

            setShowForm(false)
            reset()
        },
        [markers, draft]
    )

    const hideForm = useCallback(() => {
        setShowForm(false)
        reset()
    }, [])

    return (
        <div className={s.formContainer} onClick={hideForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                        onClick={hideForm}
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
                        minLength: {
                            value: 6,
                            message: 'Минимум 6 символов',
                        },
                    })}
                    rows={4}
                    cols={45}
                    placeholder='Что вы думаете?'
                    style={{
                        resize: 'none',
                    }}
                />
                {errors?.text && (
                    <p
                        style={{
                            color: 'tomato',
                            fontSize: 12,
                        }}
                    >
                        {errors?.text.message}
                    </p>
                )}
                <button type='submit' style={{ fontWeight: 'bold' }}>
                    Оставить комментарий
                        <Emoji name='📍' />
                </button>
            </form>
        </div>
    )
}