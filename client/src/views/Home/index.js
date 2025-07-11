import React from 'react';
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { AnimatedTestimonials } from "./Components/AnimatedTestimonials";
import { fetchDetails } from '../../services/data.services'
import Spotify from './Components/Spotify.js';
import { styles } from './style.js';
import ContactForm from './Components/ContactForm/index.js';

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
        <div style={styles.wrapper} ref={containerRef}>
            <img src={require('../../assets/5.JPEG')} alt="Right 1" style={styles.right1} />
            <img src={require('../../assets/3.JPEG')} alt="Left 2" style={styles.left3} />
            <img src={require('../../assets/4.JPEG')} alt="Left 2" style={styles.right3} />

            {/* Main content */}
            <h1 style={styles.heading}>Hi I'm YeduKrishnanTY</h1>
            <AnimatedTestimonials testimonials={testimonials || []} />
            <Spotify src="https://open.spotify.com/embed/playlist/5ldCF4ft5tuJfxO29MVelD?utm_source=generator&theme=0" />
            <ContactForm />
        </div>
    );
}
