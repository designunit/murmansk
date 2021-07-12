import React from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { Emoji } from '../Emoji'

export const ProjectGallery: React.FC<{ items: ReactImageGalleryItem[] }> = ({ items }) => {
    return (
        <ImageGallery
            items={items}
            showThumbnails={false}
            showPlayButton={false}
            showBullets
            slideDuration={250}
            renderLeftNav={(onClick, disabled) => (
                <button
                    disabled={disabled}
                    onClick={onClick}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '.5rem',
                        zIndex: 1,
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                >
                    <Emoji name='⬅️'
                        style={{
                            width: 32,
                        }}
                    />
                </button>
            )}
            renderRightNav={(onClick, disabled) => (
                <button
                    disabled={disabled}
                    onClick={onClick}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '.5rem',
                        zIndex: 1,
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                >
                    <Emoji name='➡️'
                        style={{
                            width: 32,
                        }}
                    />
                </button>
            )}
            renderFullscreenButton={(onClick, isFullscreen) => (
                <button
                    onClick={onClick}
                    style={{
                        position: 'absolute',
                        bottom: '.5rem',
                        right: '.5rem',
                        zIndex: 1,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                >
                    <Emoji name={isFullscreen ? '❎' : '🔍'}
                        style={{
                            width: 32,
                        }}
                    />
                </button>
            )}
        />
    )
}

