import React from 'react';
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { AnimatedTestimonials } from "./Components/AnimatedTestimonials";
import { fetchDetails } from '../../services/data.services'
import Spotify from './Components/Spotify.js';
import { styles } from './style.js';
import ContactForm from './Components/ContactForm/index.js';
import ProfileCard from '../../Exp/ProfileCard'



export default function SplitText() {
    const [testimonials, setTestimonials] = React.useState([]);


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
        <div style={styles.wrapper} >
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
            <ContactForm />
        </div>
    );
}
