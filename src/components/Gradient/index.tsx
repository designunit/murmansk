import { useMobile } from '@/hooks/useMobile'

export const Gradient: React.FC<{ color?: string }> = ({ color = 'var(--color-green)' }) => {
    const isMobile = useMobile()
    return (
        <span style={{
            position: 'absolute',
            zIndex: -1,
            top: isMobile ? '-20vmax' : '-20vw',
            right: isMobile ? '-20vmax' : '-15vw',
            width: isMobile ? '100vmax' : '75vw',
            height: isMobile ? '100vmax' : '75vw',
            maxWidth: 1024,
            maxHeight: 1024,
            background: `radial-gradient(closest-side at center, ${color} 27.23%, rgba(255, 255, 255, 0) 100%)`,
            pointerEvents: 'none',
        }} />
    )
}