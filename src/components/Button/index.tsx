import s from './styles.module.css'

import cx from 'classnames'
import Link from 'next/link'
import { useContext, useRef, MutableRefObject, useEffect } from 'react'
import { useHoverDirty } from 'react-use'

export type ButtonTheme = 'default' | 'primary' | 'link'
export type ButtonShape = 'default' | 'pill' | 'circle'

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    theme?: 'default' | 'primary' | 'link'
    size?: 'default' | 'small' | 'big'
    shape?: ButtonShape
    href?: string
    underlineRef?: MutableRefObject<null>
}

const themeClass = {
    default: s.themeDefault,
    primary: s.themePrimary,
    link: s.themeLink,
}

const sizeClass = {
    default: s.sizeDefault,
    small: s.sizeSmall,
    big: s.sizeBig,
}

const shapeClass = {
    default: s.shapeDefault,
    pill: s.shapePill,
    circle: s.shapeCircle,
}

export const Button: React.FC<ButtonProps> =
    ({ href, size, theme = 'default', shape, children, underlineRef, ...props }) => {
        const sizeValue = size ??  'default' 
        const shapeValue = shape ?? 'default'

        const ref = useRef(null)
        const isHovering = useHoverDirty(ref)

        useEffect(() => {
            if (!underlineRef || !ref) {
                return
            } else {
                let buttonElement = ref.current as unknown as HTMLElement 
                let undelineElement = underlineRef.current as unknown as HTMLElement 

                const rect = buttonElement.getBoundingClientRect()

                if (isHovering) {
                    undelineElement.style.left = `${rect.left}px`
                    undelineElement.style.width = `${rect.width}px`
                    undelineElement.style.top = `${rect.bottom}px`
                } else {
                    undelineElement.style.width = '0'
                }
            }
        }, [underlineRef, ref, isHovering])

        if (href) {
            return (
                <Link href={href}>
                    <a
                        {...props as any}
                        ref={ref}
                        className={cx(
                            s.button,
                            themeClass[theme],
                            sizeClass[sizeValue],
                            shapeClass[shapeValue],
                            props.className
                        )}
                    >{children}</a>
                </Link>
            )
        }

        return (
            <button
                {...props}
                className={cx(
                    s.button,
                    themeClass[theme],
                    sizeClass[sizeValue],
                    shapeClass[shapeValue],
                    props.className
                )}
            >
                {children}
            </button>
        )
    }
