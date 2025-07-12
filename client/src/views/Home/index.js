import React from 'react';
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { AnimatedTestimonials } from "./Components/AnimatedTestimonials";
import { fetchDetails } from '../../services/data.services'
import Spotify from './Components/Spotify.js';
import { styles } from './style.js';
import ContactForm from './Components/ContactForm/index.js';
import Hyperspeed from '../../Exp/Hyperspeed';
import ProfileCard from '../../Exp/ProfileCard'



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
            <ProfileCard
                name="YeduKrishnanTY"
                title="Front End Developer"
                handle="yedu.k"
                status="brb!"
                contactText="Contact Me"
                avatarUrl={require('../../assets/ty.gif')}
                showUserInfo={true}
                enableTilt={false}
                // onContactClick={() => console.log('Contact clicked')}
            />

            <AnimatedTestimonials testimonials={testimonials || []} />
            <Spotify src="https://open.spotify.com/embed/playlist/5ldCF4ft5tuJfxO29MVelD?utm_source=generator&theme=0" />
            <Hyperspeed
                effectOptions={{
                    onSpeedUp: () => { },
                    onSlowDown: () => { },
                    distortion: 'turbulentDistortion',
                    length: 400,
                    roadWidth: 10,
                    islandWidth: 2,
                    lanesPerRoad: 4,
                    fov: 90,
                    fovSpeedUp: 150,
                    speedUp: 2,
                    carLightsFade: 0.4,
                    totalSideLightSticks: 20,
                    lightPairsPerRoadWay: 40,
                    shoulderLinesWidthPercentage: 0.05,
                    brokenLinesWidthPercentage: 0.1,
                    brokenLinesLengthPercentage: 0.5,
                    lightStickWidth: [0.12, 0.5],
                    lightStickHeight: [1.3, 1.7],
                    movingAwaySpeed: [60, 80],
                    movingCloserSpeed: [-120, -160],
                    carLightsLength: [400 * 0.03, 400 * 0.2],
                    carLightsRadius: [0.05, 0.14],
                    carWidthPercentage: [0.3, 0.5],
                    carShiftX: [-0.8, 0.8],
                    carFloorSeparation: [0, 5],
                    colors: {
                        roadColor: 0x080808,
                        islandColor: 0x0a0a0a,
                        background: 0x000000,
                        shoulderLines: 0xFFFFFF,
                        brokenLines: 0xFFFFFF,
                        leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                        rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                        sticks: 0x03B3C3,
                    }
                }}
            />
            <ContactForm />
        </div>
    );
}
