import { Marker } from "react-image-marker"
import { MarkerData } from "./types"

export type ImageDto = {
	id: number,
	src: string,
	likeCount: number,
	markers: MarkerData[]
}

export type LikeDto = {
	id: number,
	imageId: number,
	like: boolean,
}

async function sendJson(method: string, url: string, data: object) {
	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

function post(url: string, data: object) {
	return sendJson('POST', url, data)
}

async function put(url: string, data: object) {
	return sendJson('PUT', url, data)
}

export async function setLike(imageId: number, like: boolean): Promise<LikeDto | null> {
	const res = await put(`/api/v1/images/${imageId}/like`, { like })
	if (!res.ok) {
		return null
	}

	return res.json()
}

export async function addMarker(imageId: number, content: string, marker: Marker): Promise<ImageDto | null> {
	const { x, y } = getXY(marker)
	const params = { content, x, y }
	const res = await post(`/api/v1/images/${imageId}/marker`, params)
	if (!res.ok) {
		return null
	}

	const data = await res.json()
	return {
		likeCount: data.likeCount,
		id: data.id,
		src: data.src,
		// markers: getMarkers(data.markers),
		markers: []
	}
}

export async function getImage(id: number, src: string): Promise<ImageDto | null> {
	const param = encodeURIComponent(src)
	const res = await fetch(`/api/v1/images/${id}?src=${param}`)
	if (!res.ok) {
		return null
	}

	const data = await res.json()
	return {
		likeCount: data.likeCount,
		id: data.id,
		src: data.src,
		markers: getMarkers(data.markers),
	}
}

export async function getLikes(): Promise<LikeDto[] | null> {
	const res = await fetch(`/api/v1/likes`)
	if (!res.ok) {
		return null
	}

	return res.json()
}

function getMarkers(xs: any[]): MarkerData[] {
	return xs.map(m => ({
		left: m.x * 100,
		top: m.y * 100,
		content: m.content,
		id: m.id,
	}))
}

function getXY(marker: Marker) {
	const x = marker.left as number
	const y = marker.top as number
	return {
		x: x / 100,
		y: y / 100,
	}
}