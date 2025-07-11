import {
    motion,
    useScroll,
    useSpring,
} from "motion/react"
import { StyleSheet } from './style'
import Aurora from './Aurora'
// import { ShootingStars } from './star/star'
// import { StarsBackground } from './star/bg'
// TODO : need to check the possibility of using the shooting stars and stars background with bootstrap div. 

export default function Main({ children }) {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    return (
        <div id="example">
            <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}

            />
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', gap: 16, padding: '16px' }}>
                {children}
            </div>
            <motion.div className="progress" style={{ scaleX, zIndex: 1000 }} />
            <StyleSheet />
            {/* <ShootingStars />
            <StarsBackground /> */}
        </div>
    )
}

