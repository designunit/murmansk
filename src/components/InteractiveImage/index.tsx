import { useRef } from 'react'
import { usePointer } from '@/hooks/usePointer';

interface InteractiveImageProps {
    src: string
}

export const InteractiveImage: React.FC<InteractiveImageProps> = ({ src }) => {
    const ref = useRef(null)
    const coords = usePointer(ref, 0.9)

    return (
        <div
            ref={ref}
            style={{
                position: 'relative'
            }}
        >
            <img
                src={src}
                style={{
                    display: 'block',
                    width: '100%',
                }}
            />
            <svg xmlns='http://www.w3.org/2000/svg'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                }}
            >
                <mask id='myMask'>
                    <rect x='0' y='0' width='100%' height='100%' fill='white' />
                    <circle cx={`${coords[0]}%`} cy={`${coords[1]}%`} r={'25%'} fill='black'
                        style={{
                            transition: 'all .5s ease-out',
                        }}
                    />
                </mask>
                <rect width='100%' height='100%' fill='var(--color-green)'
                    mask='url(#myMask)'
                />
            </svg>
        </div>
    )
}
