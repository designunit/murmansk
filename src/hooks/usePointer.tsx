import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function usePointer(ref, dump: number) {
	const [state, setState] = useState([0, 0])

	const rect = useMemo(() => {
		return ref.current.getBoundingClientRect()
	}, [ref.current])

	const onMouseMove = useCallback(e => {
		// const rect = (ref.current).getBoundingClientRect()
		const pointerX = e.clientX - rect.left
		const pointerY = e.clientY - rect.top

		setState(([x, y]) => {
			const vx = (pointerX - x) * dump
			const vy = (pointerY - y) * dump

			return [
				x + vx,
				y + vy,
			]
		})


		// setState([
		// 	(e.clientX - rect.left) / rect.width * 100,
		// 	(e.clientY - rect.top) / rect.height * 100,
		// ])
	}, [ref.current, rect])

	useEffect(() => {
		document.addEventListener('pointermove', onMouseMove);
		return function () {
			document.removeEventListener('pointermove', onMouseMove);
		};
	})

	return [
		state[0] / rect.width * 100,
		state[1] / rect.height * 100,
	]
}
