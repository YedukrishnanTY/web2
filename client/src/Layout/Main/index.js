import React, { useState, useRef, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { palette } from '../../theme/pallettes';

function Main({ children }) {
    const [sidebarWidth, setSidebarWidth] = useState(250); // initial width
    const containerRef = useRef(null);
    const isResizing = useRef(false);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // full viewport height
        background: palette?.main,
        color: '#FFF',
    };

    const mainStyle = {
        flex: '1 0 0',
        overflow: 'auto',
        display: 'flex',
    };

    const sideBarStyle = {
        display: 'flex',
        width: sidebarWidth,
        minWidth: 100,  // minimum width limit
        maxWidth: 800,  // maximum width limit
        background: palette?.side
    };

    const resizerStyle = {
        width: '1px',
        cursor: 'e-resize',
        backgroundColor: '#555',
        userSelect: 'none',
        margin: 2
    };

    // Start resizing
    const onMouseDown = (e) => {
        isResizing.current = true;
    };

    // Handle mouse move on document while resizing
    const onMouseMove = (e) => {
        if (!isResizing.current || !containerRef.current) return;

        // Calculate new sidebar width relative to container left
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        let newWidth = e.clientX - containerLeft;

        // Clamp width within min and max
        if (newWidth < 100) newWidth = 100;
        if (newWidth > 500) newWidth = 500;

        setSidebarWidth(newWidth);
    };

    // Stop resizing
    const onMouseUp = (e) => {
        isResizing.current = false;
    };

    // Attach mousemove and mouseup listeners on mount and clean up on unmount
    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div style={containerStyle} ref={containerRef}>
            <header>
                <Header />
            </header>

            <main style={mainStyle}>
                <div style={sideBarStyle}>
                    {'sideBar'}
                </div>
                <div
                    style={resizerStyle}
                    onMouseDown={onMouseDown}
                    // prevent selecting text during drag
                    onDoubleClick={() => setSidebarWidth(250)} // optional: reset on double click
                />
                <div style={{ flex: 1, overflow: 'auto', display: 'flex', gap: 16, padding: '16px' }}>
                    {children}
                </div>
            </main>

            <footer style={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer />
            </footer>
        </div>
    );
}

export default Main;
