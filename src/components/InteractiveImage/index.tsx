import { useRef, useState } from 'react'
import { usePointer } from '@/hooks/usePointer';

interface InteractiveImageProps {
    // src: string
}

export const InteractiveImage: React.FC<InteractiveImageProps> = () => {
    const bg = '/static/panorama.jpg'
    const fg = '/static/rupor.png'

    const [state, setState] = useState(0)

    return (
        <div
            style={{
                position: 'relative'
            }}
        >
            <img
                src={fg}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxHeight: '90vh',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPositionX: `${state}%`,
                    transition: 'background .25s',
                }}
            />
            <button
                onClick={() => setState(Math.min(state + 1, 100))}
            >
                {'>'}
            </button>
        </div>
    )
}
