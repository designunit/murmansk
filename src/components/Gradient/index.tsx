export const Gradient: React.FC<{color?: string}> = ({ color = 'var(--color-green)' }) => (
    <div style={{
        position: 'absolute',
        zIndex: -1,
        top: '-12vw',
        right: '-8.33vw',
        width: '50vw',
        height: '50vw',
        maxWidth: 720,
        maxHeight: 720,
        background: `radial-gradient(closest-side at center, ${color} 27.23%, rgba(255, 255, 255, 0) 100%)`,
        pointerEvents: 'none',
    }} />
)