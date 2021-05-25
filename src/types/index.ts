import { Marker } from 'react-image-marker';

export interface Item {
    post: string
    id: number
}

export interface MarkerData extends Marker {
    top: number,
    left: number,
    text: string
    id: string
    isOpen?: boolean
}