import { useCallback, useEffect, useRef, useState } from 'react';

export function usePointer(ref) {
    const [state, setState] = useState([null, null])

    const onMouseMove = useCallback(e => {
        const rect = (ref.current).getBoundingClientRect()
        setState([
            (e.clientX - rect.left) / rect.width * 100,
            (e.clientY - rect.top) / rect.height * 100,
        ])
    }, [ref.current])

    useEffect(() => {
        document.addEventListener('pointermove', onMouseMove);
        return function () {
            document.removeEventListener('pointermove', onMouseMove);
        };
    })

    return (state)
}