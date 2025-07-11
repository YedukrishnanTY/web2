import React from 'react'

function Spotify({ src }) {
    return (
        <div style={{ width: '100%', maxWidth: '600px', }}>
            <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src={src}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </div>
    )
}

export default Spotify