import React from 'react';
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { AnimatedTestimonials } from "./Components/AnimatedTestimonials";
import { fetchDetails } from '../../services/data.services'
import Spotify from './Components/Spotify.js';

export default function SplitText() {
    const containerRef = React.useRef(null);
    const [testimonials, setTestimonials] = React.useState([]);

    React.useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return
            containerRef.current.style.visibility = "visible"
            const { words } = splitText(
                containerRef.current.querySelector("h1")
            )

            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 2,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            textAlign: "center",
            flexDirection: 'column',
            gap:'32px',
            paddingBottom: '80px',
        },
        heading: {
            willChange: "transform, opacity",
            fontSize: '32px'
        },
    }

    React.useEffect(() => {
        fetchDetails()
            .then((data) => {
                const images = [
                    '/assets/img.JPEG',
                    '/assets/img1.JPEG',
                    '/assets/img2.JPEG'
                ];
                const dataWithImages = (data || []).map((item, index) => {
                    const imageIndex = index % images.length;
                    return {
                        ...item,
                        src: images[imageIndex]
                    };
                });

                setTestimonials(dataWithImages);
            })
            .catch((error) => {
                console.error("Error fetching details:", error);
            });
    }, []);

    return (
        <div ref={containerRef} style={styles.container}>
            <h1 style={styles.heading}>
                Hi I'm YeduKrishnanTY
            </h1>
            <AnimatedTestimonials testimonials={testimonials} />
            <Spotify src={"https://open.spotify.com/embed/playlist/5ldCF4ft5tuJfxO29MVelD?utm_source=generator&theme=0"} />
        </div>
    )
}
