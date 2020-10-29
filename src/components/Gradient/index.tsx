import { useMobile } from '@/hooks/useMobile'

export const Gradient: React.FC<{ color?: string }> = ({ color = 'var(--color-green)' }) => {
    const isMobile = useMobile()
    return (
        <div style={{
            position: 'absolute',
            zIndex: -1,
            top: isMobile ? '-15vmax' : '-12vw',
            right: isMobile ? '-10vmax' : '-8.33vw',
            width: isMobile ? '100vmax' : '50vw',
            height: isMobile ? '100vmax' : '50vw',
            maxWidth: 720,
            maxHeight: 720,
            background: `radial-gradient(closest-side at center, ${color} 27.23%, rgba(255, 255, 255, 0) 100%)`,
            pointerEvents: 'none',
        }} />
    )
}